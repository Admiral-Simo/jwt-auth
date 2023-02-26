import React, { useEffect, useState } from "react";
import Landing from "../components/Landing";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

const Home = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    alert(Cookies.get("token"));
  }, []);

  return (
    <div className="gradient min-h-screen">
      <Navbar />
      <Landing />
    </div>
  );
};

export default Home;
