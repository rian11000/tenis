import { Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  // Signature / Hero Product
  {
    id: 'vault-v1-nocturnal',
    name: 'VAULT V.1 "NOCTURNAL"',
    category: 'men',
    price: 425.00,
    originalPrice: 550.00,
    code: 'V.1',
    color: 'Stealth Black / Rose Gold',
    colors: ['#121212', '#C5A059', '#3E3E3E'],
    sizes: ['7', '8', '9', '10', '11', '12', '13', '14'],
    tags: ['SIGNATURE SERIES', 'LIMITED'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', // Black luxury sneaker
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop', // Close up lace
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop', // Side profile
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop'  // Concrete floor sneaker
    ],
    details: 'Born from the shadows of late-night studio sessions and the raw architectural grit of industrial Brooklyn, the V.1 "Nocturnal" is a manifesto of underground hip-hop culture translated into structural design. We stripped the unnecessary, leaving only a silhouette that commands authority without speaking.',
    materials: [
      'Triple-layered ballistic nylon structure',
      'Premium vegetable-tanned Italian calfskin panels',
      'Custom high-density Vibram rubber sole unit',
      'Laser-etched anodized aluminum hardware'
    ],
    shipping: 'Free Express Shipping for Members. Orders are processed within 24-48 hours. Standard delivery 3-5 business days. International shipping available.'
  },

  // Home Screen New Arrivals
  {
    id: 'vlt-01-prototype',
    name: 'VLT-01 PROTOTYPE',
    category: 'men',
    price: 240.00,
    code: '/01',
    color: 'Stealth Black',
    sizes: ['8', '9', '10', '11'],
    tags: ['SOLD OUT'],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'The initial concept sneaker representing the foundation of our design ethos. Deconstructed panels and exposed cushioning cores.',
    materials: ['Recycled polymers', 'Neoprene sleeve inner lining', 'TPU outer cage']
  },
  {
    id: 'canyon-tech-boot',
    name: 'CANYON TECH BOOT',
    category: 'men',
    price: 380.00,
    code: '/02',
    color: 'Industrial Black / Charcoal',
    sizes: ['7', '8', '9', '10', '11', '12'],
    tags: ['NEW ARRIVAL'],
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'All-terrain tactical boot engineered with weatherproofing and industrial support bands. Built for concrete and mud alike.',
    materials: ['Waterproof full-grain leather', 'Gore-Tex lining', 'Vibram Commando Outsole']
  },
  {
    id: 'steel-link-wallet',
    name: 'STEEL LINK WALLET',
    category: 'accessories',
    price: 110.00,
    code: '/03',
    color: 'Brushed Chrome',
    sizes: ['O/S'],
    tags: ['LIMITED'],
    images: [
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Brutalist chrome steel card container secured with heavy industrial link chains and secure locking clips.',
    materials: ['Solid aircraft-grade aluminum', 'Heavy-gauge steel link chain']
  },
  {
    id: 'core-heavy-hoodie',
    name: 'CORE HEAVY HOODIE',
    category: 'apparel',
    price: 185.00,
    code: '/04',
    color: 'Washed Charcoal',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['BESTSELLER'],
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Oversized heavyweight French terry hoodie. Acid washed for a broken-in vintage patina with subtle distressed hemlines.',
    materials: ['100% Organic Cotton French Terry (500 GSM)', 'Double-layered hood', 'Hidden kangaroo side pockets']
  },

  // Men's Sneakers Grid
  {
    id: 'vault-01-urban',
    name: 'VAULT-01 URBAN',
    category: 'men',
    price: 285.00,
    code: '/05',
    color: 'Cloud White / Ghost Grey',
    sizes: ['7', '8', '9', '10', '11', '12'],
    tags: ['LIMITED RELEASE'],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Clean, sculptural architectural sneaker in premium matte white calfskin. Subtle embossed detailing and hidden double lacing.',
    materials: ['Italian Nappa Leather', 'Full leather lining', 'Hand-stitched cupsole']
  },
  {
    id: 'vault-02-echo',
    name: 'VAULT-02 ECHO',
    category: 'men',
    price: 310.00,
    code: '/06',
    color: 'Stealth Black / Volt',
    sizes: ['8', '9', '10', '11'],
    tags: ['NEW'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'High-density tech runner featuring a reactive carbon plate and sharp high-frequency weld accents in vibrant Volt.',
    materials: ['Engineered knit upper', 'Carbon fiber propulsive plate', 'Dual-density foam midsole']
  },
  {
    id: 'vault-03-kinetic',
    name: 'VAULT-03 KINETIC',
    category: 'men',
    price: 345.00,
    code: '/07',
    color: 'Sand / Ash Mono',
    sizes: ['7', '8', '9', '10', '11', '12'],
    tags: ['NEW ARRIVAL'],
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Technical tactical silhouette featuring an industrial buckle ankle closure and military-spec sand suede panels.',
    materials: ['Premium military suede', 'Anodized buckle closure', 'Reinforced heel counter']
  },
  {
    id: 'vault-04-razor',
    name: 'VAULT-04 RAZOR',
    category: 'men',
    price: 265.00,
    code: '/08',
    color: 'Pure White / Bone',
    sizes: ['7', '8', '9', '10', '11'],
    tags: [],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Futuristic skate shoe with thick protective strap overlays and exposed stitching, built for urban friction.',
    materials: ['Deconstructed heavyweight canvas', 'Vulc-reinforced rubber base']
  },
  {
    id: 'vault-05-vector',
    name: 'VAULT-05 VECTOR',
    category: 'men',
    price: 420.00,
    code: '/09',
    color: 'Carbon / Obsidian',
    sizes: ['8', '9', '10', '11', '12'],
    tags: ['LIMITED'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Ultra-low minimalist tennis profile featuring charcoal premium oiled leather that patinas with wear.',
    materials: ['Vegetable-tanned calfskin leather', 'Aniline finish interior', 'Natural crepe rubber sole']
  },
  {
    id: 'vault-06-archive',
    name: 'VAULT-06 ARCHIVE',
    category: 'men',
    price: 395.00,
    code: '/10',
    color: 'Cement / Granite',
    sizes: ['9', '10', '11'],
    tags: ['SOLD OUT'],
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Aggressive trail runner in multi-toned concrete hues, utilizing recycled rubber and protective structural mudguards.',
    materials: ['Recycled ocean plastics mesh', 'Abrasion-resistant TPU overlay', 'Flecked trail sole']
  },
  {
    id: 'vault-07-apex',
    name: 'VAULT-07 APEX',
    category: 'men',
    price: 245.00,
    code: '/11',
    color: 'White / Fire Orange',
    sizes: ['7', '8', '9', '10', '11', '12'],
    tags: [],
    images: [
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Clean casual runner with responsive foam nodes and a retro-brutalist tongue structure.',
    materials: ['Perforated soft leather', 'Suede tongue', 'Eva responsive cushioning']
  },
  {
    id: 'vault-08-pulse',
    name: 'VAULT-08 PULSE',
    category: 'men',
    price: 290.00,
    code: '/12',
    color: 'Phantom / Ice',
    sizes: ['8', '9', '10', '11', '12'],
    tags: ['LIMITED'],
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Architectural tech runner in striking ice white mesh wrapped in a cage of solid silver-colored structural TPU.',
    materials: ['Aero-mesh weave', 'High-shine silver TPU overlay', 'Translucent gel heel unit']
  },

  // Women's Sneakers Grid
  {
    id: 'aero-01-chrome',
    name: 'AERO-01 CHROME',
    category: 'women',
    price: 420.00,
    code: 'W.01',
    color: 'Matte Black / Chrome',
    sizes: ['5', '6', '7', '8', '9'],
    tags: ['NEW ARRIVAL'],
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Sleek aerodynamic trainer featuring micro-mesh paneling and high-polish reflective metallic chrome accents.',
    materials: ['Micro-weave ballistic synthetic', 'Chrome vacuum-plated heel clips', 'Phylon midsole']
  },
  {
    id: 'v-brutalist-high',
    name: 'V-BRUTALIST HIGH',
    category: 'women',
    price: 560.00,
    code: 'W.02',
    color: 'Bone White',
    sizes: ['6', '7', '8', '9', '10'],
    tags: ['LIMITED'],
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Avant-garde high-top silhouette built with a massive, hand-sculpted vulcanized rubber outsole styled after brutalist concrete blocks.',
    materials: ['Full-grain pebbled calf leather', 'Reinforced double stitches', 'Chunky brutalist platform base']
  },
  {
    id: 'iris-velocity',
    name: 'IRIS VELOCITY',
    category: 'women',
    price: 385.00,
    code: 'W.03',
    color: 'Metallic Iridium / Carbon',
    sizes: ['5', '6', '7', '8', '9'],
    tags: ['LIMITED EDITION'],
    images: [
      'https://images.unsplash.com/photo-1534330207526-8e81f10ec6fe?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'High-performance road runner styled with a metallic iridium cage overlay that shifts hues under direct industrial floodlights.',
    materials: ['Reflective mesh', 'Iridium-coated TPU structural ribs', 'Grip-traction compound sole']
  },
  {
    id: 'buckle-m01-red',
    name: 'BUCKLE-M01 RED',
    category: 'women',
    price: 610.00,
    code: 'W.04',
    color: 'Oxblood Red / Industrial Black',
    sizes: ['6', '7', '8', '9', '10'],
    tags: ['LIMITED'],
    images: [
      'https://images.unsplash.com/photo-1508184964240-ee96bb967744?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Luxury oxblood leather boot-sneaker hybrid featuring a robust cobra-style industrial quick-release aluminum ankle buckle.',
    materials: ['Oxblood hand-stained cowhide', 'Anodized black rapid buckle', 'High-sidewall cupsole']
  },
  {
    id: 'onyx-glass-sock',
    name: 'ONYX GLASS SOCK',
    category: 'women',
    price: 495.00,
    code: 'W.05',
    color: 'Tech Knit Black',
    sizes: ['5', '6', '7', '8', '9'],
    tags: [],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Seamless performance compression sock boot, mounted on a solid, hand-cut clear acrylic block heel mimicking broken industrial glass.',
    materials: ['Polyamide high-stretch tech knit', 'Clear acrylic block core', 'Internal heel stabilizing shank']
  },
  {
    id: 'raw-stitch-09',
    name: 'RAW STITCH 09',
    category: 'women',
    price: 340.00,
    code: 'W.06',
    color: 'Deconstructed Canvas / Neon Stitch',
    sizes: ['5', '6', '7', '8', '9', '10'],
    tags: [],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop'
    ],
    details: 'Heavy raw cotton canvas low-top sneaker featuring deconstructed raw edges and bright orange exposed industrial-gauge stitching threads.',
    materials: ['14oz Unwashed raw canvas', 'Neon industrial-gauge thread', 'Raw rubber gum sole']
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'berlin-underground',
    title: 'BERLIN UNDERGROUND: A VISUAL JOURNEY THROUGH BRUTALISM',
    date: 'Nov 12',
    description: 'Exploring the relationship between 1960s architecture and modern techwear aesthetics in the heart of Germany.',
    category: 'ARCHITECTURE'
  },
  {
    id: 'vault-playlist-009',
    title: 'THE SOUND OF THE VAULT: CURATED PLAYLIST 009',
    date: 'Nov 08',
    description: 'Low-frequency ambient and industrial techno selection for the late-night design sessions.',
    category: 'AUDIO ARCHIVE / 001'
  },
  {
    id: 'sustainable-deconstruction',
    title: 'SUSTAINABLE DECONSTRUCTION: OUR NEW DESIGN PHILOSOPHY',
    date: 'Oct 29',
    description: 'How we are reimagining manufacturing waste into premium limited-edition streetwear components.',
    category: 'VISUAL STUDY / 042'
  }
];
