import React from 'react';

// Rebem la nova prop isLiked
function PostActions({ handleLike, toggleCommentForm, isLiked }) {
    
    // Definim el text i les classes basades en l'estat
    const likeButtonText = isLiked ? '♥️ T\'agrada' : '🤍 M\'agrada'; 
    const likeButtonClass = isLiked ? 'btn-like liked' : 'btn-like unliked';

    return (
        <div className="post-actions">
            {/* Utilitzem els valors dinàmics */}
            <button onClick={handleLike} className={`btn-action ${likeButtonClass}`}>
                {likeButtonText}
            </button>
            <button onClick={toggleCommentForm} className="btn-action btn-comment">
                💬 Comentar
            </button>
        </div>
    );
}

export default PostActions;