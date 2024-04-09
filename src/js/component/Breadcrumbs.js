import React from 'react'; // Importa React para usar componentes de React
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation de react-router-dom para manejar la navegación
import "../../styles/breadcrumbs.css";


// Define el componente Breadcrumbs que recibe un objeto items como parámetro
const Breadcrumbs = ({ items }) => {
    const location = useLocation(); // Usa el hook useLocation para obtener la ubicación actual

    // Define una función para generar las migas de pan dinámicamente
    const generateBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(path => path !== ''); // Divide la ruta en segmentos y elimina los segmentos vacíos
        const breadcrumbs = []; // Inicializa un array para almacenar las migas de pan

        // Agrega un enlace a la página de inicio al array de migas de pan
        breadcrumbs.push(<li key="/" className="breadcrumb-item"><Link to="/">{items['/'][0].label}</Link></li>);

        let currentPath = ''; // Inicializa la variable para almacenar el camino actual

        // Genera las migas de pan para cada segmento de la ruta
        for (let i = 0; i < paths.length; i++) {
            currentPath += `/${paths[i]}`; // Construye el camino actual
            const isLast = i === paths.length - 1; // Verifica si es el último segmento de la ruta

            // Obtiene la etiqueta de la miga de pan para el camino actual
            const breadcrumbLabel = items[currentPath] ? items[currentPath][0].label : paths[i];

            // Agrega un elemento de miga de pan al array de migas de pan
            breadcrumbs.push(
                <li key={currentPath} className="breadcrumb-item">
                    {/* Muestra un enlace si no es la última ruta, de lo contrario muestra solo el texto */}
                    {!isLast ? <Link to={currentPath}>{breadcrumbLabel}</Link> : <span>{breadcrumbLabel}</span>}
                </li>
            );
        }

        return breadcrumbs; // Devuelve el array de migas de pan generado
    };

    // Devuelve el JSX con la estructura de las migas de pan
    return (
        <nav aria-label="nav">
            <ol className="breadcrumb">
                {generateBreadcrumbs()} {/* Renderiza las migas de pan generadas */}
            </ol>
        </nav>
    );
};

export default Breadcrumbs; // Exporta el componente Breadcrumbs para que pueda ser utilizado en otros archivos
