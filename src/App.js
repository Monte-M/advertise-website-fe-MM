import { Toaster } from "react-hot-toast";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Toaster />
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
