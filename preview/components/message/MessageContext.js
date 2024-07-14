import React, { createContext, useContext, useState, useCallback } from 'react';

// 创建 Context
const MessageContext = createContext();

// 创建提供者组件
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000); // 消息显示3秒后消失
  }, []);

  return (
    <MessageContext.Provider value={showMessage}>
      {children}
      {message && <div className="message">{message}</div>}
    </MessageContext.Provider>
  );
};

// 创建自定义 Hook 用于使用消息
export const useMessage = () => {
  return useContext(MessageContext);
};
