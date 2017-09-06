$("txt,input").click(function  () {
	$(this).parent().children("txt").css("display","none").next().focus();
})




//
//$("input").blur(function  () {
//	//输入框内无内容时清除提示框
//	if (!$(this).val()) {
//		$(this).prev().css("display","inline");
//		$(".input-tip").children().html("");
//	}
//	
//	
//})


$(".orEmail a").click(function(){
	$(this).parent().css("display","none");
	$(".item-email-wrap").css("display","block");
})

$(".orPhone a").click(function(){
	$(".item-email-wrap").css("display","none");
	$(".orEmail").css("display","block");
})

 $(":checkbox").change(function(){
 	if ($(this).is(":checked")) {
 		$("#submitbtn").removeAttr("disabled");
 	}else{
 		$("#submitbtn").attr("disabled","disabled");
 	}
 })
 
 
 //规则判断
	var usernameReg = /^[a-zA-Z]\S{5,9}$/;
	var errorusername= /[^\da-zA-Z\u4E00-\u9FA5_-]/; //非汉字、字母、数字、“-”“_”的组合
	var numname=/^\d{1,20}$/;//1到20位的纯数字
	
	var emailAdd=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	var phoneNumReg = /^[1][34578]\d{9}$/;
	
	
	//用户名判断
$("#form-accout").blur(function  () {
//		失去焦点时
//			若为空,则移除所有error样式,提示信息为:默认信息 
//			若不为空,判断是否有非法字符
//							有点话,加上所有error样式,提示信息为:格式错误
//							没有的话,判断长度是否符合要求
//								不符合的话,加上error样式,提示信息为:长度只能在4-20个字符之间
//								符合的话, 显示符合状态
	if ( $(this).val() ) {
		if (	 errorusername.test( $(this).val() ) ) {
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>格式错误，仅支持汉字、字母、数字、“-”“_”的组合");
			
		}else if ($(this).val().length < 4) {
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>长度只能在4-20个字符之间");
		}else if (numname.test($(this).val())) {
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>用户名不能是纯数字，请重新输入！");
		}else{
			$(this).parent().find(".i-status").css("display","block");
			$(this).parent().next().children().html("");
		}
	}else{
		
		$(this).parent().find(".i-status").css("display","none");
		$(this).parent().removeClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html("");
//		输入框内无内容时清除提示框
		$(this).prev().css("display","inline");
		
	}
	
	
}).focus(function  () {
	//获取焦点时如果有error样式则不清空
	
	if (!$(this).parent().hasClass("form-item-error")) { //没有error样式时清空提示
		$(this).parent().next().children().html("");
	}
	
	
}).keyup(function  () {
		$(this).parent().find(".i-status").css("display","none");
//		键盘抬起时删除符合要求状态
//		键盘抬起时 只判断是否有非法字符
//			若为空,则移除所有error样式,提示信息为:默认信息
//			若不为空,判断是否有非法字符
//							有的话,加上所有error样式,提示信息为:格式错误
//							

	if ( $(this).val() ) {
		
		if (	 errorusername.test( $(this).val() ) ) {
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>格式错误，仅支持汉字、字母、数字、“-”“_”的组合");
		}else{
			$(this).parent().removeClass("form-item-error");
			$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
		}
	}else{
		$(this).parent().removeClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
	}
})


