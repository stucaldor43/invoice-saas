import expressLoader from "./express.js";
import sessionLoader from "./session.js";

export default async ({ expressApp }) => {
  await sessionLoader({ app: expressApp });
  console.log("Sessions Initialized");

  await expressLoader({ app: expressApp });
  console.log("Express Initialized");
};
