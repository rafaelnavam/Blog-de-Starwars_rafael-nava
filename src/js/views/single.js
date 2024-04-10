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

    const ExtraerImagen = (itemDetail) => {
        // Verificar si itemDetail está definido
        if (!itemDetail || !itemDetail.properties || !itemDetail.properties.url) {
            return ''; // Si itemDetail no está definido o no tiene la estructura esperada, retornar una cadena vacía
        }

        // URL original
        const originalUrl = itemDetail.properties.url;

        // Dividir la URL por '/'
        const partsUrl = originalUrl.split('/');

        // El último elemento contiene el número, y el segundo elemento desde el final contiene la categoría
        const numeroExtraido = partsUrl[partsUrl.length - 1];
        const stringExtraido = partsUrl[partsUrl.length - 2];

        // Construir la nueva URL
        return `https://starwars-visualguide.com/assets/img/${stringExtraido === 'people' ? 'characters' : stringExtraido}/${numeroExtraido}.jpg`;
    };

    // console.log(ExtraerImagen(itemDetail));


    // Verificar si itemDetail está definido
    if (!itemDetail) {
        return <div>Loading...</div>; // Si itemDetail no está definido, mostrar "Loading..."
    }

    // Renderizar la descripción del ítem
    return (
        <div className="d-flex justify-content-center">
            <div className="cardSingle" style={{ width: "18rem" }}>
                {/* // se llama a la funcion para extraer imagen y se pasa como argumento itemDetail */}
                <img src={ExtraerImagen(itemDetail)} className="card-img-top" alt="..." onError={(e) => {
                    // Si hay un error al cargar la imagen, se reemplaza por una imagen de placeholder.
                    e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                }} />
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
