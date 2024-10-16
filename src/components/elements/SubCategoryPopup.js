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
import { Editor } from "@tinymce/tinymce-react";
import RichTextEditor from "../RichTextEditor";

export default function SubCategoryPopup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory_heading, setSubCategory_heading] = useState("");
  const [subcategory_content, setSubCategory_content] = useState("");
  const { subCategoryPopup, closePopup } = props;

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    await hostedCategoryAxios.get(`/getallcategory`).then((response) => {
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
    await hostedCategoryAxios
      .post(
        `/subcategory`,
        {
          subCategoryName: subcategory,
          categoryId: category,
          subcategory_contents: subcategory_content,
          subcategory_heading: subcategory_heading,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Sub-Category Created Successfully");
        }
        closePopup();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
                  >
                    <option
                      className="field__optionDropdown"
                      style={{ fontSize: "12px" }}
                      value={CategoryList}
                    >
                      select category
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

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Sub-category Description
                  </Form.Label>
                  <Editor
                    value={subcategory_content}
                    onEditorChange={(e) => {
                      setSubCategory_content(e);
                    }}
                    apiKey="a20t6k2ldnqtbhg3jzr1sav6gzibv9jyx2x4tbm50ynhtu5b"
                    init={{
                      selector: "textarea",
                      height: 200,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
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
