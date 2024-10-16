/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useEffect, useState } from "react";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Input, Label, Icon } from "../elements";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../RichTextEditor";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

export default function CardPopup(props) {
  const [loading, setLoading] = useState(false);
  const { openPopup, closePopup } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [previewImage, setPreviewimage] = useState();
  const [othercontent, setOtherContent] = useState();
  const [blog, setBlog] = useState({
    category: "",
    title: "",
    description: "",
    blogimage: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCardCategory = (e) => {
    setBlog({ ...blog, category: e.target.value });
  };

  const getAllCategory = async () => {
    const result = await hostedCategoryAxios.get("/getallcategory");
    const categoryName = result?.data?.map((item) => ({
      category: item?.category,
      id: item?._id,
    }));
    setCategoryList(categoryName);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreviewimage(URL.createObjectURL(file));
    setBlog({ ...blog, blogimage: file });
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("category", blog.category);
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append("blogimage", blog.blogimage);
    formData.append("othercontent", othercontent);

    await axios({
      method: "POST",
      url: `${ApiUrl}/blog/add`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    }).then((response) => {
      if (response.status === 200) {
        toast.success("card added");
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      navigate("/blog");
    });

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <Form onSubmit={handleCreateCard}>
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
                    <option value={blog.category}>Select Card Category</option>
                    {categoryList?.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e?.category}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom05">
                  <Form.Label className="single-product-label">
                    Featured Image
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

                  <div className="uploadCard__images">
                    <div className="card">
                      <img alt="" src={previewImage} />
                    </div>
                  </div>
                </Form.Group>
              </Row>
              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label className="single-product-label">
                  Blog Title
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Blog title"
                  draggable="true"
                  value={blog.title}
                  onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                />
              </Form.Group>
              <Row className="">
                {" "}
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Blog Description
                  </Form.Label>
                  <textarea
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Blog Description"
                    draggable="true"
                    className="faq__descriptionField"
                    value={blog.description}
                    onChange={(e) =>
                      setBlog({ ...blog, description: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Blog Content
                  </Form.Label>

                  <RichTextEditor
                    value={othercontent}
                    onChange={(e) => setOtherContent(e)}
                  />
                </Form.Group>
              </Row>
              <button
                variant="primary"
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
              >
                Submit
              </button>
              <ToastContainer />
            </Form>
          </Row>
        </PageLayout>
      )}
    </>
  );
}
