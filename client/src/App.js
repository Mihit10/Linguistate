import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SpeechRecognitionComponent from './pages/Recognition';


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
        
      </Routes>
      {/* {!isAdminRoute && <Footer />}       Conditionally render Footer */}
      </>
  );
};

export default App;
