/**
*
*/

    function Pagination(el,total,pageSize,fn){
        this.el = el || document.body;
        this.total = total || 0;
        this.pageSize = pageSize || 10;
        this.fn = fn || function(){};
        this.page = Math.ceil(this.total/this.pageSize); // 总页数
        this.current = 0;                                // 当前页码
        this.paginationSize = 12;                        // 每页显示多少页
        this.init();
    }

    Pagination.prototype = {
        init(){
            this.getNum('go',0);
            this.render();
        },
        data:{
            pre: '<',
            list:[],
            next: '>'
        },
        getNum(type,current){
            var num = 0;
            this.data.list = [];

            if(type == 'go'){
                var last = this.page - current
                if(last >= this.paginationSize){
                    num = this.paginationSize;
                }else if(last > 0 && last < this.paginationSize){
                    num = last
                }
                while (num--) {
                    this.data.list.unshift(parseInt(current) + num + 1)
                }
            }else if(type == 'back'){
                if(current>this.paginationSize){
                    num = this.paginationSize;
                }
                while (num--) {
                    this.data.list.push(parseInt(current) - num-1)
                }
            }
        },
        render(){
            var box = document.createElement("div");
            var ul = document.createElement("ul");
            var pre = document.createElement("span");
            var next = document.createElement("span");
            var _this = this;
            box.id="pagination-wrapper";
            ul.className ='pagination-ul';
            pre.className = 'pagination-pre';
            next.className = 'pagination-next';
            pre.innerHTML = this.data.pre;
            next.innerHTML = this.data.next;
            pre.onclick=function(){
                if(_this.current.previousSibling != null){
                    _this.current.className = '';
                    _this.current.previousSibling.className = 'pagination-active';
                    _this.current = _this.current.previousSibling;
                    _this.util.removeSiblingClassName(box,_this.current);
                    _this.fn(_this.current.getAttribute('data-num'));
                }else{
                    if(_this.current.getAttribute('data-num') > _this.paginationSize){
                        _this.getNum('back',_this.current.getAttribute('data-num'));
                        _this.renderList('back')
                    }
                }
            }
            next.onclick=function(){
                if(_this.current.nextSibling != null){
                    _this.current.className = '';
                    _this.current.nextSibling.className = 'pagination-active';
                    _this.current = _this.current.nextSibling;
                    _this.util.removeSiblingClassName(box,_this.current);
                    _this.fn(_this.current.getAttribute('data-num'));
                }else{
                    if((_this.page-_this.current.getAttribute('data-num'))>0){
                        _this.getNum('go',_this.current.getAttribute('data-num'));
                        _this.renderList('go')
                    }
                }
            }
            box.appendChild(pre);
            box.appendChild(ul);
            box.appendChild(next);
            this.el.appendChild(box);
            this.renderList('go');
        },
        renderList(type){
            var ul = document.getElementsByClassName('pagination-ul')[0];
            var _this = this;
            ul.innerHTML = '';
            for(var i = 0; i < this.data.list.length;i++){
                var li = document.createElement("li");
                li.innerHTML = this.data.list[i];
                li.setAttribute('data-num',this.data.list[i]);
                li.onclick=function(){
                    var page = this.getAttribute("data-num");
                    if(_this.current.getAttribute("data-num") != page){
                        _this.util.removeSiblingClassName(ul,this);
                        this.className = 'pagination-active';
                        _this.current = this;
                        _this.fn(page);
                    }
                }
                ul.appendChild(li)
            }
            if(type == 'go'){
                ul.firstChild.className = 'pagination-active';
                this.current = ul.firstChild
            }else if(type == 'back'){
                ul.lastChild.className = 'pagination-active';
                this.current = ul.lastChild
            }
        },
        util:{
            removeSiblingClassName(box,item){
                var li = box.getElementsByTagName('li');
                var num = item.getAttribute("data-num");
                for(var i = 0; i < li.length; i++){
                    if(li[i].getAttribute("data-num") != num){
                        li[i].className = "";
                    }
                }
            }
        }
    }
