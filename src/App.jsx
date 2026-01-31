import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { TemperatureUnitToggle } from "./components/TemperatureUnitToggle";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="app-header">
            <h1 className="app-title">Weather App</h1>
            <TemperatureUnitToggle />
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:cityId" element={<Details />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;