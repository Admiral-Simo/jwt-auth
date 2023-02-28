const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(5000, () => {
  console.log("LISTENING ON PORT 5000");
});
