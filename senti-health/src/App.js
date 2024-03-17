import React, { useState } from 'react';
import PatientBox from './components/PatientBox/PatientBox';
import PatientConvo from './components/PatientConvo/PatientConvo';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSelectPatient = (patientId) => {
    if (selectedPatient === patientId) {
      setSelectedPatient(null); // unselect if the same patient is clicked again
    } else {
      setSelectedPatient(patientId);
    }
  };

  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <div className="columns">
            {[1, 2, 3].map((patientId) => (
                <div key={patientId} className="column">
                  <PatientBox
                    patientId={patientId}
                    onSelectPatient={handleSelectPatient}
                    isSelected={selectedPatient === patientId}
                  />
                </div>
              ))}
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
