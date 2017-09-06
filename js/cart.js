$.ajax({
	url:"html/globaltopbar.html",
	success:function  (res) {
		$(".topbarbox").html(res).find(".inner").addClass("w");
	}
});

$.ajax({
	url:"html/footer.html",
	success:function  (res) {
		$(".footerbox").html(res)
	}
});


$.ajax({
	url:"json/cart-guessyou.json",
	success:function  (res) {
		for (var i=0;i<res.data.length;i++) {
			$(".goodsinfo").eq(i).find(".loadimg").attr("src",res.data[i].img);
			$(".goodsinfo").eq(i).find(".loadimg").attr("sid",res.data[i].sid);
			$(".goodsinfo").eq(i).find(".loadt").html(res.data[i].t);
			$(".goodsinfo").eq(i).find(".loadpcp").html(res.data[i].pcp);					
		}
		//加载购物车内的内容
		if ($.cookie("cartgoodsid")) {
			var s=$.cookie("cartgoodsid").split(",");
			var n=$.cookie("cartgoodnum").split(",")
			for (var i=0;i<s.length;i++) {
				addInCart( s[i],n[i] );
				
			}
		}
		
		
	}
})

$(".panel-main").on({
	mouseenter:function  () {
		$(".slider-page-btn").css("display","block");
	},
	mouseleave:function  () {
		$(".slider-page-btn").css("display","none");
	}
})

var c=0;//当前页面
var p=0;//之前页面
$(".left-btn").click(function  () {
	p=c;
	c--;
	if (c<0) {
		c=2;
	}
	changepage();
})

$(".right-btn").click(function  () {
	p=c;
	c++;
	if (c>2) {
		c=0;
	}
	changepage();
})

$(".goods-list-tab .s-item").mouseover(function  () {
	p=c;
	c=$(this).index();
	changepage();
});

function changepage () {
	$(".goods-list").eq(p).removeClass("goods-selected").fadeOut();
	$(".goods-list").eq(c).addClass("goods-selected").fadeIn();
	$(".goods-list-tab").find("a").eq(p).removeClass("tab-selected");
	$(".goods-list-tab").find("a").eq(c).addClass("tab-selected");
}

$(".tab-item")	.mouseenter(function  () {
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".mc").children().eq($(this).index()).fadeIn().siblings().fadeOut();
})
//减少商品数量按钮
$(".quantity-down").click(function  () {
	var a=parseInt($(this).next().val());
	a--;
	if ($(this).next().val()<=1) {
		return false;
//					$(this).attr("disabled",true)
	}
	$(this).next().val(a);
	$(this).parents(".b-quantity").siblings(".b-sum").children("strong").html(itemP($(this)));
	$(".header-price").find("b").html(shopP());
	totalP();
})
//增加商品数量按钮
$(".quantity-add").click(function  () {
	var a=parseInt($(this).prev().val());
	a++;
	$(this).prev().val(a);
	$(this).parents(".b-quantity").siblings(".b-sum").children("strong").html(itemP($(this)));
	$(".header-price").find("b").html(shopP());
	totalP();
})
//手动输入商品数量
$(".b-quantity input").change(function  () {
	$(this).parents(".b-quantity").siblings(".b-sum").children("strong").html(itemP($(this)));
	$(".header-price").find("b").html(shopP());
	totalP();
})


var sidArray=[];
var numArray=[];
$(".p-btn").click(function  () {
	//如果要加载的商品sid已经在数组中，该商品的数量+1，否则就将该商品加入到购物车中，并将该商品的sid加入到数组
	getgoodscookie ()
	var s=$(this).parent().find(".loadimg").attr("sid");
	if (isInArray(s,sidArray)) {
		$(".goods-item:visible").each(function  () {
			if (s==$(this).find(".goods-pic").find("img").attr("sid")) {
				var t=$(this).find(".b-quantity input").val();
				t++;
				$(this).find(".b-quantity input").val(t);
				numArray[sidArray.indexOf(s)]=t;
				$.cookie("cartgoodnum",numArray.toString(),{ expires: 7, path: '/' });
				var np=parseFloat($(this).find(".b-price strong").html()).toFixed(2);
				$(this).find(".b-sum strong").html( (t* np).toFixed(2));
				$(".header-price").find("b").html(shopP())
				totalP();
				selecNum();
			}
		})
	}else{
		sidArray.push($(this).parent().find(".loadimg").attr("sid"));
		$.cookie("cartgoodsid",sidArray.toString(),{ expires: 7, path: '/' });
		numArray.push(1);
		$.cookie("cartgoodnum",numArray.toString(),{ expires: 7, path: '/' });
		//addInCart($(this).parent(),1);
		addInCart($(this).parent().find(".loadimg").attr("sid"),1);
	}
})

