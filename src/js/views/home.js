import React, { useContext, useEffect, useState } from "react"; // Importar React, useContext, useEffect y useState desde 'react'
import { Link } from "react-router-dom"; // Importar Link desde 'react-router-dom' para manejar las rutas
import { Context } from "../store/appContext"; // Importar el contexto desde '../store/appContext'
import { useNavigate } from "react-router"; // Importar useNavigate desde 'react-router' para la navegación programática
import "../../styles/home.css"; // Importar el archivo de estilos CSS para la página Home

// Definir y exportar el componente Home
export const Home = () => {
    // Obtener el estado global (store) y las acciones desde el contexto
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Obtener la función navigate para la navegación programática

    // Efecto para cargar los datos cuando el componente se monte por primera vez
    useEffect(() => {
        // Cargar datos para las categorías principales al montar el componente
        actions.loadDataStartWars("films");
        actions.loadDataStartWars("people");
        actions.loadDataStartWars("planets");
        actions.loadDataStartWars("species");
        actions.loadDataStartWars("starships");
        actions.loadDataStartWars("vehicles");
    }, []); // El efecto se ejecuta solo una vez al montar el componente, ya que la dependencia es un arreglo vacío

    // Definir las categorías con sus nombres e imágenes asociadas
    const categories = [
        { name: "people", imageUrl: "https://starwars-visualguide.com/assets/img/categories/character.jpg" },
        { name: "films", imageUrl: "https://starwars-visualguide.com/assets/img/categories/films.jpg" },
        { name: "species", imageUrl: "https://parade.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1400/MTk1NjEyNDIwNDA2NzgxMzI1/star-wars-trivia-yoda.webp" },
        { name: "planets", imageUrl: "https://starwars-visualguide.com/assets/img/planets/7.jpg" },
        { name: "starships", imageUrl: "https://starwars-visualguide.com/assets/img/starships/13.jpg" },
        { name: "vehicles", imageUrl: "https://starwars-visualguide.com/assets/img/vehicles/20.jpg" }
    ];

    // Renderización del componente Home
    return (
        <div className="container">
            {/* Títulos */}
            <h1 className="titulo1">Star</h1>
            <h6 className="subtitulo">Blog</h6>
            <h1 className="titulo2">Wars</h1>
            {/* Renderizar las categorías */}
            <div className="row">
                {categories.map((category) => (
                    <div className="cardHome" key={category.name} onClick={() => {
                        actions.setSelectedCategory(category.name); // Establecer la categoría seleccionada en el estado global
                        navigate("/demo"); // Navegar a la ruta '/demo' cuando se hace clic en la categoría
                    }}>
                        <div className="card">
                            {/* Mostrar la imagen de la categoría, si está disponible */}
                            {category.imageUrl && (
                                <img src={category.imageUrl} className="card-img-top" alt={category.name} />
                            )}
                            <div className="card-bodyHome">
                                {/* Mostrar el nombre de la categoría */}
                                <h3 className="card-titleHome">{category.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
