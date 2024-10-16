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
import { Editor } from "@tinymce/tinymce-react";
import Label from "./Label";
import Box from "./Box";
import { Icon, Input } from ".";
import RichTextEditor from "../RichTextEditor";

export default function ForumSubCategoryPopup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [subcategory, setSubCategory] = useState("");
  const [CategoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory_heading, setSubCategory_heading] = useState("");
  const [subcategory_content, setSubCategory_content] = useState("");

  const { subCategoryPopup, closePopup } = props;

  useEffect(() => {
    getAllCategory();
  }, []);

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

  const createSubCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subCategory", subcategory);
    formData.append("slug", subcategory.replace(/\s+/g, "-").toLowerCase()); // Assuming slug is generated from subcategory
    formData.append("categoryId", category);
    formData.append("subcategory_contents", subcategory_content);
    formData.append("subcategory_heading", subcategory_heading);

    setLoading(true);
    await hostedForumCategoryAxios
      .post(`/add-subcategory`, formData, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Sub-Category Created Successfully");
        }
        closePopup();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error creating sub-category");
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={subCategoryPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={createSubCategory}>
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
                      value=""
                    >
                      Select category
                    </option>
                    {CategoryList?.map((e) => {
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
                  <Form.Label>Sub Category</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
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
                    type="text"
                    placeholder="Enter subcategory heading"
                    draggable="true"
                    value={subcategory_heading}
                    onChange={(e) => setSubCategory_heading(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Sub-category Description
                  </Form.Label>

                  <RichTextEditor
                    value={subcategory_content}
                    onChange={(content) => setSubCategory_content(content)}
                  />
                </Form.Group>
              </Row>
              <button
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
              >
                create
              </button>
              <ToastContainer />
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
