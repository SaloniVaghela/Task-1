const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM customers", (err, rows) => {
    if (err) throw err;
    res.render("index", { users: rows });
  });
});

router.get("/add", (req, res) => {
  res.render("add", { error: null });
});

router.post("/add", (req, res) => {
  const { name, email, phone } = req.body;

  if (phone.length !== 10) {
    return res.render("add", {
      error: "Phone number must be exactly 10 digits.",
    });
  }

  db.query("SELECT * FROM customers WHERE email = ?", [email], (err, rows) => {
    if (err) throw err;

    if (rows.length > 0) {
      return res.render("add", {
        error: "Email already exists. Please use a different one.",
      });
    }

    db.query(
      "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone],
      (err) => {
        if (err) throw err;
        res.redirect("/");
      }
    );
  });
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM customers WHERE id = ?", [id], (err, rows) => {
    if (err) throw err;
    res.render("edit", { user: rows[0] });
  });
});

router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  db.query(
    "UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id],
    (err) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM customers WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/delete-all", (req, res) => {
  db.query("DELETE FROM customers", (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/delete-all-confirm", (req, res) => {
  res.render("deleteAllConfirm");
});

module.exports = router;
