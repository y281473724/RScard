// 浏览器加载函数
function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

// 根据ID名绑定单击响应函数
function myClick(idstr, fun){
    var btn = document.getElementById(idstr);
    btn.onclick = fun;
}

// 在指定元素中添加类
function addClass(element, value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}


var imgArr = [
    "images/picture1.jpg","images/picture2.jpg",
    "images/picture3.jpg","images/picture4.jpg",
    "images/picture5.jpg"
    ];
// 头像图片切换
function changePic(){
    var pic = document.getElementById("pic");
    var potraitPic = pic.getElementsByTagName("img")[0];
    index = 0;
    potraitPic.onclick = function(){
        if(index < imgArr.length-1){
            index++;
        }else{
            index = 0
        }
        potraitPic.src = imgArr[index];
    }
}

// 高亮显示鼠标指定区域
function highlightRows(){
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for(var i=0; i<rows.length; i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover =function(){
            addClass(this,"highlight");
        }
        rows[i].onmouseout=function(){
            this.className = this.oldClassName;
        }
    }
}

// 导航下标标记
function highlightSub(){

    // 导航条内容列表
    var nav = document.getElementsByTagName("nav");
    var links = nav[0].getElementsByTagName("li");

    // 窗口的文档显示区高度
    var winHeight = window.innerHeight;
    
    // 获取每个DIV块的高度
    var wrap = document.getElementsByClassName("wrapper");
    var divHeigth = [];
    for(var i=0;i<wrap.length;i++){
        divHeigth[i]=wrap[i].offsetHeight/2;
    }

    // 窗口滚动事件
    window.onscroll = function(){
        // 顶部导航条样式更新
        if(window.scrollY >0){
            topNavBar.classList.add('sticky');
        }else{
            topNavBar.classList.remove('sticky');
            }
        // *****************************************
        // 导航条下标和单元模块上升
        // 
        var divTop = [];
        for(var i=0;i<wrap.length;i++){
            divTop[i]=wrap[i].offsetTop;
        }

        // 网页被卷去的高度
        var scrTop = document.body.scrollTop || window.pageYOffset || document.body.scrollTop;

        // 第一个DIV块单独判断
        if((winHeight+scrTop)>divTop[0] && (scrTop)<(divHeigth[0]+divTop[0])){
            links[0].className = "active";
            wrap[0].classList.remove("offset");
        }else{
            links[0].className = "";
        }

        // 第二个及之后的DIV块 
        for(var i=1; i<wrap.length; i++){
            if((scrTop)>(divHeigth[i-1]+divTop[i-1]) && (scrTop)<(divHeigth[i]+divTop[i])){
                links[i].className = "active";
                wrap[i].classList.remove("offset");
            }else{
                links[i].className = "";
            }    
        }
    }
}


// 导航条下标鼠标事件
function headerSub(){
    var links = document.querySelectorAll("div.topNavBar .menu .clearfix li");
    for (var i=0;i<links.length;i++){
       
        links[i].onmouseover = function(){
            this.className = "highlight";
        }
        links[i].onmouseout = function(){
            this.className = "";
        }
    }
}


// 给每个单元DIV模块添加offset类
function wrapAddOffset(){
    var wrap = document.getElementsByClassName("wrapper");
    for(var i=0; i<wrap.length;i++){
        wrap[i].classList.add("offset");
        }
}
    

addLoadEvent(changePic);
addLoadEvent(wrapAddOffset);
addLoadEvent(highlightSub);
addLoadEvent(highlightRows);
addLoadEvent(headerSub);
