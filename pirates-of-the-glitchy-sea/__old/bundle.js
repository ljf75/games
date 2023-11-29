function Note(t){var e=t.split(space);this.frequency=Note.getFrequency(e[0])||0,this.duration=Note.getDuration(e[1])||0}function Sequence(t,e,i){this.ac=t||new AudioContext,this.createFxNodes(),this.tempo=e||120,this.loop=!0,this.smoothing=0,this.staccato=0,this.notes=[],this.push.apply(this,i||[])}function createSprite(t){var e=document.createElement("canvas");e.width=22,e.height=30;var i=e.getContext("2d");return t(e,i),e}function reverse(t){return createSprite(function(e,i){i.translate(11,0),i.scale(-1,1),i.translate(-11,0),i.drawImage(t,0,0)})}function darken(t){return createSprite(function(e,i){i.drawImage(t,0,0),i.globalCompositeOperation="source-atop",i.fillStyle="rgba(0,0,0,0.3)",i.fillRect(0,0,22,30)})}function createSpriteBundle(t){var e=createSprite(t),i=reverse(e);return{base:e,reversed:i,baseDark:darken(e),reversedDark:darken(i)}}function createShipGradient(t){var e=t.createLinearGradient(0,0,0,30);return e.addColorStop(.5,"#852"),e.addColorStop(1,"#630"),e}function createWhaleGradient(t){var e=t.createLinearGradient(0,0,0,30);return e.addColorStop(.5,"#59b"),e.addColorStop(1,"#156"),e}var enharmonics="B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb",middleC=440*Math.pow(Math.pow(2,1/12),-9),numeric=/^[0-9.]+$/,octaveOffset=4,space=/\s+/,num=/(\d+)/,offsets={};enharmonics.split("|").forEach(function(t,e){t.split("-").forEach(function(t){offsets[t]=e})}),Note.getFrequency=function(t){var e=t.split(num),i=offsets[e[0]],s=(e[1]||octaveOffset)-octaveOffset,n=middleC*Math.pow(Math.pow(2,1/12),i);return n*Math.pow(2,s)},Note.getDuration=function(t){return numeric.test(t)?parseFloat(t):t.toLowerCase().split("").reduce(function(t,e){return t+("w"===e?4:"h"===e?2:"q"===e?1:"e"===e?.5:"s"===e?.25:0)},0)},Sequence.prototype.createFxNodes=function(){var t=[["bass",100],["mid",1e3],["treble",2500]],e=this.gain=this.ac.createGain();return t.forEach(function(t,i){i=this[t[0]]=this.ac.createBiquadFilter(),i.type="peaking",i.frequency.value=t[1],e.connect(e=i)}.bind(this)),e.connect(this.ac.destination),this},Sequence.prototype.push=function(){return Array.prototype.forEach.call(arguments,function(t){this.notes.push(t instanceof Note?t:new Note(t))}.bind(this)),this},Sequence.prototype.createCustomWave=function(t,e){e||(e=t),this.waveType="custom",this.customWave=[new Float32Array(t),new Float32Array(e)]},Sequence.prototype.createOscillator=function(){return this.stop(),this.osc=this.ac.createOscillator(),this.customWave?this.osc.setPeriodicWave(this.ac.createPeriodicWave.apply(this.ac,this.customWave)):this.osc.type=this.waveType||"square",this.osc.connect(this.gain),this},Sequence.prototype.scheduleNote=function(t,e){var i=60/this.tempo*this.notes[t].duration,s=i*(1-(this.staccato||0));return this.setFrequency(this.notes[t].frequency,e),this.smoothing&&this.notes[t].frequency&&this.slide(t,e,s),this.setFrequency(0,e+s),e+i},Sequence.prototype.getNextNote=function(t){return this.notes[t<this.notes.length-1?t+1:0]},Sequence.prototype.getSlideStartDelay=function(t){return t-Math.min(t,60/this.tempo*this.smoothing)},Sequence.prototype.slide=function(t,e,i){var s=this.getNextNote(t),n=this.getSlideStartDelay(i);return this.setFrequency(this.notes[t].frequency,e+n),this.rampFrequency(s.frequency,e+i),this},Sequence.prototype.setFrequency=function(t,e){return this.osc.frequency.setValueAtTime(t,e),this},Sequence.prototype.rampFrequency=function(t,e){return this.osc.frequency.linearRampToValueAtTime(t,e),this},Sequence.prototype.play=function(t){return t="number"==typeof t?t:this.ac.currentTime,this.createOscillator(),this.osc.start(t),this.notes.forEach(function(e,i){t=this.scheduleNote(i,t)}.bind(this)),this.osc.stop(t),this.osc.onended=this.loop?this.play.bind(this,t):null,this},Sequence.prototype.stop=function(){return this.osc&&(this.osc.onended=null,this.osc.disconnect(),this.osc=null),this};var ac="undefined"!=typeof AudioContext?new AudioContext:new webkitAudioContext,lead=["D3  e","D3  e","E3  e","F3  e","F3  e","G3  e","F3  e","F3  e","E3  e","D3  q","A2  e","D3  q","E3  e","F3  e","F3  e","G3  e","F3  q","E3 e","D3 qs","F3  q","G3  e","A3  q","G3  e","F3  q","G3  e","A3  e","-   q","D3  e","E3  e","F3  e","E3  q","E3  e","E3  e","F3  e","G3  e","F3  q","D3  e","F3  q","G3  e","A3  q","G3  e","F3  q","G3  e","A3  e","-   q","D3  e","E3  e","F3  e","E3  es","E3  s","G3  e","F3  q","E3  e","D3  qs","- hs","- hs"],bass=["Db1 e","E1 s","- s","E1 s","- s","C1 e","D1 s","- s","D1 s","- s"],tempo=90,sequence1=new Sequence(ac,tempo,lead),sequence2=new Sequence(ac,tempo,bass);sequence1.createCustomWave([-.8,1,.8,.8,-.8,-.8,-1]),sequence1.staccato=.1,sequence2.staccato=.05,sequence2.smoothing=.1,sequence1.gain.gain.value=.5,sequence2.gain.gain.value=.1;var audio={isPlaying:!1,play:function(){var t=ac.currentTime;sequence1.play(t+60/tempo*6),sequence2.play(t),this.isPlaying=!0},stop:function(){sequence1.stop(),sequence2.stop(),this.isPlaying=!1}},Sprites={back:createSpriteBundle(function(t,e){e.beginPath(),e.moveTo(0,10),e.lineTo(22,10),e.lineTo(22,30),e.quadraticCurveTo(0,30,0,15),e.fillStyle=createShipGradient(e),e.fill()}),sail:createSpriteBundle(function(t,e){e.beginPath(),e.moveTo(11,0),e.quadraticCurveTo(25,7,11,15),e.fillStyle="#ccc",e.fill(),e.fillStyle="#963",e.fillRect(10,0,2,15),e.fillStyle=createShipGradient(e),e.fillRect(0,15,22,15)}),blackSail:createSpriteBundle(function(t,e){e.beginPath(),e.moveTo(11,0),e.quadraticCurveTo(25,7,11,15),e.fillStyle="#333",e.fill(),e.fillStyle="#963",e.fillRect(10,0,2,15),e.fillStyle=createShipGradient(e),e.fillRect(0,15,22,15)}),cannon:createSpriteBundle(function(t,e){e.fillStyle=createShipGradient(e),e.fillRect(0,15,22,15),e.beginPath(),e.arc(11,15,4,0,7,0),e.fillStyle="#666",e.fill(),e.beginPath(),e.arc(11,15,2,0,7,0),e.fillStyle="#000",e.fill()}),cannonFiring:createSpriteBundle(function(t,e){e.fillStyle=createShipGradient(e),e.fillRect(0,15,22,15),e.beginPath(),e.arc(11,15,4,0,7,0),e.fillStyle="#666",e.fill(),e.beginPath(),e.arc(11,15,2,0,7,0),e.fillStyle="#d20",e.fill()}),front:createSpriteBundle(function(t,e){e.beginPath(),e.fillStyle=createShipGradient(e),e.fillRect(0,13,22,2),e.moveTo(0,15),e.lineTo(22,15),e.quadraticCurveTo(12,30,0,30),e.fill()}),cannonball:createSpriteBundle(function(t,e){e.beginPath(),e.arc(11,15,2,0,7,0),e.fillStyle="#000",e.fill()}),whaleBack:createSpriteBundle(function(t,e){e.beginPath(),e.moveTo(22,15),e.lineTo(22,30),e.quadraticCurveTo(5,30,0,20),e.lineTo(2,30),e.quadraticCurveTo(5,15,22,15),e.fillStyle=createWhaleGradient(e),e.fill()}),whaleBody:createSpriteBundle(function(t,e){e.fillStyle="#963",e.fillStyle=createWhaleGradient(e),e.fillRect(0,15,22,15)}),whaleFront:createSpriteBundle(function(t,e){e.beginPath(),e.fillStyle=createWhaleGradient(e),e.moveTo(0,15),e.quadraticCurveTo(25,15,21,19),e.quadraticCurveTo(25,25,0,30),e.fill(),e.fillStyle="#000",e.fillRect(5,18,2,2)})},classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),inherits=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},possibleConstructorReturn=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},slicedToArray=function(){function t(t,e){var i=[],s=!0,n=!1,r=void 0;try{for(var a,o=t[Symbol.iterator]();!(s=(a=o.next()).done)&&(i.push(a.value),!e||i.length!==e);s=!0);}catch(t){n=!0,r=t}finally{try{!s&&o.return&&o.return()}finally{if(n)throw r}}return i}return function(e,i){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),ShipPart=function(){function t(e,i,s,n){classCallCheck(this,t),this.state=e,this.position=i,this.next=s,this.previous=n,this.paused=!1}return createClass(t,[{key:"update",value:function(t){}},{key:"draw",value:function(t,e,i){var s=this;this.paused&&(e=12);var n=22*e/12;this.next&&t.addCall(this.position.x,this.position.y,(this.next.x+this.position.x+this.next.y+this.position.y)/2,function(){t.ctx.save(),t.ctx.translate(0,-25+i),t.ctx.transform(1,s.next.x-s.position.x?-.5:.5,0,1,0,0),(s.next.x-s.position.x>0||s.next.y-s.position.y<0)&&t.ctx.scale(-1,1),t.ctx.drawImage(s.next.x-s.position.x?s.sprite.base:s.sprite.baseDark,22-n,0,22,30,0,0,22,30),t.ctx.restore()}),this.previous&&t.addCall(this.position.x,this.position.y,(this.previous.x+this.position.x+this.previous.y+this.position.y)/2,function(){t.ctx.save(),t.ctx.translate(0,-25+i),t.ctx.transform(1,s.previous.x-s.position.x?-.5:.5,0,1,0,0),(s.previous.x-s.position.x>0||s.previous.y-s.position.y<0)&&t.ctx.scale(-1,1),t.ctx.drawImage(s.previous.x-s.position.x?s.sprite.reversed:s.sprite.reversedDark,n,0,22,30,0,0,22,30),t.ctx.restore()})}}]),t}(),BlackSailPart=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,n));return r.sprite=Sprites.blackSail,r}return inherits(e,t),e}(ShipPart),Cannonball=function(){function t(e,i,s){classCallCheck(this,t),this.state=e,this.position=i,this.direction=s,this.alive=!0,this.sprite=Sprites.cannonball,this.ttl=20}return createClass(t,[{key:"update",value:function(){var t=this;this.position={x:this.position.x+.1*this.direction.x,y:this.position.y+.1*this.direction.y},this.ttl--,this.alive&=this.ttl>0,this.state.traders.forEach(function(e){e.alive&&e.parts.some(function(e){return Math.hypot(t.position.x-e.position.x,t.position.y-e.position.y)<1})&&(e.hit(),t.alive=!1)})}},{key:"draw",value:function(t){var e=this;t.addCall(this.position.x,this.position.y,this.position.x+this.position.y+1,function(){t.ctx.save(),t.ctx.translate(0,-25),t.translate3d(e.direction.x?0:.5,e.direction.x?-.5:0),t.ctx.transform(1,e.direction.x?.5:-.5,0,1,0,0),t.ctx.drawImage(e.position.x?e.sprite.reversed:e.sprite.reversedDark,0,0,22,30,0,0,22,30),t.ctx.restore()})}}]),t}(),Effect=function(){function t(e,i){classCallCheck(this,t),this.subject=e,this.ttl=i,this.max=i,this.alive=!0}return createClass(t,[{key:"update",value:function(){return this.ttl--,this.ttl>0?void this.step(1-this.ttl/this.max):(this.alive=!1,void this.finish())}},{key:"step",value:function(t){}},{key:"finish",value:function(){}}]),t}(),FiringEffect=function(t){function e(t){classCallCheck(this,e);var i=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,10));return t.sprite=Sprites.cannonFiring,i}return inherits(e,t),createClass(e,[{key:"finish",value:function(){this.subject.sprite=Sprites.cannon}}]),e}(Effect),CannonPart=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,n));return r.sprite=Sprites.cannon,r}return inherits(e,t),createClass(e,[{key:"update",value:function(t){if(t&&this.previous){this.state.effects.push(new FiringEffect(this));var e={x:(this.position.x+this.previous.x)/2,y:(this.position.y+this.previous.y)/2},i=this.next.x-this.position.x;this.state.cannonBalls.push(new Cannonball(this.state,e,i?{x:0,y:1}:{x:1,y:0})),this.state.cannonBalls.push(new Cannonball(this.state,e,i?{x:0,y:-1}:{x:-1,y:0}))}}}]),e}(ShipPart),Debris=function(){function t(e,i,s){classCallCheck(this,t),this.state=e,this.position={x:i,y:s},this.orientation=Math.random()<.5?.5:-.5,this.alive=!0}return createClass(t,[{key:"update",value:function(){}},{key:"draw",value:function(t){var e=this,i=this.state.getOffset(this.position.x,this.position.y);t.addCall(this.position.x,this.position.y,this.position.x+this.position.y-this.orientation+.001,function(){t.ctx.transform(1,e.orientation,0,1,0,0),t.ctx.fillStyle="#a83",t.ctx.fillRect(-10,-10+i/2,10,20),t.ctx.fillStyle="#873",t.ctx.fillRect(-8,-8+i/2,8,16)}),t.addCall(this.position.x,this.position.y,this.position.x+this.position.y+this.orientation+.001,function(){t.ctx.transform(1,e.orientation,0,1,0,0),t.ctx.fillStyle="#a83",t.ctx.fillRect(0,-10+i/2,10,20),t.ctx.fillStyle="#873",t.ctx.fillRect(0,-8+i/2,8,16)})}}]),t}(),Highscore=function(){function t(){classCallCheck(this,t),this.key="poftgs_highscore",this.highscore=localStorage.getItem(this.key)||0}return createClass(t,[{key:"get",value:function(){return this.highscore}},{key:"update",value:function(t){t>this.highscore&&(this.highscore=t,localStorage.setItem(this.key,t))}}]),t}(),FadeIn=function(t){function e(t){classCallCheck(this,e);var i=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,12));return t.opacity=0,i}return inherits(e,t),createClass(e,[{key:"step",value:function(t){this.subject.opacity=t}}]),e}(Effect),FadeOut=function(t){function e(t,i){classCallCheck(this,e);var s=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,12));return s.callback=i,s}return inherits(e,t),createClass(e,[{key:"step",value:function(t){this.subject.opacity=1-t}},{key:"finish",value:function(){this.callback()}}]),e}(Effect),Message=function(){function t(e,i){var s=arguments.length<=2||void 0===arguments[2]?null:arguments[2];classCallCheck(this,t),this.state=e,this.messages=i,this.sub=s||"Press space to continue.",this.alive=!0,this.currentMessage=0,this.opacity=1,e.effects.push(new FadeIn(this))}return createClass(t,[{key:"draw",value:function(t){t.ctx.globalAlpha=this.opacity,t.ctx.font="16px Times New Roman, serif";var e=t.ctx.measureText(this.messages[this.currentMessage]).width+20;t.ctx.fillStyle="rgba(255,255,255,0.8)",t.ctx.fillRect(400-e/2,286,e,54),t.ctx.textAlign="center",t.ctx.fillStyle="#630",t.ctx.fillText(this.messages[this.currentMessage],400,306),t.ctx.fillRect(310,314,180,1),t.ctx.font="14px Times New Roman, serif",t.ctx.fillText(this.sub,400,330),t.ctx.globalAlpha=1}},{key:"continue",value:function(){var t=this;return this.currentMessage==this.messages.length-1?void this.state.effects.push(new FadeOut(this,function(){t.alive=!1})):void this.currentMessage++}}]),t}(),BackPart=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,n));return r.sprite=Sprites.back,r}return inherits(e,t),e}(ShipPart),FrontPart=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,n));return r.sprite=Sprites.front,r}return inherits(e,t),e}(ShipPart),SinkEffect=function(t){function e(t,i){classCallCheck(this,e);var s=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,30));return s.callback=i,t.offset=0,s.destroyed=!1,s}return inherits(e,t),createClass(e,[{key:"step",value:function(){this.subject.offset++}},{key:"finish",value:function(){this.callback()}}]),e}(Effect),Ship=function(){function t(e){classCallCheck(this,t),this.state=e,this.animationStep=0,this.alive=!0,this.nextDirection=null,this.offset=0}return createClass(t,[{key:"draw",value:function(t){var e=this;this.parts.map(function(i){i.draw(t,e.animationStep,e.offset)})}},{key:"move",value:function(){var t=this,e=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];!(arguments.length<=1||void 0===arguments[1])&&arguments[1];this.nextDirection&&(this.direction=this.nextDirection,this.nextDirection=null);var i=this.parts[0].next?{x:this.parts[0].next.x+this.direction.x,y:this.parts[0].next.y+this.direction.y}:null;this.parts.some(function(t){return t.previous=t.position,t.position=t.next,t.next=i,t.paused=!1,i=t.position,e}),e&&!function(){var e=!0;t.parts.forEach(function(t){t.paused=!e,e=!1})}()}},{key:"addOccupied",value:function(t){var e=!0,i=!1,s=void 0;try{for(var n,r=this.parts[Symbol.iterator]();!(e=(n=r.next()).done);e=!0){var a=n.value;a.next&&t.push(a.next)}}catch(t){i=!0,s=t}finally{try{!e&&r.return&&r.return()}finally{if(i)throw s}}}},{key:"collidesWith",value:function(t){var e=this;return!(!this.parts[0]||!this.parts[0].next)&&t.parts.some(function(t){return t.position.x==e.parts[0].next.x&&t.position.y==e.parts[0].next.y})}}]),t}(),PirateShip=function(t){function e(t){classCallCheck(this,e);var i=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return i.parts=[new FrontPart(t,{x:4,y:4},{x:3,y:4},{x:5,y:4}),new BlackSailPart(t,{x:5,y:4},{x:4,y:4},{x:6,y:4}),new BackPart(t,{x:6,y:4},{x:5,y:4},{x:7,y:4})],i.direction={x:-1,y:0},i.shooting=!1,i.paused=!1,i}return inherits(e,t),createClass(e,[{key:"update",value:function(){var t=this;if(this.animationStep=(this.animationStep+1)%12,0===this.animationStep){var e=this.state.debris.find(function(e){return e.position.x==t.parts[0].position.x&&e.position.y==t.parts[0].position.y&&(e.alive=!1,!0)}),i=void 0;e&&(this.state.increaseScore(10*this.parts.length),3==this.parts.length?(this.state.withTutorial&&(this.state.message=new Message(this.state,["You got your first cannon. Press space to fire.","Other crates might contain, provisions, more ship parts, or glitches."])),i=CannonPart):i=this.state.rollReward()),!this.paused&&this.state.isOutOfBounds(this.parts[0].position)&&this.die(!0,["You discovered the end of the world but it’s too late to tell anyone."]),this.move(!!i),i&&this.parts.splice(1,0,new i(this.state,e.position,this.parts[0].position,null)),this.parts.forEach(function(e){e.update(t.shooting)})}}},{key:"addOccupied",value:function(t){this.parts.forEach(function(e,i){i>1&&e.next&&t.push(e.next)})}},{key:"die",value:function(){var t=this,e=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],i=arguments[1];this.paused||(this.paused=!0,e?this.state.effects.push(new SinkEffect(this,function(){t.state.message=new Message(t.state,i,"Press space to try again.",!1),t.alive=!1})):(this.state.message=new Message(this.state,i,"Press space to try again.",!1),this.alive=!1))}}]),e}(Ship),Npc=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));r.direction=s;var a={x:i.x+s.x,y:i.y+s.y};return r.parts=[new n(t,i,a,null)],r.hp=2,r}return inherits(e,t),createClass(e,[{key:"update",value:function(){this.animationStep=(this.animationStep+1)%12,0===this.animationStep&&(this.move(!1,this.state.isOutOfBounds(this.parts[0].position)),this.state.isOutOfBounds(this.parts[0].next)?this.disassemble():this.parts.length<3&&this.assemble(),this.collidesWith(this.state.pirateShip)&&this.tryEvading(this.state.pirateShip))}},{key:"assemble",value:function(){this.parts.length<2?this.parts.push(new this.middle(this.state,this.parts[0].previous,this.parts[0].position)):this.parts.push(new this.back(this.state,this.parts[1].previous,this.parts[1].position))}},{key:"disassemble",value:function(){return null==this.parts[0].next&&this.parts.shift(),0==this.parts.length?void(this.alive=!1):void(this.parts[0].next=null)}},{key:"tryEvading",value:function(t){var e=this.parts[0].next;this.parts[0].next={x:this.parts[0].position.x+this.direction.y,y:this.parts[0].position.y-this.direction.x},this.collidesWith(t)&&(this.parts[0].next={x:this.parts[0].position.x-this.direction.y,y:this.parts[0].position.y+this.direction.x},this.collidesWith(t)&&(this.parts[0].next=e,this.alive=!1))}},{key:"hit",value:function(){this.hp-=2*Math.random()+1|0,!this.destroyed&&this.hp<=0&&(this.destroyed=!0,this.die())}},{key:"die",value:function(){var t=this;this.state.effects.push(new SinkEffect(this,function(){t.alive=!1}))}}]),e}(Ship),SailPart=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,n));return r.sprite=Sprites.sail,r}return inherits(e,t),e}(ShipPart),Trader=function(t){function e(t,i,s){classCallCheck(this,e);var n=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,FrontPart));return n.middle=SailPart,n.back=BackPart,n}return inherits(e,t),createClass(e,[{key:"die",value:function(){var t=this;this.state.effects.push(new SinkEffect(this,function(){t.alive=!1,t.parts.forEach(function(e){t.state.debris.push(new Debris(t.state,e.position.x,e.position.y))})}))}}]),e}(Npc),Glitch=function(t){function e(t,i){classCallCheck(this,e);var s=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i));return t.glitchActive=!0,s}return inherits(e,t),createClass(e,[{key:"finish",value:function(){this.subject.glitchActive=!1}}]),e}(Effect),SpinGlitch=function(t){function e(t){return classCallCheck(this,e),possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,300))}return inherits(e,t),createClass(e,[{key:"step",value:function(t){this.subject.spin=(1-t)*Math.PI*2}}]),e}(Glitch),StormGlitch=function(t){function e(t){return classCallCheck(this,e),possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,300))}return inherits(e,t),createClass(e,[{key:"step",value:function(t){this.subject.stormFactor=1-Math.abs(2*t-1)}}]),e}(Glitch),LowResGlitch=function(t){function e(t){classCallCheck(this,e);var i=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,300));return i.subject.pixelated=!0,i}return inherits(e,t),createClass(e,[{key:"finish",value:function(){this.subject.glitchActive=!1,this.subject.pixelated=!1}}]),e}(Glitch),MirrorGlitch=function(t){function e(t){classCallCheck(this,e);var i=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,300));return i.subject.mirrored=!0,i}return inherits(e,t),createClass(e,[{key:"finish",value:function(){this.subject.glitchActive=!1,this.subject.mirrored=!1}}]),e}(Glitch),Front=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,n));return r.sprite=Sprites.whaleFront,r}return inherits(e,t),e}(ShipPart),Middle=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,n));return r.sprite=Sprites.whaleBody,r}return inherits(e,t),e}(ShipPart),Back=function(t){function e(t,i,s,n){classCallCheck(this,e);var r=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,n));return r.sprite=Sprites.whaleBack,r}return inherits(e,t),e}(ShipPart),Whale=function(t){function e(t,i,s){classCallCheck(this,e);var n=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,i,s,Front));return n.middle=Middle,n.back=Back,n}return inherits(e,t),e}(Npc),Battle=function(){function t(e){var i=this,s=!(arguments.length<=1||void 0===arguments[1])&&arguments[1];classCallCheck(this,t),this.withTutorial=s,this.cannonBalls=[],this.debris=[],this.traders=[],this.effects=[],this.pirateShip=new PirateShip(this),this.updateOccupied(),this.addRandomDebris(),this.provisions=10,this.score=0,this.animationStep=0,this.glitchActive=!1,this.spin=0,this.stormFactor=0,this.highscore=new Highscore,s&&(this.message=new Message(this,["Hunt traders crossing the Glitchy Sea and keep your provisions in check.","Use left and right arrow keys to steer, T to toggle music."])),this.rewards=[[8,function(){i.provisions+=2}],[4,function(){return BlackSailPart}],[2,function(){return CannonPart}],[1,function(){if(!i.glitchActive){var t=[function(){return new SpinGlitch(i)},function(){return new StormGlitch(i)},function(){return new LowResGlitch(e.screen)},function(){return new MirrorGlitch(e.screen)}][2*Math.random()|0];i.effects.push(t())}}]],this.rewardSum=this.rewards.reduce(function(t,e){var i=slicedToArray(e,1),s=i[0];return s+t},0)}return createClass(t,[{key:"update",value:function(t){return this.effects.forEach(function(t){t.update()}),this.effects=this.effects.filter(function(t){return t.alive}),this.pirateShip.alive?this.message?(t.input.hasKey(32)&&(this.message.continue(),t.input.handleKey(32)),void(this.message.alive||(this.message=null))):(this.applyKeyInput(t.input),this.pirateShip.update(),this.traders=this.traders.filter(function(t){return t.update(),t.alive}),this.debris=this.debris.filter(function(t){return t.alive}),this.cannonBalls=this.cannonBalls.filter(function(t){return t.update(),t.alive}),this.traders=this.traders.filter(function(t){return t.alive}),this.updateOccupied(),this.isOccupied(this.pirateShip.parts[0].position.x,this.pirateShip.parts[0].position.y)?void this.pirateShip.die(!0,["You’re shark food now. Let that sink in… or"]):(0==this.traders.length&&this.addTrader(),this.provisions=Math.max(this.provisions-.01,0),this.provisions<1&&this.pirateShip.die(!1,["Without any food left you’re too weak to fight the rats taking over now."]),void this.animationStep++)):void(t.input.hasKey(32)&&(t.input.handleKey(32),t.startBattle()))}},{key:"draw",value:function(t){for(var e=15;e--;)for(var i=15;i--;){var s=2*(this.getOffset(e,i)-this.getOffset(e+1,i+1))-2*Math.random();t.addPolygon(e,i,e+i+1,[0,0+this.getOffset(e,i),20,10+this.getOffset(e,i+1),0,20+this.getOffset(e+1,i+1),-20,10+this.getOffset(e+1,i)],this.pirateShip.alive?"hsl(160,60%,"+(47-s)+"%)":"hsl(160,0%,"+(70-s)+"%)")}this.debris.forEach(function(e){e.draw(t)}),this.cannonBalls.forEach(function(e){e.draw(t)}),this.traders.forEach(function(e){e.draw(t)}),this.pirateShip.draw(t),t.ctx.save(),t.ctx.translate(400,310),t.ctx.rotate(this.spin),t.ctx.translate(-400,-310),t.ctx.fillStyle="#630",t.ctx.font="20px Times New Roman, serif",t.ctx.textAlign="left",t.ctx.save(),t.ctx.translate(165,256),t.ctx.rotate(-Math.PI/2.8),t.ctx.transform(1,.8,0,1,0,0),t.ctx.fillText("Provisions: "+(0|this.provisions),0,0),t.ctx.restore(),t.ctx.save(),t.ctx.translate(520,200),t.ctx.rotate(Math.PI/2.8),t.ctx.transform(1,-.8,0,1,0,0),t.ctx.fillText("Gold: "+this.score,0,0),t.ctx.restore(),t.ctx.save(),t.ctx.translate(659,360),t.ctx.rotate(Math.PI-Math.PI/2.8),t.ctx.transform(1,.8,0,1,0,0),t.ctx.fillText("Highest Gold: "+this.highscore.get(),0,0),t.ctx.restore(),t.drawPolygons(),t.ctx.restore(),this.message&&this.message.draw(t)}},{key:"getOffset",value:function(t,e){return 2*(1-this.stormFactor)*Math.sin(t+e-this.animationStep/8)+this.stormFactor*(4-12*Math.random())}},{key:"updateOccupied",value:function(){var t=this;this.occupied=[],this.pirateShip.addOccupied(this.occupied),this.traders.forEach(function(e){e.addOccupied(t.occupied)})}},{key:"isOccupied",value:function(t,e){return this.occupied.some(function(i){return t==i.x&&e==i.y})}},{key:"addRandomDebris",value:function(){var t=void 0,e=void 0;do t=14*Math.random()+1|0,e=14*Math.random()+1|0;while(this.isOccupied(t,e));this.debris.push(new Debris(this,t,e))}},{key:"addTrader",value:function(){var t=void 0,e=void 0;do if(t=14*Math.random()+1|0,e=Math.random()<.5?0:15,Math.random()<.5){var i=[e,t];t=i[0],e=i[1]}while(this.isOccupied(t,e));var s={x:0==t?1:15==t?-1:0,y:0==e?1:15==e?-1:0};this.traders.push(new(Math.random()<.2?Whale:Trader)(this,{x:t,y:e},s))}},{key:"isOutOfBounds",value:function(t){return!t||(t.x<0||t.x>15||(t.y<0||t.y>15))}},{key:"applyKeyInput",value:function(t){this.pirateShip.shooting=t.hasKey(32),t.hasKey(37)&&(t.handleKey(37),this.pirateShip.nextDirection={x:-this.pirateShip.direction.y,y:this.pirateShip.direction.x}),t.hasKey(39)&&(t.handleKey(39),this.pirateShip.nextDirection={x:this.pirateShip.direction.y,y:-this.pirateShip.direction.x})}},{key:"rollReward",value:function(){var t=Math.random()*this.rewardSum,e=!0,i=!1,s=void 0;try{for(var n,r=this.rewards[Symbol.iterator]();!(e=(n=r.next()).done);e=!0){var a=slicedToArray(n.value,2),o=a[0],c=a[1];if(t<o)return c();t-=o}}catch(t){i=!0,s=t}finally{try{!e&&r.return&&r.return()}finally{if(i)throw s}}}},{key:"increaseScore",value:function(t){this.score+=t,this.highscore.update(this.score)}}]),t}(),Input=function(){function t(){classCallCheck(this,t),this.keys=new Set,this.handledKeys=new Set,document.onkeydown=function(t){this.handledKeys.has(t.keyCode)||this.keys.add(t.keyCode),this.handledKeys.has("any")||this.keys.add("any")}.bind(this),document.onkeyup=function(t){this.keys.delete(t.keyCode),this.handledKeys.delete(t.keyCode),this.keys.delete("any"),this.handledKeys.delete("any")}.bind(this)}return createClass(t,[{key:"hasKey",value:function(){var t=arguments.length<=0||void 0===arguments[0]?"any":arguments[0];return this.keys.has(t)}},{key:"handleKey",value:function(){var t=arguments.length<=0||void 0===arguments[0]?"any":arguments[0];"any"==t?(this.keys=new Set,this.handledKeys=new Set):(this.keys.delete(t),this.handledKeys.add(t))}}]),t}(),Screen=function(){function t(){var e=this;classCallCheck(this,t),this.canvas=document.querySelector("#c1"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=800,this.canvas.height=640,this.canvas2=document.querySelector("#c2"),this.ctx2=this.canvas2.getContext("2d"),this.canvas2.width=200,this.canvas2.height=160,this.center(),window.onresize=function(){return e.center()},this.pixelated=!1}return createClass(t,[{key:"reset",value:function(){this.canvas.width=800,this.canvas2.width=200,this.polygons=[],this.mirrored&&(this.ctx.translate(400,0),this.ctx.scale(-1,1),this.ctx.translate(-400,0))}},{key:"center",value:function(){this.canvas.style.left=(window.innerWidth/2-400|0)+"px",this.canvas.style.top=(window.innerHeight/2-320|0)+"px"}},{key:"drawCircle",value:function(t,e,i){this.ctx.beginPath(),this.ctx.arc(t,e,i,0,7,!1),this.ctx.fill()}},{key:"addPolygon",value:function(t,e,i,s,n){this.polygons.push([t,e,i,s,n])}},{key:"addCall",value:function(t,e,i,s){this.polygons.push([t,e,i,s])}},{key:"drawPolygons",value:function(){var t=this;this.polygons=this.polygons.sort(function(t,e){return t[2]-e[2]}),this.polygons.forEach(function(e){if(t.ctx.save(),t.ctx.translate(400,150),t.translate3d(e[0],e[1]),"function"!=typeof e[3]){var i=e[3],s=e[4];t.ctx.beginPath(),t.ctx.moveTo(i[0],i[1]);for(var n=2;n<i.length;n+=2)t.ctx.lineTo(i[n],i[n+1]);t.ctx.fillStyle=s,t.ctx.fill()}else e[3]();t.ctx.restore()})}},{key:"translate3d",value:function(t,e){this.ctx.translate(22*(e-t),11*(t+e))}},{key:"finish",value:function(){this.pixelated&&(this.ctx.imageSmoothingEnabled=this.ctx.mozImageSmoothingEnabled=!1,this.ctx2.drawImage(this.canvas,0,0,800,640,0,0,200,160),this.ctx.fillStyle="#fff",this.ctx.fillRect(0,0,800,640),this.ctx.drawImage(this.canvas2,0,0,200,160,0,0,800,640))}}]),t}(),Title=function(){function t(){classCallCheck(this,t),this.pirateShip=new PirateShip(this),this.animationStep=0}return createClass(t,[{key:"update",value:function(t){t.input.hasKey()&&(t.input.handleKey(),t.startBattle()),this.animationStep++}},{key:"draw",value:function(t){t.ctx.fillStyle="#630",t.ctx.font="36px Times New Roman, serif",t.ctx.textAlign="center",t.ctx.fillRect(250,78,300,1),t.ctx.fillText("Pirates",400,70),t.ctx.font="24px serif",t.ctx.fillText("of the Glitchy Sea",400,105);for(var e=11;e--;)for(var i=11;i--;){var s=2*(this.getOffset(e,i)-this.getOffset(e+1,i+1))-2*Math.random();t.addPolygon(e,i,e+i+1,[0,0+this.getOffset(e,i),20,10+this.getOffset(e,i+1),0,20+this.getOffset(e+1,i+1),-20,10+this.getOffset(e+1,i)],"hsl(160,60%,"+(47-s)+"%)")}this.pirateShip.draw(t),t.drawPolygons()}},{key:"getOffset",value:function(t,e){return 2*Math.sin(t+e-this.animationStep/8)}}]),t}(),Game=function(){function t(){classCallCheck(this,t),this.screen=new Screen,this.input=new Input,audio.play(),this.tutorial=!0,this.currentState=new Title}return createClass(t,[{key:"start",value:function(){setInterval(this.update.bind(this),1e3/30)}},{key:"update",value:function(){var t=this;this.currentState.update(this),requestAnimationFrame(function(){
return t.draw()}),this.input.hasKey(84)&&(this.input.handleKey(84),audio.isPlaying?audio.stop():audio.play())}},{key:"draw",value:function(){this.screen.reset(),this.currentState.draw(this.screen),this.screen.finish()}},{key:"startBattle",value:function(){this.currentState=new Battle(this,this.tutorial)}}]),t}();(new Game).start();