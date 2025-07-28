import { useEffect, useState } from "react";
import api from "../services/api";
import { Card, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Report() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("daily");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const [lowStock, setLowStock] = useState([]);
  const [loadingLowStock, setLoadingLowStock] = useState(true);

  const [highStock, setHighStock] = useState([]);
  const [loadingHighStock, setLoadingHighStock] = useState(true);

  useEffect(() => {
    let url = "/reports/sales/summary";
    if (isCustom && from && to) {
      url += `?from=${from}&to=${to}`;
    } else {
      url += `?period=${period}`;
    }

    setLoading(true);
    api
      .get(url)
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch(() => {
        setSummary(null);
        setLoading(false);
      });
  }, [period, from, to, isCustom]);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (from && to) {
      setIsCustom(true);
    }
  };

  useEffect(() => {
    // Stock bajo
    api
      .get("/reports/products/low-stock?limit=100")
      .then((res) => {
        setLowStock(res.data.items || []);
        setLoadingLowStock(false);
      })
      .catch(() => {
        setLowStock([]);
        setLoadingLowStock(false);
      });

    // Stock alto
    api
      .get("/reports/products/high-stock?limit=20")
      .then((res) => {
        setHighStock(res.data.items || []);
        setLoadingHighStock(false);
      })
      .catch(() => {
        setHighStock([]);
        setLoadingHighStock(false);
      });
  }, []);

  const handlePeriodClick = (p) => {
    setPeriod(p);
    setFrom("");
    setTo("");
    setIsCustom(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resumen de Ventas</h1>

      {/* Filtros rápidos */}
      <div className="space-x-2">
        <Button variant="secondary" onClick={() => handlePeriodClick("daily")}>
          Hoy
        </Button>
        <Button variant="secondary" onClick={() => handlePeriodClick("weekly")}>
          Últimos 7 días
        </Button>
        <Button variant="secondary" onClick={() => handlePeriodClick("monthly")}>
          Últimos 30 días
        </Button>
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
        <button
          type="submit"
          disabled={!from || !to}
          className={`px-4 py-2 rounded text-white ${
            from && to ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Aplicar
        </button>
      </form>

      {/* Resultados */}
      {loading && <p>Cargando resumen...</p>}
      {!loading && summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader
              title="Total ventas"
              subtitle={`Período: ${summary.period}`}
            />
            <p className="text-2xl font-bold text-primary">
              ${summary.totalAmount.toFixed(2)}
            </p>
          </Card>

          <Card>
            <CardHeader title="Transacciones" subtitle="Cantidad total" />
            <p className="text-2xl font-bold text-primary">
              {summary.transactions}
            </p>
          </Card>
        </div>
      )}

      {/* Productos con stock bajo */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Productos con stock bajo</h2>
        {loadingLowStock ? (
          <p>Cargando productos...</p>
        ) : lowStock.length === 0 ? (
          <p className="text-gray-600">No hay productos con stock bajo.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Mínimo</th>
                <th className="px-4 py-2 text-left">Categoría</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2">{product.minStock}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">
                    <Button
                      variant="primary"
                      to={`/products/${product._id}`}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Productos con sobrestock */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Productos con sobrestock</h2>
        {loadingHighStock ? (
          <p>Cargando productos...</p>
        ) : highStock.length === 0 ? (
          <p className="text-gray-600">No hay productos con sobrestock.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Máximo</th>
                <th className="px-4 py-2 text-left">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {highStock.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2">{product.maxStock}</td>
                  <td className="px-4 py-2">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
