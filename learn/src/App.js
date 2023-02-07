import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './Components/Register';
import Register from "./Components/Register";
import Login from "./Components/Login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
