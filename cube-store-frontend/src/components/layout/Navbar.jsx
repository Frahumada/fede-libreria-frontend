import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Button } from '../ui/Button.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="flex gap-4 items-center text-sm font-medium">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? 'bg-white text-primary' : 'hover:bg-primary/80'
            }`
          }
        >
          Dashboard
        </NavLink>
        {/* 🔧 Acá podés sumar otros links como: */}
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? 'bg-white text-primary' : 'hover:bg-primary/80'
            }`
          }
        >
          Productos
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive ? 'bg-white text-primary' : 'hover:bg-primary/80'
            }`
          }
        >
          Ventas
        </NavLink>
        
      </div>

      {user && (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-white/80 font-light">
            {user.username} ({user.role})
          </span>
          <Button variant="danger" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      )}
    </nav>
  );
}
