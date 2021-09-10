const { user, post_contailner } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
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
};
