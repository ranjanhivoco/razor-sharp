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
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import RichTextEditor from "../RichTextEditor";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:4001";

export default function EditForumSubCategoryPopup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [fast_search, setFastSearch] = useState(false);
  const { editSubCategoryPopup, closePopup, updateCategoryId } = props;
  const [subcategory_heading, setSubCategory_heading] = useState("");
  const [subcategory_content, setSubCategory_content] = useState("");
  //   const [subcategory_order, setSubCategoryOrder] = useState();
  const [subcategory_slug, setSubCategory_slug] = useState("");

  useEffect(() => {
    if (updateCategoryId) {
      prefillSubCategoryData();
      getAllCategory();
    }
  }, [updateCategoryId]);

  const prefillSubCategoryData = async () => {
    const result = await hostedForumCategoryAxios.get(
      `/subcategory-by-id/${updateCategoryId}`,
      {
        headers: authHeader(),
      }
    );
    setCategory(result?.data?.categoryId);
    setSubCategory(result?.data?.subCategory);
    setSubCategory_content(result?.data?.subcategory_contents);
    setSubCategory_slug(result?.data?.slug);
    setSubCategory_heading(result?.data?.subcategory_heading);
  };

  const getAllCategory = async () => {
    await hostedForumCategoryAxios
      .get(`/get-all-categories`)
      .then((response) => {
        if (response.status === 200) {
          setCategoryList(response?.data);
        }
      });
  };

  const handleCategoryList = (e) => {
    setCategory(e.target.value);
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("categoryId", category);
    formData.append("subCategory", subcategory);
    formData.append("subcategory_contents", subcategory_content);
    formData.append("subcategory_heading", subcategory_heading);
    // formData.append("order", subcategory_order);
    formData.append("slug", subcategory_slug);
    selected.forEach((file) => {
      formData.append("brands", file);
    });
    formData.append("fast_search", fast_search);

    await axios({
      method: "POST",
      url: `${ApiUrl}/forum/update-subcategory/${updateCategoryId}`,
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
                    onChange={handleCategoryList}
                    required
                  >
                    <option
                      className="field__optionDropdown"
                      style={{ fontSize: "12px" }}
                      value={category?._id}
                    >
                      {category?.category}
                    </option>
                    {categoryList
                      ?.filter((e) => e._id !== category?._id)
                      ?.map((e) => {
                        return (
                          <option key={e._id} value={e._id}>
                            {e?.category}
                          </option>
                        );
                      })}
                  </select>
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
                  <Form.Label>Slug</Form.Label>
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
