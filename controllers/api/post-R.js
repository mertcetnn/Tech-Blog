const router = require("express").Router();
const { Comment } = require("../../models/post");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbMainData) => res.json(dbMainData.reverse()))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const newPost = await Post.create({ body, username: req.session.username });
    console.log("New Post ", newPost);
    res.json(newPost);
  } catch (err) {
    console.log("IT FAILED!", err);
    res.status(500).json(err);
  }
});
// UPDATE POST
router.put("/:id", withAuth, async (req, res) => {
  try {
    console.log("here is the req.body", req.body);
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
