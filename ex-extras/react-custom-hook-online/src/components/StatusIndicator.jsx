import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

function StatusIndicator() {
    // 1. Ús del custom hook com qualsevol altre hook
    const isOnline = useOnlineStatus(); 

    return (
        <div className={`indicator-box ${isOnline ? 'online' : 'offline'}`}>
            <p>Estat de la Xarxa:</p>
            <span className="status-text">
                {isOnline ? '🟢 Connectat' : '🔴 Desconnectat'}
            </span>
        </div>
    );
}

export default StatusIndicator;