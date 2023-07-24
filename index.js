const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const test = require('./routes/test')
const auth = require("./routes/login");
const channelList = require("./routes/channelList");
const makePayment = require("./routes/makePayment");

// const Testcolumn = require('./model/testmodel')
// const auth = require('./model/testmodel')

const cors = require("cors");
const port = 4000;

const db = require("./db");
app.use(bodyParser());
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use(cors({origin: "http://localhost:4200"}));

app.listen(port, () => {
  console.log("server is running on port 4000");
});
app.use("/auth", auth);
app.use("/channelList", channelList);
app.use("/makePayment", makePayment);
