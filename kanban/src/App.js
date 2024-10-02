import React, { useState, useEffect } from "react";
import ControlPanel from "./Controls/ControlPanel";
import TicketList from "./TicketContainer/TicketList";
import "./App.css";

const MainApp = () => {
  const [groupByKey, setGroupByKey] = useState("status");
  const [sortOrder, setSortOrder] = useState("priority");
  const [ticketsGrouped, setTicketsGrouped] = useState({});
  const [apiData, setApiData] = useState({ tickets: [], users: [] });

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((fetchedData) => setApiData(fetchedData))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const organizeBy = (arr, key) => {
    return arr.reduce((accumulated, item) => {
      (accumulated[item[key]] = accumulated[item[key]] || []).push(item);
      return accumulated;
    }, {});
  };

  useEffect(() => {
    let ticketList = [...apiData.tickets];

    if (sortOrder === "priority") {
      ticketList = ticketList.sort((a, b) => a.priority - b.priority);
    } else if (sortOrder === "title") {
      ticketList = ticketList.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (groupByKey === "user") {
      setTicketsGrouped(organizeBy(ticketList, "userId"));
    } else if (groupByKey === "status") {
      setTicketsGrouped(organizeBy(ticketList, "status"));
    } else if (groupByKey === "priority") {
      setTicketsGrouped(organizeBy(ticketList, "priority"));
    }
  }, [groupByKey, sortOrder, apiData]);

  return (
    <div>
      <ControlPanel
        currentGroup={groupByKey}
        changeGroup={setGroupByKey}
        currentOrder={sortOrder}
        changeOrder={setSortOrder}
      />
      <TicketList groupedTickets={ticketsGrouped} data={apiData} groupByKey={groupByKey} />
    </div>
  );
};

export default MainApp;
