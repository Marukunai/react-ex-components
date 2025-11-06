import React, { useState, useRef, useLayoutEffect } from 'react';

// Necessitem un botó de referència i la lògica del Tooltip
export default function FloatingTooltip({ children, content }) {
    
    // Referència al botó (element target) i al propi tooltip
    const targetRef = useRef(null);
    const tooltipRef = useRef(null);
    
    // Estat per guardar la posició Y ajustada del tooltip
    const [tooltipStyle, setTooltipStyle] = useState({});
    
    // Estat de visibilitat (p. ex., al fer hover)
    const [isVisible, setIsVisible] = useState(false);

    
    // useLayoutEffect per calcular el disseny abans que es pinti
    useLayoutEffect(() => {
        if (!isVisible || !targetRef.current || !tooltipRef.current) {
            return;
        }

        // 1. LECTURA DEL DOM: Obtenir les mides i posicions
        const targetRect = targetRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        
        const windowHeight = window.innerHeight;
        
        // Posició per defecte: Just a sota del botó
        let topPosition = targetRect.bottom + 8; // 8px de marge
        
        // 2. LÒGICA DE CÀLCUL: Comprovar si hi ha prou espai a sota
        const spaceBelow = windowHeight - topPosition;

        if (spaceBelow < tooltipRect.height) {
            // Si NO hi ha prou espai, ajustem la posició a sobre del botó
            topPosition = targetRect.top - tooltipRect.height - 8; 
            
            // Si ni tan sols hi cap a sobre, el deixem a sota per defecte (o podríem centrar-lo)
            if (topPosition < 0) {
                 topPosition = targetRect.bottom + 8; 
            }
        }

        // 3. CANVI D'ESTAT: Actualitzem l'estil per forçar el nou renderitzat amb la posició correcta
        setTooltipStyle({
            top: `${topPosition + window.scrollY}px`, // + scrollY per posició absoluta
            left: `${targetRect.left}px`,
            position: 'absolute',
        });
        
        // NOTA: Tota aquesta lògica (Lectura -> Càlcul -> Canvi d'Estat) 
        // s'executa *abans* del paint, evitant el flicker.

    }, [isVisible]); // Re-executa quan el tooltip canvia de visibilitat

    return (
        <div 
            style={{ display: 'inline-block' }} 
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {/* Element que dispara el Tooltip (el botó o text) */}
            <div ref={targetRef}>
                {children} 
            </div>

            {/* El Tooltip Flotant */}
            {isVisible && (
                <div 
                    ref={tooltipRef} 
                    className="floating-tooltip"
                    // Apliquem l'estil calculat
                    style={{...tooltipStyle, minWidth: targetRef.current?.offsetWidth}} 
                >
                    {content}
                </div>
            )}
        </div>
    );
}