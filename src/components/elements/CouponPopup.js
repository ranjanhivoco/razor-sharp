/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useEffect, useRef, useState } from "react";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import {
  hostedCategoryAxios,
  hostedCouponAxios,
  hostedSellerProductAxios,
} from "../../backendAxios/backendAxios";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import { Multiselect } from "multiselect-react-dropdown";
import PercentIcon from "@mui/icons-material/Percent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Editor } from "@tinymce/tinymce-react";
import RichTextEditor from "../RichTextEditor";

const today = new Date().toISOString().split("T")[0];

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [select, setSelect] = useState([]);
  const { openPopup, closePopup } = props;
  const dateInputRef = useRef(null);
  const [amount, setAmount] = useState("");
  const [code, setCode] = useState("");
  const [expireDate, setExpireDate] = useState(today);
  const [forAll, setforAll] = useState(true);
  const [specificProduct, setspecificProduct] = useState(false);
  const [specificCategory, setspecificCategory] = useState(false);
  const [isPercentage, setisPercentage] = useState(false);
  const [fixedDiscount, setfixedDiscount] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [message, setMessage] = useState("");

  let categoryName = selected[0]?.slug;
  console.log(categoryName, "sele");

  useEffect(() => {
    if (categoryName) {
      getAllProduct();
    }

    getAllCategory();
  }, [categoryName]);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (message.length === 0) {
      toast.error("please add coupon description");
    } else {
      const result = await hostedCouponAxios.post(
        "/generate-coupon-superadmin",
        {
          forAll,
          specificProduct,
          specificCategory,
          isPercentage,
          fixedDiscount,
          amount: Math.round(Math.abs(amount)),
          code,
          message,
          expireDate,
          subcategory: selected,
          products: select,
        },
        {
          headers: authHeader(),
        }
      );
      closePopup();
      toast.success(`${result?.data?.code} coupon has created successfully !`);
      setInterval(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleCouponType = (e) => {
    const targetValue = e.target.value;
    if (targetValue === "forAll") {
      setforAll(true);
      setspecificCategory(false);
      setspecificProduct(false);
    }
    if (targetValue === "specificProduct") {
      setspecificProduct(true);
      setforAll(false);
      setspecificCategory(false);
    }
    if (targetValue === "specificCategory") {
      setspecificCategory(true);
      setforAll(false);
      setspecificProduct(false);
    }
  };

  const getAllCategory = async () => {
    const result = await hostedCategoryAxios.get("/getsubcategorylist");
    const categoryName = result?.data?.map((item) => ({
      subCategory: item?.subCategory,
      id: item?._id,
      slug: item?.slug,
    }));
    setCategoryList(categoryName);
    console.log(result?.data);
  };

  const getAllProduct = async () => {
    const result = await hostedSellerProductAxios.get(
      `/allproduct-by-subcategory-coupon/${categoryName}`
    );
    const productName = result?.data?.products?.map((item) => ({
      productName: item?.title,
      id: item?._id,
    }));
    setProductList(productName);
    console.log(result?.data);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={openPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form onSubmit={handleCreateCoupon}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Coupon Type
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField"
                    onChange={handleCouponType}
                  >
                    <option value="forAll">For All</option>
                    <option value="specificCategory">
                      {" "}
                      For Specific Category
                    </option>
                    <option value="specificProduct">
                      {" "}
                      For Specific Product
                    </option>
                  </select>
                </Form.Group>
              </Row>
              {specificCategory === true ? (
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    style={{ position: "relative" }}
                    controlId="validationCustom06"
                  >
                    <Form.Label>Sub-Category</Form.Label>
                    <Multiselect
                      options={categoryList}
                      isObject={true}
                      value={selected}
                      onSelect={(e) =>
                        setSelected([
                          ...e?.map((i) => ({
                            scID: i.id,
                            title: i.subCategory,
                            slug: i.slug,
                          })),
                        ])
                      }
                      placeholder="Select sub-category..."
                      displayValue="subCategory"
                    />
                  </Form.Group>
                </Row>
              ) : (
                ""
              )}
              {specificProduct === true ? (
                <Col>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      style={{ position: "relative" }}
                      controlId="validationCustom06"
                    >
                      <Form.Label>Sub-Category</Form.Label>
                      <Multiselect
                        options={categoryList}
                        isObject={true}
                        // value={selected}
                        onSelect={(e) =>
                          setSelected([
                            ...e?.map((i) => ({
                              scID: i.id,
                              title: i.subCategory,
                              slug: i?.slug,
                            })),
                          ])
                        }
                        placeholder="Select sub-category..."
                        displayValue="subCategory"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom07">
                      <Form.Label>Products</Form.Label>
                      <Multiselect
                        options={productList}
                        isObject={true}
                        value={select}
                        onSelect={(e) => setSelect([...e?.map((i) => i.id)])}
                        placeholder="Select products..."
                        displayValue="productName"
                      />
                    </Form.Group>
                  </Row>
                </Col>
              ) : (
                ""
              )}
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className=""
                  controlId="validationCustom03"
                >
                  <Form.Label>Coupon Code</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="name"
                    placeholder="Enter Coupon Code"
                    draggable="true"
                    value={code}
                    onChange={(e) =>
                      // setCoupon({ ...coupon, code: e.target.value })
                      setCode(e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="validationCustom04"
                  className="position-relative"
                >
                  <Form.Label>Amount</Form.Label>

                  <span
                    style={{
                      position: "absolute",
                      right: "22px",
                      top: "40px",
                      color: "#626262",
                    }}
                  >
                    {" "}
                    {fixedDiscount ? <AttachMoneyIcon /> : ""}{" "}
                  </span>

                  <Form.Control
                    required
                    autoComplete="off"
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) =>
                      // setCoupon({ ...coupon, amount: e.target.value })
                      setAmount(e.target.value)
                    }
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: "22px",
                      top: "40px",
                      color: "#626262",
                    }}
                  >
                    {" "}
                    {isPercentage ? <PercentIcon /> : ""}{" "}
                  </span>
                </Form.Group>

                <div style={{ textAlign: "right" }}>
                  {specificProduct ? (
                    <>
                      <input
                        type="checkbox"
                        id="Fixed"
                        name="Fixed"
                        value="Fixed"
                        checked={fixedDiscount}
                        onChange={(e) => {
                          setfixedDiscount(e.target.checked);
                          setisPercentage(!isPercentage);
                        }}
                      />
                      <label for="Fixed Discount">&nbsp; Fixed Discount</label>
                    </>
                  ) : (
                    ""
                  )}

                  <span>&nbsp; &nbsp;</span>
                  <input
                    type="checkbox"
                    id="percentage"
                    name="percentage"
                    checked={isPercentage}
                    value="Percentage"
                    onChange={(e) => {
                      setisPercentage(e.target.checked);
                      setfixedDiscount(!fixedDiscount);
                    }}
                  />
                  <label for="Percentage">&nbsp; Percentage</label>
                </div>
              </Row>

              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label className="single-product-label">
                  Coupon Description
                </Form.Label>

                <RichTextEditor
                  value={message}
                  onChange={(e) => {
                    setMessage(e);
                  }}
                />
              </Form.Group>

              <Row className="mb-3 mt-1">
                <Form.Group as={Col}>
                  <Form.Label>Expire date</Form.Label>
                   
                  <input
                    style={{
                      display: "block",
                      border: "1px solid #dbd1d1",
                      height: "39px",
                      width: "40%",
                      borderRadius: "6px",
                      padding: "8px",
                    }}
                    type="date"
                    onChange={(e) => setExpireDate(e.target.value)}
                    ref={dateInputRef}
                    min={today}
                  />
                </Form.Group>
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
