/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import {
  hostedSellerProductAxios,
  hostedCategoryAxios,
} from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Box, Label, Icon, Input } from "../elements";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import RichTextEditor from "../RichTextEditor";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const ApiUrl = "http://localhost:4001/sellerProduct";
const ApiUrl = "http://localhost:3000/sellerProduct";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [childCategoryList, setChildSubCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [cateId, setCateId] = useState();
  const [subCateId, setSubCateId] = useState();
  const [brandList, setBrandList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [postImage, setPostImage] = useState([]);
  const [popup, setPopup] = useState({
    title: "",
    description: "",
    price: "",
    sku: "",
    weight: Number,
    upccode: "",
    stock: "",
    category: "",
    subcategory: "",
    childcategory: "",
    status: "false",
    salesprice: "",
    brand: "",
    model: "",
    color: "",
    height: Number,
    length: Number,
    width: Number,
    type: "",
    slug: "",
    metatitle: "",
    metadescription: "",
    metakeyword: "",
    weightUnit: "",
    video: "",
    dimUnit: "",
    images: [],
    brandrequest: false,
    otherbrand: "",
    featured: false,
    exclusive: false,
    toprated: false,
    bestseller: false,
    todaydeal: false,
  });
  // const [formattedDescription, setFormattedDescription] = useState("");

  const { editInventoryPopup, closePopup, updatedIventoryId } = props;

  // useEffect(() => {
  //   getAllCategoryList();
  //   getAllbrandsList();
  //   if (updatedIventoryId) {
  //     prefillProductData();
  //   }
  //   if (cateId) {
  //     getSubCategoryList();
  //   }
  //   if (subCateId) {
  //     getAttributeList();
  //   }
  // }, [updatedIventoryId, cateId, subCateId]);

  const getAllCategoryList = async () => {
    const result = await hostedCategoryAxios.get("/getallcategory", {
      headers: authHeader(),
    });
    setCategoryList(result?.data);
  };

  const getSubCategoryList = async () => {
    const result = await hostedCategoryAxios.get(
      `/getSubCategoryBycategoryId/${cateId}`,
      {
        headers: authHeader(),
      }
    );
    setSubCategoryList(
      result?.data?.map((item) => ({
        subCategory: item?.subCategory,
        id: item?._id,
      }))
    );
  };

  const getAttributeList = async () => {
    const result = await hostedCategoryAxios.get(
      `/getattributesbysubcategory/${subCateId}`
    );
    let fixedAttribute = result?.data[0]?.values;
    setChildSubCategoryList(fixedAttribute);
  };

  const getAllbrandsList = async () => {
    await hostedCategoryAxios.get("/getallbrand").then((response) => {
      setBrandList(response.data);
    });
  };

  const handleProductCategory = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    setCateId(selectedOption?.value);
    setPopup({ ...popup, category: selectedOption.text });
  };

  const handleSubCategoryList = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    setSubCateId(selectedOption?.value);
    setPopup({ ...popup, subcategory: selectedOption.text });
  };

  const prefillProductData = async () => {
    const result = await hostedSellerProductAxios.get(
      `/product-by-productid/${updatedIventoryId}`,
      {
        header: authHeader(),
      }
    );
    setPopup({
      ...popup,
      category: result?.data?.category,
      subcategory: result?.data?.subcategory,
      childcategory: result?.data?.childcategory,
      type: result?.data?.type,
      title: result?.data?.title,
      slug: result?.data?.slug,
      price: result?.data?.price,
      stock: result?.data?.stock,
      status: result?.data?.status,
      sku: result?.data?.sku,
      weight: result?.data?.weight,
      upccode: result?.data?.upccode,
      description: result?.data?.description,
      salesprice: result?.data?.salesprice,
      brand: result?.data?.brand,
      model: result?.data?.model,
      color: result?.data?.color,
      height: result?.data?.height,
      length: result?.data?.length,
      width: result?.data?.width,
      featured: result?.data?.featured,
      exclusive: result?.data?.exclusive,
      toprated: result?.data?.toprated,
      bestseller: result?.data?.bestseller,
      todaydeal: result?.data?.todaydeal,
      images: result?.data?.images,
      metatitle: result?.data?.metatitle,
      metadescription: result?.data?.metadescription,
      metakeyword: result?.data?.metakeyword,
      weightUnit: result?.data?.weightUnit,
      dimUnit: result?.data?.dimUnit,
      video: result?.data?.video,
    });
  };

  const handleMultipleImages = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("img", file);

      // Send the formData to the API endpoint
      const result = await axios.post(
        "http://localhost:3000/common/url-generator",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPopup((prev) => ({
        ...prev,
        images: [...(prev.images || []), result.data.url],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...(popup?.images || []), ...(selectedFiles || [])];
    updatedImages.splice(index, 1);
    if (index < (popup?.images || []).length) {
      setPopup((prevPopup) => ({
        ...prevPopup,
        images: updatedImages.slice(0, (popup?.images || []).length),
      }));
    } else {
      setSelectedFiles(updatedImages.slice((popup?.images || []).length));
    }
  };

  const handleBrandChange = (e) => {
    const brandname = e.target.value;
    setPopup({ ...popup, brand: brandname });
    if (brandname === "other") {
      setPopup({ ...popup, newBrandRequest: true });
    }
  };

  const updateproduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("title", popup.title);
    formData.append("description", popup.description);
    formData.append("price", popup.price);
    formData.append("weight", popup.weight === null ? "" : popup.weight);
    formData.append("upccode", popup.upccode);
    formData.append("stock", popup.stock);
    formData.append("category", popup.category);
    formData.append("subcategory", popup.subcategory);
    formData.append("type", popup.type);
    formData.append("status", popup.status);
    formData.append("brandrequest", popup.brandrequest);
    formData.append("salesprice", popup.salesprice);
    formData.append("brand", popup.brand);
    formData.append("otherbrand", popup.otherbrand);
    formData.append("model", popup.model);
    formData.append("color", popup.color);
    formData.append("height", popup.height === null ? "" : popup.height);
    formData.append("length", popup.length === null ? "" : popup.length);
    formData.append("width", popup.width === null ? "" : popup.width);
    popup.images.forEach((file) => {
      formData.append(`images`, file);
    });
    await axios({
      method: "PUT",
      url: `${ApiUrl}/update/${updatedIventoryId}`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Product added successfully");
        }
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(popup.images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    setPopup({ ...popup, images: reorderedImages });
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog
          open={editInventoryPopup}
          onClose={closePopup}
          fullScreen={true}
        >
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form onSubmit={updateproduct} className="add-single-product">
              <Row className="mb-3">
                <Form.Group
                  className="col-md-6"
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label">
                    Product Category
                  </Form.Label>
                  <select
                    className="singleProductwidth__dropdownField"
                    value={popup?.category}
                    onChange={handleProductCategory}
                  >
                    <option
                      className="field__optionDropdown"
                      style={{ fontSize: "12px" }}
                    >
                      {popup?.category}
                    </option>
                    {categoryList?.map((e) => {
                      return (
                        <option key={e._id} id={e._id} value={e._id}>
                          {e?.category}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>

                <Form.Group
                  className="col-md-6"
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Product Sub-Category
                  </Form.Label>
                  <select
                    className="singleProductwidth__dropdownField"
                    value={popup?.subcategory}
                    onChange={handleSubCategoryList}
                  >
                    <option
                      className="field__optionDropdown"
                      style={{ fontSize: "12px" }}
                    >
                      {popup?.subcategory}
                    </option>
                    {subCategoryList?.map((e) => {
                      return (
                        <option key={e.id} id={e.id} value={e.id}>
                          {e?.subCategory}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  className="col-md-6"
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Product Child Category
                  </Form.Label>
                  <select
                    className="singleProductwidth__dropdownField"
                    value={popup.type}
                    onChange={(e) =>
                      setPopup({ ...popup, type: e.target.value })
                    }
                  >
                    <option
                      className="field__optionDropdown"
                      style={{ fontSize: "12px" }}
                    >
                      {popup?.type}
                    </option>
                    {childCategoryList?.map((e) => {
                      return (
                        <option key={e} id={e} value={e}>
                          {e}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
                <Form.Group className="col-md-6" controlId="validationCustom01">
                  <Form.Label className="single-product-label">
                    Product Name
                  </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Product Name"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.title}
                    onChange={(e) =>
                      setPopup({ ...popup, title: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group className="col-md-6" controlId="validationCustom08">
                  <Form.Label className="single-product-label">
                    Price
                  </Form.Label>
                  <Form.Control
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

                <Form.Group className="col-md-6" controlId="validationCustom10">
                  <Form.Label className="single-product-label">
                    Sale price
                  </Form.Label>
                  <Form.Control
                    type="number"
                    autoComplete="off"
                    placeholder="Enter Sale Price"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.salesprice}
                    onChange={(e) =>
                      setPopup({ ...popup, salesprice: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  className="col-md-6"
                  controlId="validationCustom04"
                  style={{ position: "relative" }}
                >
                  <Form.Label className="single-product-label">
                    Product status
                  </Form.Label>

                  <select
                    className="singleProductwidth__dropdownField"
                    onChange={(e) =>
                      setPopup({ ...popup, status: e.target.value })
                    }
                    value={popup?.status}
                  >
                    <option value="true">Active</option>
                    <option value="false">Unactive</option>
                  </select>
                </Form.Group>

                <Form.Group className="col-md-6" controlId="validationCustom09">
                  <Form.Label className="single-product-label">SKU</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Product Sku"
                    draggable="true"
                    className="singleProduct__inputField disbaled_field"
                    disabled
                    value={popup.sku}
                    // onChange={(e) =>
                    //   setPopup({ ...popup, sku: e.target.value })
                    // }
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="col-md-6" controlId="validationCustom10">
                  <Form.Label className="single-product-label">
                    UPC code
                  </Form.Label>
                  <Form.Control
                    type="number"
                    autoComplete="off"
                    placeholder="Enter Upc Code"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.upccode}
                    onChange={(e) =>
                      setPopup({ ...popup, upccode: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group
                  className="col-md-6 mt-4"
                  controlId="validationCustom12"
                >
                  <Form.Label className="single-product-label">
                    Stock
                  </Form.Label>
                  <Form.Control
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

              <Row className="mb-3">
                <Form.Group
                  className="col-md-6"
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label">
                    Brand
                  </Form.Label>
                  <select
                    className="singleProductwidth__dropdownField"
                    onChange={handleBrandChange}
                    value={popup.brand}
                  >
                    <option
                      className="field__optionDropdown"
                      style={{ fontSize: "12px" }}
                    >
                      Select Brand
                    </option>
                    {brandList?.map((brand, index) => (
                      <option key={index} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  {popup.newBrandRequest ? (
                    <Form.Group
                      className="col-md-12"
                      controlId="validationCustom11"
                    >
                      <Form.Label className="single-product-label">
                        Other Brand
                      </Form.Label>
                      <Form.Control
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your Brand"
                        draggable="true"
                        className="singleProduct__inputField"
                        value={popup.newBrand}
                        onChange={(e) =>
                          setPopup({ ...popup, newBrand: e.target.value })
                        }
                      />
                    </Form.Group>
                  ) : (
                    ""
                  )}
                </Form.Group>

                <Form.Group className="col-md-6" controlId="validationCustom10">
                  <Form.Label className="single-product-label">
                    Model
                  </Form.Label>
                  <Form.Control
                    type="number"
                    autoComplete="off"
                    placeholder="Enter Model Number"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.model}
                    onChange={(e) =>
                      setPopup({ ...popup, model: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <div className="col-md-6 position-relative">
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
                    {/* <div className="uploadProduct__images d-flex">
                      {(popup?.images || [])
                        .filter((url) => url !== "NA" && url !== "")
                        .map((url, index) => (
                          <div className="card">
                            <img
                              style={{ height: "150px" }}
                              alt=""
                              src={`${url}`}
                            />
                            <CloseIcon
                              className="productImage__cross"
                              onClick={() => handleRemoveImage(index)}
                            />
                          </div>
                        ))}
                    </div> */}
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="droppable-images">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginTop: "10px",
                              flexWrap: "wrap",
                              width: "600px", // Fixed width
                              height: "100px", // Fixed height
                              overflow: "auto", // Allow scrolling if necessary
                            }}
                            className="uploadProduct__images d-flex"
                          >
                            {popup?.images.map((image, index) => (
                              <Draggable
                                key={image}
                                draggableId={image}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      // position: "relative",
                                      width: "100px", // Fixed width for draggable items
                                      height: "100px",
                                      margin: "0", // Remove margin to prevent overflow
                                      padding: "10px",
                                    }}
                                    className="card"
                                  >
                                    <img
                                      src={image}
                                      alt={`Product ${index}`}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                    />
                                    <CloseIcon
                                      className="productImage__cross"
                                      onClick={() => handleRemoveImage(index)}
                                      style={{
                                        position: "absolute",
                                        top: "5px",
                                        right: "5px",
                                        cursor: "pointer",
                                        backgroundColor: "#fff",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Form.Group>
                </div>
                <Form.Group className="col-md-6" controlId="validationCustom10">
                  <Form.Label className="single-product-label">
                    Video
                  </Form.Label>
                  <Form.Control
                    type="url"
                    pattern="https://.*"
                    placeholder="https://example.com"
                    autoComplete="off"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.video}
                    onChange={(e) =>
                      setPopup({ ...popup, video: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="col-md-6" controlId="validationCustom10">
                  <Form.Label className="single-product-label">
                    Color
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Product Color"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.color}
                    onChange={(e) =>
                      setPopup({ ...popup, color: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="validationCustom01">
                  <Form.Label className="single-product-label">
                    Product Slug
                  </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Product Slug"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.slug}
                    onChange={(e) =>
                      setPopup({ ...popup, slug: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group className="col-md-6" controlId="validationCustom11">
                  <Form.Label className="single-product-label">
                    Height
                  </Form.Label>
                  <div style={{ display: "flex", gap: "4px", width: "82%" }}>
                    <Form.Control
                      type="number"
                      autoComplete="off"
                      placeholder="Enter Product Height"
                      draggable="true"
                      className="singleProduct__inputField"
                      value={popup.height}
                      onChange={(e) =>
                        setPopup({ ...popup, height: e.target.value })
                      }
                    />
                    <select
                      className="singleProduct__dropdownField"
                      onChange={(e) =>
                        setPopup({
                          ...popup,
                          dimUnit: e.target.value,
                        })
                      }
                      value={popup.dimUnit}
                      style={{ width: "15%" }}
                    >
                      <option>cm</option>
                      <option>m</option>
                      <option>Inches</option>
                    </select>
                  </div>
                </Form.Group>
                <Form.Group className="col-md-6" controlId="validationCustom11">
                  <Form.Label className="single-product-label">
                    Weight
                  </Form.Label>
                  <div style={{ display: "flex", gap: "4px", width: "82%" }}>
                    <Form.Control
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
                    <select
                      className="singleProduct__dropdownField"
                      value={popup.weightUnit}
                      onChange={(e) => {
                        setPopup({ ...popup, weightUnit: e.target.value });
                      }}
                      style={{ width: "15%" }}
                    >
                      <option>gram</option>
                      <option>kilogram</option>
                      <option>milligram</option>
                      <option>pound</option>
                      <option>ounce</option>
                      <option>lbs</option>
                    </select>
                  </div>
                </Form.Group>
              </Row>

              <Row className="mb-3 ">
                <Form.Group className="col-md-6" controlId="validationCustom10">
                  <Form.Label className="single-product-label">
                    Length
                  </Form.Label>
                  <div style={{ display: "flex", gap: "4px", width: "82%" }}>
                    <Form.Control
                      type="number"
                      autoComplete="off"
                      placeholder="Enter Product Length"
                      draggable="true"
                      className="singleProduct__inputField"
                      value={popup.length}
                      onChange={(e) =>
                        setPopup({ ...popup, length: e.target.value })
                      }
                    />
                    <select
                      className="singleProduct__dropdownField"
                      onChange={(e) =>
                        setPopup({
                          ...popup,
                          dimUnit: e.target.value,
                        })
                      }
                      value={popup.dimUnit}
                      style={{ width: "15%" }}
                    >
                      <option>cm</option>
                      <option>m</option>
                      <option>Inches</option>
                    </select>
                  </div>
                </Form.Group>
                <Form.Group className="col-md-6" controlId="validationCustom11">
                  <Form.Label className="single-product-label">
                    Width
                  </Form.Label>
                  <div style={{ display: "flex", gap: "4px", width: "82%" }}>
                    <Form.Control
                      type="number"
                      autoComplete="off"
                      placeholder="Enter Product Width"
                      draggable="true"
                      className="singleProduct__inputField"
                      value={popup.width}
                      onChange={(e) =>
                        setPopup({ ...popup, width: e.target.value })
                      }
                    />
                    <select
                      className="singleProduct__dropdownField"
                      onChange={(e) =>
                        setPopup({
                          ...popup,
                          dimUnit: e.target.value,
                        })
                      }
                      value={popup.dimUnit}
                      style={{ width: "15%" }}
                    >
                      <option>cm</option>
                      <option>m</option>
                      <option>Inches</option>
                    </select>
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3 ">
                <Form.Group className="col-md-6" controlId="validationCustom11">
                  <Form.Label className="single-product-label">
                    Meta title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    placeholder="Enter meta title"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.metatitle}
                    onChange={(e) =>
                      setPopup({ ...popup, metatitle: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="col-md-6" controlId="validationCustom10">
                  <Form.Label className="single-product-label">
                    Meta Description
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    placeholder="Enter meta description"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.metadescription}
                    onChange={(e) =>
                      setPopup({ ...popup, metadescription: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mb-5">
                <Form.Group className="col-md-6" controlId="validationCustom11">
                  <Form.Label className="single-product-label">
                    Meta Keyword
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    placeholder="Enter meta keyword"
                    draggable="true"
                    className="singleProduct__inputField"
                    value={popup.metakeyword}
                    onChange={(e) =>
                      setPopup({ ...popup, metakeyword: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3 editProduct__checkbox">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={popup.featured}
                    onChange={(e) =>
                      setPopup({ ...popup, featured: e.target.checked })
                    }
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Add to Featured Products
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={popup.exclusive}
                    onChange={(e) =>
                      setPopup({ ...popup, exclusive: e.target.checked })
                    }
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Add to Exclusive Products
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={popup.toprated}
                    onChange={(e) =>
                      setPopup({ ...popup, toprated: e.target.checked })
                    }
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Add to Top-Rated Products
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={popup.bestseller}
                    onChange={(e) =>
                      setPopup({ ...popup, bestseller: e.target.checked })
                    }
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Add to Best-Seller
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={popup.todaydeal}
                    onChange={(e) =>
                      setPopup({ ...popup, todaydeal: e.target.checked })
                    }
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Deal of the Day
                  </label>
                </div>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  className="col-md-10"
                  controlId="validationCustom03"
                >
                  <Form.Label className="single-product-label">
                    Description
                  </Form.Label>

                  <RichTextEditor
                    value={popup?.description}
                    onChange={(e) => setPopup({ ...popup, description: e })}
                  />
                </Form.Group>
              </Row>
              <ToastContainer />

              <button
                variant="primary"
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{
                  width: "20%",
                  height: "50px",
                  marginLeft: "33%",
                }}
              >
                Submit
              </button>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
