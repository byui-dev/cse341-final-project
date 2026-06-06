const Item = require('../models/item');
const { catchAsync } = require('../middleware/errorWithAsync');

// Get all items
exports.getItems = catchAsync(async (req, res, next) => {
  const items = await Item.find();
  res.status(200).json(items);
});

// Get single item
exports.getItem = catchAsync(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }
    res.status(200).json(item);
});

 // Create new item
exports.createItem = catchAsync(async (req, res, next) => {
    // Note: The joi middleware will handle validation before this controller is called
    const item = await Item.create(req.body);
    res.status(201).json(item);
});

// Update item
exports.updateItem = catchAsync(async (req, res, next) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }
    res.status(200).json(item);
});

// Delete item
exports.deleteItem = catchAsync(async (req, res, next) => {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error("Item not found");
    }
    res.status(200).json({ message: 'Item deleted successfully' });
});
        