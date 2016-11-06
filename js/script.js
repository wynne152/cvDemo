window.onload=function(){
	function move(){
        timer = setInterval(function(){
            oUl.style.top = oUl.offsetTop + speed + 'px';
            if(oUl.offsetTop <= - oUl.offsetHeight / 2){
                oUl.style.top = '0';
            }else if(oUl.offsetTop >= 0){
                oUl.style.top = - oUl.offsetHeight / 2 + 'px';
            };
        },30);
    };
    /*id，类，标签选择器*/
    function element(){
        var elements,items,name,names;
        items=[];
        for(var i=0;i<arguments.length;i++){  
            name=arguments[i];
            if(typeof name=='string'){  //判断是否是字符串
            	names=name.split(' ');	//分解出所有的选择器
				for(var i=0;i<names.length;i++){
					elements=[];
					if(i==0){
						if(/[.]/.test(names[i])){	//选择类
							for(var ii=0;ii<document.all.length;ii++){
								if(document.all[ii].className.indexOf(names[i].slice(1))>-1){
									elements.push(document.all[ii]);	
								}
							}
						}else if(/[#]/.test(names[i])){
							elements.push(document.getElementById(names[i].slice(1)));
						}else{
							elements=document.getElementsByTagName(names[i]);
						}	
					}else{
						for(var j=0;j<items[i-1].length;j++){
							var item=items[i-1][j].childNodes;
							if(item){
								if(/[#]/.test(names[i])){
									for (var m=0;m<item.length;m++) {
										if(item[m].id==names[i].slice(1))
											elements.push(item[m]);
									}
								}else if(/[.]/.test(names[i])){
									for (var m=0;m<item.length;m++) {
										if(item[m].className.indexOf(names[i].slice(1))>-1)
											elements.push(item[m]);
										}
									}else{
										elements=items[i-1][j].getElementsByTagName(names[i]);
								}
							}	
						}
					}
					items.push(elements);
				}
        	}  
       }
       return items[items.length-1].length==1?items[items.length-1][0]:items[items.length-1];
    } 
    
    var showNav=element("#showNav"),
    hideNav=element("#hideNav"),
    nav_ul=element("#nav"),
    open=element("#open"),
    cover=element(".cover");
    
    showNav.onclick=function(){
		showNav.style.display="none";
		hideNav.style.display="block";
		nav_ul.style.display="block";
    }
    
    hideNav.onclick=function(){
		hideNav.style.display="none";
		showNav.style.display="block";
		nav_ul.style.display="none";
    }
    
   	window.onresize=function(){
   		if(document.documentElement.clientWidth>650){
    		nav_ul.style.display="block";
    	}else{
    		nav_ul.style.display="none";
    	}
   	}
   	
   	for(var i=0;i<element(".open").length;i++){
   		element(".open")[i].index=i;
	   	element(".open")[i].onclick=function(){
	   		var n=this.index;
   			element(".pages")[n].style.zIndex=10+n*2;	//有卡顿,翻页后消失，鼠标滚动后会出现
   			element(".pages")[n].className+=" coverBook";/*书翻页*/
   			element(".open")[n].className+=" text_hide";/*按钮上的文字*/
			element(".triangle")[n].className+=" triangle_anime";/*三角变色*/
			element(".page_text")[n].className+=" text_hide";/*书页上的字*/
			if(n==1){element(".sign").style.opacity=0;}
	   	}
	}
	
}