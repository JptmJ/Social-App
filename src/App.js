import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import Home from "./Home";

function App() {
  return (
    <div>
      <Authenticator>
        {({ signOut }) => <Home signOut={signOut} />}
      </Authenticator>
    </div>
  );
}

export default App;
