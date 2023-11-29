var _=(function(){var tau=Math.PI*2,log=true;return{r:function(l,h){l=l||1;if(h===undefined){return Math.random()*l;}return this.r(h-l)+l;},m:function(x,m){return(x%m+m)%m;},pi:Math.PI,tau:tau,as:tau,an:function(n){return this.m(n,this.as);},asd:function(f,t){if(this.anh(f-t)<0){return 1;}return-1;},anh:function(n){var h=this.as/2;return this.m(n+h,this.as)-h;},ad:function(a,b){var h=this.as/2,diff=this.anh(a-b);if(diff>h){diff=diff-this.as;}return Math.abs(diff);},l:function(m){console.log(m);},lo:function(m,r){if(log){log=false;this.l(m);}if(r){log=true;}},d:function(a,b,c,d){var e=a-c,f=b-d;return Math.sqrt(e*e+f*f);},b:function(a,b){return!(((a.y+a.h)<(b.y))||(a.y>(b.y+b.h))||((a.x+a.w)<b.x)||(a.x>(b.x+b.w)));},g:function(id){return document.getElementById(id);},c:function(obj){var n={};for(var prop in obj){if(typeof prop!='object'){n[prop]=obj[prop];}}return n;}};}());var kc=(function(){var keys=[],lt=new Date(),rate=60;window.addEventListener('keydown',function(e){keys[e.keyCode]=true;});window.addEventListener('keyup',function(e){keys[e.keyCode]=false;});return{keys:keys,s:function(k,cb){var n=new Date(),r=[];if(n-lt>=rate){lt=n;k.forEach(function(c,i){var d=c.charCodeAt(0,1);if(keys[d]){r[i]=(keys[d]);}});}cb(r);},};}());var C=(function(){var canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=320;canvas.height=240;document.body.appendChild(canvas);return{canvas:canvas,cls:function(style){ctx.fillStyle=style||'#000000';ctx.fillRect(0,0,canvas.width,canvas.height);},hiDraw:function(draw){draw.call(this,ctx,canvas)},drawGrid:function(offX,offY,w,h,pw,ph){w=w||8;h=h||8;pw=pw||32;ph=ph||32;offX=offX||0;offY=offY||0;ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=3;var y=-ph*2,x;while(y<h*ph){x=-pw*2;while(x<w*pw){ctx.strokeRect(x+offX,y+offY,pw,ph);x+=pw;}y+=ph;}},drawInfo:function(messArray,x,y,dy,font,style){x=x||10;y=y||10;dy=dy||15;font=font||'15px courier';style=style||'#ffffff';ctx.fillStyle=style;ctx.font=font;messArray.forEach(function(mess,i){ctx.fillText(mess,x,y+dy*i);});},dBX:function(obj){ctx.fillStyle=obj.f;ctx.strokeStyle=obj.s;ctx.lineWidth=obj.i;ctx.save();ctx.translate(obj.x+obj.hw,obj.y+obj.hh);ctx.rotate(obj.a);ctx.fillRect(-obj.hw,-obj.hh,obj.w,obj.h);ctx.strokeRect(-obj.hw,-obj.hh,obj.w,obj.h);ctx.restore();},dDr:function(obj){ctx.fillStyle=obj.f;ctx.strokeStyle=obj.s;ctx.lineWidth=obj.i;ctx.save();ctx.translate(obj.x,obj.y);ctx.rotate(obj.a);var i=2,l=obj.p.length;ctx.beginPath();ctx.moveTo(obj.p[0],obj.p[1]);while(i<l){ctx.lineTo(obj.p[i],obj.p[i+1]);i+=2;};if(obj.c){ctx.closePath();}ctx.stroke();if(obj.l){ctx.fill();}ctx.restore();}};}());C.cls();var vp={w:320,h:240,makeVPRel:function(obj){return{x:obj.x-this.x,y:obj.y-this.y,w:obj.w,h:obj.h};}};var Unit=(function(){var ct=0;return function(obj){var s=this;obj=obj||{};s.id=obj.id||ct+'_'+new Date().getTime();ct+=1;if(ct>1000){ct=0;}s.x=obj.x===undefined?-16:obj.x;s.y=obj.y===undefined?-16:obj.y;s.w=obj.w||32;s.h=obj.h||32;s.hw=16;s.hh=16;s.a=obj.a||0;s.maxD=obj.maxD||1;s.delta=obj.maxD;s.boost=0;s.yaw=obj.yaw===undefined?0:obj.yaw;s.maxHP=obj.maxHP||20;s.hp=s.maxHP;s.faction=obj.faction||'n';s.s='#ffffff';s.f='#000000';s.i=3;s.onk=obj.onk||function(){};};}());Unit.prototype.step=function(){var s=this,y,a;s.a=_.an(s.a);s.x+=Math.cos(s.a)*(s.delta+s.boost);s.y+=Math.sin(s.a)*(s.delta+s.boost);a=(s.yaw>0?-_.pi:_.pi)/2;y=_.an(s.a+a);s.x+=Math.cos(y)*Math.abs(s.yaw);s.y+=Math.sin(y)*Math.abs(s.yaw);if(s.yaw>0){s.yaw-=.05;}if(s.yaw<0){s.yaw+=.05;}if(s.yaw>3){s.yaw=3;}if(s.yaw<-3){s.yaw=-3;}if(s.boost>0){s.boost-=1;}};var Shot=function(obj){var s=this;Unit.call(s,obj);s.delta=6;s.dam=1;s.maxHP=150;s.hp=s.maxHP;s.w=8;s.h=8;s.x-=s.w/2;s.y-=s.h/2;s.fromShip=obj.fromShip||{};};Shot.prototype=new Unit();var Ship=function(obj){var s=this;Unit.call(s,obj);s.delta=obj.delta===undefined?3:obj.delta;s.shots=obj.shots||false;s.lastFire=new Date();s.fr=obj.fr||100;s.target=false;s.dtt=0;s.aDir=0;s.adt=0;s.toTarget=0;s.turnPer=0;s.mt=_.pi/180*(obj.mt||1);s.aDelta=0;s.killedBy=false;s.ai_script=obj.ai_script||function(){};};var p=Ship.prototype=new Unit();p.findTarget=function(eShips){this.target=false;if(eShips.units.length>0){this.target=eShips.units[Math.floor(_.r(eShips.units.length))]}};p.updateTarget=function(){var toTarget,s=this;if(s.target){s.toTarget=Math.atan2(s.target.y-s.y,s.target.x-s.x);s.dtt=_.d(s.x+s.w,s.y,s.target.x,s.target.y);s.adt=_.ad(s.a,s.toTarget);s.turnPer=s.adt/Math.PI;s.aDelta=s.turnPer*s.mt;s.aDir=_.asd(s.a,s.toTarget);}};p.followTarget=function(rev){var s=this;rev=rev||false;s.a+=s.aDelta*(rev?s.aDir*-1:s.aDir);};p.shoot=function(){var now=new Date(),s=this;var x=Math.cos(s.a);if(now-s.lastFire>=s.fr){this.shots.add(new Shot({x:s.x+s.w/2,y:s.y+s.h/2,a:s.a,yaw:s.yaw,fromShip:s}));s.lastFire=now;}};var UnitCollection=function(obj){obj=obj||{};this.units=obj.units||[];this.max=obj.max||10;};p=UnitCollection.prototype;p.collidesWith=function(unit){var i=this.units.length;while(i--){if(_.b(this.units[i],unit)){return this.units[i];}}return false;};p.purgeDead=function(){var i=this.units.length;while(i--){if(this.units[i].hp<=0){this.units[i].onk();this.units.splice(i,1);}}};p.add=function(unit){unit=unit||new Unit();if(this.units.length<this.max){this.units.push(unit);}};var ShotCollection=function(obj){obj=obj||{};UnitCollection.call(this,obj);this.max=100;};p=ShotCollection.prototype=new UnitCollection();p.step=function(fe){var i=this.units.length,sh;fe=fe||function(){};while(i--){sh=this.units[i];sh.step();sh.hp-=1;if(sh.hp<0){sh.hp=0;}fe(sh);}this.purgeDead();};var ShipCollection=function(obj){var s=this;obj=obj||{};UnitCollection.call(s,obj);s.faction=obj.faction||'n';s.ai=obj.ai||false;s.enemys=obj.enemys||{units:[],max:0};s.shots=new ShotCollection();};p=ShipCollection.prototype=new UnitCollection();p.addShip=function(obj){obj=obj||{};obj.faction=this.faction;obj.shots=this.shots;this.add(new Ship(obj));};p.update=function(obj){var s=this;if(s.ai){s.units.forEach(function(ship){ship.ai_script.call(s,ship);ship.step();});}s.shots.step(function(sh){var es=s.enemys,i=es.units.length,e;if(i>0){while(i--){e=es.units[i];if(_.b(sh,e)){sh.hp=0;e.hp-=sh.dam;if(e.hp<=0){e.killedBy=sh.fromShip;sh.fromShip.target=false;}}}}});s.purgeDead();};var swai_side=function(v){var s=this,p;v.delta=v.maxD;if(!v.target){v.findTarget(s.enemys);}if(v.target){v.updateTarget();v.followTarget();if(v.dtt<150){p=v.dtt/150;v.delta=p*v.maxD;v.yaw+=Math.random()*.7-.35;if(v.dtt<75){v.delta=0;}}v.shoot();}};var dp=(function(){var load={},ANI=function(obj){this.key=obj.key;this.f=0;this.mf=75;this.p=0;this.b=0;this.dr=[];this.bx=[];this.unit=obj.unit||{};this.onk=obj.onk||function(){};};return{stack:[],tick:function(){var ani,i;this.stack.forEach(function(ani){ani.p=ani.f/ani.mf;ani.b=1-Math.abs(.5-ani.p)/.5;load[ani.key].ff.call(ani);ani.f++;});i=this.stack.length;while(i--){ani=this.stack[i];if(ani.f>=ani.mf){ani.onk();this.stack.splice(i,1);}}},start:function(obj){var ani;if(obj.key in load){ani=new ANI(obj);load[obj.key].ini.call(ani);this.stack.push(ani);}},def:function(aniObj){load[aniObj.key]=aniObj;}};}());dp.def({key:'pl_d',ini:function(){var i=0,s=this;while(i<4){this.bx.push({x:0,y:0,a:0,w:16,h:16,hw:8,hh:8,s:'#ffffff',f:'#00ffff',i:3,Y:Math.floor(i/2),X:i%2,he:_.r(_.tau)});i++;}},ff:function(){var s=this,x,y;s.bx.forEach(function(bx,i){bx.a=bx.he;bx.x=s.unit.x+bx.X*bx.w+Math.cos(bx.he)*(50*s.p);bx.y=s.unit.y+bx.Y*bx.h+Math.sin(bx.he)*(50*s.p);bx.f='rgba(0,255,128,'+(1-s.p)+')';bx.s='rgba(255,255,255,'+(1-s.p)+')';});}});var rs=(function(){var pl,eSpawn=function(){var r=_.r(pl.a-.5,pl.a+.5);api.es.addShip({x:Math.cos(r)*500+pl.x,y:Math.sin(r)*500+pl.y,fr:1000-900*api.d.p,mt:1+9*api.d.p,ai_script:swai_side,maxHP:1+Math.floor(9*api.d.p),maxD:Math.floor(3.5*api.d.p+.5),onk:function(){dp.start({key:'pl_d',unit:{x:this.x,y:this.y}});if(this.killedBy){rs.a.kill(this);rs.score+=this.maxHP*100;}}});},distTick=function(obj){var roll,d=this.d,r,per;d.d=_.d(0,0,pl.x+pl.w/2,pl.y+pl.w/2);d.p=(d.d-d.sd)/d.hd;if(d.p<0){d.p=0;}if(d.p>1){d.p=1;}d.spawnRate=Math.floor(10000-9000*d.p);if(new Date()-d.lastSpawn>=d.spawnRate){roll=_.r();this.me=Math.floor(4*d.p)+1;if(roll<d.p){eSpawn(pl);}if(this.es.units.length<this.me){eSpawn(pl);}this.d.lastSpawn=new Date();}if(this.d.d<this.d.sd&&pl.hp<pl.maxHP/2){pl.hp=pl.maxHP/2;}},eCheck=function(){rs.es.units.forEach(function(e){if(rs.d.p===0){e.hp=0;}if(e.dtt>1250){e.hp=0;}});};api={score:0,NPS:function(){rs.ps.addShip({delta:0,mt:10,fr:800,a:_.pi*1.5,ai_script:swai_side});api.a.sp=50;api.a.fr();},d:{sd:1000,hd:3000,spawnRate:10000,lastSpawn:new Date()},a:{sp:50,msp:100,cd:500,lt:new Date(),ready:[],norm:function(){if(this.sp>this.msp){this.sp=this.msp;}},kill:function(e){this.sp+=e.maxHP;this.norm();this.fr();},fr:function(){var a,i=1;this.ready=[];for(var prop in this.opt){a=this.opt[prop];if(this.sp>=a.c){this.ready.push(i+' : '+a.disp+' ('+a.c+'sp)');}i++;}},buy:function(key){var p=this.opt[key],now=new Date();if(now-this.lt>=this.cd){if(this.sp>=p.c&&p.con()){this.sp-=p.c;p.onuse();}this.lt=now;this.fr();}},opt:{b:{c:1,disp:'boost',con:function(){return true;},onuse:function(){pl.boost+=30;}},h:{c:5,disp:'heal',con:function(){if(pl.hp<pl.maxHP){return true;}return false;},onuse:function(){pl.hp+=1;}},w:{c:25,disp:'weapon',con:function(){if(pl.fr>100){return true;}return false;},onuse:function(){pl.fr/=1.5;}}}},me:0,ps:{},es:{},init:function(){vp.w=640;vp.h=480;C.canvas.width=640;C.canvas.height=480;C.cls();this.d.hd=10000;this.ps=new ShipCollection({faction:'p',max:1});this.es=new ShipCollection({faction:'e',ai:true,max:12});this.ps.enemys=this.es;this.es.enemys=this.ps;api.a.fr();},tick:function(){pl=rs.ps.units[0];if(pl===undefined){main.chState('p_die');}else{kc.s(['W','S','A','D','J','K','L','1','2','3'],function(keys){if(keys[0]){pl.delta+=.1;}if(keys[1]){pl.delta-=.1;}if(keys[2]){pl.a+=pl.mt;}if(keys[3]){pl.a-=pl.mt;}if(keys[4]){pl.yaw+=.5;}if(keys[5]){pl.shoot();}if(keys[6]){pl.yaw-=.5;}if(keys[7]){rs.a.buy('b');}if(keys[8]){rs.a.buy('h');}if(keys[9]){rs.a.buy('w');}if(pl.delta>3){pl.delta=3;}if(pl.delta<0){pl.delta=0;}});distTick.call(this,pl);vp.x=pl.x-vp.w/2;vp.y=pl.y-vp.h/2;pl.step();eCheck();this.es.update();this.ps.update();dp.tick();}}};return api;}());var basicShip=function(obj,ctx){ctx.save();ctx.translate(obj.x+obj.hw,obj.y+obj.hh);ctx.rotate(obj.a);ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(-25,-18);ctx.lineTo(20,0);ctx.lineTo(-25,18);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();},drawHome=function(ctx){var pos;if(rs.d.d<rs.d.sd){pos=vp.makeVPRel({x:0,y:0});ctx.fillStyle='rgba(0,64,128,'+(1-(rs.d.d/rs.d.sd)).toFixed(2)+')';ctx.beginPath();ctx.arc(pos.x,pos.y,rs.d.sd,0,_.tau);ctx.fill();}};var rscore_canvas=function(){var x,obj,y,w,h;C.cls('rgba('+Math.floor(255*rs.d.p)+',0,0,1)');C.hiDraw(function(ctx){var pw=640/8,ph=480/8;drawHome(ctx);C.drawGrid(pw-vp.x%pw,ph-vp.y%ph,8,8,pw,ph);rs.ps.units.forEach(function(ship){var obj=_.c(ship),pos=vp.makeVPRel(obj);obj.x=pos.x;obj.y=pos.y;ctx.strokeStyle='#00ffff';basicShip(obj,ctx);});rs.es.units.forEach(function(ship){var obj=_.c(ship),pos=vp.makeVPRel(obj);obj.x=pos.x;obj.y=pos.y;ctx.strokeStyle='#ff0000';ctx.fillStyle='#000000';basicShip(obj,ctx);ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillRect(obj.x,obj.y,obj.w,5);ctx.fillStyle='rgba(0,255,0,.5)';ctx.fillRect(obj.x,obj.y,obj.w*(ship.hp/ship.maxHP),5);});rs.ps.shots.units.forEach(function(sh){var obj=vp.makeVPRel(sh);ctx.fillStyle='#00afff';ctx.fillRect(obj.x,obj.y,obj.w,obj.h);});rs.es.shots.units.forEach(function(sh){var obj=vp.makeVPRel(sh);ctx.fillStyle='#ffffff';ctx.fillRect(obj.x,obj.y,obj.w,obj.h);});ctx.fillStyle='#afafaf';ctx.fillRect(220,10,200,20);ctx.fillStyle='#ff0000';ctx.fillRect(220,10,rs.d.p*200,20);ctx.fillStyle='#ffffff';ctx.textBaseline='top';ctx.textAlign='center';ctx.fillText('RED',320,10);var obj=rs.ps.units[0];if(obj===undefined){obj={}}ctx.textAlign='left';C.drawInfo(['score: '+rs.score,'hp: '+(obj.hp?obj.hp+'/'+obj.maxHP:'dead'),'fire Rate: '+(Math.floor(obj.fr)||'')],10,10,20,'20px courier','#00ff00');C.drawInfo(['skill points: '+rs.a.sp].concat(rs.a.ready),450,20,15,'15px courier','#00ff00');dp.stack.forEach(function(ani){ani.bx.forEach(function(bx){var obj=_.c(bx),pos=vp.makeVPRel(obj);obj.x=pos.x;obj.y=pos.y;C.dBX(obj);});});});};var main=(function(){var cs='newgame',api={chState:function(state){cs=state;},start:function(){loop();}},states={p_die:function(){dp.start({key:'pl_d',unit:{x:vp.x+vp.w/2,y:vp.y+vp.h/2},onk:function(){main.chState('newgame');}});main.chState('p_die_ani');},p_die_ani:function(){_.l('ani tick');dp.tick();rscore_canvas();},newgame:function(){rs.NPS();main.chState('game');},game:function(){rs.tick();rscore_canvas();}},loop=function(){requestAnimationFrame(loop);states[cs]();};rs.init();return api;}());main.start();