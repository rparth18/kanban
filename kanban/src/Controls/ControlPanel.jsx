import React from "react";
import "./ControlPanel.css";

const ControlPanel = ({ currentGroup, changeGroup, currentOrder, changeOrder }) => {
  return (
    <div className="control-panel">
      <div>
        <label>Group By:</label>
        <select value={currentGroup} onChange={(e) => changeGroup(e.target.value)}>
          <option value="user">User</option>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div>
        <label>Sort By:</label>
        <select value={currentOrder} onChange={(e) => changeOrder(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default ControlPanel;
