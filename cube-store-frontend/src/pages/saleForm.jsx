import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function SaleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ date: '', items: [], total: 0 });
  const [products, setProducts] = useState([]);

  // Carga productos y datos de venta (en edición)
  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(console.error);

    if (isEdit) {
      api.get(`/sales/${id}`)
        .then(res => {
          const sale = res.data;
          setForm({
            date: sale.date.split('T')[0],
            items: sale.items,
            total: sale.total,
          });
        })
        .catch(console.error);
    }
  }, [id, isEdit]);

  // Recalcula total cuando cambian los ítems
  useEffect(() => {
    const total = form.items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    setForm(f => ({ ...f, total }));
  }, [form.items]);

  const handleDateChange = e =>
    setForm(f => ({ ...f, date: e.target.value }));

  const handleItemChange = (index, field, value) => {
    setForm(f => {
      const items = [...f.items];
      items[index] = { ...items[index], [field]: value };
      if (field === 'productId') {
        const prod = products.find(p => p._id === value);
        items[index].price = prod ? prod.price : 0;
      }
      return { ...f, items };
    });
  };

  const addItem = () =>
    setForm(f => ({
      ...f,
      items: [...f.items, { productId: '', quantity: 1, price: 0 }],
    }));

  const removeItem = index =>
    setForm(f => ({
      ...f,
      items: f.items.filter((_, i) => i !== index),
    }));

  const handleSubmit = e => {
    e.preventDefault();
    // Validación de stock: ninguna cantidad puede exceder el stock disponible
    const overstock = form.items.find(item => {
      const prod = products.find(p => p._id === item.productId);
      return prod && item.quantity > prod.stock;
    });
    if (overstock) {
      const prodName = products.find(p => p._id === overstock.productId)?.name || 'producto';
      alert(`La cantidad de "${prodName}" excede el stock disponible (${products.find(p => p._id === overstock.productId)?.stock}).`);
      return;
    }
    const payload = { ...form, date: new Date(form.date + 'T03:00:00') };
    const req = isEdit
      ? api.put(`/sales/${id}`, payload)
      : api.post('/sales', payload);
    req.then(() => navigate('/sales')).catch(console.error);
  };

    // Determinar si el formulario es válido
    const isFormValid =
    form.date &&
    form.items.length > 0 &&
    form.items.every(item => item.productId && item.quantity > 0);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">
        {isEdit ? 'Editar' : 'Nueva'} Venta
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fecha */}
        <div>
          <label className="block mb-1">Fecha</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleDateChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Ítems de venta */}
        <div>
          <h2 className="text-lg mb-2">Ítems</h2>
          {form.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <select
                value={item.productId}
                onChange={e => handleItemChange(idx, 'productId', e.target.value)}
                className="border p-2 rounded flex-1"
              >
                <option value="">Selecciona un producto</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
                className="w-20 p-2 border rounded"
              />
              <span className="w-24 text-center">
                {item.price.toFixed(2)}$
              </span>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Añadir ítem
          </button>
        </div>

        {/* Total */}
        <div>
          <label className="block mb-1">Total</label>
          <input
            type="text"
            value={form.total.toFixed(2)}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isEdit ? 'Actualizar' : 'Crear'} Venta
        </button> */}
        {/* Mensaje de validación si el formulario no está completo */}
        {!isFormValid && (
           <p className="text-red-500">
             Por favor, completa la fecha y al menos un ítem válido.
           </p>
         )}
        
         {/* Botón deshabilitado si el formulario no es válido */}
         <button
           type="submit"
           disabled={!isFormValid}
           className={`bg-green-600 text-white px-4 py-2 rounded ${
             !isFormValid && 'opacity-50 cursor-not-allowed'
           }`}
         >
           {isEdit ? 'Actualizar' : 'Crear'} Venta
         </button>
      </form>
    </div>
  );
}