import React, {useState} from 'react'
import './PatientConvo.css';
import { fetchSentimentScores, updateSentimentScores } from '../../firebase';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const PatientConvo = ({ selectedPatient  }) => {
  //  state management for user input or voice recording
  const [userInput, setUserInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  // const for speech recognition
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // handles updating the user input for the conversation
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // toggles recording on/off, displays correct button based off state
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

  // handles sentiment analysis when conversation is submitted
  const submitSentimentAnalysis = async () => {
    if (selectedPatient == null) {
      window.alert("Must select a patient");
      return null
    }
    // on submit, clear the field after saving the text into var
    const text = userInput || transcript;
    setUserInput('');
    resetTranscript();
    // pass text into spaCytextblob python flask API
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
      // save sentiment score to patient
      addSentimentScore(selectedPatient, data.sentiment)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addSentimentScore = async (selectedPatient, sentiment) => {
    try {
      // fetch current sentiment scores from patient then add new value and update in backend
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
