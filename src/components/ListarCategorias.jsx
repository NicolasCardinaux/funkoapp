import { useEffect, useState } from "react";
import { listarCategorias } from "../utils/api";
import '../styles/list.css';

const ListarCategorias = () => {

    const [categorias, setCategorias] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState(null);
    
    const token = '073b5c9eaa1fbc7a8511ea67ecd44aac1a1ca432';

    useEffect(() => {
        const fetchCategorias = async () => {
            const result = await listarCategorias(token);

            if (result.success) {
                setCategorias(result.data.Categorias);
            } else {
                setError(result.message);
            }
        };

        fetchCategorias();
    }, []);

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const categoriasFiltradas = categorias.filter((categoria) =>
        categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="listar">
            <h2>Listar Categorías</h2>

            <input
                type="text"
                placeholder="Buscar Categoría..."
                value={busqueda}
                onChange={handleBusqueda}
                className="input-busqueda"
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {categorias.length === 0 ? (
                <p>No hay categorías disponibles.</p>
            ) : (
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriasFiltradas.map((categoria) => (
                            <tr key={categoria.idCategoria}>
                                <td>{categoria.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListarCategorias;