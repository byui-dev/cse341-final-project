const express = require("express");
const router = express.Router();

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: Retrieve a list of all items
 *     responses:
 *       200:
 *         description: Success
 *
 *   post:
 *     summary: Create a new item
 *     description: Add a new item to the database
 *     responses:
 *       201:
 *         description: Item created successfully
 */
router.route("/").get(getItems).post(createItem);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Retrieve a single item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *
 *   put:
 *     summary: Update item
 *     description: Update an existing item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *
 *   delete:
 *     summary: Delete item
 *     description: Remove an item from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */
router.route("/:id").get(getItem).put(updateItem).delete(deleteItem);

module.exports = router;
