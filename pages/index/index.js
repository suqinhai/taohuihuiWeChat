//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: '首页',
        navData:[],
        itemData:[],
        posterData:[],
        page:1,
        pageSize:30,
        userInfo: {},
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
    onLoad: function() {
        
        var that = this
        
        //头部导航
        var url = 'http://localhost:3000/taohuihui/nav/get';
        that.getAjax(url,function(res){
            that.setData({
                navData: res.data.list
            })
        })

        //轮播
        var url = 'http://localhost:3000/taohuihui/poster/get';
        that.getAjax(url,function(res){
            that.setData({
                posterData: res.data.list
            })
        })

        //时尚精选
        that.onReachBottom()

        //设置标题
        wx.setNavigationBarTitle({
            title: '淘优惠'
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
    onReachBottom: function(){
        var that = this;
        var url = 'http://localhost:3000/taohuihui/goods/get?pageSize=' + that.data.pageSize + '&page=' + that.data.page;
        that.getAjax(url,function(res){
            var list = res.data.list;
            var len = res.data.list.length;
            for (var i = 0; i < len; i++){
                that.data.itemData.push(list[i])
            }
            that.setData({
                itemData:that.data.itemData
            })
            that.data.page++;
        })
        //wx.stopPullDownRefresh()
    },
    toPage:function(event){
        var _id = event.currentTarget._id
        wx.navigateTo({
          url: '../details/details?_id=' + _id
        })
    }
})
