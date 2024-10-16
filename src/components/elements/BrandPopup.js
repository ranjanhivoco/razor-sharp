/* eslint-disable no-sequences */
import React, { useState } from "react";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
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

export default function Brand(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [selected, setSelected] = useState([]);

  const addBrand = async (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      toast.error("Please enter at least one brand.");
      return;
    } else {
      await hostedCategoryAxios
        .post("/brandarray", { brand: selected }, { headers: authHeader() })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Brand added successfully");
            closePopup();
          }
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    }
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
            <Form validated={validated} onSubmit={addBrand}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>
                    Brands &nbsp;
                    <span
                      style={{
                        color: "#8f8c8c",
                        fontWeight: "600",
                        fontSize: "10px",
                      }}
                    >
                      (select multiple value)
                    </span>
                  </Form.Label>
                  <TagsInput
                    value={selected}
                    onChange={(newTag) => {
                      setSelected(newTag);
                    }}
                    name="sub-category"
                    placeHolder="Enter Brand name"
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
