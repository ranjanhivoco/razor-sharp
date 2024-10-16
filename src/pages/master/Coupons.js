import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import {
  hostedCouponAxios,
  hostedSellerAuthAxios,
} from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { CardLayout } from "../../components/cards";
import CouponPopup from "../../components/elements/CouponPopup";
import EditCouponPopup from "../../components/elements/EditCouponPopup";
import { Text, Input } from "../../components/elements";
import data from "../../data/master/coupon.json";
import { Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import { FloatCard } from "../../components/cards";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import moment from "moment";

import { Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";

export default function Admin({ icon, text }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [couponList, setCouponList] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [editCouponPopup, setEditCouponPopup] = useState(false);
  const [updateCouponId, setUpdateCouponId] = useState(null);
  const [couponCount, setCouponCount] = useState(0);
  const [activeCouponCount, setActiveCouponCount] = useState(0);
  const defaultOption = "superadmin";
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    getAllCouponsList();
    getAllSellers();
  }, []);

  useEffect(() => {
    if (selectedOption !== defaultOption) {
      fetchSellerCoupon();
    } else getAllCouponsList();
  }, [selectedOption]);

  const [itemOffset, setItemOffset] = useState(0);

  const getAllCouponsList = async () => {
    setLoading(true);
    const result = await hostedCouponAxios.get("/get-coupon-superadmin", {
      headers: authHeader(),
    });
    const activeCoupon = result?.data?.map((e) => e?.isActive);
    setCouponList(result?.data);
    setCouponCount(result?.data?.length);
    setActiveCouponCount(activeCoupon.filter(Boolean).length);
    setLoading(false);
  };

  const fetchSellerCoupon = async () => {
    setLoading(true);
    await hostedCouponAxios
      .get(`/get-coupon-seller/${selectedOption}`, { headers: authHeader() })
      .then((response) => {
        setCouponList(response?.data);
        setCouponCount(response?.data?.length);
      });
    setLoading(false);
  };

  const getAllSellers = async () => {
    setLoading(true);
    await hostedSellerAuthAxios
      .get("/sellers", { headers: authHeader() })
      .then((response) => setSellerList(response.data.data));
    setLoading(false);
  };

  const disableCoupon = async (id) => {
    await hostedCouponAxios
      .get(`/change-status-by-admin/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      });
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayCoupon = couponList
    .filter((data) => data?.code?.toUpperCase().includes(query))
    .slice(itemOffset, endOffset)
    .map((item, index) => {
      return (
        <Tr key={index}>
          <Td title={index + 1}>
            <Box className="mc-table-check">
              <Text>
                {" "}
                {Number(endOffset) - Number(itemsPerPage) + index + 1}
              </Text>
            </Box>
          </Td>
          <td
            style={{
              textTransform: "uppercase",
              color: "black",
              fontSize: "14px",
            }}
          >
            {item?.code}
          </td>

          <td>{item?.amount}</td>
          <td>
            {item?.forAll
              ? "For All"
              : item?.specificProduct
              ? "Product"
              : item?.specificCategory
              ? "Category"
              : ""}
          </td>

          <td>{moment(item?.expireDate).format("LL")}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  setUpdateCouponId(item._id);
                  setEditCouponPopup(true);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons edit"
                onClick={() => {
                  disableCoupon(item?._id, item?.isActive);
                }}
              >
                {item?.isActive ? (
                  <ToggleOnIcon style={{ color: "#000" }} />
                ) : (
                  <ToggleOffIcon style={{ color: "lightGray" }} />
                )}
              </Button>
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(couponList?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % couponList?.length;
    setItemOffset(newOffset);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  return (
    <PageLayout>
      <>
        {loading ? (
          <LoaderProvider />
        ) : (
          <>
            <Box style={{ display: "flex", justifyContent: "end" }}>
              <div className="col-md-3 me-3">
                <select
                  className="seller__dropdownField"
                  onChange={handleOptionChange}
                  value={selectedOption}
                >
                  <option value="superadmin">Super Admin</option>
                  {sellerList?.map((seller, key) => {
                    return (
                      <option key={key} value={seller._id}>
                        {seller.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedOption === "superadmin" ? (
                <Button
                  type="button"
                  text="Add Coupon"
                  className="btn btn-outline-warning btn-sm text-black"
                  onClick={() => setOpenPopup(true)}
                />
              ) : (
                ""
              )}
            </Box>

            <Col xl={12}>
              <CardLayout>
                <Breadcrumb title={data?.pageTitle}>
                  {data?.breadcrumb.map((item, index) => (
                    <li key={index} className="mc-breadcrumb-item">
                      {item.path ? (
                        <Anchor className="mc-breadcrumb-link" href={item.path}>
                          {item.text}
                        </Anchor>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </Breadcrumb>
              </CardLayout>
            </Col>
            <div className="mt-2 row">
              <Col sm={6} lg={4}>
                <FloatCard
                  variant="lg blue"
                  digit={couponCount}
                  title="total coupon"
                  icon="pending"
                />
              </Col>

              <Col sm={6} lg={4}>
                <FloatCard
                  variant="lg blue"
                  digit={activeCouponCount}
                  title="Active coupon"
                  icon="pending"
                />
              </Col>
            </div>

            <Box>
              <CardLayout>
                <div
                  className="col"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <div className="mc-label-field-group label-col">
                    <label className="mc-label-field-title">search by</label>
                    <div className="input-search-field">
                      <Input
                        type="search"
                        placeholder=" Coupon code"
                        onChange={(e) => setQuery(e.target.value.toUpperCase())}
                        className="admin-search-field"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-xl-12" id="admin-data">
                  <Table className="mc-table product">
                    <Thead className="mc-table-head primary">
                      <Tr>
                        <Th>
                          <Box className="mc-table-check">
                            <Text>S.NO</Text>
                          </Box>
                        </Th>

                        <Th>Coupon code</Th>
                        <Th>Amount</Th>
                        <Th>Coupon Type</Th>
                        <Th>Expire Date</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body even">
                      {displayCoupon}
                    </Tbody>
                  </Table>
                </div>
                <ReactPaginate
                  previousLabel={"⟵"}
                  nextLabel={"⟶"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"paginationBttns"}
                  previousClassName={"pre"}
                  nextClassName={"next"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </CardLayout>
              <ToastContainer />
            </Box>
            <CouponPopup
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              closePopup={() => setOpenPopup(false)}
              title="Add new Coupon !"
            />
            <EditCouponPopup
              updateCouponId={updateCouponId}
              editCouponPopup={editCouponPopup}
              setEditCouponPopup={setEditCouponPopup}
              closePopup={() => setEditCouponPopup(false)}
              title="Edit !"
            />
          </>
        )}
      </>
    </PageLayout>
  );
}
