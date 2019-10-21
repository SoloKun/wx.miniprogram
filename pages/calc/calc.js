// pages/calc/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: "0",
    record: "ture",
    id0: "num_0",
    id1: "num_1",
    id2: "num_2",
    id3: "num_3",
    id4: "num_4",
    id5: "num_5",
    id6: "num_6",
    id7: "num_7",
    id8: "num_8",
    id9: "num_9",
    id10: "ac",
    id11: "del",
    id12: "per",
    id13: "ex",
    id14: "mul",
    id15: "min",
    id16: "plus",
    id17: "neg",
    id18: "point",
    id19: "result",
    id20: "history",
    exp: [],

  },
  click: function(e) {
    var data = this.data.result;
    var exp1 = this.data.exp;
    var temp1 = this.data.temp;
    var lastoper1 = this.data.lastoper; //获取操作
    var flag1 = this.data.flag; //获取按钮*/
    if (temp1 == null || lastoper1 == null) {
      temp1 = 0;
      lastoper1 = "+";
    } //解决初始值为空的报错

    if (e.target.id >= 'num_0' && e.target.id <= 'num_9') {
      data += e.target.id.split("_")[1];
      if (this.data.result == '0' || flag1) {
        data = e.target.id.split("_")[1];
        console.log(data);
      } //清除之前数字

      flag1 = false; //恢复初始值
    } else {

      if (e.target.id == "point") { //转为字符串从最后一位查找是否存在小数点
        if (data.toString().lastIndexOf('.') == -1) {
          data += ".";
        }

      } else if (e.target.id == "ac") {
        exp1 = exp1.toString().substr(0, exp1.length - 1) + "=" + temp1;
        /*if(this.data.record){
           this.saveexp(exp1);
          
          
        }*/ //按照书上所写会在历史记录存入=0
        exp1 = "";
        data = 0;
        temp1 = 0;
        lastoper1 = "+";
      } else if (e.target.id == "neg") {
        data = data * (-1);

      } else if (e.target.id == "del") {


        if (data.toString().length > 1) {
          console.log(typeof data); //等号后被存入数组，data类型发生变化 需要转为字符串

          data = data.toString().substr(0, data.toString().length - 1);

        } else {
          data = 0;
        }
      } else if (e.target.id == "per") {
        data = data / 100;
      } else if (e.target.id == "ex") {
        exp1 += data.toString() + "÷";
        data = this.calcu(temp1, lastoper1, data);
        temp1 = data;
        flag1 = true; //设置符号标识
        lastoper1 = "/";
      } else if (e.target.id == "mul") {
        exp1 += data.toString() + "*";
        data = this.calcu(temp1, lastoper1, data);
        temp1 = data;
        flag1 = true;
        lastoper1 = "*";
      } else if (e.target.id == "min") {
        exp1 += data.toString() + "-";
        data = this.calcu(temp1, lastoper1, data);
        temp1 = data;
        flag1 = true;
        lastoper1 = "-";
      } else if (e.target.id == "plus") {
        exp1 += data.toString() + "+";
        data = this.calcu(temp1, lastoper1, data);
        temp1 = data;
        flag1 = true;
        lastoper1 = "+";

      } else if (e.target.id == "result") {
        exp1 += data.toString();
        data = this.calcu(temp1, lastoper1, data);
        exp1 += "=" + data;
        if (this.data.record) {
          this.saveexp(exp1);


        }
        exp1 = "";
        temp1 = 0;
        lastoper1 = "+";
      } else if (e.target.id == "history") {
        wx.navigateTo({
          url: '../history/history',
        })

      }

    }
    this.setData({
      result: data,
      lastoper: lastoper1,
      temp: temp1,
      flag: flag1,
      exp: exp1,
    });
  },
  calcu: function(data1, oper, data2) {
    var data;
    data1 = parseFloat(data1);
    data2 = parseFloat(data2);
    switch (oper) {
      case "+":
        data = data1 + data2;
        break;
      case "-":
        data = data1 - data2;
        break;
      case "*":
        data = data1 * data2;
        break;
      case "/":
        if (data2 !== 0) {
          data = data1 / data2;
        } else {
          data = null;
        }

        break;

    }
    return data;



  },
  recordhistory: function(e) {


    console.log(e);
    this.setData({
      record: e.detail.value
    })

  },

  saveexp: function(exp1) {
    var exp = wx.getStorageSync('exp') || []
    exp.unshift(exp1);
    wx.setStorageSync("exp", exp);
    return;

  },
  clear: function(e) {
    wx.clearStorageSync();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})