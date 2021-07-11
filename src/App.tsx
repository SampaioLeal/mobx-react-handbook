import logo from "./logo.svg";
import "./App.css";
import Wrapper from "./Wrapper";
import Counter from "./Counter";

export default function App() {
  return (
    <Wrapper>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Counter />

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
    </Wrapper>
  );
}
