const router = require("express").Router();

const { getAllStories, getAStory } = require("../controller/storyController");

router.get("/", getAllStories);
router.get("/:storyId", getAStory);

module.exports = router;