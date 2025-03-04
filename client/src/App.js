import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SpeechRecognitionComponent from './pages/Recognition';
import BrokerLogin from './pages/BrokerLogin';
import BrokerDash from './pages/BrokerDash';
import Summarizer from './pages/Summarizer';
import ClientDash from './pages/ClientDash';

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
        <Route path="/clientdash" element={<ClientDash/>} />
        
      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
      </>
  );
};

export default App;
