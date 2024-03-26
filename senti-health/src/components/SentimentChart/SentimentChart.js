import React, { useState, useEffect } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import { fetchSentimentScores, fetchPatientName  } from '../../firebase';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SentimentChart = ({ selectedPatient, lastUpdate }) => {
    const [dataPoints, setDataPoints] = useState([]);
    const [chartTitle, setChartTitle] = useState("Patient's Sentiment Analysis");

    useEffect(() => {
        const fetchData = async () => {
            if (selectedPatient) {
                try {
                    let patientName = await fetchPatientName(selectedPatient);
                    let sentimentScores = await fetchSentimentScores(selectedPatient);
                    // Prepare the data points for the chart
                    const points = sentimentScores.map((entry, index) => ({
                        x: index + 1,
                        y: entry.score
                    }));
                    setDataPoints(points);
                    setChartTitle(`${patientName}'s Sentiment Analysis`);
                } catch (error) {
                    console.log('Error processing sentiment scores: ', error);
                    setChartTitle("Patient's Sentiment Analysis");
                }
            } else {
                setDataPoints([]);
                setChartTitle("Patient's Sentiment Analysis");
            }
        };

        fetchData();
    }, [selectedPatient, lastUpdate]);

    // Set up the chart options
    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: chartTitle
        },
        axisX: {
            title: "Entry Number",
            interval: 1,
        },
        axisY: {
            title: "Sentiment Score",
            includeZero: false,
            minimum: -1, // Set the minimum of the y-axis to -1
            maximum: 1, // Set the maximum of the y-axis to 1
        },
        data: [{
            type: "line",
            color: "#4E834E", 
            dataPoints: dataPoints
        }]
    };

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default SentimentChart;
