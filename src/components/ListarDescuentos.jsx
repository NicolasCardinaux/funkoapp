import { useEffect, useState } from 'react';
import { listarDescuentos } from '../utils/api';
import '../styles/list.css';

const ListarDescuentos = () => {
    const [descuentos, setDescuentos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState(null);

    const token = '073b5c9eaa1fbc7a8511ea67ecd44aac1a1ca432';

    useEffect(() => {
        const fetchDescuentos = async () => {
            const result = await listarDescuentos(token);

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
        descuento.porcentaje.toString().startsWith(busqueda)
    );

    return (
        <div className='listar'>
            <h2>Listar Descuentos</h2>

            <input
                type='text'
                placeholder='Buscar Descuento...'
                value={busqueda}
                onChange={handleBusqueda}
                className='input-busqueda'
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {descuentos.length === 0 ? (
                <p>No hay descuentos disponibles.</p>
            ) : (
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Porcentaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {descuentosFiltrados.map((descuento) => (
                            <tr key={descuento.idDescuento}>
                                <td>{descuento.porcentaje}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListarDescuentos;