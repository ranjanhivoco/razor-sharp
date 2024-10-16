/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import { hostedForumCategoryAxios } from "../../backendAxios/backendAxios";
import "react-toastify/dist/ReactToastify.css";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Box from "./Box";
import { Icon, Input, Label } from ".";
import { Editor } from "@tinymce/tinymce-react";
import RichTextEditor from "../RichTextEditor";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [category, setCategory] = useState([]);
  const [postImage, setPostImage] = useState();
  const [previewImage, setPreviewimage] = useState();
  const [contents, setContents] = useState();
  const { editCategoryPopup, closePopup, updateCategoryId } = props;

  useEffect(() => {
    if (updateCategoryId) {
      prefillCategoryData();
    }
  }, [updateCategoryId]);

  const prefillCategoryData = async () => {
    const result = await hostedForumCategoryAxios.get(
      `/get-category-by-id/${updateCategoryId}`,
      {
        headers: authHeader(),
      }
    );
    setCategory(result?.data?.category);
    setPostImage(result?.data?.image);
    setContents(result?.data?.contents);
  };

  const updateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    formData.append("image", postImage);
    formData.append("contents", contents);

    setLoading(true);
    await hostedForumCategoryAxios
      .put(`/update-category/${updateCategoryId}`, formData, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Category updated Successfully");
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

  const handleImages = async (e) => {
    const file = e.target.files[0];
    setPreviewimage(URL.createObjectURL(file));
    setPostImage(file);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={editCategoryPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={updateCategory}>
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
                <div className="uploadCard__images">
                  <div className="card">
                    <img alt="" src={`${postImage}`} />
                  </div>
                </div>
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
                Update
              </button>
              <ToastContainer />
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
