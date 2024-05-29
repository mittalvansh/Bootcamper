import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
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
import NotFound from "./pages/NotFound";

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainAppShell>
            }
          />
        </Routes>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
