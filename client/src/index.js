// import React from "react";
// import { AppContainer } from "react-hot-loader";

// import ReactDOM from "react-dom";
// // import { setConfig } from "react-hot-loader";

// import Root from "./config/root";

// // import "./assets/scss/main.scss";

// // setConfig({ integratedResolver: false });

// const target = document.getElementById("root");

// const render = (Component) => {
//   (module.hot ? ReactDOM.render : ReactDOM.hydrate)(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//     target
//   );
// };

// render(Root);

// if (module.hot) {
//   module.hot.accept("./config/root", () => {
//     const newApp = require("./config/root").default;
//     render(newApp);
//   });
// }

import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
