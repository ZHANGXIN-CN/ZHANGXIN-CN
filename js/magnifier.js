;(function ($, window, document, undefined) {

  var Magnifier = function (elem) {
    var self = this;
    this.$elem = elem;
    this.$smallBox = this.$elem.find('.zoomPad');     //中图盒子
    this.$smallBox_pic = this.$smallBox.find('img');   //中图里的图片
    this.$smallBox_mask = this.$smallBox.find('.zoomPup');     //放大镜
    this.$thumbnailBox = this.$elem.find('.pt-data-lt-1');        //小图最外层盒子
    this.$thumbnailBox_prev = this.$thumbnailBox.find('.data-ltli-top');    //我这是上   他是左
    this.$thumbnailBox_next = this.$thumbnailBox.find('.data-ltli-bottom');					//我这是下   他是右
    this.$thumbnailBox_wrapper = this.$thumbnailBox.find('.jqzoomDiv ul');     //小图的ul的class
    this.$thumbnailBox_item = this.$thumbnailBox.find('.zoom-navitem');       //小图的ul下的li的普通class
    this.$thumbnailBox_pic = this.$thumbnailBox.find('img');                  //小图的ul下的li下的小图
    this.$bigBox = this.$elem.find('.zoomWindow');														//放大镜窗口
    this.$bigBox_pic = this.$bigBox.find('img');																//放大镜窗口下的图片
  };


  Magnifier.prototype = {
    moveBigPic: function () { // 改变大图
      var scaleX = this.$smallBox_mask.position().left / (this.$smallBox.width() - this.$smallBox_mask.width());
      var scaleY = this.$smallBox_mask.position().top / (this.$smallBox.height() - this.$smallBox_mask.height());
      var scroll_l = scaleX * (this.$bigBox_pic.width() - this.$bigBox.width());
      var scroll_t = scaleY * (this.$bigBox_pic.height() - this.$bigBox.height());

      this.$bigBox.scrollLeft(scroll_l).scrollTop(scroll_t);
    },

    changeSrouce: function (index, cur_src1 , cur_src2) { // 改变大小图地址
      this.$smallBox_pic.attr('src', cur_src1 + "=400x400." + cur_src2);
      this.$bigBox_pic.attr('src', cur_src1 + '.' + cur_src2);
    },

    setMask: function () { // 设置 mask 宽高
      var mask_w = this.$smallBox.width() / (this.$bigBox_pic.width() / this.$bigBox.width());
      var mask_h = this.$smallBox.height() / (this.$bigBox_pic.height() / this.$bigBox.height());

      this.$smallBox_mask.css({width: mask_w, height: mask_h});
    },

    inital: function () { // 初始化
      var self = this;
      
      this.$thumbnailBox_next.click(function () {
        var ov_pic = self.$thumbnailBox_item.length - 5;
        var ov_dis = ov_pic * 78;

        if (ov_pic > 0) {
          self.$thumbnailBox_wrapper.animate({marginLeft: -ov_dis});
        }
      });
      
      this.$thumbnailBox_prev.click(function () {
        self.$thumbnailBox_wrapper.animate({marginLeft: 0});
      });

      this.$thumbnailBox_item.mouseover(function () {
        var cur_src = $(this).attr('data-src');          //获取li的data-src属性  这里是小图的路径 需要处理下			
        cur_src1 = cur_src.split("=")[0];
				cur_src2 = cur_src.split(".")[1];
        self.$thumbnailBox_item.removeClass('b-select');

        $(this).addClass('b-select');

        self.changeSrouce($(this).index(), cur_src1 ,cur_src2);
      });

      this.$smallBox.hover(function () {
        self.$bigBox.show();
        self.$smallBox_mask.show();
        self.setMask();

        $(this).mousemove(function (ev) {
          var oEvent = ev || window.event;
          var offset_pos = {
            left: oEvent.clientX - $(this).offset().left - self.$smallBox_mask.width() / 2,
            top: oEvent.clientY - $(this).offset().top - self.$smallBox_mask.height() / 2 + $(window).scrollTop()
          };

          if (offset_pos.left < 0) {
            offset_pos.left = 0;
          } else if (offset_pos.left > $(this).width() - self.$smallBox_mask.width()) {
            offset_pos.left = $(this).width() - self.$smallBox_mask.width();
          }
          if (offset_pos.top < 0) {
            offset_pos.top = 0;
          } else if (offset_pos.top > $(this).height() - self.$smallBox_mask.height()) {
            offset_pos.top = $(this).height() - self.$smallBox_mask.height();
          }

          self.$smallBox_mask.css(offset_pos);

          self.moveBigPic();
        });
      }, function () {
        self.$smallBox_mask.hide();
        self.$bigBox.hide();
      });
    },

    constructor: Magnifier
  };

  $.fn.magnifier = function () {
    var magnifier = new Magnifier(this);

    return magnifier.inital();
  };

})(jQuery, window, document);