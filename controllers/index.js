const router = require("express").Router();
// const apiR = require("./api");
const homeR = require("./home-routes.js");

router.use("/", homeR);
// router.use("/api", apiR);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
