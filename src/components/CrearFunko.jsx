import { useEffect, useState, useRef } from 'react';
import { crearFunko, listarCategorias, subirImagen } from '../utils/api';

const CrearFunko = () => {
  const [categorias, setCategorias] = useState([]);
  const [funko, setFunko] = useState({
    nombre: "",
    descripción: "",
    is_backlight: false,
    stock: 0,
    precio: 0,
    imagen: null,
    categoría: []
  });

  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImagenChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setImagenArchivo(archivo);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
    setFunko(prev => ({
      ...prev,
      imagen: null
    }));

  };

  const limpiarImagen = () => {
    setImagenArchivo(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "imagen") {
      return;
    }

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

    let idImagen = null;

    if (imagenArchivo) {
      const resultado = await subirImagen(imagenArchivo);

      if (resultado.success) {
        idImagen = resultado.data.idImagen;
      } else {
        alert(`Error al subir imagen: ${resultado.message}`);
        return;
      }
    }

    const datosParaEnviar = {
      ...funko,
      imagen: idImagen ? idImagen : null,
    };

    const resultadoFunko = await crearFunko(datosParaEnviar);

    if (resultadoFunko.success) {
      alert("Funko creado exitosamente!");

      setFunko({
        nombre: "",
        descripción: "",
        is_backlight: false,
        stock: 0,
        precio: 0,
        imagen: null,
        categoría: [],
      });
      setImagenArchivo(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      alert(`Error: ${resultadoFunko.message}`);
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
                {categoria.nombre.charAt(0).toUpperCase() +
                  categoria.nombre.slice(1)}
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

        <div className="form-group">
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            ref={fileInputRef}
          />

          {previewUrl && (
            <div className="imagen-preview">
              <img
                src={previewUrl}
                alt="Previsualización"
                style={{ maxWidth: "200px" }}
              />
              <button
                type="button"
                onClick={limpiarImagen}
                className="btn-eliminar-imagen"
              >
                x
              </button>
            </div>
          )}
        </div>

        <button className="btn-crear" type="submit">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CrearFunko;