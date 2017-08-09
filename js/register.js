$(function() {
	$("#login-header").load("data/common.html .login-head");
	//login-header加载完成-------------------------------------------------------------------------------
	$(".footer").load("data/common.html .foot-copyright");
	//foot加载完成-------------------------------------------------------------------------------

	
	var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
	var regPassword = /^\w{6,20}$/;
	//手机账号
	$("#txtUserName").focus(function(){
		$(".usererr").html("请输入注册的手机号码").css("color","#cecece");	
	});	
	$("#txtUserName").blur(function(){
		if ($("#txtUserName").val() == "") {
		    $(".usererr").html("");
		    $(this).css("border-color","#E6E6E6");
		}	
	});
	$("#txtUserName").change(function(){
		if(!regPhone.test($(this).val())){
			$(".usererr").html("账号暂且支持手机账号注册").css("color","#FF0000");
			$(this).css("border-color","#FF0000")
		}else {
			$(".usererr").html("手机账号可以注册").css("color","#008000");
			$(this).css("border-color","#E6E6E6");
		}
	});
	
	
	//第一个密码框
	$("#txtPassword").focus(function(){
		$(".pwderr").html("使用字母、数字、“_”的组合,密码长度在6-20个字符").css("color","#cecece");		
	});
	$("#txtPassword").blur(function(){
		if ($("#txtPassword").val() == "") {
		    $(".pwderr").html("");
		}		
	});
	$("#txtPassword").change(function(){
		if($("#txtPassword").val().length < 6 || $("#txtPassword").val().length > 20) {
			$(".pwderr").html("密码只能在6-20个字符之间").css("color","#FF0000");
			$(this).css("border-color","#FF0000")
		} else if(!regPassword.test($(this).val())) {
			$(".pwderr").html("格式错误，仅支持字母、数字、“_”的组合").css("color","#FF0000");
			$(this).css("border-color","#FF0000");

		} else{
			$(this).css("border-color","#CECECE");
			var reg1 = /[a-z]/g;
			var reg2 = /[A-Z]/g;
			var reg3 = /[0-9]/g;
			var reg4 = /_/g;
			var flag1 = 0,flag2 = 0,flag3 = 0,flag4 = 0;
			if(reg1.test($(this).val())){
				flag1 = 1;		
			}
			if(reg2.test($(this).val())){
				flag2 = 1;		
			}
			if(reg3.test($(this).val())){
				flag3 = 1;		
			}
			if(reg4.test($(this).val())){
				flag4 = 1;		
			}
			var sum = flag1 +　flag2 + flag3 + flag4;
			switch(sum){
				case 1:
					$(".pwderr").html("密码强度为弱").css("color","#008000");
					break;
				case 2:
					$(".pwderr").html("密码强度为中").css("color","#008000");
					break;
				case 3:
					$(".pwderr").html("密码强度为中").css("color","#008000");
					break;
				case 4:
					$(".pwderr").html("密码强度为高").css("color","#008000");
					break;			
			}
		}				
	});
	
	//第二个密码框#txtRePassword .repwderr
	$("#txtRePassword").focus(function() {
		$(".repwderr").html("请再次输入密码").css("color","#CECECE");
	});
	$("#txtRePassword").blur(function() {
		if($("#txtPassword").val() == "") {
			$(".repwderr").html("");
		}

	});
	$("#txtRePassword").change(function() {
		if($("#txtRePassword").val() != $("#txtPassword").val()) {
			$(".repwderr").html("两次密码输入不一致").css("color","#FF0000");
			$(this).css("border-color","#FF0000");
		} else {
			$(".repwderr").html("两个密码一致").css("color","#008000");
		}
	});
	
  	
  	//初始化验证码
  	$(".captcha").html(createCode());
 	$(".captcha").click(function(){
 	  	$(".captcha").html(createCode());
	 });
	//随机生成验证码！
	function createCode(){
	 	var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    	var result="";
    	for(var i=0;i<4;i++){
	    	charIndex=Math.floor(Math.random()*str.length);
	    	result+=str.charAt(charIndex);
	    }
	    return result;
 	}

	$("#txtValidationCode1").focus(function(){
		$(".autherr1").html("请输入验证码").css("color","#CECECE");
	});
	
	$("#txtValidationCode1").blur(function(){
		if($("#txtValidationCode1").val() == "") {
			$(".autherr1").html("");
		}
	});
	$("#txtValidationCode1").change(function(){
		var value1 = $(".captcha").html().toLowerCase();
		var value2 = $("#txtValidationCode1").val().toLowerCase();
		if (value2 != value1) {
			$(".autherr1").html("验证码输入错误").css("color","#FF0000");
		}else{
			$(".autherr1").html("验证码输入正确").css("color","#008000");	
		}
	});
	
	//点击注册按钮
	$("#btnSubmit").click(function(){
		var userid = $("#txtUserName").val();
		var pass = $("#txtPassword").val();
		var uesrObj = {};
		//判断字体都为绿色时存入cookie
		$(".v3l-lv").each(function(){
			if ($(this).css("color") != "rgb(0, 128, 0)") {
			    
		    	alert("请填写正确信息");
		    	return false; 
			}else{
				uesrObj.userid = userid;
				uesrObj.pass = pass;
				var users = JSON.stringify(uesrObj);
			  	$.cookie("users",users,{expires:7,path:"/"});
			  	setTimeout(function(){
			  		location.href = "index.html";//跳转页面
			  	},2000);

		  	 	
			}
			
		});
	});
	
	
	
	
})