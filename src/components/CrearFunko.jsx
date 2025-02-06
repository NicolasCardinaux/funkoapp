import { useState } from 'react';
import { crearFunko } from '../utils/api';
import '../styles/form.css';

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
    <div className='crear-container'>
      <h2>Crear Funko</h2>
      <form className='crear-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={funko.nombre} onChange={handleChange} required />
        </div>

        <div className='form-group'>
        <label>Descripción:</label>
        <textarea name="descripción" value={funko.descripción} onChange={handleChange} required />
        </div>

        <div className='form-group'>
        <label>Stock:</label>
        <input type="number" name="stock" value={funko.stock} onChange={handleChange} required />
        </div>

        <div className='form-group'>
        <label>Precio:</label>
        <input type="number" name="precio" value={funko.precio} onChange={handleChange} required />
        </div>

        <div className='form-group'>
        <label>Brilla en la oscuridad</label>
        <input type="checkbox" name="is_backlight" checked={funko.is_backlight} onChange={handleChange} />
        </div>

        <button className='btn-crear' type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearFunko;