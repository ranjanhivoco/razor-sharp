/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useEffect, useRef, useState } from "react";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import {
  hostedCouponAxios,
  hostedPagesAxios,
} from "../../backendAxios/backendAxios";
import { ToastContainer, toast } from "react-toastify";
import { TagsInput } from "react-tag-input-component";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import LabelTextarea from "../../components/fields/LabelTextarea";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const { openPopup, closePopup } = props;
  const [faq, setFaq] = useState({
    category: "",
    question: "",
    answer: "",
  });
  const [fieldActive, setfieldActive] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreateFaq = async (e) => {
    e.preventDefault();
    await hostedPagesAxios.post("/faq/addquestion", faq, {
      headers: authHeader(),
    });
    closePopup();
    toast.success(`question added successfully!!`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  const getAllCategory = async () => {
    await hostedPagesAxios.get("/faq/categories").then((response) => {
      setCategory(response?.data);
    });
  };

  const handleSelectField = (e) => {
    setfieldActive(true);
    setFaq({ ...faq, category: e.target.value });
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
            <Form onSubmit={handleCreateFaq}>
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
                    className="singleProduct__dropdownField"
                    onChange={handleSelectField}
                  >
                    <option>Please select category</option>
                    {category?.map((e) => {
                      return <option value={e._id}>{e.category}</option>;
                    })}
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
