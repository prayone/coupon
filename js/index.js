var base_url_indexPicTurn = '/rs/index_pics';
var base_url_eventCategory = '/rs/event_category';
var base_url_coupons = '/rs/coupons_list';
var data0;
var currentPageNo =1;
var pageRows = 10;
// 轮播图
$(function() {
    showSwiper();
    queryList();
    couponList();
});
function showSwiper() {
    var data = {
        page:currentPageNo,
        size:pageRows
    };
    zhget(base_url_indexPicTurn,data).then( function(rs) {
    	if(rs.rows){
        showTemplate(rs,"tempSwiper","swiper-container");
    	initSwiper();
    }else{
    	alert(rs.err)
    }
    });
}
//分类列表
function queryList() {
    zhget(base_url_eventCategory, {
        page: currentPageNo,
        size: pageRows
    }).then( function(rs) {
        showTemplate(rs,"tempQueryList","content");
    });
}
//优惠券列表
function couponList() {
    zhget(base_url_coupons, {
        page: currentPageNo,
        size: pageRows
    }).then( function(rs) {
    	showTemplate(rs,"tempCouponList","goods-list");
    });
}
 var username=getQueryString("username");
 function getQueryString(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
     var r = window.location.search.substr(1).match(reg);
     if (r != null) return unescape(r[2]); return null;
 }
 function backhome(){
     if(username==null){
         window.location.href="./index.html";
     }else{
         window.location.href="./index.html?username="+username;
     }
 }