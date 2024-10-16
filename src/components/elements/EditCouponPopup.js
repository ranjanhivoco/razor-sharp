/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
import React, { useState, useEffect, useRef } from "react";
import {
  hostedCategoryAxios,
  hostedCouponAxios,
  hostedSellerProductAxios,
} from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
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
  const [amount, setAmount] = useState();
  const [code, setCode] = useState("");
  const [expireDate, setExpireDate] = useState(today);
  const [forAll, setforAll] = useState(false);
  const [specificProduct, setspecificProduct] = useState(false);
  const [specificCategory, setspecificCategory] = useState(false);
  const [isPercentage, setisPercentage] = useState(false);
  const [fixedDiscount, setfixedDiscount] = useState(false);
  const dateInputRef = useRef(null);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [message, setMessage] = useState();
  const { editCouponPopup, closePopup, updateCouponId } = props;

  useEffect(() => {
    if (updateCouponId) {
      prefillCouponData();
    }
    getAllProduct();
    getAllCategory();
  }, [updateCouponId]);

  const prefillCouponData = async () => {
    const result = await hostedCouponAxios.get(
      `getCouponById/${updateCouponId}`,
      {
        headers: authHeader(),
      }
    );
    setCode(result?.data?.code);
    setAmount(result?.data?.amount);
    setMessage(result?.data?.message);
    setExpireDate(result?.data?.expireDate);
    setisPercentage(result?.data?.isPercentage);
    setfixedDiscount(result?.data?.fixedDiscount);
    setforAll(result?.data?.forAll);
    setspecificProduct(result?.data?.specificProduct);
    setspecificCategory(result?.data?.specificCategory);
    setSelected(result?.data?.subcategory);
    setSelect(result?.data?.products);
  };

  const updateCouponData = async (e) => {
    e.preventDefault();
    const result = await hostedCouponAxios.put(
      `/edit-coupon-by-super/${updateCouponId}`,
      {
        isPercentage,
        fixedDiscount,
        amount: Math.round(Math.abs(amount)),
        code,
        expireDate,
        products: select,
        subcategory: selected,
        message: message,
      },
      {
        headers: authHeader(),
      }
    );
    closePopup();
    toast.success(`${result?.data?.code} coupon has updated successfully !`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  const getAllProduct = async () => {
    const result = await hostedSellerProductAxios.get("/getallproduct");
    const productName = result?.data?.product?.map((item) => ({
      title: item?.title,
      _id: item?._id,
    }));
    setProductList(productName);
  };

  const getAllCategory = async () => {
    const result = await hostedCategoryAxios.get("/getsubcategorylist");
    const categoryName = result?.data?.map((item) => ({
      title: item?.subCategory,
      _id: item?._id,
    }));
    setCategoryList(categoryName);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={editCouponPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form onSubmit={updateCouponData}>
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
                    className="singleProduct__dropdownField disbaled_field"
                    // onChange={handleCouponType}
                    value={
                      forAll
                        ? "forAll"
                        : specificCategory
                        ? "specificCategory"
                        : "specificProduct"
                    }
                    disabled
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
                    <Form.Label>Category</Form.Label>
                    <Multiselect
                      options={categoryList}
                      isObject={true}
                      placeholder="Select category..."
                      displayValue="title"
                      selectedValues={selected}
                      onSelect={(e) =>
                        setSelected([
                          ...e.map((i) => ({
                            scID: i._id,
                            title: i.title,
                          })),
                        ])
                      }
                    />
                  </Form.Group>
                </Row>
              ) : (
                ""
              )}
              {specificProduct === true ? (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationCustom07">
                    <Form.Label>Products</Form.Label>
                    <Multiselect
                      options={productList}
                      isObject={true}
                      placeholder="Select products..."
                      displayValue="title"
                      selectedValues={select}
                      onSelect={(e) => setSelect([...e.map((i) => i._id)])}
                    />
                  </Form.Group>
                </Row>
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
                    onChange={(e) => setCode(e.target.value)}
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
                    onChange={(e) => setAmount(e.target.value)}
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
                        class="form-check-input"
                        type="checkbox"
                        checked={fixedDiscount}
                        onChange={(e) => {
                          setfixedDiscount(e.target.checked);
                          setisPercentage(false);
                        }}
                      />
                      <label for="Fixed Discount">&nbsp; Fixed Discount</label>
                    </>
                  ) : (
                    ""
                  )}

                  <span>&nbsp; &nbsp;</span>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={isPercentage}
                    onChange={(e) => (
                      setisPercentage(e.target.checked), setfixedDiscount(false)
                    )}
                  />
                  <label for="Percentage">&nbsp; Percentage</label>
                </div>
              </Row>

              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label className="single-product-label">
                  Description
                </Form.Label>
                <RichTextEditor
                  value={message}
                  onChange={(e) => setMessage(e)}
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
                      padding: "10px",
                    }}
                    type="date"
                    value={expireDate}
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
