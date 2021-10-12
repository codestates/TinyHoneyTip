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
const upload = require('../../multer');
// const upload = multer({ dest: 'uploads/ ' });

post.get('/', getpostlist);
post.post('/', upload.array('post_page_img', 5), uploadpost);
post.get('/:id', getpostdetail);
post.patch('/:id', upload.array('post_page_img', 5), editpost);
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
