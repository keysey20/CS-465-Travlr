const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

// Travlr MVC routes
router.get('/', mainController.index);
router.get('/index.html', mainController.index);
router.get('/travel.html', (req, res) => res.redirect('/travel'));
router.get('/rooms.html', mainController.rooms);
router.get('/meals.html', mainController.meals);
router.get('/news.html', mainController.news);
router.get('/about.html', mainController.about);
router.get('/contact.html', mainController.contact);

module.exports = router;
