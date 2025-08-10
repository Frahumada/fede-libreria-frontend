import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/dashboard.jsx';
import ProductList from '../pages/ProductList.jsx';
import ProductForm from '../pages/ProductForm.jsx';
import SalesList from '../pages/salesList.jsx';
import SaleForm from '../pages/saleForm.jsx';
import Reports from '../pages/reports.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';
import Layout from '../components/layout/Layout';
import CashFlowList from '../pages/cashFlowList.jsx';
import CashFlowForm from '../pages/cashFlowForm.jsx';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Pública */}
      <Route path="/login" element={<Login />} />

      {/* Protegidas con layout */}
      <Route path="/" element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="reports" element={<Reports />} />
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductForm />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="sales/new" element={<SaleForm />} />
          <Route path="sales/:id" element={<SaleForm />} />
          <Route path="cashflow" element={<CashFlowList />} />
          <Route path="cashflow/new" element={<CashFlowForm />} />
          <Route path="cashflow/:id" element={<CashFlowForm />} />

        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
