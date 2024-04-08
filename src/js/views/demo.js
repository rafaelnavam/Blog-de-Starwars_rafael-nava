import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";


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
            <div className="col-12 d-flex justify-content-between align-items-center">
    <h1 className="text-end">{store.selectedCategory}</h1>
    <div>
        <button onClick={loadPreviousPage} className="me-2">Anterior</button>
        <button onClick={loadNextPage}>Siguiente</button>
    </div>
</div>


                    {store[store.selectedCategory] && actions.renderItems(store[store.selectedCategory], store.selectedCategory)}
            </div>
        </div>
    );
};
