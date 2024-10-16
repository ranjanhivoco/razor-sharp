/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useState, useRef } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

const Loader = ({ className }) => (
  <div className={className}>
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231   0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475   2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464    1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
        stroke="white"
      />
    </svg>
  </div>
);

const Button = ({ onSubmit, text, loading = false, disabled }) => {
  return (
    <button className="submit__btn" onClick={onSubmit} disabled={disabled}>
      {!loading ? text : <Loader className="spinner" />}
    </button>
  );
};

export default function Popup(props) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dropShiperId, setDropShiperId] = useState([]);
  const [dropshipper, setDropshipper] = useState([]);
  const [csvFile, setCsvFile] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [tags, setTags] = useState(false);
  const { openPopup, closePopup } = props;
  const [showLoader, setShowLoader] = useState(false);

  const onSubmit = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 5000);
  };

  // useEffect(() => {
  //   getAllDropshippers();
  // }, []);

  // const getAllDropshippers = async () => {
  //   const result = await hostedProductAxios.post("/alldropshiper", {
  //     headers: authHeader(),
  //   });
  //   setDropshipper(result?.data);
  // };

  const handleChange = (e) => {
    setDropShiperId(e.target.value);
  };

  const uploadCsv = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("csv", csvFile);
    formData.append("dropShiperId", dropShiperId);

    await axios({
      method: "POST",
      url: `${ApiUrl}/product/uploadcsv`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    })
      .then((response) => {
        toast.success(`New Added data : ${response?.data?.newAddedData}`);
        setTimeout(() => {
          toast.success(`Updated Data : ${response?.data?.updatedData}`);
        }, 1000);
      })
      .catch((err) => {
        toast.error(err, "Error while uploading !");
      });
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  const handleCsvField = (e) => {
    setTags(true);
    setCsvFile(e.target.files[0]);
  };

  const handleDeleteCsvFile = () => {
    setTags(false);
    setCsvFile(null);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={openPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form onSubmit={uploadCsv}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  controlId="validationCustom01"
                  onClick={() =>
                    document.querySelector(".csvUpload__field").click()
                  }
                >
                  <Form.Label>CSV File</Form.Label>
                  <br></br>
                  <div className="csv__inputfield relative">
                    <input
                      required
                      hidden
                      type="file"
                      accept=".csv"
                      // value={csvFile}
                      ref={inputRef}
                      className="csvUpload__field"
                      onChange={handleCsvField}
                    />
                    <br></br>
                    <div className="csvData">
                      <img src="images/uploadcsv__icon.svg" alt="" />
                      <span className="csv__text">
                        <h2>Select a CSV file to Import</h2>
                        <p>or</p>
                        <p>Drag and drop it here</p>
                      </span>
                    </div>
                  </div>
                </Form.Group>
                {/* <span style={{marginTop: "15px", textTransform: "capitalize", fontWeight: "bolder", marginLeft: "5px", background:"lightGray", padding: "10px" }} >{csvFile.name}   <CloseIcon onClick={() => setCsvFile("No file Selected")} /></span> */}
                {tags ? (
                  <section className="csvupload__row">
                    <AttachFileIcon />
                    <span className="csvfile__namedisplay">
                      {csvFile.name}
                      <DeleteIcon
                        onClick={handleDeleteCsvFile}
                        style={{
                          position: "absolute",
                          right: "28px",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  </section>
                ) : (
                  ""
                )}
              </Row>
              <Row style={{ marginBottom: "60px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Dropshipper ID</Form.Label>
                  <select
                    className="uploadCsv__dropdownField"
                    value={dropShiperId}
                    onChange={handleChange}
                  >
                    <option>--Please select the Seller--</option>
                    {dropshipper?.map((e) => {
                      return (
                        <option key={e._id} value={e._id}>
                          {e?.dropshiperName}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
              </Row>

              <button
                variant="primary"
                type="submit"
                className=" btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
                onClick={() => setBtnLoader(true)}
              >
                {btnLoader ? (
                  <div
                    class="spinner-border text-secondary p-0"
                    role="status"
                    style={{ height: "20px", width: "20px" }}
                  >
                    <span class="sr-only p-0">Loading...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>

              <ToastContainer />
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
