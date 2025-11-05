import React from 'react';

function PostHeader({ usuari, fotoPerfil }) {
    return (
        <div className="post-header">
            <img src={fotoPerfil} alt={`${usuari}'s profile`} className="profile-pic" />
            <span className="username">{usuari}</span>
        </div>
    );
}

export default PostHeader;