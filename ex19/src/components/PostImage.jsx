import React from 'react';

function PostImage({ imatgePost }) {
    return (
        <div className="post-image-container">
            <img src={imatgePost} alt="Post content" className="post-image" />
        </div>
    );
}

export default PostImage;