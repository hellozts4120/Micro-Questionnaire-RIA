'use strict';

angular.module('questionnaireApp')

.service('formFactory', function() {

    var forms = [
                    {
                        _id:0,
                        name:'问卷调查1',
                        status: "onboard",
                        date:"2016-04-12T17:57:28.556094Z"
                        questions: [
                            {
                                type: 1,
                                title: "问题1",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable = true;
                            },
                            
                            {
                                type: 2,
                                title: "问题2",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable = true;
                            },
                            
                            {
                                type: 3,
                                title: "问题3",
                                textView: "",
                                isSortable = false;
                            },
                            
                            {
                                type: 1,
                                title: "问题4",
                                chose: ["选项1", "选项2"],
                                isSortable = true;
                            },
                            
                            {
                                type: 2,
                                title: "问题5",
                                chose: ["选项1", "选项2", "选项3"],
                                isSortable = true;
                            }
                           
                        ]
                    },
                    
                    {
                        _id: 1,
                        name:'问卷调查2',
                        status: "offboard",
                        date:"2016-04-10T17:57:28.556094Z"
                        questions: [
                            {
                                type: 1,
                                title: "问题1",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable = true;
                            },
                            
                            {
                                type: 2,
                                title: "问题2",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable = true;
                            },
                            
                            {
                                type: 3,
                                title: "问题3",
                                textView: "",
                                isSortable = false;
                            },
                            
                            {
                                type: 1,
                                title: "问题4",
                                chose: ["选项1", "选项2"],
                                isSortable = true;
                            },
                            
                            {
                                type: 2,
                                title: "问题5",
                                chose: ["选项1", "选项2", "选项3"],
                                isSortable = true;
                            }
                           
                        ]
                    },
                    
                    {
                        _id: 2,
                        name:'问卷调查3',
                        status: "ended",
                        date:"2016-03-12T17:57:28.556094Z"
                        questions: [
                            {
                                type: 1,
                                title: "问题1",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable = true;
                            },
                            
                            {
                                type: 2,
                                title: "问题2",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable = true;
                            },
                            
                            {
                                type: 3,
                                title: "问题3",
                                textView: "",
                                isSortable = false;
                            },
                            
                            {
                                type: 1,
                                title: "问题4",
                                chose: ["选项1", "选项2"],
                                isSortable = true;
                            },
                            
                            {
                                type: 2,
                                title: "问题5",
                                chose: ["选项1", "选项2", "选项3"],
                                isSortable = true;
                            }
                           
                        ]
                    }
                ];
    ];

    this.getForms = function(){
        
        return forms;
        
    };

    this.getSpecificForm = function (type) {
        
        var res = [];
        
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]["status"] == type) {
                res.push(forms[i]);
            }
        }
        
        return res;
    };
    
})

;