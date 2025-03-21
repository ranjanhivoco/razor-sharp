import { Col, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useContext, useEffect } from "react";
import { BranchContext } from "../context/branch";
import { BranchIDContext } from "../context/branchID";

const CustomDropDown = () => {
  const { branchData, setBranchData } = useContext(BranchContext);
  const { branchID, setBranchID } = useContext(BranchIDContext);
  console.log(branchID, "branchID");

  const endpoint = "https://api.hongs.razorsharp.in";

  const getBranches = async () => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    try {
      const response = await axios.get(`${endpoint}/common/get-branch`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setBranchData(response?.data);
      // console.log(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors
    }
  };

  useEffect(() => {
    getBranches();
  }, []); // Empty array ensures the effect runs once after the initial render

  return (
    <>
      <Col
        style={{ marginBottom: "-10px" }}
        xs={10}
        sm={10}
        md={10}
        xl={10}
      ></Col>
      <Col
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "-20px",
        }}
        xs={2}
        sm={2}
        md={2}
        xl={2}
      >
        <Dropdown>
          <Dropdown.Toggle
            className="text-black border-dark border-1 "
            variant=""
            id="dropdown-basic"
          >
            {/* Branch */}
            {branchData && branchData.length > 0
              ? // branchData[2].branch_name
                branchData.filter((place) => place.branch_id === branchID)[0]
                  .branch_name
              : "Branch"}
          </Dropdown.Toggle>

          <Dropdown.Menu className="text-uppercase" style={{}}>
            {branchData?.map((place, index) => {
              return (
                <div
                  onClick={() => setBranchID(place.branch_id)}
                  key={place.branch_id}
                  style={{ padding: "0 8px" }}
                >
                  <Dropdown.Item
                    style={{ fontSize: "12px", borderRadius: "4px" }}
                    className=""
                  >
                    {place.branch_name}
                  </Dropdown.Item>
                  {/* <Dropdown.Divider /> */}
                </div>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </>
  );
};

export default CustomDropDown;
