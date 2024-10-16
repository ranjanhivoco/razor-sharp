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

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [category, setCategory] = useState([]);

  const handleCreateCategory = async (e) => {
    // setLoading(true);
    const result = await hostedCategoryAxios.post(
      "/category",
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

  // const handleCreateSubCategory = async (e) => {
  //   let result = await handleCreateCategory();

  //   await hostedCategoryAxios.post(
  //     "/subcategoryarray",
  //     {
  //       categoryId: result.data._id,
  //       subCategoryName: selected,
  //     },
  //     {
  //       headers: authHeader(),
  //     }
  //   );

  //   toast.success(`${result.data.category} category created successfully !`);
  //   setInterval(() => {
  //     window.location.reload();
  //   }, 2000);
  // };

  const fazterCategory = async (e) => {
    e.preventDefault();
    await handleCreateCategory();
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
            <Form validated={validated} onSubmit={fazterCategory}>
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
              {/* <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Sub-Category</Form.Label>

                  <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="sub-category"
                    placeHolder="Enter Sub-category"
                  />
                </Form.Group>
              </Row> */}
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
