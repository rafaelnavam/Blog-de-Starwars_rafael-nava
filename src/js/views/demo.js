import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Cargar datos cuando el componente se monte
        actions.loadDataStartWars("films");
        actions.loadDataStartWars("people");
        actions.loadDataStartWars("planets");
        actions.loadDataStartWars("species");
        actions.loadDataStartWars("starships");
        actions.loadDataStartWars("vehicles");
    }, []);


    useEffect(() => {
        if (store.selectedCategory) {
            actions.loadDataStartWars(store.selectedCategory);
        }
    }, [store.selectedCategory]);

    const loadNextPage = () => {
        // Función para cargar la página siguiente
        const categoryData = store[store.selectedCategory];
        if (categoryData && categoryData.next) {
            actions.loadDataStartWars(store.selectedCategory, null, categoryData.next);
        }
    };
    
    const loadPreviousPage = () => {
        // Función para cargar la página anterior
        const categoryData = store[store.selectedCategory];
        if (categoryData && categoryData.previous) {
            actions.loadDataStartWars(store.selectedCategory, null, categoryData.previous);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <h1>{store.selectedCategory}</h1>
                <button onClick={loadPreviousPage}>Anterior</button>
                <button onClick={loadNextPage}>Siguiente</button>
                <ul className="list-group">
                    {store[store.selectedCategory] && actions.renderItems(store[store.selectedCategory], store.selectedCategory)}
                </ul>
            </div>
        </div>
    );
};
