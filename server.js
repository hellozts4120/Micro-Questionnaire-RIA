var express = require('express');
var app = express();
app.listen(3000);

var _rootDir = __dirname;
var serviceDir = _rootDir + '/service/';

app.use(express.static(_rootDir));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var formController = require(serviceDir + 'controllers/formController');
var feedbackController = require(serviceDir + 'controllers/feedbackController');

//注册路由
app.get('/', function(req, res) {
    res.sendFile(_rootDir + '/app/index.html');
});

var apiRouter = express.Router();
apiRouter.post('/getForms', formController.getForms);
apiRouter.post('/getSpecificForm', formController.getSpecificForm);
apiRouter.post('/getIdForm', formController.getIdForm);
apiRouter.post('/deleteSpecificForm', formController.deleteSpecificForm);
apiRouter.post('/uploadForm', formController.uploadForm);
apiRouter.post('/getFeedbacks', feedbackController.getFeedbacks);
apiRouter.post('/getIdFeedback', feedbackController.getIdFeedback);
apiRouter.post('/deleteSpecificFeedback', feedbackController.deleteSpecificFeedback);
apiRouter.post('/uploadMockData', feedbackController.uploadMockData);

app.use('/api', apiRouter);

app.use(function(req, res, next) {
	res.status(404).sendFile(_rootDir + '/src/404.html');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('500 Error');
});