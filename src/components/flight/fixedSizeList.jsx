import { ListItemButton } from "@mui/material";
import React from "react";
import { FixedSizeList } from "react-window";

const VirtualList = (props) => {
  const { children, ...rest } = props;
  const LISTBOX_PADDING = 8; // px
  const itemData = children.map((child) => child.props);
  return (
      <div {...rest}>
        <FixedSizeList
          height={300} 
          width="100%"
          itemSize={50}
          itemCount={itemData.length}
          overscanCount={5}
          itemData={itemData}
        >
          {({ index, style }) => (
            <ListItemButton style={style} {...itemData[index]}>
              {itemData[index].children}
            </ListItemButton>
          )}
        </FixedSizeList>
      </div>
  );
};

export default VirtualList;
