// lib/utils/descriptionGenerator.ts

export interface PropertyDataForDescription {
  title: string;
  offerType: 'sale' | 'rent';
  propertyType: string;
  city: string;
  district?: string;
  price: number;
  areaUsable: number;
  rooms?: number;
  floor?: number;
  features: {
    hasBalcony?: boolean;
    hasTerrace?: boolean;
    hasLoggia?: boolean;
    hasElevator?: boolean;
    hasParking?: boolean;
    hasGarage?: boolean;
    hasBasement?: boolean;
    hasPool?: boolean;
    hasSauna?: boolean;
    hasAirConditioning?: boolean;
    isRenovated?: boolean;
  };
}

export function generatePropertyDescription(data: PropertyDataForDescription): string {
  const { title, offerType, propertyType, city, district, areaUsable, rooms, floor, features } = data;
  
  const offerText = offerType === 'sale' ? 'na predaj' : 'na prenájom';
  const typeMap: Record<string, string> = {
    apartment: 'byt',
    house: 'rodinný dom',
    land: 'pozemok',
    commercial: 'komerčný priestor',
    other: 'nehnuteľnosť'
  };
  
  const pTypeStr = typeMap[propertyType] || 'nehnuteľnosť';
  const locationStr = district ? `${city} – ${district}` : city;

  // 1. Úvod
  let intro = `CBF REALITY Vám exkluzívne ponúka ${offerText} ${pTypeStr}`;
  if (rooms && propertyType === 'apartment') {
    intro = `CBF REALITY Vám exkluzívne ponúka ${offerText} priestranný ${rooms}-izbový ${pTypeStr}`;
  }
  intro += ` s výmerou ${areaUsable} m² v vyhľadávanej lokalite ${locationStr}.\n\n`;

  // 2. Dispozícia a stav
  let details = `**Dispozícia a parametre:**\n`;
  details += `Nehnuteľnosť disponuje úžitkovou plochou ${areaUsable} m². `;
  if (floor !== undefined && floor !== null) {
    details += `Nachádza sa na ${floor}. poschodí. `;
  }
  if (features.isRenovated) {
    details += `Prešla modernou rekonštrukciou, čo novému majiteľovi umožní okamžité bývanie bez ďalších investícií.\n\n`;
  } else {
    details += `\n\n`;
  }

  // 3. Vybavenie a výhody
  const activeFeatures: string[] = [];
  if (features.hasBalcony) activeFeatures.push('balkón');
  if (features.hasTerrace) activeFeatures.push('priestranná terasa');
  if (features.hasLoggia) activeFeatures.push('lógia');
  if (features.hasElevator) activeFeatures.push('výťah priamo v dome');
  if (features.hasGarage) activeFeatures.push('vlastná garáž');
  if (features.hasParking) activeFeatures.push('vyhradené parkovacie miesto');
  if (features.hasBasement) activeFeatures.push('pivničná kobka');
  if (features.hasAirConditioning) activeFeatures.push('klimatizácia');
  if (features.hasPool) activeFeatures.push('bazén');
  if (features.hasSauna) activeFeatures.push('sauna');

  let featuresText = '';
  if (activeFeatures.length > 0) {
    featuresText = `**Hlavné benefity a vybavenie:**\n- ` + activeFeatures.join('\n- ') + `\n\n`;
  }

  // 4. Záver
  const outro = `**Lokalita a odporúčanie:**\nObráťte sa na nás pre viac informácií alebo si dohodnite osobnú obhliadku ešte dnes. V CBF REALITY Vám radi pomôžeme s celým procesom vrátane právneho a hypotekárneho servisu.`;

  return `${intro}${details}${featuresText}${outro}`;
}