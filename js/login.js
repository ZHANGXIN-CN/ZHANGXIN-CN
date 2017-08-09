$(function() {
	$("#login-header").load("data/common.html .login-head");
	//login-header加载完成-------------------------------------------------------------------------------
	$(".footer").load("data/common.html .foot-copyright");
	//foot加载完成-------------------------------------------------------------------------------
	
	$.cookie("userid")	
	//判断当前cookie中是否有内容
    var resStr = $.cookie("users");   
    resStr = resStr ? resStr : "{}";
    var resObj = JSON.parse(resStr);
    console.log(resObj);
  	if(resObj.userid){
    	console.log("saaa");
        $("#loginname").val(resObj.userid);
        $("#loginpwd").val(resObj.pass); 	
    }
	
	//点击切换登录方式
	$("#cutloginPc").click(function() {
		$("#loginPc").hide();
		$("#loginQR").fadeIn();
	});
	$("#cutLoginQR").click(function() {
		$("#loginQR").hide();
		$("#loginPc").fadeIn();	
	});
	
	//用户名获得焦点时
	$("#loginname").focus(function() {
		$("#loginname").next().html("")
		$(this).css("border-color","#D0D0D0");
	});

	//用户名失去焦点时
	$("#loginname").blur(function() {
		
		if($("#loginname").val() == ""){
			$("#loginname").next().html("请输入邮箱/手机号").css("color","#FF0000");;
		}
	});
	
	var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
	var regPassword = /^\w{6,20}$/;
	
	$("#loginname").change(function(){
		if(!regPhone.test($(this).val())){
			$(this).next().html("请输入正确的账号").css("color","#FF0000");
		}else {
			$(this).next().html("账号可以登录").css("color","#008000");
			$(this).css("background-color","#faffbd");
		}
	});
	
	//第一个密码框
	$("#loginpwd").focus(function(){
		$(this).next().html("");		
	});
	$("#loginpwd").blur(function(){
		$(this).next().html("");	
	});
	$("#loginpwd").change(function(){
		if($("#loginpwd").val().length < 6 || $("#loginpwd").val().length > 20) {
			$(this).next().html("密码只能在6-20个字符之间").css("color","#FF0000");
		}else if(!regPassword.test($(this).val())) {
			$(this).next().html("密码格式错误，仅支持字母、数字、“_”的组合").css("color","#FF0000");

		}else{
			$(this).css("background-color","#faffbd");
		}
	});
	
	//点击登录按钮的模块-----------------------------------------------------
	$("#login-btn").click(function() {
		
		var loginname = $("#loginname").val();
		var loginpwd = $("#loginpwd").val();
		var uesrObj = {};

		if(!loginname) {
			$("#loginname").parent().children("div.error").html("请输入用户名");
			return;
		}

		if(!regPhone.test($("#loginname").val())) {
			$("#loginname").parent().children("div.error").html("请输入邮箱/手机号");
			return;
		}

		if(!loginpwd) {
			$("#loginpwd").parent().children("div.error").html("请输入密码");
			return;
		}
		if ($("#chkrememberMe").prop('checked')) {
			console.log("aaa");
		    uesrObj.userid = loginname;
			uesrObj.pass = loginpwd;
			var users = JSON.stringify(uesrObj);
		  	$.cookie("users",users,{expires:7,path:"/"});
		}
		
	  	setTimeout(function(){
	  		location.href = "index.html";//跳转页面
	  	},2000);

		
	});


	
});