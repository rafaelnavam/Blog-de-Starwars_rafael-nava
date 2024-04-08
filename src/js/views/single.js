import React, { useContext } from "react";
import { useParams } from "react-router-dom"; 
import { Context } from "../store/appContext";

export const Single = () => {
    const { store } = useContext(Context);
    const params = useParams(); // Obtener los parámetros de la URL

    // Obtener el detalle del ítem seleccionado utilizando el índice pasado en los parámetros
    const itemDetail = store.currentDetail.result;

    // Verificar si itemDetail está definido
    if (!itemDetail) {
        return <div>Loading...</div>; 
    }

    console.log(itemDetail.properties.name);
    // Renderizar la descripción del ítem
    return (
        <div className="jumbotron">
        <h1>{itemDetail.properties.name || "Nombre no disponible"}</h1>
        {Object.entries(itemDetail.properties).map(([key, value]) => (
            <p key={key}>
                {key}: {value || "No especificado"}
            </p>
        ))}
    </div>

    );
};
