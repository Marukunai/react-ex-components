import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="layout-container">
            <header className="main-header">
                <h1>Gestor de Projectes 🚀</h1>
                <nav className="main-nav">
                    <Link to="/" className="nav-link">Llista</Link>
                    <Link to="/new" className="nav-link nav-new">➕ Crear Projecte</Link>
                </nav>
            </header>
            
            <main className="content-area">
                {/* Outlet renderitza el component de la ruta actual */}
                <Outlet /> 
            </main>
            
        </div>
    );
}

export default Layout;