import React from "react";
import { useForm } from "react-hook-form";

export function SignUpPage() {
  return (
    <div>
      <div>Register</div>
      <div>
        <div>Manage all your lottery efficiently</div>
        <p>Let's get you all set up so you can start creating invoices.</p>
      </div>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" />
        </div>
        <div>
          <label>Email</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="text" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="text" />
        </div>
      </form>
    </div>
  );
}
