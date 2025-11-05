import React from 'react';
import { useFetch } from '../hooks/useFetch';

const POST_API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

function PostViewer() {
    // 1. Ús elegant del Custom Hook: tota la lògica d'estat en una línia
    const { data: post, isLoading, error } = useFetch(POST_API_URL);

    // 2. Renderitzat Condicional (molt net)
    if (isLoading) {
        return <div className="status-message loading">Càrrega de publicació... 🔄</div>;
    }

    if (error) {
        return <div className="status-message error">{error} ❌</div>;
    }
    
    // Assegurar que hi ha dades abans de renderitzar
    if (!post) {
        return <div className="status-message no-data">No s'ha trobat la publicació.</div>;
    }

    // 3. Renderitzat de les dades amb èxit
    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <span className="post-id">ID: {post.id} | Usuari ID: {post.userId}</span>
        </div>
    );
}

export default PostViewer;