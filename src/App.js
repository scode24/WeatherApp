import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { Weather } from './components/Weather';

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Route path="/" component={Weather} />
      </BrowserRouter>
    </div>
  );
}

export default App;
