import * as React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Switch } from "react-router-dom";
import { useAuthCtx } from "./store/AuthContext";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar";

const AddItemPage = React.lazy(() => import("./pages/AddItemPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const ModifyItemPage = React.lazy(() => import("./pages/ModifyItemPage"));
const MyAdsPage = React.lazy(() => import("./pages/MyAdsPage"));
const MyFavoritesPage = React.lazy(() => import("./pages/MyFavoritesPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const SingleAdPage = React.lazy(() => import("./pages/SingleAdPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));

function App() {
  const authCtx = useAuthCtx();
  const loggedIn = authCtx.isLoggedIn;
  return (
    <div className='App'>
      <Navbar />
      <Toaster />
      <React.Suspense fallback={<h1 className='noPage'>Loading...</h1>}>
        <Switch>
          <Route path='/single/:id'>
            <SingleAdPage />
          </Route>
          {loggedIn && (
            <Route path='/modify-item/:id'>
              <ModifyItemPage />
            </Route>
          )}
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
          {loggedIn && (
            <Route path='/favorites'>
              <MyFavoritesPage />
            </Route>
          )}
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='*'>
            <div className='noPage'>
              <h2>Page does not exist</h2>
            </div>
          </Route>
        </Switch>
      </React.Suspense>
      <Footer />
    </div>
  );
}

export default App;
