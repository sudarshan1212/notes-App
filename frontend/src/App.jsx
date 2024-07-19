import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import MyNotes from "./pages/MyNotes";
import MainScreen from "./components/MainScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNotes from "./pages/CreateNotes";
function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/notes" element={<MyNotes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/notes/:id" element={<CreateNotes  />} />
          {/* <Route path="/note/:id" element={<MainScreen />} /> */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
