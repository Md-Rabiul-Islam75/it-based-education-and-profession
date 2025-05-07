import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//const MySwal = withReactContent(Swal);

const LabTask = () => {
  const location = useLocation();
  const { labName, dayId } = location.state || {};

  const [labCollection, setLabCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("manual"); // manual or quiz
  const [quizList, setQuizList] = useState([]);
  const [quizLoading, setQuizLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Modal to upload lab task
  const openInputModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Submit Lab Task",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Enter Topic Name">
        <input id="swal-input2" type="file" class="swal2-file">
        <select id="swal-select1" class="swal2-select">
          <option value="">Select Lab Taken By</option>
          <option value="optionA">Option A</option>
          <option value="optionB">Option B</option>
        </select>
        <select id="swal-select2" class="swal2-select">
          <option value="">Select File Upload By</option>
          <option value="optionX">Option X</option>
          <option value="optionY">Option Y</option>
        </select>
      `,
      focusConfirm: false,
      confirmButtonText: "Submit",
      preConfirm: () => {
        const indexName = document.getElementById("swal-input1").value;
        const fileInput = document.getElementById("swal-input2");
        const labQuestionFile = fileInput.files[0];
        const labTakenBy = document.getElementById("swal-select1").value;
        const fileUploadBy = document.getElementById("swal-select2").value;

        if (!indexName || !labQuestionFile || !labTakenBy || !fileUploadBy) {
          Swal.showValidationMessage("Please fill all fields.");
        }

        return {
          indexName,
          labQuestionFile,
          labTakenBy,
          fileUploadBy,
        };
      },
    });

    if (formValues) {
      const formData = new FormData();
      formData.append("SubjectName", labName);
      formData.append("NumberOfDay", dayId);
      formData.append("IndexName", formValues.indexName);
      formData.append("LabQuestionFile", formValues.labQuestionFile);
      formData.append("LabTakenBy", formValues.labTakenBy);
      formData.append("FileUploadBy", formValues.fileUploadBy);

      try {
        const response = await fetch(
          "http://localhost:8080/api/lab/labdaydetails/post",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        console.log("Response:", result);

        if (result.success) {
          const newItem = {
            id: Date.now(),
            indexName: formValues.indexName,
            labTakenBy: formValues.labTakenBy,
            labFileUrl: result.responseData?.labFileUrl || "",
          };

          setLabCollection((prev) => [...prev, newItem]);

          Swal.fire("Success", "Lab manual uploaded successfully!", "success");
        } else {
          Swal.fire(
            "Upload Failed",
            JSON.stringify(result.errorMessages),
            "error"
          );
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire("Error", "Something went wrong while uploading.", "error");
      }
    }
  };

  const openQuizModal = async () => {
    // Step 1: Enter question and options
    const { value: quizForm } = await Swal.fire({
      title: "Add Quiz Question",
      html: `
        <input id="quiz-question" class="swal2-input" placeholder="Enter Question">
        <input id="option1" class="swal2-input" placeholder="Option 1">
        <input id="option2" class="swal2-input" placeholder="Option 2">
        <input id="option3" class="swal2-input" placeholder="Option 3">
      `,
      focusConfirm: false,
      confirmButtonText: "Next",
      preConfirm: () => {
        const question = document.getElementById("quiz-question").value.trim();
        const opt1 = document.getElementById("option1").value.trim();
        const opt2 = document.getElementById("option2").value.trim();
        const opt3 = document.getElementById("option3").value.trim();

        const options = [opt1, opt2, opt3];
        const hasEmpty = options.some((opt) => !opt);
        const hasDuplicates = new Set(options).size !== options.length;

        if (!question || hasEmpty || hasDuplicates) {
          Swal.showValidationMessage("All options must be filled and unique.");
          return null;
        }

        return { question, options };
      },
    });

    if (!quizForm) return;

    // Step 2: Select correct answer
    const { value: correctAnswer } = await Swal.fire({
      title: "Select Correct Answer",
      input: "select",
      inputOptions: {
        [quizForm.options[0]]: quizForm.options[0],
        [quizForm.options[1]]: quizForm.options[1],
        [quizForm.options[2]]: quizForm.options[2],
      },
      inputPlaceholder: "Select correct answer",
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage("You must select a correct answer.");
          return null;
        }
        return value;
      },
    });

    if (!correctAnswer) return;

    // Step 3: POST data to backend
    const formData = new FormData();
    formData.append("subjectName", labName); // assumed variable
    formData.append("numberOfDay", dayId); // assumed variable
    formData.append("quetion", quizForm.question);
    formData.append("option1", quizForm.options[0]);
    formData.append("option2", quizForm.options[1]);
    formData.append("option3", quizForm.options[2]);
    formData.append("correctAnswer", correctAnswer);

    const newformData = {
      subjectName: labName,
      numberOfDay: dayId,
      quetion: quizForm.question,
      option1: quizForm.options[0],
      option2: quizForm.options[1],
      option3: quizForm.options[2],
      correctAnswer: correctAnswer,
    };

    console.log(newformData);
    console.log(quizForm.question);

    try {
      const response = await fetch(
        "http://localhost:8081/api/quiz/addquetion",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newformData),
        }
      );

      const result = await response.json();
      console.log("Quiz POST result:", result);

      if (result.success) {
        const newQuiz = {
          id: Date.now(), // or result.responseData.id if available
          quetion: quizForm.question,
          option1: quizForm.options[0],
          option2: quizForm.options[1],
          option3: quizForm.options[2],
          correctAnswer: correctAnswer,
          selectedAnswer: "", // default until selected
        };

        setQuizList((prev) => [...prev, newQuiz]);

        Swal.fire("Success", "Quiz saved successfully!", "success");

        // ✅ Update quiz list to include correct answers for showing later
        if (result.responseData?.Quiz) {
          setQuizList((prevList) =>
            prevList.map((item, index) => ({
              ...item,
              correctAnswer: result.responseData.Quiz[index]?.correctAnswer,
            }))
          );
        }

        setQuizSubmitted(true); // So you can show results or 'Show Answers' button
      } else {
        Swal.fire("Failed", JSON.stringify(result.errorMessages), "error");
      }
    } catch (error) {
      console.error("Quiz post error:", error);
      Swal.fire(
        "Error",
        "Something went wrong during quiz submission.",
        "error"
      );
    }
  };

  // getting quiz data

  useEffect(() => {
    if (labName && dayId) {
      fetch(
        `http://localhost:8081/api/quiz/getbysubjectnameandnumberofday?SubjectName=${labName}&NumberOfDay=${dayId}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Quiz Data:", data);

          const quizzes = data?.responseData?.QuizList;
          console.log(quizzes);

          if (Array.isArray(quizzes)) {
            setQuizList(quizzes);
          } else if (quizzes) {
            setQuizList([quizzes]); // wrap single object in an array
          } else {
            setQuizList([]);
          }

          setQuizLoading(false);
        })
        .catch((err) => {
          console.error("Error loading quiz:", err);
          setQuizList([]);
          setQuizLoading(false);
        });
    }
  }, [labName, dayId]);

  useEffect(() => {
    if (labName && dayId) {
      fetch(
        `http://localhost:8080/api/lab/labdaydetails/getbysubjectnameandnumberofday?SubjectName=${labName}&NumberOfDay=${dayId}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.responseData.LABSubject[0]);
          setLabCollection(data.responseData.LABSubject[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [labName, dayId]);

  const handleFile = (url) => {
    const isPdf = url.includes("upload/raw");

    return isPdf ? (
      <a
        href={`https://docs.google.com/gview?url=${encodeURIComponent(
          url
        )}&embedded=true`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        View PDF
      </a>
    ) : (
      <a
        href={url}
        target="_blank"
        download={`Lab_${labName}_${dayId}`}
        className="btn btn-primary"
      >
        Download File
      </a>
    );
  };

  const handleQuizSubmit = async () => {
    if (!labName || !dayId) {
      Swal.fire("Error", "Lab name or day ID missing.", "error");
      return;
    }

    const answerSubmissions = quizList.map((quiz, index) => ({
      questionId: quiz.id,
      question: quiz.quetion,
      selectedOption: selectedAnswers[index] || "",
    }));

    const requestBody = {
      subjectName: labName,
      numberOfDay: dayId.toString(),
      answerSubmissions,
    };

    try {
      const response = await fetch("http://localhost:8081/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Quiz Submit Response:", result);

      if (result.success) {
        const correctCount = result.responseData?.Quiz?.[0]?.correctAnswer ?? 0;

        Swal.fire(
          "Quiz Submitted!",
          `You got ${correctCount} correct answer${
            correctCount === 1 ? "" : "s"
          }.`,
          "success"
        );
      } else {
        Swal.fire(
          "Submission Failed",
          "Please check your answers and try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      Swal.fire("Error", "Something went wrong during submission.", "error");
    }
  };

  // Render tab content
  const renderManualSection = () => (
    <div>
      <h2 className="font-bold text-lg mb-4">Lab Manual Section</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : labCollection && labCollection.length > 0 ? (
        labCollection.map((item) => (
          <div
            key={item.id}
            className="card bg-neutral text-neutral-content w-full mb-4 shadow"
          >
            <div className="card-body">
              <h2 className="card-title">{item.indexName}</h2>
              <p>Lab Conducted by: {item.labTakenBy}</p>
              <div className="mt-2">
                {item.labFileUrl ? (
                  handleFile(item.labFileUrl)
                ) : (
                  <p className="text-red-400">No file available</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No lab tasks found.</p>
      )}

      <div className="mt-6">
        <button
          onClick={openInputModal}
          className="bg-blue-500 text-white px-5 py-3 rounded hover:bg-blue-600"
        >
          Click to Add Lab Manual
        </button>
      </div>
    </div>
  );

  const renderQuizSection = () => (
    <div>
      <h2 className="font-bold text-lg mb-4">Lab Quiz Section</h2>
      {quizLoading ? (
        <p className="text-gray-500">Loading quiz questions...</p>
      ) : quizList.length === 0 ? (
        <p className="text-gray-500">No quiz questions found.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuizSubmit();
          }}
        >
          {Array.isArray(quizList) && quizList.length > 0 ? (
            quizList.map((quiz, index) => (
              <div
                key={quiz.id || index}
                className="border p-4 rounded mb-4 shadow bg-gray-50"
              >
                <h3 className="font-semibold text-md mb-2">
                  Q{index + 1}. {quiz.quetion}
                </h3>
                <div className="space-y-2">
                  {[quiz.option1, quiz.option2, quiz.option3].map(
                    (option, optIdx) => (
                      <label key={optIdx} className="block cursor-pointer">
                        <input
                          type="radio"
                          name={`quiz-${index}`} // ensures proper grouping
                          value={option}
                          checked={selectedAnswers[index] === option}
                          onChange={() =>
                            setSelectedAnswers((prev) => ({
                              ...prev,
                              [index]: option,
                            }))
                          }
                          className="mr-2"
                        />
                        {option}
                      </label>
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No quiz questions available.</p>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleQuizSubmit}
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Submit Quiz
            </button>
          </div>
        </form>
      )}

      {/* {quizSubmitted && (
        <button
          onClick={() => setShowCorrectAnswers(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
        >
          Show Correct Answers
        </button>
      )} */}

      {/* Render each quiz question
      {quizList.map((quiz, index) => (
        <div
          key={quiz.id || index}
          className="border p-4 rounded mb-4 shadow bg-gray-50"
        >
          <h3 className="font-semibold text-md mb-2">
            Q{index + 1}. {quiz.quetion}
          </h3>
          <div className="space-y-2">
            {[quiz.option1, quiz.option2, quiz.option3].map(
              (option, optIdx) => {
                const isCorrect =
                  showCorrectAnswers && option === quiz.correctAnswer;
                const isSelected = selectedAnswers[index] === option;

                return (
                  <label
                    key={optIdx}
                    className={`block p-2 rounded cursor-pointer ${
                      isCorrect ? "bg-green-200 font-bold" : ""
                    } ${isSelected ? "ring-2 ring-blue-400" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`quiz-${index}`}
                      value={option}
                      checked={isSelected}
                      onChange={() => {
                        if (!showCorrectAnswers) {
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [index]: option,
                          }));
                        }
                      }}
                      disabled={showCorrectAnswers}
                      className="mr-2"
                    />
                    {option}
                    {isCorrect && (
                      <span className="ml-2 text-green-700">(Correct)</span>
                    )}
                  </label>
                );
              }
            )}
          </div>
        </div>
      ))} */}


      <div className="flex justify-end mt-4">
        <button
          onClick={openQuizModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Quiz here
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row p-4">
      {/* Sidebar with tab buttons */}
      <div className="lg:w-1/4 border-r pr-4">
        <h2 className="text-xl font-semibold mb-4">Select Section</h2>
        <button
          className={`btn w-full mb-2 ${
            activeTab === "manual" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setActiveTab("manual")}
        >
          Lab Manual
        </button>
        <button
          className={`btn w-full ${
            activeTab === "quiz" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setActiveTab("quiz")}
        >
          Lab Quiz
        </button>
      </div>

      {/* Right-side content based on selected tab */}
      <div className="lg:w-3/4 mt-4 lg:mt-0 lg:pl-4">
        <p className="text-lg mb-2">
          Lab Name: <span className="font-semibold">{labName || "N/A"}</span>
        </p>
        <p className="mb-4">
          Day ID: <span className="font-semibold">{dayId || "N/A"}</span>
        </p>
        {activeTab === "manual" ? renderManualSection() : renderQuizSection()}
      </div>
    </div>
  );
};

export default LabTask;
