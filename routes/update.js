const router = require('express').Router();
const CatFancier = require('../models/CatFancier');

router.get('/name/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            let name = data.name;
            res.render('layouts/updates/name.ejs', { name, id });
        }
    });
});

router.post('/name/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {name: name} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let id = data._id;
                    let name = data.name;
                    let age = data.age;
                    let fci = data.favoriteCatImg;
                    res.render('layouts/third-page.ejs', { name, id, age, fci });
                }
            });
        }
    });
});
    
router.get('/age/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id
            let age = data.age;
            res.render('layouts/updates/age.ejs', { age, id });
        }
    });
});

router.post('/age/:id', (req, res) => {
    let id = req.params.id;
    let age = req.body.age;
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {age: age} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let name = data.name;
                    let age = data.age;
                    let id = data._id;
                    let fci = data.favoriteCatImg;
                    res.render('layouts/third-page.ejs', { age, id, name, fci });
                }
            }); 
        }
    });
});

router.get('/fci/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            let fci = data.favoriteCatImg;
            res.render('layouts/updates/fci.ejs', { fci, id });
        }
    });
});


module.exports = router;