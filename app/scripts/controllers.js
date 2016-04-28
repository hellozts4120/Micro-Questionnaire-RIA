'use strict';

angular.module('questionnaireApp')

    .filter('trust2Html', ['$sce',function($sce) {  
        return function(val) {  
            return $sce.trustAsHtml(val);   
        };
    }])        

    .controller('EditController', ['$scope', '$stateParams', 'formFactory', function($scope, $stateParams, formFactory) {
        $scope.isNew = false;
        $scope.forms = formFactory.getForms();
        $scope.form = {
                        _id: $scope.forms.length,
                        name:'输入你的标题',
                        status: "offboard",
                        date:"",
                        questions: []
        };
        
        $scope.init = function() {
            if ($stateParams.id == "") {
                $scope.isNew = true;
            }
            else {
                $scope.form = formFactory.getIdForm(parseInt($stateParams.id, 10));
            }
            
            if ($scope.form.status != "offboard") $scope.modalShow = true;
        }
        
        $scope.addOneSelect = function() {
            if ($scope.form.questions.length == 10) alert("不能超过十个问题！");
            else $scope.form.questions.push({
                                type: 1,
                                title: "单选题",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable: true
                            });
        }
        
        $scope.addMutiSelect = function() {
            if ($scope.form.questions.length == 10) alert("不能超过十个问题！");
            else $scope.form.questions.push({
                                type: 2,
                                title: "多选题",
                                chose: ["选项1", "选项2", "选项3", "选项4"],
                                isSortable: true
                            });
        }
        
        $scope.addTextSelect = function() {
            if ($scope.form.questions.length == 10) alert("不能超过十个问题！");
            else $scope.form.questions.push({
                                type: 3,
                                title: "文本题",
                                isMustAnswer: false,
                                isSortable: false
                            });
        }
        
        $scope.moveUpQuestion = function(obj) {
            var index = $scope.form.questions.indexOf(obj);
            if (index == 0) {
                alert("该问题已是第一个问题，不能上移！");
            }
            else {
                var temp = $scope.form["questions"][index - 1];
                $scope.form["questions"][index - 1] = $scope.form["questions"][index];
                $scope.form["questions"][index] = temp;
            }
        }
        
        $scope.moveDownQuestion = function(obj) {
            var index = $scope.form.questions.indexOf(obj);
            if (index == $scope.form.questions.length - 1) {
                alert("该问题已是最后一个问题，不能下移！");
            }
            else {
                var temp = $scope.form["questions"][index + 1];
                $scope.form["questions"][index + 1] = $scope.form["questions"][index];
                $scope.form["questions"][index] = temp;
            }
        }
        
        $scope.reuseQuestion = function(obj) {
            if ($scope.form.questions.length == 10) {
                alert("不能超过十个问题！");
                return;
            }
            var index = $scope.form.questions.indexOf(obj);
            var temp = obj;
            $scope.form.questions.splice(index + 1, 0, temp);
        }
        
        $scope.deleteQuestion = function(obj) {
            if ($scope.form.questions.length == 1) {
                alert("至少要有一个问题！");
                return;
            }
            var index = $scope.form.questions.indexOf(obj);
            $scope.form.questions.splice(index, 1);
        }
        
    }])


    .controller('IndexController', ['$scope', 'formFactory', function($scope, formFactory){
        $scope.forms = formFactory.getForms();
        $scope.isShow = formFactory.getForms().length > 0;
        $scope.modalShow = false;
        $scope.type = ["onboard", "offboard", "ended"];
        $scope.statusHTML = {"onboard": "<p style='color: green'>发布中</p>", "offboard": "<p>未发布</p>", "ended": "<p>已结束</p>"};
        $scope.text = {"onboard": "查看数据", "offboard": "查看问卷", "ended": "查看数据"};
        $scope.jump = {"onboard": "data", "offboard": "view", "ended": "data"};
        
        $scope.clickDelete = function(e) {
            $scope.modalShow = true;
            $scope.deleteForm = formFactory.getIdForm(parseInt(e.target.id.split("-")[2]));
        }
        
        $scope.hideModal = function() {
            $scope.modalShow = false;
        }
        
        $scope.deleteCheck = function() {
            formFactory.deleteSpecificForm($scope.deleteForm);
            $scope.hideModal();
        }

    }])

    .controller('DataController', ['$scope', 'formFactory', function($scope, formFactory){
        
    }])
    
    .controller('ViewController', ['$scope', '$stateParams', 'formFactory', function($scope, $stateParams, formFactory) {
        $scope.form = formFactory.getIdForm(parseInt($stateParams.id, 10));
    }])

;