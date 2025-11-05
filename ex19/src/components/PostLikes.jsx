import React from 'react';

function PostLikes({ likes }) {
    return (
        <p className="post-likes">
            A <b>{likes}</b> persones els <b>agrada</b> això.
        </p>
    );
}

export default PostLikes;