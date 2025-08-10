import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas',error.response?.data?.message || 'Error al iniciar sesión',err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl mb-4">Iniciar sesión</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          name="username"
          placeholder="Usuario"
          value={credentials.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}

{/* <div class="min-h-screen flex items-center justify-center">
  <div class="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
    <h2 class="text-2xl font-bold pb-5">Sign In</h2>
    <form >
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
        <input
          name="username"
          placeholder="Usuario"
          value={credentials.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2 text-sm font-medium">Your password</label>
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
      </div>
      <div class="flex items-center justify-between mb-4">
        <button
          type="submit"
          class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

 */}
