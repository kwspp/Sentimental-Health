import React, { useState, useEffect } from 'react';
import { fetchSentimentScores } from '../../firebase';
import './SentimentScoreTable.css';

const SentimentScoreTable = ({ selectedPatient, lastUpdate }) => {
  const [sentimentScores, setSentimentScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      if (selectedPatient) {
        const scores = await fetchSentimentScores(selectedPatient);
        setSentimentScores([...scores].reverse()); // reverse to have the most recent first
      } else {
        setSentimentScores([]);
      }
    };

    fetchScores();
  }, [selectedPatient, lastUpdate]);

  const formatDate = (firebaseTimestamp) => {
    const date = firebaseTimestamp.toDate(); // convert Timestamp to JavaScript Date object
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const calculateAverageFromBottom = (index) => {
    let sum = 0;
    let count = 0;
    for (let i = sentimentScores.length - 1; i >= index; i--) {
      sum += sentimentScores[i].score;
      count++;
    }
    return (sum / count).toFixed(2);
  };

  const calculateDeltaChange = (index) => {
    if (index === sentimentScores.length - 1) return 'N/A';
    const delta = Math.abs(sentimentScores[index].score - sentimentScores[index + 1].score).toFixed(2);
    return delta;
  };

  const getScoreColor = (score) => {
    if (score > 0) return '#4E834E';
    if (score < 0) return '#C70039';
    return 'black'; // score is exactly 0
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
      {sentimentScores.length > 0 ? (
        <div className="table-container">
          <table className="table is-striped is-hoverable is-fullwidth" style={{ width: '50%', maxWidth: '600px' }}>
            <thead>
              <tr>
                <th className="has-text-centered">Date</th>
                <th className="has-text-centered">Sentiment Score</th>
                <th className="has-text-centered">Average</th>
                <th className="has-text-centered">Delta Change</th>
              </tr>
            </thead>
            <tbody>
              {sentimentScores.map((entry, index) => (
                <tr key={index}>
                  <td className="has-text-centered">{formatDate(entry.date)}</td>
                  <td className="has-text-centered" style={{ color: getScoreColor(entry.score) }}>
                    {entry.score.toFixed(2)}
                  </td>
                  <td className="has-text-centered">{calculateAverageFromBottom(index)}</td>
                  <td className="has-text-centered">{calculateDeltaChange(index)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="has-text-centered">No sentiment data available.</div>
      )}
    </div>
  );
};

export default SentimentScoreTable;
