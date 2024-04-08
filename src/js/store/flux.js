import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            films: [],
            people: [],
            planets: [],
            species: [],
            starships: [],
            vehicles: [],
            currentDetail: [],
            selectedCategory: null, // Inicialmente no hay categoría seleccionada
            setSelectedItem: null //


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
                const navigate = useNavigate()
                if (data.results) {
                    return data.results.map((item, index) => ( 
                        <li key={index} className="list-group-item">
                            {item.name || (item.properties && item.properties.title) || "Título no disponible"}
                            <button onClick={() => {
                                console.log("Loading detail for item:", item); // Agregamos un console.log para ver qué elemento se está cargando
                                getActions().loadDetail(item.url, navigate);
                            }}>Detalle</button>
                        </li>
                    ));
                } else if (data.result) {
                    return data.result.map((item, index) => (
                        <li key={index} className="list-group-item">
                            {item.name || (item.properties && item.properties.title) || "Título no disponible"}
                            <button onClick={() => {
                                console.log("Loading detail for item:", item); // Agregamos un console.log para ver qué elemento se está cargando
                                getActions().loadDetail(item.url, navigate);
                            }}>Detalle</button>
                        </li>
                    ));
                } else {
                    return <li className="list-group-item">Cargando...</li>;
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
            



            setSelectedCategory: (category) => {
                const store = getStore();
                setStore({ ...store, selectedCategory: category });
            },


        },
    };
};

export default getState;
