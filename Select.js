/*
*   name:Select plug
*   description:模拟下拉列表
*   param(infoEl):列表元素
*   param(scrollEl):滑动元素
*   param(buttonEl):滑动按钮元素
*   用到dom属性有：scrollHeight(dom全文高度),clientHeight(dom可见区域高度)
*   滑动按钮初始高度计算公式：（列表可视高度 * 滑动盒子高度）/ 列表内容全文高度
*   列表和滑动条对应计算公式： 列表卷入高度 / 列表可视高度 = 滑动盒子top值 / 列表内容全文高度
*/
    function Select(infoEl,scrollEl,buttonEl){
        this.infoEl = infoEl || null;
        this.scrollEl = scrollEl || null;
        this.buttonEl = buttonEl || null;
        this.infoElAllHeight = this.infoEl.scrollHeight;
        this.infoElHeight = this.infoEl.clientHeight;
        this.scrollElHeight = this.scrollEl.clientHeight;
        this.buttonElHeight = this.buttonEl.clientHeight;
        this.init();
    }
    Select.prototype = {
        init:function(){
            // 设置滑动按钮初始高度
            this.buttonElHeight = (this.infoElHeight*this.scrollElHeight)/this.infoElAllHeight
            this.buttonEl.style.height = this.buttonElHeight + 'px';
            // 影藏浏览器自带滑动条
            this.infoEl.style.marginRight = -(this.infoEl.offsetWidth - this.infoEl.clientWidth) + 'px'
            this.bindEventToDom();
        },
        bindEventToDom(){
            var parent = this
            // 给列表绑定滑动事件
            this.infoEl.addEventListener('scroll',function(e){
                var scrollTop = this.scrollTop;
                parent.buttonEl.style.top = (scrollTop*parent.scrollElHeight)/parent.infoElAllHeight + 'px';
            })
            // 给滑动盒子绑定点击事件
            this.scrollEl.onclick = function(e){
                e = e || event
                var top = e.clientY - parent.buttonElHeight/2
                var spanTop=0;
                if(e.clientY > (parent.scrollElHeight-parent.buttonElHeight)){
                    spanTop = (parent.scrollElHeight-parent.buttonElHeight)
                }else if(top>0){
                    spanTop = top
                }else{
                    spanTop = 0
                }
                parent.buttonEl.style.top = spanTop + 'px';
                parent.infoEl.scrollTop = (spanTop*parent.infoElAllHeight)/parent.scrollElHeight;
            }
            // 给滑动按钮绑定事件
            this.buttonEl.onmousedown = function(e){
                e = e || event
                e.preventDefault()
                var startY = e.clientY
                var startTop = this.offsetTop
                var canMoveHeight = parent.scrollElHeight - parent.buttonElHeight
                var _this = this
                document.onmousemove = function(ev){
                    ev = ev || event
                    var endY = ev.clientY
                    var move = startY-endY   // 滑动方向(向上(+)或向下(-))
                    var endTop = 0
                    if((startTop - move) >= canMoveHeight){
                        endTop = canMoveHeight
                    }else if((startTop - move)<=0){
                        endTop = 0
                    }else{
                        endTop = (startTop - move)
                    }
                    _this.style.top = endTop + 'px'
                    parent.infoEl.scrollTop = (endTop*parent.infoElAllHeight)/parent.scrollElHeight
                }
                document.onmouseup = function(){
                    this.onmousemove=null;
                    this.onmouseup=null;
                    document.getElementsByTagName('body')[0].onselectstart=function(){
                        return true;
                    };
                }
                document.getElementsByTagName('body')[0].onselectstart=function(){
                          return false;
                }
            }
        }
    }
