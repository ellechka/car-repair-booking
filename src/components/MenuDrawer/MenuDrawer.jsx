import { useEffect, useState } from 'react';
import './MenuDrawer.css';

const icon = (d) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
    <path d={d} />
  </svg>
);

// Menu entries. need to add links to the buttons.
const ITEMS = [
  {
    label: 'Booking',
    icon: icon('M19 3h-4.2C14.4 1.8 13.3 1 12 1s-2.4.8-2.8 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'),
  },
  {
    label: 'Services',
    icon: icon('M18.9 6c-.2-.6-.8-1-1.4-1h-11c-.6 0-1.2.4-1.4 1L4 11v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h10v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-1.1-5zM7.5 15a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm9 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zM6 10l.9-3h10.2l.9 3H6z'),
  },
  {
    label: 'Price list',
    icon: icon('M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zM7 7h2v2H7V7zm4 0h6v2h-6V7zM7 11h2v2H7v-2zm4 0h6v2h-6v-2zM7 15h2v2H7v-2zm4 0h6v2h-6v-2z'),
  },
  {
    label: 'Shop',
    icon: icon('M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1 2v2h2l3.6 7.6-1.4 2.4A2 2 0 0 0 7 17h12v-2H7.4l1.1-2h7.5a2 2 0 0 0 1.7-1l3.6-6.5A1 1 0 0 0 20.4 4H5.2l-.9-2H1zm16 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'),
  },
  {
    label: 'FAQ',
    icon: icon('M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'),
  },
  {
    label: 'Contact',
    icon: icon('M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM13 17H3v-1c0-1.7 3.3-2.5 5-2.5s5 .8 5 2.5v1zm4.3-3.2-1.5-1.5a3 3 0 0 0 0-3.6l1.5-1.5a5 5 0 0 1 0 6.6zm2.1 2.1-1.4-1.4a7 7 0 0 0 0-9l1.4-1.4a9 9 0 0 1 0 11.8z'),
  },
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
                {icon}
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
