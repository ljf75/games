class Camera{constructor(){this.middle={},this.targetIsDude()}update(){this.targetisdude?setV(this,addV(nP,Dude)):setV(this,player),setV(this.middle,subV(this,middle))}position(e){return subV(e,this.middle)}isOnScreen(e,t){return!(!range(e.x,t,mainCanvas.width)||!range(e.y,t,mainCanvas.height))}targetIsDude(){this.targetisdude=!0}targetIsVessel(){this.targetisdude=!1}}class BasicObject{constructor(e,t,a,r,s,n){this.x=e,this.y=t,this.img=r,this.active=!0,this.hue=0,this.id="",this.setSize(a),this.setTandA(s,n)}setSize(e){this.size=e,this.half=e/2}setTandA(e,t){this.text=e,this.fra=t}setCollider(){this.collider=!0,this.collidersize=.65*this.size,this.talkrange=.8*this.size}}class AnimObject extends BasicObject{constructor(e,t,a,r,s,n){super(e,t,a,r[0],s,n),this.bearing=0,this.animRate=5,this.setFrames(r),this.counter=0,this.boarded=!0,this.left=!0}setFrames(e){this.fcount=0,this.frames=e,this.img=e[0]}display(e){if(this.planetMode)nP&&nP.sortFeatures(),this.draw(this);else{let t=camera.position(this,this.half);camera.isOnScreen(t,this.half)&&this.draw(t,e)}}draw(e,t){this.hat&&this.hat.draw(addV(e,this.hat)),this.drawMe(e.x,e.y,t),this.updateAnimation(),this.counter++}drawMe(e,t,a){this.active&&transform(xy(e,t),()=>{this.displayChildren(a),hue(this.hue),this.left||mCtx.scale(-1,1),image(this.img,0,0,this.half,this.size)},this.bearing)}displayChildren(e){null!=e&&this.boarded&&e.forEach(e=>{e.drawMe?e.draw(e):e.display()})}updateAnimation(){this.counter%this.animRate==0&&(this.img=this.frames[this.fcount],this.fcount=(this.fcount+1)%this.frames.length)}}class Soe extends BasicObject{constructor(e,t,a,r,s,n){super(e,t,r,a,s,n),this.setCollider(),this.berries=randi(1,4)}lootBerry(){for(let e=0;e<this.berries;e++)AddToInventory({name:this.berry,type:"berry"});this.talker=void 0}berryText(){return["this tree has "+this.berry.replace("berry","")+"berries.","You picked "+this.berries+" "+plural(this.berry)+"."]}display(){this.active&&(transform(xy(this.x,this.y),()=>{hue(this.hue),image(this.img,0,0,this.half,this.size)}),this.edible&&this.interact())}}class Vessel extends AnimObject{constructor(e,t,a,r,s,n){super(e,t,a,r,s,n),this.throttle=0,this.mass=VesselMass,this.crashThreshold=CrashThreshold/this.mass,this.flame=new AnimObject(0,55,50,FlameAnimation),this.children=[this.flame],this.gravity=!0,this.radar=!1,this.crashed=!1,this.stop()}update(){if(this.crashed)this.display();else{if(this.findNearestPlanet(),this.gravity&&this.applyGravity(),this.throttle>0){let e=xy(this.vx+this.throttle*Math.sin(this.bearing),this.vy+this.throttle*Math.cos(this.bearing)),t=dist(zero,e);t<=SpeedLimit?(this.vx=e.x,this.vy=e.y):(this.vx=e.x*SpeedLimit/t,this.vy=e.y*SpeedLimit/t)}this.flame.y=20+Math.min(20*this.throttle,40),this.x+=this.vx,this.y-=this.vy,this.display(this.children)}}applyGravity(){if(nP){let e=dist(this,nP);if(e>=nP.mass)nP=void 0;else{let t=nP.getGravityFor(this,e);if(this.landed)this.stop();else{let e=directionFromObjectToObject(nP,this);this.vx+=t*e.x,this.vy+=t*e.y}}}}stop(){this.vx=0,this.vy=0}crash(){this.crashed=!0,crashtext=rfar(FailTextList),this.crashFrame=this.counter,this.setFrames(CrashAnimation)}findNearestPlanet(){this.counter%2==0&&(this.onradar=[],planets.forEach(e=>{let t=dist(this,e);t<e.mass&&(nP=e),e.d2p=flo(t),e.d2p<closestPlanet.d2p&&(closestPlanet=e),this.radar&&(t>e.r+RadarMin&&t<e.r+RadarMax?this.onradar.push(e):e.visited&&this.onradar.push(e))}))}displayRadar(){if(this.radar&&this.boarded){let e=[],t=24;this.onradar.forEach(a=>{if(a.d2p>=a.r+RaDist){let r,s=1,n=directionFromObjectToObject(this,a),i="",l=t*flo((middle.y+RaDist*n.y)/t);if(a.visited&&(i=" (visited)",r="#6e6"),a.d2p<8e4||a==HomePlanet){s=Math.max(1,9-flo(a.d2p/1e4));let r=8;for(;e.includes(l)&&r>0;)l+=t,r--;e.push(l)}a!=HomePlanet?r+=s:r="#aae",transform(xy(middle.x+RaDist*-n.x,l+30),()=>{mCtx.beginPath(),mCtx.strokeStyle="#eee",mCtx.moveTo(20*-n.x,20*n.y),mCtx.lineTo(50*-n.x,50*n.y),mCtx.stroke(),mCtx.font="bold 12px Arial",SplitText("planet "+a.name+"\n"+i+" ("+a.d2p+")",-35,0,r,12)})}})}}plusThrottle(){this.throttle=Math.min(this.throttle+PlayerAcceleration,AccelerationLimit)}minusThrottle(){this.throttle=Math.max(player.throttle-PlayerDeceleration,0)}rotate(e){this.bearing=(this.bearing-e)%TWO_PI}resetPos(e,t){this.crashed=!1,this.x=e,this.y=t,this.bearing=0}}class Envelope{constructor(e,t,a,r){this.a=e,this.d=t,this.r=r,this.s=a,this.aS=e*samp,this.dS=t*samp,this.rS=r*samp,this.rT=this.aS+this.dS}level(e){return e<this.aS?e/this.aS:e<this.rT?1-(1-this.s)*(e-this.aS)/this.dS:this.s*(1-(e-this.rT)/this.rS)}}class Planet{constructor(e,t,a,r,s,n){if(s||(s=rand(350,460)),this.r=s,this.mass=rand(800,2e3),this.half=0,this.x=e,this.y=t,this.d2p=-1,this.bobsMuffined=0,this.totalBobs=0,this.prizeAwarded=!1,!r){for(r=rfar(PlanetNames);usedPlanetNames.includes(r);)r+=flo(rand(100));usedPlanetNames.push(r)}this.name=r,this.features=[],this.hue=flo(rand(360)),this.make(),this.setupScenery(n),this.setLang("Onian"),this.music(),planets.push(this)}music(){let e=[],t=randi(4),a=newkey(randi(12),t),r=newkey(a.root+1+2*randi(3),t),s=randi(2,5);for(let t=0;t<s;t++)e.push(nOf(6*t%7,a).scale);for(let t=(s=randi(2,5))-1;t>=0;t--)e.push(nOf(3*t%7,r).scale);this.m={scales:e,nL:rand(.5),cType:randi(2),pF:randi(280,450),cF:randi(200,1125),cDetune:rand(1e-7,35e-7),t:rand(.1,1)},this.m.barlength=randi(3200,6600),getRhythm(this.m,this.m.barlength,rand(.3,1)),this.m.patt=getNotePattern(this.m),ch(.09)?this.m.patt2=this.m.patt:ch(.26)?this.m.patt2=reverse(this.m.patt):this.m.patt2=getNotePattern(this.m)}populate(){if(ch(.47)){let e,t=randi(1,3),a=rand(30,70);this.reputation=0;for(let r=0;r<t;r++){let r=randi(1,3);ch(.15)&&(r=randi(1,4)),this.addFeature(new Soe(0,0,home_png,70),a+5);for(let s=0;s<r;s++){let s=a+randi(-5,5),n=this.addFeature(new AnimObject(0,0,s,poses[0]),a);planetMode(n,!0),n.muffin=!1,1==t&&1==r?(e=n,n.knownlng=rfar(alllngs),n.hat=new AnimObject(0,.4*-s,.2*s,Hat),n.setTandA(["I am a sage","..."],()=>{textCounter=0,aT=void 0;let e=know(this.lng),t=know(n.knownlng);e&&!t?teach(n.knownlng):!e&&t&&teach(this.lng)})):(this.totalBobs++,n.setTandA(NegGreetings,()=>{if(!know(this.lng))return;let e=haveType(1,"muffin");n.muffin||e&&(n.setFrames(poses[randi(1,4)]),n.muffin=!0,inventory[e.name].num--,RefreshInventory(),this.bobsMuffined++,n.setTandA(["Oh!\nA muffin! For me?","Thank you!"],()=>{n.setTandA([rfar(Greetings)],()=>{if(this.bobsMuffined==this.totalBobs&&!this.prizeAwarded){this.prizeAwarded=!0;let e=this.lng+" "+rBerry()+" spice";textCounter=0,aT=void 0,aT2=["Everyone on this planet\nloves you!","You deserve a prize","Obtained a "+e],AddToInventory({name:e,type:"spice"})}})}),textCounter=0,doneAction=!1)}))}}}}posIsInWater(e){let t=this.toScale(e.y),a=this.toScale(e.x),r=this.water[a+1][t];return r&&(this.previous[a][t+1]=180),r}toScale(e){return flo(50*(e+this.r)/(2*this.r))}make(){this.rainRate=randi(1,20),this.counter=0,this.planet=scanv(),this.planet2=scanv(),this.water=[],this.current=[],this.previous=[];let e=getCtx(this.planet),t=getCtx(this.planet2);this.ctx=e,t.fillStyle=black;for(let a=0;a<50;a++){this.water[a]=[],this.current[a]=[],this.previous[a]=[];let r=rand(a),s=rand(a%30),n=rand(0,10),i=!1;for(let l=0;l<50;l++){if(this.current[a][l]=0,this.previous[a][l]=0,dist(xy(l,a),xy(25,25))<25){i||(i=!0,ch(.5)&&(this.water[a][l]=!0));let n=`#${randi(3,7)}8cf`;(l<r||l>s)&&(n="#8bef"),e.fillStyle=n,e.fillRect(l,a,1,1),t.fillRect(l,a,1,1),(l>0&&a>0&&ch(.005)||this.water[a][l-1]&&ch(.7)||this.water[a-1][l]&&ch(.3))&&this.makeWater(a,l)}s+=rand(-n,n)}}for(let e=0;e<49;e++)for(let t=0;t<49;t++)this.water[e][t]&&(ch(.4)&&this.makeWater(e-1,t),ch(.4)&&this.makeWater(e,t-1),ch(.4)&&this.makeWater(e+1,t),ch(.4)&&this.makeWater(e,t+1));this.outMin=120,this.outMax=225}makeWater(e,t,a){dist(xy(e,t),xy(25,25))<25&&(this.water[e][t]=!0,this.ctx.fillStyle="#ca8f",this.ctx.fillRect(e,t,1,1))}addFeature(e,t){return t&&this.spot(e,t),this.features.push(e),this.sortFeatures(),e}spot(e,t){setV(e,this.findAvailableSpot(t))}sortFeatures(){let e=[this.features[0]];for(let t=1;t<this.features.length;t++){let a=this.features[t],r=!1,s=0;e.forEach(t=>{!r&&a.y+a.half<t.y+t.half&&(e.splice(s,0,a),r=!0),s++}),r||e.push(a)}this.features=e}rPos(){return rand(-this.r,this.r)}findAvailableSpot(e,t){let a,r=!1;for(;!r;){t||(t=.5),a=this.rInRange(t);let s=!0;for(let t=0;t<this.features.length;t++){let r=dist(a,this.features[t]);"tree"==this.features[t].id?r<50&&(s=!1):this.features[t]!=Dude&&r<e&&(s=!1)}r=s}return a}setupScenery(e){e||(e=3),this.treeFamily=createNewTreeType();let t=randi(e,e+6),a=rfar(BerryNames);for(let e=0;e<t;e++){let e=this.addFeature(new Soe(0,0,{img:rfar(this.treeFamily)},200),50);e.collider=!1,e.talker=!0,e.talkrange=34,e.berry=a+" berry",e.setTandA(e.berryText(),e.lootBerry),e.id="tree"}this.sortFeatures()}rSurf(e){return xy(this.rPos()*e,this.rPos()*e)}rInRange(e){let t=this.rSurf(1);for(;dist(zero,t)>e*this.r;)t=this.rSurf(1);return t}setLang(e){this.lng=e,this.hue=30*alllngs.indexOf(this.lng)+rand(-1,1)}update(){let e=camera.position(this);if(camera.isOnScreen(e,this.mass)){transform(e,()=>{hue(this.hue),fill("#5593"),mCtx.beginPath(),circ(0,0,this.mass),mCtx.fill(),mCtx.globalCompositeOperation="destination-out",mCtx.drawImage(this.planet2,-this.r,-this.r,4*this.r,4*this.r),transform(zero,()=>{mCtx.globalCompositeOperation="xor",mCtx.drawImage(this.planet,-this.r,-this.r,4*this.r,4*this.r),this.features.forEach(e=>displayShadow(e))})}),transform(e,()=>{hue(this.hue),this.features.forEach(e=>e.display())});let t,a=0,r=this.ctx.getImageData(0,0,50,50),s=r.data;if(this.counter%this.rainRate==0&&(this.previous[flo(rand(50))][flo(rand(50))]=this.outMin+5),this.counter%5==0){for(let e=1;e<49;e++)for(let r=1;r<49;r++)this.current[e][r]=(this.previous[e-1][r]+this.previous[e+1][r]+this.previous[e][r-1]+this.previous[e][r+1])/2-this.current[e][r],this.current[e][r]=.7*this.current[e][r],this.water[e][r]&&(a=4*(50*r+e),t=flo(this.outMin+(this.outMax-this.outMin)*this.current[e][r]/255),t=flo(255-.5*t),s[a]=t,s[a+1]=.9*t,s[a+2]=.9*t,s[a+3]=255);this.ctx.putImageData(r,0,0);let e=[];for(let t=0;t<50;t++){e[t]=[];for(let a=0;a<50;a++)e[t][a]=this.previous[t][a],this.previous[t][a]=this.current[t][a],this.current[t][a]=e[t][a]}}this.counter++}}getGravityFor(e,t){if(!(t<this.r))return e.landed=!1,GravityConstant*(this.mass*e.mass)/sq(t);dist(zero,vxy(e))>e.crashThreshold&&!e.crashed&&e.crash(),e.crashed||(this.visited=!0),e.landed=!0;return 0}removeDude(){for(let e=this.features.length-1;e>=0;e--)if(this.features[e]==Dude){this.features.splice(e,1);break}}}let all_colors=["#00000000","#7fc5fff01","#3fff7cf01","#d89d84f01","#ffb99bf01","#a57865f01","#a9cc78f01","#ccb87af01","#366391f01","#229946f01","#c4f8fff01","#fffcbff01","#ff9568f01","#ffbe68f01","#7ffffff01","#3dff60f01","#baffd0f01","#77ffa4f01","#ffc65ef01","#ff9b49f01","#ff4744f01","#ffe16bf01"],fire1_png={w:20,t:"01132:1300132:1301122:1301112;1202142111241201152112221301152112221301120011211222110010011200112014201203110111201100112011051001112011001408140113081302130813021308130212091302120:1103120:11",c:[0,1,2]},fire2_png={w:20,t:"02122:1202122;1101122211271200122113261200122113221121120012201323160017231502162216021720170113001221170113001;0211011<0210011601130310011601130615021207140312071304120713051008110611",c:[0,1,2]},home_png={w:25,t:"0=120?1;0:172114073112291206322<1205332<130311322<12021220332;310211223327340211243320371102112539211102112732261102112232211123322011021121332111213420110211213321112134201102112133211121342012001221332111213321120011213421112131241421342111281634211128183221112918312111281000182211270219211125091821",c:[0,3,4,5]},leaf1_png={w:6,t:"041101120111201000112011001020110112",c:[0,6,7]},player1_png={w:20,t:"0_150<170:18091:081;06132010201120102011051322112211051420132012051=05152214051:001105110017001105110111021100110511011102110011091102110<1102110<1102110<120112",c:[0,8,9]},player2_png={w:20,t:"0s150<170:18091:081;06132010201120102011051322112211051420132012051=05152214051:001105110017001105110111021100110511011102110011091102110<1102110<120112",c:[0,8,9]},star1_png={w:10,t:"0I11062110041121110221150121112111031121",c:[0,10,11]},star2_png={w:10,t:"0>11071107112103211121032113041404120711",c:[0,10,11]},trunkbit_png={w:6,t:"0113221221132113211400",c:[0,12,13]},vessel_png={w:24,t:"0k130B160@170>190<20190;201;09211;08221;07231;2005241:22042518230525162405261425062@072>092<0<290>27",c:[0,14,15]},vessel2_png={w:24,t:"0i180=1:0;1;0;1;0:1<09201<08211<2006221<2006221<2104231;2303231:2403241825032C032C032C032C042B052@0<27",c:[0,14,15]},walk_down_1_png={w:20,t:"0s150<170:18091:071<0613201020112010201104142211221102100015201320120214001:03120112221100110817001108170012081102110<1102110<1101120<110A12",c:[0,8,9]},walk_down_2_png={w:20,t:"0_150<170:18091:081<05132010201120102012041322112213021520132014021=00110212001222130011021101170310021200170811011102110<1102110<1102110<1201110A110@12",c:[0,8,9]},walk_left_1_png={w:20,t:"0s150<170:180:19081;071;0620102010201020150622102215061;081:0819091400130;1101120<1200110=1200110A120?13",c:[0,8,9]},walk_left_2_png={w:20,t:"0_150<170:180:19081;071;0620102010201020150622102215061;081:08190;170:180:1202110;11031309110313091205100813",c:[0,8,9]},walk_up_1_png={w:20,t:"0s150<170:18091:071<061=041>0210001>0214001:0312011700110817001108170012081102110<1102110<1101120<110A12",c:[0,8]},walk_up_2_png={w:20,t:"0s150;18091:081<051>041?021@021=0011021200190011021101170310021200170811011102110<1102110<1102110<1201110A110@12",c:[0,8]},branchbit_png={w:6,t:"061301150212",c:[0,12]},chapo_png={w:5,t:"01120014",c:[16,17,0]},chapo2_png={w:5,t:"05102210",c:[0,16,17]},cracker_png={w:10,t:"0213051403170118001L001802150711",c:[0,18]},crash1_png={w:20,t:"0K130?130122082113002308230220350524012035002200122410350023122412320123122412322001223221162300223221162301213412001200220121113212201223011332002600210113322700210115270515270:27",c:[0,19,20,21]},crash2_png={w:20,t:"0`1100130921180723180530241030160332233017023327140135271021100133122:01321627023018250417312112051102331408113314071333211008133223091133240;3200230@21",c:[0,20,19,21]},crash3_png={w:20,t:"03120125071426310415253303162312310317011431011831153001173215300215321630021334170214341130130216351303163413033114351104312111370031032436003302250031233302302500253203302400253107210223",c:[0,20,21,19]},all_images=[fire1_png,fire2_png,home_png,leaf1_png,player1_png,player2_png,star1_png,star2_png,trunkbit_png,vessel_png,vessel2_png,walk_down_1_png,walk_down_2_png,walk_left_1_png,walk_left_2_png,walk_up_1_png,walk_up_2_png,branchbit_png,chapo_png,chapo2_png,cracker_png,crash1_png,crash2_png,crash3_png];const poses=[[player1_png,player2_png],[walk_left_2_png,walk_left_1_png],[walk_down_2_png,walk_down_1_png],[walk_up_1_png,walk_up_2_png]],Hat=[chapo_png,chapo2_png],VesselAnimation=[vessel_png,vessel2_png],FlameAnimation=[fire1_png,fire2_png],CrashAnimation=[crash1_png,crash2_png,crash3_png],StarAnimation=[star1_png,star2_png],FailTextList=["Ouch!","Don't scratch the car. -Mom.","It takes up to 4000 units of space to stop"],gpPart="gear #5b8gh9",HomeText=["This is my home.","Goood oleee hooooome"],Son2Text=["Son II: Hi brother","Have fun out there","Me? Fly?","Pfft"],GrandpaText2=["Hi grandson"],ShopText=["Welcome to the shop","Need parts?","zzz"],ShopRect={x:200,y:200},cash="coin",woosh=100,Greetings=["hello","hi!","<3"],NegGreetings=["pff","mmhmm"],c1=48,alllngs=["Onian","Deotruin","Shuecdun","Uetnesh","Etlani","Flonaonathi","Uqoirtic"],TreeCanvasW=100,TreeCanvasH=100,PlayerAcceleration=.045,PlayerDeceleration=.2,PlayerRotateRate=.14,PlayerRotateRate2=.24,AccelerationLimit=3,SpeedLimit=60,PlayerWalkVelocity=4,PlayerStartX=50,PlayerStartY=50,PlayerSize=100,DudeSize=50,HopDistance=60,CrashAnimLength=120,CrashThreshold=18,VesselMass=.8,RaDist=250,RadarMin=200,RadarMax=2e4,TopText={x:4,y:16},TextBox={x:350,y:100},font=15,GravityConstant=50,PlanetNames=["Nuchearus","Binvethea","Eccurn","Hinomia","Haotov","Peiyama","Llenigawa","Garvis","Lloria"],BerryNames=["red","blue","orange","yellow","black"],FarRange=36e3,NumStars=16,PI=Math.PI,TWO_PI=2*Math.PI,grey="#eee8",white="#fff9",bgFill="#2a1f42",black="black",tbFill="#445c",defaultScales=[[0,1,3,4,6,7,9,10]],patterns=[[0,1,2,3],[0,1,0],[1,2,1,3],[1,3,5,3,1],[4,3,2,1],[2,3,1],[0,2,4]],defoctave=4;let player,camera,closestPlanet,planets=[],genplanets=[],gamestate="startscreen",scount=0;window.onload=(()=>{loadImages(),setupCanvas(),setInterval(run,40)});let autopilotPhase,slowframes,key,crashtext,aT,aT2,Dude,nP,aCtx,samp,mu,pat,scale,mainCanvas,mCtx,HomePlanet,GrandpaPlanet,MechanicPlanet,Mom,Grandpa,Shop,Son2,startGame=()=>{startSound(),setupPlayer(),setupStars(),camera=new Camera(player),setupPlanets(),nP=HomePlanet,playerLanded(),camera.update(),player.update(),gamestate="game",setInterval(()=>{player.throttle>0&&play(40,.2,.1,.65,.1,10,noisey,4*player.throttle,"lowpass",100+1e3*player.throttle,2)},100)},run=()=>{mCtx.save(),bg(),"startscreen"==gamestate?runStartScreen(200,middle.y):"game"==gamestate&&runGame(),mCtx.restore()},runGame=()=>{playerCurrentSpeed=dist(zero,vxy(player)),updateStars(),player.displayRadar(),updateAll(planets),HandlePlayerInputs(),player.update(),resetPlayerOnCrash(),camera.update(),updatePlayerUi(),SplitText(inventoryString,5,200);let e=Math.round(player.x/36e3),t=Math.round(player.y/36e3),a=e+","+t;if("0,0"!=a&&!genplanets.includes(a)){let r=new Planet(36e3*e+6*roughly(0),36e3*t+6*roughly(0),!0);r.setLang(alllngs[Math.min(alllngs.length,flo(.3+rand((abs(e)+abs(t))/2.5)))]),r.populate(),genplanets.push(a)}null==aT&&(doneAction=!1,player.reading=!1),updateAutopilot()},runStartScreen=(e,t)=>{for(let e=0;e<9;e++)hue(8*e),image(fire1_png,180+50*e,t+90+5*Math.sin(e+scount),50,100),image(vessel_png,180+50*e,t,100,200);drawText("press space to start",e+130,t+260),scount+=.1,inputs.space&&startGame()},bg=()=>frect(zero,mainCanvas.width,mainCanvas.height,bgFill),HexToRgba=e=>{let t=e.replace("#","");return[parseInt(t.substring(0,2),16),parseInt(t.substring(2,4),16),parseInt(t.substring(4,6),16),parseInt(t.substring(6,8),16)]},range=(e,t,a)=>e>-t&&e<a+t,fill=e=>mCtx.fillStyle=e,frect=(e,t,a,r)=>{fill(r),mCtx.fillRect(e.x,e.y,t,a)},transform=(e,t,a)=>{mCtx.save(),mCtx.translate(e.x,e.y),a&&mCtx.rotate(a),t(),mCtx.restore()},plural=e=>{let t=e.length;return t>0&&("y"==e[--t]?e=e.substring(0,t)+"ies":e+="s"),e},sq=e=>Math.pow(e,2),addV=(e,t)=>xy(e.x+t.x,e.y+t.y),subV=(e,t)=>xy(e.x-t.x,e.y-t.y),xy=(e,t)=>({x:e,y:t}),setV=(e,t)=>{e.x=t.x,e.y=t.y},circ=(e,t,a)=>mCtx.ellipse(e,t,a,a,0,0,TWO_PI),rgba=(e,t,a,r)=>`rgba(${e},${t},${a},${r})`,canv=()=>document.createElement("canvas"),scanv=()=>{let e=canv();return e.width=100,e.height=100,e},getCtx=e=>{let t=e.getContext("2d");return t.imageSmoothingEnabled=!1,t},hue=e=>{e&&0!=e&&(mCtx.filter=`hue-rotate(${e}deg)`)},image=(e,t,a,r,s)=>mCtx.drawImage(e.img,t-r,a-r,s,s),updateAll=e=>e.forEach(e=>e.update()),displayShadow=e=>{e.active&&null!=e.img&&(mCtx.save(),mCtx.translate(e.x,e.y+e.half),mCtx.transform(1,.15,1.2,1,-5,-5),mCtx.filter="brightness(0) opacity(0.2)",mCtx.drawImage(e.img.img,-e.half,-e.size,e.size,e.size),mCtx.restore())},angleFromDirection=e=>Math.acos(-e.y/Math.sqrt(sq(e.x)+sq(e.y))),vxy=e=>xy(e.vx,e.vy),rand=(e,t)=>null==e&&null==t?Math.random():null==t?rand()*e:e+rand()*(t-e),roughly=e=>rand(e-1e3,e+1e3),dist=(e,t)=>Math.sqrt(sq(e.x-t.x)+sq(e.y-t.y)),flo=e=>Math.floor(e),radians_to_degrees=e=>e*(180/PI),directionFromObjectToObject=(e,t)=>{let a=e.x-t.x,r=e.y-t.y,s=abs(a)+abs(r);return xy(a/s,-r/s)},zero=xy(0,0),ch=e=>rand()<e,randi=(e,t)=>flo(rand(e,t)),abs=e=>Math.abs(e),teach=e=>{aT2=["I can teach you "+e],knownlngs.push(e)},know=e=>knownlngs.includes(e),rfar=e=>e[flo(rand(e.length))],usedPlanetNames=[],rBerry=()=>rfar(BerryNames),constrain=(e,t,a)=>Math.min(Math.max(e,t),a),loadImages=()=>all_images.forEach(e=>loadImage(e)),loadImage=e=>{let t,a,r=[],s=canv();for(let s=0;s<e.t.length;s+=2)for(t=e.t.charCodeAt(s+1)-48+1,a=HexToRgba(all_colors[e.c[e.t.charCodeAt(s)-48]]);t>0;)r.push(a),t--;s.width=e.w,s.height=Math.ceil(r.length/e.w);let n=getCtx(s),i=n.getImageData(0,0,s.width,s.height);for(let e=0;e<i.data.length;e+=4){let t=r[e/4];if(t)for(let a=0;a<4;a++)i.data[e+a]=t[a]}n.putImageData(i,0,0),e.img=s,e.t=""},autopilotActive=!1,preventCrash=!1,StopPlayer=()=>{autopilotActive||(player.targetbearing=void 0,autopilotPhase=0,autopilotActive=!0)},correct=e=>{for(;e<0;)e+=TWO_PI;return e%TWO_PI},minus=(e,t)=>Math.min(correct(e,t),correct(t,e)),updateAutopilot=()=>{if(player.landed)return autopilotActive=!1,void(preventCrash=!1);let e=Math.atan(closestPlanet.r/dist(player,closestPlanet)),t=angleFromDirection(vxy(player)),a=angleFromDirection(directionFromObjectToObject(player,closestPlanet));for(player.x>closestPlanet.x&&(a*=-1),player.vx>0&&(t*=-1),player.x<closestPlanet.x&&a<0&&(a+=PI),t-=PI;t<0;)t+=TWO_PI;for(;a<0;)a+=TWO_PI;for(;t>TWO_PI;)t-=TWO_PI;for(;a>TWO_PI;)a-=TWO_PI;let r=abs(t-a)<abs(e);if(!autopilotActive&&r&&playerCurrentSpeed>player.crashThreshold&&closestPlanet.d2p<75*playerCurrentSpeed&&(preventCrash=!0,autopilotActive=!0),autopilotActive)if(preventCrash)r?(player.rotate(.24),player.plusThrottle()):(player.minusThrottle(),0==player.throttle&&(preventCrash=!1,autopilotActive=!1,StopPlayer()));else switch(autopilotPhase){case 0:player.throttle>0?player.minusThrottle():(autopilotPhase++,slowframes=5.8*Math.sqrt(playerCurrentSpeed),player.targetbearing=angleFromDirection(vxy(player)),player.vx>0&&(player.targetbearing*=-1));break;case 1:reachTargetRotation()&&(autopilotPhase++,player.bearing=player.targetbearing);break;case 2:player.plusThrottle(),--slowframes<=0&&autopilotPhase++;break;case 3:player.throttle>0?player.minusThrottle():autopilotPhase++;break;case 4:autopilotActive=!1,player.vx/=2,player.vy/=2}},reachTargetRotation=()=>{if(player.bearing-.24>player.targetbearing)player.rotate(.24);else{if(!(player.bearing+.24<player.targetbearing))return!0;player.rotate(-.24)}return!1},inputs={w:!1,a:!1,s:!1,d:!1,b:!1,space:!1,e:!1,l:!1},doneAction=!1,keyUp=e=>{e=e.keyCode,setKey(e,!1),32==e&&(inputs.space=!1)},setKey=(e,t)=>{for(let a in inputs)a.toUpperCase().charCodeAt(0)==e&&(inputs[a]=t)},keyDown=e=>{key=e.keyCode,setKey(key,!0),32==key&&(inputs.space||"game"!=gamestate||SpacePressInGameState(),inputs.space=!0)},HandlePlayerInputs=()=>{"game"==gamestate&&(canExit=!1,canEnter=!1,player.boarded?vesselInputs():planetInputs())},vesselInputs=()=>{autopilotActive||(inputs.w?player.plusThrottle():player.minusThrottle(),inputs.a&&player.rotate(.14),inputs.d&&player.rotate(-.14),player.landed&&(canExit=!0,inputs.e&&!player.crashed&&playerLanded()))},planetInputs=()=>{let e=player.running,t=0;if(player.running=!1,inputs.d&&moveX(1),inputs.a&&moveX(-1),inputs.w&&moveY(-1),inputs.s&&moveY(1),e!=player.running){switch(player.running){case"left":t=1,Dude.left=!0;break;case"right":t=1,Dude.left=!1;break;case"down":t=2;break;case"up":t=3}Dude.setFrames(poses[t])}dist(player,addV(Dude,nP))<60&&(canEnter=!0),nP.features.forEach(e=>{e.talker&&dist(Dude,xy(e.x,e.y+60))<e.talkrange&&(aT=e)})},board=()=>{setV(Dude,zero),player.throttle=0,Dude.visible=!1,player.boarded=!0,Dude.planetMode=void 0},SpacePressInGameState=()=>{if(player.landed||aT2||StopPlayer(),canBoard())board(),nP.removeDude(),camera.targetIsVessel(),aT2=void 0;else if(aT2)++textCounter==aT2.length&&(aT2=void 0);else if(aT)if(player.reading){if(textCounter++,!aT.text)return textCounter=0,void(player.reading=!1);textCounter>=aT.text.length-1&&aT.fra&&!doneAction&&(doneAction=!0,aT.fra()),aT&&textCounter!=aT.text.length||(aT=void 0,player.reading=!1)}else player.reading=!0,aT==Mom&&UpdateMomText(),aT==Grandpa&&UpdateGPText(),aT==Shop&&UpdateShopText(),textCounter=0},AddToInventory=e=>{inventory[e.name]?inventory[e.name].num++:inventory[e.name]={num:1,type:e.type,name:e.name},RefreshInventory()},RefreshInventory=()=>{inventoryString="inventory";for(let e in inventory)inventory[e].num>0&&(inventoryString+="\n"+inventory[e].name+": "+inventory[e].num)},haveType=(e,t)=>{let a;for(let r in inventory)inventory[r].num>=e&&inventory[r].type==t&&(a=inventory[r]);return a},canExit=!1,canEnter=!1,tradedOnce=!1,textCounter=0,playerCurrentSpeed=0,inventory=[],inventoryString="",knownlngs=["Onian"],setupPlayer=()=>{player=new Vessel(0,0,100,VesselAnimation),Dude=new AnimObject(50,50,50,poses[0]),player.radar=!0,Dude.hue=5,player.reading=!1,player.animRate=20,player.running=!1},resetPlayerOnCrash=()=>{player.crashed&&player.counter-player.crashFrame>120&&(player.resetPos(50,50),player.setFrames(VesselAnimation),player.crashed=!1,player.landed=!1,board())},playerLanded=()=>{let e;player.boarded=!1,camera.targetIsDude(),Dude.visible=!0,Dude.planetMode=!0;let t=0;for(nP.addFeature(Dude,100);t>160||t<55;)e=nP.findAvailableSpot(80,(nP.r-25)/nP.r),setV(Dude,e),t=dist(player,addV(nP,Dude))},moveX=e=>{player.running=1==e?"right":"left",moveIt(4*e,0)},moveY=e=>{player.running=1==e?"down":"up",moveIt(0,4*e)},moveIt=(e,t)=>{if("focused"==gamestate)return;let a=addV(Dude,xy(e,t));CheckCollisionsOnPlanet(a)||(nP.posIsInWater(a),dist(a,zero)<nP.r&&(0!=e?Dude.x+=e:Dude.y+=t),nP.sortFeatures())},CheckCollisionsOnPlanet=e=>{let t=!1,a=aT;return aT=void 0,nP.features.forEach(a=>{if(a.collider){let r=dist(e,a);r<a.talkrange&&(a.text||a.tradeTxt)&&(aT=a),r<=a.collidersize&&(t=!0)}}),a!=aT&&(textCounter=0),t},canBoard=()=>canEnter&&tradedOnce,trade=(e,t,a,r,s)=>{let n=haveType(r,a),i=t;if(n&&knownlngs.includes(nP.lng)){let l="";if("berry"==a){let e=haveType(1,"spice");e&&(l=" "+e.name)}return s&&(i=n.name+l+" "+t),tradedOnce=!0,e.setTandA([`Oh, you have ${plural(n.type)}\nGive me a moment..`,".....","All done!\nHere's a "+i],()=>{inventory[n.name].num-=r,""!=l&&inventory[l.replace(" ","")].num--,AddToInventory({name:i,type:t})}),!0}return!1},ma7=[0,2,4,5,7,9,11],flatOrder=[6,2,5,1,4,0,3],newkey=(e,t)=>{let a={root:e,degrees:Array.from(ma7)};for(let e=0;e<t;e++)a.degrees[flatOrder[e]]--;return 0==t&&ch(.5)&&a.degrees[3]++,a},nOf=(e,t)=>{let a=[];for(let r=0;r<7;r++){let s=e+r;a[r]=+t.degrees[s%7]+12*flo(s/7)}return{scale:a,deg:e,home:t}},improBeat=[8,8,8,8,8,8,16,16,16,16],playImprov=()=>{let e=nP.m.patt;ch(.8)&&bars%2==1&&(e=nP.m.patt2);for(let t=0;t<nP.m.rythme.length&&(0!=t||!ch(.18));t++)setTimeout(()=>{nP&&play(1*nToF(e.octaves[t]+scale[e.notes[t]%scale.length]),nP.m.nL/2,.1,.12,5*nP.m.nL,5,constSine2,1.7,"lowpass",1450,8)},nP.m.rythme[t])},getRhythm=(e,t,a)=>{ch(.4)&&t>3e3&&(t/=2);let r,s=[],n=0;for(let e=0;e<improBeat.length;e++)r=a,e%2==1&&(r=.4),ch(r)&&s.push(n),n+=t/improBeat[e];e.rythme=s},getNotePattern=e=>{let t,a=rfar(patterns),r=randi(7),s=0,n={notes:[],octaves:[]};for(let i=0;i<e.rythme.length;i++){for(t=r+a[s],n.octaves[i]=12*(3+flo(t/8));t<0;)t+=8;n.notes[i]=t%8,++s==a.length-1&&(a=rfar(patterns),r=t,s=1)}return ch(.3)&&(n=reverse(n)),n},reverse=e=>({notes:e.notes.reverse(),octaves:e.octaves.reverse()}),spaceMusic={barlength:3800,pF:4500,cF:2e4,cDetune:6e-6,scales:defaultScales,t:.2},sound=!1,bars=0,startSound=()=>{window.AudioContext=window.AudioContext||window.webkitAudioContext,aCtx=new AudioContext,samp=aCtx.sampleRate,sound=!0,playbar()},playbar=()=>{nP?(setScale(nP.m),startBeat([4,4,4,4],()=>play(40,.01,.01,.25,rand(.1,.7),40,noisey,rand(8,14),"highpass",roughly(1e3),2),.92,1,!0),playImprov(),setTimeout(()=>{chordNote(0),chordNote(2),chordNote(scale.length-1)},mu.barlength/2),chordNote(0),chordNote(2),chordNote(scale.length-1)):(spaceMusic.t=rand(.2,.5),setScale(spaceMusic)),startBeat([4,4,4,4],()=>play(800,.04,.11,.6,.06,2,constSine4,6,"lowpass",650,14,.01),1,1,!1),startBeat([4,2.7,8.2,16,16],()=>play(10,.015,.01,.4,rand(.1,.2),2,noisey2,3.5,"highpass",1200,1),.88,1,!0),startBeat([2,5.29,16,16,16],()=>play(nToF(36+mu.scales[bars][0]),.1,.2,.6,.8,flo(rand(1,6)),constSineZ,2.36,"lowpass",mu.pF,3),.4,1),setTimeout(playbar,mu.barlength),bars++,backToTop()},setScale=e=>{mu=e,backToTop(),scale=e.scales[bars]},backToTop=()=>{bars>=mu.scales.length&&(bars=0,melcount=0)},sine=(e,t,a)=>Math.sin(e/(t+a)),constSine2=(e,t)=>constrain(sine(e,0,t)+sine(.975*e,0,t)+rand(.1,.3),-.1,.1),constSineZ=(e,t)=>.2*sine(e,e,t)+.2*sine(2*e,e,t)+.2*sine(4*e,e,t),noisey=(e,t)=>rand(.02),noisey2=(e,t)=>rand(constrain(Math.round(sine(e,e,t)),0,.13)),constSine=(e,t)=>constrain(sine(e,0,t),-.1,.1),constSine4=(e,t)=>constrain(rand(.1,.2)+.3*(sine(e,0,t)+.3*sine(e,2,t)),0,.1),chordNote=e=>{if(!nP)return;let t=constSine,a=.8,r=12*randi(-1,1);1==nP.m.cType&&(a=1,t=constSine2),play(nToF(48+r+scale[e]),1.4,1.5,.6,nP.m.barlength/3e3,6,t,.85,"lowpass",a*rand(.9,1,1)*mu.cF,1,mu.cDetune)},startBeat=(e,t,a,r,s)=>{let n=.8*rand(a,r)*mu.t,i=0;for(let a=0;a<e.length;a++)(0!=a||!s)&&rand()<n&&setTimeout(t,i),i+=mu.barlength/e[a]},nToF=e=>13.75*2**((e-9)/12),play=(e,t,a,r,s,n,i,l,o,h,d,p)=>playSound(preloadSound(e,new Envelope(t,a,r,s),n,i,p),l,o,h,d),preloadSound=(e,t,a,r,s)=>{let n=[],i=[],l=samp*(t.a+t.d+t.r),o=samp/e,h=flo(o)*a,d=o/TWO_PI,p=0;if(s)for(p=0;p<l;p++)n[p]=.4*t.level(p)*r(p,d+p*s);else{for(p=0;p<h;p++)i[p]=r(p,d);for(p=0;p<l;p++)n[p]=.4*t.level(p)*i[p%h]}return n},playSound=(e,t,a,r,s)=>{let n=new Float32Array(e.length);for(var i=0;i<e.length;i++)n[i]=t*e[i];let l=aCtx.createBuffer(1,n.length,samp);l.copyToChannel(n,0);let o=aCtx.createBufferSource();o.buffer=l;let h=aCtx.createBiquadFilter();h.type=a,h.frequency.value=r,h.gain.value=s,o.connect(h),h.connect(aCtx.destination),o.start(0)},GrandpaText=["Hi grandson!","Help me with my ship will ya",`Go buy a ${gpPart} on planet Timmy.`],MomText=["Son","Are you hungry?","Bring me 5 fruits"],UpdateMomText=()=>{trade(Mom,"muffin","berry",5,!0)||Mom.setTandA(MomText)},UpdateShopText=()=>{trade(Shop,gpPart,cash,50,!1)||Shop.setTandA(ShopText)},UpdateGPText=()=>{trade(Grandpa,"surprizze",gpPart,1,!1)?GrandpaText=GrandpaText2:Grandpa.setTandA(GrandpaText,grandpaQuestStart)},sta=(e,t)=>{if(frect(TextBox,320,40,tbFill),e){let a=e[textCounter];t&&(a=translate(a)),SplitText(a,TextBox.x+5,TextBox.y+17)}},translate=e=>{if(!knownlngs.includes(nP.lng)){let t="";for(let a=0;a<e.length;a++){let r=alllngs.indexOf(nP.lng)+2;t+=String.fromCharCode(e.charCodeAt(a)+100*r)}return t}return e},SplitText=(e,t,a,r,s)=>{s||(s=15);let n=0;e.split("\n").forEach(e=>{drawText(e,t,a+n,r),n+=s})},drawText=(e,t,a,r)=>{r||(r="white"),t||(t=middle.x-40,a=middle.y+39),fill("#3338"),mCtx.fillText(e,t-1,a+1),fill(r),mCtx.fillText(e,t,a)},updatePlayerUi=()=>{showTopText(),sii(),sqs();let e,t="";canExit&&!player.crashed&&(t="press e to exit. hold w to launch."),canBoard()&&(t="press space to board"),autopilotActive&&(t="autopilot active",preventCrash&&(t="crash prevention active"),e="#daad"),drawText(t,middle.x+20,middle.y-80,e),drawText("Known lngs: "+knownlngs.join(", "),10,590)},showTopText=()=>{player.crashed?drawText(crashtext,TopText.x,TopText.y):player.boarded?(drawText(`You're aboard the greenmobile.\n    speed : ${flo(playerCurrentSpeed)}\n    bearing: ${flo(radians_to_degrees(player.bearing))}°`,TopText.x,TopText.y),playerCurrentSpeed>player.crashThreshold?drawText("Speed is unsafe for landing",TopText.x,TopText.y+15,"red"):drawText("Speed is safe for landing",TopText.x,TopText.y+15,"green")):drawText(`Planet ${nP.name}.`,TopText.x,TopText.y)},sii=()=>{aT&&(drawText("press space"),player.reading&&sta(aT.text,"tree"!=aT.id))},sqs=()=>{null!=aT2&&(drawText("press space"),sta(aT2))},createNewTreeType=()=>{let e=[],t=randi(360),a=rand(2,8),r=a+rand(1,8),s=rand(2,5),n=rand(2,4),i=randi(2,6),l=rand(),o=rand(-2,4),h=rand(),d=(e,t,a,r)=>{if(ch(l)){let i=-6,l=0,d=rand(s,n);r.save(),r.translate(e,t),r.scale(a,1);for(let e=0;e<d;e++)r.drawImage(branchbit_png.img,i,l,6,6),ch(h)&&r.drawImage(leaf1_png.img,i,l+4,6,6),i-=5,l-=o;r.restore()}};for(let s=0;s<3;s++){let s=canv();s.width=100,s.height=100;let n=getCtx(s);n.filter=`hue-rotate(${t}deg)`;let l=s.height-6,o=s.width/2,h=randi(a,r),p=rand(3);for(let e=0;e<h;e++)n.drawImage(trunkbit_png.img,o,l,6,6),e>1&&e%i==0&&(d(o,l,1,n),n.translate(6,0),d(o,l,-1,n)),l-=5,o+=rand(-1,1)*p;e.push(s)}return e},stars=[],setupStars=()=>{for(let e=0;e<16;e++)stars.push(new AnimObject(-1e3,-1e3,10,StarAnimation))},updateStars=()=>{stars.forEach(e=>{let t=camera.position(e);if(!player.landed&&!camera.isOnScreen(t,400))for(;!camera.isOnScreen(t,400)||camera.isOnScreen(t,10);)e.x=player.x+roughly(0),e.y=player.y+roughly(0),t=camera.position(e);e.draw(t)})},middle=xy(400,260),setupCanvas=()=>{(mainCanvas=canv()).width=800,mainCanvas.height=600,(mCtx=getCtx(mainCanvas)).font="bold 15px Arial";let e=document.body;e.appendChild(mainCanvas),e.onkeydown=keyDown,e.onkeyup=keyUp},setupPlanets=()=>{let e=addV(xy(0,551),player);HomePlanet=new Planet(e.x,e.y,!1,"Home, sweet home",550,7),closestPlanet=planets[0],HomePlanet.addFeature(new Soe(0,0,home_png,100,HomeText),100),Mom=HomePlanet.addFeature(new AnimObject(0,0,100,poses[0],MomText),100),planetMode(Mom),Son2=HomePlanet.addFeature(new AnimObject(0,0,40,poses[0],Son2Text),50),planetMode(Son2),e=addV(xy(200,-12e3),HomePlanet),(GrandpaPlanet=new Planet(e.x,e.y,!1,"Grandpa's",410)).addFeature(new Soe(80,0,home_png,80)),GrandpaPlanet.addFeature(new Soe(0,0,vessel_png,100,["Grandpa's ship"]),70),Grandpa=GrandpaPlanet.addFeature(new AnimObject(0,0,100,poses[0],GrandpaText),100),planetMode(Grandpa),e=addV(xy(roughly(12e3),600),GrandpaPlanet),MechanicPlanet=new Planet(e.x,e.y,!1,"Timmy",340),(Shop=MechanicPlanet.addFeature(new Soe(0,0,home_png,140,ShopText),100)).hue=flo(rand(360))},planetMode=(e,t)=>{e.planetMode=!0,t||(e.hue=flo(rand(360))),e.setCollider()},gpQuest=!1,grandpaQuestStart=()=>{if(!gpQuest){for(let e=0;e<70;e++)AddToInventory({name:cash,type:cash});gpQuest=!0}};