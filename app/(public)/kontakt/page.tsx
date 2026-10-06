export default function ContactPage() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Kontaktujte nás</h1>
        <p className="text-gray-600 text-sm">Sme vám k dispozícii pre akékoľvek otázky ohľadom nehnuteľností.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Kontaktné informácie */}
        <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Sídlo kancelárie</h3>
            <p className="text-sm text-gray-600">CBF REALITY s.r.o.</p>
            <p className="text-sm text-gray-600">Hlavná ulica 12</p>
            <p className="text-sm text-gray-600">917 01 Trnava</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-1">Telefón & E-mail</h3>
            <p className="text-sm text-gray-600">📞 +421 900 000 000</p>
            <p className="text-sm text-gray-600">✉️ info@cbfreality.sk</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-1">Otváracie hodiny</h3>
            <p className="text-sm text-gray-600">Po - Pi: 08:00 - 17:00</p>
            <p className="text-sm text-gray-600">So - Ne: Podľa dohody</p>
          </div>
        </div>

        {/* Kontaktný formulár */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Napíšte nám správu</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Meno a priezvisko</label>
                <input
                  type="text"
                  placeholder="Ján Novák"
                  className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#E32328] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Telefónne číslo</label>
                <input
                  type="tel"
                  placeholder="+421 900 000 000"
                  className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#E32328] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">E-mail</label>
              <input
                type="email"
                placeholder="jan@example.com"
                className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#E32328] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Správa</label>
              <textarea
                rows={4}
                placeholder="Mám záujem o ocenil nehnuteľnosti / obhliadku..."
                className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#E32328] focus:outline-none"
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-[#E32328] hover:bg-[#c81e22] text-white font-bold px-8 py-3 rounded-xl transition shadow-md w-full sm:w-auto"
            >
              Odoslať správu
            </button>
          </form>
        </div>

      </div>

    </main>
  );
}