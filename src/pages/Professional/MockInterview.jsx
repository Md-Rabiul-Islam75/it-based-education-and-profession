import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import "./style.css";

const MockInterview = () => {
  const { state } = useLocation();
  const { interviewData, meta } = state || {};
  const [questionData, setQuestionData] = useState(interviewData);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
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
    SpeechRecognition.startListening({ continuous: true });

    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 5000);
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8082/api/interview/useranswer",
        {
          interviewTopicId: questionData.interviewTopicId,
          questionAskedByAI: questionData.questionAskedByAI.replace(/"/g, ""),
          userResponse: userAnswer,
          topic: meta.topicName,
          level: meta.level,
        }
      );

      const nextQuestion = res.data.responseData.Interview[0];
      setQuestionData(nextQuestion);
      resetTranscript();
      setUserAnswer("");
      speakOut(nextQuestion.questionAskedByAI.replace(/"/g, ""));
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const speakOut = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-10 my-5 text-center">
      <h2 className="text-2xl font-bold mb-6">Mock Interview System</h2>

      <div className="flex gap-10 w-11/12 mx-auto">
        {/* Left side - AI */}
        <div className="w-1/2 border rounded-xl p-4 bg-blue-50 shadow">
          <h3 className="text-lg font-semibold text-left mb-2">AI Question:</h3>
          <p className="text-gray-700 text-left mb-4">
            {questionData.questionAskedByAI.replace(/"/g, "")}
          </p>
          {isSpeaking && (
            <div className="text-center">
              <div className="ai-animation"></div>
              <p className="mt-2 text-sm text-blue-600 font-medium">
                AI is speaking...
              </p>
            </div>
          )}
        </div>

        {/* Right side - User */}
        <div className="w-1/2 border rounded-xl p-4 bg-green-50 shadow">
          <h3 className="text-lg font-semibold text-left mb-2">Your Answer:</h3>
          <textarea
            className="textarea textarea-bordered w-full h-24 mb-4"
            placeholder="Speak or type your answer..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          ></textarea>

          {listening && (
            <div className="text-center mb-4">
              <div className="voice-animation"></div>
              <p className="mt-2 text-sm text-green-600 font-medium">
                You’re speaking...
              </p>
            </div>
          )}

          <div>
            <button onClick={handleStart} className="btn btn-success mr-2">
              🎙️ Speak
            </button>
            <button onClick={handleStop} className="btn btn-warning mr-2">
              🛑 Stop
            </button>
            <button onClick={handleSubmit} className="btn btn-primary">
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
