/* eslint-disable no-sequences */
import React, { useState } from "react";
import {
  hostedCategoryAxios,
  hostedPagesAxios,
} from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-tagsinput/react-tagsinput.css";
import "react-toastify/dist/ReactToastify.css";
import { TagsInput } from "react-tag-input-component";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export default function FaqCategoryPopup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [category, setCategory] = useState([]);

  const handleCategory = async (e) => {
    e.preventDefault();
    const result = await hostedPagesAxios.post(
      "/faq/create-category",
      { category: category },
      {
        headers: authHeader(),
      }
    );
    toast.success(`${result.data.category} category created successfully !`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  const { openPopup, closePopup } = props;

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={openPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={handleCategory}>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Category </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="name"
                    placeholder="Enter category name"
                    draggable="true"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <button
                variant="primary"
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
              >
                Create
              </button>
              <ToastContainer />
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
