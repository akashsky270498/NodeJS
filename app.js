const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const path = require("path");
const upload = require("./multer/uploadFile")
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const PORT = process.env.PORT_NO;

const connectDB = require("./connection/db");
connectDB();


app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "img-src 'self' https://cdn.pixabay.com; script-src 'self' https://checkout.razorpay.com;");
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://checkout.razorpay.com 'unsafe-inline'"
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://checkout.razorpay.com 'unsafe-inline' https://ajax.googleapis.com"
  );
  next();
});



app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());


const options = {
    swaggerDefinition: {
  
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'API documentation using Swagger'
        },
        servers: [
          {
            url: 'http://localhost:3300'
          }
        ],
      components: {
        securitySchemes: {
          BearerAuth: {
            bearerFormat: 'JWT',
            scheme: 'bearer',
            type: 'http',
          },
        },
      },
  
      security: [
        {
      BearerAuth: []
    }
  ],
  apis: ['./routes/*.js'],
    },
      apis: ['./routes/*.js'] // Path to the API route files
    };
  
   const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());
app.use(cookieParser());

app.use(cors());

const paymentRoutes = require("./routes/paymentRoutes")


app.use("/api/auth", require("./routes/routes"));
app.use("/", paymentRoutes);
app.use("/api/auth", require("./routes/searchRoute"));
app.use("/api/auth", require("./routes/multerRoute"));
app.use("/",require("./routes/fileViewRoute"));



app.use(express.urlencoded({ extended : false}));


const { authUpdate, authUsers, authDelete } = require("./middlewares/auth");
app.get("/admin", authUpdate, (req, res) => res.send("Admin Route"));
app.get("/all-users", authUsers, (req, res) =>  res.send("Student Route"));

const server = app.listen(PORT, () =>{
    
    console.log(`Server is running on the PORT : ${PORT}`);
})


process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })

