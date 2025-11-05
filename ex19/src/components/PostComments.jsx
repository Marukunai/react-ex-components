import React from 'react';

function PostComments({ comentaris }) {
    if (comentaris.length === 0) {
        return <p className="no-comments">Encara no hi ha comentaris.</p>;
    }
    
    return (
        <div className="post-comments">
            {comentaris.map((c, index) => (
                <p key={c.id || index} className="comment-item">
                    <span className="comment-user">{c.usuari}</span>: {c.text}
                </p>
            ))}
        </div>
    );
}

export default PostComments;