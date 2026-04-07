import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand">
          <Image alt="Glance Limousine logo" className="brand-logo" src="/logo.webp" width={100} height={100} /><div className="brand-copy">
            <div className="brand-title">Glance Limousine</div>
            <div className="brand-sub">Luxury In Motion · Singapore</div>
          </div>
        </div>
        <nav className="nav-links">
          <Link href="/#home">Home</Link>
          <Link href="/services/singapore-transfer">Singapore Transfer</Link>
          <Link href="/services/cross-border-transfer">Cross Border Transfer</Link>
          <Link href="/services/singapore-tours">Singapore Tours</Link>
          <Link href="/services/malaysia-tours">Malaysia Tours</Link>
          <Link href="/services/singapore-attractions">Singapore Attractions</Link>
          <Link href="/wedding-chauffeur">Wedding Chauffeur</Link>
          <Link href="/corporate-events">Corporate Events</Link>
          <Link href="/#shared">Seat In Coach</Link>
          <Link href="/#fleet">Our Fleet</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/#terms">Terms</Link>
        </nav>
      </div>
    </header>
  );
}
