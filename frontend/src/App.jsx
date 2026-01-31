import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import PrivateRoute from "./context/PrivateRoute";
import Application from "./pages/Application";

const App = () => {
  return <>
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/application" element={
        <PrivateRoute>
          <Application />
        </PrivateRoute>
      }/>
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
}

export default App