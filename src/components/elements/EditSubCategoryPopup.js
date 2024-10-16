/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
import "react-toastify/dist/ReactToastify.css";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Multiselect } from "multiselect-react-dropdown";
import { Box, Icon, Input, Label } from ".";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import RichTextEditor from "../RichTextEditor";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

export default function SubCategoryPopup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [selected, setSelected] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fast_search, setFastSearch] = useState(false);
  const { editSubCategoryPopup, closePopup, updateCategoryId } = props;
  const [pBrand, setpBrand] = useState([]);
  const [previewImage, setPreviewimage] = useState();
  const [postImage, setPostImage] = useState();
  const [subcategory_heading, setSubCategory_heading] = useState("");
  const [subcategory_content, setSubCategory_content] = useState("");
  const [subcategory_order, setSubCategoryOrder] = useState();
  const [subcategory_slug, setSubCategory_slug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeyword] = useState("");

  useEffect(() => {
    getBrandList();
    if (updateCategoryId) {
      prefillSubCategoryData();
    }
  }, [updateCategoryId]);

  const prefillSubCategoryData = async () => {
    const result = await hostedCategoryAxios.get(
      `/getSubCategoryById/${updateCategoryId}`,
      {
        headers: authHeader(),
      }
    );
    setSubCategory(result?.data?.subCategory);
    setFastSearch(result?.data?.fast_search);
    const presentBrand = result?.data?.brands.reduce((acc, value, index) => {
      acc[index] = value;
      return acc;
    }, {});
    setpBrand(presentBrand);
    setPostImage(result?.data?.image);
    setSubCategory_content(result?.data?.subcategory_contents);
    setSubCategory_slug(result?.data?.slug);
    setSubCategory_heading(result?.data?.subcategory_heading);
    setSubCategoryOrder(result?.data?.order);
    setMetaTitle(result?.data?.title_tag);
    setMetaDescription(result?.data?.description_tag);
    setMetaKeyword(result?.data?.keywords_tag);
  };

  const getBrandList = async () => {
    const result = await hostedCategoryAxios.get("/getallbrand");
    const singleBrand = result?.data?.map((brand) => ({
      name: brand?.name,
      _id: brand?._id,
    }));
    setBrands(singleBrand);
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("subCategory", subcategory);
    formData.append("subcategory_contents", subcategory_content);
    formData.append("subcategory_heading", subcategory_heading);
    formData.append("order", subcategory_order);
    formData.append("slug", subcategory_slug);
    selected.forEach((file) => {
      formData.append("brands", file);
    });
    formData.append("fast_search", fast_search);
    formData.append("image", postImage);
    formData.append("title_tag", metaTitle);
    formData.append("description_tag", metaDescription);
    formData.append("keywords_tag", metaKeywords);

    await axios({
      method: "PUT",
      url: `${ApiUrl}/category/updatesubcategory/${updateCategoryId}`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("subcategory updated");
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
        <Dialog
          open={editSubCategoryPopup}
          onClose={closePopup}
          fullWidth={true}
        >
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={updateCategory}>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Sub Category Order </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="number"
                    placeholder="Enter subcategory order"
                    draggable="true"
                    value={subcategory_order}
                    onChange={(e) => setSubCategoryOrder(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Sub Category </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="subcategory"
                    placeholder="Enter subcategory"
                    draggable="true"
                    value={subcategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Sub Category Heading</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="subcategory"
                    placeholder="Enter subcategory heading"
                    draggable="true"
                    value={subcategory_heading}
                    onChange={(e) => setSubCategory_heading(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Slug url</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="subcategory"
                    placeholder="Enter Slug url"
                    draggable="true"
                    value={subcategory_slug}
                    onChange={(e) => setSubCategory_slug(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Category Description
                  </Form.Label>
                  <RichTextEditor
                    value={subcategory_content}
                    onChange={(e) => {
                      setSubCategory_content(e);
                    }}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Brand</Form.Label>
                  <Multiselect
                    options={brands}
                    isObject={true}
                    value={selected}
                    onSelect={(e) => setSelected([...e?.map((i) => i._id)])}
                    placeholder="Select products..."
                    displayValue="name"
                    selectedValues={pBrand}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="subcategory"
                    placeholder="Enter meta title"
                    draggable="true"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Meta Description</Form.Label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Blog Description"
                    draggable="true"
                    className="faq__descriptionField"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Meta Keyword</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="subcategory"
                    placeholder="Enter meta keyword"
                    draggable="true"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeyword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mt-1 mb-2 editProduct__checkbox">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={fast_search}
                    onChange={(e) => setFastSearch(e.target.checked)}
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Add to Find-in-Fast category
                  </label>
                </div>
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
