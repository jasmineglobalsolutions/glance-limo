'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type FleetCar = {
  name: string;
  category: string;
  imageUrl: string;
  personCapacity: number;
  smallLuggage: number;
  bigLuggage: number;
  pricePerHour: number;
  ratePerTransfer: number;
};

export default function FleetSection() {
  const [fleet, setFleet] = useState<FleetCar[]>([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch('/cars.json')
      .then((res) => res.json())
      .then((data) => setFleet(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredFleet = category === 'all' ? fleet : fleet.filter((car) => car.category.toLowerCase() === category.toLowerCase());

  return (
    <section className="section alt" id="fleet">
      <div className="container">
        <div className="section-head">
          <h2>Our Fleet</h2>
          <p>Choose from a range of premium vehicles designed for comfort, reliability, and executive travel across Singapore and Malaysia.</p>
        </div>
        <div className="filter-bar" id="fleetFilterBar">
          {['all', 'luxury', 'business', 'premium-economy', 'economy', 'van', 'bus'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="fleet-grid">
          {filteredFleet.map((car, idx) => (
            <div className="card fleet-card" key={idx}>
              <div className="fleet-image" style={{ backgroundImage: `url('${car.imageUrl}')` }}></div>
              <div className="fleet-body">
                <span className="badge">{car.category}</span>
                <h3>{car.name}</h3>
                <div className="fleet-specs">
                  <div className="spec-item"><i className="fas fa-users"></i> {car.personCapacity} Pax</div>
                  <div className="spec-item"><i className="fas fa-suitcase"></i> {car.smallLuggage}S / {car.bigLuggage}B</div>
                </div>
                <div className="fleet-pricing">
                  <div className="price-item"><span>Hourly</span><strong>SGD {car.pricePerHour}</strong></div>
                  <div className="price-item"><span>Transfer</span><strong>SGD {car.ratePerTransfer}</strong></div>
                </div>
                <div className="action-row">
                  <Link href="/vehicle-detail" className="btn full text-center block" style={{ marginTop: 'auto' }}>View Detail</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="fleet-footer-note mt-6 text-center text-sm text-[var(--muted)]">Comfort, space, and professionalism for every journey</div>
      </div>
    </section>
  );
}
