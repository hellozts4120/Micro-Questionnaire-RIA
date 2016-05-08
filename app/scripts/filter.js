'use strict';

angular.module('questionnaireApp')

    .filter('trust2Html', ['$sce',function($sce) {  
        return function(val) {  
            return $sce.trustAsHtml(val);   
        };
    }])

    .filter('statusFilter', ['$sce',function($sce) {  
        return function(type){
            switch(type){
                case "offboard":
                    return $sce.trustAsHtml('查看问卷');
                break;
                default:
                    return $sce.trustAsHtml('查看数据');
                break;
            }
        }
    }])
;