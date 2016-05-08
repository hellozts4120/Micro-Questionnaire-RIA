var Form = require('../models/form');

//统一回调函数
var callback = function(req, res, err, data) {
	if(err) {
		res.send({success: false, error: err});
	}
	else {
		res.send({success: true, data: data});
	}
}

module.exports = {
    getForms: function(req, res) {
        
    }
    
    uploadForm: function(req, res) {
        
    }
}