//手机号验证
$("#form-phone").blur(function  () {
//		失去焦点时
//			若为空,则移除所有error样式,提示信息为:默认信息 
//			若不为空,判断是否有非法字符
//							有点话,加上所有error样式,提示信息为:格式错误
//							没有的话,判断长度是否符合要求
//								不符合的话,加上error样式,提示信息为:长度只能在4-20个字符之间
//								符合的话, 显示符合状态
	if ( $(this).val() ) {
		
		if ( ! phoneNumReg.test( $(this).val() ) ) {
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>格式错误");
			
		}else{
			$(this).parent().removeClass("form-item-error");
			$(this).parent().next().children("span").removeClass("infoerror").html("");
			$(this).parent().find(".i-status").css("display","block");
			$(this).parent().next().children().html("");
		}
	}else{
		
		$(this).parent().find(".i-status").css("display","none");
		$(this).parent().removeClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html("");
//		输入框内无内容时清除提示框
		$(this).prev().css("display","inline");
		
	}
	
	
}).focus(function  () {
	//获取焦点时如果有error样式则不清空
	if (!$(this).parent().hasClass("form-item-error")) { //没有error样式时清空提示
		$(this).parent().next().children().html("");
	}
}).keyup(function  () {
		$(this).parent().find(".i-status").css("display","none");
//		键盘抬起时删除符合要求状态
//		键盘抬起时 只判断是否有非法字符
//			若为空,则移除所有error样式,提示信息为:默认信息
//			若不为空,判断是否有非法字符
//							有的话,加上所有error样式,提示信息为:格式错误
//							

	if ( $(this).val() ) {
		
		if (	!  phoneNumReg.test( $(this).val() ) ) {  //不符合规则的话
			//$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>格式错误");
			$(this).parent().removeClass("form-item-error");
			$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
		}
	}else{
		$(this).parent().removeClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
	}
})



//验证码判断
$("#form-vcode").blur(function  () {

	if ( $(this).val() ) {
		//做验证码正确判断
		if ($(this).val()==$(this).siblings("img").attr("d")) {
			$(this).next().css("display","block");
		}else{
			$(this).next().css("display","none");
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>验证码错误");
		}
		//console.log($(this).next().attr("d"));
		
	}else{
		
		$(this).parent().find(".i-status").css("display","none");
		$(this).parent().removeClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html("");
//		输入框内无内容时清除提示框
		$(this).prev().css("display","inline");
		
	}
	
	
}).focus(function  () {
	//获取焦点时如果有error样式则不清空
	if (!$(this).parent().hasClass("form-item-error")) { //没有error样式时清空提示
		$(this).parent().next().children().html("");
	}
	$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
}).keyup(function  () {
		$(this).parent().find(".i-status").css("display","none");


	if ( $(this).val() ) {
		
		if (	 errorusername.test( $(this).val() ) ) {
			//$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>格式错误，仅支持汉字、字母、数字、“-”“_”的组合");
		}else{
			$(this).parent().removeClass("form-item-error");
			$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
		}
	}else{
		$(this).parent().removeClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
	}
})



