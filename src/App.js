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
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const backendUrl = "https://practica-django-fxpz.onrender.com"; // Your backend URL

    if (!token) {
      // If no token, redirect to the main frontend's login page
      window.location.href = "https://importfunco.vercel.app/login";
      return;
    }

    // Save the token for later use
    localStorage.setItem("token", token);

    // Validate the token by calling the API
    fetch(`${backendUrl}/api/user/`, { // Adjust this endpoint if your user details API is different
      headers: {
        Authorization: `Bearer ${token}`, // Use Bearer token for authorization
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Token inválido o error en la respuesta del servidor");
        }
        return res.json();
      })
      .then((user) => {
        if (!user.is_staff) {
          // Not an admin, redirect back to the main frontend
          window.location.href = "https://importfunco.vercel.app";
        } else {
          // If it's an admin, proceed
          setIsAuthenticatedAdmin(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error validating token:", error);
        // If token validation fails, redirect to the main frontend's login
        window.location.href = "https://importfunco.vercel.app/login";
      });
  }, []); // Run only once on component mount

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
    // This case should ideally not be reached if the redirects work,
    // but it's a fallback to prevent rendering admin content if not authenticated.
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
                  onClick={() => window.location.href = "https://importfunco.vercel.app"}
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