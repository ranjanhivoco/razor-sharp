import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { CardLayout } from "../../components/cards";
import ReactPaginate from "react-paginate";
import { Text, Input } from "../../components/elements";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/orderList.json";
import { Breadcrumb } from "../../components";
import moment from "moment";
import { FloatCard } from "../../components/cards";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";
import { hostedOrderAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

export default function UserList() {
  const mockOrders = [
    {
      _id: "ORD123456",
      product_array: [
        {
          name: "Product A",
          totalPrice: 100.50,
          transaction: "Completed",
          status: "Delivered",
        },
        {
          name: "Product B",
          totalPrice: 50.75,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 2,
      createdAt: "2023-08-01T12:34:56Z",
    },
    {
      _id: "ORD123457",
      product_array: [
        {
          name: "Product C",
          totalPrice: 75.25,
          transaction: "Pending",
          status: "Processing",
        },
      ],
      count: 1,
      createdAt: "2023-08-05T09:15:00Z",
    },
    {
      _id: "ORD123458",
      product_array: [
        {
          name: "Product D",
          totalPrice: 200.0,
          transaction: "Completed",
          status: "Delivered",
        },
        {
          name: "Product E",
          totalPrice: 150.25,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 2,
      createdAt: "2023-08-10T14:22:30Z",
    },
    {
      _id: "ORD123459",
      product_array: [
        {
          name: "Product F",
          totalPrice: 120.00,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-08-12T10:45:00Z",
    },
    {
      _id: "ORD123460",
      product_array: [
        {
          name: "Product G",
          totalPrice: 85.75,
          transaction: "Pending",
          status: "Processing",
        },
      ],
      count: 1,
      createdAt: "2023-08-15T08:30:00Z",
    },
    {
      _id: "ORD123461",
      product_array: [
        {
          name: "Product H",
          totalPrice: 190.0,
          transaction: "Completed",
          status: "Delivered",
        },
        {
          name: "Product I",
          totalPrice: 250.5,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 2,
      createdAt: "2023-08-18T11:00:00Z",
    },
    {
      _id: "ORD123462",
      product_array: [
        {
          name: "Product J",
          totalPrice: 300.00,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-08-20T15:00:00Z",
    },
    {
      _id: "ORD123463",
      product_array: [
        {
          name: "Product K",
          totalPrice: 110.25,
          transaction: "Pending",
          status: "Processing",
        },
      ],
      count: 1,
      createdAt: "2023-08-22T16:30:00Z",
    },
    {
      _id: "ORD123464",
      product_array: [
        {
          name: "Product L",
          totalPrice: 125.75,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-08-25T13:15:00Z",
    },
    {
      _id: "ORD123465",
      product_array: [
        {
          name: "Product M",
          totalPrice: 50.0,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-08-28T09:00:00Z",
    },
    {
      _id: "ORD123466",
      product_array: [
        {
          name: "Product N",
          totalPrice: 75.50,
          transaction: "Pending",
          status: "Processing",
        },
      ],
      count: 1,
      createdAt: "2023-09-01T11:20:00Z",
    },
    {
      _id: "ORD123467",
      product_array: [
        {
          name: "Product O",
          totalPrice: 140.0,
          transaction: "Completed",
          status: "Delivered",
        },
        {
          name: "Product P",
          totalPrice: 180.25,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 2,
      createdAt: "2023-09-03T14:45:00Z",
    },
    {
      _id: "ORD123468",
      product_array: [
        {
          name: "Product Q",
          totalPrice: 90.00,
          transaction: "Pending",
          status: "Processing",
        },
      ],
      count: 1,
      createdAt: "2023-09-06T17:00:00Z",
    },
    {
      _id: "ORD123469",
      product_array: [
        {
          name: "Product R",
          totalPrice: 130.0,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-09-09T09:30:00Z",
    },
    {
      _id: "ORD123470",
      product_array: [
        {
          name: "Product S",
          totalPrice: 220.75,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-09-11T15:15:00Z",
    },
    {
      _id: "ORD123471",
      product_array: [
        {
          name: "Product T",
          totalPrice: 180.0,
          transaction: "Pending",
          status: "Processing",
        },
      ],
      count: 1,
      createdAt: "2023-09-13T13:10:00Z",
    },
    {
      _id: "ORD123472",
      product_array: [
        {
          name: "Product U",
          totalPrice: 210.50,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-09-15T18:30:00Z",
    },
    {
      _id: "ORD123473",
      product_array: [
        {
          name: "Product V",
          totalPrice: 140.75,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-09-18T10:00:00Z",
    },
    {
      _id: "ORD123474",
      product_array: [
        {
          name: "Product W",
          totalPrice: 60.25,
          transaction: "Pending",
          status: "Processing",
        },
      ],
      count: 1,
      createdAt: "2023-09-21T08:40:00Z",
    },
    {
      _id: "ORD123475",
      product_array: [
        {
          name: "Product X",
          totalPrice: 320.0,
          transaction: "Completed",
          status: "Delivered",
        },
      ],
      count: 1,
      createdAt: "2023-09-25T12:20:00Z",
    }
  ];
  
  
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [orderList, setOrderList] = useState(mockOrders || []);
  const [orderCount, setOrderCount] = useState(mockOrders.length || 0);
  const [deliverOrderCount, setDeliverOrderCount] = useState(0);

  // useEffect(() => {
  //   getOrderList();
  // }, []);

  const getOrderList = async () => {
    await hostedOrderAxios
      .get(`/getallorderbysuperadmin`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setOrderList(response?.data?.order);

          const deliveredOrder = response?.data?.order?.map((item) =>
            item?.product_array.map((status) => status.status)
          );
          setDeliverOrderCount(
            deliveredOrder.filter((arr) => arr.includes("Delivered")).length
          );
          setOrderCount(response?.data?.order?.length);
        }
      });
  };


  const handleDownloadInvoice = async (id) => {
    // await hostedCommonModule.get(`/download-pdf/${query.get("_id")}`);
    try {
      const response = await fetch(`${ApiUrl}/common/download-pdf/${id}`, {
        method: "GET",
        headers: authHeader(),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;

  (orderList);
  

  const displayUsers = orderList
    ?.slice(itemOffset, endOffset)
    .filter((data) => data?._id?.toUpperCase().includes(query))
    ?.map((item, index) => {
      return (
        <Tr key={index}>
          <Td title={index + 1}>
            <Box className="mc-table-check">
              <Text>
                {Number(endOffset) - Number(itemsPerPage) + index + 1}
              </Text>
            </Box>
          </Td>
          <td
          // style={{
          //   textTransform: "uppercase",
          //   color: "black",
          //   fontSize: "14px",
          // }}
          >
            {item._id}
          </td>
          <td>
            {item?.product_array
              .map((item) => item.name)
              .filter((name, index, array) => array.indexOf(name) === index)}
          </td>
          <td>{`(${item?.count}) Item`}</td>
          <td>{`$${item?.product_array
            ?.map((item) => item.totalPrice.toFixed())
            .filter(
              (totalPrice, index, array) => array.indexOf(totalPrice) === index
            )}`}
          </td>
          <td>
            {item?.product_array
              ?.map((item) => item.transaction)

              .filter(
                (transaction, index, array) =>
                  array.indexOf(transaction) === index
              )}
          </td>
          {/* <td>
            {item?.product_array
              ?.map((item) => item.status)
              .filter(
                (status, index, array) => array.indexOf(status) === index
              )}
          </td> */}
          <td>{moment(item?.createdAt).format("LL")}</td>

          <td>
            <Box className="mc-table-action">
              <Anchor
                href={`/invoice-details?_id=${item?._id}`}
                title="View"
                className="material-icons view"
              >
                <img src="images/View.svg" alt="" />
              </Anchor>
              <button onClick={() => handleDownloadInvoice(item?._id)}>
                <img src="images/download.svg" alt="" />
              </button>
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(orderList?.length / itemsPerPage);
  const changePage = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orderList?.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <PageLayout>
      <>
        {loading ? (
          <LoaderProvider />
        ) : (
          <>
            <Col xl={12}>
              <CardLayout>
                <Breadcrumb  title={data?.pageTitle}>
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
            <Row className="mt-2">
              <Col xl={4}>
                <FloatCard
                  variant="lg blue"
                  digit={orderCount}
                  title="total order"
                  icon={"check_circle"}
                />
              </Col>
              <Col xl={4}>
                <FloatCard
                  variant="lg blue"
                  digit={deliverOrderCount}
                  title="delivered order"
                  icon={"check_circle"}
                />
              </Col>
            </Row>
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
                        placeholder=" Order Id "
                        onChange={(e) => setQuery(e.target.value.toUpperCase())}
                        className="admin-search-field"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-xl-12" id="category-data">
                  <Table className="mc-table product">
                    <Thead className="mc-table-head primary">
                      <Tr>
                        <Th>
                          <Box className="mc-table-check">
                            <Text>uid</Text>
                          </Box>
                        </Th>
                        <Th>Order Id</Th>
                        <Th>Customer</Th>
                        <Th>Products </Th>
                        <Th>Amount</Th>
                        <Th>Payment Status</Th>
                        {/* <Th>Order Status</Th> */}
                        <Th>Order Date</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body even">{displayUsers}</Tbody>
                  </Table>
                </div>

                <ReactPaginate
                  previousLabel={"⟵"}
                  nextLabel={"⟶"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousClassName={"pre"}
                  nextClassName={"next"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
                
              </CardLayout>
            </Box>
            
          </>
        )}
      </>
    </PageLayout>
  );
}
