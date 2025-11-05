import React, { useState } from 'react';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostLikes from './PostLikes';
import PostComments from './PostComments';
import CommentForm from './CommentForm';
import { CURRENT_USER } from '../data/postData';

let nextCommentId = 3; // Per generar IDs únics per als nous comentaris
const INITIAL_LIKE_STATUS = false; // Assumim que l'usuari no ha donat like inicialment

function Post({ postData }) {
    // Estats centrals
    const [likes, setLikes] = useState(postData.likes_inicials);
    const [comentaris, setComentaris] = useState(postData.comentaris_inicials);
    
    // NOU ESTAT: Controla si l'usuari actual ha donat 'm'agrada'
    const [isLiked, setIsLiked] = useState(INITIAL_LIKE_STATUS);
    
    // Estats per al formulari
    const [isCommenting, setIsCommenting] = useState(false);
    const [nouComentari, setNouComentari] = useState('');

    // --- Funcions de Lògica ---

    const toggleCommentForm = () => {
        setIsCommenting(!isCommenting);
        setNouComentari(''); // Neteja l'input si el tanquem
    };
    
    // FUNCIÓ DE LIKE MODIFICADA PER FER EL TOGGLE
    const handleLike = () => {
        if (isLiked) {
            // Si ja ens agrada: decrementem i desactivem 'isLiked'
            setLikes(prevLikes => prevLikes - 1); 
            setIsLiked(false);
        } else {
            // Si no ens agrada: incrementem i activem 'isLiked'
            setLikes(prevLikes => prevLikes + 1); 
            setIsLiked(true);
        }
    };

    const handleCommentChange = (e) => {
        setNouComentari(e.target.value);
    };

    const addComment = () => {
        if (!nouComentari.trim()) return; // Evita comentaris buits

        const newComment = {
            id: nextCommentId++,
            usuari: CURRENT_USER,
            text: nouComentari.trim(),
        };

        // Actualització d'Array d'Estat:
        // Utilitzem el setter de funció per garantir que utilitzem l'estat més recent
        setComentaris(prevComentaris => [...prevComentaris, newComment]); 
        
        // Reset de l'estat del formulari
        setNouComentari('');
        setIsCommenting(false);
    };

    const cancelComment = () => {
        setNouComentari('');
        setIsCommenting(false);
    };

    return (
        <div className="post-container">
            <PostHeader usuari={postData.usuari} fotoPerfil={postData.foto_perfil} />
            
            <PostImage imatgePost={postData.imatge_post} />
            
            {/* PASSANT isLiked COM A PROP a PostActions */}
            <PostActions 
                handleLike={handleLike} 
                toggleCommentForm={toggleCommentForm} 
                isLiked={isLiked} 
            />
            
            <PostLikes likes={likes} />
            
            <PostComments comentaris={comentaris} />
            
            {/* Renderitzat condicional del formulari */}
            {isCommenting && (
                <CommentForm
                    nouComentari={nouComentari}
                    onCommentChange={handleCommentChange}
                    onCommentSubmit={addComment}
                    onCommentCancel={cancelComment}
                />
            )}
        </div>
    );
}

export default Post;