import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "../../styles/demo.css";


const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            films: [],
            characters: [],
            planets: [],
            species: [],
            starships: [],
            vehicles: [],
            currentDetail: [],
            selectedCategory: null, // Inicialmente no hay categoría seleccionada
            setSelectedItem: null, //
            favorites: []


        },
        actions: {

            loadDataStartWars: async (category, categoryDetail = null, pageUrl = null) => {
                try {
                    let url = pageUrl || `https://www.swapi.tech/api/${category}/`;
                    let response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`No se pudieron recuperar los datos: ${response.statusText}`);
                    }

                    let data = await response.json();

                    console.log("Data loaded:", data); // Agregamos un console.log para ver los datos cargados

                    if (categoryDetail || pageUrl) {
                        let store = getStore();
                        setStore({ ...store, [`${category}${categoryDetail ? "_details" : ""}`]: data });
                    } else {
                        let store = getStore();
                        setStore({ ...store, [category]: data });
                        console.log("Store after data loaded:", store); // Agregamos un console.log para ver el estado después de cargar los datos
                    }
                } catch (error) {
                    console.error(error.message);
                }
            },


            renderItems: (data, category) => {
                const navigate = useNavigate(); // Mueve la declaración de navigate aquí dentro

                if (data.results) {
                    return data.results.map((item, index) => (
                        <div className="cardDemo" key={index} onClick={() => {
                            console.log("Loading detail for item:", item);
                            getActions().loadDetail(item.url, navigate);
                        }}>
                            <img src={`https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-bodyDemo">
                                <h5 className="card-titleDemo">{item.name || (item.properties && item.properties.title) || "Título no disponible"}</h5>
                            </div>
                        </div>
                    ));
                } else if (data.result) {
                    return data.result.map((item, index) => (
                        <div className="cardDemo" key={index} onClick={() => {
                            console.log("Loading detail for item:", item);
                            getActions().loadDetail(item.url, navigate);
                        }}>
                            <img src={`https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-bodyDemo">
                                <h5 className="card-titleDemo">{item.name || (item.properties && item.properties.title) || "Título no disponible"}</h5>
                            </div>
                        </div>
                    ));
                } else {
                    return <>Cargando...</>;
                }
            },

            loadDetail: async (itemUrl, navigate) => {
                try {
                    let url = itemUrl;
                    let response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`No se pudieron recuperar los datos: ${response.statusText}`);
                    }

                    let data = await response.json();
                    console.log("Detail data loaded:", data); // Agregamos un console.log para ver los datos del detalle cargados
                    let store = getStore();
                    setStore({ ...store, currentDetail: data });
                    navigate("/single");
                    console.log(store);
                } catch (error) {
                    console.error(error.message);
                }
            },

            handleAddToFavorites: (itemDetail) => { // Agregar itemDetail como parámetro
                // Obtener el estado actualizado del almacén
                const store = getStore();
                // Agregar el ítem a la lista de favoritos
                setStore({ ...store, favorites: [...store.favorites, itemDetail] });
                console.log(store.favorites); // Imprimir la lista de favoritos actualizada
            },
            

            setSelectedCategory: (category) => {
                const store = getStore();
                setStore({ ...store, selectedCategory: category });
            },
        },
    };
};

export default getState;
