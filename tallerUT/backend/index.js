require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const https = require("https");
const fs = require("fs");
const cookieParser = require("cookie-parser");



const app = express();
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Base de Datos Funcionando</h1>");
});

const httpsConfig = {
  key: fs.readFileSync("../localhost-key.pem"),
  cert: fs.readFileSync("../localhost.pem"),
};

const httpsServer = https.createServer(httpsConfig, app);

const mecanicoRoutes = require("./routes/mecanicoRoutes");
const adminRoutes = require("./routes/adminRoutes");
const piezaRoutes = require("./routes/piezaRoutes");
const pinturaRoutes = require("./routes/pinturaRoutes");
const trabajoRoutes = require("./routes/trabajoRoutes");
const materialRoutes = require("./routes/materialRoutes");
const reparacionRoutes = require("./routes/reparacionRoutes");

app.use("/mecanico", mecanicoRoutes);
app.use("/admin", adminRoutes);
app.use("/pieza", piezaRoutes);
app.use("/pintura", pinturaRoutes);
app.use("/trabajo", trabajoRoutes );
app.use("/material", materialRoutes);
app.use("/reparacion",reparacionRoutes );

httpsServer.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo por el puerto ${process.env.PORT || 3000}`);
});
