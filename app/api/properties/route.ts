import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const offerType = searchParams.get('offerType');
    const types = searchParams.get('types')?.split(',').filter(Boolean);
    const maxPrice = searchParams.get('maxPrice');
    const minArea = searchParams.get('minArea');
    const maxArea = searchParams.get('maxArea');
    const sortBy = searchParams.get('sortBy');
    const location = searchParams.get('location');

    // Vybavenie (booleany)
    const pool = searchParams.get('pool') === 'true';
    const garage = searchParams.get('garage') === 'true';
    const balcony = searchParams.get('balcony') === 'true';
    const ac = searchParams.get('ac') === 'true';
    const elevator = searchParams.get('elevator') === 'true';

    let query = supabase
      .from('properties')
      .select('*')
      .eq('is_published', true);

    // Filter: Kúpa / Prenájom
    if (offerType) {
      query = query.eq('offer_type', offerType);
    }

    // Filter: Typ nehnuteľnosti (ak je vybraný aspoň jeden)
    if (types && types.length > 0) {
      query = query.in('property_type', types);
    }

    // Filter: Max cena
    if (maxPrice && Number(maxPrice) > 0) {
      query = query.lte('price', Number(maxPrice));
    }

    // Filter: Rozloha
    if (minArea && Number(minArea) > 0) {
      query = query.gte('area_usable', Number(minArea));
    }
    if (maxArea && Number(maxArea) > 0) {
      query = query.lte('area_usable', Number(maxArea));
    }

    // Filter: Lokalita (Mesto / Ulica / Časť)
    if (location && location.trim() !== '') {
      query = query.or(`city.ilike.%${location}%,district.ilike.%${location}%,street.ilike.%${location}%`);
    }

    // Filter: Vybavenie
    if (pool) query = query.eq('has_pool', true);
    if (garage) query = query.eq('has_garage', true);
    if (ac) query = query.eq('has_air_conditioning', true);
    if (elevator) query = query.eq('has_elevator', true);
    if (balcony) {
      query = query.or('has_balcony.eq.true,has_terrace.eq.true,has_loggia.eq.true');
    }

    // Radenie
    if (sortBy === 'price-asc') {
      query = query.order('price', { ascending: true });
    } else if (sortBy === 'price-desc') {
      query = query.order('price', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formattedData = (data || []).map((item) => ({
      id: item.id,
      title: item.title,
      location: `${item.city}${item.district ? ' – ' + item.district : ''}`,
      price: Number(item.price),
      offerType: item.offer_type,
      propertyType: item.property_type,
      beds: item.rooms,
      baths: item.bathrooms,
      area: Number(item.area_usable),
      imgUrl: item.main_image,
      badge: item.offer_type === 'sale' ? 'Na predaj' : 'Na prenájom',
      description: item.description,
      features: {
        pool: item.has_pool,
        garage: item.has_garage,
        balcony: item.has_balcony || item.has_terrace || item.has_loggia,
        ac: item.has_air_conditioning,
        elevator: item.has_elevator,
      },
    }));

    return NextResponse.json(formattedData);
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Chyba na serveri' }, { status: 500 });
  }
}