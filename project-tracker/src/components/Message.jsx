import React from 'react';

function Message({ type, text }) {
    const classMap = {
        loading: 'status-message status-loading',
        error: 'status-message status-error',
        'no-data': 'status-message status-no-data',
    };

    return (
        <div className={classMap[type] || 'status-message'}>
            {text}
        </div>
    );
}

export default Message;