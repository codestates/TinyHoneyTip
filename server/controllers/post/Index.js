const express = require('express');
const post = express();
const {
    getpostlist,
    uploadpost,
    getpostdetail,
    editpost,
    deletepost,
    like,
    cancellike,
    dislike,
    canceldislike,
    scrap,
    cancelscrap,
    comment,
    deletecomment,
} = require('./PostApi');
const multer = require('multer');
const upload = multer({ dest: 'uploads/ ' });

post.get('/', getpostlist);
<<<<<<< HEAD
//post.post('/', upload.singgle('image'), uploadpost);
=======
post.post('/', upload.single('image'), uploadpost);
>>>>>>> fca1c0d49d8f0dbce5e29a3f7ffefbc02a313a66
post.get('/:id', getpostdetail);
post.patch('/:id', editpost);
post.delete('/:id', deletepost);
post.get('/like/:id', like);
post.delete('/like/:id', cancellike);
post.get('/dislike/:id', dislike);
post.delete('/dislike/:id', canceldislike);
post.get('/scrap/:id', scrap);
post.delete('/scrap/:id', cancelscrap);
post.post('/comment/:id', comment);
post.delete('/comment/:id', deletecomment);

module.exports = post;
