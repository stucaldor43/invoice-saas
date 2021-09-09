import React, { useState } from "react";
import ChevronUp from "../icons/ChevronUpSvg";
import ChevronDown from "../icons/ChevronDownSvg";
import "./styles.module.css";

const ASCENDING = "up";
const DESCENDING = "down";

export function ClientsHeadingRow({
  actions: { sortAscending, sortDescending },
}) {
  const [clientSortOrder, setClientSortOrder] = useState(ASCENDING);
  const [emailSortOrder, setEmailSortOrder] = useState(ASCENDING);

  function toggleClientSortOrder() {
    if (clientSortOrder === ASCENDING) return setClientSortOrder(DESCENDING);
    setClientSortOrder(ASCENDING);
  }

  function toggleEmailSortOrder() {
    if (emailSortOrder === ASCENDING) return setEmailSortOrder(DESCENDING);
    setEmailSortOrder(ASCENDING);
  }

  return (
    <tr>
      <th>
        Name
        {clientSortOrder === ASCENDING ? (
          <ChevronUp
            onClick={() => {
              toggleClientSortOrder();
              sortAscending("first_name,last_name");
            }}
          />
        ) : (
          <ChevronDown
            onClick={() => {
              toggleClientSortOrder();
              sortDescending("first_name,last_name");
            }}
          />
        )}
        {/* <ChevronUp
          onClick={() =>
            sortAscending("first_name,last_name") && toggleCustomer()
          }
        />
        <ChevronDown
          onClick={() =>
            sortDescending("first_name,last_name") && toggleCustomer()
          }
        /> */}
      </th>
      <th>
        Email
        {emailSortOrder === ASCENDING ? (
          <ChevronUp
            onClick={() => {
              toggleEmailSortOrder();
              sortAscending("email");
            }}
          />
        ) : (
          <ChevronDown
            onClick={() => {
              toggleEmailSortOrder();
              sortDescending("email");
            }}
          />
        )}
        {/* <span onClick={() => sortAscending("email")}>&#8593;</span> */}
        {/* <span onClick={() => sortDescending("email")}>&#8595;</span> */}
      </th>
      <th>Company</th>
      <th>Date Created</th>
    </tr>
  );
}
