import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import MainAppShell from "./components/MainAppShell";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Bootcamps from "./pages/Bootcamps";
import Profile from "./pages/Profile";
import CreateBootcamp from "./pages/CreateBootcamp";
import BootcampProfile from "./pages/BootcampProfile";

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <MainAppShell>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bootcamps" element={<Bootcamps />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/createbootcamp" element={<CreateBootcamp />} />
                <Route
                  path="/bootcamp-profile/:id"
                  element={<BootcampProfile />}
                />
              </Routes>
            </MainAppShell>
          }
        />
      </Routes>
    </MantineProvider>
  );
}

export default App;
