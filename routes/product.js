const { createProduct } = require("../controllers/productController");
const Product = require("../models/Product");

const router = require("express").Router();

// create a product
// post request
// /api/product/create
router.post("/create", createProduct);

// create a product
// get request
// /api/product/create
router.get("/all", async (req, res, next) => {
  try {
    let query = [];

    // query.push({
    //     $match: {
    //       status: "public",
    //     },
    //   });

    // handling search queries
    if (req.query.keyword && req.query.keyword != "") {
      query.push({
        //@ts-ignore
        $match: {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { sku: { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    // handling sort
    if (req.query.sortBy && req.query.sortOrder) {
      var sort = {};
      //@ts-ignore
      sort[req.query.sortBy] = req.query.sortOrder == "asc" ? 1 : -1;
      query.push({
        //@ts-ignore
        $sort: sort,
      });
    } else {
      query.push({
        //@ts-ignore
        $sort: { createdAt: -1 },
      });
    }

    // handling pagination
    let total = await Product.countDocuments(query);
    //@ts-ignore
    let page = req.query.page ? parseInt(req.query.page) : 1;
    //@ts-ignore
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 16;
    let skip = (page - 1) * perPage;

    query.push({
      //@ts-ignore
      $skip: skip,
    });
    query.push({
      //@ts-ignore
      $limit: perPage,
    });

    let products = await Product.aggregate(query);

    return res.status(200).send({
      message: "Products fetched sucessfully",
      length: products.length,
      meta: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
      products,
    });
  } catch (error) {
    console.log("error caught: ", error);
    next(error);
  }
});

// delete a product
// delete request
// /api/product/delete
router.post("/all", (req, res, next) => {
  try {
  } catch (error) {
    console.log("error caught: ", error);
  }
});

module.exports = router;
