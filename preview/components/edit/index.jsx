import React, { useRef, useEffect } from 'react';
import codeMirror from '../../codeMirror'; // 导入 codeMirror，确保路径和文件名正确
//import bus from '../../bus'; // 导入 bus，确保路径和文件名正确
import { useEventBus } from '../../bus/EventBusContext';
import 'index.css';
import { useSelector, useDispatch } from 'react-redux'; // 假设使用 Redux 来管理状态

const EditPanel = ({ html, currentRoute }) => {
    const editorRef = useRef(null);
    const dispatch = useDispatch(); // 假设使用 Redux 的 useDispatch 获取 dispatch 方法
    const { emit,on } = useEventBus();

    useEffect(() => {
        const { html: initialHtml } = html;
        const container = editorRef.current;

        if (container) {
            const codeMirrorConfig = {
                value: initialHtml,
                lineNumbers: true,
                autofocus: true,
                lineWrapping: true,
                styleActiveLine: true
            };

            const editor = codeMirror(container, codeMirrorConfig);

            editor.on('change', (cm, change) => {
                const updatedHtml = cm.getValue();
                dispatch('SAVE_CODE', { currentRoute, updatedHtml })
                //onSaveCode(currentRoute, updatedHtml);
            });

            on('set-code', setCode);

            return () => {
                editor.off('change');
                //bus.off('set-code', setCode);需要实现一个off方法
            };
        }
    }, [html, currentRoute]);

    const setCode = (routesData) => {
        const { html: updatedHtml } = routesData[currentRoute];
        const editor = editorRef.current;

        if (editor) {
            editor.setValue(updatedHtml);
        }
    };

    return (
        <div className="edit-panel">
            <div ref={editorRef}></div>
        </div>
    );
};

export default EditPanel;
