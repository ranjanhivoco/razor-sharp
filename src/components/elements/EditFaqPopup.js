/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import {
  hostedPagesAxios,
} from "../../backendAxios/backendAxios";
import "react-toastify/dist/ReactToastify.css";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function EditFaq(props) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [faq, setFaq] = useState({
    category: "",
    question: "",
    answer: "",
  });
  const [fieldActive, setfieldActive] = useState(false);

  const { editFaqPopup, closePopup, updateFaqId } = props;

  useEffect(() => {
    if (updateFaqId) {
      prefillFaqData();
    }
    getAllCategory();
  }, [updateFaqId]);

  const getAllCategory = async () => {
    await hostedPagesAxios.get("/faq/categories").then((response) => {
      setCategory(response?.data);
    });
  };

  const prefillFaqData = async () => {
    await hostedPagesAxios.get(`/faq/question/${updateFaqId}`).then((response) => {
      setFaq({
        category: response?.data?.category,
        question: response?.data?.question,
        answer: response?.data?.answer,
      });
      setfieldActive(true);
    });
  };

  const handleSelectField = (e) => {
    setFaq({ category: e.target.value });
  };

  const updateFaq = async (e) => {
    e.preventDefault();
    await hostedPagesAxios
      .put(`/faq/update-question/${updateFaqId}`, faq, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Faq updated successfully");
        }
      });
      setTimeout(() => {
        window.location.reload(); 
      }, 2000)
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={editFaqPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form onSubmit={updateFaq}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Category
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField disbaled_field"
                    onChange={handleSelectField}
                    disabled
                  >
                    <option value={faq?._id}>{faq?.category?.category}</option>
                  </select>
                </Form.Group>
              </Row>

              {fieldActive ? (
                <>
                  {" "}
                  <Row style={{ marginBottom: "20px" }}>
                    <Form.Group as={Col}>
                      <Form.Label>Question </Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="name"
                        placeholder="Enter your Question..."
                        draggable="true"
                        value={faq.question}
                        onChange={(e) =>
                          setFaq({ ...faq, question: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ marginBottom: "20px" }}>
                    <Form.Group as={Col}>
                      <Form.Label>Answer </Form.Label>
                      <textarea
                        required
                        autoComplete="off"
                        type="text"
                        placeholder="Enter your Answer"
                        draggable="true"
                        className="faq__descriptionField"
                        value={faq.answer}
                        onChange={(e) =>
                          setFaq({ ...faq, answer: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Row>
                </>
              ) : (
                ""
              )}

              <button
                variant="primary"
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
              >
                Submit
              </button>
              <ToastContainer />
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
