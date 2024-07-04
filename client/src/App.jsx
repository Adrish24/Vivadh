import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  Home,
  Favs,
  Comments,
  Profile,
  Hidden,
  Auth,
  Search,
  AuthenticatedRoute,
} from "./pages";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/search" element={<Search />} />
            <Route path="/comments/:postId" element={<Comments />} />
            <Route
              path="/user/:username"
              element={
                <AuthenticatedRoute>
                  <Profile />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/favourites"
              element={
                <AuthenticatedRoute>
                  <Favs />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/hidden"
              element={
                <AuthenticatedRoute>
                  <Hidden />
                </AuthenticatedRoute>
              }
            />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
