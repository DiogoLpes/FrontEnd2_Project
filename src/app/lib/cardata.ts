export type CarBrandConfig = {
  models: string[];
  fuels: string[];
  startYear: number;
};

export const carBrandsData: Record<string, CarBrandConfig> = {
  'Audi': {
    models: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'RS3', 'RS5', 'RS6', 'e-tron'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'BMW': {
    models: ['Série 1', 'Série 2', 'Série 3', 'Série 4', 'Série 5', 'Série 7', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'M3', 'M4', 'M5', 'i4', 'iX'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1985
  },
  'Citroën': {
    models: ['C1', 'C3', 'C3 Aircross', 'C4', 'C4 Cactus', 'C5 Aircross', 'Berlingo', 'ë-C4'],
    fuels: ['GASOLINA', 'DIESEL', 'ELETRICO'],
    startYear: 1990
  },
  'Dacia': {
    models: ['Sandero', 'Duster', 'Jogger', 'Spring', 'Logan'],
    fuels: ['GASOLINA', 'DIESEL', 'GPL', 'ELETRICO'],
    startYear: 2005
  },
  'Fiat': {
    models: ['500', '500X', 'Panda', 'Tipo', 'Punto', '500e'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'Ford': {
    models: ['Fiesta', 'Focus', 'Puma', 'Kuga', 'Mustang', 'Ranger', 'Mondeo', 'Explorer', 'Mustang Mach-E'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1985
  },
  'Honda': {
    models: ['Civic', 'Jazz', 'HR-V', 'CR-V', 'ZR-V', 'e:Ny1', 'Honda e'],
    fuels: ['GASOLINA', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'Hyundai': {
    models: ['i10', 'i20', 'i30', 'Tucson', 'Kona', 'Santa Fe', 'IONIQ 5', 'IONIQ 6', 'Bayon'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1995
  },
  'Jeep': {
    models: ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Avenger'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'Kia': {
    models: ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento', 'Niro', 'EV6', 'EV9', 'Stonic'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1995
  },
  'Land Rover': {
    models: ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO'],
    startYear: 1990
  },
  'Mazda': {
    models: ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-30', 'CX-60', 'MX-5', 'MX-30'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'Mercedes-Benz': {
    models: ['Classe A', 'Classe B', 'Classe C', 'Classe E', 'Classe S', 'CLA', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'AMG GT', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1985
  },
  'Mini': {
    models: ['Cooper', 'Countryman', 'Clubman', 'Cooper SE'],
    fuels: ['GASOLINA', 'DIESEL', 'ELETRICO'],
    startYear: 2001
  },
  'Mitsubishi': {
    models: ['Space Star', 'ASX', 'Eclipse Cross', 'Outlander'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO'],
    startYear: 1990
  },
  'Nissan': {
    models: ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Ariya', 'GT-R', 'Navara'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'Opel': {
    models: ['Corsa', 'Astra', 'Mokka', 'Crossland', 'Grandland', 'Combo'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'Peugeot': {
    models: ['208', '308', '2008', '3008', '5008', '508', 'Partner', 'e-208', 'e-2008'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'Porsche': {
    models: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', '718 Boxster', '718 Cayman'],
    fuels: ['GASOLINA', 'HIBRIDO', 'ELETRICO'],
    startYear: 1980
  },
  'Renault': {
    models: ['Clio', 'Captur', 'Mégane', 'Kadjar', 'Arkana', 'Austral', 'Scenic', 'ZOE', 'Megane E-Tech'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
  'Seat': {
    models: ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO'],
    startYear: 1990
  },
  'Škoda': {
    models: ['Fabia', 'Scala', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1995
  },
  'Smart': {
    models: ['Fortwo', 'Forfour', '#1'],
    fuels: ['GASOLINA', 'ELETRICO'],
    startYear: 1998
  },
  'Tesla': {
    models: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
    fuels: ['ELETRICO'],
    startYear: 2012
  },
  'Toyota': {
    models: ['Yaris', 'Yaris Cross', 'Corolla', 'C-HR', 'RAV4', 'Camry', 'Land Cruiser', 'Hilux', 'GR86', 'Supra', 'bZ4X'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1985
  },
  'Volkswagen': {
    models: ['Polo', 'Golf', 'T-Cross', 'T-Roc', 'Tiguan', 'Touareg', 'Passat', 'Arteon', 'ID.3', 'ID.4', 'ID.5', 'ID.7', 'ID. Buzz'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1985
  },
  'Volvo': {
    models: ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90', 'C40 Recharge', 'EX30', 'EX90'],
    fuels: ['GASOLINA', 'DIESEL', 'HIBRIDO', 'ELETRICO'],
    startYear: 1990
  },
};

export const carColors = [
  { label: 'Preto', value: 'Preto', hex: '#1a1a1a' },
  { label: 'Branco', value: 'Branco', hex: '#f5f5f5' },
  { label: 'Prata', value: 'Prata', hex: '#c0c0c0' },
  { label: 'Cinzento', value: 'Cinzento', hex: '#6b6b6b' },
  { label: 'Azul', value: 'Azul', hex: '#1e3a5f' },
  { label: 'Vermelho', value: 'Vermelho', hex: '#c41e3a' },
  { label: 'Verde', value: 'Verde', hex: '#2d5a27' },
  { label: 'Amarelo', value: 'Amarelo', hex: '#ffd700' },
  { label: 'Laranja', value: 'Laranja', hex: '#e65100' },
  { label: 'Bordeaux', value: 'Bordeaux', hex: '#722f37' },
  { label: 'Azul Claro', value: 'Azul Claro', hex: '#4a90d9' },
  { label: 'Bege', value: 'Bege', hex: '#d4c5a9' },
];

export const carBrands = Object.keys(carBrandsData).sort();