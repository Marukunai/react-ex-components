import React from 'react';

// 1. Embolcallem el component amb React.memo
const MemoizedButton = React.memo(function MemoizedButton({ onClick, count }) {
    
    // NOTA: Aquesta línia només es mostrarà si el component es re-renderitza
    console.log('👶 MemoizedButton: Renderitzat'); 
    
    return (
        <button onClick={onClick} className="memo-button">
            Comptador Simple (No afecta el càlcul): {count}
        </button>
    );
});

export default MemoizedButton;