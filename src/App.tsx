import logo from "./logo.svg";
import "./App.css";
import rootStore from "./stores/root";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>Counter: {rootStore.counter}</p>
        <button onClick={rootStore.incrementCounter}>Increment Counter</button>

        <a
          className="App-link"
          href="https://mobx.js.org/README.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn MobX
        </a>
      </header>
    </div>
  );
}

export default observer(App);
