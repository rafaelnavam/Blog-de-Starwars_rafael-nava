// Importar React desde 'react'
import React from "react";

// Importar BrowserRouter, Route y Routes desde 'react-router-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importar el componente ScrollToTop desde './component/scrollToTop'
import ScrollToTop from "./component/scrollToTop";

// Importar los componentes de las vistas
import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";

// Importar el contexto inyectado
import injectContext from "./store/appContext";

// Importar el componente Navbar y Footer
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

// Importar el componente Breadcrumbs para las migas de pan
import Breadcrumbs from './component/Breadcrumbs';

// Definir las migas de pan para cada ruta
const breadcrumbsItems = {
    '/': [{ label: 'Home', link: '/' }], // Migas de pan para la ruta raíz
    '/demo': [{ label: 'Categoría', link: '/demo' }], // Migas de pan para la ruta /demo
    '/single': [{ label: 'Detalle', link: '/single' }] // Migas de pan para la ruta /single
    // Se pueden agregar más migas de pan según sea necesario
};

// Definir el componente Layout
const Layout = () => {
    // El basename se utiliza cuando el proyecto está publicado en un subdirectorio
    // Puedes establecer el basename en el archivo .env de tu proyecto
    // Por ejemplo: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            {/* Configuración de las rutas con BrowserRouter */}
            <BrowserRouter basename={basename}>
                {/* ScrollToTop se asegura de que la página se desplaza al principio en cada cambio de ruta */}
                <ScrollToTop>
                    {/* Navbar para la navegación */}
                    <Navbar />
                    {/* Breadcrumbs para mostrar las migas de pan */}
                    <Breadcrumbs items={breadcrumbsItems} />
                    {/* Configuración de las rutas anidadas con Routes */}
                    <Routes>
                        {/* Ruta para la página de inicio */}
                        <Route path="/" element={<Home />} />
                        {/* Ruta para la página de demostración */}
                        <Route path="/demo" element={<Demo />} />
                        {/* Ruta para la página de detalle */}
                        <Route path="/single" element={<Single />} />
                        {/* Ruta para mostrar un mensaje cuando la ruta no coincide */}
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* Footer para el pie de página */}
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

// Exportar el componente Layout después de inyectar el contexto
export default injectContext(Layout);
