/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import {
  hostedAuthAxios,
  hostedPermissionAxios,
} from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import showPwdImg from "../../show-password.svg";
import hidePwdImg from "../../hide-password.svg";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [validated] = useState(false);
  const [popup, setPopup] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    permission: [],
  });
  const [inventory, setInventory] = useState({
    permissionName: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [userManager, setUserManger] = useState({
    permissionName: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [orderManager, setOrderManager] = useState({
    permissionName: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [categoryManager, setCategoryManager] = useState({
    permissionName: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [reportManager, setReportManager] = useState({
    permissionName: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [couponManager, setCouponManager] = useState({
    permissionName: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const { editAdminPopup, closePopup } = props;

  const prefilledAdminData = async (e) => {
    setLoading(true);
    const result = await hostedAuthAxios.get(`/user/${props.updateAdminId}`, {
      headers: authHeader(),
    });

    setPopup({
      ...popup,
      name: result.data.data.name,
      email: result.data.data.email,
      mobileNumber: result.data.data.mobileNumber,
      password: result.data.data.password,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (props.updateAdminId) {
      setInventory({
        permissionName: "",
        isRead: false,
        isWrite: false,
        isEdit: false,
      });
      setUserManger({
        permissionName: "",
        isRead: false,
        isWrite: false,
        isEdit: false,
      });
      setOrderManager({
        permissionName: "",
        isRead: false,
        isWrite: false,
        isEdit: false,
      });
      setCategoryManager({
        permissionName: "",
        isRead: false,
        isWrite: false,
        isEdit: false,
      });
      setReportManager({
        permissionName: "",
        isRead: false,
        isWrite: false,
        isEdit: false,
      });
      setCouponManager({
        permissionName: "",
        isRead: false,
        isWrite: false,
        isEdit: false,
      });
      prefilledAdminPermissions();
      prefilledAdminData();
    }
  }, [props.updateAdminId]);

  const prefilledAdminPermissions = async () => {
    // setLoading(true);
    const result = await hostedPermissionAxios.get(
      `/permissions/${props.updateAdminId}`,
      {
        headers: authHeader(),
      }
    );

    result?.data?.map((item) => {
      if (item.permissionName === "inventoryManager") {
        setInventory({
          permissionName: item.permissionName,
          isRead: item.isRead,
          isWrite: item.isWrite,
          isEdit: item.isEdit,
        });
      }

      if (item.permissionName === "userManager") {
        setUserManger({
          permissionName: item.permissionName,
          isRead: item.isRead,
          isWrite: item.isWrite,
          isEdit: item.isEdit,
        });
      }

      if (item.permissionName === "orderManager") {
        setOrderManager({
          permissionName: item.permissionName,
          isRead: item.isRead,
          isWrite: item.isWrite,
          isEdit: item.isEdit,
        });
      }

      if (item.permissionName === "categoryManager") {
        setCategoryManager({
          permissionName: item.permissionName,
          isRead: item.isRead,
          isWrite: item.isWrite,
          isEdit: item.isEdit,
        });
      }

      if (item.permissionName === "reportManager") {
        setReportManager({
          permissionName: item.permissionName,
          isRead: item.isRead,
          isWrite: item.isWrite,
          isEdit: item.isEdit,
        });
      }

      if (item.permissionName === "couponManager") {
        setCouponManager({
          permissionName: item.permissionName,
          isRead: item.isRead,
          isWrite: item.isWrite,
          isEdit: item.isEdit,
        });
      }
    });

    // setLoading(false);
  };

  const updateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inventory.permissionName) {
      popup.permission.push(inventory);
    }
    if (userManager.permissionName) {
      popup.permission.push(userManager);
    }
    if (orderManager.permissionName) {
      popup.permission.push(orderManager);
    }
    if (categoryManager.permissionName) {
      popup.permission.push(categoryManager);
    }
    if (reportManager.permissionName) {
      popup.permission.push(reportManager);
    }
    if (couponManager.permissionName) {
      popup.permission.push(couponManager);
    }

    const result = await hostedAuthAxios.put(
      `/update-admin/${props.updateAdminId}`,
      popup,
      {
        headers: authHeader(),
      }
    );

    const result1 = await hostedPermissionAxios.put(
      `/updatepermission/${props.updateAdminId}`,
      { permission: popup.permission },
      {
        headers: authHeader(),
      }
    );
    setLoading(false);
    closePopup();
    toast.success(` Admin ${result.data.data.name} is updated successfully!`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={editAdminPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle
           className="formPopup__header"
          >
            {props.title}
          </DialogTitle>
          <CloseIcon
            className="formPopup__crossBtn"
            onClick={closePopup}
          />
          <DialogContent>
            <Form validated={validated} onSubmit={updateAdmin}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className=""
                  controlId="validationCustom03"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="name"
                    placeholder="Enter admin name"
                    draggable="true"
                    value={popup.name}
                    onChange={(e) =>
                      setPopup({ ...popup, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom04">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    autoComplete="off"
                    placeholder="Enter admin email"
                    value={popup.email}
                    onChange={(e) =>
                      setPopup({ ...popup, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="mt-3"
                  controlId="formGridNumber"
                >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    autoComplete="off"
                    placeholder="Enter admin number"
                    value={popup.mobileNumber}
                    onChange={(e) =>
                      setPopup({ ...popup, mobileNumber: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  className="mt-3"
                  controlId="formGridPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={isRevealPwd ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Enter admin password"
                    onChange={(e) =>
                      setPopup({ ...popup, password: e.target.value })
                    }
                  />
                  <img
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      position: "absolute",
                      right: "22px",
                      top: "40px",
                    }}
                    alt="img"
                    className="hideAndShow"
                    title={isRevealPwd ? "Hide password" : "Show password"}
                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  />
                </Form.Group>
              </Row>

              <Row className="mt-5">
                <Form.Group
                  as={Col}
                  className="mt-3 d-flex justify-content-between"
                >
                  <Form.Label>PERMISSIONS</Form.Label>
                  <Form.Label>Read</Form.Label>
                  <Form.Label>Write</Form.Label>
                  <Form.Label>Edit</Form.Label>
                </Form.Group>
              </Row>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Inventory"
                    checked={inventory?.permissionName}
                    value="inventoryManager"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInventory({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          permissionName: e.target.value,
                        });
                      } else {
                        setInventory({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          permissionName: popup.permission.pop(inventory),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={inventory?.isRead}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInventory({
                          ...inventory,
                          isRead: e.target.checked,
                        });
                      } else {
                        setInventory({
                          ...inventory,
                          isRead: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={inventory?.isWrite}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInventory({
                          ...inventory,
                          isWrite: e.target.checked,
                        });
                      } else {
                        setInventory({
                          ...inventory,
                          isWrite: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={inventory?.isEdit}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInventory({
                          ...inventory,
                          isEdit: e.target.checked,
                        });
                      } else {
                        setInventory({
                          ...inventory,
                          isEdit: e.target.checked,
                        });
                      }
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  className="d-flex justify-content-between "
                >
                  <Form.Check
                    type="checkbox"
                    label="Users"
                    checked={userManager?.permissionName}
                    value="userManager"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserManger({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          permissionName: e.target.value,
                        });
                      } else {
                        setUserManger({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          permissionName: popup.permission.pop(userManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    style={{ marginLeft: "26px" }}
                    checked={userManager?.isRead}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserManger({
                          ...userManager,
                          isRead: e.target.checked,
                        });
                      } else {
                        setUserManger({
                          ...userManager,
                          isRead: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={userManager?.isWrite}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserManger({
                          ...userManager,
                          isWrite: e.target.checked,
                        });
                      } else {
                        setUserManger({
                          ...userManager,
                          isWrite: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={userManager?.isEdit}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserManger({
                          ...userManager,
                          isEdit: e.target.checked,
                        });
                      } else {
                        setUserManger({
                          ...userManager,
                          isEdit: e.target.checked,
                        });
                      }
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Orders"
                    checked={orderManager?.permissionName}
                    value="orderManager"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOrderManager({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          permissionName: e.target.value,
                        });
                      } else {
                        setOrderManager({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          permissionName: popup.permission.pop(orderManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    style={{ marginLeft: "20px" }}
                    checked={orderManager?.isRead}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOrderManager({
                          ...orderManager,
                          isRead: e.target.checked,
                        });
                      } else {
                        setOrderManager({
                          ...orderManager,
                          isRead: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={orderManager?.isWrite}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOrderManager({
                          ...orderManager,
                          isWrite: e.target.checked,
                        });
                      } else {
                        setOrderManager({
                          ...orderManager,
                          isWrite: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={orderManager?.isEdit}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOrderManager({
                          ...orderManager,
                          isEdit: e.target.checked,
                        });
                      } else {
                        setOrderManager({
                          ...orderManager,
                          isEdit: e.target.checked,
                        });
                      }
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Category"
                    checked={categoryManager?.permissionName}
                    value="categoryManager"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoryManager({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          permissionName: e.target.value,
                        });
                      } else {
                        setCategoryManager({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          permissionName: popup.permission.pop(categoryManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={categoryManager?.isRead}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoryManager({
                          ...categoryManager,
                          isRead: e.target.checked,
                        });
                      } else {
                        setCategoryManager({
                          ...categoryManager,
                          isRead: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={categoryManager?.isWrite}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoryManager({
                          ...categoryManager,
                          isWrite: e.target.checked,
                        });
                      } else {
                        setCategoryManager({
                          ...categoryManager,
                          isWrite: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={categoryManager?.isEdit}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoryManager({
                          ...categoryManager,
                          isEdit: e.target.checked,
                        });
                      } else {
                        setCategoryManager({
                          ...categoryManager,
                          isEdit: e.target.checked,
                        });
                      }
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Report"
                    value="reportManager"
                    checked={reportManager?.permissionName}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReportManager({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          permissionName: e.target.value,
                        });
                      } else {
                        setReportManager({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          permissionName: popup.permission.pop(reportManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    style={{ marginLeft: "20px" }}
                    checked={reportManager?.isRead}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReportManager({
                          ...reportManager,
                          isRead: e.target.checked,
                        });
                      } else {
                        setReportManager({
                          ...reportManager,
                          isRead: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={reportManager?.isWrite}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReportManager({
                          ...reportManager,
                          isWrite: e.target.checked,
                        });
                      } else {
                        setReportManager({
                          ...reportManager,
                          isWrite: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={reportManager?.isEdit}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReportManager({
                          ...reportManager,
                          isEdit: e.target.checked,
                        });
                      } else {
                        setReportManager({
                          ...reportManager,
                          isEdit: e.target.checked,
                        });
                      }
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Coupons"
                    value="couponManager"
                    checked={couponManager?.permissionName}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCouponManager({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          permissionName: e.target.value,
                        });
                      } else {
                        setCouponManager({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          permissionName: popup.permission.pop(couponManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={couponManager?.isRead}
                    style={{ marginLeft: "5px" }}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCouponManager({
                          ...couponManager,
                          isRead: e.target.checked,
                        });
                      } else {
                        setCouponManager({
                          ...couponManager,
                          isRead: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={couponManager?.isWrite}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCouponManager({
                          ...couponManager,
                          isWrite: e.target.checked,
                        });
                      } else {
                        setCouponManager({
                          ...couponManager,
                          isWrite: e.target.checked,
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={couponManager?.isEdit}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCouponManager({
                          ...couponManager,
                          isEdit: e.target.checked,
                        });
                      } else {
                        setCouponManager({
                          ...couponManager,
                          isEdit: e.target.checked,
                        });
                      }
                    }}
                  />
                </Form.Group>
              </Col>

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
