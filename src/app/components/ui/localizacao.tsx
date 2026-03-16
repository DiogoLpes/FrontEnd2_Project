export default function Location() {
  return (
    <div className="w-full h-full min-h-[400px] relative rounded-xl overflow-hidden border border-white/10 group">
      {/* Overlay para efeito Dark que sai no hover */}
      <div className="absolute inset-0 bg-blue-900/10 pointer-events-none z-10 group-hover:bg-transparent transition-all duration-700"></div>
      
      <div className="absolute inset-0 w-full h-full">
        <iframe 
          className="w-full h-full brightness-90 opacity-60 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 group-hover:brightness-100 transition-none duration-700"
          frameBorder="0" 
          scrolling="no" 
          src="https://maps.google.com/maps?width=500&height=400&hl=en&q=ts%20pneus&t=p&z=14&ie=UTF8&iwloc=B&output=embed"
        ></iframe>
      </div>

      {/* Badge Flutuante */}
      <div className="absolute bottom-4 left-4 z-20 bg-garage-blue text-[10px] font-black uppercase px-3 py-1 italic shadow-xl group-hover:opacity-0 transition-opacity">
        Localização GPS Ativa
      </div>
    </div>
  );
}