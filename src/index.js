import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import Home from "./pages/Home";

import "./index.css";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider.js";

const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
    );
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <MoralisDappProvider>
          <App isServerInfo />
        </MoralisDappProvider>
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Home />
      </div>
    );
  }
};

ReactDOM.render(
  //<React.StrictMode>
  <Application />,
  //</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
