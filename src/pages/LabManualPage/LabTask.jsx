import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; // ✅ You missed this import

const MySwal = withReactContent(Swal); // ✅ You missed creating MySwal

const LabTask = () => {
  const location = useLocation();
  const { labName, dayId } = location.state || {};

  const [labCollection, setLabCollection] = useState([]); 
  const [loading, setLoading] = useState(true);

  // ✅ Define the modal function correctly
  const openInputModal = async () => {
    const { value: formValues } = await MySwal.fire({
      title: 'Submit Information',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Enter Topic Name">
        <input id="swal-input2" type="file" class="swal2-file">
        <select id="swal-select1" class="swal2-select">
          <option value="">Select Lab Teacher Name</option>
          <option value="optionA">Option A</option>
          <option value="optionB">Option B</option>
           <option value="optionC">Option C</option>
          <option value="optionD">Option D</option>
        </select>
        <select id="swal-select2" class="swal2-select">
          <option value="">Select Who Is Uploaded:</option>
          <option value="optionX">Option X</option>
          <option value="optionY">Option Y</option>
        </select>
      `,
      focusConfirm: false,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        const textValue = document.getElementById('swal-input1').value;
        const fileInput = document.getElementById('swal-input2');
        const fileValue = fileInput.files[0];
        const select1Value = document.getElementById('swal-select1').value;
        const select2Value = document.getElementById('swal-select2').value;

        if (!textValue || !fileValue || !select1Value || !select2Value) {
          Swal.showValidationMessage('Please fill all fields');
        }

        return { textValue, fileValue, select1Value, select2Value };
      }
    });

    if (formValues) {
      console.log('Text:', formValues.textValue);
      console.log('File:', formValues.fileValue);
      console.log('Dropdown 1:', formValues.select1Value);
      console.log('Dropdown 2:', formValues.select2Value);

      // ✅ You can now handle formValues here, like sending to server
    }
  };

  // Uncomment this useEffect when needed
  // useEffect(() => {
  //   if (labName && dayId) {
  //     fetch(
  //       `http://localhost:8080/api/lab/labdaydetails/getbysubjectnameandnumberofday?SubjectName=${labName}&NumberOfDay=${dayId}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data.responseData.LABSubject[0]);
  //         setLabCollection(data.responseData.LABSubject[0]);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //         setLoading(false);
  //       });
  //   }
  // }, [labName, dayId]);

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Today’s Lab Task</h2>

      <p className="mt-2">
        Lab Name: <span className="font-semibold">{labName || "N/A"}</span>
      </p>
      <p>
        Day ID: <span className="font-semibold">{dayId || "N/A"}</span>
      </p>

      {/* Uncomment below if you fetch lab data */}
      {/* 
      {loading ? (
        <p className="mt-4 text-gray-500">Loading lab data...</p>
      ) : (
        <>
          {labCollection && labCollection.length > 0 ? (
            labCollection.map((item, index) => (
              <div key={item.id} className="my-8 p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">{item.indexName}</h2>

                <div className="flex justify-center my-4">
                  <img
                    src={item.imageUrl}
                    alt="Lab"
                    className="w-72 rounded-lg"
                  />
                </div>

                <div className="text-left space-y-2">
                  {item.detailsList.map((detail, idx) => (
                    <p key={idx} className="text-gray-700">
                      {idx + 1}. {detail}
                    </p>
                  ))}
                </div>

                {item.videoUrl && (
                  <div className="mt-4">
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Watch Video
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No lab tasks found.</p>
          )}
        </>
      )}
      */}

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
