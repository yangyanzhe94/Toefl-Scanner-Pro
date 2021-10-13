//在这里加入你需要选择的城市。
var city_choose = ["北京","天津"]

//在这里加入你需要选择的时间[start_time,end_time]。
var time_start_end = ["2022-1-5","2022-1-08"]


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function Scanner(city_choose, all) {
    //定位所需要的元素
    city = document.getElementById('centerProvinceCity')
    day = document.getElementById("testDays")
    btn_query = document.getElementById("btnQuerySeat")
    num_city = 0



    //循环查找
    for (i = 1; i < city.options.length; ++i) {
        for(n = 0; n < city_choose.length; n++){
            if(n==1&&all==true){break} //在全局搜索模式下，不再匹配city_choose里面的城市
            if(city_choose[n]==city.options[i].text||all==true){ //如果找到了指定的城市
                city.options[i].selected = true
                for (j = 1; j < day.options.length; ++j) {
                    if(compare(day.options[j].text)){ //如果找到了指定范围内的时间
                        day.options[j].selected = true
                        btn_query.click()
                        await sleep(generateRadomGap())
                        tables = document.getElementsByClassName("table table-bordered table-striped")
                        if (tables.length == 1) {
                            tb = tables[0]
                            for (row = 2; row < tb.rows.length; ++row) {
                                if (tb.rows[row].cells[3].innerText == "有名额") {
                                    console.log(
                                        city.options[i].innerText,
                                        day.options[j].innerText,
                                        tb.rows[row].cells[1].innerText)
                                    }
                            }
                        }
                    }
                }
            }
        }
    }   
}

// 日期时间比对函数
function compare(date){
    
    var cur = new Date(date.slice(0,date.indexOf("日")).replace("年","-").replace("月","-"));
    var start = new Date(time_start_end[0]);
    var end = new Date(time_start_end[1])
   

    return cur.getTime() >= start.getTime() && cur.getTime() <= end.getTime()
}

//判断时间是否过期
function checkIsOutData(startData, allTime){
 
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

    return seconds <= allTime * 60
}

//生成随机间隔
function generateRadomGap(){
    var min = 1000,
    max = 2000;
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//设定执行多少次
async function timesScanner(city_choose, all,times){

    var i = 1
    var timer = setInterval(function f(){
        //搜索指定城市
        Scanner(city_choose, false)
        i++
        if(i == times){
            clearInterval(timer)
        }
    }, generateRadomGap())
}

//设定执行多久 单位为分钟
async function timeScanner(city_choose, all,time){

    var startDate = new Date();

    var i = 1
    var timer = setInterval(function f(){
        //搜索指定城市
        Scanner(city_choose, false)
       
        if(!checkIsOutData(startData,time)){
            clearInterval(timer)
        }
    }, generateRadomGap())
}
//只扫描一轮
//Scanner(city_choose, true)

//次数
timesScanner(city_choose, true,10)

//时间
//timesScanner(city_choose, true,10)
