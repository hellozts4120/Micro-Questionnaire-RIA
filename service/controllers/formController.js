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
        Form.getAll( function(err, data){
            callback(req, res, err, data);
        });
    },
    
    deleteSpecificForm: function(req, res) {
        var id = req.body.id;
        Form.remove(id, function(err, data){
            callback(req, res, err, data);
        });
    },
    
    getSpecificForm: function(req, res) {
        var status = req.body.status;
        Form.getStatus(status, function(err, data){
            callback(req, res, err, data);
        });
    },
    
    getIdForm: function(req, res) {
        var id = req.body.id;
        Form.getId(id, function(err, data){
            callback(req, res, err, data);
        });
    },
    
    saveForm: function(req, res) {
        var obj = req.body.obj;
        console.log(obj);
        Form.save(obj, function(err, data){
            callback(req, res, err, data);
        });
    },
    
    updateForm: function(req, res) {
        var obj = req.body.obj;
        Form.update(obj, function(err, data){
            callback(req, res, err, data);
        });
    }
}