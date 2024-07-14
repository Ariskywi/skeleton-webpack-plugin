'use strict'

import SockJS from 'sockjs-client'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import Vue from 'vue/dist/vue.esm'
import { log } from './utils'
import Console from './components/console/index.js'

// port 7890
const port = window._pageSkeletonSocketPort // eslint-disable-line no-underscore-dangle

// TODO headless 打开的页面不连接 socket
const sock = new SockJS(`http://localhost:${port}/socket`)
// 用于调试
window.sock = sock

function App() {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Preview skeleton page');

    useEffect(() => {
        const handleKeyPress = (e) => {
            const keyCode = e.keyCode || e.which || e.charCode;
            const ctrlKey = e.ctrlKey || e.metaKey;
            if (ctrlKey && keyCode === 13) {
                setShow(!show);
            }
        };

        sock.onopen = () => {
            log('connected');
            sock.send(JSON.stringify({ open: 'test' }));
        };

        sock.onmessage = (e) => {
            const { type, data } = JSON.parse(e.data);
            console.log('type===>', type);
            console.log('data===>', data);
            switch (type) {
                case 'success':
                    setText(data);
                    log(data);
                    break;
                case 'console':
                    log(data);
                    break;
                case 'error':
                    log(data, 'error');
                    break;
                default:
                    break;
            }
        };

        sock.onclose = () => {
            log('close');
            sock.close();
        };

        // Cleanup on component unmount
        return () => {
            document.body.removeEventListener('keydown', handleKeyPress);
        };
    }, [show]);

    useEffect(() => {
        const toggleBar = () => {
            setShow((prevShow) => !prevShow);
            log('toggle the preview control bar.');
            return '🐶';
        };
        // ! 当访问全局对象toggleBar开启骨架屏页面
        Object.defineProperty(window, 'toggleBar', {
            enumerable: false,
            configurable: true,
            get: toggleBar,
        });
        // ! 设置快捷键开启骨架屏页面
        document.body.addEventListener('keydown', (e) => {
            const keyCode = e.keyCode || e.which || e.charCode;
            const ctrlKey = e.ctrlKey || e.metaKey;
            if (ctrlKey && keyCode === 13) {
                setShow((prevShow) => !prevShow);
            }
        });
    }, []);

    const handleClick = () => {
        setText('IN PROGRESS...');
        sock.send(JSON.stringify({ type: 'generate', data: window.location.origin }));
    };

    return (
        <Console show={show} title="P" text={text} onPClick={handleClick} />
    );
}
const rootEle = document.createElement('div')
document.body.appendChild(rootEle)

ReactDOM.render(<App />, rootEle);

export default App;


