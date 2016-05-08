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
        Feedback.getAll( function(err, data){
            callback(req, res, err, data);
        });
    },
    
    getIdFeedback: function(req, res) {
        var id = req.body.id;
        Feedback.getId(id, function(err, data){
            callback(req, res, err, data);
        });
    },
    
    deleteSpecificFeedback: function(req, res) {
        var id = req.body.id;
        Feedback.remove(id, function(err, data){
            callback(req, res, err, data);
        });
    },
    
    uploadMockData: function(req, res) {
        var obj = req.body.obj;
        Feedback.save(obj, function(err, data){
            callback(req, res, err, data);
        });
    }
}