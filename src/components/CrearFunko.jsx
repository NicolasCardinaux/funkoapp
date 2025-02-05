import React, { useState } from 'react';
import { crearFunko } from '../utils/api';

const CrearFunko = () => {
  const [funko, setFunko] = useState({
    nombre: "",
    descripción: "",
    is_backlight: false,
    stock: 0,
    precio: 0,
  });
  
  const token = '073b5c9eaa1fbc7a8511ea67ecd44aac1a1ca432';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFunko({
      ...funko,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await crearFunko(funko, token);

    if (result.success) {
      alert("Funko creado exitosamente!");
      setFunko({
        nombre: "",
        descripción: "",
        is_backlight: false,
        stock: 0,
        precio: 0,
      });
    } else {
      alert(`Error: ${result.message}`);
    }
  };
  return (
    <div>
      <h2>Crear Funko</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={funko.nombre} onChange={handleChange} required />

        <label>Descripción:</label>
        <textarea name="descripción" value={funko.descripción} onChange={handleChange} required />

        <label>¿Brilla en la oscuridad?</label>
        <input type="checkbox" name="is_backlight" checked={funko.is_backlight} onChange={handleChange} />

        <label>Stock:</label>
        <input type="number" name="stock" value={funko.stock} onChange={handleChange} required />

        <label>Precio:</label>
        <input type="number" name="precio" value={funko.precio} onChange={handleChange} required />

        <button type="submit">Crear Funko</button>
      </form>
    </div>
  );
};

export default CrearFunko;