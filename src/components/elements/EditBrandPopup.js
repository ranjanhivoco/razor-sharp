/* eslint-disable no-sequences */
import React, { useEffect, useState } from "react";
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
import { Box, Input, Label, Icon } from "../elements";
import axios from "axios";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000"

export default function EditBrandPopup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [selected, setSelected] = useState([]);
  const [previewImage, setPreviewimage] = useState();
  const [brandImage, setBrandimage] = useState();
  const { editBrandPopup, closePopup, updateBrandId } = props;

  useEffect(() => {
    if (updateBrandId) {
      prefillBrandData();
    }
  }, [updateBrandId]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreviewimage(URL.createObjectURL(file));
    setBrandimage(file);
  };

  const prefillBrandData = async (e) => {
    await hostedCategoryAxios
      .get(`getBrandById/${updateBrandId}`)
      .then((response) => {
        if (response.status === 200) {
          setSelected(response?.data?.name);
          setBrandimage(response?.data?.logo);
        }
      });
  };

  const updateBrand = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("logo", brandImage);
    formData.append("name", selected);

    await axios({
      method: "PUT",
      url: `${ApiUrl}/category/updatebrand/${updateBrandId}`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("card updated");
        }
        closePopup();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error(`${err.response.data.error}`);
        }
      });

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={editBrandPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={updateBrand}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Brands</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Product Price"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom05">
                  <Form.Label className="single-product-label">
                    Brand Image
                  </Form.Label>
                  <Box className={`mc-file-upload`}>
                    <Input
                      multiple
                      type="file"
                      id="avatar"
                      onChange={handleImage}
                    />

                    <Label htmlFor="avatar">
                      <Icon>{"add"}</Icon>
                    </Label>
                  </Box>
                </Form.Group>
              </Row>

              {previewImage ? (
                <div className="uploadCard__images">
                  <div className="card">
                    <img alt="" src={previewImage} />
                  </div>
                </div>
              ) : (
                <div className="uploadCard__images">
                  <div className="card">
                    <img alt="" src={`${brandImage}`} />
                  </div>
                </div>
              )}
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
