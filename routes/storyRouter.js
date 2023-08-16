const router = require("express").Router();
const {
  
  getAUserStory,
  getAllUserStories,
  createStory,
  editStory,
  deleteStory,
} = require("../controller/storyController");

//routes to get stories regardless of user

//route for user
router.route("/").get(getAllUserStories).post(createStory);
router.route("/:storyId").get(getAUserStory).patch(editStory).delete(deleteStory);

module.exports = router;
