import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, CardHeader } from '../components/ui/Card';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/reports/sales/summary?period=daily')
      .then(res => {
        console.log('Resumen API:', res.data);
        setSummary(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudieron cargar los datos');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6 text-gray-600">Cargando datos…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Resumen Ventas Diario
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Total ventas" subtitle="Hoy" />
          <p className="text-2xl font-bold text-primary">$ {summary.totalAmount}</p>
        </Card>

        <Card title="N° transacciones">
          <p className="text-2xl font-bold text-primary">
            {summary.transactions}
          </p>
        </Card>
      </div>
    </div>
  );
}
