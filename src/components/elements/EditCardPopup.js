/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useEffect, useRef, useState } from "react";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import {
  hostedCategoryAxios,
  hostedPagesAxios,
} from "../../backendAxios/backendAxios";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Input, Label, Icon } from "../elements";
import axios from "axios";
import RichTextEditor from "../RichTextEditor";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

export default function CardPopup(props) {
  const [loading, setLoading] = useState(false);
  const { editCardPopup, closePopup, updateCardId } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [topproductfeatured, setTopproductfeatured] = useState(false);
  const [sliderfeatured, setSliderfeatured] = useState(false);
  // const [bannerFeatured, setBannerfeatured] = useState(false);
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewimage] = useState();
  const [catimage, setcatimage] = useState();

  useEffect(() => {
    getAllCategory();
    if (updateCardId) {
      getCardDetailById();
    }
  }, [updateCardId]);

  const handleCardCategory = (e) => {
    setCategory(e.target.value);
  };

  const getAllCategory = async () => {
    const result = await hostedCategoryAxios.get("/getsubcategorylist");
    const categoryName = result?.data?.map((item) => ({
      subCategory: item?.subCategory,
      id: item?._id,
      slug: item?.slug,
    }));
    setCategoryList(categoryName);
  };

  // (categoryList?.slug)

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreviewimage(URL.createObjectURL(file));
    setcatimage(file);
  };

  const getCardDetailById = async () => {
    await hostedPagesAxios
      .get(`/card-category/get/${updateCardId}`)
      .then((response) => {
        if (response.status === 200) {
          setFeatured(response?.data?.featured);
          setTopproductfeatured(response?.data?.topproductfeatured);
          setSliderfeatured(response?.data?.sliderfeatured);
          settitle(response?.data?.title);
          setDescription(response?.data?.description);
          setCategory(response?.data?.category);
          setcatimage(response?.data?.catimage);
        }
      });
  };

  const updateCard = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("catimage", catimage);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("featured", featured);
    formData.append("topproductfeatured", topproductfeatured);
    formData.append("sliderfeatured", sliderfeatured);

    await axios({
      method: "PUT",
      url: `${ApiUrl}/card-category/update/${updateCardId}`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("card updated");
        }
        closePopup();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
        <Dialog open={editCardPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form onSubmit={updateCard}>
              <Form.Group as={Col} controlId="validationCustom05">
                <Form.Label className="single-product-label">
                  Card Image
                </Form.Label>
                <Box className={`mc-file-upload`}>
                  <Input
                    multiple
                    type="file"
                    id="avatar"
                    onChange={handleImage}
                  />

                  <Label htmlFor="avatar">
                    <Icon
                      style={{
                        position: "absolute",
                        top: "14px",
                        cursor: "pointer",
                      }}
                    >
                      {"add"}
                    </Icon>
                  </Label>
                </Box>

                {previewImage ? (
                  <div className="uploadCard__images">
                    <div className="card">
                      <img alt="" src={previewImage} />
                    </div>
                  </div>
                ) : (
                  <div className="uploadCard__images">
                    <div className="card">
                      <img alt="" src={`${catimage}`} />
                    </div>
                  </div>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label className="single-product-label">
                  Card Title
                </Form.Label>

                <RichTextEditor value={title} onChange={(e) => settitle(e)} />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Card Description
                  </Form.Label>

                  <RichTextEditor
                    value={description}
                    onChange={(e) => setDescription(e)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Sub-Category
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField"
                    onChange={handleCardCategory}
                  >
                    <option value={category}>{category}</option>
                    {categoryList?.map((e) => {
                      return (
                        <option key={e?._id} value={e?.slug}>
                          {e?.subCategory}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <div style={{ textAlign: "left" }}>
                  <input
                    type="checkbox"
                    id="Fixed"
                    name="Fixed"
                    value="Fixed"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <label for="Fixed Discount">&nbsp; Top Card</label>
                </div>
                <div style={{ textAlign: "left" }}>
                  <input
                    type="checkbox"
                    id="Fixed"
                    name="Fixed"
                    value="Fixed"
                    checked={topproductfeatured}
                    onChange={(e) => setTopproductfeatured(e.target.checked)}
                  />
                  <label for="Fixed Discount">&nbsp; Middle Card</label>
                </div>
                <div style={{ textAlign: "left" }}>
                  <input
                    type="checkbox"
                    id="Fixed"
                    name="Fixed"
                    value="Fixed"
                    checked={sliderfeatured}
                    onChange={(e) => setSliderfeatured(e.target.checked)}
                  />
                  <label for="Fixed Discount">&nbsp; Bottom Card</label>
                </div>
              </Row>
              <button
                variant="primary"
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
                // onClick={handleToast}
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
