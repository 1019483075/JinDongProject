
$("body").on({
	mouseenter:function  () {
		$(this).addClass("redcolor");
	},
	mouseleave:function  () {
		$(this).removeClass("redcolor");
	}
},"a:not('.no-red')")

$('.topbanner-close').hover(
	function  () {
		$(this).css({
			"background":"url(images/topbannerclose.png) no-repeat 0 -19px"
		})
	},
	function(){
		$(this).css({
				"background":"url(images/topbannerclose.png) no-repeat 0 0"
			})
	}
).click(function  () {
	$('.topbanner-close').parents(".topbanner").fadeOut(400);
})




var focusLunBoPage=0;
var focusLunBotime=setInterval(focusLunBochangepage,3000);
var flag=true;
function focusLunBochangepage () {
	focusLunBoPage++;
	if (focusLunBoPage>5) {
		focusLunBoPage=0;
	}
	$(".slider-page-num li").eq(focusLunBoPage).addClass("page-seleced").siblings().removeClass("page-seleced");
	focusLunBomove()
}
function focusLunBomove () {
	
		$('.slider-layer').eq(focusLunBoPage).stop().animate({
			"opacity":1
		}).siblings().stop().animate({
			"opacity":0
		})
}

$(".slider-page-num li").mouseenter(function  () {
	clearInterval(focusLunBotime);
	focusLunBoPage=$(this).index();
	$(".slider-page-num li").eq(focusLunBoPage).addClass("page-seleced").siblings().removeClass("page-seleced");
	focusLunBomove();
})

$(".focus").mouseenter(function(){
	clearInterval(focusLunBotime);
}).mouseleave(function(){
	focusLunBotime=setInterval(focusLunBochangepage,3000);
})



var lazyLunBoPage=0;
var lazyFlag=true;
function lazymove () {
	$(".lazytoday").find(".slider-main").animate({
		"left":-1000*(lazyLunBoPage+1)
	},1000,function(){
		lazyFlag=true;
		if ($(".lazytoday").find(".slider-main").css("left")=="-5000px") {
			$(".lazytoday").find(".slider-main").css("left","-1000px")
			lazyLunBoPage=0;
		}
		if ($(".lazytoday").find(".slider-main").css("left")=="0px") {
			$(".lazytoday").find(".slider-main").css("left","-4000px")
			lazyLunBoPage=3;
		}
	})
}

$(".lazytoday").find(".left-btn").click(function(){
	if (lazyFlag) {
		lazyLunBoPage--;
		lazymove();
	}
	lazyFlag=false;
})

$(".lazytoday").find(".right-btn").click(function(){
	if (lazyFlag) {
		lazyLunBoPage++;
		if (lazyLunBoPage>4) {
			lazyLunBoPage=1;
		}
		lazymove();
	}
	lazyFlag=false;

})

$(".lazytoday").find(".slider").hover(
	function  () {
		$(".lazytoday").find(".slider-page-btn").css("display","block");
	},
	function(){
		$(".lazytoday").find(".slider-page-btn").css("display","none");
	}
);


//******************猜你喜欢ajax**********************

//点击换一批功能
(function  () {
	var guessyoui=0;
	$('#guessyou .mt a').click(function  () {
		guessyoui+=5;
		if (guessyoui>10) {
			guessyoui=0
		}
		$.ajax({
			url:"json/gueesslike2.json",
			success:function  (res) {
				for (var i=0;i<5;i++) {
					$(".lazyguesslike").find("li").eq(i).find("img").attr("src",res.data[i+guessyoui].img);
					$(".lazyguesslike").find("li").eq(i).find(".p-name").children('a').html(res.data[i+guessyoui].t);
					$(".lazyguesslike").find("li").eq(i).find(".p-price").html("<i>¥</i>"+res.data[i+guessyoui].jp);
					$(".lazyguesslike").find("li").eq(i).find(".no-red").attr("href",res.data[i+guessyoui].turl);
				}
			}
		})
	})
})();

//页面初始时加载
$.ajax({
	url:"json/gueesslike2.json",
	success:function  (res) {
		for (var i=0;i<5;i++) {
			$(".lazyguesslike").find("li").eq(i).find("img").attr("src",res.data[i].img);
			$(".lazyguesslike").find("li").eq(i).find(".p-name").children('a').html(res.data[i].t);
			$(".lazyguesslike").find("li").eq(i).find(".p-price").html("<i>¥</i>"+res.data[i].jp);
			$(".lazyguesslike").find("li").eq(i).find(".no-red").attr("href",res.data[i].turl);
		}
	}
});

//******************今日推荐ajax**********************
//$.ajax({
//	url:"json/TodayRec.json",
//	success:function  (res) {
//		for (var i=1;i<16;i++) {
//			$(".lazytoday .slider-layer .p"+(i%4)).find("li").eq(i).find("img").attr("src",res.data[i].img);
//			$(".lazytoday .slider-layer .p"+(i%4)).find("li").eq(i).find(".p-name").children('a').html(res.data[i].t);
//			$(".lazytoday .slider-layer .p"+(i%4)).find("li").eq(i).find(".p-price").html("<i>¥</i>"+res.data[i].jp);
//		}
//	}
//});


//页面尺寸发生改变时，楼层导航栏自适应
(function  () {
	var H=document.documentElement.clientHeight||document.body.clientHeight;
	var T=(H-$(".elevator").height())/2;
	if (T<=0) {
		T=0;
	}
	$(".elevator").css({
		"top":T
	})
})()
$(window).resize(function  () {
	var H=document.documentElement.clientHeight||document.body.clientHeight;
	var T=(H-$(".elevator").height())/2;
	if (T<=0) {
		T=0;
	}
	$(".elevator").css({
		"top":T
	})
})

//时钟部分
Clock()
function Clock(){
	var oHour = document.getElementById('hour');
	var oSec = document.getElementById('sec');
	var oDot = document.getElementById('blockDot');
	var myTime = new Date();
	var iHours = myTime.getHours();
	var iHoursPos = iHours * 30 + 90;
	var oSecTime = 90;
	var oDotTime = 90;
	oHour.style.transform="rotate(" + iHoursPos + "deg)";
	oSec.style.transform="rotate(" + oSecTime + "deg)";
	oDot.style.transform = "rotate(" + oDotTime + "deg)";
	// 兼容360浏览器
	oHour.style.WebkitTransform="rotate(" + iHoursPos + "deg)";
	oSec.style.WebkitTransform="rotate(" + oSecTime + "deg)";
	oDot.style.WebkitTransform = "rotate(" + oDotTime + "deg)";
	setInterval(function(){
		oSecTime +=3;
		oDotTime +=6;
		oSec.style.transform="rotate(" + oSecTime + "deg)";
		oDot.style.transform = "rotate(" + oDotTime + "deg)";
		// 兼容360
		oSec.style.WebkitTransform="rotate(" + oSecTime + "deg)";
		oDot.style.WebkitTransform = "rotate(" + oDotTime + "deg)";
	},100);
}

//小红条从左到右
$("#guessyou").mouseenter(function  () {
	$("#guessyou .mc .spacer i").css("right","900px")
	$("#guessyou .mc .spacer i").stop().animate({
		"right":-1
	})
})