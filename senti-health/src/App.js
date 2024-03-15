import React from 'react';
import PatientBox from './components/PatientBox/PatientBox';
import PatientConvo from './components/PatientConvo/PatientConvo';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <PatientBox patientId={1} />
            </div>
            <div className="column">
              <PatientBox patientId={2} />
            </div>
            <div className="column">
              <PatientBox patientId={3} />
            </div>
            <div>
              <PatientConvo/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
