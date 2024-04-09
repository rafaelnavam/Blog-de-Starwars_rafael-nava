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
            setSelectedItem: null, 
            favorites: []


        },
        actions: {

            loadDataStartWars: async (category, categoryDetail = null, pageUrl = null) => {
                try {
                    // Construimos la URL para la solicitud según la categoría proporcionada, si no se proporciona una URL específica
                    let url = pageUrl || `https://www.swapi.tech/api/${category}/`;
                    
                    // Realizamos una solicitud a la URL construida usando fetch
                    let response = await fetch(url);
            
                    // Verificamos si la respuesta de la solicitud es exitosa (status code 200-299)
                    if (!response.ok) {
                        // Si la respuesta no es exitosa, lanzamos un error con un mensaje apropiado
                        throw new Error(`No se pudieron recuperar los datos: ${response.statusText}`);
                    }
            
                    // Convertimos la respuesta a formato JSON para extraer los datos
                    let data = await response.json();
            
                    // Si categoryDetail o pageUrl están definidos, actualizamos el estado de la tienda
                    if (categoryDetail || pageUrl) {
                        // Obtenemos el estado actual de la tienda
                        let store = getStore();
                        // Actualizamos el estado de la tienda con los datos cargados
                        setStore({ ...store, [`${category}${categoryDetail ? "_details" : ""}`]: data });
                    } else {
                        // Si categoryDetail y pageUrl no están definidos, actualizamos el estado de la tienda directamente con los datos cargados
                        let store = getStore();
                        setStore({ ...store, [category]: data });
                        // Imprimimos el estado de la tienda después de cargar los datos (solo para depuración)
                        // console.log("Store after data loaded:", store);
                    }
                } catch (error) {
                    // Si ocurre algún error durante el proceso, lo capturamos y lo mostramos en la consola
                    console.error(error.message);
                }
            },
            

            renderItems: (data, category) => {
                // Declaramos la función navigate que será utilizada para la navegación
                const navigate = useNavigate();
            
                // Estado para controlar la visibilidad del párrafo
                const [isVisible, setIsVisible] = useState(false);
                
                // Función que maneja el clic en la tarjeta para cambiar la visibilidad
                const handleClick = () => {
                    setIsVisible(!isVisible);
                };
            
                // Comprobamos si el objeto de datos tiene la propiedad "results" (para personajes, planetas, etc.)
                if (data.results) {
                    // Mapeamos los resultados y creamos las tarjetas correspondientes
                    return data.results.map((item, index) => (
                        <div className="cardDemo" key={index} onClick={() => {
                            // Cargamos el detalle del ítem cuando se hace clic en la tarjeta
                            getActions().loadDetail(item.url, navigate);
                        }}>
                            <img
                                src={`https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`}
                                className="card-img-top"
                                alt={`Image for ${item.name}`}
                                onError={(e) => {
                                    // Si hay un error de carga, cambiamos la fuente de la imagen por la imagen de placeholder
                                    e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                                }}
                            />
            
                            <div className="card-bodyDemo">
                                <h5 className="card-titleDemo">{item.name || (item.properties && item.properties.title) || "Título no disponible"}</h5>
                            </div>
                        </div>
                    ));
                } 
                // Comprobamos si el objeto de datos tiene la propiedad "result" (para películas)
                else if (data.result) {
                    // Mapeamos los resultados y creamos las tarjetas correspondientes
                    return data.result.map((item, index) => (
                        <div className="cardDemoFilms" key={index} onClick={handleClick}>
                            {/*  onClick={() => {
                            // console.log("Loading detail for item:", item);
                             getActions().loadDetail(item.url, navigate);
                         }}> */}
                            <img
                                src={`https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`}
                                className="card-img-top"
                                alt={`Image for ${item.name}`}
                                onError={(e) => {
                                    // Si hay un error de carga, cambiamos la fuente de la imagen por la imagen de placeholder
                                    e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                                }}
                            />
                            <div className="card-bodyDemoFilms">
                                <h5 className="card-titleDemoFilms">{item.name || (item.properties && item.properties.title) || "Título no disponible"}</h5>
                                {/* Mostramos el párrafo si isVisible es true */}
                                {isVisible && <p className="card-textDemoFilms">{item.name || (item.properties && item.properties.opening_crawl)}</p>}
                            </div>
                        </div>
                    ));
                } 
                // Si no hay resultados disponibles, mostramos un mensaje de carga
                else {
                    return <>Cargando...</>;
                }
            },
            

            loadDetail: async (itemUrl, navigate) => {
                try {
                    // Realizamos una solicitud a la URL del detalle del ítem
                    let response = await fetch(itemUrl);
            
                    // Verificamos si la respuesta de la solicitud es exitosa (status code 200-299)
                    if (!response.ok) {
                        // Si la respuesta no es exitosa, lanzamos un error con un mensaje adecuado
                        throw new Error(`No se pudieron recuperar los datos: ${response.statusText}`);
                    }
            
                    // Convertimos la respuesta a formato JSON para extraer los datos del detalle del ítem
                    let data = await response.json();
            
                    // Actualizamos el estado del almacén con los datos del detalle del ítem
                    let store = getStore();
                    setStore({ ...store, currentDetail: data });
            
                    // Navegamos a la página de detalle del ítem
                    navigate("/single");
            
                    // Imprimimos el estado del almacén actualizado (solo para depuración)
                    // console.log(store);
                } catch (error) {
                    // Si ocurre algún error durante el proceso, lo ignoramos
                    // console.error(error.message);
                }
            },
            
            handleAddToFavorites: (itemDetail) => {
                // Obtener el estado actualizado del almacén
                const store = getStore();
            
                // Agregar el detalle del ítem a la lista de favoritos
                setStore({ ...store, favorites: [...store.favorites, itemDetail] });
            
                // Imprimir la lista de favoritos actualizada (solo para depuración)
                // console.log(store.favorites);
            },
            
            removeFavorite: (index) => {
                // Obtener el estado actualizado del almacén
                const store = getStore();
            
                // Filtrar la lista de favoritos para eliminar el ítem en el índice proporcionado
                const newFavorites = store.favorites.filter((elemento, indice) => {
                    // Retornamos true para mantener los elementos que no coinciden con el índice proporcionado
                    return indice !== index;
                });
            
                // Actualizar el estado del almacén con la nueva lista de favoritos
                setStore({ ...store, favorites: newFavorites });
            },
            
            numberElement: () => {
                // Obtener el estado actual del almacén
                const store = getStore();
            
                // Devolver la longitud de la lista de favoritos
                return store.favorites.length;
            },
            
            setSelectedCategory: (category) => {
                // Obtener el estado actual del almacén
                const store = getStore();
            
                // Actualizar el estado del almacén con la categoría seleccionada
                setStore({ ...store, selectedCategory: category });
            },
            
        },
    };
};

export default getState;
