

const router = require('express').Router()
const { addGame, getData, getUserBets } = require('../Controller/gamesController')

router.post('/addGame/:id', addGame)
    .get('/getAllGameData', getData)
    .get('/getUserBets/:id', getUserBets)

module.exports = router