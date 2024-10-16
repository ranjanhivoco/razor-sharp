/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Box, Input, Label, Icon } from "../elements";
import { Editor } from "@tinymce/tinymce-react";
import RichTextEditor from "../RichTextEditor";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [cateId, setCateId] = useState();
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productStatus, setProductStatus] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [popup, setPopup] = useState({
    productName: "",
    description: "",
    images: "",
    price: "",
    sku: "",
    weight: "",
    sellerName: "",
    upcCode: "",
    stock: "",
  });

  const { openProductPopup, closePopup } = props;

  // useEffect(() => {
  //   // getCsvCategory();
  //   getAllCategoryList();
  //   if (cateId) {
  //     getSubCategoryList();
  //   }
  // }, [cateId]);

  // const getCsvCategory = async () => {
  //   const result = await hostedCategoryAxios.get(`/find-all-subcategory`);
  //   setPopup({ ...popup, cats: result?.data });
  // };

  const getAllCategoryList = async () => {
    const result = await hostedCategoryAxios.get("/getallcategory", {
      headers: authHeader(),
    });
    setCategoryList(result?.data);
  };

  const getSubCategoryList = async () => {
    const result = await hostedCategoryAxios.get(`/subcategory/${cateId}`, {
      headers: authHeader(),
    });
    setSubCategoryList(result?.data[0].subCategory);
  };

  const handleProductCategory = (e) => {
    setProductCategory(e.target.value);
    setCateId(e.target.value);
  };

  const handleSubCategoryList = (e) => {
    setSubCategoryList(e.target.value);
  };

  const handleProductStatus = (e) => {
    setProductStatus(e.target.value);
  };

  const handleMultipleImages = (e) => {
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject?.map((file) => {
      return setSelectedFiles((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };

  const removeSingleImage = (index) => {
    const newFiles = [...selectedFiles];
    newFiles?.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={openProductPopup} onClose={closePopup} fullScreen={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form
              // onSubmit={handleCreateDropshipper}
              className="add-single-product"
            >
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label">
                    Product Category
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField"
                    onChange={handleProductCategory}
                  >
                    <option
                      className="field__optionDropdown"
                      value={productCategory}
                      style={{ fontSize: "12px" }}
                    >
                      Select Product Category
                    </option>

                    {categoryList?.map((e) => {
                      return (
                        <option key={e._id} id={e._id} value={e._id}>
                          {e.category}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Product Sub-Category
                  </Form.Label>
                  <select className="singleProduct__dropdownField">
                    <option
                      className="field__optionDropdown"
                      value={subCategoryList}
                      onChange={handleSubCategoryList}
                      style={{ fontSize: "12px" }}
                    >
                      Select Product Sub-category
                    </option>
                    {subCategoryList?.map((e) => {
                      return (
                        <option key={e.id} id={e.id} value={e.value}>
                          {e}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label className="single-product-label">
                    Product Name
                  </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Product name"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.productName}
                    onChange={(e) =>
                      setPopup({ ...popup, productName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label className="single-product-label">
                    Seller Name
                  </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Seller Name"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.sellerName}
                    onChange={(e) =>
                      setPopup({ ...popup, sellerName: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Description
                  </Form.Label>

                  <RichTextEditor
                    value={popup.description}
                    onChange={(e) =>
                      setPopup({ ...popup, description: e.target.value })
                    }
                  />
                </Form.Group>

                <div className="col-md-6">
                  <Form.Group as={Col} controlId="validationCustom05">
                    <Form.Label className="single-product-label">
                      Product Images
                    </Form.Label>
                    <Box className={`mc-file-upload`}>
                      <Input
                        multiple
                        type="file"
                        id="avatar"
                        onChange={handleMultipleImages}
                      />
                      <Label htmlFor="avatar">
                        <Icon>{"add"}</Icon>
                      </Label>
                    </Box>

                    <div className="uploadProduct__images">
                      {selectedFiles?.map((url, index) => {
                        return (
                          <div className="card">
                            <img alt="" src={url} />
                            <CloseIcon
                              className="productImage__cross"
                              onClick={removeSingleImage.bind(null, index)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Form.Group>
                </div>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  controlId="validationCustom04"
                  style={{ position: "relative" }}
                >
                  <Form.Label className="single-product-label">
                    Product status
                  </Form.Label>

                  <select
                    className="singleProduct__dropdownField"
                    onChange={handleProductStatus}
                  >
                    <option
                      className="field__optionDropdown"
                      value={productStatus}
                      style={{ fontSize: "12px" }}
                    >
                      --Please choose an option--
                    </option>
                    <option value="active">Active</option>
                    <option value="unactive">Unactive</option>
                  </select>
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom09">
                  <Form.Label className="single-product-label">SKU</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Product Sku"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.sku}
                    onChange={(e) =>
                      setPopup({ ...popup, sku: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom08">
                  <Form.Label className="single-product-label">
                    Price
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    autoComplete="off"
                    placeholder="Enter Product Price"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.price}
                    onChange={(e) =>
                      setPopup({ ...popup, price: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom10">
                  <Form.Label className="single-product-label">
                    UPC code
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    autoComplete="off"
                    placeholder="Enter Upc Code"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.upcCode}
                    onChange={(e) =>
                      setPopup({ ...popup, upcCode: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom11">
                  <Form.Label className="single-product-label">
                    Weight
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    autoComplete="off"
                    placeholder="Enter Product Weight"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.weight}
                    onChange={(e) =>
                      setPopup({ ...popup, weight: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom12">
                  <Form.Label className="single-product-label">
                    Stock
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    autoComplete="off"
                    placeholder="Enter Product Stock"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.stock}
                    onChange={(e) =>
                      setPopup({ ...popup, stock: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <ToastContainer />
            </Form>
            <button
              variant="primary"
              type="submit"
              className="mt-4 btn btn-outline-warning btn-md text-black"
              style={{ marginLeft: "30%", width: "40%" }}
            >
              Submit
            </button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
