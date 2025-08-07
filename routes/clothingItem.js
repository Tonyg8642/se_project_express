const router = require ('express').Router();

//CRUD
const { createItem, getItems, updateItem, deleteItem } = require('../controllers/clothingItem');

//create
router.post('/', createItem);

//Read

router.get('/', getItems);

//Update
router.put('/:itemId', updateItem)

//Delete
router.delete('/:itemId', deleteItem);


module.exports = router;