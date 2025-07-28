import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    name: '', category: '', price: 0, stock: 0, minStock: 0, maxStock: 0, ean: '', variants: []
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`)
        .then(res => setForm(res.data))
        .catch(console.error);
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const request = isEdit
      ? api.put(`/products/${id}`, form)
      : api.post('/products', form);

    request.then(() => navigate('/products'))
      .catch(console.error);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">{isEdit ? 'Editar' : 'Nuevo'} Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name','category','ean'].map(field => (
          <div key={field}>
            <label className="block">{field}</label>
            <input name={field} value={form[field]} onChange={handleChange}
                   className="w-full p-2 border rounded"/>
          </div>
        ))}
        {['price','stock','minStock','maxStock'].map(field => (
          <div key={field}>
            <label className="block">{field}</label>
            <input name={field} type="number" value={form[field]} onChange={handleChange}
                   className="w-full p-2 border rounded"/>
          </div>
        ))}
        {/* Variants y otros campos se pueden agregar según modelo */}
        <button type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded">
          {isEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
}