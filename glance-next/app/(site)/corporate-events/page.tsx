import Link from 'next/link';

export default function CorporateEvents() {
  return (
    <main>
      <style dangerouslySetInnerHTML={{
        __html: `
        .corp-hero {
            padding: 86px 0 54px;
            position: relative;
            overflow: hidden;
            background: linear-gradient(180deg, rgba(22, 22, 24, 0.9), rgba(28, 27, 31, 0.95)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
            border-bottom: 1px solid var(--line);
        }
        .hero-grid {
            display: grid;
            grid-template-columns: 1.1fr .9fr;
            gap: 28px;
            align-items: stretch;
            position: relative;
            z-index: 1;
        }
        .hero-copy {
            background: rgba(44, 34, 29, 0.85);
            padding: 38px;
            border-radius: var(--radius);
            border: 1px solid var(--line);
            backdrop-filter: blur(10px);
        }
        .hero-copy h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(44px, 6vw, 72px);
            line-height: 0.95;
            letter-spacing: -0.02em;
            margin-bottom: 18px;
            color: var(--white);
        }
        .hero-copy p {
            color: var(--muted);
            font-size: 18px;
            max-width: 680px;
            margin-bottom: 26px;
        }
        .hero-card {
            background: rgba(44, 34, 29, 0.85);
            padding: 28px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 18px;
            border-radius: var(--radius);
            border: 1px solid var(--line);
            backdrop-filter: blur(10px);
        }
        .hero-card h3 {
            font-size: 22px; margin-bottom: 8px; font-family: 'Playfair Display', serif; color: var(--champagne-soft);
        }
        .hero-card ul {
            list-style: none; display: grid; gap: 12px; color: var(--muted); padding: 0;
        }
        .hero-card li {
            padding: 14px 16px; border-radius: 16px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            position: relative;
            padding-left: 40px;
        }
        .hero-card li::before {
            content: "\\f00c";
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            position: absolute;
            left: 15px;
            color: var(--champagne-soft);
        }
        .service-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        .service-card {
            background: var(--panel);
            padding: 30px;
            border-radius: var(--radius);
            border: 1px solid var(--line);
            transition: 0.3s ease;
        }
        .service-card:hover {
            transform: translateY(-5px);
            border-color: var(--line-strong);
        }
        .service-card .tag {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 999px;
            background: rgba(168, 144, 128, 0.1);
            color: var(--champagne-soft);
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 15px;
            border: 1px solid var(--line);
        }
        .service-card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 26px;
            color: var(--white);
            margin-bottom: 12px;
        }
        .service-card ul {
            list-style: none; padding: 0; margin-top: 15px;
        }
        .service-card li {
            position: relative; padding-left: 25px; margin-bottom: 8px; color: var(--muted);
        }
        .service-card li::before {
            content: "\\f0da";
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            position: absolute;
            left: 0;
            color: var(--champagne-soft);
        }
        .fleet-card {
            background: var(--panel2);
            padding: 24px;
            border-radius: var(--radius);
            border: 1px solid var(--line);
            text-align: center;
        }
        .fleet-card h4 {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            color: var(--white);
            margin-bottom: 10px;
        }
        .fleet-card p {
            color: var(--muted);
            font-size: 14px;
        }
        @media (max-width: 992px) {
            .hero-grid, .service-grid, .cta-box {
                grid-template-columns: 1fr;
            }
        }
        `
      }} />

      <section className="corp-hero">
          <div className="container hero-grid">
              <div className="hero-copy">
                  <span className="eyebrow">Corporate Events Transport</span>
                  <h1>Professional Executive Transport For Business Events And VIP Movements</h1>
                  <p>
                      Structured chauffeur-driven transport for conferences, executive meetings, corporate roadshows,
                      VIP arrivals, delegate movement, and event logistics across Singapore and cross-border routes.
                  </p>
                  <div className="hero-actions">
                      <a className="btn" href="https://wa.me/6584444744" target="_blank" rel="noopener"><i className="fab fa-whatsapp"></i> Request Corporate Quote</a>
                      <a className="btn ghost" href="#corporate-services">Explore Service Details</a>
                  </div>
              </div>

              <div className="hero-card">
                  <div>
                      <h3>Built for business-ready movement and coordinated event execution</h3>
                      <ul>
                          <li>Executive point-to-point and hourly chauffeur support</li>
                          <li>Conference, meeting, and delegate transfer planning</li>
                          <li>VIP airport arrivals and guest routing</li>
                          <li>Single vehicle or multi-vehicle event transport coordination</li>
                      </ul>
                  </div>
                  <Link className="btn ghost" href="/#contact">Speak With Our Team</Link>
              </div>
          </div>
      </section>

      <section className="section" id="corporate-services">
          <div className="container">
              <div className="section-head">
                  <p className="eyebrow">Corporate Event Services</p>
                  <h2>Business transport solutions tailored to your event schedule</h2>
                  <p>
                      Glance Limousine supports professional event movement for executives, delegates, VIP guests, and teams
                      with structured scheduling, premium vehicle comfort, and polished chauffeur presentation.
                  </p>
              </div>

              <div className="service-grid">
                  <article className="service-card">
                      <span className="tag">Executive Support</span>
                      <h3>Corporate Meeting Transfers</h3>
                      <p>
                          Reliable private chauffeur service for business appointments, executive itineraries, and premium city transfers throughout the workday.
                      </p>
                      <ul>
                          <li>Executive point-to-point movement</li>
                          <li>Hourly chauffeur disposal</li>
                          <li>Professional punctual scheduling</li>
                      </ul>
                  </article>

                  <article className="service-card">
                      <span className="tag">Event Logistics</span>
                      <h3>Conference & Delegate Movement</h3>
                      <p>
                          Structured transport planning for conferences, seminars, business forums, and corporate gatherings requiring coordinated guest movement.
                      </p>
                      <ul>
                          <li>Delegate arrival planning</li>
                          <li>Venue transfer coordination</li>
                          <li>Multi-vehicle support available</li>
                      </ul>
                  </article>

                  <article className="service-card">
                      <span className="tag">VIP Movement</span>
                      <h3>VIP Airport Meet & Transfer</h3>
                      <p>
                          Premium airport pickup arrangements for executives, speakers, investors, and invited guests requiring smooth arrival support.
                      </p>
                      <ul>
                          <li>Airport to hotel transfers</li>
                          <li>Airport to event venue routing</li>
                          <li>Premium arrival experience</li>
                      </ul>
                  </article>

                  <article className="service-card">
                      <span className="tag">Cross-Border Business</span>
                      <h3>Singapore & Malaysia Corporate Transfers</h3>
                      <p>
                          Professional cross-border movement for business meetings, regional events, and executive schedules extending beyond Singapore.
                      </p>
                      <ul>
                          <li>Singapore to Johor transfers</li>
                          <li>Corporate cross-border scheduling</li>
                          <li>Private premium chauffeur coordination</li>
                      </ul>
                  </article>
              </div>
          </div>
      </section>

      <section className="section alt">
          <div className="container">
              <div className="section-head">
                  <p className="eyebrow">Recommended Fleet</p>
                  <h2>Corporate-ready premium vehicle options</h2>
                  <p>
                      Vehicle selection can be matched to executive preference, group size, event profile, and routing complexity.
                  </p>
              </div>

              <div className="grid-4">
                  <article className="fleet-card card">
                      <h4>Business Sedan</h4>
                      <p>Suitable for executives requiring polished city transport with privacy and comfort.</p>
                  </article>
                  <article className="fleet-card card">
                      <h4>Mercedes V-Class</h4>
                      <p>Premium MPV option for VIP guests, executive teams, and coordinated event movement.</p>
                  </article>
                  <article className="fleet-card card">
                      <h4>Toyota Alphard / Vellfire</h4>
                      <p>Comfortable luxury option for executive transfers, airport routing, and premium client transport.</p>
                  </article>
                  <article className="fleet-card card">
                      <h4>Multi-Vehicle Deployment</h4>
                      <p>Ideal for delegate movement, guest arrival waves, and event transport coordination.</p>
                  </article>
              </div>
          </div>
      </section>

      <section className="section">
          <div className="container">
              <div className="section-head">
                  <p className="eyebrow">Why Glance</p>
                  <h2>Why businesses choose Glance Limousine</h2>
              </div>

              <div className="grid-4">
                  <article className="card p-20" style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--champagne-soft)', marginBottom: '15px' }}>Professional Presentation</h3>
                      <p style={{ color: 'var(--muted)' }}>Premium chauffeur standards aligned with executive and corporate event expectations.</p>
                  </article>
                  <article className="card p-20" style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--champagne-soft)', marginBottom: '15px' }}>Reliable Scheduling</h3>
                      <p style={{ color: 'var(--muted)' }}>Structured support for fixed meeting times, airport arrivals, venue changes, and live event timing.</p>
                  </article>
                  <article className="card p-20" style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--champagne-soft)', marginBottom: '15px' }}>Flexible Coordination</h3>
                      <p style={{ color: 'var(--muted)' }}>Suitable for single executive transfers, hourly support, or full event transport planning.</p>
                  </article>
                  <article className="card p-20" style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--champagne-soft)', marginBottom: '15px' }}>Singapore & Cross-Border</h3>
                      <p style={{ color: 'var(--muted)' }}>Well suited for local business movement and selected Malaysia corporate transfer needs.</p>
                  </article>
              </div>
          </div>
      </section>

      <section className="section">
          <div className="container">
              <div className="cta-box">
                  <div>
                      <h2>Need transport planning for your next corporate event?</h2>
                      <p style={{ maxWidth: '600px', color: '#f1e5db' }}>
                          Share your event date, venue schedule, pickup locations, guest count, and preferred vehicle type.
                          Our team can prepare a tailored quotation for executive and event transport requirements.
                      </p>
                  </div>
                  <div className="cta-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '18px' }}>
                      <a className="btn" href="https://wa.me/6584444744" target="_blank" rel="noopener"><i className="fab fa-whatsapp"></i> WhatsApp For Quote</a>
                      <Link className="btn ghost" href="/#contact">Contact Us</Link>
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
}
