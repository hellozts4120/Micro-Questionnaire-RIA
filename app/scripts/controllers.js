'use strict';

angular.module('questionnaireApp')

    .controller('EditController', ['$scope', '$stateParams', 'formFactory', 'feedbackFactory', function($scope, $stateParams, formFactory, feedbackFactory) {
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
            $scope.cal = new calendar("#input-div", 20, 20, 0);
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
            var temp = JSON.parse(JSON.stringify(obj));
            $scope.form.questions.splice(index + 1, 0, temp);
            console.log($scope.form.questions);
        }
        
        $scope.deleteQuestion = function(obj) {
            if ($scope.form.questions.length == 1) {
                alert("至少要有一个问题！");
                return;
            }
            var index = $scope.form.questions.indexOf(obj);
            $scope.form.questions.splice(index, 1);
        }
        
        $scope.changeTime = function() {
            var time1 = (new Date().toISOString().split("T"))[0];
            var time2 = (((new Date().toISOString().split("T"))[1]).split("."))[0];
            $scope.form.date = time1 + " " + time2;
        }
        
        $scope.showCalendar = function() {
            if (!$scope.cal.isShow) {
                $scope.cal.isShow = 1;
                $scope.cal.initDOM();
            }
            else {
                $scope.cal.hideDOM();
                $scope.cal.isShow = 0;
            }
        }
        
        $scope.delQuestion = function(id) {
            $scope.form.questions.splice(id, 1);
        }
        
        $scope.addChose = function(obj) {
            var newChose = "新选项";
            obj.chose.push(newChose);
        }
        
        $scope.delChose = function(obj, id) {
            obj.chose.splice(id, 1);
        }
        
        $scope.sortChose = function(obj) {
            obj.chose.sort(function(a,b) { return a.localeCompare(b) });
        }
        
        $scope.uploadForm = function() {
            if ($scope.form.questions.length == 0) {
                alert("至少要有一个问题！");
                return false;
            }
            $scope.changeTime();
            formFactory.uploadForm($scope.form);
            alert("保存问卷成功！");
            return true;
        }
        
        $scope.postForm = function() {
            $scope.endDate = $("#date-input").val();
            if ($scope.endDate == "") {
                alert("请选择截止日期！");
                return false;
            }
            if ($scope.form.questions.length == 0) {
                alert("至少要有一个问题！");
                return false;
            }
            var chose = $scope.endDate.split("-");
            var time = new Date();
            if (parseInt(chose[0]) < time.getFullYear() || (parseInt(chose[0]) == time.getFullYear() && parseInt(chose[1]) < time.getMonth() + 1) || (parseInt(chose[0]) == time.getFullYear() && parseInt(chose[1]) == time.getMonth() + 1 && parseInt(chose[2]) < time.getDate())) {
                alert("选择的截止时间不得早于当前时间！");
                return false;
            }
            else {
                $scope.form.status = "onboard";
                $scope.changeTime();
                feedbackFactory.uploadMockData($scope.form);
                formFactory.uploadForm($scope.form);
                alert("发布问卷成功！");
                return true;
            }
        }
        
    }])

    .controller('IndexController', ['$scope', 'formFactory', 'feedbackFactory', function($scope, formFactory, feedbackFactory){
        $scope.forms = formFactory.getForms();
        $scope.isShow = formFactory.getForms().length > 0;
        $scope.tableSort = false;
        $scope.modalShow = false;
        $scope.deleteAllShow = false;
        $scope.type = ["onboard", "offboard", "ended"];
        $scope.statusHTML = {"onboard": "<p style='color: #40FF00'>发布中</p>", "offboard": "<p>未发布</p>", "ended": "<p style='color: red'>已结束</p>"};
        $scope.jump = {"onboard": "data", "offboard": "view", "ended": "data"};
        
        
        $scope.init = function() {
            $scope.radio = {};
            for (var i in $scope.forms) {
                ($scope.radio)[$scope.forms[i]["_id"]] = false;
            }
        }
        
        $scope.sortTable = function() {
            $scope.tableSort = !$scope.tableSort;
            $scope.forms.sort($scope.tableSort ? function(a,b) { return (a.date).localeCompare(b.date) } : function(a,b) { return (b.date).localeCompare(a.date) });
        }
        
        $scope.selectAll = function() {
            $scope.isAll = !$scope.isAll;
            for (var i in $scope.forms) {
                ($scope.radio)[$scope.forms[i]["_id"]] = $scope.isAll;
            }
        }
        
        $scope.clickDelete = function(e) {
            if (formFactory.getIdForm(parseInt(e.target.id.split("-")[2])).status == "offboard") {
                $scope.modalShow = true;
                $scope.deleteForm = formFactory.getIdForm(parseInt(e.target.id.split("-")[2]));
            }
            else $scope.modal2Show = true;
        }
        
        $scope.hideModal = function() {
            $scope.modalShow = false;
        }
        
        $scope.hideModal2 = function() {
            $scope.modal2Show = false;
        }
        
        $scope.hideDeleteAll = function() {
            $scope.deleteAllShow = false;
        }
        
        $scope.deleteAllCheck = function() {
            for (var i = 0; i < $scope.forms.length; i++) {
                if (($scope.forms)[i]["status"] == "offboard") {
                    formFactory.deleteSpecificForm(($scope.forms)[i]);
                    feedbackFactory.deleteSpecificFeedback(($scope.forms)[i]["_id"]);
                }
            }
            $scope.deleteAllShow = false;
        }
        
        $scope.deleteCheck = function() {
            formFactory.deleteSpecificForm($scope.deleteForm);
            feedbackFactory.deleteSpecificFeedback($scope.deleteForm._id);
            $scope.hideModal();
        }

    }])

    .controller('DataController', ['$scope', '$stateParams', 'formFactory', 'feedbackFactory', function($scope, $stateParams, formFactory, feedbackFactory){
        $scope.form = formFactory.getIdForm(parseInt($stateParams.id, 10));
        $scope.feedback = feedbackFactory.getIdFeedback(parseInt($stateParams.id, 10));
        
        $scope.init = function() {
            for (var i = 0; i < $scope.form.questions.length; i++) {
                if ((($scope.form.questions)[i]).type == 3) {
                    (($scope.form.questions)[i]).useful = (($scope.feedback.feedback)[i]).useful;
                }
                else (($scope.form.questions)[i]).portion = (($scope.feedback.feedback)[i]).portion;
            }
        }
        
        $scope.getPie = function(obj, id) {
            if (obj.type != 2) return;
            var data1 = [];
            for (var i = 0; i < obj.chose.length; i++) {
                data1.push({value: (obj.portion)[i], name: (obj.chose)[i]});
            }
            var option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        data: obj.chose
                    },
                       
                    calculable : true,
                    series : [
                        {
                            name:'统计结果',
                            type:'pie',
                            radius : [80, 120],//半径，默认为Min(width, height) / 2 - 50, 传数组实现环形图，[内半径，外半径]
                            itemStyle :　{
                                normal : {//默认样式
                                    label : {
                                        show : true
                                    },
                                    labelLine : {
                                        show : false
                                    }
                                },
                                emphasis : {//强调样式（悬浮时样式
                                    label : {
                                        show : true,
                                        position : 'center',
                                        textStyle : {
                                            fontSize : '30',
                                            fontWeight : 'bold'
                                        }
                                    }
                                }
                            },
                            data:data1
                        }
                    ]
            };
            require([
                'echarts',
                'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
            ],function(ec) {
                var myChart1 = ec.init(document.getElementById("pie" + $scope.form.questions.indexOf(obj)));
                myChart1.setOption(option);
            });
        }
        
    }])
    
    .controller('ViewController', ['$scope', '$stateParams', 'formFactory', function($scope, $stateParams, formFactory) {
        $scope.form = formFactory.getIdForm(parseInt($stateParams.id, 10));
    }])

;