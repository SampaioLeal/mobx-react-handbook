import { observer } from "mobx-react-lite";
import rootStore from "./stores/root";

function Counter() {
  return (
    <>
      <p>Counter: {rootStore.counter}</p>
      <button onClick={rootStore.incrementCounter}>Increment Counter</button>
    </>
  );
}

export default observer(Counter);
