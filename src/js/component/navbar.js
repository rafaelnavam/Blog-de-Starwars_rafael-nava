import React, { useContext } from "react"; // Importar React y el hook useContext desde 'react'
import { useParams } from "react-router-dom"; // Importar el hook useParams desde 'react-router-dom'
import { Context } from "../store/appContext"; // Importar el contexto desde '../store/appContext'
import "../../styles/navbar.css"; // Importar el archivo de estilos CSS para Navbar

// Definir y exportar el componente Navbar
export const Navbar = () => {
    // Obtener el estado global (store) y las acciones desde el contexto
    const { store, actions } = useContext(Context);

    // Obtener los ítems favoritos del estado global
    const itemFavorites = store.favorites;

    // Función para eliminar un ítem de la lista de favoritos
    const removeFavorite = (index) => {
        actions.removeFavorite(index); // Llamar a la acción removeFavorite pasando el índice
    };

    // Renderización del componente Navbar
    return (
        <>
            {/* Barra de navegación */}
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    {/* Botón para abrir el menú lateral */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                        {/* Mostrar el número de elementos en la lista de favoritos */}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            N° {actions.numberElement()}
                        </span>
                    </button>
                    {/* Menú lateral */}
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            {/* Botón para cerrar el menú lateral */}
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        {/* Título del menú lateral */}
                        <h2 className="favoritos">Favoritos</h2>
                        <div className="offcanvas-body">
                            {/* Lista de elementos favoritos */}
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {/* Mapear cada ítem favorito y mostrar un botón para eliminarlo */}
                                {itemFavorites.map((contenido, index) => {
                                    return (
                                        <li key={index} className="list-group-item">
                                            {contenido} {/* Mostrar el contenido del ítem favorito */}
                                            {/* Botón para eliminar el ítem de la lista de favoritos */}
                                            <button type="button" className="btn-close" aria-label="Close" onClick={() => removeFavorite(index)}></button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
