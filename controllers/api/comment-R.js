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

router.get("/:id", (req, res) => {
  Comment.findall({
    where: { id: req.params.id },
  })
    .then((dbMainData) => res.json(dbMainData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.id,
    user_id: req.session.user_id,
  })
    .then((dbMainData) => res.json(dbMainData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Comment.update(
    {
      comment_text: req.body.comment_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  then((dbMainData) => {
    if (!dbMainData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(dbMainData);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});
