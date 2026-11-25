import { useState } from 'react';
import { useCart } from '../../CartContext';
import { services } from '../../data/services';
import './Booking.css';

const formatPrice = (cents) => `${(cents / 100).toFixed(2)} €`;

// Today's date in local time as YYYY-MM-DD (for the date input's min).
const getToday = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const Booking = () => {
  const { items, addItems } = useCart();

  const [serviceId, setServiceId] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = services.find((s) => s.id === Number(serviceId));
    if (!service) return;

    addItems([
      {
        id: crypto.randomUUID(),
        serviceId: service.id,
        serviceName: service.name,
        priceCents: service.price_cents,
        carModel: carModel.trim(),
        carPlate: carPlate.trim().toUpperCase(),
        date,
        notes: notes.trim(),
      },
    ]);
    setMessage(`${service.name} added to cart (${items.length + 1} items in cart)`);

    // Keep car and date so the user can quickly add more for the same car.
    setServiceId('');
    setNotes('');
  };

  return (
    <main className="booking-page">
      <h1>Booking</h1>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label className="booking-field">
          Service
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {formatPrice(s.price_cents)} · {s.duration_minutes} min
              </option>
            ))}
          </select>
        </label>

        <label className="booking-field">
          Car model
          <input
            type="text"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            placeholder="e.g. Toyota Corolla"
            required
          />
        </label>

        <label className="booking-field">
          Plate number
          <input
            type="text"
            value={carPlate}
            onChange={(e) => setCarPlate(e.target.value)}
            placeholder="e.g. ABC-123"
            required
          />
        </label>

        <label className="booking-field">
          Date
          <input
            type="date"
            value={date}
            min={getToday()}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className="booking-field">
          Additional information
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Anything we should know?"
          />
        </label>

        <button type="submit" disabled={serviceId === ''}>
          Add to cart
        </button>

        {message && <p className="booking-message">{message}</p>}
      </form>
    </main>
  );
};

export default Booking;
