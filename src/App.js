import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NotesPage from "./components/NotesPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<NotesPage />} />
        ) : (
          <Route
            path="/"
            element={<LoginForm onLogin={handleLogin} />}
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
