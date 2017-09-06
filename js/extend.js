//			选框选择/取消 方法
jQuery.fn.extend({
  check: function() {
    return this.each(function() { this.checked = true; });
  },
  uncheck: function() {
    return this.each(function() { this.checked = false; });
  }
});
$("input[type=checkbox]").check();

jQuery.fn.extend({
	tab:function(selector,eType){
		var eType = eType||"click";
		if(eType=="click"){
			$(this).click(function(){
				$(selector).eq($(this).index()).css("display","block").siblings(selector).css("display","");
			})
		}else if(eType=="mouseover"){
			$(this).mouseover(function(){
				$(selector).eq($(this).index()).css("display","block").siblings(selector).css("display","");
			})
		}
	}
})

//			jQuery 封装tab切换
jQuery.fn.extend({
	tab:function(selector,eType){
		var eType = eType||"click";
		$(this).on(eType,function(){
			$(selector).eq($(this).index()).css("display","block").siblings(selector).css("display","");
		})
	}
})

jQuery.extend({
  min: function(a, b) { return a < b ? a : b; },
  max: function(a, b) { return a > b ? a : b; }
});

//			随机数方法
jQuery.extend({
	ranNum:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
})

//			拖拽方法
jQuery.fn.extend({
	drag:function(parentEle){
		var parentEle = parentEle||document;
		$(parentEle).css("position","relative");
		$(this).css("position","absolute").mousedown(function(e){
			var $that = $(this);
			var e = e||window.event;
			var oX = e.pageX - $(this).offset().left;
			var oY = e.pageY - $(this).offset().top;
			$(document).on("mousemove",function(e){
				var e = e||window.event;
				if(parentEle!=document){
					var oLeft = e.pageX - oX - $(parentEle).offset().left;
					var oTop = e.pageY - oY - $(parentEle).offset().top;
					if(oLeft<=0){
						oLeft = 0;
					}else if(oLeft>=$(parentEle).width()-$that.width()){
						oLeft = $(parentEle).width()-$that.width()
					}
					if(oTop<=0){
						oTop = 0;
					}else if(oTop>=$(parentEle).height()-$that.height()){
						oTop = $(parentEle).height()-$that.height();
					}
					$that.css({
						"left":oLeft +"px",
						"top":oTop + "px"
					})
				}else{
					$that.css({
						"left":e.pageX - oX +"px",
						"top":e.pageY - oY + "px"
					})
				}
				
			})
			$(document).on("mouseup",function(){
				$(this).off("mousemove");
			})
		})
	}
})
