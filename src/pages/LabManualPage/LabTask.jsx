import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; // ✅ You missed this import

const MySwal = withReactContent(Swal); // ✅ You missed creating MySwal

const LabTask = () => {
  const location = useLocation();
  const { labName, dayId } = location.state || {};

  const [labCollection, setLabCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Define the modal function correctly
  const openInputModal = async () => {
    const { value: formValues } = await MySwal.fire({
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
      formData.append("SubjectName", labName); // ✅ Matches your backend
      formData.append("NumberOfDay", dayId); // ✅ Matches your backend
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
          alert("Lab manual uploaded successfully!");
        } else {
          alert("Upload failed: " + JSON.stringify(result.errorMessages));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Something went wrong while uploading.");
      }
    }
  };

  //Uncomment this useEffect when needed
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

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Today’s Lab Task</h2>

      <p className="mt-2">
        Lab Name: <span className="font-semibold">{labName || "N/A"}</span>
      </p>
      <p>
        Day ID: <span className="font-semibold">{dayId || "N/A"}</span>
      </p>

      {loading ? (
        <p className="mt-4 text-gray-500">Loading lab data...</p>
      ) : (
        <>
          {labCollection && labCollection.length > 0 ? (
            labCollection.map((item, index) => (
              <div
                key={item.id}
                className="card bg-neutral text-neutral-content w-96 mx-auto my-6 shadow-lg"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.indexName}</h2>
                  <p>Lab Conducted by: {item.labTakenBy}</p>

                  <div className="card-actions justify-end mt-4">
                    {item.labFileUrl && item.labFileUrl.endsWith(".pdf") ? (
                      <>
                        {/* PDF View */}
                        <a
                          href={`https://docs.google.com/gview?url=${encodeURIComponent(
                            item.labFileUrl
                          )}&embedded=true`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          View
                        </a>

                        {/* PDF Download */}
                        <a
                          href={item.labFileUrl}
                          target="_blank"
                          download={`Lab_${labName}_${dayId}_${index + 1}.pdf`}
                          onClick={() =>
                            alert("Your file is being downloaded...")
                          }
                          className="btn btn-ghost"
                        >
                          Download
                        </a>
                      </>
                    ) : (
                      <p className="text-red-300">No PDF available</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No lab tasks found.</p>
          )}
        </>
      )}

      <div className="p-4">
        <button
          onClick={openInputModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Input Modal
        </button>
      </div>
    </div>
  );
};

export default LabTask;
