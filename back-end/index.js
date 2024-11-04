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
  const { name, email, password } = req.body;

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
    console.log("asd", newUser);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error during create user:  ${error}` });
  }
});

app.get("/record", async (req, res) => {
  const { user_id } = req.query; // Query params-аас user_id авах

  try {
    // Record болон category хүснэгтийг JOIN хийж авах
    const records = await sql`
       SELECT 
        r.*,                    
        c.name as category_name 
      FROM record r
      LEFT JOIN category c ON r.category_id = c.id 
      WHERE r.user_id= ${user_id}
      ORDER BY r.createdAt DESC   
    `;

    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({
      message: `Internal server error during fetch records: ${error}`,
    });
  }
});
app.get("/transactions/:userId", async (req, res) => {
  const  userid  = req.params.userId;
  try {
    const transactions =
      await sql`SELECT * FROM transactions WHERE userid=${userid}`;
    res.status(200).json(transactions);
  } catch (error) {
    console.error("ererr", error);
    req.status(500).json({ message: "aldaa" });
  }
});
app.get("/category", async (req, res) => {
  try {
    const categories = await sql`SELECT * FROM category ORDER BY id`;
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching categories" });
  }
});
app.post("/transactions", async (req, res) => {
  const { name, amount, category_id } = req.body;
  try {
    const newDashboard =
      await sql`INSERT INTO transactions (name,amount,category_id)
    VALUE (${name},${amount},${category_id})
    RETURNING *
    `;
    res.status(201).json(newDashboard[0]);
  } catch (error) {
    console.error("eriire", error);
    res.status(500).json({ message: "fail transactions" });
  }
});
app.post("/category", async (req, res) => {
  const { name, description, category_icon, icon_color } = req.body;

  try {
    const newCategory = await sql`
      INSERT INTO category (name, description, category_icon, icon_color)
      VALUES (${name}, ${description}, ${category_icon}, ${icon_color})
      RETURNING *
    `;
    res.status(201).json(newCategory[0]);
  } catch (error) {
    console.error("Error adding category:", error);
    res
      .status(500)
      .json({ message: "Internal server error while adding category" });
  }
});

app.post("/record", async (req, res) => {
  const { user_id, payee, amount, type, note, category_id } = req.body;
  console.log("req body", req.body);
  try {
    const newRecord = await sql`
      INSERT INTO record (
        user_id,
        name,
        amount, 
        transaction_type,
        description,
        category_id,
        createdAt,    
        updatedAt     
      ) 
      VALUES (
        ${user_id},
        ${payee},
        ${amount},
        ${type},
        ${note || null},
        ${category_id},
        NOW(),
        NOW()
      )
      RETURNING *
    `;

    res.status(201).json({
      message: "Record created successfully",
      record: newRecord[0],
    });
  } catch (error) {
    res.status(500).json({
      message: ` ${error}`,
    });
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
