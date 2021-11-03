import { render } from "react-dom";
import App from "./App";
import React from "react";

class Section extends React.Component {
  render() {
    return (
      <div>
        <App className="App" />
      </div>
    );
  }
}

render(<Section />, document.getElementById("root"));
