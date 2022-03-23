const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require("cors");
require("dotenv").config()


const app = express();
const uri = "mongodb+srv://clif:clif123@cluster0.fcz3q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser:true});

const conn = mongoose.connection;

conn.on('open', ()=>{
    console.log("connection started...");
})

app.use(cors())
//swagger
// Swagger Info Object
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation',
      description: 'API Documentation',
      contact: {
        name: 'My Brand'
      },
      server: 'http://localhost:4000'
    }
  },
  components: {
    securitySchemes: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    jwt: []
  }],
  apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(express.json());


const subRoute = require('./routes/subscribe');
app.use('/subscribe', subRoute);

const contactRoute = require('./routes/contact');
app.use('/contact', contactRoute);

const blogRoute = require('./routes/blog');
app.use('/blog', blogRoute);
const commentRoute = require('./routes/comment');
app.use('/', commentRoute);

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

const PORT = process.env.TOKEN_SERVER_PORT || process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})

module.exports = app;