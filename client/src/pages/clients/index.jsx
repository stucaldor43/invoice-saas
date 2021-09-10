import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "./../../hooks/useRouter";
import { ClientService } from "./../../services/client-service";
import PlusSvg from "./../../components/icons/PlusSvg";
import { ClientsTable } from "./../../components/ClientsTable";
import styles from "./styles.module.css";
import { Pagination } from "./../../components/Pagination";
import {
  SORT_BY_ASCENDING,
  SORT_BY_DESCENDING,
  SHOW_ALL,
  SEARCH,
  LIMIT,
} from "./../../constants/constants";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [mode, setMode] = useState(SHOW_ALL);
  const [sortBy, setSortBy] = useState({ sort: "first_name,last_name" });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [recordTotal, setRecordTotal] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { push } = useRouter();

  useEffect(function () {
    loadData();
  }, []);

  useEffect(
    function () {
      setMode(SEARCH);
    },
    [searchTerm]
  );

  useEffect(
    function () {
      setPage(1);
    },
    [mode]
  );

  useEffect(
    function () {
      loadData();
    },
    [mode, sortBy, page, searchTerm]
  );

  async function loadData() {
    try {
      const results = await fetchClients();

      setPages(results.pageCount);
      setClients(results.clients);
      setRecordTotal(results.recordTotal);
    } catch (error) {
      console.log(error);
    }
  }

  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    setPage(page - 1);
  }

  function sortAscending(fields) {
    setMode(SORT_BY_ASCENDING);
    setSortBy({ sort: fields });
  }

  function sortDescending(fields) {
    setMode(SORT_BY_DESCENDING);
    setSortBy({ sort: `-${fields}` });
  }

  async function fetchClients() {
    let clients;

    switch (mode) {
      case SHOW_ALL: {
        clients = await ClientService.getClients({
          ...sortBy,
          ...{ limit: LIMIT, offset: (page - 1) * LIMIT },
        });
        break;
      }
      case SORT_BY_ASCENDING: {
        clients = await ClientService.getClients({
          ...sortBy,
          ...{ limit: LIMIT, offset: (page - 1) * LIMIT },
        });
        break;
      }
      case SORT_BY_DESCENDING: {
        clients = await ClientService.getClients({
          ...sortBy,
          ...{ limit: LIMIT, offset: (page - 1) * LIMIT },
        });
        break;
      }
      case SEARCH: {
        clients = await ClientService.getClientsBySearchTerm({
          q: searchTerm,
          ...{ limit: LIMIT, offset: (page - 1) * LIMIT },
          ...sortBy,
        });
        break;
      }
      default: {
        throw Error("Invalid mode selected");
      }
    }

    return clients;
  }

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <h2 className={styles.heading}>Clients</h2>
        <div>
          <button
            onClick={() => push("/client/new")}
            className={styles.addClientButton}
          >
            <PlusSvg className={styles.plusSvg}></PlusSvg>Add Client
          </button>
        </div>
      </section>
      <section>
        <div className={styles.tableControls}>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            ></input>
          </div>
        </div>
        <ClientsTable
          clients={clients.slice(0, 15)}
          actions={{ sortAscending, sortDescending }}
        />
        <Pagination
          records={clients.length}
          itemsPerPage={LIMIT}
          totalRecords={recordTotal}
          currentPage={page}
          pages={pages}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
        />
      </section>
    </main>
  );
}
