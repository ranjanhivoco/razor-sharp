import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Icon, Button } from "../elements";

export default function AdminTable() {
  const [alertModal, setAlertModal] = useState(false);
  const [data, setData] = useState([]);

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    if (name === "allCheck") {
      const checkData = data?.map((item) => {
        return { ...item, isChecked: checked };
      });
      setData(checkData);
    } else {
      const checkData = data?.map((item) =>
        item.name === name ? { ...item, isChecked: checked } : item
      );
      setData(checkData);
    }
  };

  return (
    <Box className="mc-table-responsive">
      <Tr>
        <Td>
          <Box className="mc-table-check">
            {/* <Input 
                                        type="checkbox" 
                                        name={item.name} 
                                        checked={ item?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    />
                                    <Text>{ item.id }</Text> */}
          </Box>
        </Td>
        <Td>Name</Td>
        <Td>permissions</Td>
        <Td>Actions</Td>
      </Tr>

      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this product?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAlertModal(false)}
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => setAlertModal(false)}
            >
              yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
