const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const test = require('./routes/test')
const auth = require('./routes/login')
// const Testcolumn = require('./model/testmodel')
// const auth = require('./model/testmodel')

// const cors = require("cors");
const port = 3000


const db = require('./db')
app.use(bodyParser())


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use(cors({origin: "http://localhost:4200"}));

app.listen(3000, () => {
  console.log("server is running on port 3000")

})
app.use('/auth', auth)

