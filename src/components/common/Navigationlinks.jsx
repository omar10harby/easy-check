import { Link } from 'react-router-dom';
import { Smartphone, Search, CreditCard, Wallet } from 'lucide-react';

const navigationItems = [
  {
    id: 'check-device',
    label: 'Check Device',
    icon: Smartphone,
    path: '/imei-checker',
  },
  {
    id: 'search-history',
    label: 'Search History',
    icon: Search,
    path: '/search-history',
  },
  {
    id: 'wallet-history',
    label: 'Wallet History',
    icon: CreditCard,
    path: '/wallet-history',
  },
  {
    id: 'add-balance',
    label: 'Add Balance',
    icon: Wallet,
    path: '/add-balance',
  },
];

function NavigationLinks({ onLinkClick, variant = 'sidebar' }) {
  if (variant === 'dropdown') {
    return (
      <>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-light-gray transition-colors focus:outline-none focus:bg-light-gray"
              onClick={onLinkClick}
              role="menuitem"
            >
              <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </>
    );
  }

  // Sidebar variant (default)
  return (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            to={item.path}
            className="flex items-center gap-4 px-4 py-3.5 text-primary font-semibold rounded-xl hover:bg-light-gray transition-all group"
            onClick={onLinkClick}
          >
            <div className="w-10 h-10 bg-light-gray rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}

export default NavigationLinks;