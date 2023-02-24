import "./App.css";
import Honey from "./components/Honey";
import Navbar from "./components/Navbar";
import Presale from "./components/Presale";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Honey />
      <Presale />
    </div>
  );
}

export default App;
