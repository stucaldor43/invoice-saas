const k = require("stripe");
const stripe = k(
  "pk_test_51Jkh0sCjgqPf0nIkpAhPtcHX7jEgbUMhmpZVZwvsSGWINeqlFgqhUSZs2bAGzWCkW59YbEesW2O5oq787Pls87Xs00DpMP7YRv"
);

class StripeService {
  static async createSession({ items }) {
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://insertProductionDomainHere"
      }/success.html`,
      cancel_url: `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://insertProductionDomainHere"
      }/cancel.html`,
    });

    return session;
  }
}

module.exports = {
  StripeService
}