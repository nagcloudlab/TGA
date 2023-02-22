let express = require('express');
let router = express.Router();
let _ = require('lodash');

let speakers = require('../data/speakers.json')

router.use('/:id', (req, res, next) => {
    let speaker = _.filter(speakers, { id: req.params.id })[0]
    if (speaker) {
        req.speaker = speaker;
        return next();
    }
    return res.sendStatus(404);
});


//GET
router.get('/', function (req, res, next) {
    res.json(speakers);
});

//GET
router.get('/:id', function (req, res, next) {
    res.json(req.speaker);
});

//POST
router.post('/', function (req, res, next) {
    let body = req.body
    speakers.push(body)
    res.status(201).json(body)
});

//PUT,PATCH
router.patch('/:id', function (req, res, next) {
    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        req.speaker[key] = value;
    });
    res.json(req.speaker);
});

//DELETE
router.delete('/:id', function (req, res, next) {
    speakers = speakers.filter(speaker => speaker.id = req.params.id)
    res.status(200).json({ message: 'deleted' });
});

module.exports = router;
