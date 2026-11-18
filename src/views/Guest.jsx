import {Link} from 'react-router';
import './Guest.css';
import MenuDrawer from '../components/MenuDrawer/MenuDrawer.jsx';

const repairs = [
  {name: 'Oil change', price: 'from 89 €', duration: 'approx. 1 h'},
  {name: 'Tyre change', price: 'from 40 €', duration: 'approx. 45 min'},
  {name: 'Brake service', price: 'from 149 €', duration: 'approx. 2 h'},
  {name: 'Battery replacement', price: 'from 129 €', duration: 'approx. 30 min'},
  {name: 'AC service', price: 'from 99 €', duration: 'approx. 1 h'},
  {name: 'Diagnostics', price: 'from 59 €', duration: 'approx. 1 h'},
  {name: 'Timing belt', price: 'from 449 €', duration: 'approx. 4–5 h'},
  {name: 'Wheel alignment', price: 'from 79 €', duration: 'approx. 1 h'},
  {name: 'Inspection prep', price: 'from 69 €', duration: 'approx. 1 h'},
];

const steps = [
  ['1', 'Choose a repair', 'Browse the repairs and services, then pick what your car needs.'],
  ['2', 'Pick a time', 'Choose a free slot that suits you and confirm the booking.'],
  ['3', 'Bring your car', 'Drop off your car. We can follow the repair status online.'],
];

const Guest = () => (
  <div className="guest-page">
    <header className="guest-nav">
      <Link className="guest-brand" to="/">Autokorjaamo</Link>
      <nav aria-label="Account navigation">
        <Link className="button button-quiet" to="/login">Log in</Link>
        <Link className="button button-light" to="/signup">Sign up</Link>
      </nav>
      <MenuDrawer />
    </header>

    <main>
      <section className="guest-hero">
        <p className="eyebrow">Reliable care for every journey</p>
        <h1>Car repairs and maintenance, booked online</h1>
        <p>Pick a repair, choose a time and bring your car in. Prices shown upfront.</p>
        <a className="button button-primary" href="#repairs">Book a repair <span aria-hidden="true">→</span></a>
        <a className="hero-note" href="#how-it-works">Can't find your repair? Send us an enquiry</a>
      </section>

      <section className="repair-section" id="repairs" aria-labelledby="repairs-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Our services</p>
            <h2 id="repairs-title">What does your car need?</h2>
          </div>
          <p>Transparent pricing and expert mechanics, all in one place.</p>
        </div>
        <div className="repair-grid">
          {repairs.map((repair) => (
            <article className="repair-card" key={repair.name}>
              <div>
                <h3>{repair.name}</h3>
                <p>{repair.price}</p>
                <small>{repair.duration}</small>
              </div>
              <Link className="card-link" to="/single">Details <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section" id="how-it-works" aria-labelledby="how-title">
        <p className="eyebrow">Simple from start to finish</p>
        <h2 id="how-title">How it works</h2>
        <div className="steps-grid">
          {steps.map(([number, title, copy]) => (
            <article className="step" key={number}>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="account-callout" aria-labelledby="account-title">
        <div>
          <p className="eyebrow">A better way to care for your car</p>
          <h2 id="account-title">Why create an account?</h2>
          <ul>
            <li>Save your vehicle profile</li>
            <li>See your previous repairs</li>
            <li>Book faster next time</li>
          </ul>
        </div>
        <Link className="button button-primary" to="/signup">Create an account <span aria-hidden="true">→</span></Link>
      </section>

      <section className="trust-section" aria-labelledby="trust-title">
        <p className="eyebrow">Peace of mind included</p>
        <h2 id="trust-title">Why choose us</h2>
        <div className="trust-grid">
          <div><strong>Warranty on all repairs</strong><span>12-month warranty on parts and work.</span></div>
          <div><strong>Certified mechanics</strong><span>Experienced staff trained on all major brands.</span></div>
          <div><strong>Clear pricing</strong><span>You see the price before you book. No surprises.</span></div>
        </div>
      </section>
    </main>

    <footer className="guest-footer">
      <div>
        <strong>Autokorjaamo</strong>
        <span>Address, Phone, email@example.com</span>
      </div>
      <div>
        <span>Opening hours: Mon–Fri 8–20</span>
        <span>© 2026 Autokorjaamo</span>
      </div>
    </footer>
  </div>
);

export default Guest;
