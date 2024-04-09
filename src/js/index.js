// Importar React desde 'react'
import React from 'react'

// Importar createRoot desde 'react-dom/client'
import {createRoot} from 'react-dom/client'

// Incluir el archivo index.scss en el bundle (presumiblemente para estilos globales)
import "../styles/index.css";

// Importar el componente Layout desde './layout.js'
import Layout from './layout.js'

// Se crea un nodo raíz para la aplicación React utilizando createRoot
const root = createRoot(document.querySelector("#app"))

// Renderizar la aplicación React en el nodo raíz
root.render(<Layout/>)
