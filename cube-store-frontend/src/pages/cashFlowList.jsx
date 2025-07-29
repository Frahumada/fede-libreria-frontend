import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/ui/Button';

export default function CashFlowList() {
  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cashflow')
      .then(res => {
        setFlows(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este movimiento?')) return;
    await api.delete(`/cashflow/${id}`);
    setFlows(flows.filter(flow => flow._id !== id));
  };

  // 🧮 Cálculo de totales
  const totalIngresos = flows
    .filter(f => f.type === 'ingreso')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalEgresos = flows
    .filter(f => f.type === 'egreso')
    .reduce((sum, f) => sum + f.amount, 0);

  const balance = totalIngresos - totalEgresos;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Flujo de Caja</h1>
        <Button to="/cashflow/new" variant="primary">Nuevo Movimiento</Button>
      </div>

      {/* Totales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
        <div>
          <p className="text-gray-600">Total Ingresos</p>
          <p className="text-green-600 text-xl font-bold">${totalIngresos.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">Total Egresos</p>
          <p className="text-red-600 text-xl font-bold">${totalEgresos.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">Balance General</p>
          <p className={`text-xl font-bold ${balance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      {loading ? (
        <p>Cargando movimientos...</p>
      ) : flows.length === 0 ? (
        <p className="text-gray-600">No hay movimientos registrados.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Categoría</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-right">Monto</th>
              <th className="px-4 py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {flows.map(flow => (
              <tr key={flow._id} className="border-t">
                <td className="px-4 py-2">{new Date(flow.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 capitalize">{flow.type}</td>
                <td className="px-4 py-2">{flow.category}</td>
                <td className="px-4 py-2">{flow.description || '-'}</td>
                <td className={`px-4 py-2 text-right font-bold ${flow.type === 'egreso' ? 'text-red-600' : 'text-green-600'}`}>
                  ${flow.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right">
                  <Button variant="danger" onClick={() => handleDelete(flow._id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
