import React, { useState } from 'react';

function LikeCounter() {
    // 1. Crear l'Estat (Inicialitzat a 0)
    const [likes, setLikes] = useState(0);
    
    // 2. Crear l'Estat per saber si està Actiu/Liked
    const [isLiked, setIsLiked] = useState(false);

    // 3. Funció per gestionar el clic
    const handleLikeClick = () => {
        if (isLiked) {
            // Si ja estava en "M'agrada" (isLiked = true):
            // 🅰️ Restem 1 al comptador
            setLikes(likes - 1);
            // 🅱️ Desactivem l'estat
            setIsLiked(false);
        } else {
            // Si no estava en "M'agrada" (isLiked = false):
            // 🅰️ Sumem 1 al comptador
            setLikes(likes + 1);
            // 🅱️ Activem l'estat
            setIsLiked(true);
        }
    };

    // Estils dinàmics per al botó
    const buttonClass = isLiked ? 'btn-like btn-liked' : 'btn-like btn-not-liked';
    const buttonText = isLiked ? '❤️ M\'agrada (Desactivar)' : '🤍 M\'agrada (Activar)';
    

    return (
        <div className="like-counter-container">
            
            <p className="like-display">
                <span className="like-count highlight">{likes}</span> Likes
            </p>
            
            <button 
                className={buttonClass}
                onClick={handleLikeClick} // Assignem la funció al clic
            >
                {buttonText}
            </button>
            
        </div>
    );
}

export default LikeCounter;