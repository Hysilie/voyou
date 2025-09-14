import "./App.css";

import HomeScreen from "./screens/Homescreen/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
