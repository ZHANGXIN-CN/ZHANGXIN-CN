$(function() {
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
	
	
	// 分隔获取url中所传的关键字段值 (id)全局
    var id = location.href.split('?')[1].split("=")[1];
	$.get("data/list.json",function(data){
		var item = matchId(data,id);    //item是当前商品的信息
		var html = template("list-main",item);
		$(".detail-main").html(html);
		
		//推荐商品信息
		var html1 = "";
		for (var m = 0; m < 6; m++) {     //创建6个推荐商品
		    var RandomGoodId = Math.round(Math.random()*38 + 1)   //商品id 1-39
			var RandomGoods = matchId(data,RandomGoodId);
			html1 += "<li><a href='detail.html?id="+ RandomGoods.id +"'><img src='"+ RandomGoods.path +"'/><span class='price'>"+ RandomGoods.price +"</span></a></li>"
			
		}
		$("#ulRecommonds").html(html1);
		
		//热门商品信息
		var html2 = "";
		$(data.hotsales).each(function(){			
			html2 += '<li><a href="detail.html?id='+ this.id +'"><img src="'+ this.path +'" /><p class="title">'+ this.title +'</p><p class="price">'+ this.price +'</p></a></li>';
		});
		$("#p-hot-list").html(html2);
			
		goodsRecord(data);//记录id,生成浏览记录
		//放大镜
	 	$('.pt-data-lt').magnifier();
	 	
	 	
	 	//加入购物车
		$("#addCart").click(function (){
	        var proNum = parseInt($("#buyNum").val());   //获取数量
	        addToCart(proNum);
	       	init(".top-r li .num");//初始化头部购物车
	       	init(".guide-cart-num");//初始化购物车
	    })
	 	
 	    //点击加减号
	    $(".buyReduce").click(function (){
	        //当前input框内的数值
	        var value = $("#buyNum").val();
	        if( value <= 1){
	            alert("数量不能小于1");
	        }else{
	            value --;
	            $("#buyNum").val(value)
	        }
	    })
	    $(".buyAdd").click(function (){
	        //当前input框内的数值
	        var value = $("#buyNum").val();
	        value ++;
	       $("#buyNum").val(value)
	
	    })
	
	 	//鼠标滑过手机扫码出现图片
		$(".data-sao").hover(function(){
			$(this).find(".dstelma").show();
		},function(){
			$(this).find(".dstelma").hide();
		});
		
		//点击切换商品图片
		$(".submenua span").click(function(){
			$(this).addClass("selected").siblings().removeClass("selected");
			$(".tab-detai").eq($(this).index()).removeClass("tab-hide").siblings().addClass("tab-hide");
		});
	 	
	});
	//ajax请求完成----------------------------------------------------------------------
	
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
	
	//保存id,并显示最近浏览记录
    function goodsRecord(data){
        //获取当前存放的id
        var historysStr = $.cookie("history");
        historysStr = historysStr ? historysStr : "[]";//['{"id":id}']
        var historysObj = JSON.parse(historysStr);

        //先判断是否已有该id,若有，则不重复添加
        var isExit = false;//假设不存在
        $.each(historysObj,function(index,item){
            if(id == item.id){
                isExit = true;
                return false;
            }
        })
        if(!isExit){//不存在则添加
            if(historysObj.length >= 5){
                historysObj.shift();//删除首个元素,数组长度，保持最多5个
            }
            historysObj.push({"id": id});
            var str = JSON.stringify(historysObj);
            //上传数据给cookie
            $.cookie("history",str,{"expires":7,"path":"/"});
        }
        //将当前的所有浏览记录显示到页面
        var html = ""
        $.each(historysObj,function (index,item){//['{"id":id}']
            //找到相应的id对应的商品信息
            var productInfor = matchId(data,item.id);
            html += "<li><a href='detail.html?id="+productInfor.id +"'><img src='"+ productInfor.path +"'/><p class='s-title'>"+ productInfor.title+"</p><p class='s-price'><span>"+ productInfor.price +"</span><del>"+ productInfor.del+"</del></p></a></li>";
       });
        $(".s-wrap ul").html(html);
    }
		
		
		
    //加入购物车
	function addToCart(num){
        //获取购物车cookie信息
        var cartStr = $.cookie("cart");
   
        var cartObj = cartStr ? JSON.parse(cartStr) : {};
   
        cartObj[id] = cartObj[id] ? cartObj[id]+=num : num;    

        //存cookie
        var cart = JSON.stringify(cartObj);
        $.cookie("cart",cart,{"expires":7,"path":"/"});
    }

	
	
		



})