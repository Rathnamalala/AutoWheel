import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCar, faList } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// Styled components for custom styling
const StyledMenuWrapper = styled.div`
  text-align: center;
`;

const StyledListGroup = styled.div`
  background-color: #343a40; /* Dark background color */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledMenuItem = styled(NavLink)`
  display: block;
  padding: 10px;
  border-bottom: 1px solid #495057; /* Darker border color */
  color: #adb5bd; /* Light text color */
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #495057; /* Darker background color on hover */
  }
`;

const AdminMenu = () => {
  return (
    <StyledMenuWrapper>
      <StyledListGroup className="list-group dashboard-menu">
        <h4 style={{ color: "#fff" }}>Admin Panel</h4> {/* White text color */}
        <StyledMenuItem
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create Category
        </StyledMenuItem>
        <StyledMenuItem
          to="/dashboard/admin/create-car"
          className="list-group-item list-group-item-action"
        >
          <FontAwesomeIcon icon={faCar} className="mr-2" /> Create Car
        </StyledMenuItem>
        <StyledMenuItem
          to="/dashboard/admin/cars"
          className="list-group-item list-group-item-action"
        >
          <FontAwesomeIcon icon={faList} className="mr-2" /> Cars
        </StyledMenuItem>
      </StyledListGroup>
    </StyledMenuWrapper>
  );
};

export default AdminMenu;
