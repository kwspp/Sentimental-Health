import React, { useState } from 'react';
import PatientBox from './components/PatientBox/PatientBox';
import PatientConvo from './components/PatientConvo/PatientConvo';
import SentimentChart from './components/SentimentChart';
import Header from './components/Header/Header';
import SentimentScoreTable from './components/SentimentScoreTable/SentimentScoreTable';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const handleSelectPatient = (patientId) => {
    if (selectedPatient === patientId) {
      setSelectedPatient(null); // unselect if the same patient is clicked again
    } else {
      setSelectedPatient(patientId);
    }
  };

  return (
    <div className="App">
      <Header/>
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
              <PatientConvo selectedPatient={selectedPatient} onNewSentiment={() => setLastUpdate(Date.now())}/>
            </div>
          </div>
          <div>
            <SentimentChart selectedPatient={selectedPatient} lastUpdate={lastUpdate}/>
          </div>
          <div>
            <SentimentScoreTable selectedPatient={selectedPatient} lastUpdate={lastUpdate} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
