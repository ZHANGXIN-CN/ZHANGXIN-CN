$(function() {
	/*请求加载拆分的头部和尾部页面*/
	$(".top").load("data/common.html .top", function() {
		
		//判断当前cookie中是否有内容
        var resStr = $.cookie("users");
       
        resStr = resStr ? resStr : "{}";
        var resObj = JSON.parse(resStr);
        if(resObj.userid){
        	console.log("saaa");
            $("#userName").html("Hi,<a href='javascript:;'>" + resObj.userid + "</a>&nbsp;欢迎回来!");
          	
        }else{
            $("#userName").html('<a href="javascript:;" class="login">请登录</a>');     
        }
		
		//跳转登录页面
		$(".login").click(function() {
			window.location.href = "login.html";
		});
		//跳转注册页面
		$(".reg").click(function() {
			window.location.href = "register.html";
		});

		$(".top a").hover(function() {
			$(this).css("color", "#c81417");
		}, function() {
			$(this).css("color", "#7e7e7e");
		})
		//奥莱购商家
		$(".top-tips-aolaigo").hover(function() {
			$(this).find(".tips-box").show();
		}, function() {
			$(this).find(".tips-box").hide();
		});
		$(".tips-box a").hover(function() {
			$(this).css("color", "#c81417");
		}, function() {
			$(this).css("color", "#7e7e7e");
		});
			
		
		init(".top-r li .num");//初始化购物车
		
       
	});
	//头部加载完成-------------------------------------------------------------------------

	$("#main .header").load("data/common.html .header",function(){
		

		var oHead = document.getElementsByTagName("head")[0];
		
		//搜索栏 百度接口
		$('#sech').bind('input propertychange', function() {	
			searchProductClassbyName();
		});	
		function searchProductClassbyName(){
			var val =$('#sech').val();
			var oScript = document.createElement("script");
			oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+val+"&cb=data1";
			oHead.appendChild(oScript);
			$("head").find("script").last().remove();			
		}
		$("#sech").blur(function(){
			if ($(this).val() == "") {
			    $("#sechList").hide();
			}
			
		});
	
	});
	//header加载完成----------------------------------------------------------------------
	
	$(".rightNav").load("data/common.html #right",function(){
		
		init(".guide-cart-num");//初始化购物车
		$(".right-guide li").hover(function(){
			console.log($(this));
			$(this).children("em").stop().animate({"left":"-70px","width":"80px"},200);
		},function(){
			$(this).children("em").stop().animate({"left":"0px","width":"50px"},200);
		});
		$("#scrollToTop").click(function(){
			$("html,body").stop().animate({"scrollTop":0},600);
		});
		
		
	});
	//右侧固定导航栏加载完成----------------------------------------------------------------------
	
	
	//动态生成侧边导航栏
	$("#main .navpag").load("data/common.html .nav", function() {
		//动态获取数据
		$.get("data/nav.json",function(data){
			var html = template("nav",data);
			$(".select-cont ul").html(html);
			//鼠标滑过商品列表出现右边导航
			$(".select-cont-bar li").hover(function() {
				
				$(this).attr("class", "active").find(".books").show().end().siblings().attr("class", "");
			}, function() {
	
				$(this).attr("class", "").find(".books").hide();
			});
			//鼠标滑过商品列表出现右边导航end-------------------------------------------------
		});
		
	});
	//nav加载完成-------------------------------------------------------------------------------
	
	$("#main .footer").load("data/common.html .foot",function(){
		
		//尾部鼠标滑过微信图标
		$(".wechat").hover(function(){
			$(this).find(".wechat-tips").show();
		},function(){
			$(this).find(".wechat-tips").hide();
		});
		
	});
	//foot加载完成-------------------------------------------------------------------------------
	


	 //初始化,获得全部数量
	function init(ele){
	    //获取购物车商品的数量
	    var num = 0;
	    var cartStr = $.cookie("cart");
	    cartStr = cartStr ? cartStr : "{}";
	    var cartObj = JSON.parse(cartStr);
	    for(var i in cartObj){
	        num += cartObj[i];
	    }
	    $(ele).html(num);
	}	
	
	//轮播图
	var index1 = 0;
	var timer = null;
	var $lists = $("#sliderList");
	var len = $("#banner .sliderList li").length;

	function showAuto() {
		index1++;
		index1 = index1 >= len ? 0 : index1;
		//轮播效果
		$("#banner .sliderList li").eq(index1).fadeIn(500).siblings().fadeOut(300);
		//角标变化
		$(".nav_num span").eq(index1).addClass("current").siblings().removeClass("current");
	}
	//刷新页面调用一次
	showAuto();
	//鼠标悬停角标
	$(".nav_num span").mouseover(function() {
		clearInterval(timer);
		index1 = $(this).index() - 1;
		showAuto();
	})
	//鼠标悬停停止轮播移除开始轮播
	$(".banner").hover(function() {
			clearInterval(timer);
		},
		function() {
			timer = setInterval(function() {
				showAuto();
			}, 4000);
		});
	//向右
	$(".next").click(function() {
		clearInterval(timer);
		showAuto();
	});
	//向左		
	$(".prev").click(function() {
		clearInterval(timer);

		if(index1 == 0) {
			index1 = len - 2;
		} else {
			index1 = index1 - 2;
		}
		showAuto();
	});
	//定时器
	timer = setInterval(function() {
		showAuto();
	}, 4000);
	//轮播图 end---------------------------------------------------------------------------------

	//搜索悬浮框strat
	var bannerTop = $("#banner").offset().top + $("#banner").outerHeight();
	function scrollSearch() {
		var scrollTop = $(window).scrollTop();
		if(scrollTop >= bannerTop) {
			$(".searchFix").css("display", "block");
			$(".nav .select").css({ "position": "fixed", "top": 3, "left":" 18.45%", "z-index": 100 }).find(".select-cont").hide();
			//鼠标滑过所有商品出现下拉
			$(".nav .select-tit").mouseover(function() {
				$(this).next().show();
			});
			//鼠标移出商品下拉列表时消失
			$(".nav .select-cont").mouseleave(function(){
				$(this).hide();
			});
			$(".itop-sh").css({ "position": "fixed", "top": 5, "left": "42.5%", "z-index": 100 }).find(".itop-sh-list").hide();
			
		} else if(scrollTop < bannerTop){

			$(".nav .select-cont").unbind( "mouseleave" )  //移出鼠标移出事件
			$(".searchFix").css("display", "none");
			$(".nav .select").css({ "position": "relative", "top": 0, "left": 0 }).find(".select-cont").show();
			$(".itop-sh").css({ "position": "absolute", "top": 30, "left": 355 }).find(".itop-sh-list").show();
		}
	}
	//滚动时
	$(window).scroll(function() {
		scrollSearch();
	});

	//搜索悬浮框end---------------------------------------------------------------

	//倒计时start countDown.js
	$(".time-item").countDown({
		startTimeStr: '2017/08/01 00:00:00', //开始时间
		endTimeStr: '2017/08/15 24:00:00', //结束时间
		hourSelector: ".hour_num",
		minSelector: ".min_num",
		secSelector: ".sec_num"
	});
	//倒计时end------------------------------------------------------------------

	
	
	
	//动态数据的加载-------------------------------------------------------------------------------------
		//折扣活动---------------------------------------------------------------
	$.get("data/list.json",function(data){
	
			var html = template("list",data);
			$(".dist-cont ul").html(html);			
	});
		//限时秒杀---------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list1",data);
			$(".seckBox .seckList").html(html);
	});
		//专柜精选feature-------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-feature",data);
			$(".Feature .brandNew").html(html);
			
			//专柜蒙层效果start 
			$('.brandNew > .brandNew-item a').hoverdir();
			
	});
		//国际奢品Luxury-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-luxury",data);
			$(".Luxury .floor-cont").html(html);
			$(".tr-3 li:nth-child(1)").find("span").css("color","#C81417");
			$(".tr-3 li:nth-child(4)").find("span").css("color","#C81417");
			$(".tr-3 li:nth-child(5").find("span").css("color","#C81417");
	});
		//跨境优品cross-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-cross",data);
			$(".Cross .floor-cont").html(html);
	});
		//户外运动Outerdoor-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-outerdoor",data);
			$(".Outerdoor .floor-cont").html(html);
	});
		//潮流女装Fashion-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-fashion",data);
			$(".Fashion .floor-cont").html(html);
	});
		//精选男装Manwear-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-manwear",data);
			$(".Manwear .floor-cont").html(html);
	});
	//潮流鞋靴Shoe-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-shoe",data);
			$(".Shoe .floor-cont").html(html);
	});
	//时尚箱包Bags-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-bags",data);
			$(".Bags .floor-cont").html(html);
	});
	//精选内衣Underwear-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-underwear",data);
			$(".Underwear .floor-cont").html(html);
	});
	//可爱童装Children-------------------------------------------------------------
	$.get("data/list.json",function(data){
		
			var html = template("list-children",data);
			$(".Children .floor-cont").html(html);
	});
})