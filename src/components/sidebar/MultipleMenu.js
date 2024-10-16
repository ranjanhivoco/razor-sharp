import React from "react";
import MenuItem from "./MenuItem";
import { List, Menu, Heading } from "../elements";

export default function MultipleMenu({ data }) {

  return (
    <>
      {data?.map((item, e) => (
        <Menu key={e} className="mc-sidebar-menu">
          <Heading key={e} as="h5" className="mc-sidebar-menu-title">
            {item.title}
          </Heading>
          <List className="mc-sidebar-menu-list">
            {item.menu.map((item, index) => (
              <>
                <MenuItem key={index} item={item} />
              </>
            ))}
          </List>
        </Menu>
      ))}
    </>
  );
}
