import './App.css';
import FormToxic from "./Components/formtoxic";
import ScrollToTop from "react-scroll-to-top";
import ErrorBoundary from "./Components/ErrorBoundary";
import React from "react";

function App() {

  return (

    <div className="App">
        <ErrorBoundary>
            <FormToxic/>
        </ErrorBoundary>
        <ScrollToTop smooth />
    </div>
  );
}

export default App;



