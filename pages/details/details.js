//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        detailsData: {},
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function(option) {

        var that = this
        //获取详情
        var url = 'http://localhost:3000/taohuihui/goods/getDetails?_id=' + option._id;
        that.getAjax(url,function(res){
            that.setData({
                detailsData: res.data.list[0]
            })
        })
    },

    getAjax:function(url,fn){
        wx.request({
          url: url,
          method:'GET',
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            fn(res)
          }
        })
    },
    onShareAppMessage: function () {
        return {
          title: '微信小程序联盟',
          desc: '最具人气的小程序开发联盟!',
          path: '/page/user?id=123'
        }
    },
    imageLoad: function(e) {  
        var _this=this;  
        var $width=e.detail.width,    //获取图片真实宽度  
            $height=e.detail.height,  
            ratio=$width/$height;   //图片的真实宽高比例  
        var viewWidth=750,           //设置图片显示宽度，  
            viewHeight=750/ratio;    //计算的高度值     
        this.setData({  
            imgwidth:viewWidth,  
            imgheight:viewHeight  
        })  
    },
    changeIndicatorDots: function(e) {
        this.setData({
          indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
          autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
          interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
          duration: e.detail.value
        })
    }
})
