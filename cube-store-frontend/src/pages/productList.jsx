import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';



export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar productos');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Cargando productos…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Productos</h1>
        <Link to="/products/new" className="bg-blue-600 text-white px-4 py-2 rounded">Nuevo</Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.category}</td>
              <td className="px-4 py-2">{p.price}</td>
              <td className="px-4 py-2">{p.stock}</td>
              <td className="px-4 py-2 space-x-2">
                <Link to={`/products/${p._id}`} className="text-blue-500">Editar</Link>
                <Link to={`/products/${p._id}`} className="text-blue-500">Editar</Link>
                <Link to={`/products/${p._id}/details`} className="text-green-500">Detalles</Link>
                <button className="text-red-500" onClick={() => handleDelete(p._id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(id) {
    if (confirm('¿Eliminar este producto?')) {
      api.delete(`/products/${id}`)
        .then(() => setProducts(products.filter(p => p._id !== id)))
        .catch(err => console.error(err));
    }
  }
}