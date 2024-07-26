require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path'); // Import path module

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Require config
require("./config/mongoose.config");

// Require routes
require("./routes/product.routes")(app);
require("./routes/user.routes")(app);
require('./routes/userProduct.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/cart.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000");
});
