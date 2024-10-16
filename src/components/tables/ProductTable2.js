import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../elements";
import { hostedSellerProductAxios } from "../../backendAxios/backendAxios";

export default function ProductsTable({ thead, tbody }) {
  const [data, setData] = useState([]);
  const [productList, setProductList] = useState([]);

  // useEffect(() => {
  //   setData(tbody);
  // }, [tbody]);

  // useEffect(() => {
  //   getTopRatedProduct();
  // }, []);

  const getTopRatedProduct = async () => {
    await hostedSellerProductAxios
      .get(`/allproduct-by-sectionwise`)
      .then((response) => {
        setProductList(response?.data?.allFeatured);
      });
  };

  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table product">
        <Thead className="mc-table-head primary">
          <Tr>
            <Th>
              <Box className="mc-table-check">
                <Text>uid</Text>
              </Box>
            </Th>
            {thead.map((item, index) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {productList?.map((item, index) => (
            <Tr key={index}>
              <Td title={index + 1}>
                <Box className="mc-table-check">
                  {/* <Input
                    type="checkbox"
                    name={item.name}
                    checked={item?.isChecked || false}
                    onChange={handleCheckbox}
                  /> */}
                  <Text>{index + 1}</Text>
                </Box>
              </Td>
              <Td>
                <Box className="mc-table-product md">
                  <Image src={item.images[0]} alt={item.alt} />
                  <Box className="mc-table-group">
                    <Heading as="h6">{item.heading}</Heading>
                    <Text>{item.title}</Text>
                  </Box>
                </Box>
              </Td>
              <Td>{item.sku ? item.sku : "__"}</Td>
              <Td>{item.subcategory ? item.subcategory : "__"}</Td>
              <Td>{item.brand ? item.brand : "__"}</Td>
              <Td>
                <Box className="mc-table-price">
                  <del>${`${item.price}`}</del>
                  <Text>${`${item.salesprice}`}</Text>
                </Box>
              </Td>
              <Td>{item.stock}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
