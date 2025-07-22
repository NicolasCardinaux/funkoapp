import React, { useEffect, useState } from "react"; // Import useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import CrearFunko from './components/CrearFunko';
import ListarFunkos from './components/ListarFunkos';
import CrearCategoria from './components/CrearCategoria';
import ListarCategorias from './components/ListarCategorias';
import CrearDescuento from './components/CrearDescuento';
import ListarDescuentos from './components/ListarDescuentos.jsx'
import ListarVentas from './components/ListarVentas.jsx';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false); // New state for admin authentication

  useEffect(() => {
    // ✅ Obtenemos el token y el estado isStaff directamente de localStorage
    const token = localStorage.getItem("token");
    const isStaff = localStorage.getItem("isStaff") === 'true'; // Convertir a booleano

    if (!token) {
      // Si no hay token, redirigir al login del frontend principal
      window.location.href = "https://importfunko.vercel.app/login";
      return;
    }

    // Si el token existe pero el usuario NO es staff, redirigir al frontend principal
    if (!isStaff) {
      window.location.href = "https://importfunko.vercel.app";
      return;
    }

    // Si el token existe Y el usuario es staff, entonces autenticado como admin
    setIsAuthenticatedAdmin(true);
    setLoading(false);

    // Ya no necesitamos hacer una llamada fetch al backend para validar is_staff aquí,
    // ya que esa información se guarda en localStorage durante el login.
    // La validez del token en sí se asume por la presencia en localStorage y el isStaff flag.
    // Si el token fuera inválido/expirado, la API del backend para las operaciones
    // del admin (CrearFunko, ListarFunkos, etc.) debería manejarlo con un 401 y
    // el usuario eventualmente sería redirigido al login si se implementa un interceptor
    // de errores global o un manejo de errores en cada fetch.

  }, []); // Este useEffect se ejecuta solo una vez al montar el componente

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '24px',
        color: '#333'
      }}>
        Cargando panel de administración...
      </div>
    );
  }

  if (!isAuthenticatedAdmin) {
    // Esta condición debería ser alcanzada solo si las redirecciones anteriores fallan.
    // En un flujo normal, el usuario ya habría sido redirigido.
    return null;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crear-funko" element={<CrearFunko />} />
            <Route path="/listar-funkos" element={<ListarFunkos />} />
            <Route path="/crear-categoria" element={<CrearCategoria />} />
            <Route path="/listar-categorias" element={<ListarCategorias />} />
            <Route path="/crear-descuento" element={<CrearDescuento />} />
            <Route path="/listar-descuentos" element={<ListarDescuentos />} />
            <Route path="/listar-ventas" element={<ListarVentas />} />
            {/* Add a catch-all route for unauthorized access or non-existent pages */}
            <Route path="*" element={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh',
                fontSize: '24px',
                color: '#e74c3c'
              }}>
                <h2>Acceso Denegado o Página No Encontrada</h2>
                <p>No tienes permiso para acceder a esta página o la página no existe.</p>
                <button
                  onClick={() => window.location.href = "https://importfunko.vercel.app"}
                  style={{
                    padding: '10px 20px',
                    marginTop: '20px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  Volver al Inicio
                </button>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;