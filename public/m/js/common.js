$(function(){

    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    })

    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
    });
})

// 传入一个url字符串，返回一个键值对对象
function getSearch(str){
    var obj = {}
    var search = decodeURI(str)
    // var search = '?key=vans&name=zs&age=19'//测试用
    // console.log(search)
    var arr = search.slice(1)
    
    arr = arr.split('&')

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split('=')
        obj[item[0]] = item[1]
    }
    // console.log(obj)
    return obj

}