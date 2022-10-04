const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// /api/users/
router
   .route("/")
   .get(getAllUsers)
   .post(createUser);

// /api/users/:id
router
   .route("/:id")
   .get(getUserById)
   .put(updateUserById)
   .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
   .route("/:userId/friends/:friendsId")
   .post(addFriend)
   .delete(removeFriend);

module.exports = router;