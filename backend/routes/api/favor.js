const express = require("express");
const router = express.Router();
const Favor = require("../../models/Favor");
const passport = require("passport");

// Retrieve favor list for a specific user
router.get(
  "/user/:userID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Favor.find({ ownerID: req.params.userID })
      .populate("debtorID", "userName")
      .populate({ path: "items.id", select: "prize" })
      .exec()
      .then((favors) => res.status(200).json(favors))
      .catch((err) =>
        res
          .status(400)
          .json({ user: "Error fetching requests of logged in user!" })
      );
  }
);

// Create new favor
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const favor = req.body;
    const newFavor = new Favor(favor);
    newFavor
      .save()
      .then((favor) => res.json(favor))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

// Update a specific favor's status as Completed
router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favor.update({ _id: req.params.id }, { $set: { isComplete: true } })
      .populate("ownerID", "userName")
      .populate({ path: "items.id", select: "prize" })
      .exec()
      .then(() => res.json("Favor is marked as completed!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

// Delete a specific favor
router
  .route("/delete/:id")
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    Favor.deleteOne({ _id: req.params.id })
      .then(() => res.json("Item Deleted"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

// Get debt list from a specific user
router.get(
  "/debt",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favor.find({ debtorID: req.user._id })
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  }
);
module.exports = router;
