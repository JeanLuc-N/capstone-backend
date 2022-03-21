const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require("dotenv").config()


const app = express();
const uri = "mongodb://localhost/capstone";

mongoose.connect(uri, {useNewUrlParser:true});

const conn = mongoose.connection;

conn.on('open', ()=>{
    console.log("connection started...");
})

//swagger
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: "http://localhost:4000",
          description: "My API Documentation",
        },
      ],
    },
    apis: ['./routes/*.js']
  };
  
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());


const subRoute = require('./routes/subscribe');
app.use('/subscribe', subRoute);

const contactRoute = require('./routes/contact');
app.use('/contact', contactRoute);

const blogRoute = require('./routes/blog');
app.use('/blog', blogRoute);

const registerRoute = require("./routes/register");
app.use('/register',registerRoute);

const userRoute = require('./routes/user');
app.use('/user', userRoute);

const loginRoute = require('./routes/login');
app.use('/login', loginRoute.router);

const refreshTokenRoute = require("./routes/refreshToken");
app.use('/refreshToken', refreshTokenRoute);

const logoutRoute = require("./routes/logout");
app.use('/logout', logoutRoute);

const PORT = process.env.TOKEN_SERVER_PORT || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})

module.exports = app;