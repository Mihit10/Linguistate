import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SpeechRecognitionComponent from "./pages/Recognition";
import BrokerLogin from "./pages/BrokerLogin";
import BrokerDash from "./pages/BrokerDash";
import Chat from "./pages/Chat";
import Summarizer from "./pages/Summarizer";
import ClientDash from "./pages/ClientDash";
import ClientHome from "./pages/ClientHome";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesWeb />
      </BrowserRouter>
    </>
  );
}

const RoutesWeb = () => {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* {loading && <Loader />} */}
      <Routes>
        <Route path="/" element={<SpeechRecognitionComponent />} />
        <Route path="/blogin" element={<BrokerLogin />} />
        <Route path="/bdash" element={<BrokerDash />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/clientdash" element={<ClientDash />} />
        <Route path="/clienthome" element={<ClientHome />} />
        <Route path="/landing" element={<Landing />} />

        <Route path="/chat" element={<Chat />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
    </>
  );
};

export default App;
