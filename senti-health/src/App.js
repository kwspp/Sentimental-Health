import React from 'react';
import PatientBox from './components/PatientBox/PatientBox';
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
            <div className="patient-convo">
              <p className="convo-title">Patient Conversation</p>
              <div className="convo-input">
                  <input type="text" placeholder="Type here..." />
              </div>
              <p>Enter details to save in the conversation</p>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
