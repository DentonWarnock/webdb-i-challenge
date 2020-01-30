const express = require("express");

// database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    // console.log(accounts);
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // promises
  // db("accounts")
  //   .then(accounts => console.log(accounts))
  //   .catch(err => console.log(err));
});

router.get("/:id", async (req, res) => {
  try {
    // select * from accounts where id = 16
    const [account] = await db("accounts").where("id", req.params.id);
    res.json(account);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/", async (req, res) => {
  const accountData = req.body;
  try {
    const account = await db("accounts").insert(accountData);
    res.json(account);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const rowsUpdated = await db("accounts")
      .where("id", req.params.id)
      .update(req.body);
    res.json({ updated: rowsUpdated });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await db("accounts")
      .where("id", req.params.id)
      .del();
    res.json({ deletedRecords: rowsDeleted });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
