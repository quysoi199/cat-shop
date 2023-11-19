var express = require("express");
var router = express.Router();
var catModel = require("../models/cat.model");
const { log } = require("console");

/* GET home page. */

router.get("/", async (req, res) => {
  try {
    const product = await catModel.find({});
    res.render("cat", { infor: product });
    // res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await catModel.findById(id);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const product = await catModel.find({});
    const cat = await catModel.create(req.body);
    product.push(cat);
    res.redirect("/cat");
    // res.status(200).json(cat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await catModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Can not find id ${id}` });
    }
    // res.redirect("/cat");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/put/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await catModel.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `Can not find id ${id}` });
    }
    const updateProductId = await catModel.findById(id);
    console.log(updateProductId, "123");
    res.status(200).json(updateProductId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/", (req, res) => {
//   let quote = ["Hello word", "Hello 2"];
//   res.render("cat", { infor: quote });
// });

module.exports = router;
