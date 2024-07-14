import Vue from 'vue'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './app.vue'
import store from './store'
import initSock from './socket'
import { MessageProvider } from './components/message/MessageContext';
import { EventBusProvider } from './bus/EventBusContext';

import './assets/icons.js'
import './index.css'

import {
    Button,
    Dialog,
    Message,
    ButtonGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from 'element-ui'

    ;[
        Button,
        Dialog,
        ButtonGroup,
        Dropdown,
        DropdownMenu,
        DropdownItem
    ].forEach(cpt => {
        Vue.component(cpt.name, cpt)
    })

Vue.prototype.$message = Message

initSock(store)

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})

// ReactDOM.render(
//     <React.StrictMode>
//         <MessageProvider>
//             <App />
//         </MessageProvider>
//     </React.StrictMode>,
//     document.getElementById('root')
// );

// ReactDOM.render(
//     <React.StrictMode>
//       <EventBusProvider>
//         <App />
//       </EventBusProvider>
//     </React.StrictMode>,
//     document.getElementById('root')
//   );