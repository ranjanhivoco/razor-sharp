/* eslint-disable no-sequences */
import React, { useState } from "react";
import { hostedForumCategoryAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-tagsinput/react-tagsinput.css";
import "react-toastify/dist/ReactToastify.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Box from "./Box";
import { Icon, Input, Label } from ".";
import { Editor } from "@tinymce/tinymce-react";
import RichTextEditor from "../RichTextEditor";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [category, setCategory] = useState([]);
  const [previewImage, setPreviewimage] = useState();
  const [contents, setContents] = useState();
  const [postImage, setPostImage] = useState();

  const handleCreateCategory = async () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("image", postImage);
    formData.append("content", contents);

    setLoading(true);
    await hostedForumCategoryAxios
      .post(`/create-category`, formData, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Category Created Successfully");
        }
        closePopup();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error creating category");
        setLoading(false);
      });
  };

  const fazterCategory = async (e) => {
    e.preventDefault();
    await handleCreateCategory();
  };

  const handleImages = async (e) => {
    const file = e.target.files[0];
    setPreviewimage(URL.createObjectURL(file));
    setPostImage(file);
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
              <div className="col-md-12 position-relative">
                <Form.Group as={Col} controlId="validationCustom05">
                  <Form.Label className="single-product-label">
                    Catgeory Image
                  </Form.Label>
                  <Box className={`mc-file-upload`}>
                    <Input
                      multiple
                      type="file"
                      id="avatar"
                      onChange={handleImages}
                    />
                    <Label htmlFor="avatar">
                      <Icon>{"add"}</Icon>
                    </Label>
                  </Box>
                  <div className="uploadProduct__images d-flex"></div>
                </Form.Group>
              </div>

              {previewImage ? (
                <div className="uploadCard__images">
                  <div className="card">
                    <img alt="" src={previewImage} />
                  </div>
                </div>
              ) : (
                ""
              )}
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    category Description
                  </Form.Label>
              
                  <RichTextEditor
                    value={contents}
                    onChange={(content) => setContents(content)}
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
