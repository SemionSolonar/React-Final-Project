import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./contexts/SocketContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SocketProvider>
      <PersistGate loading="null" persistor={persistor}>
        <App />
      </PersistGate>
    </SocketProvider>
  </Provider>,
);