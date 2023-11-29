(function () {let da,qa,U={};function Ba(t,e){U[t]=U[t]||[],U[t].push(e)}function ra(t,...e){(U[t]||[]).map(t=>t(...e))}function ea(){return da}function _(){return qa}function Ca(t){if(!(da=document.getElementById(t)||t||document.querySelector("canvas")))throw Error("You must provide a canvas element for the game");return(qa=da.getContext("2d")).imageSmoothingEnabled=!1,ra("init"),{canvas:da,context:qa}}class aa{constructor({spriteSheet:t,frames:e,frameRate:r,loop:i=!0}){this.spriteSheet=t,this.frames=e,this.frameRate=r,this.loop=i;let{width:$,height:o,margin:s=0}=t.frame;this.width=$,this.height=o,this.margin=s,this._f=0,this._a=0}clone(){return new aa(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:e,width:r=this.width,height:i=this.height,context:$=_()}){let o=this.frames[this._f]/this.spriteSheet._f|0,s=this.frames[this._f]%this.spriteSheet._f|0;$.drawImage(this.spriteSheet.image,s*this.width+(2*s+1)*this.margin,o*this.height+(2*o+1)*this.margin,this.width,this.height,t,e,r,i)}}function fa(){return new aa(...arguments)}fa.prototype=aa.prototype,fa.class=aa;let a=new WeakMap;function Da(t,e){let r=Math.sin(e),i=Math.cos(e);return{x:t.x*i-t.y*r,y:t.x*r+t.y*i}}function F(t,e){return Math.floor(Math.random()*(e-t+1))+t}function Ea(t){for(var e=0,r=2166136261;e<t.length;e++)r=Math.imul(r^t.charCodeAt(e),16777619);r+=r<<13,r^=r>>>7,r+=r<<3,r^=r>>>17;let i=(r+=r<<5)>>>0,$=()=>(2**31-1&(i=Math.imul(48271,i)))/2**31;return $(),$}function sa(t,e,r){return Math.min(Math.max(t,r),e)}function Fa(t,e){return t.rotation||e.rotation?null:([t,e]=[t,e].map(t=>ga(t)),t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y)}function ga(t){let{x:e,y:r,width:i,height:$}=t.world||t;return t.anchor&&(e-=i*t.anchor.x,r-=$*t.anchor.y),i<0&&(e+=i,i*=-1),$<0&&(r+=$,$*=-1),{x:e,y:r,width:i,height:$}}class K{constructor(t=0,e=0,r={}){this.x=t,this.y=e,r._c&&(this.clamp(r._a,r._b,r._d,r._e),this.x=t,this.y=e)}add(t){return new K(this.x+t.x,this.y+t.y,this)}subtract(t){return new K(this.x-t.x,this.y-t.y,this)}scale(t){return new K(this.x*t,this.y*t)}normalize(t=this.length()){return new K(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}clamp(t,e,r,i){this._c=!0,this._a=t,this._b=e,this._d=r,this._e=i}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?sa(this._a,this._d,t):t}set y(t){this._y=this._c?sa(this._b,this._e,t):t}}function O(){return new K(...arguments)}O.prototype=K.prototype,O.class=K;class Ga{constructor(t){return this.init(t)}init(t={}){this.position=O(),this.velocity=O(),this.acceleration=O(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let r=this.velocity;t&&(r=r.scale(t)),this.position=this.position.add(r),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}const Q=()=>{},ta="position:absolute;left:-9999px";function ha(t,e){let r=e.parentNode;if(t.setAttribute("data-kontra",""),r){let i=r.querySelector("[data-kontra]:last-of-type")||e;r.insertBefore(t,i.nextSibling)}else document.body.appendChild(t)}class ia extends Ga{init({width:t=0,height:e=0,context:r=_(),render:i=this.draw,update:$=this.advance,children:o=[],anchor:s={x:0,y:0},sx:a=0,sy:n=0,opacity:h=1,rotation:w=0,scaleX:p=1,scaleY:l=1,...d}={}){this.children=[],super.init({width:t,height:e,context:r,anchor:s,sx:a,sy:n,opacity:h,rotation:w,scaleX:p,scaleY:l,...d}),this._di=!0,this._uw(),o.map(t=>this.addChild(t)),this._rf=i,this._uf=$}update(t){this._uf(t),this.children.map(t=>t.update&&t.update())}render(t){let e=this.context;e.save(),(this.x||this.y)&&e.translate(this.x,this.y),this.rotation&&e.rotate(this.rotation),(this.sx||this.sy)&&e.translate(-this.sx,-this.sy),1==this.scaleX&&1==this.scaleY||e.scale(this.scaleX,this.scaleY);let r=-this.width*this.anchor.x,i=-this.height*this.anchor.y;(r||i)&&e.translate(r,i),this.context.globalAlpha=this.opacity,this._rf(),(r||i)&&e.translate(-r,-i);let $=this.children;t&&($=$.filter(t)),$.map(t=>t.render&&t.render()),e.restore()}draw(){}_pc(t,e){this._uw(),this.children.map(t=>t._pc())}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:r=1,_wr:i=0,_wsx:$=1,_wsy:o=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=r*this.opacity,this._wr=i+this.rotation;let{x:s,y:a}=Da({x:this.x,y:this.y},i);this._wx=s,this._wy=a,this._wsx=$*this.scaleX,this._wsy=o*this.scaleY,this._wx=this.x*$,this._wy=this.y*o,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wx+=t,this._wy+=e}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}addChild(t,{absolute:e=!1}={}){this.children.push(t),t.parent=this,t._pc=t._pc||Q,t._pc()}removeChild(t){let e=this.children.indexOf(t);-1!==e&&(this.children.splice(e,1),t.parent=null,t._pc())}get opacity(){return this._opa}set opacity(t){this._opa=t,this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,e=t){this.scaleX=t,this.scaleY=e}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}function L(){return new ia(...arguments)}L.prototype=ia.prototype,L.class=ia;class ja extends L.class{init({image:t,width:e=t?t.width:void 0,height:r=t?t.height:void 0,...i}={}){super.init({image:t,width:e,height:r,...i})}get animations(){return this._a}set animations(t){let e,r;for(e in this._a={},t)this._a[e]=t[e].clone(),r=r||this._a[e];this.currentAnimation=r,this.width=this.width||r.width,this.height=this.height||r.height}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){super.advance(t),this.currentAnimation&&this.currentAnimation.update(t)}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height))}}function G(){return new ja(...arguments)}G.prototype=ja.prototype,G.class=ja;let Ha=/(\d+)(\w+)/;function Ia(t){let e=t.match(Ha),r=+e[1];return{size:r,unit:e[2],computed:r}}class ka extends L.class{init({text:t="",textAlign:e="",lineHeight:r=1,font:i=_().font,...$}={}){super.init({text:t,textAlign:e,lineHeight:r,font:i,...$}),this._p()}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=Ia(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context;if(t.font=this.font,!this._s.length&&this._fw){let e=this.text.split(" "),r=0,i=2;for(;i<=e.length;i++){let $=e.slice(r,i).join(" ");t.measureText($).width>this._fw&&(this._s.push(e.slice(r,i-1).join(" ")),r=i-1)}this._s.push(e.slice(r,i).join(" "))}if(!this._s.length&&this.text.includes("\n")){let e=0;this.text.split("\n").map(r=>{this._s.push(r),e=Math.max(e,t.measureText(r).width)}),this._w=this._fw||e}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,e=this.textAlign,r=this.context;e=this.textAlign||("rtl"===r.canvas.dir?"right":"left"),t="right"===e?this.width:"center"===e?this.width/2|0:0,this._s.map((i,$)=>{r.textBaseline="top",r.textAlign=e,r.fillStyle=this.color,r.font=this.font,r.fillText(i,t,this._fs*this.lineHeight*$)})}}function E(){return new ka(...arguments)}E.prototype=ka.prototype,E.class=ka;let S=new WeakMap,N={},ua={0:"left",1:"middle",2:"right"};function Ja(t,e){let{x:r,y:i,width:$,height:o}=ga(t);do{r-=t.sx||0,i-=t.sy||0}while(t=t.parent);let s=e.x-Math.max(r,Math.min(e.x,r+$)),a=e.y-Math.max(i,Math.min(e.y,i+o));return s*s+a*a<e.radius*e.radius}function va(t){let e=t._lf.length?t._lf:t._cf;for(let r=e.length-1;r>=0;r--){let i=e[r];if(i.collidesWithPointer?i.collidesWithPointer(t):Ja(i,t))return i}}function D(t,e){return parseFloat(t.getPropertyValue(e))||0}function Ka(t){let{canvas:e,_s:r}=t,i=e.getBoundingClientRect(),$="none"!==r.transform?r.transform.replace("matrix(","").split(","):[1,1,1,1],o=parseFloat($[0]),s=parseFloat($[3]),a=(D(r,"border-left-width")+D(r,"border-right-width"))*o,n=(D(r,"border-top-width")+D(r,"border-bottom-width"))*s,h=(D(r,"padding-left")+D(r,"padding-right"))*o,w=(D(r,"padding-top")+D(r,"padding-bottom"))*s;return{scaleX:(i.width-a-h)/e.width,scaleY:(i.height-n-w)/e.height,offsetX:i.left+(D(r,"border-left-width")+D(r,"padding-left"))*o,offsetY:i.top+(D(r,"border-top-width")+D(r,"padding-top"))*s}}function wa(t){let e=void 0!==t.button?ua[t.button]:"left";ma(t,"onDown")}function la(t){let e=void 0!==t.button?ua[t.button]:"left";ma(t,"onUp")}function xa(t){ma(t,"onOver")}function La(t){S.get(t.target)._oo=null}function ma(t,e){t.preventDefault();let r=t.target,i=S.get(r),{scaleX:$,scaleY:o,offsetX:s,offsetY:a}=Ka(i);if(-1!==["touchstart","touchmove","touchend"].indexOf(t.type)){i.touches={};for(var n=0;n<t.touches.length;n++)i.touches[t.touches[n].identifier]={id:t.touches[n].identifier,x:(t.touches[n].clientX-s)/$,y:(t.touches[n].clientY-a)/o,changed:!1};for(n=t.changedTouches.length;n--;){const r=t.changedTouches[n].identifier;void 0!==i.touches[r]&&(i.touches[r].changed=!0);let h=t.changedTouches[n].clientX,w=t.changedTouches[n].clientY;i.x=(h-s)/$,i.y=(w-a)/o;let p=va(i);p&&p[e]&&p[e](t),N[e]&&N[e](t,p)}}else{i.x=(t.clientX-s)/$,i.y=(t.clientY-a)/o;let r=va(i);r&&r[e]&&r[e](t),N[e]&&N[e](t,r),"onOver"==e&&(r!=i._oo&&i._oo&&i._oo.onOut&&i._oo.onOut(t),i._oo=r)}}function Ma(t=ea()){let e=S.get(t);if(!e){let r=window.getComputedStyle(t);e={x:0,y:0,radius:5,touches:{},canvas:t,_cf:[],_lf:[],_o:[],_oo:null,_s:r},S.set(t,e)}return t.addEventListener("mousedown",wa),t.addEventListener("touchstart",wa),t.addEventListener("mouseup",la),t.addEventListener("touchend",la),t.addEventListener("touchcancel",la),t.addEventListener("blur",La),t.addEventListener("mousemove",xa),t.addEventListener("touchmove",xa),e._t||(e._t=!0,Ba("tick",()=>{e._lf.length=0,e._cf.map(t=>{e._lf.push(t)}),e._cf.length=0})),e}function Na(...t){t.map(t=>{let e=t.context?t.context.canvas:ea(),r=S.get(e);if(!r)throw new ReferenceError("Pointer events not initialized for the objects canvas");t._r||(t._r=t.render,t.render=function(){r._cf.push(this),this._r()},r._o.push(t))})}function Oa(t){N.onDown=t}function Pa(t){N.onUp=t}class b extends G.class{init({padX:t=0,padY:e=0,text:r,onDown:i,onUp:$,...o}={}){super.init({padX:t,padY:e,...o}),this.textNode=E({...r,context:this.context}),this.width||(this.width=this.textNode.width,this.height=this.textNode.height),Na(this),this.addChild(this.textNode),this._od=i||Q,this._ou=$||Q;const s=this._dn=document.createElement("button");s.style=ta,s.textContent=this.text,s.addEventListener("focus",()=>this.focus()),s.addEventListener("blur",()=>this.blur()),s.addEventListener("keydown",t=>this._kd(t)),s.addEventListener("keyup",t=>this._ku(t)),ha(s,this.context.canvas),this._uw(),this._p()}get text(){return this.textNode.text}set text(t){this._d=!0,this.textNode.text=t}destroy(){this._dn.remove()}_p(){this.text!==this._dn.textContent&&(this._dn.textContent=this.text),this.textNode._p();let t=this.textNode.width+2*this.padX,e=this.textNode.height+2*this.padY;this.width=Math.max(t,this.width),this.height=Math.max(e,this.height),this._uw()}render(){this._d&&this._p(),super.render()}enable(){this.disabled=this._dn.disabled=!1,this.onEnable()}disable(){this.disabled=this._dn.disabled=!0,this.onDisable()}focus(){this.disabled||(this.focused=!0,document.activeElement!=this._dn&&this._dn.focus(),this.onFocus())}blur(){this.focused=!1,document.activeElement==this._dn&&this._dn.blur(),this.onBlur()}onOver(){this.disabled||(this.hovered=!0)}onOut(){this.hovered=!1}onEnable(){}onDisable(){}onFocus(){}onBlur(){}onDown(){this.disabled||(this.pressed=!0,this._od())}onUp(){this.disabled||(this.pressed=!1,this._ou())}_kd(t){"Enter"!=t.code&&"Space"!=t.code||this.onDown()}_ku(t){"Enter"!=t.code&&"Space"!=t.code||this.onUp()}}function Qa(t){let e=t.canvas;t.clearRect(0,0,e.width,e.height)}function Ra({fps:t=60,clearCanvas:e=!0,update:r=Q,render:i,context:$=_()}={}){if(!i)throw Error("You must provide a render() function");let o,s,a,n,h,w=0,p=1e3/t,l=1/t,d=e?Qa:Q;function c(){if(s=requestAnimationFrame(c),a=performance.now(),n=a-o,o=a,!(n>1e3)){for(ra("tick"),w+=n;w>=p;)h.update(l),w-=p;d($),h.render()}}return h={update:r,render:i,isStopped:!0,start(){o=performance.now(),this.isStopped=!1,requestAnimationFrame(c)},stop(){this.isStopped=!0,cancelAnimationFrame(s)},_frame:c,set _last(t){o=t}}}let Sa={set:(t,e,r)=>(e.startsWith("_")||(t._d=!0),Reflect.set(t,e,r))},ya={start:t=>t?1:0,center:()=>.5,end:t=>t?0:1};class c extends L.class{init({flow:t="column",align:e="start",justify:r="start",colGap:i=0,rowGap:$=0,numCols:o=1,dir:s="",breakpoints:a=[],...n}={}){return super.init({flow:t,align:e,justify:r,colGap:i,rowGap:$,numCols:o,dir:s,breakpoints:a,...n}),this._p(),new Proxy(this,Sa)}addChild(t){this._d=!0,super.addChild(t)}removeChild(t){this._d=!0,super.removeChild(t)}render(){this._d&&this._p(),super.render()}destroy(){this.children.map(t=>t.destroy&&t.destroy())}_p(){this._d=!1,this.breakpoints.map(t=>{t.metric.call(this)&&this._b!==t&&(this._b=t,t.callback.call(this))});let t=this._g=[],e=this._cw=[],r=this._rh=[],i=this.children,$=this._nc="column"===this.flow?1:"row"===this.flow?i.length:this.numCols,o=0,s=0;for(let d,c=0;d=i[c];c++){t[o]=t[o]||[],d._p&&d._p(),r[o]=Math.max(r[o]||0,d.height);let i=d.colSpan||1,a=i;do{e[s]=Math.max(e[s]||0,d.width/a),t[o][s]=d}while(a+s++<=$&&--i);s>=$&&(s=0,o++)}for(;s>0&&s<$;)t[o][s++]=!1;let a=t.length,n=[].concat(this.colGap),h=[].concat(this.rowGap);this._w=e.reduce((t,e)=>t+=e,0);for(let d=0;d<$-1;d++)this._w+=n[d%n.length];this._h=r.reduce((t,e)=>t+=e,0);for(let d=0;d<a-1;d++)this._h+=h[d%h.length];this._uw();let w="rtl"===this.context.canvas.dir&&!this.dir||"rtl"===this.dir;this._rtl=w,w&&(this._g=t.map(t=>t.reverse()),this._cw=e.reverse());let p=-this.anchor.y*this.height,l=[];this._g.map((t,i)=>{let $=-this.anchor.x*this.width;t.map((t,o)=>{if(t&&!l.includes(t)){l.push(t);let s=ya[t.justifySelf||this.justify](this._rtl),a=ya[t.alignSelf||this.align](),h=t.colSpan||1,w=e[o];if(h>1&&o+h<=this._nc)for(let t=1;t<h;t++)w+=e[o+t]+n[(o+t)%n.length];let d=w*s,c=r[i]*a,x=0,Y=0,{width:u,height:Z}=t;if(t.anchor&&(x=t.anchor.x,Y=t.anchor.y),0===s)d+=u*x;else if(.5===s){d+=(x<.5?-1:.5===x?0:1)*u*s}else d-=u*(1-x);if(0===a)c+=Z*Y;else if(.5===a){c+=(Y<.5?-1:.5===Y?0:1)*Z*a}else c-=Z*(1-Y);t.x=$+d,t.y=p+c}$+=e[o]+n[o%n.length]}),p+=r[i]+h[i%h.length]})}}let za={},T={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"left",ArrowUp:"up",ArrowRight:"right",ArrowDown:"down"};function Ta(t){let e=T[t.code];za[e]&&za[e](t)}function Ua(t){}function Va(){}function Wa(){let t;for(t=0;t<26;t++)T[t+65]=T["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)T[48+t]=T["Digit"+t]=""+t;window.addEventListener("keydown",Ta),window.addEventListener("keyup",Ua),window.addEventListener("blur",Va)}function Aa(t,e){let r=[],i=e.x+e.width/2,$=e.y+e.height/2,{x:o,y:s,width:a,height:n}=ga(t),h=t.y<$,w=t.y+t.height>=$;return t.x<i&&(h&&r.push(0),w&&r.push(2)),t.x+t.width>=i&&(h&&r.push(1),w&&r.push(3)),r}class Xa{constructor({maxDepth:t=3,maxObjects:e=25,bounds:r}={}){this.maxDepth=t,this.maxObjects=e;let i=ea();this.bounds=r||{x:0,y:0,width:i.width,height:i.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map(function(t){t.clear()}),this._b=!1,this._o.length=0}get(t){let e=new Set;for(;this._s.length&&this._b;)return Aa(t,this.bounds).map(r=>{this._s[r].get(t).map(t=>e.add(t))}),Array.from(e);return this._o.filter(e=>e!==t)}add(...t){t.map(t=>{Array.isArray(t)?this.add.apply(this,t):this._b?this._a(t):(this._o.push(t),this._o.length>this.maxObjects&&this._d<this.maxDepth&&(this._sp(),this._o.map(t=>this._a(t)),this._o.length=0))})}_a(t){Aa(t,this.bounds).map(e=>{this._s[e].add(t)})}_sp(t,e,r){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,r=0;r<4;r++)this._s[r]=new Xa({bounds:{x:this.bounds.x+(r%2==1?t:0),y:this.bounds.y+(r>=2?e:0),width:t,height:e},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[r]._d=this._d+1,this._s[r]._p=this}}function na(t){let e=[];return t._dn?e.push(t._dn):t.children&&t.children.map(t=>{e=e.concat(na(t))}),e}class d extends L.class{init({id:t,name:e=t,cullObjects:r=!0,cullFunction:i=Fa,...$}){const o=this._dn=document.createElement("section");o.tabIndex=-1,o.style=ta,o.id=t,o.setAttribute("aria-label",e),super.init({id:t,name:e,cullObjects:r,cullFunction:i,...$}),ha(o,this.context.canvas);let s=this.context.canvas;this.camera=L({x:s.width/2,y:s.height/2,width:s.width,height:s.height,anchor:{x:.5,y:.5}}),this.camera._pc=()=>{super._pc.call(this.camera);this.context.canvas;this.camera._wx=this.camera.x*this.scaleX,this.camera._wy=this.camera.y*this.scaleY}}show(){this.hidden=this._dn.hidden=!1;let t=this.children.find(t=>t.focus);t?t.focus():this._dn.focus(),this.onShow()}hide(){this.hidden=this._dn.hidden=!0,this.onHide()}addChild(t,e){super.addChild(t,e),na(t).map(t=>{this._dn.appendChild(t)})}removeChild(t){super.removeChild(t),na(t).map(t=>{ha(t,this.context.canvas)})}destroy(){this._dn.remove(),this.children.map(t=>t.destroy&&t.destroy())}update(t){this.hidden||super.update(t)}lookAt(t){let e=(t=t.world||t).x,r=t.y;t.scaleX&&(e/=t.scaleX,r/=t.scaleY),this.camera.x=e,this.camera.y=r,this._pc()}_pc(){super._pc(),this.camera&&this.camera._pc()}render(){let{x:t,y:e,width:r,height:i}=this.camera;this.sx=t*this.scaleX-r/2,this.sy=e*this.scaleY-i/2,this.hidden||super.render(t=>!this.cullObjects||this.cullFunction(t,this.camera))}onShow(){}onHide(){}}function Ya(t){if(+t===t)return t;let e=[],r=t.split(".."),i=+r[0],$=+r[1],o=i;if(i<$)for(;o<=$;o++)e.push(o);else for(;o>=$;o--)e.push(o);return e}class oa{constructor({image:t,frameWidth:e,frameHeight:r,frameMargin:i,animations:$}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:e,height:r,margin:i},this._f=t.width/e|0,this.createAnimations($)}createAnimations(t){let e,r;for(r in t){let{frames:i,frameRate:$,loop:o}=t[r];if(e=[],void 0===i)throw Error("Animation "+r+" must provide a frames property");[].concat(i).map(t=>{e=e.concat(Ya(t))}),this.animations[r]=fa({spriteSheet:this,frames:e,frameRate:$,loop:o})}}}function ba(){return new oa(...arguments)}ba.prototype=oa.prototype,ba.class=oa;var J,Za,pa,y;Za=.3,J=function(){var $,r,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,z=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.05,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:220,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,v=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:.1,n=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,h=arguments.length>7&&void 0!==arguments[7]?arguments[7]:1,w=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,x=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,f=arguments.length>10&&void 0!==arguments[10]?arguments[10]:0,i=arguments.length>11&&void 0!==arguments[11]?arguments[11]:0,H=arguments.length>12&&void 0!==arguments[12]?arguments[12]:0,W=arguments.length>13&&void 0!==arguments[13]?arguments[13]:0,d=arguments.length>14&&void 0!==arguments[14]?arguments[14]:0,g=arguments.length>15&&void 0!==arguments[15]?arguments[15]:0,l=arguments.length>16&&void 0!==arguments[16]?arguments[16]:0,M=arguments.length>17&&void 0!==arguments[17]?arguments[17]:1,R=arguments.length>18&&void 0!==arguments[18]?arguments[18]:0,s=arguments.length>19&&void 0!==arguments[19]?arguments[19]:0,p=2*Math.PI,u=w*=500*p/Math.pow(y,2),c=(0<d?1:-1)*p/4,X=a*=(1+2*z*Math.random()-z)*p/y,b=[],m=0,C=0,V=0,A=1,B=0,I=0,P=0;for(e=99+y*e,R*=y,v*=y,o*=y,l*=y,x*=500*p/Math.pow(y,3),d*=p/y,f*=p/y,i*=y,H=y*H|0,r=e+R+v+o+l|0;V<r;b[V++]=P)++I%(100*g|0)||(P=n?1<n?2<n?3<n?Math.sin(Math.pow(m%p,3)):Math.max(Math.min(Math.tan(m),1),-1):1-(2*m/p%2+2)%2:1-4*Math.abs(Math.round(m/p)-m/p):Math.sin(m),P=(H?1-s+s*Math.sin(2*Math.PI*V/H):1)*(0<P?1:-1)*Math.pow(Math.abs(P),h)*t*Za*(V<e?V/e:V<e+R?1-(V-e)/R*(1-M):V<e+R+v?M:V<r-l?(r-V-l)/o*M:0),P=l?P/2+(l>V?0:(V<r-l?1:(r-V)/l)*b[V-l|0]/2):P),m+=($=(a+=w+=x)*Math.sin(C*d-c))-$*W*(1-1e9*(Math.sin(V)+1)%2),C+=$-$*W*(1-1e9*(Math.pow(Math.sin(V),2)+1)%2),A&&++A>i&&(a+=f,X+=f,A=0),!H||++B%H||(a=X,w=u,A=A||1);return(t=pa.createBuffer(1,r,y)).getChannelData(0).set(b),(a=pa.createBufferSource()).buffer=t,a.connect(pa.destination),a.start(),a},pa=new(window.AudioContext||webkitAudioContext),y=44100;var k=512,q=16,j={screen:0,frame_count:0,score:0,difficulty:0,lives:30,level:0,chest:[],frogs:0,jump_started:!1,jump_x:0,jump_y:0,jumping:!1,jump_clock:0,frogo_right:!0,speed:0,tap:!1},e=Ca().canvas;Wa(),Ma(),Oa(function(a,$){J.apply(void 0,[,,210,.03,,,,.85,-46,,,,,.7,,,.04,,.03,.74]),j.tap=!0}),Pa(function(a,$){J.apply(void 0,[,,210,.03,,,,.85,-46,,,,,.7,,,.04,,.03,.74]),j.tap=!1});var ca=new Image;ca.src="t.png",ca.onload=function(){var a=ba({image:ca,frameWidth:q,frameHeight:q,animations:{stay:{frames:1},jump:{frames:"0..1",frameRate:10},turbo:{frames:"0..1",frameRate:30}}}),$=ba({image:ca,frameWidth:64,frameHeight:64,animations:{stay:{frames:1},walk:{frames:"1..2",frameRate:10}}}),e=k-4*q,t=G({x:4*q,y:e,animations:$.animations}),r=G({x:t.x+4*q,y:e+2*q+5,animations:a.animations,dx:-1}),o=G({width:k,height:q,x:0,y:k-q}),i=G({width:k,height:400,x:0,y:300}),n=G({width:k,height:300,x:0,y:0}),s={seed:0,sky_colors:["lightblue"],sky_emojis:["\u2601\uFE0F"],background_colors:["darkblue"],background_emojis:["\uD83C\uDF32"],field_colors:["#89d69e"],field_emojis:["\uD83C\uDF52","\uD83E\uDDDA\u200D\u2640\uFE0F","\uD83E\uDD85"],field_emojis_func:[10,100,-10],floor_colors:["green"],floor_emojis:["\uD83C\uDF44","\uD83D\uDD25"],floor_emojis_func:[1,-1],hi_enemies:["\uD83E\uDD85"],hi_enemies_vects:[[-1,-10]],hi_enemies_vuln:[0],lo_enemies:["\uD83E\uDD82"],lo_enemies_vects:[[-1,0]],lo_enemies_vuln:[0],chest_emojis:["\uD83E\uDD7E","\uD83C\uDFA9"],enemy_wave_vect:[0,0,1,0,0,0,0,0,0],chest_wave_vect:[0,0,1,0,0,0,0,0,0]},d=!0;Ra({update:function(){if(j.lives<0){var a=E({text:"\u2620\uFE0F YOU LOSE",x:0,color:"darkgreen",font:"64px Impact, Lucida",dy:-.1});i.addChild(a),t.playAnimation("stay")}else{if(0===j.frame_count){if(d){Ea(s.seed.toString()),n.color=s.sky_colors[0],i.color=s.field_colors[0],o.color=s.floor_colors[0];a=E({text:"FROG JUMPER",x:0,color:"darkgreen",font:"64px Impact, Lucida"});i.addChild(a),d=!1}if(!j.tap)return;console.log("level started"),j.speed=3,n.children.map(function(a){return a.dx=-j.speed/2}),i.children.map(function(a){return a.dx=-j.speed}),o.children.map(function(a){return a.dx=2*-j.speed}),t.playAnimation("walk"),r.playAnimation("jump")}if(t.dy=t.dy+.2,r.dx=r.dx-.05,t.y>=e&&(t.dy=0,t.dx=0,t.playAnimation("walk"),r.playAnimation("jump"),j.jumping=!1,j.jump_started=!1),r.x<q&&(r.dx=-r.dx),j.tap&&(j.jump_started?(console.log("in air"),Math.abs(t.x-r.x)<q?(t.dy=-10,t.playAnimation("walk"),console.log("hit"),J.apply(void 0,[,,1516,,.04,.15,,.01,,,562,.06,,,,,.09,.62,.02])):t.playAnimation("stay")):(t.playAnimation("stay"),j.jump_clock=performance.now(),j.jump_x=t.x,j.jump_y=t.y,j.jumping=!0,t.dy=-5,j.jump_started=!0),j.tap=!1),j.frame_count++,j.frame_count%300==0){var $=E({text:j.score.toString(),vect:100,x:k,dx:2*-j.speed,color:"darkgreen",font:"64px Impact, Lucida"});i.addChild($),j.screen++,console.log("nol");for(var p=0;p<F(0,10);p++){var b=E({font:"12px Helvetica",text:s.sky_emojis[p%s.sky_emojis.length],x:k+F(0,k),y:F(0,300-8*q),scaleX:5,scaleY:5,dx:-j.speed/2});n.addChild(b)}for(p=0;p<F(0,5);p++){b=E({font:"12px Helvetica",text:s.background_emojis[p%s.background_emojis.length],x:k+F(0,k),y:-20,scaleX:4,scaleY:4,dx:-j.speed/2,tree:!0});i.addChild(b)}for(p=0;p<F(0,10);p++){var m=p%s.field_emojis.length;b=E({text:s.field_emojis[m],vect:s.field_emojis_func[m],x:k+F(0,k),y:F(0,400-2*q),dx:-j.speed,scaleX:3,scaleY:3});i.addChild(b)}for(p=0;p<F(0,10);p++){m=p%s.floor_emojis.length,b=E({text:s.floor_emojis[m],vect:s.floor_emojis_func[m],x:k+F(0,k),y:-10,dx:2*-j.speed});o.addChild(b)}if(j.screen===s.enemy_wave_vect.length+1){console.log("level done");b=E({text:"\uD83C\uDFC1",x:k,y:-100,dx:-j.speed/4,finish:!0,scaleX:5,scaleY:5});o.addChild(b)}}i.children.map(function(a){if(a.finish&&t.x===a.x&&(J.apply(void 0,[,,528,.04,.15,.27,,1.48,1,-.1,452,.06,,,,,,.65,.07]),t.dy=-10,r.dy=-11,a.dy=10,j.speed+=1),Math.abs(a.x-t.x)<2*q&&Math.abs(a.parent.y+a.y-t.y)<2*q){if(a.tree)return;a.vect>0?(j.score+=a.vect,J.apply(void 0,[,,395,,,.17,,1.38,.9,-.4,,,,,,.1,.13,.54,.03,.05]),a.dy=-11):(a.dy=11,j.lives--,J.apply(void 0,[,,44,.03,.02,0,3,.05,,,,,,,,,,.18,.15]))}}),o.children.map(function(a){if(!j.jumping&&Math.abs(a.x-t.x)<2*q){if(a.ttl&&0===a.ttl)return;a.ttl=0,a.vect>0?(J.apply(void 0,[,,395,,,.17,,1.38,.9,-.4,,,,,,.1,.13,.54,.03,.05]),a.dy=-11,j.score+=a.vect):(J.apply(void 0,[,,44,.03,.02,0,3,.05,,,,,,,,,,.18,.15]),a.dy=11,j.lives--,console.log("ding"))}})}n.update(),i.update(),o.update(),t.update(),r.update()},render:function(){n.render(),i.render(),o.render(),r.render(),t.render()}}).start()};})();