import React, { useEffect, useState } from "react";
import Box from "../elements/Box";
import CardHeader from "./CardHeader";
import ProductsTable from "../tables/ProductsTable";
import ProductsTable2 from "../tables/ProductTable2";
import ProductsTable3 from "../tables/ProductTable3";
import LoadingSpinner from "../elements/LoadingSpinner";

export default function ProductsCard({ title, dotsMenu, table }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay time as needed or replace with actual data fetching logic

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Box className="mc-card">
        <CardHeader title={title} dotsMenu={dotsMenu} />
        {/* <Row xs={1} sm={2} xl={4} className="mb-4">
        {table.filter.map((item, index) => (
          <Col key={index}>
            <LabelField
              type={item.type}
              label={item.label}
              option={item.option}
              placeholder={item.placeholder}
              labelDir="label-col"
              fieldSize="w-100 h-md"
            />
          </Col>
        ))}
      </Row> */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <ProductsTable thead={table.thead} tbody={table.tbody} />
        )}
      </Box>
      <Box className="mc-card">
        <CardHeader title={"Featured Products"} dotsMenu={dotsMenu} />
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <ProductsTable2 thead={table.thead} tbody={table.tbody} />
        )}
      </Box>
      <Box className="mc-card">
        <CardHeader title={"Deals of the Day"} dotsMenu={dotsMenu} />
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <ProductsTable3 thead={table.thead} tbody={table.tbody} />
        )}
      </Box>
    </>
  );
}
