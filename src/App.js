import { Toaster } from "react-hot-toast";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar";
import AddItemPage from "./pages/AddItemPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyAdsPage from "./pages/MyAdsPage";
import RegisterPage from "./pages/RegisterPage";
import SingleAdPage from "./pages/SingleAdPage";
import { useAuthCtx } from "./store/AuthContext";

function App() {
  const authCtx = useAuthCtx();
  const loggedIn = authCtx.isLoggedIn;
  return (
    <div className='App'>
      <Navbar />
      <Toaster />
      <Switch>
        <Route path='/single/:id'>
          <SingleAdPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        {loggedIn && (
          <Route path='/addItem'>
            <AddItemPage />
          </Route>
        )}
        {loggedIn && (
          <Route path='/myAds'>
            <MyAdsPage />
          </Route>
        )}
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
