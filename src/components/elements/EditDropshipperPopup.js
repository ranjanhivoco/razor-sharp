/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import { hostedSellerAuthAxios } from "../../backendAxios/backendAxios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import { TagsInput } from "react-tag-input-component";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([false]);
  const [validated] = useState(false);
  const [popup, setPopup] = useState({
    dropshiperName: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    drivingLicense: "",
    store_name: "",
    store_displayName: "",
    store_description: "",
    store_storeandpickupAddress: "",
    isCompleteVerified: "",
    isSellerVerified: "",
    sellerCategory: "",
    isActive: "",
  });
  const { editDropshipperPopup, closePopup, updateDropshipperId } = props;

  const ApiUrl = "http://localhost:3000";
  // const ApiUrl = "http://localhost:3000"

  useEffect(() => {
    if (updateDropshipperId) {
      prefilledDropshipperData();
    }
  }, [updateDropshipperId]);

  const prefilledDropshipperData = async () => {
    const result = await hostedSellerAuthAxios.get(
      `/seller/${updateDropshipperId}`,
      {
        header: authHeader(),
      }
    );
    setPopup({
      ...popup,
      dropshiperName: result?.data?.data?.name,
      email: result?.data?.data?.email,
      phoneNumber: result?.data?.data?.mobileNumber,
      idNumber: result?.data?.data?.idnumber,
      drivingLicense: result?.data?.data?.store?.gstin,
      store_name: result?.data?.data?.store?.store_name,
      store_displayName: result?.data?.data?.store?.store_displayName,
      store_description: result?.data?.data?.store?.store_description,
      store_storeandpickupAddress:
        result?.data?.data?.store?.store_storeandpickupAddress,
      isCompleteVerified: result?.data?.data?.isCompleteVerified,
      isSellerVerified: result?.data?.data?.isSellerVerified,
      isActive: result?.data?.data?.isActive,
    });
    setSelected(result?.data?.data.sellersubcategory);
  };

  const updateDropshipper = async (e) => {
    setLoading(true);
    e.preventDefault();
    var formData = new FormData();
    formData.append("isActive", popup.isActive);

    await axios({
      method: "PUT",
      url: `${ApiUrl}/seller-auth/update-seller/${updateDropshipperId}`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Details updated Successfully!!");
          closePopup();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast.error(`${err.response.data.errormessage}`);
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
          open={editDropshipperPopup}
          onClose={closePopup}
          fullWidth={true}
        >
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={updateDropshipper}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>Seller Name</Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Seller name"
                    className="disbaled_field"
                    value={popup?.dropshiperName}
                    onChange={(e) =>
                      setPopup({ ...popup, dropshiperName: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type="text"
                    className="disbaled_field"
                    placeholder="Enter seller email"
                    value={popup.email}
                    onChange={(e) =>
                      setPopup({ ...popup, email: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type="name"
                    className="disbaled_field"
                    placeholder="Enter seller number"
                    value={popup.phoneNumber}
                    onChange={(e) =>
                      setPopup({ ...popup, phoneNumber: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="validationCustom04"
                  style={{ position: "relative" }}
                >
                  <Form.Label>Seller ID number</Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type="text"
                    placeholder=""
                    className="disbaled_field"
                    value={popup?.idNumber}
                    onChange={(e) =>
                      setPopup({ ...popup, idNumber: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom05">
                  <Form.Label>driving license</Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter primary key"
                    value={popup.drivingLicense}
                    className="disbaled_field"
                    onChange={(e) =>
                      setPopup({ ...popup, drivingLicense: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
                <Form.Group className="col" controlId="validationCustom04">
                  <Form.Label className="">Active</Form.Label>

                  <select
                    className="singleProduct__dropdownField"
                    onChange={(e) =>
                      setPopup({ ...popup, isActive: e.target.value })
                    }
                    value={popup?.isActive}
                  >
                    <option value="true">Active</option>
                    <option value="false">Unactive</option>
                  </select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom06">
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    placeholder="Enter category field name"
                    value={popup.store_name}
                    className="disbaled_field"
                    onChange={(e) =>
                      setPopup({ ...popup, store_name: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label>display name</Form.Label>
                  <Form.Control
                    // required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter title"
                    value={popup.store_displayName}
                    className="disbaled_field"
                    onChange={(e) =>
                      setPopup({ ...popup, store_displayName: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom08">
                  <Form.Label>Store description</Form.Label>
                  <Form.Control
                    // required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter the price"
                    value={popup.store_description}
                    className="disbaled_field"
                    onChange={(e) =>
                      setPopup({ ...popup, store_description: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom09">
                  <Form.Label>Store Address</Form.Label>
                  <Form.Control
                    // required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter the stock"
                    value={popup.store_storeandpickupAddress}
                    className="disbaled_field"
                    onChange={(e) =>
                      setPopup({
                        ...popup,
                        store_storeandpickupAddress: e.target.value,
                      })
                    }
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  className="col-md-6"
                  controlId="validationCustom04"
                  style={{ position: "relative" }}
                >
                  <Form.Label className="">Active Email</Form.Label>

                  <select
                    className="singleProduct__dropdownField disbaled_field"
                    onChange={(e) =>
                      setPopup({ ...popup, isCompleteVerified: e.target.value })
                    }
                    value={popup?.isCompleteVerified}
                    disabled
                  >
                    <option value="true">Active</option>
                    <option value="false">Unactive</option>
                  </select>
                </Form.Group>
                <Form.Group
                  className="col-md-6"
                  controlId="validationCustom04"
                  style={{ position: "relative" }}
                >
                  <Form.Label className="">Active Number</Form.Label>

                  <select
                    className="singleProduct__dropdownField disbaled_field"
                    onChange={(e) =>
                      setPopup({ ...popup, isSellerVerified: e.target.value })
                    }
                    value={popup?.isSellerVerified}
                    disabled
                  >
                    <option value="true">Active</option>
                    <option value="false">Unactive</option>
                  </select>
                </Form.Group>
              </Row>
              {/* <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Category</Form.Label>
                  <TagsInput value={selected} onChange={setSelected} />
                </Form.Group>
              </Row> */}

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
