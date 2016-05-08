var mongodb = require('./mongodb');
var Feedback = require('./feedback');
var Schema = mongodb.mongoose.Schema;

var FeedbackSchema = new Schema({
    _id: String,
    feedback: Array
});

var Feedback = mongodb.mongoose.model("Feedback", FormSchema);
module.exports = Feedback;