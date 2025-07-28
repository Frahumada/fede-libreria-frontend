import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';

export default function CashFlowForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: 'ingreso',
    category: '',
    description: '',
    amount: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount) {
      return setError('Completa categoría y monto');
    }

    try {
      await api.post('/cashflow', form);
      navigate('/cashflow');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error al guardar movimiento');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Nuevo Movimiento</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tipo</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Categoría</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Ej: Ventas, Alquiler, Compras"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descripción (opcional)</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Detalle adicional"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Monto</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Ej: 1000.00"
            step="0.01"
            min="0"
          />
        </div>

        <Button type="submit" variant="primary">
          Guardar
        </Button>
      </form>
    </div>
  );
}
