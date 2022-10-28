const router = require("express").Router();
const { Comment } = require("../../models/comment");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Comment.findall({})
    .then((dbMainData) => res.json(dbMainData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
