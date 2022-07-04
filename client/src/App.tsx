import { useAuth0 } from "@auth0/auth0-react";
import NavbarPanel from "./components/Navbar";
import Router from "./Router";
import Loader from "./components/Loader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <NavbarPanel />
      <div className="container">
        <Router />
      </div>
    </div>
  );
};

export default App;
