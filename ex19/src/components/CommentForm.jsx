import React from 'react';

function CommentForm({ nouComentari, onCommentChange, onCommentSubmit, onCommentCancel }) {
    return (
        <div className="comment-form-container">
            <textarea
                value={nouComentari}
                onChange={onCommentChange}
                placeholder="Afegeix un comentari..."
                rows="2"
                className="comment-textarea"
            />
            <div className="form-buttons">
                <button 
                    onClick={onCommentSubmit} 
                    className="btn-form-action btn-accept"
                    disabled={!nouComentari.trim()} // Deshabilita si el camp és buit
                >
                    Acceptar
                </button>
                <button 
                    onClick={onCommentCancel} 
                    className="btn-form-action btn-cancel"
                >
                    Cancel·lar
                </button>
            </div>
        </div>
    );
}

export default CommentForm;