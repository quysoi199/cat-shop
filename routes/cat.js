var express = require("express");
var router = express.Router();
var catModel = require("../models/cat.model");
const { log } = require("console");

/* GET home page. */

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const page = query.page || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const product = await catModel.find({});

    const pageCount = Math.ceil(product.length / limit) || 1;
    const productByPage = await catModel.find({}).skip(skip).limit(limit);
    res.render("", {
      infor: productByPage,
      pageCount: pageCount,
      page: parseInt(page),
    });
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
    console.log(req.query, "aaa");
    res.redirect("/");
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
