var b,gar,keys={};function sB(t){b=new p(gar.canvas.width,gar.canvas.height,t,0,0)}function tl(t,i,s,h,e,n,a,r){for(this.y=i,this.k=0,this.eN=n,this.i,this.j,this.l,this.i=0;this.i<22;this.i++)for(this.j=0;this.j<30;this.j++)for(this.l=0;this.l<this.eN;this.l++)h[30*this.i+this.j]==this.l+1&&(s[this.k]=new p(e[5*this.l+1],e[5*this.l+2],e[5*this.l],t+this.j*a+e[5*this.l+3],i+this.i*r+e[5*this.l+4],"img"),s[this.k].value=this.l+1,this.k=this.k+1);this.redo=function(t,i,h){for(this.n=0,this.y=i,this.i=0;this.i<22;this.i++)for(this.j=0;this.j<30;this.j++)for(this.l=0;this.l<this.eN;this.l++)h[30*this.i+this.j]==this.l+1&&(this.n<this.k?(s[this.n].width=e[5*this.l+1],s[this.n].height=e[5*this.l+2],s[this.n].image.src=e[5*this.l],s[this.n].x=t+this.j*a+e[5*this.l+3],s[this.n].y=i+this.i*r+e[5*this.l+4]):s[this.n]=new p(e[5*this.l+1],e[5*this.l+2],e[5*this.l],t+this.j*a+e[5*this.l+3],i+this.i*r+e[5*this.l+4],"img"),s[this.n].value=this.l+1,this.n=this.n+1);this.k=this.n}}function p(t,i,h,s,e,n,a,r){this.value=0,this.type=n,this.nextFrame=1,this.image=new Image,"img"!=n&&"an-s"!=n||(this.image.src=h),"an"==n&&(this.image.src=h+this.nextFrame+".png"),this.width=t,this.height=i,this.x=s,this.y=e,this.sX=0,this.sY=0,this.anFrame=0,this.animation=h,this.uCheck=0,"an"!=n&&"an-s"!=n||(this.ans=r,this.frameNo=a),this.changeAnimation=function(t,i,h){this.type="an",this.animation=t,this.frameNo=i,this.ans=h,this.anFrame=0,this.nextFrame=1},this.u=function(){ctx=gar.context,"text"==this.type?(ctx.font=this.width+" "+this.height,ctx.fillStyle=h,ctx.fillText(this.text,this.x,this.y)):"img"==this.type?ctx.drawImage(this.image,this.x,this.y,this.width,this.height):"an-s"==this.type?(this.anFrame<this.ans?this.anFrame=this.anFrame+1:this.anFrame=0,this.nextFrame==this.frameNo&&(this.nextFrame=0),this.anFrame==this.ans/this.frameNo*this.nextFrame?(ctx.drawImage(this.image,this.nextFrame*(this.width/this.frameNo),0,this.width/this.frameNo,this.height,this.x,this.y,this.width/this.frameNo,this.height),this.nextFrame=this.nextFrame+1):ctx.drawImage(this.image,this.nextFrame*(this.width/this.frameNo),0,this.width/this.frameNo,this.height,this.x,this.y,this.width/this.frameNo,this.height)):(ctx.fillStyle=h,ctx.fillRect(this.x,this.y,this.width,this.height))},this.P=function(){this.y=this.y+this.sY,this.x=this.x+this.sX},this.follow=function(t,i,h){this.x=t.x+i,this.y=t.y+h}}function co(t,i,h){return t.value==h&&(t.x+t.width>=i.x&&t.x+t.width<=i.x+i.width&&t.y>=i.y&&t.y<=i.y+i.height||(t.x>=i.x&&t.x<=i.x+i.width&&t.y>=i.y&&t.y<=i.y+i.height||(t.x+t.width>=i.x&&t.x+t.width<=i.x+i.width&&t.y+t.heigh>=i.y&&t.y+t.height<=i.y+i.height||t.x>=i.x&&t.x<=i.x+i.width&&t.y+t.height>=i.y&&t.y+t.height<=i.y+i.height)))}gar={canvas:canvas=document.createElement("canvas"),start:function(t,i,h){this.fps=h,this.canvas.width=t,this.canvas.height=i,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.interval=setInterval(u,1e3/h),onkeydown=onkeyup=function(t){t=t||event,keys[t.keyCode]="keydown"==t.type}},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},stop:function(){clearInterval(this.interval)}};