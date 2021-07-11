import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import rootStore from "./stores/root";

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  useEffect(() => {
    console.log("New Counter State:", rootStore.counter);
  }, [rootStore.counter]);

  return <>{children}</>;
}

export default observer(Wrapper);
