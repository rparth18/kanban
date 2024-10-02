import React from "react";
import "./TicketList.css";

// Destructure props for cleaner code
const TicketList = ({ groupedTickets, groupByKey, data }) => {
  return (
    <div className="ticket-list" style={{ display: "flex" }}>
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="ticket-group">
          <p>
            {groupByKey === "user"
              ? data.users.find((user) => user.id === group)?.name
              : group}
          </p>
          {groupedTickets[group].map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h4>{ticket.id}</h4>
              <p>{ticket.title}</p>
              <p>{ticket.tag[0]}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicketList;
