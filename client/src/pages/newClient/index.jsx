import { Heading } from "./../../components/Heading";
import React from "react";
import { useForm } from "react-hook-form";
import { ClientService } from "./../../services/client-service";
import "./styles.css";
import { useRouter } from "./../../hooks/useRouter";

export default function NewClientPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  console.log(watch());

  const { push } = useRouter();

  async function onSubmit(data) {
    try {
      console.log(data);
      await ClientService.addClient(data);
      push("/clients");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="newClient__page">
      <Heading title={"New Customer"} />
      <form className="newClient__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="newClient__formRow">
          <label>Client Type</label>
          <div className="newClient__customerTypeInputContainer">
            <div>
              <input
                {...register("clientType", { required: true })}
                className="newClient__customerTypeInput"
                type="radio"
                name="clientType"
                value="INDIVIDUAL"
              />
              Individual
            </div>
            <div>
              <input
                {...register("clientType", { required: true })}
                className="newClient__customerTypeInput"
                type="radio"
                name="clientType"
                value="COMPANY"
              />
              Company
            </div>
          </div>
        </div>
        <div className="newClient__formRow">
          <label>First Name</label>
          <input
            {...register("firstName", {
              required: true,
              minLength: 1,
              maxLength: 128,
            })}
            type="text"
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <div className="errorMessage">This is required</div>
          )}
        </div>
        <div className="newClient__formRow">
          <label>Last Name</label>
          <input
            {...register("lastName", {
              required: true,
              minLength: 1,
              maxLength: 128,
            })}
            type="text"
          />
        </div>
        {getValues("clientType") === "COMPANY" ? (
          <div className="newClient__formRow">
            <label>Company</label>
            <input type="text" />
          </div>
        ) : null}
        <div className="newClient__formRow">
          <label>Email</label>
          <input
            {...register("email", {
              required: true,
              minLength: 2,
              maxLength: 128,
            })}
            type="text"
          />
        </div>
        <div className="newClient__formRow">
          <label>Phone</label>
          <input
            {...register("phone", {
              required: true,
            })}
            type="text"
          />
        </div>
        <div className="newClient__formRow">
          <label>Address</label>
          <input
            {...register("address1", {
              required: true,
              minLength: 2,
              maxLength: 128,
            })}
            type="text"
          />
        </div>
        <div className="newClient__formRow">
          <label>City</label>
          <input
            {...register("city", {
              required: true,
              minLength: 2,
              maxLength: 128,
            })}
            type="text"
          />
        </div>
        <div className="newClient__formRow">
          <label>State</label>
          <input
            {...register("state", {
              required: true,
              minLength: 2,
              maxLength: 128,
            })}
            type="text"
          />
        </div>
        <div className="newClient__formRow">
          <label>Zip Code</label>
          <input
            {...register("zipCode", {
              required: true,
              minLength: 1,
              maxLength: 16,
            })}
            type="text"
          />
        </div>
        <div className="newClient__submitBtnContainer">
          <button type="submit" className="newClient__createClientBtn">
            Create Client
          </button>
        </div>
      </form>
    </div>
  );
}
