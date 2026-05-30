import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // 1. ENSALADAS
  {
    id: 'ensalada-el-dorado',
    name: 'El Dorado',
    price: 11.00,
    category: 'ensaladas',
    description: 'Ensalada de brotes verdes seleccionados, cremoso queso de cabra templado, tomates cherry dulces, nueces crujientes y una vinagreta artesanal de miel y mostaza.',
    allergens: ['Lácteos', 'Frutos de cáscara'],
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ensalada-rio-rojo',
    name: 'Río Rojo',
    price: 12.00,
    category: 'ensaladas',
    description: 'Tomates maduros seleccionados de la huerta, ventresca de atún de primera calidad en lascas y un generoso chorro de aceite de oliva virgen extra de la región.',
    allergens: ['Pescado/Moluscos'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ensalada-georgiana',
    name: 'Georgiana',
    price: 15.00,
    category: 'ensaladas',
    description: 'Combinación fresca de brotes y canónigos acompañados de deliciosa codorniz deshuesada, aceitunas negras, tomates cherry, cebolla morada, frutos secos y vinagreta de miel y mostaza.',
    allergens: ['Frutos de cáscara'],
    label: '¡Nueva!',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80'
  },

  // 2. CANTINADAS Ensaladas, Entrantes y Raciones
  {
    id: 'cantinada-centauros',
    name: 'Centauros del Desierto',
    price: 10.50,
    category: 'cantinadas',
    description: 'Abundante cesta de totopos de maíz crujientes cubiertos con queso cheddar fundido, chili con carne especiado y guacamole fresco casero.',
    allergens: ['Lácteos'],
    isVegetarian: false,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-dakota',
    name: 'Dakota',
    price: 13.00,
    category: 'cantinadas',
    description: 'Huevos camperos de corral fritos al momento, acompañados de torrezno crujiente tradicional cortado en dados y pimientos del padrón asados.',
    allergens: ['Huevo'],
    label: '¡Nueva!',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-croquetas',
    name: 'Davy Crockett',
    price: 12.50,
    category: 'cantinadas',
    description: 'Exquisita selección de croquetas caseras variadas, crujientes por fuera y con un corazón de bechamel sumamente cremoso.',
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-empanadilla',
    name: 'Valor de Ley',
    price: 8.00,
    category: 'cantinadas',
    description: 'Empanadilla artesanal con relleno jugoso y picante al más puro estilo de la frontera tex-mex.',
    allergens: ['Gluten'],
    label: 'Sabor Intenso',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-cazon',
    name: 'Misuri',
    price: 12.50,
    category: 'cantinadas',
    description: 'Dados frescos de cazón en adobo tradicional al estilo propio del 26, fritos al punto óptimo para una textura crujiente y jugosa.',
    allergens: ['Gluten', 'Pescado/Moluscos'],
    label: '¡Nueva!',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-rejos',
    name: 'Barry\'s',
    price: 13.00,
    category: 'cantinadas',
    description: 'Tiras de rejos de calamar fritas de manera rústica al genuino estilo del 26, servidas doradas con gajos de limón fresco.',
    allergens: ['Gluten', 'Pescado/Moluscos'],
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-navajo',
    name: 'Navajo',
    price: 10.00,
    category: 'cantinadas',
    description: 'Tiras jugosas de solomillo de pollo empanadas en pan rallado panko japonés ultra crujiente, servidas con una deliciosa salsa sweet chili casera.',
    allergens: ['Gluten'],
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-chimichanga',
    name: 'Nuevo México',
    price: 11.00,
    category: 'cantinadas',
    description: 'Tortilla de trigo frita y crujiente, rellena de abundante carne de cerdo mechada especiada lentamente con frijoles y mezcla aromática.',
    allergens: ['Gluten'],
    label: '¡Nueva!',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-quesadilla',
    name: 'Cielito Lindo',
    price: 10.00,
    category: 'cantinadas',
    description: 'Quesadilla tostada de pulled pork (cerdo desmechado a baja temperatura) con salsa barbacoa ahumada, queso cheddar derretido y un toque fresco de crema agria.',
    allergens: ['Gluten', 'Lácteos'],
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cantinada-torrezno',
    name: 'El Paquito',
    price: 9.00,
    category: 'cantinadas',
    description: 'Auténtico torrezno frito artesanalmente, con corteza crujiente burbujeada y magro tierno y sabroso. Una pieza legendaria de nuestra taberna.',
    allergens: [],
    isPopular: true,
    image: '/src/assets/images/ranch_torrezno_1780163723481.png'
  },
  {
    id: 'cantinada-tortilla',
    name: 'O\'Hara\'s',
    price: 9.00,
    category: 'cantinadas',
    description: 'Nuestra mítica tortilla española jugosa elaborada al momento con patatas seleccionadas y cebolla caramelizada, al más puro estilo del 26.',
    allergens: ['Huevo'],
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80'
  },

  // 3. TASCAS CLÁSICOS
  {
    id: 'tasca-carrilladas',
    name: 'Montana',
    price: 15.00,
    category: 'tascas',
    description: 'Ternísimas carrilladas de cerdo ibérico guisadas a fuego lento en reducción de vino tinto de la D.O. La Mancha y acompañadas de suave puré de patatas.',
    allergens: ['Lácteos'],
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'tasca-costillar',
    name: 'Ford Apache',
    price: 17.00,
    category: 'tascas',
    description: 'Medio costillar de cerdo asado lentamente hasta que la carne se desprende del hueso, bañado con nuestra emblemática salsa barbacoa y servido con patatas fritas rústicas.',
    allergens: [],
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'tasca-solomillo',
    name: 'La Soga de la Horca',
    price: 10.00,
    category: 'tascas',
    description: 'Solomillo de cerdo a la plancha marinado con aromática salsa chimichurri ranchera, maíz dulce tostado y patatas gajo de guarnición.',
    allergens: [],
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'tasca-lagarto',
    name: 'Capitán Kirby',
    price: 13.00,
    category: 'tascas',
    description: 'Corte selecto de lagarto ibérico cocinado a la plancha con cristales de sal Maldon y servido con una generosa guarnición de patatas fritas caseras.',
    allergens: [],
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'tasca-tacos',
    name: 'Tex-Tacos con Tuétano',
    price: 15.00,
    category: 'tascas',
    description: 'Tacos gourmet de carne de ternera guisada a baja temperatura, acompañados con tuétano asado al horno, cebolla morada picada, cilindro fresco, lima y salsa cajún casera.',
    allergens: [],
    isPopular: true,
    image: '/src/assets/images/ranch_tacos_marrow_1780163740418.png'
  },
  {
    id: 'tasca-sepia',
    name: 'Katie Elder',
    price: 15.00,
    category: 'tascas',
    description: 'Sepia fresca entera a la plancha con aceite de oliva virgen extra, sazonada con un picadillo aromático de ajo asado y perejil fresco del huerto.',
    allergens: ['Pescado/Moluscos'],
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&auto=format&fit=crop&q=80'
  },

  // 4. HAMBURGUESAS
  {
    id: 'burger-el-26',
    name: 'Hamburguesa el 26',
    price: 10.50,
    category: 'hamburguesas',
    description: 'Carne 100% de vacuno gallego madurado a la brasa, jalapeños en rodajas, nuestra inconfundible salsa cajún casera y doble loncha de queso cheddar fundido.',
    allergens: ['Gluten', 'Lácteos'],
    isPopular: true,
    image: '/src/assets/images/ranch_burger_el26_1780163776483.png'
  },
  {
    id: 'burger-colorado',
    name: 'Colorado',
    price: 12.00,
    category: 'hamburguesas',
    description: 'Nuestra novedad: Burger de ternera jugosa, pepperoni italiano picante rebozado, queso manchego curado derretido y una inyección de salsa picante tradicional.',
    allergens: ['Gluten', 'Lácteos'],
    label: '¡Nueva!',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'burger-illinois',
    name: 'Illinois',
    price: 13.00,
    category: 'hamburguesas',
    description: 'Soberbia hamburguesa de ternera campera, huevo frito de granja con puntilla, bacon ahumado crujiente, queso Havarti cremoso y una especial salsa secreta Irish Whiskey.',
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    label: '¡Nueva!',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'burger-mississippi',
    name: 'Mississippi',
    price: 11.00,
    category: 'hamburguesas',
    description: 'Hamburguesa de ternera a la parrilla, rulo de queso de cabra caramelizado con soplete, cebolla caramelizada casera y bacon crujiente ahumado.',
    allergens: ['Gluten', 'Lácteos'],
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'burger-springfield',
    name: 'Springfield',
    price: 11.00,
    category: 'hamburguesas',
    description: 'Carne selecta de cerdo desmechada, fina cebolla morada crujiente, una elegante crema de trufa negra infusionada y bacon crujiente rallado.',
    allergens: ['Gluten', 'Lácteos'],
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'burger-kentucky',
    name: 'Kentucky',
    price: 10.00,
    category: 'hamburguesas',
    description: 'Jugosa pechuga de pollo marinada y frita al estilo sureño con rebozado crujiente de cereales, lechuga fresca, rodajas de tomate y salsa césar suave.',
    allergens: ['Gluten', 'Lácteos'],
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80'
  },

  // 5. VEGAN EL 26
  {
    id: 'vegan-centauros',
    name: 'Centauros Vegan',
    price: 11.50,
    category: 'vegan',
    description: 'Totopos de maíz dorados cubiertos con cremoso queso vegano fundido, chili de soja texturizada picante y una ración generosa de guacamole casero.',
    allergens: [],
    isVegan: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'vegan-cielito',
    name: 'Cielito Vegan',
    price: 11.00,
    category: 'vegan',
    description: 'Quesadilla asada rellena de champiñones laminados, soja texturizada marinada, pimientos tricolor asados, cebolla pochada, tomate y queso vegano fundido.',
    allergens: ['Gluten'],
    isVegan: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'vegan-brannigans',
    name: 'Brannigan\'s',
    price: 11.00,
    category: 'vegan',
    description: 'Sabor sin concesiones: Hamburguesa de proteína vegetal Beyond Meat, lonchas de tomate maduro, hojas de lechuga, queso vegano fundido y salsa cajún artesanal.',
    allergens: ['Gluten'],
    isVegan: true,
    isVegetarian: true,
    label: '100% Sostenible',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=80'
  },

  // 6. POSTRES
  {
    id: 'postre-brownie',
    name: 'Brownie de Chocolate',
    price: 5.90,
    category: 'postres',
    description: 'Bizcocho denso y templado de chocolate belga con trozos de nueces Pecanas, coronado con una gran bola de helado de vainilla cremosa.',
    allergens: ['Gluten', 'Lácteos', 'Frutos de cáscara', 'Huevo'],
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'postre-tarta-queso-26',
    name: 'Tarta de Queso el 26',
    price: 5.90,
    category: 'postres',
    description: 'Nuestra tarta de queso insignia elaborada artesanalmente con auténtico queso Manchego Curado de la tierra, horneada diariamente para mantener un corazón cremoso incomparable.',
    allergens: ['Gluten', 'Lácteos', 'Huevo'],
    isVegetarian: true,
    isPopular: true,
    label: 'Receta Secreta',
    image: '/src/assets/images/ranch_manchego_cake_1780163757887.png'
  },

  // 7. BEBIDAS (para que puedan ver o pedir bebidas complementarias del 26)
  {
    id: 'bebida-grifo-selecta',
    name: 'Pinta Cerveza de Grifo Selecta',
    price: 4.80,
    category: 'bebidas',
    description: 'Fría de barril, servida en copa fría. Disponemos de cervezas artesanas locales de Ciudad Real en rotación mensual. ¡Pregunta a nuestro personal!',
    allergens: ['Gluten'],
    image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'bebida-pinta-guinness',
    name: 'Pinta Cerveza Negra Guinness',
    price: 5.50,
    category: 'bebidas',
    description: 'Auténtica cerveza negra irlandesa premium tirada a dos tiempos de barril, con su característica espuma cremosa de nitrógeno.',
    allergens: ['Gluten'],
    label: 'Legendaria',
    image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'bebida-copa-vino-do',
    name: 'Copa de Vino D.O. La Mancha',
    price: 3.50,
    category: 'bebidas',
    description: 'Selección premium de tintos tempranillo regionales fermentados en barrica de roble, de gran cuerpo, redondos y aromáticos.',
    allergens: [],
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'bebida-limonada-fresca',
    name: 'Limonada Casera de Hierbabuena',
    price: 3.80,
    category: 'bebidas',
    description: 'Bebida refrescante exprimida al momento con limones ecológicos manchegos, sirope de agave puro y un toque aromático fresco de hierbabuena.',
    allergens: [],
    isVegan: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80'
  }
];
