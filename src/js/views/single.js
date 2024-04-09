import React, { useContext } from "react"; // Importar React y useContext desde 'react'
import { useParams } from "react-router-dom"; // Importar useParams desde 'react-router-dom' para obtener los parámetros de la URL
import { Context } from "../store/appContext"; // Importar el contexto desde '../store/appContext'
import "../../styles/single.css"; // Importar el archivo de estilos CSS para la página Single

// Definir y exportar el componente Single
export const Single = () => {
    const { store, actions } = useContext(Context); // Obtener el estado global (store) y las acciones desde el contexto
    const params = useParams(); // Obtener los parámetros de la URL

    // Obtener el detalle del ítem seleccionado utilizando el índice pasado en los parámetros
    const itemDetail = store.currentDetail.result;

    // Función para agregar el ítem actual a la lista de favoritos
    const handleAddToFavorites = () => {
        if (itemDetail) { // Verificar si itemDetail está definido
            // Agregar el nombre del ítem a la lista de favoritos
            actions.handleAddToFavorites(itemDetail.properties.name); // Llamar a la función handleAddToFavorites de las acciones y pasar el nombre del ítem como argumento
        }
    };

    // Verificar si itemDetail está definido
    if (!itemDetail) {
        return <div>Loading...</div>; // Si itemDetail no está definido, mostrar "Loading..."
    }

    // Renderizar la descripción del ítem
    return (
        <div className="d-flex justify-content-center">
            <div className="cardSingle" style={{ width: "18rem" }}>
                <img src="https://starwars-visualguide.com/assets/img/placeholder.jpg" className="card-img-top" alt="..." />
                <div className="card-bodySingle">
                    <div className="divCard">
                        <h2 className="card-titleSingle">{itemDetail.properties.name || "Nombre no disponible"}</h2>
                        {/* Botón para agregar a favoritos */}
                        <button onClick={handleAddToFavorites} type="button" className="btn btn-warning"><i className="far fa-heart"></i></button>
                    </div>
                    <div className="detailCard">
                        {/* Renderizar cada propiedad del ítem */}
                        {Object.entries(itemDetail.properties).map(([key, value]) => (
                            <p className="card-textSingle" key={key}>
                                <strong>{key}:</strong> {value || "No especificado"}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
