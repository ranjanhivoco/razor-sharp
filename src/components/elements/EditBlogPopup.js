import React, { useState, useEffect } from "react";
import { hostedPagesAxios } from "../../backendAxios/backendAxios";
import "react-toastify/dist/ReactToastify.css";
import { LoaderProvider } from "../../context/Preloader";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Box, Input, Label, Icon } from "../elements";
import Row from "react-bootstrap/Row";
import { Editor } from "@tinymce/tinymce-react";
import authHeader from "../../backendAxios/authHeader";
import PageLayout from "../../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../backendAxios/backendAxios";
import axios from "axios";
import RichTextEditor from "../RichTextEditor";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

export default function EditFaq(props) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [previewImage, setPreviewimage] = useState();
  const [othercontent, setOtherContent] = useState();
  const [blog, setBlog] = useState({
    category: "",
    title: "",
    description: "",
    blogimage: "",
  });
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    if (query.get("blog_id")) {
      prefillBlogData();
    }
  }, [query.get("blog_id")]);

  const prefillBlogData = async () => {
    await hostedPagesAxios
      .get(`/blog/get/${query.get("blog_id")}`)
      .then((response) => {
        if (response.status === 200) {
          setBlog({
            ...blog,
            category: response?.data?.blog?.category.category,
            title: response?.data?.blog?.title,
            description: response?.data?.blog?.description,
            blogimage: response?.data?.blog?.blogimage,
          });
          setOtherContent(response?.data?.blog?.othercontent);
        }
      });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreviewimage(URL.createObjectURL(file));
    setBlog({ ...blog, blogimage: file });
  };

  // const handleSelectField = (e) => {
  //   setFaq({ category: e.target.value });
  // };

  // const updateFaq = async (e) => {
  //   e.preventDefault();
  //   await hostedPagesAxios
  //     .put(`/faq/update-question/${query.get("blog_id")}`, faq, {
  //       headers: authHeader(),
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         toast.success("Faq updated successfully");
  //       }
  //     });
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 2000)
  // };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    // setLoading(true);
    var formData = new FormData();
    // formData.append("category", blog.category);
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append("blogimage", blog.blogimage);
    formData.append("othercontent", othercontent);

    await axios({
      method: "PUT",
      url: `${ApiUrl}/blog/update/${query.get("blog_id")}`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    }).then((response) => {
      if (response.status === 200) {
        toast.success("card added");
        navigate("/blog");
      }
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    });
    // .catch((err) => {
    //   if (err.response.status === 500) {
    //     toast.error(`${err.response.data.error}`);
    //   }
    // });

    // setLoading(false);
  };

  // const handleUpdateBlog = async (e) => {
  //   e.preventDefault();
  //   await hostedPagesAxios
  //     .put(
  //       `/blog/update/${query.get("blog_id")}`,
  //       {
  //         title: blog.title,
  //         description: blog.description,
  //         blogimage: blog.blogimage,
  //         othercontent: othercontent,
  //       },
  //       { headers: authHeader() }
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         toast.success("card added");
  //         navigate("/blog");
  //       }
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //     });
  // };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <Form onSubmit={handleUpdateBlog}>
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
                    className="singleProduct__dropdownField disbaled_field"
                    disabled

                    // onChange={handleCardCategory}
                  >
                    <option value={blog.category}>{blog?.category}</option>
                    {/* {categoryList?.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e?.category}
                  </option>
                );
              })} */}
                  </select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom05">
                  <Form.Label className="single-product-label disbaled_field">
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

                  {previewImage ? (
                    <div className="uploadCard__images">
                      <div className="card">
                        <img alt="" src={previewImage} />
                      </div>
                    </div>
                  ) : (
                    <div className="uploadCard__images">
                      <div className="card">
                        <img alt="" src={`${blog.blogimage}`} />
                      </div>
                    </div>
                  )}
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
