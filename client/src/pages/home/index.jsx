import React, { useEffect } from "react";
import { useAuth } from "./../../hooks/useProvideAuth";
import { useRequireAuth } from "./../../hooks/useRequireAuth";
import "./styles.css";

function Home() {
  const auth = useRequireAuth("/signin");

  useEffect(function () {}, []);

  return <div>Some home page</div>;
}

export default Home;
