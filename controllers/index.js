const router = require("express").Router();
// const apiR = require("./api");
const homeR = require("./home-routes.js");
const dashboard = require("./dashboard-route");
router.use("/", homeR);
router.use("/dashboard", dashboard);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
