import React from "react";

//Input = genres, currentItem
//Output = onListItemChanged
const ListGroup = ({
  items,
  selectedItem,
  textProperty,
  valueProperty,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            key={item[valueProperty]}
            style={{ cursor: "pointer" }}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

//TODO: add type checking

export default ListGroup;
