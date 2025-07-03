import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import "./style.css";
import Interviewer from "../../assets/images/InterViewer.mp4";
import CalmInterviewer from "../../assets/images/Calm_Interviewer.png";
import CalmInterviewer2 from "../../assets/images/InterViewer2.jpg";


const MockInterview = () => {
  const { state } = useLocation();
  const { interviewData, meta } = state || {};
  const [questionData, setQuestionData] = useState(interviewData);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pauseTimeout, setPauseTimeout] = useState(null);
  const [lastSpokenTime, setLastSpokenTime] = useState(null);
  const videoRef = useRef(null);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Start webcam
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access denied or error:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Check browser support
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition not supported.");
    }
  }, []);

  // Track speech and pause
  useEffect(() => {
    setUserAnswer(transcript);

    if (transcript.trim()) {
      setLastSpokenTime(Date.now());
    }

    if (pauseTimeout) clearTimeout(pauseTimeout);

    const timeout = setTimeout(() => {
      if (
        transcript.trim() &&
        lastSpokenTime &&
        Date.now() - lastSpokenTime >= 5000
      ) {
        handleSubmit();
      }
    }, 5100);

    setPauseTimeout(timeout);
  }, [transcript]);

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const handleSubmit = async () => {
    try {
      if (!userAnswer.trim()) return;

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
      setLastSpokenTime(null);
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
    <>
      {/* Camera Preview */}
      {/* <div className="fixed top-5 right-2 w-48 h-36 border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg bg-black z-50">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Main Interface */}
      <div className="p-4 my-1 text-center">
        <h2 className="text-2xl font-bold mb-6">Mock Interview System</h2>

        <div className="flex gap-10 w-11/12 mx-auto">
          {/* AI Section */}
          <div className="w-1/2 border rounded-xl p-4 bg-blue-50 shadow">
            <h3 className="text-lg font-semibold text-left mb-2">
              Interviewer (AI)
            </h3>

            {/* AI Visual (video or image) */}
            <div className="mt-4 w-full h-80 border-2 border-gray-300 rounded-lg overflow-hidden shadow bg-black flex items-center justify-center">
              {isSpeaking ? (
                <video
                  src={Interviewer}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={CalmInterviewer2}
                  alt="Calm Interviewer"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Status message */}
            {/* {isSpeaking && (
              <div className="text-center mt-2">
                <div className="ai-animation"></div>
                <p className="mt-2 text-sm text-blue-600 font-medium">
                  AI is speaking...
                </p>
              </div>
            )} */}

            {/* Question text */}
            <p className="text-gray-700 text-left mt-4 text-base font-medium">
              {questionData?.questionAskedByAI?.replace(/"/g, "")}
            </p>
          </div>

          {/* User Section */}
          <div className="w-1/2 border rounded-xl p-4 bg-green-50 shadow">
            <h3 className="text-lg font-semibold text-left mb-2">
              Your Answer:
            </h3>

            {/* Camera Preview inside user section */}
            {/* Camera Preview inside user section */}
            {/* Camera Preview inside user section */}
            {/* Camera Preview inside user section */}
            <div className="mt-4 w-full h-130 border-2 border-gray-300 rounded-lg overflow-hidden shadow bg-black">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>

            <textarea
              className="textarea textarea-bordered w-full h-24 mb-4"
              placeholder="Speak or type your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            ></textarea>

            {listening && !isSpeaking && (
              <div className="text-center mb-4">
                <div className="voice-animation"></div>
                <p className="mt-2 text-sm text-green-600 font-medium">
                  You're speaking...
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
    </>
  );
};

export default MockInterview;
