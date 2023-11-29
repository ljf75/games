var JS13KGlitch=function(){return this instanceof JS13KGlitch?(this.global={overlay:document.getElementById("olay"),introTxt:document.getElementById("intro-txt"),startTxt:document.getElementById("start"),playing:!1,jumping:!1,goingUp:!0,isInShadow:!1,primaryPlayerColor:"#303f9f",primaryObstacleColor:"#ff0000",shadowPlayerColor:"#dedede",shadowObstacleColor:"#dedede",hitObstacleColor:"#ff0000",health:1e3,maxHealth:1e3,counter:1,obstacles:[],pause:!1,playerHeight:20,shadowSpeedMultiple:1},this.canvasElement=document.getElementById("js13kCanvas"),this.canvasElement.width=window.innerWidth,this.canvasElement.height=window.innerHeight,this.canvasHeight=this.canvasElement.offsetHeight,this.canvasContext=this.canvasElement.getContext("2d"),this.canvasWidth=this.canvasElement.offsetWidth,this.playerPosition={x:this.canvasElement.offsetWidth/2,y:this.canvasElement.offsetHeight/2},this.debug=document.getElementById("debug"),void this.addKeyDownEvents()):new JS13KGlitch};JS13KGlitch.prototype.addKeyDownEvents=function(){var a=this;document.addEventListener("keydown",function(b){var c=document.getElementById("container");switch(b=b||window.event,b.keyCode){case 13:document.mozFullScreen||document.webkitFullScreen?document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen():c&&c.mozRequestFullScreen?c.mozRequestFullScreen():c.webkitRequestFullScreen();break;case 38:a.global.jumping||(console.log("Jumped up.."),a.global.something=!0,a.global.jumping=!0,a.global.goingUp=!0);break;case 32:a.global.isInShadow=!a.global.isInShadow,a.global.isInShadow&&(a.global.shadowSpeedMultiple=Math.floor(8*Math.random())+2);break;case 88:a.global.pause=!a.global.pause}},!1)},JS13KGlitch.prototype.drawMap=function(){var a=this.canvasContext;a.beginPath(),a.rect(0,0,this.canvasWidth,this.canvasHeight/2),a.fillStyle="#ffffff",a.fill(),a.moveTo(0,this.canvasHeight/2),a.lineTo(this.canvasWidth,this.canvasHeight/2),a.stroke(),a.beginPath(),a.rect(0,this.canvasHeight/2,this.canvasWidth,this.canvasWidth/2),a.fillStyle="#000000",a.fill()},JS13KGlitch.prototype.handleJumps=function(){this.global.jumping&&(this.global.goingUp&&(this.playerPosition.y+this.global.playerHeight>this.canvasHeight/2-200?this.playerPosition.y=this.playerPosition.y-5:this.global.goingUp=!1),this.global.goingUp||(this.playerPosition.y+this.global.playerHeight<=this.canvasHeight/2?this.playerPosition.y=this.playerPosition.y+5:this.global.jumping=!1))},JS13KGlitch.prototype.getShadowY=function(a){return a+2*(this.canvasHeight/2-a)},JS13KGlitch.prototype.drawPlayer=function(){var a=this.canvasContext;a.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.drawMap(),a.beginPath(),a.strokeStyle="#ffffff",a.arc(this.playerPosition.x,this.playerPosition.y-this.global.playerHeight,20,20,0,2*Math.PI,!0),a.arc(this.playerPosition.x,this.playerPosition.y-this.global.playerHeight-20,10,20,0,2*Math.PI,!0),a.fillStyle=this.global.isInShadow?this.global.shadowPlayerColor:this.global.primaryPlayerColor,a.fill(),a.stroke(),a.beginPath(),a.arc(this.playerPosition.x,this.getShadowY(this.playerPosition.y-this.global.playerHeight),20,20,0,2*Math.PI,!0),a.arc(this.playerPosition.x,this.getShadowY(this.playerPosition.y-this.global.playerHeight-20),10,20,0,2*Math.PI,!0),a.fillStyle=this.global.isInShadow?this.global.primaryPlayerColor:this.global.shadowPlayerColor,a.fill(),a.stroke(),a.strokeStyle="#000000"},JS13KGlitch.prototype.createObstacle=function(){var a,b=this.global.isInShadow?26:42;this.global.counter%b===0&&(a=Math.floor(4*Math.random()),this.global.obstacles.push({x:this.canvasWidth+1,y:this.canvasHeight/4+this.canvasHeight/16*a}),this.global.isInShadow&&this.global.shadowSpeedMultiple<10&&(this.global.shadowSpeedMultiple=this.global.shadowSpeedMultiple+1))},JS13KGlitch.prototype.drawObstacle=function(){var a,e,b=this.canvasContext,c=this.global.obstacles.length,d=this.global.obstacles;for(this.createObstacle(),a=0;a<c;a++)if(e=null,d[a].x<0)d.splice(a,1),c=d.length;else{var f=d[a].x-this.playerPosition.x,g=d[a].y+20-(this.playerPosition.y-this.global.playerHeight),h=Math.sqrt(f*f+g*g);h<=20&&(e="shadow",this.global.health=this.global.health-30),b.beginPath(),b.strokeStyle="#ffffff",b.arc(d[a].x,d[a].y+20,15,0,2*Math.PI),b.fillStyle=this.global.isInShadow?this.global.shadowObstacleColor:this.global.primaryObstacleColor,b.fill(),b.stroke(),b.beginPath(),b.arc(d[a].x,this.getShadowY(d[a].y+20),15,0,2*Math.PI),"shadow"===e?b.fillStyle=this.global.hitObstacleColor:b.fillStyle=this.global.isInShadow?this.global.primaryObstacleColor:this.global.shadowObstacleColor,b.fill(),b.stroke(),b.strokeStyle="#000000",d[a].x=d[a].x-(this.global.isInShadow?2*this.global.shadowSpeedMultiple:8)}},JS13KGlitch.prototype.drawHealth=function(){var a=this.canvasContext;a.beginPath(),a.rect(10,10,this.canvasWidth/5,this.canvasHeight/30),a.strokeStyle="#000",a.stroke(),this.global.health>0&&this.global.health<=this.global.maxHealth&&(this.global.counter%2381091&&(this.global.isInShadow?this.global.health=this.global.health+.1:this.global.health=this.global.health-.5),a.beginPath(),a.rect(10,10,this.canvasWidth/5*(this.global.health/this.global.maxHealth),this.canvasHeight/30),a.fillStyle="red",a.fill(),a.stroke())},JS13KGlitch.prototype.startGame=function(){js13K.global.playing=!0,js13K.global.health=js13K.global.maxHealth,js13K.global.overlay.style.display="none",setInterval(function(){js13K.global.pause||(js13K.global.health<5?(js13K.global.introTxt.innerHTML="Too bad !! You're Roasted!",js13K.global.startTxt.innerHTML="Restart",js13K.global.overlay.style.display="block"):(js13K.handleJumps(),js13K.drawPlayer(),js13K.drawObstacle(),js13K.drawHealth(),js13K.global.counter++))},35)};var js13K=new JS13KGlitch;document.getElementById("start").addEventListener("click",js13K.startGame);