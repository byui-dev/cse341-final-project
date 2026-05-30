const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const validateUser = require("../middleware/validate");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Success
 *
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided data
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.route("/").get(getUsers).post(validateUser, createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *
 *   put:
 *     summary: Update user
 *     description: Update a user's information by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *
 *   delete:
 *     summary: Delete user
 *     description: Delete a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router
  .route("/:id")
  .get(getUser)
  .put(validateUser, updateUser)
  .delete(deleteUser);

module.exports = router;
