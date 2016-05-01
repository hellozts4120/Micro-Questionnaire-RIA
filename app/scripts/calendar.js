//upperYear: year distance between current year and the maximum year you want to set...
//lowerYear: year distance between current year and the minimum year you want to set...
//type: 0-->classic calendar; 1-->calendar with the function of set time period
function calendar(selector, upperYear, lowerYear, type) {
    
    var that = this;
    this.isShow = 0;
        
    //interface to get the current date's data;
    //fomular of the data is an array: ['curYear', 'curMonth', 'curDate', 'curDay'];
    this.getCurrentTime = function () {
        return curTime();
    }
    
    //interface to set the date...
    this.setTime = function (data) {
        var setYear = data.split("-")[0];
        var setMonth = data.split("-")[1];
        var setDate = data.split("-")[2];
        document.getElementById("date-input").value = currYear + "" + currMonth + "" + currDate;
        that.hideDOM();
    }
    
    //init DOM of month and year
    this.initDOM = function() {
        if (type == 0) {
            $(selector).append(
            '<div class="calendarTitle">'+
                '<select id="month"></select>'+
                '<select id="year"></select>'+
            '</div>'+
            '<div class="select-date">'+
                '<table>'+
                    '<thead></thead>'+
                    '<tbody></tbody>'+
                '</table>'+
            '</div>');
        }
        else {
            $(selector).append(
            '<div class="period">最小跨度(默认无限制, 单位天)<input class="period-input" id="minPeriod">'+
            '最大跨度(默认无限制，单位天)<input class="period-input" id="maxPeriod"></div>'+
            '<div class="calendarTitle">'+
                '<select id="month"></select>'+
                '<select id="year"></select>'+
            '</div>'+
            '<div class="select-date">'+
                '<table>'+
                    '<thead></thead>'+
                    '<tbody></tbody>'+
                '</table>'+
            '</div>'+
            '<div class="buttons">'+
                '<button id="confirm">确认</button>'+
                '<button id="cancel">取消</button>'+
            '</div>');
        }
        for (var i = -1 * lowerYear; i <= upperYear; i++) {
            var curOption = document.createElement("option");
            curOption.value = curTime()[0] + i + "年";
            curOption.innerHTML = curTime()[0] + i + "年";
            if (i == 0) {
                curOption.selected = "selected";
            }
            $("#year").append(curOption);
        }
        for (var i = 1; i <= 12; i++) {
            var curOption = document.createElement("option");
            curOption.value = i + "月";
            curOption.innerHTML = i + "月";
            if (i == curTime()[1]) {
                curOption.selected = "selected";
            }
            $("#month").append(curOption);
        }
        
        $("#month").on('change',function(e){
            var curMonth = parseInt(this.selectedOptions[0].value.split("月")[0]);
            var curYear = parseInt(document.getElementById("year").selectedOptions[0].value.split("年")[0]);
            if (type == 0) {
                addCommonDateInfo(curYear, curMonth);
            }
            else {
                addPeriodDateInfo(curYear, curMonth);
            }
        })
        $("#year").on('change',function(e){
            var curYear = parseInt(this.selectedOptions[0].value.split("年")[0]);
            var curMonth = parseInt(document.getElementById("month").selectedOptions[0].value.split("月")[0]);
            if (type == 0) {
                addCommonDateInfo(curYear, curMonth);
            }
            else {
                addPeriodDateInfo(curYear, curMonth);
            }
        })
        
        var titleArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        var curTr = document.createElement('tr');
        for (var i in titleArr) {
            var cur = document.createElement('th');
            cur.innerHTML = titleArr[i];
            curTr.appendChild(cur);
        }
        $(".select-date table thead").append(curTr);
        if (type == 0) {
            addCommonDateInfo(curTime()[0], curTime()[1]);
        }
        else {
            addPeriodDateInfo(curTime()[0], curTime()[1]);
        }
    }
    
    this.hideDOM = function() {
        $(".calendarTitle,.select-date").remove();
        if (type == 1) {
            $(".buttons,.period").remove();
        }
    }
    
    function curTime() {
        var now = new Date();
        var second = now.getSeconds();
        var minute = now.getMinutes();
        var hour = now.getHours;
        var date = now.getDate();
        var day = now.getDay();
        var month = now.getMonth();
        var year = now.getFullYear();
        return [year, month + 1, date, day];
    }
    
    function addCommonDateInfo(year, month){
        $(".select-date table tbody tr").remove();
        var sumCurMonthDate = getMonthDate(year, month);
        var sumPrevMonthDate = getMonthDate(year, month - 1);
        var curMonthFirstDay = new Date(year + "/" + month + "/" + 1).getDay();
        var curMonthLastDay = new Date(year + "/" + month + "/" + sumCurMonthDate).getDay();
        var curTr = document.createElement('tr');
        for(var i = (sumPrevMonthDate - curMonthFirstDay + 1); i <= sumPrevMonthDate; i++){
            var curTd = document.createElement('td');
            curTd.innerHTML = i;
            curTd.className = 'prevMonth';
            curTr.appendChild(curTd);
        }
        for(var i = 1; i <= sumCurMonthDate; i++){
            var curTd = document.createElement('td');
            curTd.innerHTML = i;
            curTd.className = 'currMonth';
            if(i == curTime()[2] && month == curTime()[1] && year == curTime()[0] && type == 0){
                curTd.className = 'currMonth currDate';
            }
            curTr.appendChild(curTd);
        }
        if(curMonthLastDay !== 6){
            for(var start = 1; start <= (6 - curMonthLastDay); start++){
                var curTd = document.createElement('td');
                curTd.innerHTML = start;
                curTd.className = 'nextMonth';
                curTr.appendChild(curTd);
            }
        }
        
        $(".select-date table tbody").append(curTr);
        $(".currMonth").on("click", function(e){
            var currYear = document.getElementById("year").selectedOptions[0].value;
            var currMonth = document.getElementById("month").selectedOptions[0].value;
            var currDate = e.target.innerHTML;
            document.getElementById("date-input").value = parseInt(currYear) + "-" + (parseInt(currMonth) < 10 ? "0" : "") + parseInt(currMonth) + "-" + (parseInt(currDate) < 10 ? "0" : "") + parseInt(currDate);
            $(".calendarTitle,.select-date").remove();
            that.isShow = 0;
        })
    }
    
    function addPeriodDateInfo(year, month){
        $(".select-date table tbody tr").remove();
        var sumCurMonthDate = getMonthDate(year, month);
        var sumPrevMonthDate = getMonthDate(year, month - 1);
        var curMonthFirstDay = new Date(year + "/" + month + "/" + 1).getDay();
        var curMonthLastDay = new Date(year + "/" + month + "/" + sumCurMonthDate).getDay();
        var curTr = document.createElement('tr');
        for(var i = (sumPrevMonthDate - curMonthFirstDay + 1); i <= sumPrevMonthDate; i++){
            var curTd = document.createElement('td');
            curTd.innerHTML = i;
            curTd.className = 'prevMonth';
            curTr.appendChild(curTd);
        }
        for(var i = 1; i <= sumCurMonthDate; i++){
            var curTd = document.createElement('td');
            curTd.innerHTML = i;
            if (that.startDate && that.endDate) {
                if ((year == that.startDate[0] && month == that.startDate[1] && i == that.startDate[2]) || (year == that.endDate[0] && month == that.endDate[1] && i == that.endDate[2])) {
                    curTd.className = 'currMonth currDate';
                }
                else if ((year >= that.startDate[0] && year <= that.endDate[0] && month >= that.startDate[1] && month <= that.endDate[1] && i > that.startDate[2] && i < that.endDate[2])) {
                    curTd.className = 'currMonth periodDate';
                }
                else if (year <= that.startDate[0] && year >= that.endDate[0] && month <= that.startDate[1] && month >= that.endDate[1] && i < that.startDate[2] && i > that.endDate[2]) {
                    curTd.className = 'currMonth periodDate';
                }
                else if ((year >= that.startDate[0] && year <= that.endDate[0]) && (month > that.startDate[1] && month <= that.endDate[1] && i < that.endDate[2]) || (month < that.endDate[1] && month >= that.startDate[1] && i > that.startDate[2])) {
                    curTd.className = 'currMonth periodDate';
                }
                else if ((year <= that.startDate[0] && year >= that.endDate[0]) && (month < that.startDate[1] && month >= that.endDate[1] && i > that.endDate[2]) || (month > that.endDate[1] && month <= that.startDate[1] && i < that.startDate[2])) {
                    curTd.className = 'currMonth periodDate';
                }
                else if ((year > that.startDate[0] && year <= that.endDate[0]) || (year <= that.startDate[0] && year > that.endDate[0])) {
                    curTd.className = 'currMonth periodDate';
                }
                else if ((year < that.startDate[0] && year >= that.endDate[0]) || (year >= that.startDate[0] && year < that.endDate[0])) {
                    curTd.className = 'currMonth periodDate';
                }
                else {
                    curTd.className = 'currMonth';
                }
            }
            else if (that.startDate) {
                if (year == that.startDate[0] && month == that.startDate[1] && i == that.startDate[2]) {
                    curTd.className = 'currMonth currDate';
                }
                else {
                    curTd.className = 'currMonth';
                }
            }
            else {
                curTd.className = 'currMonth';
            }
            curTr.appendChild(curTd);
        }
        if(curMonthLastDay !== 6){
            for(var start = 1; start <= (6 - curMonthLastDay); start++){
                var curTd = document.createElement('td');
                curTd.innerHTML = start;
                curTd.className = 'nextMonth';
                curTr.appendChild(curTd);
            }
        }
        
        $(".select-date table tbody").append(curTr);
        $(".currMonth").on("click", function(e) {
            if (that.startDate == undefined) {
                that.startDate = [year, month, parseInt(e.target.innerHTML)];
            }
            else {
                if (isPeriodValidate(that.startDate, [year, month, parseInt(e.target.innerHTML)])) {
                    that.endDate = that.startDate;
                    that.startDate = [year, month, parseInt(e.target.innerHTML)];
                }
                else {
                    alert("输入有误，请检查后重新设定！");
                }
            }
            
            addPeriodDateInfo(year, month);
        })
        $("#confirm").on("click", function() {
            if ((that.startDate[0] > that.endDate[0]) || (that.startDate[0] == that.endDate[0] && that.startDate[1] > that.endDate[1]) || (that.startDate[0] == that.endDate[0] && that.startDate[1] == that.endDate[1] && that.startDate[2] > that.endDate[2])) {
                var temp = that.startDate;
                that.startDate = that.endDate;
                that.endDate = temp;
            }
            $("#date-input").val(that.startDate[0] + "年" + that.startDate[1] + "月" + that.startDate[2] + "日" + " To " + that.endDate[0] + "年" + that.endDate[1] + "月" + that.endDate[2] + "日"); 
            that.hideDOM();
            that.isShow = 0;
        })
        $("#cancel").on("click", function() {
            that.hideDOM();
            that.isShow = 0;
        })
    }
    
    function isPeriodValidate(time1, time2) {
        if ($("#maxPeriod").val() == "" && $("#minPeriod").val() == "") {
            return true;
        }
        else {
            var timeLength = getTimePeriodLength(time1, time2);
            if ($("#maxPeriod").val() == "") {
                return timeLength >= parseInt($("#minPeriod").val()) ? true : false;
            }
            else if ($("#minPeriod").val() == "") {
                return timeLength <= parseInt($("#maxPeriod").val()) ? true : false;
            }
            else {
                if (parseInt($("#maxPeriod").val()) < parseInt($("#minPeriod").val())) return false;
                return (timeLength <= parseInt($("#maxPeriod").val()) && timeLength >= parseInt($("#minPeriod").val())) ? true : false;
            }
        }
    }
    
    function getTimePeriodLength(time1, time2) {
        var timeA = time1[0] + (time1[1] < 10 ? ('/0' + time1[1]) : ('/' + time1[1])) + (time1[2] < 10 ? ('/0' + time1[2]) : ('/' + time1[2]));
        var timeB = time2[0] + (time2[1] < 10 ? ('/0' + time2[1]) : ('/' + time2[1])) + (time2[2] < 10 ? ('/0' + time2[2]) : ('/' + time2[2]));
        var res = parseInt((new Date(timeA)).getTime() - (new Date(timeB)).getTime()) / (1000 * 3600 * 24);
        return (res >= 0) ? res : -1 * res;
    }
    
    function getMonthDate(year, month) {
        if (month == 0) {
            year -= 1;
            month = 12;
        }
        switch (month) {
            case 1:
                return 31;
                break;
            case 3:
                return 31;
                break;
            case 5:
                return 31;
                break;
            case 7:
                return 31;
                break;
            case 8:
                return 31;
                break;
            case 10:
                return 31;
                break;
            case 12:
                return 31;
                break;
            case 4:
                return 30;
                break;
            case 6:
                return 30;
                break;
            case 9:
                return 30;
                break;
            case 11:
                return 30;
                break;
            case 2:
                if (year % 4 != 0) {
                    return 28;
                }
                else if (year % 100 == 0 && year % 400 != 0) {
                    return 28;
                }
                else return 29;
                break;
        }
    }
}