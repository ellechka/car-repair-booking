import { useEffect, useState } from 'react';
import './MenuDrawer.css';

// Menu entries. add routing later
const ITEMS = [
  { label: 'Booking', icon: 'assignment' },
  { label: 'Services', icon: 'car_repair' },
  { label: 'Price list', icon: 'list_alt' },
  { label: 'Shop', icon: 'shopping_cart' },
  { label: 'FAQ', icon: 'help_outline' },
  { label: 'Contact', icon: 'quick_contacts_dialer' },
];

const MenuDrawer = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`menu-backdrop${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
      />

      <nav
        id="site-menu"
        className={`menu-drawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        <ul>
          {ITEMS.map(({ label, icon }) => (
            <li key={label}>
              <button
                type="button"
                className="menu-link"
                tabIndex={open ? 0 : -1}
              >
                <span className="material-icons-round" aria-hidden="true">
                  {icon}
                </span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MenuDrawer;