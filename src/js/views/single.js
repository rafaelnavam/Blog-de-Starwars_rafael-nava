import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";



export const Single = () => {
    const { store, actions } = useContext(Context);
    const params = useParams(); // Obtener los parámetros de la URL


    // Obtener el detalle del ítem seleccionado utilizando el índice pasado en los parámetros
    const itemDetail = store.currentDetail.result;


    // Dentro de tu componente Single, donde defines handleAddToFavorites:
    const handleAddToFavorites = () => {
        if (itemDetail) {
                // Agregar el ítem a la lista de favoritos
                actions.handleAddToFavorites(itemDetail.properties.name); // Pasar itemDetail y action como argumentos

        }
    };

    // Verificar si itemDetail está definido
    if (!itemDetail) {
        return <div>Loading...</div>;
    }


    // Renderizar la descripción del ítem
    return (
        <div className="d-flex justify-content-center">
            <div className="cardSingle" style={{ width: "18rem" }}>
                <img src="https://starwars-visualguide.com/assets/img/placeholder.jpg" className="card-img-top" alt="..." />
                <div className="card-bodySingle">
                    <h2 className="card-titleSingle">{itemDetail.properties.name || "Nombre no disponible"}</h2>
                    <button type="button" className="btn btn-info" onClick={handleAddToFavorites}>
                        <i class="far fa-heart"></i></button>
                    {Object.entries(itemDetail.properties).map(([key, value]) => (
                        <p className="card-textSingle" key={key}>
                            <strong>{key}:</strong> {value || "No especificado"}
                        </p>
                    ))}
                </div>
            </div>
        </div>

    );
};
