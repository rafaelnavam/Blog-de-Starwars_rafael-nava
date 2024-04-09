import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";


export const Demo = () => {
    // Obtenemos el estado global (store) y las acciones desde el contexto
    const { store, actions } = useContext(Context);

    // Efecto para cargar los datos cuando el componente se monte por primera vez
    useEffect(() => {
        // Cargar datos para las categorías principales al montar el componente
        actions.loadDataStartWars("films");
        actions.loadDataStartWars("people");
        actions.loadDataStartWars("planets");
        actions.loadDataStartWars("species");
        actions.loadDataStartWars("starships");
        actions.loadDataStartWars("vehicles");
    }, []);

    // Efecto para cargar datos cuando la categoría seleccionada cambia
    useEffect(() => {
        if (store.selectedCategory) {
            // Cargar datos para la categoría seleccionada
            actions.loadDataStartWars(store.selectedCategory);
        }
    }, [store.selectedCategory]);

    // Función para cargar la página siguiente de la categoría seleccionada
    const loadNextPage = () => {
        // Obtener datos de la categoría seleccionada del estado global
        const categoryData = store[store.selectedCategory];
        // Verificar si hay una página siguiente disponible
        if (categoryData && categoryData.next) {
            // Cargar la página siguiente de la categoría seleccionada
            actions.loadDataStartWars(store.selectedCategory, null, categoryData.next);
        }
    };

    // Función para cargar la página anterior de la categoría seleccionada
    const loadPreviousPage = () => {
        // Obtener datos de la categoría seleccionada del estado global
        const categoryData = store[store.selectedCategory];
        // Verificar si hay una página anterior disponible
        if (categoryData && categoryData.previous) {
            // Cargar la página anterior de la categoría seleccionada
            actions.loadDataStartWars(store.selectedCategory, null, categoryData.previous);
        }
    };

    // Renderización del componente
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    {/* Título de la categoría seleccionada */}
                    <h1 className="text-end">{store.selectedCategory}</h1>
                    {/* Botones para cargar la página anterior y siguiente */}
                    <div className="buttonsPag">
                        <button onClick={loadPreviousPage} type="button" className="btn btn-light">Anterior</button>
                        <button onClick={loadNextPage} type="button" className="btn btn-light">Siguiente</button>
                    </div>
                </div>
                {/* Renderizamos los elementos de la categoría seleccionada */}
                {store[store.selectedCategory] && actions.renderItems(store[store.selectedCategory], store.selectedCategory)}
            </div>
        </div>
    );
};

