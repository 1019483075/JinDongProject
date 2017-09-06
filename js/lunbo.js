(function  (parent,picwidth) {
	
	var pageNum=4;     //要展示的图片的张数
	var showtime=3000; //切换图片后停留的时间
	var changetime=500; //切换图片的时间
	var picwidth=picwidth; //图片的宽度
	var page=0; //图片索引
	var flag=true; //控制开关
	function changePage () {
		page++;
		
		if (page>pageNum) {
			page=1;
		}
		if (page==pageNum) {
			parent.find(".pagelist").find("li").first().addClass("pagelistactive").siblings().removeClass();
		}
		move();
	}
	var time=setInterval(changePage,showtime);
	
	function move () {			
		
		parent.find(".pagelist").find("li").eq(page).addClass("pagelistactive").siblings().removeClass();
		parent.find(".main .slider-main").stop().animate({
			"left":-picwidth*(page+1)
		},changetime,function  () {
			flag=true;		
			if (parent.find(".main .slider-main").css("left")==-(pageNum+1)*picwidth+"px") {
				parent.find(".main .slider-main").css("left",-picwidth+"px")
				page=0;
			}
			if (parent.find(".main .slider-main").css("left")==("0px")) {
				parent.find(".main .slider-main").css("left",-pageNum*picwidth+"px")
				page=pageNum-1;
			}
		})
	}
	
	parent.find(".slider").mouseenter(function  () {
		
		clearInterval(time);
		parent.find(".main .slider .slider-page-btn").css("display","block");
	})
	
	parent.find(".slider").mouseleave(function  () {
		time =setInterval(changePage,showtime);
		parent.find(".main .slider .slider-page-btn").css("display","none");
		
	})
	
	parent.find(".pagelist").find("li").click(function  () {
		if (flag) {
			page=$(this).index();
			move()
		}
		flag=false;
	})
	
	parent.find(".main .left-btn").click(function  () {
		if (flag) {
			page--;
			
			if (page<=-1) {
				parent.find(".pagelist").find("li").last().addClass("pagelistactive").siblings().removeClass();
			}
			move()
		}
		flag=false;
	})
	parent.find(".main .right-btn").click(function  () {
		if (flag) {
			changePage()
		}
		flag=false;
	})
})(parent,picwidth)