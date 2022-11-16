import logo from "./logo.svg";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard";
import ManagerDashboard from "./Components/ManagerDashboard";
import WorkerDashboard from "./Components/WorkerDashboard";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="/manager" element={<ManagerDashboard />}></Route>
          <Route path="/worker" element={<WorkerDashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
