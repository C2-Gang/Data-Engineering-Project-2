import './App.css';
import FormToxic from "./Components/formtoxic";
import ScrollToTop from "react-scroll-to-top";

function App() {
  return (
    <div className="App">
        <FormToxic/>
        <ScrollToTop smooth />
    </div>
  );
}

export default App;
