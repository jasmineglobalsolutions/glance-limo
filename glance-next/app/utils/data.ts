type TourTemplate = {
  title: string;
  category: string;
  desc: string;
  adult: number;
  child: number;
  duration: string;
  image: string;
};

export const imagePool = {
  city: [
    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80'
  ],
  night: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
  ],
  food: [
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'
  ],
  heritage: [
    'https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80'
  ],
  family: [
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80'
  ],
  shopping: [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=1200&q=80'
  ],
  nature: [
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  ],
  luxury: [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80'
  ],
  river: [
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80'
  ]
};

export const singaporeTourTemplates = [
  { title: 'Singapore City Highlights Tour', category: 'City', desc: 'Classic city orientation through Marina Bay, Civic District and signature landmarks.', adult: 120, child: 90, duration: '4 Hrs', image: imagePool.city[0] },
  { title: 'Singapore By Night Tour', category: 'Night', desc: 'Premium evening experience with skyline, waterfront lights and major photo points.', adult: 148, child: 108, duration: '4 Hrs', image: imagePool.night[0] },
  { title: 'Singapore Food Discovery Tour', category: 'Food', desc: 'Private route through flavour districts and local culinary favourites.', adult: 140, child: 100, duration: '4 Hrs', image: imagePool.food[0] },
  { title: 'Historic Singapore Heritage Tour', category: 'Heritage', desc: 'Cultural and heritage-led journey through old Singapore and iconic stories.', adult: 132, child: 96, duration: '4 Hrs', image: imagePool.heritage[0] },
  { title: 'Sentosa Family Adventure Tour', category: 'Family', desc: 'Family-friendly touring with attractions, comfort and simple planning.', adult: 168, child: 128, duration: '5 Hrs', image: imagePool.family[0] },
  { title: 'Orchard Road Shopping Tour', category: 'Shopping', desc: 'Curated private shopping route with luxury malls and city convenience.', adult: 138, child: 98, duration: '4 Hrs', image: imagePool.shopping[0] },
  { title: 'Gardens & Nature Escape Tour', category: 'Nature', desc: 'Relaxed greenery route blending iconic gardens and scenic viewpoints.', adult: 146, child: 106, duration: '4 Hrs', image: imagePool.nature[0] },
  { title: 'Singapore VIP Luxury Tour', category: 'Luxury', desc: 'High-end chauffeur experience designed for premium guests and executives.', adult: 220, child: 168, duration: '5 Hrs', image: imagePool.luxury[0] },
  { title: 'Marina Bay Photo Tour', category: 'City', desc: 'Photo-driven city route for skyline lovers and first-time visitors.', adult: 126, child: 92, duration: '4 Hrs', image: imagePool.city[1] },
  { title: 'Singapore River Evening Tour', category: 'Night', desc: 'Waterfront and riverside route built for a softer luxury night experience.', adult: 152, child: 110, duration: '4 Hrs', image: imagePool.river[0] }
];

export const malaysiaTourTemplates = [
  { title: 'Johor Bahru City Highlights Tour', category: 'Johor City', desc: 'Classic JB orientation route from Singapore with private chauffeur attached throughout.', adult: 325, child: 245, duration: '8 Hrs', image: imagePool.city[1] },
  { title: 'Legoland Family Tour', category: 'Family', desc: 'Family product with stronger attraction value and private transport comfort.', adult: 455, child: 345, duration: '8 Hrs', image: imagePool.family[0] },
  { title: 'Desaru Coastal Escape Tour', category: 'Desaru', desc: 'Scenic Desaru route built around coastline views and private comfort.', adult: 458, child: 345, duration: '10 Hrs', image: imagePool.nature[0] },
  { title: 'Melaka Heritage Highlights Tour', category: 'Melaka', desc: 'Full-day Melaka signature route from Singapore using a 12-hour structure.', adult: 558, child: 420, duration: '12 Hrs', image: imagePool.heritage[1] },
  { title: 'Johor Premium Shopping Tour', category: 'Shopping', desc: 'Private shopping day focused on outlets, malls and smooth border handling.', adult: 368, child: 278, duration: '8 Hrs', image: imagePool.shopping[0] },
  { title: 'Johor Food Hunt Tour', category: 'Food', desc: 'Private culinary route for guests who want a stronger JB local food experience.', adult: 355, child: 265, duration: '8 Hrs', image: imagePool.food[1] },
  { title: 'Johor Heritage Discovery Tour', category: 'Heritage', desc: 'Cultural landmarks and heritage stops with full-day chauffeur support.', adult: 345, child: 258, duration: '8 Hrs', image: imagePool.heritage[0] },
  { title: 'Kuala Lumpur Signature Day Tour', category: 'Kuala Lumpur', desc: 'Long-distance premium trip for clients wanting a powerful KL day experience.', adult: 688, child: 518, duration: '14 Hrs', image: imagePool.city[0] },
  { title: 'Johor Nature & Leisure Tour', category: 'Nature', desc: 'Greenery, open-space and scenic leisure route with private driver comfort.', adult: 376, child: 282, duration: '8 Hrs', image: imagePool.nature[1] },
  { title: 'Hello Kitty Family Tour', category: 'Family', desc: 'Soft family touring route for young children and relaxed group travel.', adult: 432, child: 326, duration: '8 Hrs', image: imagePool.family[1] }
];

export const sharedTours = [
  { title: '3.5hrs City Tour', category: 'Explore Singapore', desc: 'Shared Singapore city highlights tour with adult and child per-person pricing.', adult: 50, child: 35, duration: '3.5 Hrs', image: imagePool.city[0] },
  { title: '4hrs Morning at the Zoo', category: 'Wildlife Encounter', desc: 'Shared wildlife tour option without breakfast, priced by adult and child categories.', adult: 112, child: 78, duration: '4 Hrs', image: imagePool.family[1] },
  { title: 'Night Safari - Without Dinner', category: 'After Dark', desc: 'Shared Night Safari experience with priority tram boarding and evening route timing.', adult: 124, child: 88, duration: '4.5 Hrs', image: imagePool.night[1] },
  { title: 'Stories of Chinatown', category: 'Walking Tour', desc: 'Shared cultural storytelling and walking experience through Chinatown.', adult: 118, child: 83, duration: '4 Hrs', image: imagePool.heritage[0] },
  { title: 'River Wonders Shared Tour', category: 'Wildlife Encounter', desc: 'A relaxed shared wildlife and river-themed experience for families.', adult: 114, child: 79, duration: '4 Hrs', image: imagePool.river[0] },
  { title: 'Sentosa Shared Highlights', category: 'Explore Singapore', desc: 'Shared sightseeing route across one of Singapore’s most popular leisure districts.', adult: 98, child: 72, duration: '4 Hrs', image: imagePool.city[1] },
  { title: 'Little India & Kampong Glam Walk', category: 'Walking Tour', desc: 'Culture-led shared experience through colourful heritage neighbourhoods.', adult: 76, child: 56, duration: '3 Hrs', image: imagePool.heritage[1] },
  { title: 'Singapore Flyer & Marina Evening', category: 'After Dark', desc: 'Shared evening route with skyline viewing and easy city access.', adult: 108, child: 78, duration: '3.5 Hrs', image: imagePool.night[0] },
  { title: 'Hawker Food Trail', category: 'Explore Singapore', desc: 'Shared casual food route with local favourites and simple city pickup.', adult: 92, child: 66, duration: '3 Hrs', image: imagePool.food[0] },
  { title: 'River Cruise & City Lights', category: 'Cruise & River', desc: 'Shared river and skyline combination made for evening visitors.', adult: 102, child: 74, duration: '3.5 Hrs', image: imagePool.river[1] },
  { title: 'Jurong Bird & Nature Trail', category: 'Wildlife Encounter', desc: 'Shared nature-led outing with family-friendly pace and timing.', adult: 116, child: 82, duration: '4 Hrs', image: imagePool.nature[0] }
];

