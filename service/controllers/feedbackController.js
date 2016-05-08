var Feedback = require('../models/feedback');

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
    getFeedbacks: function(req, res) {
        
    }
    
    uploadFeedback: function(req, res) {
        
    }
}