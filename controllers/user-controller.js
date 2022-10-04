const { Thought, User } = require("../models");

const userController = {
    // Get all Users
    getAllUsers(req, res) {
      User.find({})
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // Get a single User
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User found with this ID" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // Create User
    createUser({ body }, res) {
      User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
  
    // Update User
    updateUserById({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User found with this ID" });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    // Delete User
    deleteUser({ params }, res) {
      User.findByIdAndDelete({ _id: params.id })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User found with this ID" });
            return;
          }
          res.json(dbUserData);
          console.log(dbUserData);
          return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // Add Friend 
    addFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendsId } },
        { new: true, runValidators: true }
      )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // Remove Friend
    removeFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendsId } },
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User found with this ID" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  };
  
  module.exports = userController;