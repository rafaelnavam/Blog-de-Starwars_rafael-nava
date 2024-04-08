import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import "../../styles/home.css";

export const Home = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        // Cargar datos cuando el componente se monte
        actions.loadDataStartWars("films");
        actions.loadDataStartWars("people");
        actions.loadDataStartWars("planets");
        actions.loadDataStartWars("species");
        actions.loadDataStartWars("starships");
        actions.loadDataStartWars("vehicles");
    }, []);

    const categories = [
        { name: "people", imageUrl: "https://starwars-visualguide.com/assets/img/categories/character.jpg" },
        { name: "films", imageUrl: "https://starwars-visualguide.com/assets/img/categories/films.jpg" },
        { name: "species", imageUrl: "https://starwars-visualguide.com/assets/img/species/3.jpg" },
        { name: "planets", imageUrl: "https://starwars-visualguide.com/assets/img/planets/7.jpg" },
        { name: "starships", imageUrl: "https://starwars-visualguide.com/assets/img/starships/13.jpg" },
        { name: "vehicles", imageUrl: "https://starwars-visualguide.com/assets/img/vehicles/20.jpg" }
    ];

    return (
        <div className="container">
            <h1 className="titulo1">Star</h1>
            <h6 className="subtitulo">Blog</h6>
            <h1 className="titulo2">Wars</h1>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-md-4" key={category.name} onClick={() => {
                        actions.setSelectedCategory(category.name);
                        navigate("/demo");
                    }}>
                        <div className="card">
                            {category.imageUrl && (
                                <img src={category.imageUrl} className="card-img-top" alt={category.name} />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
