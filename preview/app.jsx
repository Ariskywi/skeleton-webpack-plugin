import React, { useState, useEffect } from 'react';
import BarTop from './components/barTop';
import Preview from './components/Preview';
import Edit from './components/edit';
import { useSelector, useDispatch } from 'react-redux'; // 假设使用 Redux 来管理状态
//import bus from './bus'; // 假设 bus 是一个事件总线，可以用 React Context 或其他替代方案
import { useMessage } from './components/MessageContext';
import { useEventBus } from './EventBusContext';

import './app.css'; // 假设你有一些样式文件来定义样式

const App = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dropDownRoutes, setDropDownRoutes] = useState([]);
    const [currentRoute, setCurrentRoute] = useState('');
    const [currentSkeletonScreen, setCurrentSkeletonScreen] = useState({
        url: '',
        skeletonPageUrl: '',
        qrCode: '',
        html: ''
    });

    const routes = useSelector(state => state.routes); // 假设使用 Redux 的 useSelector 获取 routes 状态
    const dispatch = useDispatch(); // 假设使用 Redux 的 useDispatch 获取 dispatch 方法
    const showMessage = useMessage();
    const { emit,on } = useEventBus();

    useEffect(() => {
        on('message', handleMessageReceive);

        return () => {
            // bus.off('message', handleMessageReceive); //需要EventBusContext实现一个off方法
        };
    }, []);

    useEffect(() => {
        if (!currentRoute && Object.keys(routes).length > 0) {
            setCurrentRoute(Object.keys(routes)[0]);
        }
    }, [routes]);

    useEffect(() => {
        if (routes[currentRoute]) {
            setCurrentSkeletonScreen(routes[currentRoute]);
            setDropDownRoutes(Object.keys(routes).map(route => ({ route, url: routes[route].url })));
        }
    }, [currentRoute, routes]);

    const writeShell = () => {
        dispatch({ type: 'WRITE_SHELL' }); // 假设使用 Redux 的 dispatch 来触发 WRITE_SHELL 动作
    };

    const handleMessageReceive = (data) => {
        console.log(data); // 假设使用 console.log 输出消息
        //添加信息的展示形式
        showMessage('Hello, this is a global message!');
    };

    const preview = () => {
        setDialogVisible(true);
    };

    const handleSelectRoute = ({ route }) => {
        setCurrentRoute(route);
        setCurrentSkeletonScreen(routes[route]);
        setTimeout(() => {
            emit('set-code', routes)
            //bus.emit('set-code', routes); // 假设使用 bus.emit 发送事件
            
        });
    };

    return (
        <div className="container">
            <BarTop
                preview={preview}
                genShell={writeShell}
                select={handleSelectRoute}
                dropDownRoutes={dropDownRoutes}
                currentRoute={currentRoute}
            />
            <div className="main">
                <div className="left">
                    <Preview url={currentSkeletonScreen.url} type="origin" />
                </div>
                <div className="middle">
                    <Preview url={currentSkeletonScreen.skeletonPageUrl} type="skeleton" />
                </div>
                <div className="right">
                    {currentSkeletonScreen.html && (
                        <Edit html={currentSkeletonScreen.html} currentRoute={currentRoute} />
                    )}
                </div>
            </div>
            {dialogVisible && (
                <div className="modal">
                    <div className="modal-title">手机预览</div>
                    <p>1. 手机和开发电脑连入同一 WIFI 网络。</p>
                    <p>2. 在系统「安全性与隐私」设置中，关闭防火墙。</p>
                    <p>3. 打开微信「扫一扫」，扫描二维码。</p>
                    <div className="image-wrapper">
                        <img src={currentSkeletonScreen.qrCode} alt="qr code" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
