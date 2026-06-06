const express = require("express");
const router = express.Router();

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

// Import authentication guard and validation helpers
const { requireAuth } = require("../middleware/auth");
const { validateRequest } = require("../middleware/validate");

/**
 * @openapi
 * /api/items:
 *   get:
 *     summary: Get all items
 *     description: Retrieve a list of all items from the database
 *     responses:
 *       200:
 *         description: Successfully retrieved list of items
 *       500: 
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a new item
 *     description: Add a new item to the inventory system. Requires session authentication.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/ItemBody'
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Bad request - validation failed
 *       401:
 *         description: Unauthorized - authentication required
 *       500:
 *         description: Internal server error
 */
router.route("/")
  .get(getItems)
  .post(requireAuth, validateRequest('itemBody'), createItem);

/**
 * @openapi
 * /api/items/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Retrieve a single item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The 24-character Hex ID of the item to retrieve
 *         schema:
 *           type: string
 *           pattern: ^[0-9a-fA-F]{24}$
 *     responses:
 *       200:
 *         description: Successfully retrieved item record
 *       400:
 *         description: Invalid ID format provided in parameters
 *       404:
 *        description: Item not found with the provided ID      
 *     
 *   put:
 *     summary: Update item
 *     description: Modify  an existing item's details by its ID. Requires session authentication.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The 24-character HEx ID of the item to update
 *         schema:
 *           type: string
 *           pattern: ^[0-9a-fA-F]{24}$
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/ItemBody'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Bad request - validation failed
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Item not found with the provided ID
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     summary: Delete item
 *     description: Permanently remove an item from the inventory by its ID. Requires session authentication.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The 24-character Hex ID of the item
 *         schema:
 *           type: string
 *           pattern: ^[0-9a-fA-F]{24}$ 
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       400:
 *         description: Invalid ID format provided in parameters
 *       401:
 *         description: Unauthorized - authentication required
 *      404:
 *        description: Item not found with the provided ID
 */
router.route("/:id")
  .get(validateRequest('paramsId', 'params'), getItem)
  .put(requireAuth, validateRequest('paramsId', 'params'), validateRequest('itemBody'), updateItem)
  .delete(requireAuth, validateRequest('paramsId', 'params'), deleteItem);

module.exports = router;
