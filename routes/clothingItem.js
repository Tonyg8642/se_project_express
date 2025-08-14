const router = require ('express').Router();

// CRUD
const { createItem, getItems, updateItem, deleteItem, likeItem, unlikeItem} = require('../controllers/clothingItem');

// create
router.post('/', createItem);

// Read

router.get('/', getItems);

// Update
router.put('/:itemId', updateItem)

// Delete
router.delete('/:itemId', deleteItem);

//item.id
router.put('/:itemId/likes', likeItem);

router.delete('/:itemId/likes', unlikeItem);


module.exports = router;