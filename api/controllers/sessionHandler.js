exports.redirectLogin = function(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/')
    } else {
        next();
    }
}

exports.redirectHome = function(req, res, next) {
    if (req.session.userId) {
        res.redirect('/dashboard')
    } 
    else {
        next();
    }
}

exports.logout = function(req, res, next) {    
    req.session.destroy(err => {
        res.clearCookie('sid')
        res.redirect('/')
    });
}