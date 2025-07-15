import { useEffect, useState } from 'react';
import { crearFunko, listarCategorias } from '../utils/api';

const CrearFunko = () => {
  const [categorias, setCategorias] = useState([]);
  const [funko, setFunko] = useState({
    nombre: "",
    descripción: "",
    is_backlight: false,
    stock: 0,
    precio: 0,
    categoría: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "categoría") {
      setFunko({
        ...funko,
        [name]: [Number(value)]
      });
    } else {
    setFunko({
      ...funko,
      [name]: type === "checkbox" ? checked : value,
    });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await crearFunko(funko);

    if (result.success) {
      alert("Funko creado exitosamente!");
      setFunko({
        nombre: "",
        descripción: "",
        is_backlight: false,
        stock: 0,
        precio: 0,
        categoría: []
      });
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const result = await listarCategorias();

        if (result.success) {
          setCategorias(result.data.Categorias || []);
        } else {
          console.error("Error al obtener categorías:", result.message);
          setCategorias([]);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
        setCategorias([]);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="crear-container">
      <h2>Crear Funko</h2>
      <form className="crear-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={funko.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripción"
            value={funko.descripción}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={funko.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={funko.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Categoría:</label>
          <select
            name="categoría"
            value={funko.categoría[0] || ""}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombre.charAt(0).toUpperCase() + categoria.nombre.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brilla en la oscuridad</label>
          <input
            type="checkbox"
            name="is_backlight"
            checked={funko.is_backlight}
            onChange={handleChange}
          />
        </div>

        <button className="btn-crear" type="submit">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CrearFunko;