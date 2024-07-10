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
    const { title, text, show, pclick } = props;
    return (
        <div
            className={["sk-console"].join([show ? 'show' : ''])}>
            <div class="button-wrapper" onClick={() => pclick()} >
                {text}
                < a href="javascript:;" > {title}</a >
            </div >
        </div>
    )
}

export default Console;