//加入购物车
function addInCart (sid,n) {
//	var clone=$(".goods-item:hidden").clone(true);
//	clone.find(".quantity-form").children("input").val(n);
//	var price=parseFloat(obj.find(".loadpcp").html());
//	var num=parseFloat(clone.find(".quantity-form").children("input").val());
//	clone.find(".goods-d-info").children().html(obj.find(".loadt").html());
//	clone.find(".goods-pic").find("img").attr({
//		"src":obj.find(".loadimg").attr("src"),
//		"sid":obj.find(".loadimg").attr("sid")
//	});
//	clone.find(".prop-text").html("尺码：");
//	clone.find(".b-price").children("strong").html(price.toFixed(2));
//	clone.find(".b-sum").children("strong").html((price*num).toFixed(2));
//	clone.css("display","block");
//	clone.insertAfter(".item-head");
	$.ajax({
		type:"get",
		url:"json/cart-guessyou.json",
		success:function  (res) {
			for (var i=0;i<res.data.length;i++) {
				if (sid==res.data[i].sid) {
					var clone=$(".goods-item:hidden").clone(true);
					clone.find(".quantity-form").children("input").val(n);
					var price=parseFloat(res.data[i].pcp);
					var num=parseFloat(clone.find(".quantity-form").children("input").val());
					clone.find(".goods-d-info").children().html(res.data[i].t);
					clone.find(".goods-pic").find("img").attr({
						"src":res.data[i].img,
						"sid":res.data[i].sid
					});
					clone.find(".prop-text").html("尺码：");
					clone.find(".b-price").children("strong").html(price.toFixed(2));
					clone.find(".b-sum").children("strong").html((price*num).toFixed(2));
					clone.css("display","block");
					clone.insertAfter(".item-head");
					
					checkCartStatus ();
					$(".header-price").find("b").html(shopP())
					totalP();
					selecNum();
				}
			}
		}
	});
	
	
	
	
	
	
}
//商品小计
function itemP (obj) {
	var price=parseFloat(obj.parents(".b-quantity").siblings(".b-price").find("strong").html());
	var num=parseFloat(obj.parent().children("input").val());
	return (price*num).toFixed(2);
}
//该店铺下的价格总计
function shopP () {
	var sum=0;
	$(".goods-item:visible").each(function  () {
		if ($(this).find(".cart-checkbox").children("input").is(":checked")) {
			sum+=parseFloat($(this).find(".b-sum").children("strong").html());
		}
	})
	return sum.toFixed(2);
}

//总计
function totalP () {
	var sum=0;
	$(".header-price").each(function(){
		//if ($(this).find(".cart-checkbox").children("input").is(":checked")) {
			sum+=parseFloat($(this).children("b").html());
		//}
	})
	$(".totalprice").html("￥"+sum.toFixed(2));
}

//统计选中的商品数量
function selecNum () {
	$(".number").html($(".goods-item:visible input:checked").length);
	$(".amount-sum").find("em"	).html($(".goods-item:visible input:checked").length);
}

$(".goods-item").find(".cart-checkbox").children("input").change(function  () {
	selecNum ();
	$(".header-price").find("b").html(shopP())
	totalP();
	if ( ! $(this).is(":checked")) {
		$(this).parents(".goods-item").removeClass("goods-item-sele");
	}else{
		$(this).parents(".goods-item").addClass("goods-item-sele");
	}
})

//更改全选状态
$(".allsel").change(function(){
	if ($(this).is(":checked")) {
		$(":checkbox").prop("checked",true);
		$(".goods-item").addClass("goods-item-sele");
	}else{
		$(":checkbox").prop("checked",false);
		$(".goods-item").removeClass("goods-item-sele");
	}
	selecNum ();
	$(".header-price").find("b").html(shopP());
	totalP();
})


//删除单个
$(".b-action a:first-child").click(function(){
	
	getgoodscookie ()
	removeFromArray($(this).parents(".goods-item").find(".goods-pic").find("img").attr("sid"),sidArray);
	$(this).parents(".goods-item").remove();
	selecNum ();
	$(".header-price").find("b").html(shopP());
	totalP();
	checkCartStatus ();
	
	
})

//删除选中
$(".operation a:first-child	").click(function(){
	
	getgoodscookie ()
	$(".goods-item:visible").each(function  () {
		if ($(this).find(":checkbox").is(":checked")) {
			$(this).remove();
			removeFromArray($(this).find(".goods-pic").find("img").attr("sid"),sidArray)
		}
	})
	selecNum ();
	$(".header-price").find("b").html(shopP());
	totalP();
	checkCartStatus ()
})

function isInArray (n,a) {
	for (var i=0;i<a.length;i++) {
		if (n==a[i]) {
			return true;
		}
	}
	return false;
}

function removeFromArray (n,a) {
	var arr=[];
	for (var i=0;i<a.length;i++) {
		if (n != a[i]) {
			arr.push(a[i]);
		}
	}
//	console.log(n);
//	console.log(a);
	sidArray=arr;
	numArray.splice(a.indexOf(n),1);
	$.cookie("cartgoodsid",sidArray.toString(),{ expires: 7, path: '/' });
	$.cookie("cartgoodnum",numArray.toString(),{ expires: 7, path: '/' });
}

//查看购物车内是否有商品
function checkCartStatus () {
	if ($.cookie("cartgoodsid")) {
		$(".empty-cart").css("display","none");
		$(".cart-top").css("display","block");
		$(".cart-wrap").css("display","block");
	}else{
		$(".empty-cart").css("display","block");
		$(".cart-top").css("display","none");
		$(".cart-wrap").css("display","none");
	}
}

//商品数量改变时修改cookie

$(".quantity-down,.quantity-add").click(function  () {
	//console.log($(this).siblings("input").val());
	
	getgoodscookie ()
	var index=sidArray.indexOf($(this).parents(".goods-info").find(".goods-pic").find("img").attr("sid"));
	
	numArray[index]=$(this).siblings("input").val();
	$.cookie("cartgoodnum",numArray.toString(),{ expires: 7, path: '/' });
})

function getgoodscookie () {
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
}