import React, {useState} from 'react'
import './PatientConvo.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const PatientConvo = () => {
  const [userInput, setUserInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const {
    transcript,
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
      setUserInput(''); // Clear input on start
      setIsRecording(true);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const submitSentimentAnalysis = async () => {
    const text = userInput || transcript;
    try {
      const response = await fetch('http://localhost:5000/analyze_sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      console.log(data.sentiment);
    } catch (error) {
      console.error('Error:', error);
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
