import { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, CardHeader } from '../components/ui/Card';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/Button';

export default function Report() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('daily');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    let url = '/reports/sales/summary';

    if (from && to) {
      url += `?from=${from}&to=${to}`;
    } else {
      url += `?period=${period}`;
    }

    setLoading(true);
    api.get(url)
      .then(res => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch(() => {
        setSummary(null);
        setLoading(false);
      });
  }, [period, from, to]);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (from && to) {
      setPeriod('custom');
    }
  };

  return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Resumen de Ventas</h1>

        {/* Filtros */}
        <div className="space-x-2">
          <Button variant="secondary" onClick={() => { setPeriod('daily'); setFrom(''); setTo(''); }} >Hoy</Button>
          <Button variant="secondary" onClick={() => { setPeriod('weekly'); setFrom(''); setTo(''); }} >Últimos 7 días</Button>
          <Button variant="secondary" onClick={() => { setPeriod('monthly'); setFrom(''); setTo(''); }} >Últimos 30 días</Button>
        </div>

        {/* Filtro personalizado */}
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 mt-2">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Aplicar
          </button>
        </form>

        {/* Resultados */}
        {loading && <p>Cargando...</p>}
        {!loading && summary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader title="Total ventas" subtitle={`Período: ${summary.period}`} />
              <p className="text-2xl font-bold text-primary">${summary.totalAmount.toFixed(2)}</p>
            </Card>

            <Card>
              <CardHeader title="Transacciones" subtitle="Cantidad total" />
              <p className="text-2xl font-bold text-primary">{summary.transactions}</p>
            </Card>
          </div>
        )}
      </div>
  );
}
