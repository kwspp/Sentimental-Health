import React, {useState} from 'react'
import './PatientConvo.css';
import { fetchSentimentScores, updateSentimentScores } from '../../firebase';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const PatientConvo = ({ selectedPatient  }) => {
  const [userInput, setUserInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const toggleRecording = () => {
    if (isRecording) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setUserInput('');
      setIsRecording(true);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const submitSentimentAnalysis = async () => {
    if (selectedPatient == null) {
      window.alert("Must select a patient");
      return null
    }
    const text = userInput || transcript;
    setUserInput('');
    resetTranscript();
    try {
      const response = await fetch('http://localhost:5000/analyze_sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      console.log(`Sentiment score: ${data.sentiment}, Selected Patient ID: ${selectedPatient}`);
      addSentimentScore(selectedPatient, data.sentiment)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addSentimentScore = async (selectedPatient, sentiment) => {
    try {
      let sentimentScores = await fetchSentimentScores(selectedPatient);
      sentimentScores.push(sentiment);      
      await updateSentimentScores(selectedPatient, sentimentScores);
    } catch (e) {
      console.error('Error adding sentiment score: ', e);
    }
  };
  

  return (
    <div className="patient-convo">
        <p className="convo-title">Patient Conversation</p>
        <div className="convo-input">
            <textarea
              placeholder="Type here..."
              value={userInput || transcript}
              onChange={handleUserInput}
            />
        </div>
        <p>Enter details to save in the conversation</p>
        <button
          onClick={toggleRecording}
          className={`convo-button ${isRecording ? 'stop' : 'record'}`}>
          {isRecording ? 'Stop' : 'Record'}
        </button>
        <button type="submit" onClick={submitSentimentAnalysis}>Submit</button>
    </div>
  );
}

export default PatientConvo;
