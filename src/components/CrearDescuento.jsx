import { useState } from "react";
import { crearDescuento } from "../utils/api";
import "../styles/form.css";

const CrearDescuento = () => {
    const [descuento, setDescuento] = useState({
        nombre: "",
        porcentaje: "",
    });
    
    const token = "221a72f73c7aee1c4d00ea16ad712347a53260f1";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDescuento({
            ...descuento,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await crearDescuento(descuento, token);

        if (result.success) {
            alert("Descuento creado exitosamente!");
            setDescuento({
                porcentaje: "",
            });
        } else {
            alert(`Error: ${result.message}`);
        }
    };
    return (
        <div className='crear-container'>
            <h2>Crear Descuento</h2>
            <form className='crear-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={descuento.nombre} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label>Porcentaje:</label>
                    <input type="number" name="porcentaje" value={descuento.porcentaje} onChange={handleChange} required />
                </div>
                <button className="btn-crear" type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearDescuento;