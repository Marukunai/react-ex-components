import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

function HeaderBar() {
    // 1. Ús del mateix custom hook. La lògica és compartida, l'estat és independent.
    const isOnline = useOnlineStatus(); 

    return (
        <header className={`header-bar ${isOnline ? 'header-online' : 'header-offline'}`}>
            <h1>Aplicació Principal</h1>
            <p>El <b>header</b> també monitoritza l'estat!</p>
        </header>
    );
}

export default HeaderBar;