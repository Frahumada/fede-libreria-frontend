import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/products', label: 'Productos' },
  { to: '/sales', label: 'Ventas' },
  { to: '/cashflow', label: 'Caja' },
  { to: '/reports', label: 'Reportes' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow h-screen sticky top-0 p-6">
      <div className="text-2xl font-bold text-primary mb-8">Cube Store</div>
      <nav className="space-y-2">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition font-medium ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
