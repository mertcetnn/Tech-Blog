const router = require("express").Router();

const UserR = require("../api/user-R");
const postR = require("../api/post-R");
const commentR = require("../api/post-R");
router.use("/user", UserR);
router.use("/posts", postR);
router.use("/comment", commentR);

router.use((req, res) => {
  res.status(404).end();
});
module.exports = router;
