import { Heading } from "./../../components/Heading/index";
import React, { useState } from "react";
import { InvoiceItemsTable } from "./../../components/InvoiceItemsTable";
import { Button } from "./../../components/Button";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import Switch from "./../../components/Switch";
import { useForm } from "react-hook-form";

export function InvoiceCreationPage() {
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, name: "", cost: 15.0, quantity: 3 },
  ]);
  const [taxPercentage, setTaxPercentage] = useState(0.08);
  const [discount, setDiscount] = useState(2.0);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function addItem() {
    setInvoiceItems(
      invoiceItems.concat([
        {
          id: uuid(),
          name: "",
          cost: Number(1.0).toFixed(2),
          quantity: 1,
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

  async function onCreate() {
    alert("create");
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

  const subTotal = invoiceItems.reduce((acc, item) => {
    return acc + item.cost * item.quantity;
  }, 0);

  const tax = taxPercentage * (subTotal - discount);

  const amountDue = subTotal - discount + tax;

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
                    {...register("dueDate", { required: true })}
                    type="date"
                    className={styles.leftInput}
                  ></input>
                  {errors.dueDate && errors.dueDate.type === "required" && (
                    <span className={styles.error}>Due date is required</span>
                  )}
                </div>
                <div>
                  <label className={styles.leftLabel}>Description</label>
                  <input
                    {...register("description", {
                      maxLength: 512,
                    })}
                    type="text"
                    className={styles.leftInput}
                  ></input>
                  {errors.description &&
                    errors.description.type === "maxLength" && (
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
                <div>
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
                </div>
                <div>
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
                </div>
              </div>
            </div>
            <div className={styles.billFrom}>
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
            </div>
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
