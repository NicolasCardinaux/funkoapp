import React, { useState, useEffect } from 'react'; // <-- Importar useState y useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import CrearFunko from './components/CrearFunko';
import ListarFunkos from './components/ListarFunkos';
import CrearCategoria from './components/CrearCategoria';
import ListarCategorias from './components/ListarCategorias';
import CrearDescuento from './components/CrearDescuento';
import ListarDescuentos from './components/ListarDescuentos.jsx';
import ListarVentas from './components/ListarVentas.jsx';
import './App.css';

// La URL de tu backend para verificar el token y obtener datos del usuario
const API_VERIFY_URL = "https://practica-django-fxpz.onrender.com/usuarios/login"; // Ajusta esta URL si tienes un endpoint específico para verificar


function App() {
  // Estados para manejar la autorización
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Buscamos el token en la URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      // Si no hay token, lo redirigimos al login del front principal
      window.location.href = "https://importfunco.vercel.app/login";
      return; // Detenemos la ejecución del efecto
    }

    // 2. Si hay token, lo validamos contra el backend
    fetch(API_VERIFY_URL, { // Asumimos que el endpoint de login puede usarse para verificar datos con un token
      method: 'GET', // O el método que corresponda para obtener datos del usuario
      headers: {
        'Authorization': `Token ${token}`, // O 'Bearer ${token}' según tu backend
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Token inválido o expirado");
      }
      return res.json();
    })
    .then(userData => {
      // 3. Verificamos si el usuario es staff
      if (userData.is_staff) {
        // ¡Autorizado! Guardamos el token y permitimos el acceso
        localStorage.setItem("admin_token", token);
        setIsAuthorized(true);
      } else {
        // No es admin, lo redirigimos a la home del sitio principal
        alert("Acceso denegado. No tienes permisos de administrador.");
        window.location.href = "https://importfunco.vercel.app/";
      }
    })
    .catch(error => {
      // Si el fetch falla o el token es malo, lo redirigimos al login
      console.error("Error de validación:", error);
      window.location.href = "https://importfunco.vercel.app/login";
    })
    .finally(() => {
      // 4. Terminamos la carga
      setIsLoading(false);
    });

  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  // --- Lógica de renderizado condicional ---

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#282c34', color: 'white' }}>
        <h1>Verificando acceso... 🔐</h1>
      </div>
    );
  }

  if (!isAuthorized) {
    // Aunque el useEffect ya redirige, esto es una capa extra de seguridad.
    // No renderiza nada si no está autorizado.
    return null; 
  }

  // Si pasó todas las verificaciones, muestra la app de admin
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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;