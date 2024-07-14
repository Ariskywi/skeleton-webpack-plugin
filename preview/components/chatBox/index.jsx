import React from 'react';
import './index.css'; // 引入样式文件，确保路径和文件名正确

const Chat = ({ list }) => {
    return (
        <div className="chat">
            <ul>
                {list.map((m, i) => (
                    <li key={i}>
                        <div className={`icon ${m.type === 'me' ? 'meicon' : ''}`}>{m.type}</div>
                        <div className={`msg ${m.type === 'me' ? 'me' : ''}`}>{m.msg}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
