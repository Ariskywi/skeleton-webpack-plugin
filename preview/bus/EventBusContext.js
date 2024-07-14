// src/EventBusContext.js
import React, { createContext, useContext, useCallback } from 'react';

const EventBusContext = createContext();

const EventBusProvider = ({ children }) => {
  const listeners = new Map();

  const on = useCallback((event, listener) => {
    if (!listeners.has(event)) {
      listeners.set(event, []);
    }
    listeners.get(event).push(listener);
  }, [listeners]);

  const emit = useCallback((event, payload) => {
    if (listeners.has(event)) {
      listeners.get(event).forEach(listener => listener(payload));
    }
  }, [listeners]);

  return (
    <EventBusContext.Provider value={{ on, emit }}>
      {children}
    </EventBusContext.Provider>
  );
};

const useEventBus = () => {
  return useContext(EventBusContext);
};

export { EventBusProvider, useEventBus };
