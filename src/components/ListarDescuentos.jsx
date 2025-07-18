import { useEffect, useState } from 'react';
import { listarDescuentos } from '../utils/api';

const ListarDescuentos = () => {
    const [descuentos, setDescuentos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDescuentos = async () => {
            const result = await listarDescuentos();

            if (result.success) {
                setDescuentos(result.data.Descuentos);
            } else {
                setError(result.message);
            }
        };

        fetchDescuentos();
    }, []);

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const descuentosFiltrados = descuentos.filter((descuento) =>
        descuento.porcentaje.toString().startsWith(busqueda) ||
        descuento.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
      <div className="listar">
        <h2>Listar Descuentos</h2>

        <div className="filtros-container">
          <input
            type="text"
            placeholder="Buscar Descuento..."
            value={busqueda}
            onChange={handleBusqueda}
            className="input-busqueda"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {descuentos.length === 0 ? (
          <p>No hay descuentos disponibles.</p>
        ) : (
          <div className="tabla-container">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                {descuentosFiltrados.map((descuento) => (
                  <tr key={descuento.idDescuento}>
                    <td>{descuento.nombre || "-"}</td>
                    <td>{descuento.porcentaje}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
};

export default ListarDescuentos;