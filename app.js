const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const path = require("path");
const upload = require("./multer/upload")
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const PORT = process.env.PORT_NO;

const connectDB = require("./connection/db");
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use("/api/auth", require("./routes/routes"));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("homepage");
})

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/")
})

const { verify } = require('./jwt/verify');
const { authUpdate, authUsers, authDelete } = require("./middlewares/auth");
app.get("/admin", authUpdate, (req, res) => res.send("Admin Route"));
app.get("/student", authUsers, (req, res) => res.send("Student Route"));

const server = app.listen(PORT, () => {

  console.log(`Server is running on the PORT : ${PORT}`);
})

process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})