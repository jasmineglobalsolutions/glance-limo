const imagePool = {
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

const singaporeTourTemplates = [
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

const malaysiaTourTemplates = [
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

const sharedTours = [
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

function expandToFifty(baseList) {
  const result = [];
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

const singaporeTours = expandToFifty(singaporeTourTemplates).map((item, index) => ({
  ...item,
  serviceMode: [0, 1, 3, 5, 6, 8].includes(index % 10) ? 'full-driver' : 'two-way'
}));
const malaysiaTours = expandToFifty(malaysiaTourTemplates).map(item => ({
  ...item,
  serviceMode: 'full-driver'
}));

const fleetData = [
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

const vehicleCapacities = {
  '0': 4,   // Economy
  '10': 6,  // Premium Economy
  '20': 4,  // Business Class
  '90': 2   // Luxury Class
};

const cart = [];


function getCarIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11l1.4-4.2A3 3 0 0 1 9.25 4.75h5.5a3 3 0 0 1 2.85 2.05L19 11h.25A1.75 1.75 0 0 1 21 12.75V16a1 1 0 0 1-1 1h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H4a1 1 0 0 1-1-1v-3.25C3 11.78 3.78 11 4.75 11H5zm2.5 0h9l-1.1-3.28a1 1 0 0 0-.95-.67h-4.9a1 1 0 0 0-.95.67L7.5 11zm-.5 4.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm10 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z"></path></svg>`;
}

function getDriverMode(region, item) {
  if (region === 'Malaysia Tours') {
    return { type: 'full-driver', label: 'Private Full Driver', note: 'Driver stays with guests for the full tour duration.' };
  }
  if (region === 'Singapore Tours') {
    if (item.serviceMode === 'two-way') return { type: 'two-way', label: 'Two-Way Transfer', note: 'Driver sends guests to the tour and returns for the pickup back.' };
    return { type: 'full-driver', label: 'Full Driver', note: 'Driver remains with guests throughout the itinerary.' };
  }
  if (region === 'Seat In Coach') {
    return { type: 'shared', label: 'Shared Coach Tour', note: 'Seat-in-coach shared routing with scheduled coordination.' };
  }
  return { type: 'standard', label: 'Standard Service', note: '' };
}

function getStatusChip(region, item) {
  const mode = getDriverMode(region, item);
  const klass = mode.type === 'two-way' ? 'two-way' : 'full-driver';
  return `<div class="status-chip ${klass}">${getCarIcon()}<span>${mode.label}</span></div>`;
}

function getBookingRule(region) {
  if (region === 'Seat In Coach') return 'Adult & Child Pricing';
  if (region === 'Malaysia Tours') return 'Minimum 2 Adults · Private Tour';
  return 'Minimum 2 Adults to Go';
}


function getInclusions(region, item) {
  const mode = getDriverMode(region, item);
  if (region === 'Malaysia Tours') {
    return [
      'Private chauffeur vehicle from Singapore / designated pickup point',
      'Driver with guests throughout the full tour duration',
      'Adult and child pricing already includes the full private tour arrangement',
      `Duration: ${item.duration}`,
      `Tour mode: ${mode.label}`
    ];
  }
  if (region === 'Singapore Tours') {
    const routeLine = mode.type === 'two-way'
      ? 'Two-way chauffeur arrangement: send to tour and return pickup included'
      : 'Full-driver arrangement: chauffeur stays with guests throughout the itinerary';
    return [
      'Private chauffeur vehicle',
      routeLine,
      'Basic itinerary coordination',
      `Duration: ${item.duration}`,
      `Tour mode: ${mode.label}`
    ];
  }
  return region === 'Seat In Coach'
    ? ['Shared coach seat', 'English-speaking coordination', 'Main attraction stop routing', `Duration: ${item.duration}`, `Category: ${item.category}`]
    : ['Private chauffeur vehicle', 'Pickup and drop-off', 'Basic itinerary coordination', `Duration: ${item.duration}`, `Category: ${item.category}`];
}

function getExclusions(region) {
  return region === 'Seat In Coach'
    ? ['Personal expenses', 'Meals unless stated', 'Optional attraction upgrades']
    : ['Attraction tickets unless stated', 'Personal expenses', 'Overtime or extra stopovers'];
}

function setList(id, items) {
  document.getElementById(id).innerHTML = items.map(x => `<li>${x}</li>`).join('');
}

function renderTourCards(list, targetId, countId, buttonText, region) {
  const grid = document.getElementById(targetId);
  const count = document.getElementById(countId);
  if (!grid) return;
  grid.innerHTML = list.map((item, index) => `
        <div class="tour-card">
          <img src="${item.image}" alt="${item.title}">
          <div class="card-body">
            <span class="badge">${item.category}</span>
            <div class="status-row">${getStatusChip(region, item)}</div>
            <div class="tour-title">${item.title}</div>
            <div class="tour-desc">${item.desc}</div>
            <div class="meta">
              <div class="meta-box"><span class="meta-label">Adult</span><span class="meta-value">SGD ${item.adult}</span></div>
              <div class="meta-box"><span class="meta-label">Child</span><span class="meta-value">SGD ${item.child}</span></div>
              <div class="meta-box"><span class="meta-label">Duration</span><span class="meta-value">${item.duration}</span></div>
            </div>
            <div class="min-note">${getBookingRule(region)}</div>
            <div class="action-row">
              <button class="btn" data-region="${region}" data-target="${targetId}" data-index="${index}" onclick="openTourDetailByButton(this)">${buttonText}</button>
            </div>
          </div>
        </div>
      `).join('');
  if (count) count.textContent = `${list.length} tours`;
}

function renderFleetCards(list, targetId, isApiData = false) {
  const grid = document.getElementById(targetId);
  if (!grid) return;
  grid.innerHTML = list.map(item => {
    const title = isApiData ? item.name : item.title;
    const tag = isApiData ? item.category : item.tag;
    const desc = isApiData ? item.description : item.desc;
    const image = isApiData ? item.imageUrl : item.image;

    let extraInfo = '';
    if (isApiData) {
      extraInfo = `
            <div class="fleet-specs">
              <div class="spec-item"><i class="fas fa-users"></i> ${item.personCapacity} Pax</div>
              <div class="spec-item"><i class="fas fa-suitcase"></i> ${item.smallLuggage}S / ${item.bigLuggage}B</div>
            </div>
            <div class="fleet-pricing">
              <div class="price-item"><span>Hourly</span><strong>SGD ${item.pricePerHour}</strong></div>
              <div class="price-item"><span>Transfer</span><strong>SGD ${item.ratePerTransfer}</strong></div>
            </div>
          `;
    }

    return `
          <div class="card fleet-card">
            <div class="fleet-image" style="background-image:url('${image}');"></div>
            <div class="fleet-body">
              <span class="badge">${tag}</span>
              <h3>${title}</h3>
              ${extraInfo}
              <div class="action-row">
                <button class="btn full" onclick="window.location.hash='#contact'">View and Book</button>
              </div>
            </div>
          </div>
        `;
  }).join('');
}

async function fetchApiCars() {
  try {
    const response = await fetch('./cars.json');
    const cars = await response.json();
    renderFleetCards(cars, 'sgTransferGrid', true);
  } catch (error) {
    console.error('Error fetching cars:', error);
    // Fallback or error message could be added here
  }
}

function setupFilter(data, searchId, categoryId, targetId, countId, buttonText, region) {
  const searchEl = document.getElementById(searchId);
  const categoryEl = document.getElementById(categoryId);
  function update() {
    const search = searchEl.value.trim().toLowerCase();
    const category = categoryEl.value;
    const filtered = data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search) || item.category.toLowerCase().includes(search);
      const matchesCategory = category === 'All' || item.category === category;
      return matchesSearch && matchesCategory;
    });
    window[`${targetId}Data`] = filtered;
    renderTourCards(filtered, targetId, countId, buttonText, region);
  }
  searchEl.addEventListener('input', update);
  categoryEl.addEventListener('change', update);
  update();
}

let currentDetailItem = null;

function getTourHours() {
  const durationText = document.getElementById('detailDuration').textContent || '0';
  const match = durationText.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function getAddonSelections() {
  const tourHours = getTourHours();
  const guideValue = document.getElementById('guideOption').value;
  const guideParts = guideValue.includes('|') ? guideValue.split('|') : [guideValue, ''];
  const guideRate = Number(guideParts[0] || 0);
  const guideLabel = guideParts[1] || '';
  const babySeatQty = Number(document.getElementById('babySeatQty').value || 0);
  const photographerRate = Number(document.getElementById('photographerOption').value || 0);
  const addons = [];

  if (guideRate > 0) addons.push({ label: guideLabel || 'Tour Guide', amount: guideRate * tourHours });
  if (babySeatQty > 0) addons.push({ label: `Baby Seat x${babySeatQty}`, amount: babySeatQty * 20 });
  if (photographerRate > 0) addons.push({ label: 'Photographer', amount: photographerRate * tourHours });
  return addons;
}

function getDetailPricing() {
  if (!currentDetailItem) return null;
  const adultQty = Math.max(0, Number(document.getElementById('detailAdultQty').value || 0));
  const childQty = Math.max(0, Number(document.getElementById('detailChildQty').value || 0));
  const addons = getAddonSelections();
  const adultsTotal = adultQty * currentDetailItem.adult;
  const childrenTotal = childQty * currentDetailItem.child;
  const tourHours = getTourHours();
  const upgradeRate = Number(document.getElementById('vehicleUpgrade').value || 0);
  const upgradeLabel = document.getElementById('vehicleUpgrade').selectedOptions[0].textContent;
  const upgradeTotal = upgradeRate * tourHours;
  const addonsTotal = addons.reduce((sum, addon) => sum + addon.amount, 0);
  const total = adultsTotal + childrenTotal + upgradeTotal + addonsTotal;
  return { adultQty, childQty, addons, adultsTotal, childrenTotal, upgradeRate, upgradeLabel, upgradeTotal, addonsTotal, total };
}

function updateDetailTotals() {
  const pricing = getDetailPricing();
  if (!pricing) return;
  document.getElementById('detailAdultsTotal').textContent = `SGD ${pricing.adultsTotal}`;
  document.getElementById('detailChildrenTotal').textContent = `SGD ${pricing.childrenTotal}`;
  document.getElementById('detailUpgradeTotal').textContent = `SGD ${pricing.upgradeTotal}`;
  document.getElementById('detailAddonsTotal').textContent = `SGD ${pricing.addonsTotal}`;
  document.getElementById('detailBookingTotal').textContent = `SGD ${pricing.total}`;
  
  // Capacity and Minimum Validation
  const capacityWarning = document.getElementById('capacityWarning');
  const capacityWarningText = document.getElementById('capacityWarningText');
  const maxCap = vehicleCapacities[pricing.upgradeRate] || 4;
  const totalPax = pricing.adultQty + pricing.childQty;
  const minAdults = currentDetailItem.region === 'Seat In Coach' ? 1 : 2;

  if (totalPax > maxCap) {
    capacityWarning.style.display = 'block';
    capacityWarningText.textContent = `Capacity Exceeded for selected vehicle (${maxCap} Pax max). Please upgrade your vehicle class or reduce passenger count.`;
  } else if (pricing.adultQty < minAdults) {
    capacityWarning.style.display = 'block';
    capacityWarningText.textContent = `Minimum ${minAdults} Adults required for this tour.`;
  } else {
    capacityWarning.style.display = 'none';
  }
}

function getDetailBookingLabel() {
  if (!currentDetailItem) return 'Tour Booking';
  const pricing = getDetailPricing();
  const parts = [`${currentDetailItem.region} · ${currentDetailItem.title}`];
  parts.push(`${pricing.adultQty} Adult${pricing.adultQty === 1 ? '' : 's'}`);
  if (pricing.childQty > 0) parts.push(`${pricing.childQty} Child${pricing.childQty === 1 ? '' : 'ren'}`);
  if (pricing.upgradeTotal > 0) parts.push(`Vehicle Upgrade: ${pricing.upgradeLabel}`);
  if (pricing.addons.length) parts.push(`Add-ons: ${pricing.addons.map(addon => addon.label).join(', ')}`);
  return parts.join(' · ');
}

function validateTourBooking() {
  const pricing = getDetailPricing();
  const maxCap = vehicleCapacities[pricing.upgradeRate] || 4;
  const totalPax = pricing.adultQty + pricing.childQty;
  const minAdults = currentDetailItem.region === 'Seat In Coach' ? 1 : 2;
  const consent = document.getElementById('detailConsent').checked;

  if (pricing.adultQty < minAdults) {
    alert(`Minimum ${minAdults} Adults required for this tour.`);
    return false;
  }
  if (totalPax > maxCap) {
    alert(`Total passengers (${totalPax}) exceed vehicle capacity (${maxCap} Pax). Please upgrade vehicle or reduce pax.`);
    return false;
  }
  if (!consent) {
    alert('Please agree to the Terms & Conditions.');
    return false;
  }
  return true;
}

function openTourDetail(region, item) {
  currentDetailItem = { ...item, region };
  const detail = document.getElementById('tour-detail');
  detail.style.display = 'block';
  document.getElementById('detailType').textContent = region;
  document.getElementById('detailTitle').textContent = item.title;
  const mode = getDriverMode(region, item);
  const basePricingNote = region === 'Malaysia Tours'
    ? 'Malaysia tour pricing already includes the full private tour duration with chauffeur, broken down into adult and child rates.'
    : 'All tour prices include an economy car. Select the number of adults and children, then choose your vehicle upgrade and add-ons.';
  document.getElementById('detailDescription').textContent = `${item.desc} ${mode.note} ${basePricingNote}`;
  document.getElementById('detailAdult').textContent = `SGD ${item.adult}`;
  document.getElementById('detailChild').textContent = `SGD ${item.child}`;
  document.getElementById('detailDuration').textContent = item.duration;
  document.getElementById('detailRule').textContent = getBookingRule(region);
  document.getElementById('detailDriverMode').textContent = mode.label;
  document.getElementById('detailMainImage').src = item.image;
  document.getElementById('detailSideImage1').src = item.image;
  document.getElementById('detailSideImage2').src = imagePool.luxury[0];
  setList('detailInclusions', getInclusions(region, item));
  setList('detailExclusions', getExclusions(region));
  document.getElementById('detailAdultQty').value = region === 'Seat In Coach' ? 1 : 2;
  document.getElementById('detailChildQty').value = 0;
  document.getElementById('vehicleUpgrade').value = '0';
  document.getElementById('guideOption').value = '0';
  document.getElementById('babySeatQty').value = '0';
  document.getElementById('photographerOption').value = '0';
  
  // Set minimum adults based on region
  const minAdults = region === 'Seat In Coach' ? 1 : 2;
  document.getElementById('detailAdultQty').setAttribute('min', minAdults);
  if (Number(document.getElementById('detailAdultQty').value) < minAdults) {
    document.getElementById('detailAdultQty').value = minAdults;
  }
  
  // Clear any existing capacity warning
  document.getElementById('capacityWarning').style.display = 'none';
  
  updateDetailTotals();
  document.getElementById('detailPayNow').onclick = () => {
    if (!validateTourBooking()) return;
    const pricing = getDetailPricing();
    payNow('tour', getDetailBookingLabel(), pricing.total);
  };
  document.getElementById('detailAddToCart').onclick = () => {
    if (!validateTourBooking()) return;
    const pricing = getDetailPricing();
    const maxCap = vehicleCapacities[pricing.upgradeRate] || 4;
    const minAdults = currentDetailItem.region === 'Seat In Coach' ? 1 : 2;
    addToCart('tour', getDetailBookingLabel(), pricing.total, minAdults, maxCap);
  };
  location.hash = 'tour-detail';
}

function openTourDetailByButton(button) {
  const region = button.dataset.region;
  const target = button.dataset.target;
  const idx = Number(button.dataset.index);
  const data = window[`${target}Data`] || [];
  const item = data[idx];
  if (item) openTourDetail(region, item);
}

function addToCart(type, title, amount, minPax = null, maxPax = null) {
  cart.push({ 
    type, 
    title: String(title).replace(/&#39;/g, "'"), 
    amount: Number(amount),
    minPax,
    maxPax
  });
  renderCart();
  openCart();
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  drawer.classList.toggle('open');
}

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.add('open');
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.remove('open');
}

function renderCart() {
  const itemsWrap = document.getElementById('cartItems');
  const count = document.getElementById('cartCount');
  const badge = document.getElementById('cartBadge');
  const total = cart.reduce((sum, item) => sum + item.amount, 0);
  
  count.textContent = cart.length;
  if (badge) {
    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? 'block' : 'none';
  }
  document.getElementById('cartTotal').textContent = `SGD ${total}`;

  if (!cart.length) {
    itemsWrap.innerHTML = `
      <div class="cart-empty">No items yet.</div>
      <div class="cart-note">
        <i class="fas fa-info-circle"></i> Private tours: Min 2 Adults.<br>
        Vehicle capacity: Max based on booking class.
      </div>
    `;
    return;
  }

  itemsWrap.innerHTML = cart.map(item => {
    let limitHtml = '';
    if (item.minPax !== null || item.maxPax !== null) {
      const minStr = item.minPax ? `Min ${item.minPax}` : '';
      const maxStr = item.maxPax ? `Max ${item.maxPax}` : '';
      const separator = minStr && maxStr ? ' / ' : '';
      limitHtml = `<div class="cart-item-limit"><i class="fas fa-user-friends"></i> ${minStr}${separator}${maxStr} Pax limit</div>`;
    }
    return `
      <div class="cart-item">
        <strong>${item.title}</strong>
        <span>${item.type} · SGD ${item.amount}</span>
        ${limitHtml}
      </div>
    `;
  }).join('');
}

function clearCart() {
  cart.length = 0;
  renderCart();
}

function payNow(type, title, amount) {
  alert(`Stripe-ready payment action\n\nItem: ${title}\nAmount: SGD ${amount}\n\nYour developer can connect this button directly to Stripe Checkout.`);
}

function checkoutCart() {
  const total = cart.reduce((sum, item) => sum + item.amount, 0);
  if (!cart.length) {
    alert('Your cart is empty.');
    return;
  }
  alert(`Stripe-ready cart payment\n\nItems: ${cart.length}\nTotal: SGD ${total}\n\nYour developer can connect this button to Stripe cart checkout.`);
}

const prices = {
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

let selectedDestination = '';
let selectedVehicle = '';
let selectedPrice = 0;
function calculateRate() {
  const destination = document.getElementById('destination').value;
  const vehicle = document.getElementById('vehicle').value;
  if (!destination || !vehicle) {
    document.getElementById('resultBox').textContent = 'Estimated Price: Please select destination and vehicle';
    return;
  }
  selectedDestination = destination;
  selectedVehicle = vehicle;
  selectedPrice = prices[destination][vehicle];
  document.getElementById('resultBox').textContent = 'Estimated Price: SGD ' + selectedPrice;
}

function getTransferCap() {
  const vehicle = document.getElementById('vehicle').value;
  if (vehicle === 'Economy') return 4;
  if (vehicle === 'Premium') return 6;
  if (vehicle === 'Business') return 4;
  if (vehicle === 'Luxury') return 2;
  return 4;
}

function checkoutSelectedTransfer() {
  if (!selectedDestination || !selectedVehicle) {
    calculateRate();
    if (!selectedDestination || !selectedVehicle) return;
  }
  const maxCap = getTransferCap();
  const pax = Number(document.getElementById('pax').value || 0);
  if (pax > maxCap) {
    alert(`Vehicle Capacity Exceeded. ${selectedVehicle} class fits maximum ${maxCap} passengers.`);
    return;
  }
  payNow('transfer', `Malaysia Transfer · ${selectedDestination} · ${selectedVehicle}`, selectedPrice);
}

function addSelectedTransferToCart() {
  if (!selectedDestination || !selectedVehicle) {
    calculateRate();
    if (!selectedDestination || !selectedVehicle) return;
  }
  const maxCap = getTransferCap();
  const pax = Number(document.getElementById('pax').value || 0);
  if (pax > maxCap) {
    alert(`Vehicle Capacity Exceeded. ${selectedVehicle} class fits maximum ${maxCap} passengers.`);
    return;
  }
  addToCart('transfer', `Malaysia Transfer · ${selectedDestination} · ${selectedVehicle}`, selectedPrice, null, maxCap);
}

function sendRateBooking() {
  if (!selectedDestination || !selectedVehicle) {
    calculateRate();
    if (!selectedDestination || !selectedVehicle) return;
  }
  const pax = document.getElementById('pax').value || '-';
  const msg = `Cross Border Transfer Booking\n\nDestination: ${selectedDestination}\nVehicle: ${selectedVehicle}\nPrice: SGD ${selectedPrice}\nPassengers: ${pax}\n\nPlease send exact pickup and drop-off location for final quotation.\nFuel and toll included.\nDriver accommodation SGD50/day if overnight required.`;
  window.open('https://wa.me/6584444744?text=' + encodeURIComponent(msg));
}

['detailAdultQty', 'detailChildQty', 'vehicleUpgrade', 'guideOption', 'babySeatQty', 'photographerOption'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateDetailTotals);
  if (el) el.addEventListener('change', updateDetailTotals);
});

setupFilter(singaporeTours, 'sgSearch', 'sgCategory', 'sgTourGrid', 'sgCount', 'View This Tour', 'Singapore Tours');
setupFilter(malaysiaTours, 'mySearch', 'myCategory', 'myTourGrid', 'myCount', 'View This Tour', 'Malaysia Tours');
setupFilter(sharedTours, 'sharedSearch', 'sharedCategory', 'sharedTourGrid', 'sharedCount', 'View This Tour', 'Seat In Coach');
fetchApiCars();
renderFleetCards(fleetData, 'fleetGrid');
renderCart();