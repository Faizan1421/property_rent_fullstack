import {
  addListingImages,
  createListing,
  deleteListing,
  deleteListingImages,
  getAllListings,
  getListingById,
  searchListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { Router } from "express";
import { ApiError } from "../utils/ApiError.js";
const router = Router();
router
  .route("/create-listing")
  .post(
    verifyJWT,
    checkRole("seller", "admin"),
    upload.array("listingImages", 15),
    (req, res, next) => {
      if (req?.files?.length < 1) { // minimum 1 image is required
       throw new ApiError(401, "Atleast 1 Image is Required for Creating Listing")
      }
      next();
    },
    createListing
  );
  
router.route("/:id").delete(verifyJWT, checkRole("seller","admin"), deleteListing);

router.route("/:id").patch(verifyJWT, checkRole("seller","admin"), updateListing);

router
  .route("/:id/images")
  .patch(
    verifyJWT,
    checkRole("seller","admin"),
    upload.array("listingImages", 1),
    addListingImages
  );

router
  .route("/:id/images/:publicId")
  .delete(verifyJWT, checkRole("seller","admin"), deleteListingImages);

router.route("/single/:id").get(getListingById);
router.route("/c/:category?").get(getAllListings);
router.route("/search").get(searchListings);
export default router;

//!NOTE: we receive images from frontend with name like "listingImages" set in multer middleware
