var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var FeedbackSchema = new Schema({
    _id: Number,
    feedback: Array
});

var Feedback = mongodb.mongoose.model("Feedback", FeedbackSchema);

var FeedbackOperation = function(){};

FeedbackOperation.prototype.getAll = function(callback) {
    Feedback.find({}, function(err, feedbacks){
        if(feedbacks.length){
            callback(false, feedbacks);
        }
        else{
            callback('查找不到数据！');
        }
    })
}

FeedbackOperation.prototype.getId = function(id, callback) {
    Feedback.find({_id: id}, function(err, feedbacks){
        if(feedbacks.length){
            callback(false, feedbacks[0]);
        }
        else{
            callback('查找不到数据！');
        }
    })
}

FeedbackOperation.prototype.remove = function(id, callback) {
    Feedback.findByIdAndRemove(id, function(err){
        callback(err, null);
    })
}

FeedbackOperation.prototype.save = function(obj, callback) {
    var instance = new Feedback(obj);
    instance.save(function(err){
        callback(err, null);
    });
}

module.exports = new FeedbackOperation();