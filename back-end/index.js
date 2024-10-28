import { neon } from "@neondatabase/serverless";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { request } from "express";
import cors from "cors";
// import bcrypt from "bcrypt";
dotenv.config();

const app = express();
const corsOptions = {
  origin: "*", // allow requests from this origin
  methods: "GET,POST", // allow these methods
  allowedHeaders: ["Content-Type"], // allow these headers
  credentials: true, // include credentials
  maxAge: 3600, // cache preflight results for 1 hour
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = 8000;
const sql = neon(`${process.env.DATABASE_URL}`);

app.post("/sign_up", async (req, res) => {
  const {name, email, password } = req.body;

  try {
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await sql`
        INSERT INTO users (name,email, password) 
        VALUES (${name},${email}, ${password})
        RETURNING id, email
      `;
   console.log("asd",newUser);
   

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error during create user:  ${error}` });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      return res.status(400).json({ message: "email or password not match" });
    }

    if (user[0].password !== password) {
      return res.status(400).json({ message: "password not match" });
    }

    res.status(200).json({ message: "Login successful", user: user[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error during login user" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
