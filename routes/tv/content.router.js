const express = require('express');

const Content = require('../../controllers/content.controller');

const router = express.Router();

router.get('/', Content.getContentList);

router.get('/:id', Content.getContentById);

router.post('/', Content.createContent);

router.put('/:id', Content.updateContent);

router.delete('/:id', Content.deleteContent);

router.get('/pass/:contentId', Content.passContent);

router.get('/pass-list/:idUser', Content.getAllPassedTestOfUser);

router.post('/assign', Content.assignContentToUser);

module.exports = router;
