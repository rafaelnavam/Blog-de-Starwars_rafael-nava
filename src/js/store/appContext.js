import React, { useState, useEffect } from "react"; // Importar React y los hooks useState y useEffect desde 'react'
import getState from "./flux.js"; // Importar la función getState desde './flux.js'

// No cambiar, aquí es donde inicializamos nuestro contexto, por defecto será null.
export const Context = React.createContext(null); // Crear y exportar el contexto como una constante

// Esta función inyecta el almacenamiento global a cualquier vista/componente donde desee usarlo.
const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        // Esto se pasará como el valor del contexto
        const [state, setState] = useState( // Utilizar el hook useState para inicializar el estado
            getState({ // Obtener el estado inicial del almacenamiento utilizando la función getState
                getStore: () => state.store, // Función para obtener el estado actual del almacenamiento
                getActions: () => state.actions, // Función para obtener las acciones disponibles
                setStore: updatedStore => // Función para actualizar el estado del almacenamiento
                    setState({ // Actualizar el estado con el nuevo estado del almacenamiento
                        store: Object.assign(state.store, updatedStore), // Fusionar el estado actual con el nuevo estado del almacenamiento
                        actions: { ...state.actions } // Mantener las acciones sin cambios
                    })
            })
        );

        useEffect(() => {
            /**
             * EDITAR ESTO!
             * Esta función es equivalente a "window.onload", se ejecuta solo una vez en toda la vida útil de la aplicación.
             * Deberías hacer tus solicitudes ajax o fetch api aquí. No uses setState() para guardar datos en la
             * almacenamiento, en su lugar usa acciones, así:
             *
             * state.actions.loadSomeData(); <---- Llamar a esta función desde las acciones de flux.js
             *
             **/
        }, []); // Utilizar un arreglo vacío como dependencia para que se ejecute solo una vez al montar el componente

        // El valor inicial del contexto ya no es null, sino el estado actual de este componente.
        // El contexto ahora tendrá funciones getStore, getActions y setStore disponibles, porque fueron declaradas
        // en el estado de este componente.
        return (
            <Context.Provider value={state}> {/* Proveer el estado como el valor del contexto */}
                <PassedComponent {...props} /> {/* Renderizar el componente pasado con sus propiedades */}
            </Context.Provider>
        );
    };
    return StoreWrapper; // Retornar el componente StoreWrapper
};

export default injectContext; // Exportar la función injectContext por defecto
