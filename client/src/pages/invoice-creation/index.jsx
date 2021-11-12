import { Heading } from "./../../components/Heading/index";
import React, { useState, useEffect, useCallback } from "react";
import { InvoiceItemsTable } from "./../../components/InvoiceItemsTable";
import { Button } from "./../../components/Button";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import Switch from "./../../components/Switch";
import { useForm } from "react-hook-form";
import { AutoComplete } from "../../components/AutoComplete";
import { debounce } from "./../../utils/debounce";
import { ClientService } from "../../services/client-service";
import { InvoiceService } from "../../services/invoice-service";
import { useRouter } from "./../../hooks/useRouter";

export function InvoiceCreationPage() {
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [taxPercentage, setTaxPercentage] = useState(0.08);
  const [discount, setDiscount] = useState(0.0);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const { push } = useRouter();

  useEffect(
    function () {
      if (searchTerm !== "") {
        verify(searchTerm);
      }
    },
    [searchTerm]
  );

  const verify = useCallback(
    debounce(async (searchTerm) => {
      const { clients } = await ClientService.getClientsBySearchTerm({
        q: searchTerm,
        ...{ limit: 5, offset: 0, sort: "first_name,last_name" },
      });

      setClientSuggestions(
        clients.map((client) => ({ ...client, selected: false }))
      );
    }, 300),
    []
  );

  function addItem() {
    setInvoiceItems(
      invoiceItems.concat([
        {
          id: uuid(),
          name: "",
          price: Number(1.0),
          quantity: 1,
          cost: Number(1.0),
        },
      ])
    );
  }

  // editItem(4, {cost: 3})
  function editItem(id, arg) {
    setInvoiceItems(
      invoiceItems.map((item) => (item.id === id ? { ...item, ...arg } : item))
    );
  }

  function removeItem(id) {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  }

  function yyyyMMDDToTimestamp(date) {
    const [year, month, day] = date.split("-");
    const time = new Date();
    const offset = time.getTimezoneOffset() / 60;
    return `${year}-${month}-${day} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}${
      offset > 0 ? "+" : "-"
    }${offset}}`;
  }

  const subTotal = invoiceItems.reduce((acc, item) => {
    return acc + item.cost;
  }, 0);

  const tax = taxPercentage * (subTotal - discount);

  const amountDue = subTotal - discount + tax;

  async function onCreate(data) {
    const form = {
      ...data,
      dateDue: new Date(data.dateDue).toISOString(),
      issueDate: new Date(data.issueDate).toISOString(),
      total: amountDue,
      subTotal,
      taxRate: taxPercentage,
      clientId: clientSuggestions.find((client) => client.selected).clientId,
      items: invoiceItems.map(({ name, price, quantity, cost }) => ({
        name,
        price,
        quantity,
        cost,
      })),
    };

    console.log(form);

    try {
      await InvoiceService.addInvoice(form);
      push("/");
    } catch (error) {
      console.log(error);
    }
    /* 
      try {
        await request
        send to previous page or dashboard or invoices (?)
      } catch (error) {

      }
    */
  }

  async function onSave() {
    alert("save");
  }

  async function onPreview() {
    alert("preview");
  }

  function completeFields(id) {
    const client = clientSuggestions.find(
      (suggestion) => suggestion.clientId === id
    );

    setClientSuggestions(
      clientSuggestions.map((clientSuggestion) =>
        clientSuggestion.clientId === id
          ? { ...clientSuggestion, selected: true }
          : { ...clientSuggestion, selected: false }
      )
    );

    setValue("abcd", client.fullName);
    setIsClientDropdownOpen(false);
    setSearchTerm("");
  }

  return (
    <main className={styles.main}>
      <div className={styles.invoiceDetails}>
        <Heading title="New Invoice"></Heading>
        <div className={styles.createInvoice__detailsSection}>
          <div className={styles.topRow}>
            <div className={styles.logoArea}>
              <div className={styles.areaHeading}>Upload logo</div>
              <div className={styles.logoPreview}></div>
            </div>
            <div className={styles.paymentDetails}>
              <div className={styles.areaHeading}>Payment details</div>
              <div>
                <div>
                  <label className={styles.leftLabel}>Issued date</label>
                  <input
                    {...register("issueDate", { required: true })}
                    type="date"
                    className={styles.leftInput}
                  ></input>
                  {errors.issueDate && errors.issueDate.type === "required" && (
                    <span className={styles.error}>Issue date is required</span>
                  )}
                </div>
                <div>
                  <label className={styles.leftLabel}>Due date</label>
                  <input
                    {...register("dateDue", { required: true })}
                    type="date"
                    className={styles.leftInput}
                  ></input>
                  {errors.dateDue && errors.dateDue.type === "required" && (
                    <span className={styles.error}>Due date is required</span>
                  )}
                </div>
                <div>
                  <label className={styles.leftLabel}>Description</label>
                  <input
                    {...register("notes", {
                      maxLength: 512,
                    })}
                    type="text"
                    className={styles.leftInput}
                  ></input>
                  {errors.notes && errors.notes.type === "maxLength" && (
                    <span className={styles.error}>
                      Description can not be greater than 512 characters in
                      length
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.billTo}>
              <div className={styles.areaHeading}>Bill to</div>
              <div>
                <div className={styles.clientInputContainer}>
                  <label className={styles.leftLabel}>Name</label>
                  <input
                    onClick={() => setIsClientDropdownOpen(true)}
                    {...register("abcd", {
                      required: true,
                      maxLength: 256,
                    })}
                    placeholder="Select Customer"
                    type="text"
                    className={styles.leftInput}
                    readOnly
                  ></input>
                  {isClientDropdownOpen ? (
                    <AutoComplete
                      suggestions={clientSuggestions.map((suggestion) => ({
                        id: suggestion.clientId,
                        text: suggestion.fullName,
                      }))}
                      onClick={completeFields}
                      close={() => setIsClientDropdownOpen(false)}
                    >
                      <input
                        className={styles.autoCompleteInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      ></input>
                    </AutoComplete>
                  ) : null}
                  {/* {errors.clientCompany &&
                    errors.clientCompany.type === "required" && (
                      <span className={styles.error}>
                        Client company is required
                      </span>
                    )}
                  {errors.clientCompany &&
                    errors.clientCompany.type === "maxLength" && (
                      <span className={styles.error}>
                        Name of client company can not exceed 256 characters.
                      </span>
                    )} */}
                </div>
                {/* <div>
                  <label className={styles.leftLabel}>Company</label>
                  <input
                    {...register("clientCompany", {
                      required: true,
                      maxLength: 256,
                    })}
                    type="text"
                    className={styles.leftInput}
                  ></input>
                  {errors.clientCompany &&
                    errors.clientCompany.type === "required" && (
                      <span className={styles.error}>
                        Client company is required
                      </span>
                    )}
                  {errors.clientCompany &&
                    errors.clientCompany.type === "maxLength" && (
                      <span className={styles.error}>
                        Name of client company can not exceed 256 characters.
                      </span>
                    )}
                </div> */}
                {/* <div>
                  <label className={styles.leftLabel}>Client Address</label>
                  <input
                    {...register("clientAddress", {
                      required: true,
                      maxLength: 256,
                    })}
                    type="text"
                    className={styles.leftInput}
                  ></input>
                  {errors.clientAddress &&
                    errors.clientAddress.type === "required" && (
                      <span className={styles.error}>
                        Client company address is required
                      </span>
                    )}
                  {errors.clientAddress &&
                    errors.clientAddress.type === "maxLength" && (
                      <span className={styles.error}>
                        Address of client company can not exceed 256 characters.
                      </span>
                    )}
                </div> */}
              </div>
            </div>
            {/* <div className={styles.billFrom}>
              <div className={styles.areaHeading}>Bill from</div>
              <div>
                <div>
                  <label className={styles.leftLabel}>Company</label>
                  <input
                    {...register("consumerCompany", {
                      required: true,
                      maxLength: 256,
                    })}
                    type="text"
                    className={styles.leftInput}
                  ></input>
                  {errors.consumerCompany &&
                    errors.consumerCompany.type === "required" && (
                      <span className={styles.error}>
                        Your company name is required
                      </span>
                    )}
                  {errors.consumerCompany &&
                    errors.consumerCompany.type === "maxLength" && (
                      <span className={styles.error}>
                        Company name can not exceed 256 characters.
                      </span>
                    )}
                </div>
                <div>
                  <label className={styles.leftLabel}>Address</label>
                  <input
                    {...register("consumerAddress", {
                      required: true,
                      maxLength: 256,
                    })}
                    type="text"
                    className={styles.leftInput}
                  ></input>
                  {errors.consumerAddress &&
                    errors.consumerAddress.type === "required" && (
                      <span className={styles.error}>
                        Your company address is required
                      </span>
                    )}
                  {errors.consumerAddress &&
                    errors.consumerAddress.type === "maxLength" && (
                      <span className={styles.error}>
                        Address can not exceed 256 characters.
                      </span>
                    )}
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="createInvoice__itemSection">
          <InvoiceItemsTable
            items={invoiceItems}
            editItem={editItem}
            removeItem={removeItem}
          />
          <Button text={"Add item"} onClick={addItem} />
        </div>
        <div className={styles.createInvoice__totalsSection}>
          <div className={styles.totals}>
            <div className={styles.someRow}>
              <div>Subtotal</div>
              <div>${subTotal.toFixed(2)}</div>
            </div>
            <div className={styles.someRow}>
              <div>Discount</div>
              <div>- ${discount.toFixed(2)}</div>
            </div>
            <div className={styles.someRow}>
              <div>Tax</div>
              <div>${tax.toFixed(2)}</div>
            </div>
            <div className={styles.someRow}>
              <div>Amount due</div>
              <div>${amountDue.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.settings}>
        <div className={styles.invoiceActionButtonsContainer}>
          <div className={styles.invoiceActionButtons}>
            <Button
              text="Create"
              onClick={handleSubmit(onCreate)}
              className={styles.settingsButton}
            />
            <Button
              text="Save Draft"
              onClick={onSave}
              className={styles.settingsButton}
            />
          </div>
          <div>
            <Button
              text="Preview"
              onClick={onPreview}
              className={styles.previewButton}
            ></Button>
          </div>
        </div>
        <div></div>
        <div>
          <div className={styles.controlRow}>
            <div>Client notes</div>
            <Switch />
          </div>
        </div>
      </div>
    </main>
  );
}
