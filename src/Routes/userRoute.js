const res = require('express/lib/response')

const router = require('express').Router()


    router.get('/testing', (req, res) => {
        res.send('hellow from server')
    })


module.exports = router