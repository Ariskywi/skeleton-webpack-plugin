import React from 'react';
import './index.css';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </React.StrictMode>
// );
const Console = (props) => {
    const { title, text, show, onPClick } = props;
    console.log("show:" + show)
    return (
        <div
            className={`sk-console ${show ? "show" : ''}`}>
            <div class="button-wrapper" onClick={() => onPClick()} >
                {text}
                < a href="javascript:;" > {title}</a >
            </div >
        </div >
    )
}

export default Console;
