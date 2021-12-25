const express = require('express');
const router = express.Router();

const { getAllPost, addPost, singlePost, updatePost, deletePost } = require('../controllers/post');

router.get('/', getAllPost);
router.get('/:id', singlePost);
router.post('/create', addPost);
router.patch('/update/:id', updatePost);
router.delete('/:id', deletePost);


module.exports = router;