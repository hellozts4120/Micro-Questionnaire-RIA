'use strict';

angular.module('questionnaireApp')

.service('formFactory', ['$http', '$q', function($http, $q){

    
    this.getForms = function(){

        return $http.post('/api/getForms', {}).then(function(data){
            return data.data;
        }, function(error) {
            return error.data;
        });

    };

    this.getSpecificForm = function (type) {
        
        return $http.post('/api/getSpecificForm', {status: type});
    };
    
    this.getIdForm = function (id) {
        
        return $http.post('/api/getIdForm', {id: id});

    };
    
    this.deleteSpecificForm = function (obj) {
        
        return $http.post('/api/deleteSpecificForm', {id: obj._id});
    };
    
    this.uploadForm = function (obj) {
        var isFind = false;
        var Forms = $http.post('/api/getForms', {});
        console.log(Forms);
        for (var i = 0; i < Forms.length; i++) {
            if (Forms[i]["_id"] === obj["_id"]) {
                Forms[i] = obj;
                isFind = true;
                break;
            }
        }
        if (!isFind) {
            return $http.post('/api/saveForm', {obj: obj});
        }
        return $http.post('/api/updateForm', {obj: obj});
    }

    
}])

.service('feedbackFactory', ['$http', function($http){
    
    
    this.getFeedbacks = function (id) {
        
        return $http.post('/api/getFeedbacks', {});

    };
        
    this.getIdFeedback = function (id) {
        
        return $http.post('/api/getIdFeedback', {id: id});

    };
    
    this.deleteSpecificFeedback = function (id) {
        
        return $http.post('/api/deleteSpecificFeedback', {id: id});

    };
    
    this.uploadMockData = function (obj) {
        var mock = {};
        mock._id = obj._id;
        mock.feedback = [];
        for (var i = 0; i < obj.questions.length; i++) {
            switch(((obj.questions)[i]).type) {
                case 1:
                    var data1 = [];
                    var sum = 0;
                    for (var j = 0; j < (obj.questions[i]).chose.length - 1; j ++) {
                        var cur = parseFloat(((Math.random()) * 0.3).toFixed(2));
                        sum += parseFloat(cur);
                        data1.push(cur);
                    }
                    data1.push((1.0 - sum));
                    mock.feedback.push({type: 1, portion: data1});
                    break;
                case 2:
                    var data1 = [];
                    for (var j = 0; j < (obj.questions[i]).chose.length; j++) {
                        data1.push(parseFloat((Math.random()).toFixed(2)));
                    }
                    mock.feedback.push({type: 2, portion: data1});
                    console.log(data1);
                    break;
                case 3:
                    var cur = parseFloat((Math.random()).toFixed(2));
                    mock.feedback.push({type: 3, useful: cur});
                    break;
            }
        }
        return $http.post('/api/uploadMockData', {obj: mock});
    }

}])