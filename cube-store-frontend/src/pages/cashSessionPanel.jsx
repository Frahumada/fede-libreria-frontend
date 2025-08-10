import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/ui/Button';

export default function CashSessionPanel() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Consultar estado actual
  const fetchSession = async () => {
    try {
      setLoading(true);
      const res = await api.get('/cajas/current');
      setSession(res.data);
    } catch (err) {
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const openCaja = async () => {
    try {
      await api.post('/cajas/open');
      await fetchSession();
    } catch (err) {
      setError('Error al abrir la caja');
    }
  };

  const closeCaja = async () => {
    if (!confirm('¿Seguro que deseas cerrar la caja?')) return;
    try {
      await api.post('/cajas/close');
      await fetchSession();
    } catch (err) {
      setError('Error al cerrar la caja');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Gestión de Caja</h2>

      {loading ? (
        <p>Cargando estado de caja...</p>
      ) : session ? (
        <div className="space-y-2">
          <p className="text-green-700 font-semibold">Caja abierta</p>
          <p>
            Apertura:{" "}
            <strong>{new Date(session.openTime).toLocaleString()}</strong>
          </p>
          <p>Responsable: {session.openedBy}</p>
          <Button variant="danger" onClick={closeCaja}>Cerrar Caja</Button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-red-700 font-semibold">Caja cerrada</p>
          <Button variant="primary" onClick={openCaja}>Abrir Caja</Button>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
