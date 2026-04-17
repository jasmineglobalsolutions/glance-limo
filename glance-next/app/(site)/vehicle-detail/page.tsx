'use client';
import { useState } from 'react';

export default function VehicleDetail() {
  const [currentType, setCurrentType] = useState('hourly');
  const [hours, setHours] = useState(3);
  
  const baseHourly = 195;
  const baseTransfer = 200;

  const handleBookingType = (type: string) => {
    setCurrentType(type);
  };

  const calculateTotal = () => {
    if (currentType === 'hourly') return baseHourly * hours;
    return baseTransfer;
  };

  return (
    <main>
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
            --bg: #181311;
            --bg2: #241c18;
            --panel: #2c221d;
            --panel-soft: #332821;
            --line: rgba(212, 177, 95, 0.18);
            --gold: #d4b15f;
            --gold-2: #f0d389;
            --text: #f7f1e8;
            --muted: #cbbda9;
            --muted-2: #a69179;
        }
        .vehicle-booking-detail {
            padding: 120px 0 80px;
            background: #181311;
            color: #f7f1e8;
            min-height: 100vh;
        }
        .booking-shell {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 40px;
            align-items: start;
        }
        .vehicle-preview-card {
            background: #241c18;
            border: 1px solid rgba(212, 177, 95, 0.18);
            border-radius: 24px;
            padding: 30px;
            position: sticky;
            top: 100px;
        }
        .vehicle-preview-image-wrap {
            width: 100%;
            height: 240px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 18px;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .vehicle-preview-image {
            max-width: 90%;
            max-height: 80%;
            object-fit: contain;
        }
        .vehicle-tier-badge {
            display: inline-block;
            background: rgba(212, 177, 95, 0.1);
            color: #d4b15f;
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 15px;
            border: 1px solid rgba(212, 177, 95, 0.18);
        }
        .vehicle-preview-title {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            margin-bottom: 15px;
            color: #f0d389;
        }
        .vehicle-meta-row {
            display: flex;
            gap: 12px;
            margin-bottom: 25px;
        }
        .vehicle-meta-pill {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(212, 177, 95, 0.18);
            padding: 8px 14px;
            border-radius: 12px;
            font-size: 14px;
            color: #cbbda9;
        }
        .vehicle-price-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(212, 177, 95, 0.18);
        }
        .vehicle-price-box {
            text-align: center;
        }
        .vehicle-price-label {
            display: block;
            font-size: 12px;
            color: #a69179;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        .vehicle-price-box strong {
            font-size: 20px;
            color: #d4b15f;
        }
        .booking-form-container {
            background: #2c221d;
            border: 1px solid rgba(212, 177, 95, 0.18);
            border-radius: 32px;
            padding: 40px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }
        .booking-type-toggle {
            display: flex;
            background: rgba(0, 0, 0, 0.2);
            padding: 6px;
            border-radius: 16px;
            margin-bottom: 30px;
        }
        .type-btn {
            flex: 1;
            padding: 12px;
            border: none;
            background: transparent;
            color: #cbbda9;
            font-weight: 700;
            cursor: pointer;
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        .type-btn.active {
            background: #d4b15f;
            color: #120f0d;
        }
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .form-group.full {
            grid-column: span 2;
        }
        .form-group label {
            font-size: 13px;
            font-weight: 700;
            color: #d4b15f;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            background: #332821;
            border: 1px solid rgba(212, 177, 95, 0.18);
            border-radius: 12px;
            padding: 14px;
            color: #f7f1e8;
            font-family: inherit;
            outline: none;
            transition: border-color 0.3s ease;
        }
        .form-group input:focus,
        .form-group select:focus {
            border-color: #d4b15f;
        }
        .booking-summary-card {
            background: rgba(0, 0, 0, 0.2);
            padding: 25px;
            border-radius: 20px;
            margin-top: 30px;
            border: 1px solid rgba(212, 177, 95, 0.18);
        }
        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
            color: #cbbda9;
        }
        .summary-total {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(212, 177, 95, 0.18);
            font-size: 20px;
            font-weight: 800;
            color: #f0d389;
        }
        .booking-actions {
            margin-top: 30px;
            display: flex;
            gap: 15px;
        }
        .btn-primary {
            flex: 1;
            background: #d4b15f;
            color: #120f0d;
            border: none;
            padding: 16px;
            border-radius: 999px;
            font-weight: 800;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        .btn-secondary {
            flex: 1;
            background: transparent;
            color: #d4b15f;
            border: 1px solid #d4b15f;
            padding: 16px;
            border-radius: 999px;
            font-weight: 800;
            cursor: pointer;
        }
        @media (max-width: 992px) {
            .booking-shell {
                grid-template-columns: 1fr;
            }
            .vehicle-preview-card {
                position: static;
            }
        }
        @media (max-width: 600px) {
            .form-grid {
                grid-template-columns: 1fr;
            }
            .form-group.full {
                grid-column: span 1;
            }
        }
        `
      }} />

      <section className="vehicle-booking-detail">
          <div className="booking-shell">
              <div className="booking-left">
                  <div className="vehicle-preview-card">
                      <div className="vehicle-preview-image-wrap">
                          <img src="/images/fleet/w223.png" alt="Mercedes S Class W223" className="vehicle-preview-image" />
                      </div>

                      <span className="vehicle-tier-badge">Luxury</span>
                      <h1 className="vehicle-preview-title">Mercedes S Class (W223)</h1>

                      <div className="vehicle-meta-row">
                          <div className="vehicle-meta-pill">👥 2 Pax</div>
                          <div className="vehicle-meta-pill">🧳 2S / 2B</div>
                      </div>

                      <div className="vehicle-price-grid">
                          <div className="vehicle-price-box">
                              <span className="vehicle-price-label">Hourly</span>
                              <strong>SGD {baseHourly}</strong>
                          </div>
                          <div className="vehicle-price-box">
                              <span className="vehicle-price-label">Transfer</span>
                              <strong>SGD {baseTransfer}</strong>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="booking-right">
                  <div className="booking-form-container">
                      <div className="booking-type-toggle">
                          <button className={`type-btn ${currentType === 'hourly' ? 'active' : ''}`} onClick={() => handleBookingType('hourly')}>Hourly Charter</button>
                          <button className={`type-btn ${currentType === 'transfer' ? 'active' : ''}`} onClick={() => handleBookingType('transfer')}>One-Way / Transfer</button>
                      </div>

                      <div className="form-grid">
                          <div className="form-group">
                              <label>Pick-up Date</label>
                              <input type="date" />
                          </div>
                          <div className="form-group">
                              <label>Pick-up Time</label>
                              <input type="time" />
                          </div>

                          <div className="form-group full">
                              <label>Pick-up Address</label>
                              <input type="text" placeholder="Hotel, Airport, or Street address" />
                          </div>

                          {currentType === 'hourly' && (
                              <div className="form-group">
                                  <label>Duration (Hours)</label>
                                  <select value={hours} onChange={e => setHours(parseInt(e.target.value))}>
                                      <option value="3">3 Hours (Min)</option>
                                      <option value="4">4 Hours</option>
                                      <option value="5">5 Hours</option>
                                      <option value="6">6 Hours</option>
                                      <option value="8">8 Hours</option>
                                      <option value="10">10 Hours</option>
                                      <option value="12">12 Hours</option>
                                  </select>
                              </div>
                          )}

                          {currentType === 'transfer' && (
                              <div className="form-group full">
                                  <label>Drop-off Address</label>
                                  <input type="text" placeholder="Destination address" />
                              </div>
                          )}

                          <div className="form-group full">
                              <label>Special Requests</label>
                              <textarea rows={3} placeholder="Flight number, child seats, etc."></textarea>
                          </div>
                      </div>

                      <div className="booking-summary-card">
                          <div className="summary-row">
                              <span>Base Rate</span>
                              <span>{currentType === 'hourly' ? `SGD ${baseHourly} / hr` : `SGD ${baseTransfer} (Flat)`}</span>
                          </div>
                          {currentType === 'hourly' && (
                              <div className="summary-row">
                                  <span>Duration Multiplier</span>
                                  <span>x {hours} hrs</span>
                              </div>
                          )}
                          <div className="summary-total">
                              <span>Estimated Total</span>
                              <strong>SGD {calculateTotal()}</strong>
                          </div>
                      </div>

                      <div className="booking-actions">
                          <button className="btn-primary" onClick={() => alert('Redirecting to payment gateway...')}>Book Now</button>
                          <button className="btn-secondary" onClick={() => alert('Item added to cart!')}>Add to Cart</button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
}
