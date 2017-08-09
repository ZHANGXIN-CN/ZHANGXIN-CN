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
        
	});
	//头部加载完成-------------------------------------------------------------------------
	
	
	$(".footer").load("data/common.html .foot", function() {
		//尾部鼠标滑过微信图标
		$(".wechat").hover(function() {
			$(this).find(".wechat-tips").show();
		}, function() {
			$(this).find(".wechat-tips").hide();
		});

	});
	//foot加载完成-------------------------------------------------------------------------------
		
	//动态加载热卖商品
	$.get("data/list.json",function(data){
		var html = template("list-hot",data);
		$("#hot-ranks ul").html(html);	

	});
	
	
	//模板切换代码
	function cutTemplate(){
 		var cartStr = $.cookie("cart");
 	 	cartStr = cartStr ? cartStr : "{}";
	 	var cartObj = JSON.parse(cartStr);
    	if (cartStr == "{}") {
    		$("#cartTop").hide();
    		$("#cart-exist").hide();
    	    $("#cart-null").show(); 
    	}else{
    		$("#cartTop").show();
    		init("#listNum");     //初始化商品清单
    		ShoppingCartEvent();
    	}
	}
	cutTemplate();
	
	
	
	//购物车列表事件Start----------------------------------------------------------------------------------
	function ShoppingCartEvent(){
		$("tr").remove(".addline");
		$.get("data/list.json",function(data){
		var cartInforObj = {};	//包含购物车所有商品具体信息的对象
		var proInforArr = [];   //对象中的的数组
	 	var cartStr = $.cookie("cart");//获取购物车cookie信息
	 	
        var cartObj = cartStr ? JSON.parse(cartStr) : {};
		for (var key in cartObj) {
		 	var item = matchId(data,key);  //item是当前商品的信息
		 	item.num = cartObj[key];
		 	//item.subtotal = cartObj[key] * parseFloat(item.price);			//小计
		 	proInforArr.push(item);
		}
		cartInforObj.proInfor = proInforArr;
		var html = template("list-cart",cartInforObj);
		$(".tab-zdcon tbody").append(html);	

		$(".subtotal").each(function(){
			var _this = this;
			var item = matchId(data,$(this).attr("data-id"));
			var itemprice = item.price;
			var itemnum = cartObj[$(this).attr("data-id")];
			cartSubtotal(_this,itemprice,itemnum);		
		});
		
		init(".top-r li .num");//初始化头部购物车
		proAllNumInit("#listNum");     //初始化商品清单
		proAllNumInit(".carwindc-2 .carwindc-2-total");//初始化结算商品总数
		cartTotal(); 					//初始化总计		
		
		//鼠标点点击加减号
	    $(".cartReduce").click(function (){
	        //当前input框内的数值
	        var value = $(this).next().val();
	        if( value <= 1){ 
	        	$(".cart-numa-tips").html("商品数量不能小于1<i><em></em></i>").css({"left":-62});
	        	$(this).parent().find(".cart-numa-tips").stop().fadeIn(1).delay(1500).fadeOut(100);
	        }else{
	            value --;
	            $(this).next().val(value);
	            cartObj[$(this).attr("data-id")]--;
	            var cart = JSON.stringify(cartObj);
   			 	$.cookie("cart",cart,{"expires":7,"path":"/"});  //存cookie
   			 	init(".top-r li .num");    //初始化头部购物车
   			 	proAllNumInit("#listNum");     //初始化商品清单
   			 	proAllNumInit(".carwindc-2 .carwindc-2-total");//初始化结算商品总数
   			 	var _this = $(this).parents(".tab-zdcon-line").siblings(".subtotal");
   			 	var itemprice = $(this).parents(".tab-zdcon-line").prev().html();
   			 	cartSubtotal(_this,itemprice,value);    //小计变化
   			 	cartTotal(); 					//总计变化
	        }
	        
	    });
	    $(".cartAdd").click(function (){
	        //当前input框内的数值
	        $(this).parents(".addline").find(".add-value").prop("checked", true);   //点击加号时默认选中商品
	        var value = $(this).prev().val();
	        value ++;
	       	$(this).prev().val(value);
	        cartObj[$(this).attr("data-id")]++;
            var cart = JSON.stringify(cartObj);
		 	$.cookie("cart",cart,{"expires":7,"path":"/"});  //存cookie
		 	init(".top-r li .num");    //初始化头部购物车
		 	proAllNumInit("#listNum");     //初始化商品清单
		 	proAllNumInit(".carwindc-2 .carwindc-2-total");//初始化结算商品总数
		 	var _this = $(this).parents(".tab-zdcon-line").siblings(".subtotal");
		 	var itemprice = $(this).parents(".tab-zdcon-line").prev().html();
		 	cartSubtotal(_this,itemprice,value);    //小计变化
		 	cartTotal(); 					//总计变化
	
	    });
	    //input框失去焦点事件
	    $(".cartnum-value").blur(function (){
	        //当前input框内的数值 
	        var value = $(this).val();
	        var reg = /^\+?[1-9][0-9]*$/gi;
	        //判断输入异常时的操作
	     	if (!reg.test(value)) {
	     		$(".cart-numa-tips").html("输入的数量只能是数字<i><em></em></i>").css({"left":-34});
	     	    $(this).parent().find(".cart-numa-tips").stop().fadeIn(1).delay(2000).fadeOut(100);
     	     	$(this).val("1");
	     	}else{
	     		cartObj[$(this).attr("data-id")] = parseFloat(value);
	            var cart = JSON.stringify(cartObj);
			 	$.cookie("cart",cart,{"expires":7,"path":"/"});  //存cookie
			 	init(".top-r li .num");    //初始化头部购物车
			 	proAllNumInit("#listNum");     //初始化商品清单
			 	proAllNumInit(".carwindc-2 .carwindc-2-total");//初始化结算商品总数
			 	var _this = $(this).parents(".tab-zdcon-line").siblings(".subtotal");
			 	var itemprice = $(this).parents(".tab-zdcon-line").prev().html();
			 	cartSubtotal(_this,itemprice,cartObj[$(this).attr("data-id")]);    //小计变化
			 	cartTotal(); 					//总计变化					 	
	     	}		
	    });
	    //点击单个商品的删除按钮
	    $(".tabdiv-del").click(function(){
	    	if (confirm("您确定删除该购物车明细记录吗?")) {
	    	    delete cartObj[$(this).attr("data-id")];
				var cart = JSON.stringify(cartObj);
				$.cookie("cart",cart,{"expires":7,"path":"/"});  //存cookie 		
				cutTemplate();    //初始化页面信息
	    	}
	    });
	    //删除全部商品
	    //添加事件之前先清除一次绑定的事件,动态记载子页面,会给元素多次绑定事件 
	    $("#btn-deleteAll").unbind('click');
	    $("#btn-deleteAll").click(function(){
    	 	var deleteOk=confirm("您确定删除该购物车明细记录吗?")
	    	if (deleteOk){
	    		if($('#CheckAll').prop('checked')){
		　			cartObj = {};
					var cart = JSON.stringify(cartObj);
					$.cookie("cart",cart,{"expires":7,"path":"/"});  //存cookie  	
					cutTemplate();    //初始化页面信息
					init(".top-r li .num");    //初始化头部购物车
				}
	    	}
	    });
	    //点击复选框按钮
	    $(".add-value").not("#CheckAll").click(function(){	
	    	/*if ($(this).prop("checked")) {
    	   		$(this).prop("checked", true);
	    	}else{
    		 	$(this).prop("checked", false);	
	    	}	*/
	    	proAllNumInit("#listNum");     //初始化商品清单
			proAllNumInit(".carwindc-2 .carwindc-2-total");//初始化结算商品总数
	    	cartTotal();		//初始化总计
	    });
	    //点击全选按钮
	   	$("#CheckAll").click(function(){	
	    	if ($(this).prop("checked")) {
    	   		$(".add-value").prop("checked", true);
	    	}else{
    		 	$(".add-value").prop("checked", false);	
	    	}	
	    	proAllNumInit("#listNum");     //初始化商品清单
			proAllNumInit(".carwindc-2 .carwindc-2-total");//初始化结算商品总数
    		cartTotal();		//初始化总计
	    });
	    
	    
	    
	    
	    

	});
	}
	//购物车列表事件End-------------------------------------------------------------------------------------
	
	//小计
	function cartSubtotal(_this,itemprice, itemnum){
		itemprice = itemprice.split("¥")[1];
		subtotal = parseFloat(itemprice) * parseFloat(itemnum);
		$(_this).html("<em>¥"+subtotal+".00</em>");
	}
	
	//总计
	function cartTotal(){
		var total = 0;       //总计
		$(".subtotal").each(function(index,item){
			var selectedOk = $(this).siblings().find(".add-value").prop('checked');   //判断自身的复选框有没有被选中个
			if (selectedOk) {
			    total += parseFloat($(this).children().html().split("¥")[1]);
			}	
		})
		$(".carwindc-1 em").html("¥"+total+".00");
	}
	
	
	//初始化 商品清单和商品总数计算
	function proAllNumInit(ele){
		//获取所有选中的复选框中的商品数量
		var proAllNum = 0;
		$(".add-value").not("#CheckAll").each(function(){
			if ($(this).prop("checked")) {
			    proAllNum += parseFloat($(this).parent().siblings().find(".cartnum-value").val());
			}
		});
		$(ele).html(proAllNum);
	}
	
	
	
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
