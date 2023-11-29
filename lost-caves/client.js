function*range(t,e,i=1){for(var n=t;n<e;)yield n,n+=i}function GET_DIRECTION(){return $keys[KEY_CODES.LEFT]?LEFT:$keys[KEY_CODES.UP]?UP:$keys[KEY_CODES.RIGHT]?RIGHT:$keys[KEY_CODES.DOWN]?DOWN:void 0}function int(t){return t?1:0}!function(t,e){"function"==typeof define&&define.amd?define(["exports"],e):e("object"==typeof exports&&"string"!=typeof exports.nodeName?exports:t.TinyMusic={})}(this,function(t){function e(t){var i=t.split(a);this.frequency=e.getFrequency(i[0])||0,this.duration=e.getDuration(i[1])||0}function i(t,e,i){this.ac=t||new AudioContext,this.createFxNodes(),this.tempo=e||120,this.loop=!0,this.smoothing=0,this.staccato=0,this.notes=[],this.push.apply(this,i||[])}var n=440*Math.pow(Math.pow(2,1/12),-9),s=/^[0-9.]+$/,a=/\s+/,o={};"B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb".split("|").forEach(function(t,e){t.split("-").forEach(function(t){o[t]=e})}),e.getFrequency=function(t){var e=t.split(/(\d+)/),i=o[e[0]],s=(e[1]||4)-4;return n*Math.pow(Math.pow(2,1/12),i)*Math.pow(2,s)},e.getDuration=function(t){return s.test(t)?parseFloat(t):t.toLowerCase().split("").reduce(function(t,e){return t+("w"===e?4:"h"===e?2:"q"===e?1:"e"===e?.5:"s"===e?.25:0)},0)},i.prototype.createFxNodes=function(){var t=[["bass",100],["mid",1e3],["treble",2500]],e=this.gain=this.ac.createGain();return t.forEach(function(t,i){i=this[t[0]]=this.ac.createBiquadFilter(),i.type="peaking",i.frequency.value=t[1],e.connect(e=i)}.bind(this)),e.connect(this.ac.destination),this},i.prototype.push=function(){return Array.prototype.forEach.call(arguments,function(t){this.notes.push(t instanceof e?t:new e(t))}.bind(this)),this},i.prototype.createCustomWave=function(t,e){e||(e=t),this.waveType="custom",this.customWave=[new Float32Array(t),new Float32Array(e)]},i.prototype.createOscillator=function(){return this.stop(),this.osc=this.ac.createOscillator(),this.customWave?this.osc.setPeriodicWave(this.ac.createPeriodicWave.apply(this.ac,this.customWave)):this.osc.type=this.waveType||"square",this.osc.connect(this.gain),this},i.prototype.scheduleNote=function(t,e){var i=60/this.tempo*this.notes[t].duration,n=i*(1-(this.staccato||0));return this.setFrequency(this.notes[t].frequency,e),this.smoothing&&this.notes[t].frequency&&this.slide(t,e,n),this.setFrequency(0,e+n),e+i},i.prototype.getNextNote=function(t){return this.notes[t<this.notes.length-1?t+1:0]},i.prototype.getSlideStartDelay=function(t){return t-Math.min(t,60/this.tempo*this.smoothing)},i.prototype.slide=function(t,e,i){var n=this.getNextNote(t),s=this.getSlideStartDelay(i);return this.setFrequency(this.notes[t].frequency,e+s),this.rampFrequency(n.frequency,e+i),this},i.prototype.setFrequency=function(t,e){return this.osc.frequency.setValueAtTime(t,e),this},i.prototype.rampFrequency=function(t,e){return this.osc.frequency.linearRampToValueAtTime(t,e),this},i.prototype.play=function(t){return t="number"==typeof t?t:this.ac.currentTime,this.createOscillator(),this.osc.start(t),this.notes.forEach(function(e,i){t=this.scheduleNote(i,t)}.bind(this)),this.osc.stop(t),this.osc.onended=this.loop?this.play.bind(this,t):null,this},i.prototype.stop=function(){return this.osc&&(this.osc.onended=null,this.osc.disconnect(),this.osc=null),this},t.Note=e,t.Sequence=i}),Number.prototype.clamp=function(t,e){return Math.min(Math.max(this,t),e)};var $context,$images,$player,$world,$camera,$enemies=[],$keys={},$playMusic=()=>null,$pauseMusic=()=>null,$game={chests:0},CAMERA_SIZE=12,FRAME_TIME=55,SPRITE_PIXEL_SIZE=16,SQUARE_PIXEL_SIZE=16,SCALE=2,GRID_SIZE=50,KEY_CODES={LEFT:37,UP:38,RIGHT:39,DOWN:40,SPACE:32},DOWN=0,LEFT=1,RIGHT=2,UP=3,DEAD=4,STOPPED=0,WALKING=1,GRID_TILES={EMPTY:0,WALL:1,TREASURE:2};class Sprite{constructor(t,e,i,n,s){Object.assign(this,{width:t,height:e,image:i,x:n,y:s})}update(){}render(t=0,e=0){$context.drawImage(this.image,t,e,this.width,this.height,this.x*SQUARE_PIXEL_SIZE,this.y*SQUARE_PIXEL_SIZE,SQUARE_PIXEL_SIZE,SQUARE_PIXEL_SIZE)}shadow(){let t=$player.x-this.x,e=$player.y-this.y,i=.01*Math.pow(t*t+e*e,1.3);$context.globalAlpha=i,$context.fillRect(this.x*SQUARE_PIXEL_SIZE-.5,this.y*SQUARE_PIXEL_SIZE-.5,SQUARE_PIXEL_SIZE+1,SQUARE_PIXEL_SIZE+1),$context.globalAlpha=1}}class AnimatedSprite extends Sprite{constructor(t,e,i,n,s){super(t,e,i,n,s),this._sy=0,this._frame=0,this._animation=[0]}animate(t,e,i=0){this._animation=t,this._sy=e,this._frame=i}update(){this.nextFrame()}render(){super.render(this._animation[this._frame]*SPRITE_PIXEL_SIZE,this._sy*SPRITE_PIXEL_SIZE)}nextFrame(){return++this._frame!==this._animation.length||(this._frame=0,!1)}}class Camera{constructor(t=0,e=0){this.x=t,this.y=e}clampCoordinate(t){return(t-CAMERA_SIZE/2).clamp(0,GRID_SIZE-1-CAMERA_SIZE)}update(){this.x=this.clampCoordinate($player.x),this.y=this.clampCoordinate($player.y),$context.setTransform(1,0,0,1,-this.x*SQUARE_PIXEL_SIZE,-this.y*SQUARE_PIXEL_SIZE)}}const World=function(){function t(t){for(let i=0;i<GRID_SIZE;++i)for(let n=0;n<GRID_SIZE;++n)t[i][n]||a(t,i,n)>=e&&(t[i][n]=GRID_TILES.TREASURE);return t}const e=5,i=(t,e)=>Array(e).fill().map(t),n=()=>int(Math.random()<.37),s=t=>i(()=>i(n,t),t),a=(t,e,i)=>{let n=0;for(let s=e-1;s<e+2;++s)for(let a=i-1;a<i+2;++a)if(s===e&&a===i);else if(s<0||a<0||s>=t.length||s>=t[0].length)++n;else if(t[s][a]===GRID_TILES.WALL)++n;else if(t[s][a]===GRID_TILES.TREASURE)return n;return n},o=t=>t.map((e,i)=>e.map((e,n)=>{const s=a(t,i,n);return int(e?s>=3:s>4)}));class r{constructor(){this.grid=this.generateMap(),this.tiles=[new Sprite(SPRITE_PIXEL_SIZE,SPRITE_PIXEL_SIZE,$images.earth,-1,-1),new Sprite(SPRITE_PIXEL_SIZE,SPRITE_PIXEL_SIZE,$images.wall,-1,-1),new Sprite(SPRITE_PIXEL_SIZE,SPRITE_PIXEL_SIZE,$images.treasure,-1,-1)]}generateMap(){let e=s(GRID_SIZE);for(let t=0;t<2;++t)e=o(e);return t(e)}do(t){for(let e=$camera.minX;e<$camera.maxX;++e)for(let i=$camera.minY;i<$camera.maxY;++i){let n=this.tiles[this.grid[e][i]];n.x=e,n.y=i,t(n)}}render(){this.do(t=>t.render())}shadow(){this.do(t=>t.shadow())}}return r}();class Player extends AnimatedSprite{constructor(t,e,i,n,s,a){super(e,i,n,s,a),this.id=t,this.state=this.stopped,this.direction=DOWN,this.walkAnimation=[1,2,1,0],this._stepSize=1/this.walkAnimation.length,this.animate(this.walkAnimation,this.direction)}update(){this.state(),this.x=this.x.clamp(0,GRID_SIZE-1),this.y=this.y.clamp(0,GRID_SIZE-1)}die(){this.animate([0],DEAD),$game.ended=!0}moveDirection(t,e=!1){(e||this.direction===t)&&(this.state=this.walking),this.animate(this.walkAnimation,t),this.direction=t}stopped(){let t=GET_DIRECTION();void 0!==t&&this.moveDirection(t),this.state===this.walking&&this.walking()}walking(){switch(this.direction){case UP:this.y-=this._stepSize,1===$world.grid[this.x][Math.floor(this.y).clamp(0,GRID_SIZE-1)]&&(this.y+=this._stepSize);break;case DOWN:this.y+=this._stepSize,1===$world.grid[this.x][Math.ceil(this.y).clamp(0,GRID_SIZE-1)]&&(this.y-=this._stepSize);break;case LEFT:this.x-=this._stepSize,1===$world.grid[Math.floor(this.x).clamp(0,GRID_SIZE-1)][this.y]&&(this.x+=this._stepSize);break;case RIGHT:this.x+=this._stepSize,1===$world.grid[Math.ceil(this.x).clamp(0,GRID_SIZE-1)][this.y]&&(this.x-=this._stepSize)}this.nextFrame()||(this.state=this.stopped,this.x=Math.round(this.x),this.y=Math.round(this.y))}}const Enemy=function(){let t=0;class e{constructor(t,e,i,n,s,a){Object.assign(this,{id:t+","+e,parent:n,dir:a,x:t,y:e,g:i,f:i+Math.abs(s.x-t)+Math.abs(s.y-e)})}getNeighbours(t){return[{x:this.x-1,y:this.y,d:LEFT},{x:this.x+1,y:this.y,d:RIGHT},{x:this.x,y:this.y-1,d:UP},{x:this.x,y:this.y+1,d:DOWN}].map(i=>new e(i.x,i.y,this.g+1,this,t,i.d)).filter(t=>$world.grid[t.x]&&$world.grid[t.x][t.y]<=GRID_TILES.EMPTY)}}class i extends Player{constructor(e,i,n,s,a,o){super(e,i,n,s,a,o),this.path=[],this.target=$player,this.walkAnimation=[0,1,2,1,0].map(e=>e+3*t),this._stepSize=1/this.walkAnimation.length,this.animate(this.walkAnimation,this.direction),t=(t+1)%4}reconstructPath(t,e){let i=[];for(;e.parent;)i.unshift(e.dir),e=e.parent;return i}goTo(t,i){let n={x:Math.round(t),y:Math.round(i)},s=new Map,a=[new e(this.x,this.y,0,null,n,null)];for(;a.length>0;){let t=a.shift();if(s.set(t.id,t),t.g>6)break;if(t.x===n.x&&t.y===n.y)return this.path=this.reconstructPath(s,t),void console.log("I CAN SEE THE PLAYER");for(let e of t.getNeighbours(n))if(!s.has(e.id)){let i=a.findIndex(e=>e.id===t.id);i===-1?a.push(e):e.g<a[i].g&&(a[i]=e),a.sort((t,e)=>t.f>e.f)}}this.getRandomMove()}getRandomMove(){Math.random()<.3&&(this.direction=Math.floor(4*Math.random())),this.moveDirection(this.direction)}stopped(){if((0===this.path.length||this.path.length>6)&&(this.goTo($player.x,$player.y),this.path.length>6))return this.getRandomMove(),this.state();this.moveDirection(this.path.shift(),!0),this.state()}}return i}();!function(){function t(){let t=GRID_SIZE*Math.floor(Math.min(window.innerWidth,window.innerHeight)/GRID_SIZE);$context.canvas.width=t,$context.canvas.height=t,$context.imageSmoothingEnabled=!1,SQUARE_PIXEL_SIZE=t/(CAMERA_SIZE+1)}function e(){c=Date.now(),c-u>=FRAME_TIME&&!$game.ended&&(i(),u=c),n(),$game.paused||requestAnimationFrame(e)}function i(){$player.update(),$world.grid[Math.round($player.x)][Math.round($player.y)]===GRID_TILES.TREASURE&&($world.grid[Math.round($player.x)][Math.round($player.y)]=0,document.getElementById("chests").innerHTML=++$game.chests);for(let t of $enemies)t.update(),Math.abs(t.x-$player.x)<.4&&Math.abs(t.y-$player.y)<.4&&($player.die(),$game.ended=!0,document.getElementById("dead").style.display="block");$camera.update()}function n(){$camera.minX=Math.floor($camera.x).clamp(0,GRID_SIZE),$camera.minY=Math.floor($camera.y).clamp(0,GRID_SIZE),$camera.maxX=Math.ceil($camera.x+CAMERA_SIZE+1).clamp(0,GRID_SIZE),$camera.maxY=Math.ceil($camera.y+CAMERA_SIZE+1).clamp(0,GRID_SIZE);let{width:width,height:height}=$context.canvas;$context.clearRect(0,0,width,height),$world.render(),$player.render();for(let t of $enemies)t.render();$world.shadow()}function s(t){$images=t,$world=new World,$camera=new Camera;var i=o(0,0,$world.grid.length,$world.grid[0].length);$player=new Player(0,SPRITE_PIXEL_SIZE,SPRITE_PIXEL_SIZE,$images.player,i.x,i.y);for(let t of range(1,13)){let e=o(0,0,$world.grid.length,$world.grid[0].length);$enemies.push(new Enemy(t,SPRITE_PIXEL_SIZE,SPRITE_PIXEL_SIZE,$images.enemies,e.x,e.y))}a(),$playMusic(),requestAnimationFrame(e)}function a(){var t,e,i,n="undefined"!=typeof AudioContext?new AudioContext:new webkitAudioContext,s=n.currentTime,a=["-   e","Bb3 e","A3  e","Bb3 e","G3  e","A3  e","F3  e","G3  e","E3  e","F3  e","G3  e","F3  e","E3  e","F3  e","D3  q","-   e","Bb3 s","A3  s","Bb3 e","G3  e","A3  e","G3  e","F3  e","G3  e","E3  e","F3  e","G3  e","F3  e","E3  s","F3  s","E3  e","D3  q"],o=["-   e","D4  e","C4  e","D4  e","Bb3 e","C4  e","A3  e","Bb3 e","G3  e","A3  e","Bb3 e","A3  e","G3  e","A3  e","F3  q","-   e","D4  s","C4  s","D4  e","Bb3 e","C4  e","Bb3 e","A3  e","Bb3 e","G3  e","A3  e","Bb3 e","A3  e","G3  s","A3  s","G3  e","F3  q"],r=["D3  q","-   h","D3  q","A2  q","-   h","A2  q","Bb2 q","-   h","Bb2 q","F2  h","A2  h"];t=new TinyMusic.Sequence(n,132,a),e=new TinyMusic.Sequence(n,132,o),i=new TinyMusic.Sequence(n,132,r),t.staccato=.55,e.staccato=.55,i.staccato=.05,i.smoothing=.4,t.gain.gain.value=.5,e.gain.gain.value=.4,i.gain.gain.value=.325,t.mid.frequency.value=800,t.mid.gain.value=3,e.mid.frequency.value=1200,i.mid.gain.value=3,i.bass.gain.value=6,i.bass.frequency.value=80,i.mid.gain.value=-6,i.mid.frequency.value=500,i.treble.gain.value=-2,i.treble.frequency.value=1400,$playMusic=(()=>{s=n.currentTime,t.play(s),e.play(s+60/132*16),i.play(s)}),$pauseMusic=(()=>{t.stop(),e.stop(),i.stop()})}function o(t,e,i,n,s){s||(s=(t=>$world.grid[t.x][t.y]===GRID_TILES.EMPTY));var a=[];for(let o of range(t,i))for(let t of range(e,n))s({x:o,y:t})&&a.push({x:o,y:t});if(a.length)return a[Math.floor(Math.random()*a.length)]}let r=document.getElementById("cvs"),h=["player","enemies","earth","wall","treasure"];$context=r.getContext("2d"),t();var c,u=Date.now();window.addEventListener("resize",t),window.onblur=(()=>{$game.paused=!0,$keys={},document.getElementById("paused").style.display="block"}),window.onfocus=(()=>{$game.paused&&(document.getElementById("paused").style.display="none",$game.paused=!1,requestAnimationFrame(e))}),function(t){let e=h.length,i={},n=()=>!--e&&t(i);for(let t of h)i[t]=new Image,i[t].src="img/"+t+".png",i[t].onload=n}(s)}(),function(){function t(t,e){$keys[t]=e}document.addEventListener("keydown",e=>t(e.keyCode,!0),!1),document.addEventListener("keyup",e=>t(e.keyCode,!1),!1)}();