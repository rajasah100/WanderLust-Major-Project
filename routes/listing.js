const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage: storage });


// Index Route

// Index + Create
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createListing)
  );


// New Form
router.get("/new", isloggedIn, listingController.renderNewForm);


// EDIT ROUTE (Important: Should be before show)
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


// SHOW + UPDATE + DELETE ROUTE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isloggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isloggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

module.exports = router;

