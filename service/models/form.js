var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var questionSchema = new Schema({
    type: {type: Number},
    title: {type: String},
    chose: {type: Array},
    isSortable: {type: Boolean}
})

var FormSchema = new Schema({
    _id: {type: Number},
    name: {type: String},
    status: {type: String},
    date: {type: String},
    questions: [questionSchema]
});

var Form = mongodb.mongoose.model("Form", FormSchema);

var FormOperation = function(){};

FormOperation.prototype.getAll = function(callback) {
    Form.find({}, function(err, forms){
        if(forms.length){
            callback(false, forms);
        }
        else{
            callback('查找不到数据！');
        }
    })
}

FormOperation.prototype.remove = function(id, callback) {
    Form.findByIdAndRemove(id, function(err){
        callback(err, null);
    })
}

FormOperation.prototype.getStatus = function(status, callback) {
    Form.find({status: id}, function(err, forms){
        if(forms.length){
            callback(false, forms);
        }
        else{
            callback('查找不到数据！');
        }
    })
}

FormOperation.prototype.getId = function(id, callback) {
    Form.find({_id: id}, function(err, forms){
        if(forms.length){
            callback(false, forms[0]);
        }
        else{
            callback('查找不到数据！');
        }
    })
}

FormOperation.prototype.save = function(obj, callback) {
    var instance = new Form(obj);
    instance.save(function(err){
        callback(err, null);
    });
}

FormOperation.prototype.update = function(obj, callback){
    Form.findByIdAndUpdate(obj._id, obj, {}, function(err){
        callback(err, null);
    });
}

module.exports = new FormOperation();