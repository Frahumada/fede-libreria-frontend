import { useState } from "react";
import api from "../services/api";
import { Button } from "../components/ui/Button";
import { useNavigate } from 'react-router-dom';

export default function CashFlowForm({ onSuccess }) {
  const [form, setForm] = useState({
    type: "ingreso",
    category: "",
    description: "",
    amount: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { type, category, description, amount } = form;
      await api.post("/cashflow", {
        type,
        category,
        description,
        amount: parseFloat(amount)
      });
      setForm({ type: "ingreso", category: "", description: "", amount: "" });
      if (onSuccess) onSuccess(); // Recargar lista si se pasa función
    } catch (err) {
      setError("Error al registrar el flujo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md space-y-4"
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Registrar movimiento</h2>
          <Button variant="secondary" onClick={() => navigate('/cashflow')}>
            Volver
          </Button>
        </div>
        <p className="text-gray-600">Complete el formulario para registrar un nuevo movimiento.</p>
        <div className="border-b border-gray-300 mb-4"></div>
      </div>


      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="ingreso"
            checked={form.type === "ingreso"}
            onChange={handleChange}
          />
          Ingreso
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="egreso"
            checked={form.type === "egreso"}
            onChange={handleChange}
          />
          Egreso
        </label>
      </div>

      <input
        type="text"
        name="category"
        placeholder="Categoría"
        value={form.category}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Descripción (opcional)"
        value={form.description}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
      />

      <input
        type="number"
        name="amount"
        placeholder="Monto"
        value={form.amount}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
        step="0.01"
        min="0"
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