var pwdReg1= /^(\d{6,}$|[a-z]{6,}$)/ //密码纯字母 or  纯数字
var pwdReg2=/(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{1,}$/;
//var pwdReg2=/^(\d|[a-z]){6,}/;
//密码判断
$("#form-pwd").blur(function(){
	if($(this).val()){
	
	//做密码判断
		if ( $(this).val().length <6 ) {
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>长度只能在6-20个字符之间");
		}else if( pwdReg1.test($(this).val()) ){
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>有被盗风险,建议使用字母、数字和符号两种及以上组合");
		}else if( pwdReg2.test($(this).val()) ){
			$(this).parent().next().children("span").html("<i></i>安全强度适中，可以使用三种以上的组合来提高安全强度");
			$(this).parent().find(".i-status").css("display","block");
			$(this).parent().next().children().html("");
		}else{
			$(this).parent().next().children("span").html("<i></i>你的密码很安全");
			$(this).parent().find(".i-status").css("display","block");
			$(this).parent().next().children().html("");
		}
		
		
		
	}else{
		
		$(this).parent().find(".i-status").css("display","none");
		$(this).parent().removeClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html("");
//		输入框内无内容时清除提示框
		$(this).prev().css("display","inline");
		
	};
	
	
}).focus(function  () {
	//获取焦点时如果有error样式则不清空
	if (!$(this).parent().hasClass("form-item-error")) { //没有error样式时清空提示
		$(this).parent().next().children().html("");
	}
	//$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
	
	
}).keyup(function  () {

	
	if($(this).val()){
	
	//做密码判断
		if ( $(this).val().length <6 ) {
			//$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>长度只能在6-20个字符之间");
		}else if( pwdReg1.test($(this).val()) ){
			//$(this).parent().find(".i-status").css("display","block");
			$(this).parent().addClass("form-item-error").next().children("span").html("<i class='i-error'></i>有被盗风险,建议使用字母、数字和符号两种及以上组合");
		}else if( pwdReg2.test($(this).val()) ){
			$(this).parent().removeClass("form-item-error");
			$(this).parent().next().children("span").html("<i></i>安全强度适中，可以使用三种以上的组合来提高安全强度");
			$(this).parent().find(".i-status").css("display","block");
		}else{
			$(this).parent().removeClass("form-item-error");
			$(this).parent().next().children("span").html("<i></i>你的密码很安全");
			$(this).parent().find(".i-status").css("display","block");
		}
		
		
		
	}else{
		
		$(this).parent().find(".i-status").css("display","none");
		$(this).parent().addClass("form-item-error");
		//$(this).parent().next().children("span").removeClass("infoerror").html("");
//		输入框内无内容时清除提示框
		//$(this).prev().css("display","inline");
		
	};
})

//确认密码
$("#form-repwd").blur(function  () {
	if($(this).val()){
	
	//做密码判断
		if ( $(this).val()==$("#form-pwd").val() ) {
			$(this).parent().find(".i-status").css("display","block");
			$(this).parent().removeClass("form-item-error");
			$(this).parent().next().children("span").removeClass("infoerror").html("");
			$(this).parent().next().children().html("");
		}else{
			$(this).parent().addClass("form-item-error").next().children("span").addClass("infoerror").html("<i class='i-error'></i>两次密码输入不一致");
		}
		
		
		
	}else{
		
		$(this).parent().find(".i-status").css("display","none");
		$(this).parent().removeClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html("");
//		输入框内无内容时清除提示框
		$(this).prev().css("display","inline");
		
	};
	
	
}).focus(function  () {
	//获取焦点时如果有error样式则不清空
	if (!$(this).parent().hasClass("form-item-error")) { //没有error样式时清空提示
		$(this).parent().next().children().html("");
	}
	//$(this).parent().next().children("span").removeClass("infoerror").html($(this).parent().children("input").attr("default"));
	
	
}).keyup(function  () {

	
	if($(this).val()){
	
	
		
		
		
	}else{
		$(this).parent().removeClass("form-item-error");
		$(this).parent().find(".i-status").css("display","none");
		//$(this).parent().addClass("form-item-error");
		$(this).parent().next().children("span").removeClass("infoerror").html("");
//		输入框内无内容时清除提示框
		//$(this).prev().css("display","inline");
		
	};
})


//邮箱验证


//切换验证码图片
var vcoden=0;
$(".form-item-authcode").children("img").click(function  () {
	$.ajax({
		type:"get",
		url:"../json/vcode.json",
		success:function  (res) {
			$(".form-item-authcode").children("img").attr({
				"src":res.vcode[vcoden].img,
				"d":res.vcode[vcoden].d
			});
		}
	});
	vcoden++;
	if (vcoden>3) {
		vcoden=0;
	}
})
//页面加载时加载验证码图片
$.ajax({
	type:"get",
	url:"../json/vcode.json",
	success:function  (res) {
		$(".form-item-authcode").children("img").attr({
			"src":res.vcode[0].img,
			"d":res.vcode[0].d
		});
	}
});


$("#submitbtn").click(function  () {
//	console.log($("div").hasClass("form-item-error"));
	if ($("div").hasClass("form-item-error")) {
		
		$("div").filter(".form-item-error").first().find("input").focus();
	}else if($("#form-accout").val() && $("#form-pwd").val() &&  $("#form-repwd").val() && $("#form-phone").val() &&  $("#form-vcode").val()){
		//保存注册信息
		//先读取cookie看是否为空，若为空则新建一个空数组；若不为空则将cookie转成数组
		//在数组中查找username和phone，若不存在，将该组json加入数组。
//		var arr=[];
//		if ($.cookie("userinfo")) {
//			
//		}
//		var s="";
//		//s="{'username' : '"+$('#form-accout').val()+"'}"
//		s={
//		"username":$("#form-accout").val(),
//		"password":$("#form-pwd").val(),
//		"phone":$("#form-phone").val()
//		}
//		arr.push(s);
//		console.log( arr  );
		$.cookie("uid",$('#form-accout').val(),{ expires: 7, path: '/' });
		$.cookie("pwd",$('#form-pwd').val(),{ expires: 7, path: '/' });
		
		window.location="login.html";
}
	return false;	
})


