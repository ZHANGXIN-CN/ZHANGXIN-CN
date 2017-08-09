$(function(){
	/*请求加载拆分的头部和尾部页面*/
	$(".top").load("data/common.html .top", function() {
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
		
		init(".top-r li .num");//初始化头部购物车	
		
	});
	//头部加载完成-------------------------------------------------------------------------

	$(".header").load("data/common.html .header",function(){
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
	//动态生成侧边导航栏
	$(".navpag").load("data/common.html .nav", function() {
		//动态获取数据
		$.get("data/nav.json", function(data) {
			var html = template("nav", data);
			$(".select-cont ul").html(html);
			$(".navpag nav .select-cont").hide();
			//鼠标滑过所有商品出现下拉
			$(".nav .select-tit").mouseover(function() {
				$(this).next().show();
			});
			//鼠标移出商品下拉列表时消失
			$(".nav .select").mouseleave(function(){
				$(this).find(".select-cont").hide();
			});
			//鼠标滑过商品列表出现右边导航
			$(".select-cont-bar li").hover(function() {

				$(this).attr("class", "active").find(".books").show().end().siblings().attr("class", "");
			}, function() {

				$(this).attr("class", "").find(".books").hide();
			});
			//鼠标滑过商品列表出现右边导航end-------------------------------------------------
		})

	});
	//nav加载完成-------------------------------------------------------------------------------
	
	
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
	
	
	$(".footer").load("data/common.html .foot", function() {

		//尾部鼠标滑过微信图标
		$(".wechat").hover(function() {
			$(this).find(".wechat-tips").show();
		}, function() {
			$(this).find(".wechat-tips").hide();
		});

	});
	//foot加载完成-------------------------------------------------------------------------------
	
	
	$.get("data/list.json",function(data){
		//取出JSON数据中的所有商品start---------------
		var listArr = [];
		var listObj = {};
		for(var item in data) {
			var obj = data[item];
		    for(var index in obj){
                if(obj[index].id){            	
                	for(var i in listArr){
                		if(listArr[i].id == obj[index].id){
                			listArr.splice(i,1);
                		}	
                	}
                	listArr.push(obj[index])
                }
            }
		}
		listObj.lists = listArr;
		//取出JSON数据中的所有商品end-----------------
		var html = template("list-proList",listObj);
		$("#ul-sear").html(html);
	
		//鼠标滑过小图images/Cggc638=JPG
		$(".i_dl dd").hover(function(){
			$(this).addClass("select");
			var mImgSrc1 = $(this).attr("data-url").split("=")[0];
			var mImgSrc2 = $(this).attr("data-url").split(".")[1];
			$(this).parents(".i_wu").prev().find("img").attr("src",mImgSrc1+"=400x400."+mImgSrc2);	
		},function(){
			$(this).removeClass("select");
		});
		
	
		
	
	});
	
	
	
	
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
	
	//找到匹配的ID
    function matchId(data,id){
        // 获取json中匹配当前id的那个商品记录
        for(var item in data){
            var obj = data[item];
            for(var index in obj){
                if(obj[index].id == id){
                    return obj[index];//$.each,不能使用返回值终止遍历，常用来遍历jquery对象
                }
            }
        }
    }
	
	
	
})
