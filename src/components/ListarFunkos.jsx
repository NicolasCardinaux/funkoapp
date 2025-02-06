import { useEffect, useState } from 'react';
import { listarFunkos } from '../utils/api';
import '../styles/list.css';

const ListarFunkos = () => {
  const [funkos, setFunkos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);

  const token = '073b5c9eaa1fbc7a8511ea67ecd44aac1a1ca432';

  useEffect(() => {
    const fetchFunkos = async () => {
      const result = await listarFunkos(token);

      if (result.success) {
        setFunkos(result.data[0]);
      } else {
        setError(result.message);
      }
    };
    
    fetchFunkos();
  }, []);

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
      )}
    </div>
  );
};

export default ListarFunkos;