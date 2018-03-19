/**
 *  圆形运动动画
 *  x,y圆形圆心坐标 (单位px)
 *  radius 圆形半径(单位px)
 *  speed 运动速度(单位deg/13ms)
 */
 'use stract'

  class CricleAmimation {
      constructor(x,y,radius,speed) {
          this.x = x || 0;
          this.y = y || 0;
          this.radius = radius || 0;
          this.speed = speed || 1;
      }
      initial(dom,coordinate,outWidth){
          this.run(dom,this.getCount(coordinate),outWidth);
          return this;
      }
      run(dom,count,outWidth){
          let _this = this
          return new Promise(function(resolve, reject) {
              setTimeout(function(){
                  if(count>(360/_this.speed)){
                      count = 1
                  }
                  let radian = (2*Math.PI / 360) * _this.speed * count;
                  let X = parseInt(_this.x + Math.sin(radian) * _this.radius) - outWidth
                  let Y = parseInt(_this.y - Math.cos(radian) * _this.radius) - outWidth
                  count++;
                  dom.style.left = X+'px';
                  dom.style.top = Y+'px';
                  _this.run(dom,count,outWidth)
              },13)
          });
      }
      then(callback){
          return callback()
      }
      getCount(coordinate){
          var x = coordinate.x;
          var y = coordinate.y;
          if(x === 0 && y > 0){
              return 0
          }else if(x > 0 && y > 0){
              return parseInt((Math.asin(x/this.radius)*180/Math.PI)/this.speed)
          }else if(x > 0 && y === 0){
              return parseInt(90/this.speed)
          }else if (x > 0 && y < 0 ) {
              return parseInt((Math.asin(Math.abs(y)/this.radius)*180/Math.PI + 90)/this.speed)
          }else if (x === 0 && y < 0){
              return parseInt(180/this.speed)
          }else if(x < 0 && y < 0){
              return parseInt((Math.asin(Math.abs(y)/this.radius)*180/Math.PI + 180)/this.speed)
          }else if(x < 0 && y === 0){
              return parseInt(270/this.speed)
          }else if(x < 0 && y > 0){
              return parseInt((Math.asin(y/this.radius)*180/Math.PI + 270)/this.speed)
          }
      }
  }
