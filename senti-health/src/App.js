import React from 'react';
import PatientsContainer from './components/PatientsContainer';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="section">
        <PatientsContainer />
      </section>
    </div>
  );
}

export default App;
