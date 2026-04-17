import Link from 'next/link';

export default function WeddingChauffeur() {
  return (
    <main>
      <style dangerouslySetInnerHTML={{
        __html: `
        .wedding-hero {
            padding: 86px 0 54px;
            position: relative;
            overflow: hidden;
            background: linear-gradient(180deg, rgba(22, 22, 24, 0.9), rgba(28, 27, 31, 0.95)), url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
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

      <section className="wedding-hero">
          <div className="container hero-grid">
              <div className="hero-copy">
                  <span className="eyebrow">Wedding Chauffeur Service</span>
                  <h1>Elegant Wedding Day Transport With A Refined Luxury Experience</h1>
                  <p>
                      Premium chauffeur service for bridal arrivals, groom coordination, family transfers,
                      VIP guest movement, and seamless point-to-point support throughout your wedding day in Singapore.
                  </p>
                  <div className="hero-actions">
                      <a className="btn" href="https://wa.me/6584444744" target="_blank" rel="noopener"><i className="fab fa-whatsapp"></i> Request Wedding Quote</a>
                      <a className="btn ghost" href="#wedding-services">Explore Service Details</a>
                  </div>
              </div>

              <div className="hero-card">
                  <div>
                      <h3>Designed for smooth and polished celebration logistics</h3>
                      <ul>
                          <li>Bridal car and wedding day chauffeur planning</li>
                          <li>Hotel, ceremony, reception, and photo-shoot transfers</li>
                          <li>Family and VIP guest movement with premium comfort</li>
                          <li>Single vehicle or multi-vehicle coordination available</li>
                      </ul>
                  </div>
                  <Link className="btn ghost" href="/#contact">Speak With Our Team</Link>
              </div>
          </div>
      </section>

      <section className="section" id="wedding-services">
          <div className="container">
              <div className="section-head">
                  <p className="eyebrow">Wedding Day Services</p>
                  <h2>Wedding transport support curated around your timeline</h2>
                  <p>
                      From first pickup to final drop-off, our wedding chauffeur arrangements are planned to keep the day smooth,
                      comfortable, and professionally coordinated for couples, families, and invited guests.
                  </p>
              </div>

              <div className="service-grid">
                  <article className="service-card">
                      <span className="tag">Bridal Arrival</span>
                      <h3>Bridal Car Service</h3>
                      <p>
                          Elegant chauffeur-driven transport for the bride, groom, and key family members with refined presentation and punctual arrival planning.
                      </p>
                      <ul>
                          <li>Home or hotel to ceremony transfer</li>
                          <li>Venue arrival coordination</li>
                          <li>Professional chauffeur presentation</li>
                      </ul>
                  </article>

                  <article className="service-card">
                      <span className="tag">Family Coordination</span>
                      <h3>Family & VIP Transfers</h3>
                      <p>
                          Comfortable premium transfers for parents, close relatives, and VIP guests who require smooth movement across the day.
                      </p>
                      <ul>
                          <li>Priority guest movement</li>
                          <li>Timed pickups and drop-offs</li>
                          <li>Luxury point-to-point support</li>
                      </ul>
                  </article>

                  <article className="service-card">
                      <span className="tag">Event Routing</span>
                      <h3>Hotel, Ceremony & Reception Transfers</h3>
                      <p>
                          Structured routing between multiple wedding locations for a polished experience across preparation, solemnisation, banquet, and after-event transfers.
                      </p>
                      <ul>
                          <li>Multi-stop wedding day planning</li>
                          <li>Flexible routing support</li>
                          <li>Coordinated scheduling assistance</li>
                      </ul>
                  </article>

                  <article className="service-card">
                      <span className="tag">Photo Sessions</span>
                      <h3>Wedding Photo Shoot Chauffeur</h3>
                      <p>
                          Premium transport for couples moving between planned photography locations with comfort, punctuality, and a discreet service experience.
                      </p>
                      <ul>
                          <li>Location-to-location transfers</li>
                          <li>Flexible waiting arrangements</li>
                          <li>Professional private chauffeur support</li>
                      </ul>
                  </article>
              </div>
          </div>
      </section>

      <section className="section alt">
          <div className="container">
              <div className="section-head">
                  <p className="eyebrow">Recommended Fleet</p>
                  <h2>Wedding-ready premium vehicle options</h2>
                  <p>
                      Vehicle selection can be matched to the style, group size, and movement plan for the day.
                  </p>
              </div>

              <div className="grid-4">
                  <article className="fleet-card card">
                      <h4>Luxury Sedan</h4>
                      <p>Elegant arrival option for couples seeking a classic premium wedding transfer experience.</p>
                  </article>
                  <article className="fleet-card card">
                      <h4>Mercedes V-Class</h4>
                      <p>Spacious premium transport for bridal parties, families, and executive-style wedding movement.</p>
                  </article>
                  <article className="fleet-card card">
                      <h4>Toyota Alphard / Vellfire</h4>
                      <p>Comfortable luxury MPV option for family transfers and VIP wedding day support.</p>
                  </article>
                  <article className="fleet-card card">
                      <h4>Multi-Vehicle Coordination</h4>
                      <p>Structured support for larger wedding events with multiple timed pickups and guest routing.</p>
                  </article>
              </div>
          </div>
      </section>

      <section className="section">
          <div className="container">
              <div className="section-head">
                  <p className="eyebrow">Why Glance</p>
                  <h2>Why couples choose Glance Limousine</h2>
              </div>

              <div className="grid-4">
                  <article className="card p-20" style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--champagne-soft)', marginBottom: '15px' }}>Punctual Planning</h3>
                      <p style={{ color: 'var(--muted)' }}>Structured timing support for ceremony, reception, and guest movement across the day.</p>
                  </article>
                  <article className="card p-20" style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--champagne-soft)', marginBottom: '15px' }}>Premium Presentation</h3>
                      <p style={{ color: 'var(--muted)' }}>Refined chauffeur service designed to complement the tone and elegance of the event.</p>
                  </article>
                  <article className="card p-20" style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--champagne-soft)', marginBottom: '15px' }}>Comfort & Privacy</h3>
                      <p style={{ color: 'var(--muted)' }}>Luxury vehicle comfort for couples, families, and invited guests throughout the journey.</p>
                  </article>
                  <article className="card p-20" style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--champagne-soft)', marginBottom: '15px' }}>Flexible Coordination</h3>
                      <p style={{ color: 'var(--muted)' }}>Suitable for single transfers, multi-stop wedding flow, or full-day chauffeur support.</p>
                  </article>
              </div>
          </div>
      </section>

      <section className="section">
          <div className="container">
              <div className="cta-box">
                  <div>
                      <h2>Plan your wedding transport with confidence</h2>
                      <p style={{ maxWidth: '600px', color: '#f1e5db' }}>
                          Share your wedding date, pickup points, key event locations, and preferred vehicle style.
                          Our team will prepare a tailored quotation based on your schedule and service needs.
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
