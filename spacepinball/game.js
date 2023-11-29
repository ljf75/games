"use strict";let e={},t="object"==typeof window,n=navigator.userAgent.toLowerCase().match(/mobile/i),i=t&&screen.orientation||{},l=()=>i.angle,o=e=>new Promise((t=>setTimeout(t,e))),r=()=>new Promise((e=>requestAnimationFrame((()=>requestAnimationFrame(e)))));function a(e,t,n,i){let l=[];for(let i=e;i<=t;i+=n)l.push(i);return l.map(i)}function s(e,t,n){return e*(1-n)+t*n}let u=Object.values;Object.prototype.map=function(e){return u(this).map(e)};let f,c,h,{stringify:w,parse:m}=JSON,{PI:b,sin:d,cos:g,round:$,sign:p,min:v,max:y,sqrt:F,abs:T,atan2:x}=Math,P=2*b,S=(...e)=>console.void(0),I=(e=1,t=null)=>(null===t&&([e,t]=[0,e]),Math.random()*(t-e)+e),C=(e,t)=>floor(I(e,t)),L=(e,t)=>F(e*e+t*t),M=t&&document,A=t&&M.body,D=t?e=>M.querySelector(e):()=>0,q=D("wrapper"),k=D("#floor"),N=D("#shadow"),O=D("#pieces"),j=.75,B=3,E={x:0,y:0,xi:0,yi:0},H="2021-aurium-spacepinball-",V=H+"record",U=0,Y=3,_=0,J=0,W=0,R=1,z=1,G=1,X=1,K=1,Q=0,Z=5/3,ee=500/3,te=ee/2,ne=0,ie=0,le=[],oe=t&&D("pre");function re(e){Ge(e),alert(e)}let ae,se=H+"DB",ue="basePics";if(t){let e;"object"==typeof indexedDB&&indexedDB?e=indexedDB.open(se,20210912164303):ae={__FAIL:1},e.onerror=()=>{console.void(0),ae&&(ae.__FAIL=1)},e.onupgradeneeded=()=>{ae=e.result,[...ae.objectStoreNames].includes(ue)&&ae.deleteObjectStore(ue);ae.createObjectStore(ue,{keyPath:"lvl"})},e.onsuccess=()=>{ae=e.result,ae.__OK=1}}function fe(){if(ae&&ae.__FAIL)return Promise.reject(Error("No DB"));if(!ae||!ae.__OK)return o(50).then(fe);let e=ae.transaction([ue],"readwrite");return Promise.resolve(e.objectStore(ue))}async function ce(e,t){let{data:n,width:i,height:l}=t;t={lvl:e,data:n,width:i,height:l};let o=(await fe()).add(t);return new Promise(((e,n)=>{o.onsuccess=e,o.onerror=async i=>{let l=(await fe()).put(t);l.onerror=e=>n(Error(`Cant save pic ${t.lvl}. ${e.target.error.message}`)),l.onsuccess=e}}))}async function he(e){let t=(await fe()).get(e);return new Promise(((n,i)=>{t.onerror=()=>i(Error("Cant read pic for",e)),t.onsuccess=()=>{let e=t.result;e?n(new ImageData(e.data,e.width)):n()}}))}let we,me=0;if(t){function e(){setTimeout((()=>{let e=window.innerWidth,t=window.innerHeight;M.documentElement.className=n?"rot"+l():"rot90",R=n?l()?t/100:e/100:.6*t/100,X=R,K=R*Z,k.width=N.width=O.width=z=$(100*X),k.height=N.height=O.height=G=$(100*K),f.mustUpdate=1}),100)}we=new Worker("game.js?cache=20210912164303"),we.onerror=e=>{re("Worker fail.\n\n"+e.message)},we.onmessage=e=>{let[t,n]=e.data;we["on_"+t]&&we["on_"+t](n)},we.$=(e,t)=>we.postMessage([e,t]),window.goLvl=e=>we.$("goLvl",e),we.on_alive=()=>me=1,navigator.wakeLock&&navigator.wakeLock.request().then((()=>{})).catch((e=>console.void(0))),_=localStorage[V]||12345,setInterval((()=>{U>_&&(localStorage[V]=_=U)}),500),e(),window.addEventListener("resize",e),f=k.getContext("2d"),c=N.getContext("2d"),h=O.getContext("2d"),A.classList.add(n?"is-mobile":"not-mobile");var be=0;A.addEventListener("click",(()=>{if(!be)return n?void(A.requestFullscreen?A.requestFullscreen().then((()=>setTimeout(de,500))).catch((e=>re("This game needs the fullscreen mode.\n\n"+e.message))).finally(ge):re("Your browser do not have fullscreen API.")):ge()}))}function de(){i.lock&&i.lock("portrait-primary").then((e=>{})).catch((e=>Ge("Please, lock the screen rotation on your mobile configuration.",.8)))}async function ge(){Ze(),Ge("Please wait! It is building!",.8),await r(),be=1;let e=Promise.resolve();Fe.map(((t,n)=>e=e.then((async()=>{D("b").innerText=`Building...\nLevel ${n}  `,await r(),await t.bg(n)})))),await e,Fe[5].bg[0]&&(f.putImageData(Fe[5].bg[0],0,0),D("pre").style.backgroundImage=`url(${k.toDataURL()})`),$e()}function $e(){if(!me)return setTimeout($e,200);we.$("start",M.location.search.match(/lvl=([0-9]+)/)),D("b").remove(),et(),Ge("The game is started!"),e.tic()}let pe,ve=0,ye=e=>ee-e,Fe=[{name:"start",info:"You can use the wormhole to travell to another level, but avoid the blackhole!",async bg(e){this.bg=[];let t=await he(e);if(t&&t.width==z&&t.height==G);else{for(let e=0;e<z;e++)for(let t=0;t<G;t++)f.fillStyle=`hsl(${240+t/G*70},100%,20%)`,f.fillRect(e,t,1,1);t=await De(6,.52,35,-128),ce(e,t)}f.lineWidth=R/2;for(let e=1;e<7;e++){f.clearRect(0,0,z,G),await r(),f.putImageData(t,0,0),f.font=`bold ${10*R}px monospace`,f.textAlign="center";let n=(e,t,n,i,l)=>{f.filter=`blur(${l}px)`,f.fillStyle=i,f.fillText(e,t,n),f.filter="none"};[..."SPACEPINBALL"].map(((t,i)=>{let l=17*X+5.5*R*i,o=90*K;n(t,l,o,"#306",R/2),n(t,l,o,"rgba(255,255,255,.5)",0),e-1===i||e+5===i?n(t,l,o,"#FFF",R/1.5):n(t,l,o,"rgba(255,255,255,.5)",R/3)})),this.bg.push(Se())}},bgFreq:300,ballStart:[50,90],out:e=>e.x<0||e.x>100||e.y<0||e.y>ee,pins:a(b/18,P,b/18,(e=>[30*g(e)+50,30*d(e)+90,1.5,4,60,0,50])),wallsV:[[5,6,ee-12,4,0,0,100,.4],[95,6,ee-12,4,0,0,100,.4]],wallsH:[[6,5,88,4,0,0,100,.4],[6,ee-5,88,4,0,0,100,.4]],bh:[[75,25,4]],wh:[[25,25,6,1]],on:{colidePin(e,t){e.die||(e[4]-=30*t,e[5]=100-e[4],U+=~~(10*t),e[4]<0&&(e[4]=0,e.die=1,U+=100,Ke([1e3,0,.5,1,100]),Te(e),Pe(e,6,20)))}}},{name:"Limitless",info:"Caution! There are no walls to help you.",async bg(e){this.bg=[];let t=await he(e);t&&t.width==z&&t.height==G||(Ce(5,.511,-5,-24,500,[150,100,50],[2.5,0,0],((e,t)=>500*L(e-.5,t-.5)+",100%,40%")),[5,5,5,5,5,5,0].map((e=>{f.filter=`blur(${e}px)`,f.font=`bold ${3.5*R}px Arial, "Liberation Sans", sans-serif`,f.textAlign="center",f.fillStyle=e?"#C0C":"#FFF",f.fillText("Inferno",10*R,20*R),f.fillText("Clones",90*R,20*R),f.fillText("Mines",10*R,149*R),f.fillText("Solaris",90*R,149*R)})),f.filter="none",t=Se(),ce(e,t)),f.lineWidth=R/2;for(let e=0;e<4;e++){f.putImageData(t,0,0);for(let t=0;t<4;t++)a(b/4,P,b/2,(n=>{let i=14*-t*R-8*R,l=i-3.7*R;f.save(),f.translate(50*X,50*K),f.rotate(n),f.font=`bold ${9*R}px Arial, "Liberation Sans", sans-serif`,f.textAlign="center",f.fillStyle=t===e?Oe(0,l,R/2,0,l,3*R,"#F20","#800"):Oe(0,l,R/2,0,l,2*R,"#900","#500"),f.fillText("⬆",0,i),f.restore()}));this.bg.push(Se())}},bgFreq:500,ballStart:[50,te],out:e=>e.x<0||e.x>100||e.y<0||e.y>ee,pins:[...a(-15,15,5,(e=>[20-e,20+e,2,4,0,15==e?90:0,10,{i:e,wh:"inf",go:"sol"}])),...a(-15,15,5,(e=>[80+e,20+e,2,4,0,15==e?90:0,10,{i:e,wh:"clo",go:"min"}])),...a(-15,15,5,(e=>[20-e,ye(20+e),2,4,0,15==e?90:0,10,{i:e,wh:"min",go:"clo"}])),...a(-15,15,5,(e=>[80+e,ye(20+e),2,4,0,15==e?90:0,10,{i:e,wh:"sol",go:"inf"}]))],wallsV:[],wallsH:[],bh:[],wh:[[10,10,6,2],[90,10,6,3],[10,ye(10),6,4],[90,ye(10),6,5]],on:{colidePin(e){let{i:t,go:n}=e[7];if(15==t){U+=50,e[7].i=1,Pe(e,5),Ke([1e3,0,.5,1,100]);let t=pe.pins.find((e=>0==e[7].i&&e[7].wh==n));t[4]=t[5]=90,Te(t)}},beforeWH(e){if(2==e[3])return;let t=Fe[ve];t.wh=t.wh.filter((t=>t[3]!=e[3])),t.bh.push([...e])}}},{name:"Inferno",info:"all hope abandon ye who enter here",limits:[[50,te,46,66],[46,154.5,30,8.1],[60,136.7,16,20],[5,6,20,40]],async bg(e){this.bg=[];let t=await he(e);if(t&&t.width==z&&t.height==G);else{f.clearRect(0,0,z,G),De(2,.56,5,0,.2,0);let[e,...n]=this.limits;f.save();let i=new Path2D;i.ellipse(e[0]*R,e[1]*R,e[2]*R,e[3]*R,0,0,P),f.clip(i),Ce(400,.56,0,0,400,[-10,100,0],[.1,0,.25],((e,t)=>"0,0%,0%")),f.restore();let l=f.createLinearGradient(0,2,0,G+2);a(0,166,1,(e=>{e%2?l.addColorStop((e+.5)/166,"#200"):l.addColorStop(e/166,"#832")})),f.fillStyle=l,n.map((e=>f.fillRect(...e.map((e=>e*R))))),t=Se()}ce(e,t),this.bg.push(t)},bgFreq:500,ballStart:[50,ye(8)],out({x:e,y:t}){let[n,...i]=this.limits;return L((e-n[0])/(n[2]+1),(t-n[1])/(n[3]+1))>1&&!i.find((([n,i,l,o])=>e+1>n&&e-1<l+n&&t+1>i&&t-1<o+i))},pins:[...a(1,13,1,(e=>a(1,20,1,(t=>{if((e+t)%2==0&&L(7.16*e-50,7.57*t-te)>28&&L(1.1*(7.16*e-50),.75*(7.57*t-te))<50)return(e**2+t)%7==0?[7.16*e,7.57*t,1.5,4,0,20,10]:[7.16*e,7.57*t,1.5,4,0,90,30]})))).flat().filter((e=>e))],wallsV:[[45,ye(11),6,4,0,100,60,.4],[77,ye(13),8,4,0,100,60,.4]],wallsH:[[47,ye(13),12,4,0,100,60,.4],[47,ye(3),28,4,0,100,60,.4]],bh:[[50,te,20]],wh:[[15,15,6,3]],on:{tic(){let e=Date.now()/5e3,t=35*g(e)+50,n=35*d(e)+te;pe.pins.map((e=>{L(e[0]-t,e[1]-n)<10?Te(e,.2):xe(e,4,.2)}))},colidePin(e,t){10==e[6]&&(e[2]=2.5,setTimeout((()=>Pe(e,2,1.5,.3)),100)),U+=~~(20*t)}}},{name:"Clones",info:"freed all of them!",async bg(e){this.bg=[];let t=await he(e);if(t&&t.width==z&&t.height==G);else{for(let e=0;e<z;e++)for(let t=0;t<G;t++)f.fillStyle=`hsl(240,100%,${10+20*t/G}%)`,f.fillRect(e,t,1,1);await De(6,.55,35,-128),t=Se(),ce(e,t)}this.bg.push(t)},bgFreq:500,ballStart:[50,te],out:e=>e.x<0||e.x>100||e.y<0||e.y>ee,pins:a(0,7,1,(e=>a(0,10,1,(t=>2<e&&e<5&&3<t&&t<7?0:2!=e&&5!=e||t%2!=0?[12*e+7,12*t+25,2,4,230,0,30]:[12*e+7,12*t+25,1.5,4,0,80,35,1])))).flat().filter((e=>e)),wallsV:[],wallsH:[],bh:[],wh:[[10,10,6,4]],on:{colidePin(e,t,n){if(e[7])e[2]=2.5,t<1&&(n.vx*=2-t,n.vy*=2-t),setTimeout((()=>Pe(e,2,1.5,.3)),100);else{if(e.die)return;e[5]+=50*t,e[6]+=3*t,U+=~~(10*t),e[5]>100&&(e[5]=100,e.die=1,Ke([1e3,0,.5,1,100]),Te(e,.4),Pe(e,6,5),setTimeout((()=>tt(...e)),600))}}}},{name:"Minefield",info:"Caution!",async bg(e){this.bg=[];let t=await he(e);if(t&&t.width==z&&t.height==G);else{for(let e=0;e<z;e++)for(let t=0;t<G;t++)f.fillStyle=`hsl(${240+40*(t/G)**2+40*e/z},100%,${40-t/G*20}%)`,f.fillRect(e,t,1,1);await De(6,.55,0,0,.1,0),je(),t=Se(),ce(e,t)}f.filter=`blur(${R}px)`,a(0,2,1,(e=>{f.putImageData(t,0,0),je("#F22",1,e),this.bg.push(Se())})),f.filter="none"},bgFreq:500,ballStart:[30,136],out:e=>e.x<0||e.x>100||e.y<0||e.y>ee,pins:[[3,95,1.5,4,0,0,30],[22,88,1.5,4,0,0,30],[29,86,1.5,4,0,0,30],...a(0,5,1,(e=>a(0,9,1,(t=>0==e&&0==t||e<4&&t>3?0:[16*e+10,16*t+10,2,1,0,80,40,1,(e+t)%2])))).flat().filter((e=>e)),[58,106,2,1,0,80,40,1]],wallsV:[],wallsH:[],bh:[[43,80,10],[12,90,6]],wh:[[10,10,6,5]],on:{tic(){1==le.length&&pe.pins.map((e=>e[8]&&pe.on.killPin(e)))},colidePin(e,t,n){U+=~~(10*t),e[7]&&(e[2]=3,n.vx*=v(3,3-t),n.vy*=v(3,3-t),setTimeout((()=>{pe.on.killPin(e)}),100))},killPin(e){e[2]=3,Te(e),Pe(e,5,50,.3),Pe(e,6,3,.3)}}},{name:"Solaris",info:"visit Mercury, Earth and Mars in this sequence.",async bg(e){this.bg=[];let t=await he(e);if(t&&t.width==z&&t.height==G);else{let n=50*R,i=te*R;f.fillStyle=Oe(n,i,30*R,n,i,90*R,"#000","#025"),f.fillRect(0,0,z,G),await De(5,.55,-10,0,.1,0),Ne(f,n,i,21*R,Oe(n,i,17*R,n,i,21*R,"#FF0","#F80","rgba(255,0,0,0)")),f.font=`normal ${3.5*R}px Arial, "Liberation Sans", sans-serif`,f.textAlign="center",f.fillStyle="#000";let l="Mercury ⇒ Earth ⇒ Mars";f.fillText(l,66*R-2,15*R-2),f.fillText(l,66*R+2,15*R+2),f.fillStyle="#CEF",f.fillText(l,66*R,15*R),f.globalCompositeOperation="lighter",f.strokeStyle="rgba(255,30,0,.5)",f.lineWidth=1,a(0,P,.1,(e=>{f.save(),f.translate(n,i),f.rotate(e),f.beginPath();let t=I(8,18)*R,l=I(2,7)*R;f.moveTo(15*R+t,0);for(let e=0;e<8;e++)f.ellipse(15*R-e/9,0,t,y(0,l-1.2*e),0,0,P),f.stroke();f.restore()})),f.globalCompositeOperation="source-over",t=Se(),ce(e,t)}this.bg.push(t)},bgFreq:500,ballStart:[90,155],out:e=>e.x<0||e.x>100||e.y<0||e.y>ee,pins:[[50,te,15,1,60,100,50,1],[50,120,4,1,0,10,30,2],[50,135,6,1,240,80,50,3],[50,150,5,1,20,70,40,4],...a(4,20,2,(e=>[22,e,1,7,0,0,90,9,1])),...a(35,95,10,(e=>[e,5,2,3,0,0,40,5])),...a(15,25,10,(e=>[95,e,2,3,0,0,40,5])),...a(5,75,10,(e=>[e,160,2,3,0,0,40,5])),...a(140,150,10,(e=>[5,e,2,3,0,0,40,5]))],wallsV:[[2,3,18,7,0,0,100,.3],[99,ye(20),18,3,220,90,100,.2]],wallsH:[[3,2,20,7,0,0,100,.3],[3,22,20,7,0,0,100,.3],[80,ye(1),18,3,220,90,100,.2]],bh:[],wh:[[12,12,6,1]],on:{tic(){pe.pins.slice(1,4).map(((e,t)=>{let n=Date.now()/(4e3+4e3*t);e[0]=50-d(n)*(t+2)*15,e[1]=te+g(n)*(t+2)*15}))},colidePin(e,t,n){if(1==e[7]&&(e[4]=20,setTimeout((()=>e[4]=60),200),Xe("Ups! You droped in the sun!"),it(n)),5==e[7]&&(U+=20,Te(e),Pe(e,6,10)),[2,3,4].includes(e[7])){if(U+=~~(20*t),e.kick)return;e.kick=1,setTimeout((()=>e.kick=0),300);let i=e[2];e[2]=i+2,Pe(e,2,i,.5),t<1&&(n.vx*=2-t**2,n.vy*=2-t**2);let l=pe.pins.filter((e=>9==e[7]))[0],o=pe.pins[l[8]];4==e[7]&&o==e?(l[7]=0,Te(l),Pe(l,5,10),Pe(l,6,10)):o==e&&(l[8]++,o=pe.pins[l[8]],l[4]=o[4],l[5]=o[5],l[6]=o[6]);let r=e[6];e[6]=100,Pe(e,6,r)}}}}];function Te(e,t=.1,n){e.lowTO&&!n||(e.riseTO&&clearTimeout(e.riseTO),delete e.riseTO,e[3]-=t,e[3]<=0?e[3]=0:e.lowTO=setTimeout((()=>Te(e,t,1)),60))}function xe(e,t,n=.1,i){e.riseTO&&!i||(e.lowTO&&clearTimeout(e.lowTO),delete e.lowTO,e[3]+=n,e[3]>=t?e[3]=t:e.riseTO=setTimeout((()=>xe(e,t,n,1)),60))}function Pe(e,t,n=0,i=2){e[t]-=i,e[t]<=n?e[t]=n:setTimeout((()=>Pe(e,t,n,i)),60)}let Se=()=>f.getImageData(0,0,z,G);function Ie(e,t,n,i,l,o,r){let a,s=(o-(G/2+i*e))/z/e,u=(l-(z/2+n*e))/z/e;for(a=1;a<=r;a++){var f=s*s,c=u*u;if(f+c>4)break;let e=2*s*u+t;s=f-c-t,u=e}return a}function Ce(e,t=.52,n,i,l=200,o=[0,100,50],r=[2,0,0],a=(()=>"0,0%,15%")){n*=R,i*=R;for(let s=0;s<G;s++)for(let u=0;u<z;u++){let c=Ie(e,t,n,i,u,s,l),h=c>l?`hsla(${a(u/z,s/G)},`:`hsla(${o[0]+r[0]*c},${o[1]+r[1]*c}%,${o[2]+r[2]*c}%,`;f.fillStyle=h+"1)",f.fillRect(u,s,1,1),f.fillStyle=h+".5)",f.fillRect(u-1,s,1,1),f.fillRect(u,s-1,1,1)}return f.getImageData(0,0,z,G)}let Le=(e,t)=>4*(z*t+e),Me=(e,t,n,i)=>e[Le(y(v(t,z-1),0),y(v(n,G-1),0))+i];function Ae(e){let t=f.getImageData(0,0,z,G),n=t.data;for(let t=0;t<z;t++)for(let i=0;i<G;i++)for(let l=0;l<4;l++){let o=0;for(let r=0;r<e;r++)o+=Me(n,t+r,i,l)+Me(n,t-r,i,l)+Me(n,t,i+r,l)+Me(n,t,i-r,l);n[Le(t,i)+l]=o/(4*e)}f.putImageData(t,0,0)}async function De(e,t,n,i,l=.3,o=1){if(n*=R,i*=R,o){let l=~~R;l%2!=0&&l--;for(let o=0;o<G;o+=l)for(let r=0;r<z;r+=l){let a=Ie(e,t,n,i,r,o,150)/150;f.fillStyle=`hsla(${150*a+340},100%,${50+50*a}%,${.9*a})`,f.fillRect(r-l/2,o-l/2,l,l)}Ae(l)}f.globalCompositeOperation="lighter";for(let o=0;o<G;o++)for(let r=0;r<z;r++){let a=(Ie(e,t,n,i,r,o,150)/170)**1.5;if(I(1/l)<.01+a&&(r+o)%2==0){let e={r:255,g:255,b:255};I()<.6&&(I()<.3?(e.g=2*(e.r=I(50,100)),e.b=255):(e.r=255,e.g=I(255),e.b=I(e.g))),qe(r,o,(I()+a)**4,e)}}for(let e=0;e<9;e++){let e=~~I(z),t=~~I(G);qe(e,t,23,{r:100,g:200,b:255}),f.beginPath(),f.arc(e+.5,t+.5,6,0,P),f.strokeStyle=f.fillStyle="rgba(100,200,255,.4)",f.lineWidth=1,f.stroke(),f.fillRect(e-1,t-1,3,3)}return f.globalCompositeOperation="source-over",f.getImageData(0,0,z,G)}function qe(e,t,n,i){if(n<1)return f.fillStyle=`rgba(${i.r},${i.g},${i.b},${(n+1)/2})`,f.fillRect(e,t,1,1);for(let l=-(n=$(n));l<=n;l++)f.fillStyle=`rgba(${i.r},${i.g},${i.b},${(1-T(l/(n+1)))**1.5})`,f.fillRect(e+l,t,1,1),f.fillRect(e,t+l,1,1)}function ke(){let e=new ImageData(z,G);for(let t=0;t<G;t++)for(let n=0;n<z;n++){let i=4*(t*z+n);e.data[i+0]=n/z*255,e.data[i+1]=t/G*255,e.data[i+2]=0,e.data[i+3]=255}return e}function Ne(e,t,n,i,l,o){let[r,a]=i.length?i:[i,i];e.beginPath(),e.ellipse(t,n,r,a,0,0,P),e.fillStyle=l,e.fill(),o&&(e.strokeStyle=o,e.stroke())}function Oe(e,t,n,i,l,o,...r){let a=h.createRadialGradient(e,t,n,i,l,o);return r.map(((e,t)=>a.addColorStop(t/(r.length-1),e))),a}function je(e="#711",t=2.5,n=9){f.strokeStyle=e,f.lineWidth=t*R,f.beginPath(),a(0,2,1,(e=>{n!=e&&9!=n||(f.moveTo(32*R,135*R+(11+8.5*e)*R),a(1,17,1,(t=>{let n=t%2==0?11+8.5*e:6+5.5*e,i=P*t/16;f.lineTo(32*R+d(i)*n*R,135*R+g(i)*n*R)})))})),f.stroke()}function Be(e,t){let n=e*R+.8*ne,i=t*R+.8*ie,l=B*R,o=Q*R,r=l+4*o;c.fillStyle="#000",c.beginPath(),c.ellipse(n-r+l,i+r-l,r,l,-b/4,0,P),c.fill();let a=Oe(n+o*B/2,i-o*B/2,l/6,n+o,i-o,1.2*l,"#FFF","#111");h.fillStyle=a,h.beginPath(),h.ellipse(n,i,l,l,0,0,P),h.fill()}function Ee(e,t,n,i,l,o,r,a){Ue(e-j,t,e+j,t+n,i,l,o,r,a)}function He(e,t,n,i,l,o,r,a){Ue(e,t-j,e+n,t+j,i,l,o,r,a)}function Ve(e,t,n,i,l,...o){e.fillStyle=`hsla(${t},${n}%,${i}%,${l})`,e.fill(new Path2D(`M ${o}`))}function Ue(e,t,n,i,l,o,r,a,s=1){t=t*R+ie-.5,n=n*R+ne+.5,i=i*R+ie+.5;let u=(e=e*R+ne-.5)+E.x*l/2,f=t+E.y*l/2,w=n+E.x*l/2,m=i+E.y*l/2;Ve(h,o,r,a/2,.8*s,e,t,n,t,n,i,e,i),Ve(h,o,r,(a+100*(1-Q))/2,s,u,f,w,f,w,m,u,m),E.x>0&&Ve(h,o,r,a/2,s,e,t,u,f,u,m,e,i),E.x<0&&Ve(h,o,r,(a+100)/2,s,n,t,w,f,w,m,n,i),E.y<0&&Ve(h,o,r,a/1.5,s,e,i,u,m,w,m,n,i),E.y>0&&Ve(h,o,r,(2*a+100)/3,s,e,t,u,f,w,f,n,t);let b=10*Q*R;Ve(c,0,0,0,1-(1-s)**2,e,t,n,t,n,i,n-b,i+b,e-b,i+b,e-b,t+b)}function Ye(e,t,n,i,l,o,r){n*=R;let a=e*R+ne,u=t*R+ie,f=a+E.x*i/2,w=u+E.y*i/2,m=Q*i*2*R;c.beginPath(),c.moveTo(a,u),c.lineTo(a-m,u+m),c.strokeStyle="#000",c.lineWidth=2*n,c.lineCap="round",c.stroke(),h.beginPath(),h.moveTo(a,u),h.lineTo(f,w);let d,g,$,p,v=h.createLinearGradient(a+E.yi*n,u-E.xi*n,a-E.yi*n,u+E.xi*n);d=r/2,g=1.5*r,$=r/2;let y=x(E.y,E.x);T(y)<.25*b?(p=(.25*b+y)/(.5*b),d=s(r/2,(r+100)/2,p),g=s(r/5,r/2,p),$=s(r/2,r/5,p)):T(y)>.75*b?(p=(y<0?-y-.75*b:.5*b-(y-.75*b))/(.5*b),d=s(r/5,r/2,p),g=s(r/2,(r+100)/2,p),$=s((r+100)/2,r/2,p)):y<0?(p=(.75*b-y)/(.5*b)-2,d=s(r/2,r/5,p),g=s(r/5,r/2,p),$=s(r/2,(r+100)/2,p)):(p=-(y-.75*b)/(.5*b),d=s(r/2,(r+100)/2,p),g=s((r+100)/2,r/2,p),$=s(r/2,r/5,p)),v.addColorStop(0,`hsl(${l} ${o}% ${d}%)`),v.addColorStop(.5,`hsl(${l} ${o}% ${g}%)`),v.addColorStop(1,`hsl(${l} ${o}% ${$}%)`),h.strokeStyle=v,h.lineWidth=2*n,h.lineCap="round",h.stroke(),h.fillStyle=`hsl(${l} ${o}% ${s((2*r+100)/3,r/3,Q)}%)`,h.beginPath(),h.ellipse(f,w,n,n,0,0,P),h.fill()}function _e([e,t,n]){t=t*R+ie;let i=(e=e*R+ne)-E.x*n*.4,l=t-E.y*n*.4;Ne(h,e,t,1.5*(n*=R),Oe(e,t,1.5*n,i,l,n/3,"rgba(0,0,0,0)","rgba(0,0,200,.3)","#05C","#0CF")),h.lineWidth=1,h.strokeStyle=Oe(e,t,1.5*n,i,l,n/3,"rgba(0,180,255,.2)","#0CF"),h.beginPath(),a(0,P,b/6,(o=>{h.moveTo(e+1.5*n*g(o),t+1.5*n*d(o)),h.bezierCurveTo(e+n*g(o)/2,t+n*d(o)/2,i,l,i,l)})),a(.2,.8,.2,(o=>{let r=1-o,a=e*o+i*r,s=t*o+l*r,u=1.5*n*o+n/3*r;h.moveTo(a+u,s),h.ellipse(a,s,u,u,0,0,P)})),h.stroke()}function Je([e,t,n]){Ne(h,e=e*R+.85*ne,t=t*R+.85*ie,2*(n*=R),Oe(e,t,2*n,e,t,1.2*n,"rgba(255,0,0,0)","#000")),a(0,P,b/n**.8,(i=>{let l=500+i%1*400,o=(l-Date.now()%l)/l;h.fillStyle=`rgba(255,200,0,${1-o})`,h.fillRect(e+(n+o*n)*g(i),t+(n+50*o)*d(i),2,2)}))}let We,Re,ze=t&&window.speechSynthesis;function Ge(e,t=1){if(We){let n=new SpeechSynthesisUtterance(e);n.voice=We,n.rate=t,ze.speak(n)}}function Xe(e){postMessage(["tts",e])}function Ke(...e){postMessage(["play",e])}function Qe(e=2,t=0,n=1,i=1,l,o,r){setTimeout((()=>{let t=Re.currentTime,a=Re.createOscillator(),s=Re.createGain();a.frequency.value=0,a.frequency.setValueAtTime(e,t),a.frequency.linearRampToValueAtTime(l||e,t+(o||i)),s.gain.setValueAtTime(n,t),s.gain.linearRampToValueAtTime(0,t+(r||i)),a.connect(s),s.connect(Re.destination),a.start(),setTimeout((()=>a.disconnect()),1e3*(r||i))}),1e3*t)}function Ze(){We=ze&&ze.getVoices().find((e=>"en-US"==e.lang)),Re=new AudioContext,Qe()}function et(){a(14,28,2,(e=>Qe(100*e,e/25,.6,.3)))}function tt(e,t){let n={};return le.push(n),e?[n.x,n.y,n.vx,n.vy]=[e,t,0,0]:nt(n),Ke([800,0,.5,.6],[3e3,0,.3,.6],[800,.3,1,.3],[1200,.5,1,.5]),n}function nt(e,t=null){if([e.x,e.y]=pe.ballStart,null!=t){let n,i,l;t>0&&(t<7&&(t-=1,n=v(6,le.length-1),l=2.3),t>6&&t<20&&(t-=7,n=v(13,le.length-7),l=4.5),t>19&&t<40&&(t-=20,n=v(20,le.length-20),l=6.7),t>39&&(t-=40,n=le.length-40,l=9),i=P*t/n,e.x+=d(i)*B*l,e.y+=g(i)*B*l)}return e.vx=0,e.vy=0,e}function it(e){Ke([1600,0,.8,1,200]),le=le.filter((t=>t!=e)),le.length||(Y--,Y>0?setTimeout(tt,1500):setTimeout(ot,1500))}t&&(we.on_play=e=>e.map((e=>Qe(...e))),we.on_tts=Ge);let lt=0;function ot(){return rt("over"),lt=1,Ke([500,0,.8,.6],[5e3,0,.2,.6],[400,.2,.8,.6],[4e3,.2,.2,.6],[300,.4,.8,.6],[3e3,.4,.2,.6],[200,.6,.8,2],[600,.6,.2,2])}function rt(e,t){postMessage([e,t])}if(!t){let e=1e3,t=150;le=[{x:0,y:0,vx:0,vy:0}],onmessage=function(e){let[t,i]=e.data;n[t]&&n[t](i)};let n={start(e){U=0,i(e?parseInt(e[1]):0),setInterval(l,9)},gravity(e){E=e},goLvl(e){i(e)}};function i(e){ve=e,pe={},Fe[e].counter||(Fe[e].counter=0),Fe[e].counter++,Object.entries(Fe[e]).map((([e,t])=>{pe[e]=t.letructor==Array?JSON.parse(JSON.stringify(t)):t})),rt("setLvl",e),le=le.map(nt)}function l(){J++,pe.on.tic&&pe.on.tic(),lt||le.map((e=>{let t;if(e.vx+=E.x/2e3,e.vy+=E.y/2e3,e.vx*=.999,e.vy*=.999,e.x+=e.vx,e.y+=e.vy,t=pe.wh.find(r(e)))return pe.on.beforeWH&&pe.on.beforeWH(t),lt=1,rt("lvlFadeOut"),setTimeout((()=>i(t[3])),2e3),setTimeout((()=>rt("lvlFadeIn")),2e3),setTimeout((()=>lt=0),4e3),Ke([200,0,1,1.3,2e3],...a(200,1e3,100,(e=>[e,e/1e3,.5,.3])));le.filter((t=>t!=e)).map((t=>s(e,t))),pe.pins.filter(o).map((t=>f(e,t))),pe.wallsV.map((t=>c(e,t))),pe.wallsH.map((t=>h(e,t))),(t=pe.bh.find(r(e)))&&it(e),pe.out(e)&&it(e)})),U>=e&&(e*=2,Y<3&&(Y++,Ke([500,.6,1,.5],[700,.7,1,.5],[900,.8,1,.5],[1100,.9,1,.5]),Xe("Life up!"))),U>=t&&(t=t<800?2*t:300*~~(t/200),Xe("New ball!"),tt(...pe.ballStart)),J%2==0&&rt("update",{balls:le.map(u),curLevel:(()=>{let e={...pe};return delete e.bg,delete e.on,delete e.out,e})(),points:U,lives:Y})}function o(e){return e[3]>.2}function r(e){return t=>m(e,{x:t[0],y:t[1]})[2]<t[2]}function s(e,t){let[n,i,l,o]=m(e,t),r=2*B;if(l<r){e.x=t.x+o.x*r,e.y=t.y+o.y*r,[e.vx,e.vy,t.vx,t.vy]=[.9*t.vx,.9*t.vy,.9*e.vx,.9*e.vy];let n=b(t.vx-e.vx,t.vy-e.vy);if(n>.02){let e=v(n**2,1);Ke([1200,0,e,.2],[6030,0,e/5,.2])}}}function f(e,t){let[n,i,l]=t,[o,r,a,s]=m(e,{x:n,y:i}),u=B+l;if(a<u){let l=.8*b(e.vx,e.vy);if(e.vx=l*s.x,e.vy=l*s.y,e.x=n+s.x*u,e.y=i+s.y*u,l>.01){pe.on.colidePin&&pe.on.colidePin(t,2*l,e);let n=v((2*l)**2,1);Ke([1200,0,n/5,.4],[1500,0,n,.2],[8e3,0,n/5,.2])}}}function c(e,[t,n,i]){let l=e.x-t;if(T(l)<B+j&&n<e.y+B&&e.y-B<n+i){let o=1;n>e.y&&(o=1-((n-e.y)/B)**2),e.y>n+i&&(o=1-((e.y-(n+i))/B)**2),e.vx*=-.8,e.x=t+p(l)*(B+j*o),T(e.vx)>.01&&w(e.vx)}}function h(e,[t,n,i]){let l=e.y-n;if(T(l)<B+j&&t<e.x+B&&e.x-B<t+i){let o=1;t>e.x&&(o=1-((t-e.x)/B)**2),e.x>t+i&&(o=1-((e.x-(t+i))/B)**2),e.vy*=-.8,e.y=n+p(l)*(B+j*o),T(e.vy)>.01&&w(e.vy)}}function w(e){Ke([500,0,e=v((2*e)**2,1),.3],[1300,0,e/5,.3])}function m(e,t){let n=e.x-t.x,i=e.y-t.y,l=b(n,i);return[n,i,l,{x:n/l,y:i/l}]}function b(e,t){return F(e*e+t*t)}rt("alive")}if(t){function t(e){for(e=""+~~e;e.length<6;)e="0"+e;return e}let i;function l(){let e=M.createElement("a");e.id="tweet",e.innerText="Tweet your score!",e.href="https://twitter.com/intent/tweet?text="+encodeURIComponent(`I did reach ${U} points on the SpacePinball game!\n`+D('link[rel="canonical"]').href+"\n#js13k"),A.appendChild(e)}we.on_setLvl=e=>{pe={...Fe[e]},pe.name&&Ge("Moving to "+pe.name),pe.info&&Ge(pe.info,.8),pe.curBG=0,f.mustUpdate=1,i&&clearInterval(i),i=setInterval((()=>{pe.curBG++,pe.bg&&(pe.curBG>=pe.bg.length&&(pe.curBG=0),f.mustUpdate=1)}),pe.bgFreq||100)},e.tic=function(){if(requestAnimationFrame(e.tic),oe.innerHTML=`<t>Points: ${t(U)}</t><span>${a(1,3,1,(e=>Y<e?"<d>🚀</d>":"<l>🚀</l>")).join("")}</span><t>Record: ${t(_)}</t>`,!pe)return;f.mustUpdate&&(f.clearRect(0,0,z,G),f.putImageData(pe.bg[pe.curBG],0,0),f.mustUpdate=0),c.clearRect(0,0,z,G),h.clearRect(0,0,z,G),Q=(20-E.x+E.y)/40,ne=-E.x*R,ie=-E.y*R,k.style.transform=`translate(${ne}px, ${ie}px)`,k.style.filter=`brightness(${.6+(1-Q)/2})`,n||(q.style.transform=`rotateX(${2*E.x}deg) rotateY(${2*E.y}deg)`);let i=[...pe.pins.map((e=>[Ye,...e])),...pe.wallsV.map((e=>[Ee,...e])),...pe.wallsH.map((e=>[He,...e])),...le.map((e=>[Be,...e]))];i=E.x>0&&E.y<0?i.sort((([e,t,n,i],[l,o,r,a])=>(e===Ee&&t<o&&(n+=i),l===Ee&&t>o&&(r+=a),1e3*n-t<1e3*r-o?-1:1))):E.x>0&&E.y>0?i.sort((([e,t,n,i],[l,o,r,a])=>(e===Ee&&t>o&&(n+=i),l===Ee&&t<o&&(r+=a),1e3*n+t<1e3*r+o?1:-1))):E.x<0&&E.y<0?i.sort((([e,t,n],[i,l,o])=>e===Ee||i===Ee?t<l?-1:1:1e3*n+t<1e3*o+l?-1:1)):i.sort((([e,t,n],[i,l,o])=>e===Ee||i===Ee?t<l?-1:1:1e3*n-t<1e3*o-l?1:-1)),pe.bh.map(Je),pe.wh.map(_e);let l=e=>e[4]<.2&&e[0]!=Be;i.filter(l).map((([e,...t])=>e(...t))),i.filter((e=>!l(e))).map((([e,...t])=>e(...t)))},we.on_update=e=>{U=e.points,Y=e.lives,le=e.balls,Object.assign(pe,e.curLevel)},we.on_lvlFadeOut=()=>A.classList.add("lvl-fade"),we.on_lvlFadeIn=()=>A.classList.remove("lvl-fade"),we.on_over=()=>{setTimeout((()=>Ge("Sorry... Game Over.")),1e3),A.classList.add("over"),setTimeout(l,4e3)},n?window.addEventListener("devicemotion",(e=>{let t=e.accelerationIncludingGravity,n=(4*E.x-t.x)/5||0,i=(4*E.y+t.y)/5||0;isNaN(n)||isNaN(i);let l=L(n,i);E={x:n,y:i,xi:n/l||0,yi:i/l||0},we.$("gravity",E)})):A.addEventListener("mousemove",(e=>{let t=A.clientWidth,n=A.clientHeight,i=10*(n/2-e.pageY)/(n/2),l=y(v(10*(-t/2+e.pageX)/(n/2),10),-10),o=L(i,l);E={x:i,y:l,xi:i/o||0,yi:l/o||0},we.$("gravity",E)}))}