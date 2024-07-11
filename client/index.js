'use strict'

import SockJS from 'sockjs-client'
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Vue from 'vue/dist/vue.esm'
import { log } from './utils'
import Console from './components/console/index.js'

// port 7890
const port = window._pageSkeletonSocketPort // eslint-disable-line no-underscore-dangle

// TODO headless 打开的页面不连接 socket
const sock = new SockJS(`http://localhost:${port}/socket`)

//const vm = createView(sock)
createView(sock)

sock.onopen = function () {
    log('connected')
    sock.send(JSON.stringify({ open: 'test' }))
}
// 用于调试
window.sock = sock

sock.onmessage = function (e) {
    const { type, data } = JSON.parse(e.data)
    console.log('type===>', type)
    console.log('data===>', data)
    switch (type) {
        case 'success': {
            //vm.$data.text = data
            //vm.current.text = data;
            // window.open(data)
            log(data)
            break
        }
        case 'console': {
            log(data)
            break
        }
        case 'error': {
            log(data, 'error')
            break
        }
    }
}

sock.onclose = function () {
    log('close')
    sock.close()
}

function createView(sock) {
    const rootEle = document.createElement('div')
    document.body.appendChild(rootEle)

    // return new Vue({
    //     components: {
    //         Console
    //     },
    //     el: rootEle,
    //     data: {
    //         show: false,
    //         title: 'P',
    //         text: 'Preview skeleton page'
    //     },
    //     template: '<Console :show="show" :title="title" :text="text" @pclick="handleClick"></Console>',
    //     created() {
    //         this.$nextTick(() => {
    //             const self = this
    //             // ! 当访问全局对象toggleBar开启骨架屏页面
    //             Object.defineProperty(window, 'toggleBar', {
    //                 enumerable: false,
    //                 configrable: true,
    //                 get() {
    //                     self.show = !self.show
    //                     log('toggle the preview control bar.')
    //                     return '🐶'
    //                 }
    //             })
    //             // ! 设置快捷键开启骨架屏页面
    //             document.body.addEventListener('keydown', e => {
    //                 const keyCode = e.keyCode || e.which || e.charCode
    //                 const ctrlKey = e.ctrlKey || e.metaKey
    //                 if (ctrlKey && keyCode === 13) {
    //                     this.show = !this.show
    //                 }
    //             })
    //         })
    //     },
    //     methods: {
    //         handleClick() {
    //             this.text = 'IN PROGRESS...'
    //             // ! 点击开关按钮发送socket
    //             sock.send(JSON.stringify({ type: 'generate', data: window.location.origin }))
    //         }
    //     }
    // })
    const TitleView = () => {
        const consoleRef = useRef(null);
        const [show, setShow] = useState(false);
        const [title, setTitle] = useState('P');
        const [text, setText] = useState('Preview skeleton page');
        const handleClick = () => {
            setText('IN PROGRESS...')
            // ! 点击开关按钮发送socket
            sock.send(JSON.stringify({ type: 'generate', data: window.location.origin }))
        }
        // useEffect(() => {

        // }, [show])
        // const self = this
        // ! 当访问全局对象toggleBar开启骨架屏页面
        Object.defineProperty(window, 'toggleBar', {
            enumerable: false,
            configrable: true,
            get() {
                show = !show
                log('toggle the preview control bar.')
                return '🐶'
            }
        })
        // ! 设置快捷键开启骨架屏页面
        document.body.addEventListener('keydown', e => {
            const keyCode = e.keyCode || e.which || e.charCode
            const ctrlKey = e.ctrlKey || e.metaKey
            if (ctrlKey && keyCode === 13) {
                this.show = !this.show
            }
        })

        return (
            <Console ref={consoleRef} show={show} title={title} text={text} pclick={() => {
                handleClick()
            }} ></Console >
        )
    }
    const root = ReactDOM.createRoot(rootEle);
    root.render(< TitleView />, rootEle);
    //return consoleRef;
}



