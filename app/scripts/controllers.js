'use strict';

angular.module('questionnaireApp')

    .filter('trust2Html', ['$sce',function($sce) {  
        return function(val) {  
            return $sce.trustAsHtml(val);   
        };
    }])        

    .controller('EditController', ['$scope', function($scope) {
 
    }])


    .controller('IndexController', ['$scope', 'formFactory', function($scope, formFactory){
        $scope.forms = formFactory.getForms();
        $scope.isShow = formFactory.getForms().length > 0;
        $scope.type = ["onboard", "offboard", "ended"];
        $scope.statusHTML = {"onboard": "<p style='color: green'>发布中</p>", "offboard": "<p>未发布</p>", "ended": "<p>已结束</p>"};
        $scope.text = {"onboard": "查看数据", "offboard": "查看问卷", "ended": "查看数据"};
        
        $scope.click = function(e) {
            var type = e.target.id.split("-")[1];
            var id = e.target.id.split("-")[2];
            console.log(type + "  " + id);
        }
        
        
        
        
        
    }])

    .controller('DataController', ['$scope', 'formFactory', function($scope, formFactory){
        
    }])

;