import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/sales')
      .then(res => { setSales(res.data); setLoading(false); })
      .catch(err => { console.error(err); setError('Error al cargar ventas'); setLoading(false); });
  }, []);

  if (loading) return <p className="p-6">Cargando ventas…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Ventas</h1>
        <Link to="/sales/new" className="bg-blue-600 text-white px-4 py-2 rounded">Nueva Venta</Link>
      </div>
      <ul className="space-y-2">
        {sales.map(s => (
          <li key={s._id} className="border p-4 flex justify-between">
            <span>{new Date(s.date).toLocaleDateString()}</span>
            <span>Total: {s.total}</span>
            <Link to={`/sales/${s._id}`} className="text-blue-500">Ver/Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}