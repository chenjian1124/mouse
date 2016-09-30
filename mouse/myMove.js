function move(dom, attrObj, fn){
	clearInterval(dom.timer);
	dom.timer = setInterval(function (){
		// 姑且认为所有的属性都已经到达终点
		var isOk = true;
		for(var attr in attrObj){
			if(attr == "opacity"){
				var current = parseInt(parseFloat(getStyle(dom, attr))*100);
			} else {
				var current = parseInt(getStyle(dom, attr));
			}
			
			var speed = (attrObj[attr] - current) / 4;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			
			// 检测是否有任何一个属性还没有达到终点
			if(current != attrObj[attr]){
				isOk = false;
			}
			
			
			if(attr == "opacity"){
				dom.style.opacity = (current + speed)/ 100;
				dom.style.filter = "alpha(opacity=" + (current + speed) + ")";
			} else {
				dom.style[attr] = current + speed + "px";
			}
		
		}
		if(isOk){
			clearInterval(dom.timer);
			// 链式运动回调函数的调用时机（上次运动结束的时候）
			if(fn){
				fn();
			}
			return;
		}
	}, 5);
}


// 用这个兼容性函数来获取dom的当前样式属性值
function getStyle(dom, property){
	if(dom.currentStyle){
		return dom.currentStyle[property];
	} else {
		return window.getComputedStyle(dom)[property];
	}
}