export function expandToFifty(baseList: TourTemplate[]) {
  const result: TourTemplate[] = [];
  for (let i = 0; i < 50; i++) {
    const base = baseList[i % baseList.length];
    const round = Math.floor(i / baseList.length) + 1;
    result.push({
      title: round === 1 ? base.title : `${base.title} ${round}`,
      category: base.category,
      desc: base.desc,
      adult: base.adult + (round - 1) * 6,
      child: base.child + (round - 1) * 5,
      duration: base.duration,
      image: base.image
    });
  }
  return result;
}

export const singaporeToursAll = expandToFifty(singaporeTourTemplates).map((item, index) => ({
  ...item,
  serviceMode: [0, 1, 3, 5, 6, 8].includes(index % 10) ? 'full-driver' : 'two-way'
}));
export const malaysiaToursAll = expandToFifty(malaysiaTourTemplates).map(item => ({
  ...item,
  serviceMode: 'full-driver'
}));

export const fleetData = [
  {
    title: 'Mercedes S-Class',
    tag: 'Luxury',
    desc: 'Flagship luxury chauffeur choice for VIP and premium executive bookings.',
    image: 'https://glance-limousine.s3.ap-south-1.amazonaws.com/cars/6f0e79b6-ae0d-41a9-8eae-6fb2f259d97f.png'
  },
  {
    title: 'Toyota Alphard / Vellfire',
    tag: 'Business',
    desc: 'Popular luxury MPV for airport, hotel and family transport.',
    image: 'https://glance-limousine.s3.ap-south-1.amazonaws.com/cars/42e6e766-e85a-4939-9204-ab0d02e59be9.png'
  },
  {
    title: 'Toyota Harrier',
    tag: 'Premium',
    desc: 'Premium SUV choice for comfortable city and airport transfers.',
    image: 'https://glance-limousine.s3.ap-south-1.amazonaws.com/cars/514def07-07d3-4156-bf3f-cfe81426a1c4.png'
  },
  {
    title: 'Honda Shuttle',
    tag: 'Economy',
    desc: 'Practical and reliable station wagon for cost-effective city travel.',
    image: 'https://glance-limousine.s3.ap-south-1.amazonaws.com/cars/1ee55a3c-c75f-431a-b09a-89b90727f59a.png'
  }
];

export const vehicleCapacities: Record<string, number> = {
  '0': 4,   // Economy
  '10': 6,  // Premium Economy
  '20': 4,  // Business Class
  '90': 2   // Luxury Class
};

export const prices: Record<string, Record<string, number>> = {
  'Johor Bahru': { Economy: 180, Premium: 250, Business: 300, Luxury: 500 },
  'Pontian': { Economy: 260, Premium: 400, Business: 480, Luxury: 800 },
  'Desaru': { Economy: 270, Premium: 410, Business: 490, Luxury: 820 },
  'Kluang': { Economy: 312, Premium: 468, Business: 560, Luxury: 935 },
  'Batu Pahat': { Economy: 360, Premium: 500, Business: 600, Luxury: 1000 },
  'Muar': { Economy: 420, Premium: 585, Business: 700, Luxury: 1170 },
  'Melacca': { Economy: 516, Premium: 720, Business: 860, Luxury: 1435 },
  'Kuala Lumpur': { Economy: 714, Premium: 995, Business: 1190, Luxury: 1985 },
  'Genting': { Economy: 762, Premium: 1065, Business: 1270, Luxury: 2120 },
  'Penang': { Economy: 1314, Premium: 1830, Business: 2190, Luxury: 3650 },
  'Hatyai': { Economy: 1662, Premium: 2315, Business: 2770, Luxury: 4620 }
};
