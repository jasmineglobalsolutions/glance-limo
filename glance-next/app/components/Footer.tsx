import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container footer-grid">
          <div>
            <h4>Glance Limousine</h4>
            <p>Timeless chauffeur excellence across Singapore and Malaysia.</p>
          </div>
          <div>
            <h4>Main Pages</h4>
            <Link href="/#home">Home</Link>
            <Link href="/services/singapore-transfer">Singapore Transfer</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div>
            <h4>Booking Pages</h4>
            <Link href="/services/singapore-tours">Singapore Tours</Link>
            <Link href="/services/malaysia-tours">Malaysia Tours</Link>
            <Link href="/services/cross-border-transfer">Malaysia Transfer</Link>
            <Link href="/#shared">Seat In Coach</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link href="/#fleet">Fleet</Link>
            <Link href="/#terms">Terms &amp; Conditions</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
      </footer>

      <div className="floating-dock">
        <a className="dock-wa" href="https://wa.me/6584444744" target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="dock-mail" href="mailto:admin@glancelimousine.com.sg">Email</a>
        <a className="dock-call" href="tel:+6584444744">Call</a>
        <Link className="dock-link" href="/#shared">Seat In Coach</Link>
        <Link className="dock-link" href="/services/singapore-tours">Singapore Tours</Link>
        <Link className="dock-link" href="/services/malaysia-tours">Malaysia Tours</Link>
        <Link className="dock-link" href="/services/cross-border-transfer">Cross Border</Link>
        <Link className="dock-link" href="/#terms">Terms</Link>
      </div>
    </>
  );
}
