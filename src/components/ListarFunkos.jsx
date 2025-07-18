import { useEffect, useState } from 'react';
import { listarFunkos, listarCategorias } from '../utils/api';

const ListarFunkos = () => {
  const [funkos, setFunkos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [catSeleccionada, setCatSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listarFunkos();

        if (result.success) {
          setFunkos(result.data.funkos);
        } else {
          setError(result.message || "Error al cargar funkos");
        }

        const catResult = await listarCategorias();

        if (catResult.success) {
          setCategorias(catResult.data.Categorias)
        } else {
          setError(prev => prev || catResult.message || "Error al cargar categorías");
        }
      } catch (error) {
        setError("Error de conexión: " + error.message);
      }
    };

    fetchData();
  }, []);;

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCatSeleccionada(e.target.value);
  };

  const funkosFiltrados = funkos.filter((funko) => {

    const coincideNombre = funko.nombre.toLowerCase().includes(busqueda.toLowerCase());

    const categoriaFunko = funko.categoría[0]?.idCategoria;
    const coincideCategoria = !catSeleccionada || (categoriaFunko && categoriaFunko.toString() === catSeleccionada);

    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="listar">
      <h2>Listar Funkos</h2>
      <div className="filtros-container">
        <input
          type="text"
          placeholder="Buscar Funko..."
          value={busqueda}
          onChange={handleBusqueda}
          className="input-busqueda"
        />

        <div className="filtro-categoria">
          <select
            id="categoria-select"
            value={catSeleccionada}
            onChange={handleCategoriaChange}
            className="select-categoria"
          >
            <option value="">Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {funkos.length === 0 ? (
        <p>No hay funkos disponibles.</p>
      ) : (
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Brillante</th>
              </tr>
            </thead>
            <tbody>
              {funkosFiltrados.map((funko) => (
                <tr key={funko.idFunko}>
                  <td>{funko.nombre}</td>
                  <td>{funko.stock}</td>
                  <td>${funko.precio.toFixed(2)}</td>
                  <td>{funko.categoría[0]?.nombre || "-"}</td>
                  <td>{funko.is_backlight ? "Sí" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListarFunkos;