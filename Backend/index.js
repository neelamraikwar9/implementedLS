const express = require("express"); 
const app = express();
require("dotenv").config(); 
const { initializeDB } = require("./database/db.connect");
const bodyParser = require("body-parser"); 
const cors = require("cors"); 
const auth = require("./routes/auth"); 
// const proAuth = require("./middleware/proAuth"); 
const productRouter = require("./routes/productRouter"); 

initializeDB(); 

app.get("/welcome", (req, res) => {
    res.send('Welcome to lovers world.')
})

app.use(bodyParser.json()); 
app.use(cors()); 
app.use('/auth', auth);

app.use("/products", productRouter);



const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`); 
})