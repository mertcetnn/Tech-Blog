const router = require("express").Router();
const { User, Post, Comment } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  console.log("test");
  try {
    const dbMainData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "user_comment",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbMainData.map((post) => post.get({ plain: true }));

    res.render("second", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const dbMainData = await post.findByPk(req.params.id, {
      include: [
        {
          attributes: ["id", "title", "content", "created_at"],
          include: [
            {
              model: Comment,
              attributes: [
                "id",
                "user_comment",
                "post_id",
                "user_id",
                "created_at",
              ],
              include: {
                model: User,
                attributes: ["username"],
              },
            },
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const post = dbMainData.get({ plain: true });
    res.render("post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
