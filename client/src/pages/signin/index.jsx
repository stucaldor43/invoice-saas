import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "./../../hooks/useRouter";
import { useAuth } from "./../../hooks/useProvideAuth";
import "./styles.css";

export default function SiginPage() {
  const [form, setForm] = useState({});

  function updateForm(evt) {
    setForm({ ...form, ...{ [evt.target.name]: evt.target.value } });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { push } = useRouter();

  const auth = useAuth();

  async function onSubmit(data, e) {
    try {
      await auth.signIn(getValues("email"), getValues("password"));
      push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signin">
      <div className="signin-left"></div>
      <div className="signin-right">
        <div className="signin-container">
          <div className="signin-header">
            <h2 className="signin-heading">Login</h2>
            <p className="sigin-welcomeMessage">
              Welcome back! Please login to your account.
            </p>
          </div>
          <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="signin-row">
              <label className="signin-formLabel">User Name</label>
              <input
                {...register("email", {
                  required: true,
                  minLength: 4,
                  maxLength: 64,
                })}
                name="email"
                className="signin-formInput"
                type="text"
                placeholder="between 4 and 64 characters"
                onChange={updateForm}
              />
            </div>
            <div className="signin-row signin-row--password">
              <label className="signin-formLabel">Password</label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 64,
                })}
                name="password"
                className="signin-formInput"
                type="text"
                placeholder="at least 8 characters"
                onChange={updateForm}
              />
            </div>
            <div className="signin-row">
              <button className="signin-formButton" type="submit">
                Login
              </button>
            </div>
          </form>
          <div>
            Not signed up?{" "}
            <a className="signin-link" href="https://www.google.com">
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
