import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const MockInterview = () => {
  const { state } = useLocation();
  const { interviewData, meta } = state || {};
  const [questionData, setQuestionData] = useState(interviewData);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition not supported.");
    }
  }, []);

  useEffect(() => {
    setUserAnswer(transcript);
  }, [transcript]);

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8082/api/interview/useranswer', {
        interviewTopicId: questionData.interviewTopicId,
        questionAskedByAI: questionData.questionAskedByAI.replace(/"/g, ''),
        userResponse: userAnswer,
        topic: meta.topicName,
        level: meta.level
      });

      const nextQuestion = res.data.responseData.Interview[0];
      setQuestionData(nextQuestion);
      resetTranscript();
      setUserAnswer('');
      speakOut(nextQuestion.questionAskedByAI.replace(/"/g, ''));
    } catch (err) {
      console.error('API Error:', err);
    }
  };

  const speakOut = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold">Mock Interview System</h2>

      <p className="text-gray-600 mb-4">{questionData.questionAskedByAI.replace(/"/g, '')}</p>

      <textarea
        className="textarea textarea-bordered w-full h-24 mb-2"
        placeholder="Your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      ></textarea>

      <div className="mb-4">
        <button onClick={handleStart} className="btn btn-success mr-2">🎙️ Speak</button>
        <button onClick={handleStop} className="btn btn-warning mr-2">🛑 Stop</button>
        <button onClick={handleSubmit} className="btn btn-primary">Submit Answer</button>
      </div>

      <p>{listening ? 'Listening...' : 'Not Listening'}</p>
      {isSpeaking && <p>🔊 Speaking next question...</p>}
    </div>
  );
};

export default MockInterview;
