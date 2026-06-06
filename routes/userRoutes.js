const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Import authentication guard and validation helpers
const { requireAuth } = require("../middleware/auth");
const { validateRequest } = require("../middleware/validate");

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users from the database
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided data
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserBody'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - validation failed
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Internal server error
 */
router.route("/").get(getUsers).post(validateRequest("userBody"), createUser);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The 24-character Hex ID of the user to retrieve
 *         schema:
 *           type: string
 *           pattern: ^[0-9a-fA-F]{24}$
 *     responses:
 *       200:
 *         description: Successfully retrieved user record
 *       400:
 *         description: Invalid ID format provided in parameters
 *       404:
 *         description: User not found with the provided ID
 *
 *   put:
 *     summary: Update user
 *     description: Update a user's profile information by their ID. Requires session authentication
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The 24-character Hex ID of the user to update
 *         schema:
 *           type: string
 *           pattern: ^[0-9a-fA-F]{24}$
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateBody'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request - validation failed
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: User not found with the provided ID
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete user
 *     description: Delete a user profile completely by their ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The 24-character Hex ID of the user to delete
 *         schema:
 *           type: string
 *           pattern: ^[0-9a-fA-F]{24}$
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid ID format provided in parameters
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: User not found with the provided ID
 */
router
  .route("/:id")
  .get(validateRequest("paramsId", "params"), getUser)
  .put(requireAuth, validateRequest("paramsId", "params"), updateUser)
  .delete(requireAuth, validateRequest("paramsId", "params"), deleteUser);

module.exports = router;
