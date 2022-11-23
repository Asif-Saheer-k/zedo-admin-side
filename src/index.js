import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import { ContextProvider } from "./contexts/ContextProvider";
import store from "./redux/Store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
