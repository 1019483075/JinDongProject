//zoom
$(".goods-zoom").mousemove(function  (e) {
	var L=e.pageX-$(".zoom-inner").width()/2-$("#preview").offset().left
	var T=e.pageY-$(".zoom-inner").height()/2-$("#preview").offset().top
	if (L<=0) {
		L=0;
	}else if(L>=$(".goods-zoom img").width()/2){
		L=$(".goods-zoom img").width()/2;
	}
	if (T<=0) {
		T=0;
	}else if(T>=$(".goods-zoom img").height()/2){
		T=$(".goods-zoom img").height()/2;
	}
	
	$(".zoom-inner").css({
		"left":L,
		"top":T
	});
	
	$(".divzoom").children().css({
		"position":"absolute",
		"left":-L*2,
		"top":-T*2
	})
})

$(".goods-zoom").hover(
	function  () {
		$(".divzoom").css("display","block");
		$(".zoom-inner").css("display","block");
	},
	function  () {
		$(".divzoom").css("display","none");
		$(".zoom-inner").css("display","none");
	}
)

$("#preview .goods-pic-list ul li img").mouseenter(function  () {
	$(this).addClass("img-hover").parent().siblings().children().removeClass("img-hover");
	$(".goods-zoom").children().attr("src", $(this).attr("src"));
	$(".divzoom").children().attr("src", $(this).attr("src"));
	
})



$(".item").click(function  () {
	if (!$(this).hasClass("item-dis")) {
		$(this).addClass("item-se").siblings().removeClass("item-se");
	}
})

$("#choose-service .item").mouseenter(function(){
	$(this).find(".ex-info").css("display","block");
}).mouseleave(function(){
	$(this).find(".ex-info").css("display","none");
})

$(".ex-info li").mouseenter(function(){
	$(this).children().eq(4).css("display","inline-block");
}).mouseleave(function(){
	$(this).children().eq(4).css("display","none");
}).click(function(){
	$(this).parents(".item").find(".service-con").html($(this).children().eq(2).html());
	$(this).parents(".item").find(".service-pri").html($(this).children().eq(3).html());
	
})

$("#choose-baitiao .item").mouseenter(function(){
	$(this).find(".ex-info").css("display","block");
}).mouseleave(function(){
	$(this).find(".ex-info").css("display","none");
})

$(".sub-btn").click(function(){
	var n=$(this).siblings("input").val();
	n--;
	if (n<=1) {
		n=1;
	}
	$(this).siblings("input").val(n);
})

$(".add-btn").click(function(){
	var n=$(this).siblings("input").val();
	n++;
	$(this).siblings("input").val(n);
})

$("#choose-version .choose-dd .item").click(function  () {
	//点击版本时，先判断哪些配置是可选的
	$("#choose-spec .choose-dd").children().removeClass("item-dis"); //将配置项全置为可选状态
	var str1=$(this).children("a").html();
	var str2=$("#choose-spec .choose-dd .item-se").children("a").html();
	var str=str1+"|"+str2;
	$.ajax({
		type:"get",
		url:"json/goodsData.json",
		success:function  (res) {
			//找出含有当前点击版本的数据，并将找出来的json存入数组中
			var a=[];
			for (var attr in res) {
				var t=attr.split("|");
				if (t[0]==str1) {
					a.push(res[attr]);
				}
			}
			//循环遍历数组，找出商品json中disabled健名为true的项，被禁用按钮的索引就为检索出来的数组下标
			var min_able;
			for (var i=a.length-1 ;i>=0;i--) {
				if (a[i].disabled=="true") {
					$("#choose-spec .choose-dd").children().eq(i).addClass("item-dis");
				}else{
					min_able=i;//找出第一个可点击的按钮的索引
				}
			}
			$("#choose-spec .choose-dd").children().eq(min_able).addClass("item-se").siblings().removeClass("item-se");
			//点击可选的配置项，用“版本|配置”这种格式去遍历json的健名，匹配成功的话，页面对应部分就加载其健值
			//因为可能更改过当前选中的item所以需重新获得str2
			str2=$("#choose-spec .choose-dd .item-se").children("a").html();
			str=str1+"|"+str2;
			for (var attr in res) {
				if(attr==str){
					$("#name p").html(res[attr].t);
					$(".price-box p").html("￥"+res[attr].p);
					$(".goods-share span").eq(1).html(res[attr].sid)
					baiTiaoCout(res[attr].p);
				}
			}
		}
	});
})

$("#choose-spec .choose-dd .item").click(function  () {
	if (!$(this).hasClass("item-dis")) {
		var str1=$("#choose-version .choose-dd .item-se").children("a").html();
		var str2=$(this).children("a").html();
		var str=str1+"|"+str2;
		$.ajax({
			type:"get",
			url:"json/goodsData.json",
			success:function  (res) {
				for (var attr in res) {
					if(attr==str){
						$("#name p").html(res[attr].t);
						$(".price-box p").html("￥"+res[attr].p);
						$(".goods-share span").eq(1).html(res[attr].sid)
						baiTiaoCout(res[attr].p);
					}
				}
			}
		});
	}
})

//白条分期计算
function baiTiaoCout (p) {
	p=parseFloat(p);
	var interest=p*0.005;
	//3期
	var p1=(interest*3+p)/3;
	$(".qishi_3").html(" ￥"+p1.toFixed(2)+"×3期");
	$(".qishi_3").siblings().find("li").html("含手续费：费率0.5%，￥"+interest.toFixed(2)+"×3期")
	//6期
	var p2=(interest*6+p)/6;
	$(".qishi_6").html(" ￥"+p2.toFixed(2)+"×6期");
	$(".qishi_6").siblings().find("li").html("含手续费：费率0.5%，￥"+interest.toFixed(2)+"×3期")
	//12期
	var p3=(interest*12+p)/12;
	$(".qishi_12").html(" ￥"+p3.toFixed(2)+"×12期");
	$(".qishi_12").siblings().find("li").html("含手续费：费率0.5%，￥"+interest.toFixed(2)+"×3期")
	//24期
	var p4=(interest*24+p)/24;
	$(".qishi_24").html(" ￥"+p4.toFixed(2)+"×24期");
	$(".qishi_24").siblings().find("li").html("含手续费：费率0.5%，￥"+interest.toFixed(2)+"×3期")
	
}

$("#choose-btns .addcart-btn").click(function  () {
	var sidArray=[];
    var numArray=[];
    if ($.cookie("cartgoodsid")) {
		sidArray=$.cookie("cartgoodsid").split(",");
	}else{
		sidArray=[];
	}
	if ($.cookie("cartgoodnum")) {
		numArray=$.cookie("cartgoodnum").split(",");
	}else{
		numArray=[];
	}
    var s=$(".goods-share span").eq(1).html()
    if (isInArray(s,sidArray)) {
		var t=$("#choose-btns .choose-amount input").val();
		numArray[sidArray.indexOf(s)]=t;
		$.cookie("cartgoodnum",numArray.toString(),{ expires: 7, path: '/' });
	}else{
		sidArray.push(s);
		$.cookie("cartgoodsid",sidArray.toString(),{ expires: 7, path: '/' });
		numArray.push($("#choose-btns .choose-amount input").val());
		$.cookie("cartgoodnum",numArray.toString(),{ expires: 7, path: '/' });
	}
	window.location="cart.html";
})


function isInArray (n,a) {
	for (var i=0;i<a.length;i++) {
		if (n==a[i]) {
			return true;
		}
	}
	return false;
}

