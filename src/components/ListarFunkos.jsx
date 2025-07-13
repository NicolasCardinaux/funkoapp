import { useEffect, useState } from 'react';
import { listarFunkos } from '../utils/api';
import '../styles/list.css';

const ListarFunkos = () => {
  const [funkos, setFunkos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFunkos = async () => {
      try {
        const result = await listarFunkos();

        if (result.success) {
          setFunkos(result.data.funkos);
        } else {
          setError(result.message || "Error al cargar funkos");
        }
      } catch (error) {
        setError("Error de conexión: " + error.message);
      }
    };

    fetchFunkos();
  }, []);;

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const funkosFiltrados = funkos.filter((funko) =>
    funko.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="listar">
      <h2>Listar Funkos</h2>

      <input
        type="text"
        placeholder="Buscar Funko..."
        value={busqueda}
        onChange={handleBusqueda}
        className="input-busqueda"
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {funkos.length === 0 ? (
        <p>No hay funkos disponibles.</p>
      ) : (
        <div className='tabla-container'>
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Brillante</th>
              </tr>
            </thead>
            <tbody>
              {funkosFiltrados.map((funko) => (
                <tr key={funko.idFunko}>
                  <td>{funko.nombre}</td>
                  <td>${funko.precio.toFixed(2)}</td>
                  <td>{funko.stock}</td>
                  <td>{funko.is_backlight ? 'Sí' : 'No'}</td>
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