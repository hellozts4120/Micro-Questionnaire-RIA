'use strict';

angular.module('questionnaireApp')

.service('formFactory', function() {

    //localStorage.clear();
    if (!localStorage.getItem("forms")) {
        var Forms = [
                    {
                        _id:0,
                        name:'问卷调查1',
                        status: "onboard",
                        date:"2016-04-12 17:57:28",
                        questions: [
                            {
                                type: 1,
                                title: "问题1",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable: true
                            },
                            
                            {
                                type: 2,
                                title: "问题2",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable: true
                            },
                            
                            {
                                type: 3,
                                title: "问题3",
                                isMustAnswer: true,
                                isSortable: false
                            },
                            
                            {
                                type: 1,
                                title: "问题4",
                                chose: ["选项1", "选项2"],
                                isSortable: true
                            },
                            
                            {
                                type: 2,
                                title: "问题5",
                                chose: ["选项1", "选项2", "选项3"],
                                isSortable: true
                            }
                           
                        ]
                    },
                    
                    {
                        _id: 1,
                        name:'问卷调查2',
                        status: "offboard",
                        date:"2016-04-10 17:57:28",
                        questions: [
                            {
                                type: 1,
                                title: "问题1",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable: true
                            },
                            
                            {
                                type: 2,
                                title: "问题2",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable: true
                            },
                            
                            {
                                type: 3,
                                title: "问题3",
                                isMustAnswer: true,
                                isSortable: false
                            },
                            
                            {
                                type: 1,
                                title: "问题4",
                                chose: ["选项1", "选项2"],
                                isSortable: true
                            },
                            
                            {
                                type: 2,
                                title: "问题5",
                                chose: ["选项1", "选项2", "选项3"],
                                isSortable: true
                            }
                           
                        ]
                    },
                    
                    {
                        _id: 2,
                        name:'问卷调查3',
                        status: "ended",
                        date:"2016-03-12 17:57:28",
                        questions: [
                            {
                                type: 1,
                                title: "问题1",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable: true
                            },
                            
                            {
                                type: 2,
                                title: "问题2",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable: true
                            },
                            
                            {
                                type: 3,
                                title: "问题3",
                                isMustAnswer: true,
                                isSortable: false
                            },
                            
                            {
                                type: 1,
                                title: "问题4",
                                chose: ["选项1", "选项2"],
                                isSortable: true
                            },
                            
                            {
                                type: 2,
                                title: "问题5",
                                chose: ["选项1", "选项2", "选项3"],
                                isSortable: true
                            }
                           
                        ]
                    }
        ];
        localStorage.setItem('forms', JSON.stringify(Forms));
    }
    else var Forms = JSON.parse(localStorage.getItem('forms'));


    this.getForms = function(){
        
        return Forms;
        
    };

    this.getSpecificForm = function (type) {
        
        var res = [];
        
        for (var i = 0; i < Forms.length; i++) {
            if (Forms[i]["status"] == type) {
                res.push(Forms[i]);
            }
        }
        
        return res;
    };
    
    this.getIdForm = function (id) {
        
        for (var i = 0; i < Forms.length; i++) {
            if (Forms[i]["_id"] == id) {
                return Forms[i];
            }
        }

    };
    
    this.deleteSpecificForm = function (obj) {
        
        for (var i = 0; i < Forms.length; i++) {
            if (Forms[i] === obj) {
                Forms.splice(i, 1);
                break;
            }
        }
        
        localStorage.setItem('forms', JSON.stringify(Forms));
    };
    
    this.uploadForm = function (obj) {
        var isFind = false;
        for (var i = 0; i < Forms.length; i++) {
            if (Forms[i]["_id"] === obj["_id"]) {
                Forms[i] = obj;
                isFind = true;
                break;
            }
        }
        if (!isFind) {
            Forms.push(obj);
        }
        localStorage.setItem('forms', JSON.stringify(Forms));
    }

    
})

.service('feedbackFactory', function() {
    if (!localStorage.getItem("feedbacks")) {
        var Feedbacks = [
                    {
                        _id:0,
                        feedback: [
                            {
                                type: 1,
                                portion: [0.34, 0.26, 0.30, 0.10]
                            },
                            
                            {
                                type: 2,
                                portion: [0.14, 0.60, 0.06, 0.20]
                            },
                            
                            {
                                type: 3,
                                useful: 0.66
                            },
                            
                            {
                                type: 1,
                                portion: [0.62, 0.38]
                            },
                            
                            {
                                type: 2,
                                portion: [0.24, 0.56, 0.20]
                            }
                           
                        ]
                    },
                    
                    {
                        _id:1,
                        feedback: [
                            {
                                type: 1,
                                portion: [0.27, 0.33, 0.10, 0.30]
                            },
                            
                            {
                                type: 2,
                                portion: [0.24, 0.50, 0.20, 0.06]
                            },
                            
                            {
                                type: 3,
                                useful: 0.36
                            },
                            
                            {
                                type: 1,
                                portion: [0.75, 0.25]
                            },
                            
                            {
                                type: 2,
                                portion: [0.14, 0.60, 0.26]
                            }
                           
                        ]
                    },
                    
                    {
                        _id:2,
                        feedback: [
                            {
                                type: 1,
                                portion: [0.10, 0.32, 0.26, 0.32]
                            },
                            
                            {
                                type: 2,
                                portion: [0.20, 0.50, 0.06, 0.24]
                            },
                            
                            {
                                type: 3,
                                useful: 0.80
                            },
                            
                            {
                                type: 1,
                                portion: [0.30, 0.70]
                            },
                            
                            {
                                type: 2,
                                portion: [0.26, 0.60, 0.14]
                            }
                           
                        ]
                    }
        ];
        localStorage.setItem('feedbacks', JSON.stringify(Feedbacks));
    }
    else var Feedbacks = JSON.parse(localStorage.getItem('feedbacks'));
    
    this.getFeedbacks = function (id) {
        
        return Feedbacks;

    };
        
    this.getIdFeedback = function (id) {
        
        for (var i = 0; i < Feedbacks.length; i++) {
            if (Feedbacks[i]["_id"] == id) {
                return Feedbacks[i];
            }
        }

    };
    
    this.deleteSpecificFeedback = function (id) {
        
        for (var i = 0; i < Feedbacks.length; i++) {
            if (Feedbacks[i]["_id"] === id) {
                Feedbacks.splice(i, 1);
                break;
            }
        }
        
        localStorage.setItem('feedbacks', JSON.stringify(Feedbacks));
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
        Feedbacks.push(mock);
        localStorage.setItem('feedbacks', JSON.stringify(Feedbacks));
    }

})