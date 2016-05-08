var mongodb = require('./mongodb');
var Feedback = require('./feedback');
var Schema = mongodb.mongoose.Schema;

var FormSchema = new Schema({
    _id: String,
    name: String,
    status: String,
    date: String,
    questions: Array
});

var Form = mongodb.mongoose.model("Form", FormSchema);
module.exports = Form;