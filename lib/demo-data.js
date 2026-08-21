export const INITIAL_CONFIG = {
  companyName: "GoTravel",
  whatsappNumber: "+525551652314",
  email: "info@gotravel.com.mx",
  phone: "+52 55 5165 2314",
  socialMedia: {
    instagram: "https://instagram.com/gotravel_mx",
    facebook: "https://facebook.com/gotravelmexico",
    tiktok: "https://tiktok.com/@gotravel_mx"
  },
  heroImage: "/images/hero.jpg",
  logo: "/images/logo.png",
  primaryColor: "#1B5E3B",
  secondaryColor: "#D4A853"
};

export const DEMO_TOURS = [
  {
    id: "tour-1",
    slug: "snorkel-arco-cabos",
    destination: "cabos",
    status: "published",
    duration: "3.5 horas",
    maxCapacity: 12,
    priceAdult: 1250,
    priceChild: 850,
    rating: 4.9,
    reviewsCount: 48,
    images: ["/images/tour-snorkel.jpg", "/images/cabos.jpg", "/images/hero.jpg"],
    title: {
      es: "Snorkel y Paseo al Arco de Los Cabos",
      en: "Snorkeling & Arch Tour in Los Cabos",
      fr: "Plongée et Visite de l'Arche de Los Cabos",
      pt: "Snorkel e Passeio ao Arco de Los Cabos",
      de: "Schnorcheln & Bogen-Tour in Los Cabos"
    },
    shortDescription: {
      es: "Navega en catamarán transparente hacia el icónico Arco de Cabo San Lucas y nada entre peces tropicales en Bahía Chileno.",
      en: "Sail on a glass-bottom boat to the iconic Arch of Cabo San Lucas and swim among tropical fish in Chileno Bay.",
      fr: "Naviguez en bateau à fond de verre vers l'Arche emblématique de Cabo San Lucas et nagez parmi les poissons tropicaux.",
      pt: "Navegue em um barco com fundo de vidro até o icônico Arco de Cabo San Lucas e nade entre peixes tropicais.",
      de: "Segeln Sie mit einem Glasbodenboot zum ikonischen Bogen von Cabo San Lucas und schwimmen Sie zwischen tropischen Fischen."
    },
    fullDescription: {
      es: "Disfruta de la mejor experiencia marina en Los Cabos. Iniciarás abordando nuestra embarcación rumbo al famoso Arco y la Playa del Amor. Durante el recorrido podrás avistar leones marinos y tomar fotografías inolvidables. Posteriormente nos dirigiremos a la resguardada Bahía Chileno para realizar snorkel con equipo profesional completo e instructores certificados. Incluye barra libre nacional y lunch ligero a bordo.",
      en: "Experience the ultimate marine adventure in Los Cabos. Board our vessel heading to the famous Arch and Lover's Beach. Spot sea lions and capture breathtaking photos. Then, head to sheltered Chileno Bay for snorkeling with full professional gear and certified guides. Includes national open bar and light lunch on board.",
      fr: "Vivez la meilleure aventure marine à Los Cabos. Embarquez vers le célèbre Arche et la Plage de l'Amour. Observez les lions de mer et prenez des photos inoubliables. Ensuite, direction la baie de Chileno pour la plongée en apnée. Boissons et déjeuner léger inclus.",
      pt: "Viva a melhor aventura marítima em Los Cabos. Embarque em direção ao famoso Arco e Praia do Amor. Observe leões-marinhos e tire fotos incríveis. Inclui open bar nacional e almoço leve a bordo.",
      de: "Erleben Sie das ultimative Meeresabenteuer in Los Cabos. Segeln Sie zum berühmten Bogen und zum Strand der Liebe. Beobachten Sie Seelöwen und genießen Sie professionelles Schnorcheln. Inklusive Open Bar und leichtem Mittagessen an Bord."
    },
    includes: {
      es: ["Paseo en embarcación al Arco", "Equipo completo de snorkel", "Guía certificado bilingüe", "Barra libre de bebidas a bordo", "Snack/Lunch ligero"],
      en: ["Boat ride to the Arch", "Full snorkel equipment", "Certified bilingual guide", "Open bar on board", "Light lunch/snack"],
      fr: ["Balade en bateau jusqu'à l'Arche", "Équipement complet de plongée", "Guide bilingue certifié", "Open bar à bord", "Déjeuner léger"],
      pt: ["Passeio de barco até o Arco", "Equipamento completo de snorkel", "Guia bilíngue certificado", "Open bar a bordo", "Almoço leve"],
      de: ["Bootsfahrt zum Bogen", "Vollständige Schnorchelausrüstung", "Zertifizierter zweisprachiger Guide", "Open Bar an Bord", "Leichtes Mittagessen"]
    },
    excludes: {
      es: ["Impuesto de muelle ($5 USD)", "Propinas", "Transporte desde hotel distante"],
      en: ["Dock fee ($5 USD)", "Tips", "Transport from distant hotels"],
      fr: ["Taxe de quai (5 $ USD)", "Pourboires", "Transport depuis l'hôtel"],
      pt: ["Taxa de cais ($5 USD)", "Gorjetas", "Transporte do hotel"],
      de: ["Hafengebühr (5 USD)", "Trinkgelder", "Hoteltransfer"]
    }
  },
  {
    id: "tour-2",
    slug: "yate-privado-cancun-isla-mujeres",
    destination: "cancun",
    status: "published",
    duration: "6 horas",
    maxCapacity: 15,
    priceAdult: 3500,
    priceChild: 2100,
    rating: 5.0,
    reviewsCount: 62,
    images: ["/images/tour-yacht.jpg", "/images/cancun.jpg", "/images/hero.jpg"],
    title: {
      es: "Paseo en Yate Privado a Isla Mujeres",
      en: "Private Yacht Tour to Isla Mujeres",
      fr: "Tour Privé en Yacht vers Isla Mujeres",
      pt: "Passeio de Iate Privado para Isla Mujeres",
      de: "Private Yacht-Tour nach Isla Mujeres"
    },
    shortDescription: {
      es: "Navega el turquesa del Mar Caribe en un yate de lujo con servicio VIP, barra libre, snorkel en arrecifes y tiempo libre en Playa Norte.",
      en: "Sail the turquoise Caribbean Sea on a luxury yacht with VIP service, open bar, reef snorkeling, and free time at Playa Norte.",
      fr: "Naviguez sur la mer des Caraïbes à bord d'un yacht de luxe avec service VIP, open bar et plongée sur les récifs.",
      pt: "Navegue pelo Mar do Caribe em um iate de luxo com serviço VIP, open bar, snorkel em recifes e tempo em Playa Norte.",
      de: "Segeln Sie auf einer Luxusyacht über das karibische Meer mit VIP-Service, Open Bar und Schnorcheln am Riff."
    },
    fullDescription: {
      es: "Viva un día inolvidable en el Caribe Mexicano a bordo de nuestro exclusivo yate privado. Zarparemos desde Cancún surcando aguas turquesa hacia Isla Mujeres. Haremos una parada para hacer snorkel en el arrecife El Meco con impresionantes estatuas submarinas. Disfrutará de ceviche fresco a bordo, bebidas ilimitadas y desembarque VIP en Playa Norte, catalogada como una de las mejores playas del mundo.",
      en: "Live an unforgettable day in the Mexican Caribbean aboard our exclusive private yacht. Set sail from Cancun across turquoise waters towards Isla Mujeres. Stop to snorkel at El Meco reef with underwater sculptures. Enjoy fresh ceviche on board, unlimited drinks, and VIP drop-off at Playa Norte.",
      fr: "Vivez une journée inoubliable dans les Caraïbes mexicaines. Naviguez de Cancún à Isla Mujeres, plongez dans le récif El Meco et profitez d'un ceviche frais à bord avec boissons illimitées.",
      pt: "Viva um dia inesquecível no Caribe Mexicano a bordo do nosso iate privado exclusivo. Navegue de Cancún até Isla Mujeres com ceviche fresco, open bar e parada no recife El Meco.",
      de: "Erleben Sie einen unvergesslichen Tag in der mexikanischen Karibik an Bord unserer privaten Luxusyacht mit Schnorcheln am El Meco Riff, frischem Ceviche und Open Bar."
    },
    includes: {
      es: ["Yate privado por 6 horas", "Capitán y marinero VIP", "Ceviche y guacamole recién hecho", "Barra libre premium", "Equipo de snorkel"],
      en: ["6-hour private yacht", "Captain and VIP crew", "Fresh ceviche & guacamole", "Premium open bar", "Snorkel equipment"],
      fr: ["Yacht privé de 6 heures", "Capitaine et équipage VIP", "Ceviche et guacamole frais", "Open bar premium", "Matériel de plongée"],
      pt: ["Iate privado por 6 horas", "Capitão e equipe VIP", "Ceviche e guacamole frescos", "Open bar premium", "Equipamento de snorkel"],
      de: ["6 Stunden private Yacht", "Kapitän und VIP-Crew", "Frisches Ceviche & Guacamole", "Premium Open Bar", "Schnorchelausrüstung"]
    },
    excludes: {
      es: ["Impuesto de muelle ($15 USD por persona)", "Propinas a la tripulación"],
      en: ["Dock tax ($15 USD per person)", "Crew gratuities"],
      fr: ["Taxe de quai (15 $ USD/personne)", "Pourboires"],
      pt: ["Taxa de cais ($15 USD por pessoa)", "Gorjetas"],
      de: ["Hafengebühr (15 USD pro Person)", "Trinkgelder"]
    }
  },
  {
    id: "tour-3",
    slug: "ruinas-chichen-itza-cenote",
    destination: "cancun",
    status: "published",
    duration: "10 horas",
    maxCapacity: 20,
    priceAdult: 1800,
    priceChild: 1200,
    rating: 4.8,
    reviewsCount: 95,
    images: ["/images/tour-ruins.jpg", "/images/cancun.jpg", "/images/hero.jpg"],
    title: {
      es: "Excursión a Chichén Itzá, Cenote Sagrado y Valladolid",
      en: "Chichen Itza, Sacred Cenote & Valladolid Tour",
      fr: "Excursion à Chichén Itzá, Cénote Sacré et Valladolid",
      pt: "Excursão a Chichén Itzá, Cenote Sagrado e Valladolid",
      de: "Chichén Itzá, Heiliges Cenote & Valladolid Tour"
    },
    shortDescription: {
      es: "Descubre una de las 7 Maravillas del Mundo Moderno con guía arqueológico experto, nada en un cenote sagrado subterráneo y come comida yucateca.",
      en: "Discover one of the 7 Wonders of the Modern World with an expert guide, swim in a sacred cenote, and savor authentic Mayan cuisine.",
      fr: "Découvrez l'une des 7 merveilles du monde avec un guide expert, nagez dans un cénote sacré et dégustez la cuisine locale.",
      pt: "Descubra uma das 7 Maravilhas do Mundo Moderno com guia especializado, nade em um cenote sagrado e saboreie a culinária maia.",
      de: "Entdecken Sie eines der 7 Weltwunder der Moderne mit einem Experten, schwimmen Sie in einer heiligen Cenote und genießen Sie maya-Küche."
    },
    fullDescription: {
      es: "Viaje al corazón de la civilización maya. Nuestro recorrido inicia temprano con transporte de lujo con aire acondicionado. En Chichén Itzá realizarás un recorrido guiado por la Pirámide de Kukulcán, el Juego de Pelota y el Observatorio. Posteriormente nos trasladaremos a un deslumbrante cenote de cristalinas aguas subterráneas para un refrescante baño y cerraremos con comida buffet regional y una caminata por el pueblo mágico de Valladolid.",
      en: "Journey to the heart of Maya civilization. Early departure in luxury AC transport. At Chichen Itza, enjoy a guided tour of Kukulcan Pyramid, the Ball Court, and Observatory. Next, swim in a stunning crystal-clear underground cenote, followed by a regional buffet lunch and a visit to Valladolid colonial town.",
      fr: "Voyagez au cœur de la civilisation maya. Visitez la pyramide de Kukulcán, baignez-vous dans un magnifique cénote et profitez d'un buffet traditionnel à Valladolid.",
      pt: "Viaje ao coração da civilização maia. Visite a pirâmide de Kukulcán, nade em um cenote cristalino e desfrute de um almoço buffet típico.",
      de: "Reisen Sie ins Herz der Maya-Zivilisation. Geführter Rundgang durch Chichén Itzá, Schwimmen in einer wunderschönen Cenote und schmackhaftes Buffet."
    },
    includes: {
      es: ["Transporte redondo con A/A", "Entradas VIP a Chichén Itzá", "Guía certificado bilingüe", "Acceso y nado en Cenote", "Comida buffet yucateca"],
      en: ["Roundtrip AC transport", "VIP tickets to Chichen Itza", "Certified bilingual guide", "Cenote entry and swim", "Yucatecan buffet lunch"],
      fr: ["Transport A/C aller-retour", "Entrées VIP à Chichén Itzá", "Guide certifié", "Baignade au Cénote", "Buffet yucatèque"],
      pt: ["Transporte A/C ida e volta", "Ingressos VIP Chichén Itzá", "Guia certificado", "Entrada no cenote", "Almoço buffet"],
      de: ["Klimatisierter Hin- und Rücktransfer", "VIP-Tickets Chichén Itzá", "Zertifizierter Guide", "Cenote-Eintritt", "Maya-Buffet"]
    },
    excludes: {
      es: ["Impuesto de conservación estatal ($350 MXN)", "Renta de chaleco en cenote", "Bebidas en el restaurante"],
      en: ["State conservation fee ($350 MXN)", "Life jacket rental at cenote", "Drinks at restaurant"],
      fr: ["Taxe d'État ($350 MXN)", "Gilet de sauvetage", "Boissons"],
      pt: ["Taxa estadual ($350 MXN)", "Colete salva-vidas", "Bebidas"],
      de: ["Staatsgebühr ($350 MXN)", "Schwimmweste", "Getränke"]
    }
  },
  {
    id: "tour-4",
    slug: "canopy-zipline-vallarta",
    destination: "vallarta",
    status: "published",
    duration: "5 horas",
    maxCapacity: 10,
    priceAdult: 1600,
    priceChild: 1100,
    rating: 4.9,
    reviewsCount: 39,
    images: ["/images/tour-zipline.jpg", "/images/vallarta.jpg", "/images/hero.jpg"],
    title: {
      es: "Canopy & Tirolesas en la Sierra Madre de Vallarta",
      en: "Sierra Madre Canopy & Zipline Adventure in Vallarta",
      fr: "Aventure Tyrolienne dans la Sierra Madre de Vallarta",
      pt: "Aventura de Tirolesa na Sierra Madre em Vallarta",
      de: "Zipline-Abenteuer in den Sierra Madre Bergen"
    },
    shortDescription: {
      es: "Vuela sobre las copas del bosque tropical en la tirolesa más larga de Puerto Vallarta y termina relajándote en el río con cata de tequila.",
      en: "Fly above the tropical rainforest canopy on Puerto Vallarta's longest ziplines and unwind at the river with tequila tasting.",
      fr: "Volez au-dessus de la forêt tropicale sur la plus longue tyrolienne de Puerto Vallarta et profitez d'une dégustation de tequila.",
      pt: "Voe sobre a floresta tropical na tirolesa mais longa de Puerto Vallarta e relaxe no rio com degustação de tequila.",
      de: "Fliegen Sie an der längsten Zipline von Puerto Vallarta über das Blätterdach des Regenwaldes und genießen Sie Tequila-Tasting."
    },
    fullDescription: {
      es: "Sienta la adrenalina pura en la selva tropical de Puerto Vallarta. Nuestro circuito de 11 tirolesas certificadas por estándares internacionales ofrece vistas panorámicas impresionantes de las montañas de la Sierra Madre. Al finalizar la ruta en las alturas, realizaremos una caminata por el río Cuale, donde podrá nadar en piscinas naturales y disfrutar de una clase interactiva y degustación artesanal de tequila.",
      en: "Feel the pure adrenaline in Puerto Vallarta's tropical rainforest. Our 11-zipline circuit meets international safety standards and offers breathtaking mountain views of the Sierra Madre. After the aerial course, enjoy a walk along the Cuale River, swim in natural pools, and experience an artisanal tequila tasting.",
      fr: "Ressentez l'adrénaline dans la forêt tropicale. 11 tyroliennes vous offrent des vues spectaculaires sur la Sierra Madre. Baignade dans la rivière et dégustation de tequila incluses.",
      pt: "Sinta a adrenalina na selva tropical. Circuito de 11 tirolesas com vistas espetaculares. Termine com mergulho no rio e degustação de tequila.",
      de: "Spüren Sie das reine Adrenalin im Regenwald von Puerto Vallarta. 11 Ziplines bieten atemberaubende Ausblicke. Inklusive Flussbad und Tequila-Verkostung."
    },
    includes: {
      es: ["Circuito de 11 tirolesas", "Equipo de seguridad Petzl", "Guías expertos de aventura", "Degustación artesanal de tequila", "Transporte en Unimog 4x4"],
      en: ["11 zipline circuit", "Petzl safety equipment", "Expert adventure guides", "Artisanal tequila tasting", "4x4 Unimog transport"],
      fr: ["Circuit de 11 tyroliennes", "Équipement de sécurité", "Guides d'aventure experts", "Dégustation de tequila", "Transport 4x4"],
      pt: ["Circuito de 11 tirolesas", "Equipamento de segurança", "Guias especialistas", "Degustação de tequila", "Transporte 4x4"],
      de: ["11 Ziplines-Parcours", "Sicherheitsausrüstung", "Erfahrene Adventure-Guides", "Tequila-Tasting", "4x4 Transfer"]
    },
    excludes: {
      es: ["Fotografías de la actividad", "Comida en restaurante de la selva"],
      en: ["Action photos", "Food at jungle restaurant"],
      fr: ["Photos", "Repas au restaurant"],
      pt: ["Fotos", "Comida no restaurante"],
      de: ["Fotos", "Speisen im Restaurant"]
    }
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: "test-1",
    name: "Carlos & Mariana Ruiz",
    destination: "Los Cabos",
    rating: 5,
    photo: "/images/hero.jpg",
    text: {
      es: "¡El tour al Arco en Los Cabos fue la highlight de nuestra luna de miel! El personal súper atento y el snorkel inolvidable. 100% recomendados.",
      en: "The Arch tour in Los Cabos was the highlight of our honeymoon! Super attentive staff and unforgettable snorkeling. 100% recommended.",
      fr: "La visite de l'Arche à Los Cabos était le moment fort de notre lune de miel! Personnel très attentionné et plongée inoubliable.",
      pt: "O passei ao Arco em Los Cabos foi o ponto alto da nossa lua de mel! Atendimento incrível e snorkel inesquecível.",
      de: "Die Bogen-Tour in Los Cabos war das Highlight Flitterwochen! Sehr aufmerksames Personal und unvergessliches Schnorcheln."
    }
  },
  {
    id: "test-2",
    name: "Sarah & David Miller",
    destination: "Cancún",
    rating: 5,
    photo: "/images/hero.jpg",
    text: {
      es: "Rentamos el yate privado a Isla Mujeres con GoTravel. El servicio VIP a bordo, el ceviche fresco y la playa Norte superaron todas nuestras expectativas.",
      en: "We rented the private yacht to Isla Mujeres with GoTravel. The VIP onboard service, fresh ceviche, and Playa Norte exceeded all our expectations.",
      fr: "Nous avons loué le yacht privé vers Isla Mujeres. Le service VIP, le ceviche frais et la plage de Playa Norte ont dépassé nos attentes.",
      pt: "Alugamos o iate privado para Isla Mujeres com a GoTravel. O serviço VIP, o ceviche fresco e a praia superaram todas as expectativas.",
      de: "Wir haben die private Yacht nach Isla Mujeres gebucht. Der VIP-Service an Bord und das frische Ceviche waren einfach fantastisch!"
    }
  }
];
