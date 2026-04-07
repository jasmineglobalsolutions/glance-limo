import Link from 'next/link';
import { getPublicServiceCards } from '@/lib/public-service-cards';
import { ServicePreview } from '@/app/components/service-preview';

export default async function Home() {
  // Fetch featured Singapore Transfer cards for preview
  const { config, cards } = await getPublicServiceCards('singapore-transfer');
  return (
    <main>
      <section className="hero" id="home">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">Premium chauffeur service with heritage since 2012</span>
            <h1>Timeless Chauffeur Excellence</h1>
            <p>
              Glance Limousine delivers refined transport across Singapore and Malaysia with premium airport transfers, executive city rides, cross-border journeys, Singapore tours, Malaysia tours, and private chauffeur service — all presented in one connected luxury experience.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/services/singapore-transfer">
                <i className="fas fa-arrow-right" /> View Services
              </Link>
              <Link className="btn ghost" href="/fleet">
                <i className="fas fa-car-side" /> Explore Fleet
              </Link>
            </div>
            <div className="hero-points">
              <span>Singapore Transfers</span>
              <span>Malaysia Transfers</span>
              <span>Cross-Border</span>
              <span>Private Tours</span>
              <span>Seat-In-Coach</span>
            </div>
          </div>
          <div className="hero-card">
            <h3>Connected premium experience</h3>
            <p>Enjoy a seamless travel experience across our entire range of chauffeur and tour services, managed through a single premium platform.</p>
            <div className="hero-card-grid">
              <div className="metric">
                <strong>2012</strong>
                <span>EST. PREMIUM SERVICE</span>
              </div>
              <div className="metric">
                <strong>Professional</strong>
                <span>CHAUFFEUR TEAM</span>
              </div>
              <div className="metric">
                <strong>24/7</strong>
                <span>SUPPORT AVAILABLE</span>
              </div>
              <div className="metric">
                <strong>Premium</strong>
                <span>VEHICLE FLEET</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Services overview</p>
            <h2>Our Services</h2>
          </div>
          <div className="services-grid">
            <Link href="/services/singapore-transfer" className="service-card">
              <div>
                <div className="service-icon">🚖</div>
                <h3>Singapore Transfer</h3>
                <p>
                  Smooth and reliable point-to-point transport for airport arrivals, hotel transfers, corporate travel, and private city journeys in Singapore.
                </p>
              </div>
              <span className="service-link">View Singapore Rates</span>
            </Link>

            <Link href="/cross-border-transfer" className="service-card">
              <div>
                <div className="service-icon">🛣️</div>
                <h3>Malaysia Transfer</h3>
                <p>
                  Comfortable private transfer service for Johor Bahru, Melaka, and selected Malaysia routes with professional chauffeur support.
                </p>
              </div>
              <span className="service-link">View Malaysia Rates</span>
            </Link>

            <Link href="/wedding-chauffeur" className="service-card">
              <div>
                <div className="service-icon">💍</div>
                <h3>Wedding Chauffeur</h3>
                <p>
                  Elegant wedding day transport for bridal arrivals, family coordination, reception transfers, and VIP guest movement with a refined luxury experience.
                </p>
              </div>
              <span className="service-link">View Wedding Service</span>
            </Link>

            <Link href="/corporate-events" className="service-card">
              <div>
                <div className="service-icon">🏢</div>
                <h3>Corporate Events</h3>
                <p>
                  Executive transport planning for conferences, meetings, VIP arrivals, roadshows, and event guest movement across Singapore and Malaysia.
                </p>
              </div>
              <span className="service-link">View Corporate Events</span>
            </Link>

            <Link href="/singapore-attractions" className="service-card">
              <div>
                <div className="service-icon">🎟️</div>
                <h3>Attractions &amp; Tickets</h3>
                <p>
                  Easy booking for selected Singapore attractions and admission tickets with a simple purchase flow and direct checkout experience.
                </p>
              </div>
              <span className="service-link">View Attractions</span>
            </Link>

            <Link href="/services/singapore-tours" className="service-card">
              <div>
                <div className="service-icon">📍</div>
                <h3>Singapore Tours</h3>
                <p>
                  Discover the city with private chauffeur-driven tours designed for comfort, flexibility, and a premium travel experience.
                </p>
              </div>
              <span className="service-link">View Singapore Tours</span>
            </Link>

            <Link href="/services/malaysia-tours" className="service-card">
              <div>
                <div className="service-icon">⛰️</div>
                <h3>Malaysia Tours</h3>
                <p>
                  Enjoy curated private journeys across Malaysia with chauffeur service suited for couples, families, and small groups.
                </p>
              </div>
              <span className="service-link">View Malaysia Tours</span>
            </Link>

            <Link href="/services/shared" className="service-card">
              <div>
                <div className="service-icon">🚌</div>
                <h3>Seat-In-Coach</h3>
                <p>
                  Practical shared tour options with clear pricing, fixed schedules, and a straightforward booking experience.
                </p>
              </div>
              <span className="service-link">View Seat-In-Coach</span>
            </Link>
          </div>
          {/* Featured Singapore Transfer cards preview */}
          <ServicePreview config={config} cards={cards} previewCount={3} />
        </div>
      </section>

      <section className="section alt" id="why-us">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Professional standards</p>
            <h2>Why Travel With Glance Limousine</h2>
          </div>
          <div className="why-grid">
            <div className="why-item">
              <i className="fas fa-certificate" />
              <h4>Experienced Chauffeurs</h4>
              <p>
                Our drivers are highly trained, professional, and dedicated to providing a
                safe, smooth, and punctual journey every time.
              </p>
            </div>
            <div className="why-item">
              <i className="fas fa-shield-alt" />
              <h4>Safety &amp; Reliability</h4>
              <p>
                We prioritize your safety with well-maintained vehicles and a commitment
                to dependable service for all your travel needs.
              </p>
            </div>
            <div className="why-item">
              <i className="fas fa-gem" />
              <h4>Premium Fleet</h4>
              <p>
                Travel in style with our selection of modern, high-end vehicles, regularly
                serviced to ensure maximum comfort and performance.
              </p>
            </div>
            <div className="why-item">
              <i className="fas fa-clock" />
              <h4>Seamless Experience</h4>
              <p>
                From booking to arrival, we provide a connected and hassle-free luxury
                transport experience tailored to your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="faq-grid">
            <div className="card faq-box">
              <h3>Frequently Asked Questions</h3>
              <p className="mini-copy" style={{ marginBottom: 20 }}>
                Find answers to common questions about our chauffeur services, booking
                process, and travel between Singapore and Malaysia.
              </p>
              <div className="faq-list">
                <div className="faq-item">
                  <strong>How do I get the final quotation?</strong>
                  <span>Send exact pickup and drop-off location so we can confirm the precise route and pricing.</span>
                </div>
                <div className="faq-item">
                  <strong>Are toll and fuel included?</strong>
                  <span>Yes. Toll and fuel are inclusive unless the journey scope changes significantly.</span>
                </div>
                <div className="faq-item">
                  <strong>Is driver accommodation required?</strong>
                  <span>For long-distance overnight journeys, driver accommodation should be covered at SGD 50 per day.</span>
                </div>
                <div className="faq-item">
                  <strong>Can I choose private or shared?</strong>
                  <span>Yes. The website clearly separates Singapore tours, Malaysia tours and Seat-In-Coach shared tours.</span>
                </div>
              </div>
            </div>
            <div className="card cta-box">
              <h3>Luxury should feel clear.</h3>
              <p>The strongest limousine websites look premium, but they also make it easy for customers to understand their options and enquire quickly.</p>
              <div className="cta-actions">
                <Link className="btn" href="/services/singapore-transfer">
                  Singapore Transfer
                </Link>
                <Link className="btn" href="/services/shared">
                  Seat In Coach
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
