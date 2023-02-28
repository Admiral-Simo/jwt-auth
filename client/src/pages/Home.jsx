import React, { useEffect, useState } from "react";
import Landing from "../components/Landing";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { selectToken } from "../features/slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Recipes from "../components/Recipes";

const Home = () => {
  const [showRecipes, setShowRecipes] = useState(false);
  const token = useSelector(selectToken);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/recipe",
        {
          headers: {
            authorization: token,
          },
        }
      );
      setData(data);
      setShowRecipes(!showRecipes);
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/connected", {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        alert(token);
        console.log(err);
        navigate("/login");
      });
  }, []);

  return (
    <div className="gradient min-h-screen">
      <Navbar setShowRecipes={setShowRecipes} />
      {showRecipes ? <Recipes data={data} /> : <Landing handleClick={handleClick} />}
    </div>
  );
};

export default Home;
