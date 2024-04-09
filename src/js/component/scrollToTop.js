import React from "react";
import PropTypes from "prop-types";

class ScrollToTop extends React.Component {
    // Método que se ejecuta cuando el componente se actualiza
    componentDidUpdate(prevProps) {
        // Verificar si la ubicación actual ha cambiado desde la ubicación anterior
        if (this.props.location !== prevProps.location) {
            // Desplazar la ventana hacia arriba (scroll to top)
            window.scrollTo(0, 0);
        }
    }

    // Renderizar el componente
    render() {
        // Devolver los hijos del componente (no se modifica la estructura del DOM)
        return this.props.children;
    }
}

// Definir propiedades esperadas para el componente
ScrollToTop.propTypes = {
    location: PropTypes.object, // Objeto que representa la ubicación actual
    children: PropTypes.any // Componentes hijos que se renderizarán dentro de ScrollToTop
};

// Exportar el componente ScrollToTop
export default ScrollToTop;
