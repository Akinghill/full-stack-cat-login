const router = require('express').Router();
const CatFancier = require('../../models/CatFancier');
const User = require('../../models/User');
const {
    ensureAuthenticated
} = require('../../passport/auth');

router.get('/landing/:id', ensureAuthenticated, (req, res) => {
    User.findById({
        _id: req.params.id
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let id = data._id;
            let email = data.email;
            CatFancier.findOne({
                user_id: id
            }, (err, data) => {
                if (err) {
                    console.log(err)
                } else if (!data || data === undefined) {
                    res.render('layouts/profile/form', {
                        name,
                        id
                    });
                } else {
                    let name = data.name;
                    let age = data.age;
                    let fci = data.favoriteCatImg;
                    let id = data._id;
                    let user_id = data.user_id;
                    res.render('layouts/profile/third-page.ejs', {
                        email,
                        name,
                        age,
                        fci,
                        id,
                        user_id
                    });
                }
            });
        }
    });
});

router.post('/catimage/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    let age = req.body.age;
    User.findById({
        _id: id
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let user_id = data._id;
            let catFancier = new CatFancier({
                name,
                age,
                user_id
            });
            catFancier.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let id = data._id;
                    CatFancier.findById({
                        _id: id
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            let name = data.name;
                            let age = data.age;
                            let id = data._id;
                            res.render('layouts/profile/other-page', {
                                name,
                                age,
                                id
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get('/third-page/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    CatFancier.findById({
        _id: id
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let age = data.age;
            let fci = data.favoriteCatImg;
            let user_id = data.user_id;
            let id = data._id;
            User.findOne({
                _id: user_id
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let email = data.email
                    res.render('layouts/profile/third-page', {
                        name,
                        email,
                        age,
                        fci,
                        id,
                        user_id
                    });
                }
            });
        }
    });



});


router.post('/third-page/:id', ensureAuthenticated, (req, res) => {
    let src = req.body.src;
    let id = req.params.id;
    CatFancier.findByIdAndUpdate({
        _id: id
    }, {
        $set: {
            favoriteCatImg: src
        }
    }, {
        new: true
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data.id;
            CatFancier.findById({
                _id: id
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let name = data.name;
                    let age = data.age;
                    let fci = data.favoriteCatImg;
                    let user_id = data.user_id;
                    let id = data._id;
                    User.findOne({
                        _id: user_id
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            let email = data.email
                            res.render('layouts/profile/third-page', {
                                name,
                                email,
                                age,
                                fci,
                                id,
                                user_id
                            });
                        }
                    });
                }
            });
        }
    });

});

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    CatFancier.findById({
        _id: id
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let user_id = data.user_id;
            User.findByIdAndRemove({
                _id: user_id
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    CatFancier.findByIdAndRemove({
                        _id: id
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/');
                        }
                    });
                }
            });
        }
    });
});


module.exports = router;