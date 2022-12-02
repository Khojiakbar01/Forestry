import "./App.css";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { routes } from "./utils/constants";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        {routes.map((route) => {
          const { path, component } = route;
          return (
            <Route key={path} path={path} element={component}/>
          );
        })}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
