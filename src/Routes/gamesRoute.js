

const router = require('express').Router()
const { addGame } = require('../Controller/gamesController')

router.post('/addGame', addGame)

module.exports = router