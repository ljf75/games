(function(){"use strict";function a(a,b,d){return c(Math.max(a,b),d)}var b=Math.floor,c=Math.min;class d{constructor(a){this.core=a,this.allowUpdate=!1,this.currentState={}}switchState(a){this.allowUpdate=!1,this.currentState=a,this.currentState.init?this.currentState.init(this.core).then(()=>{this.allowUpdate=!0}):this.allowUpdate=!0}runUpdate(a){this.allowUpdate&&this.currentState.update&&this.currentState.update(a,this.core)}runDraw(){this.allowUpdate&&this.currentState.draw&&this.currentState.draw(this.core)}}class e{constructor(){this.keys={},window.addEventListener("keydown",a=>{this.keys[a.key]=!0}),window.addEventListener("keyup",a=>{delete this.keys[a.key]})}}class f{constructor(a,b,c){this.width=a.width,this.height=a.height,this.x=b,this.y=c}centerOnEntity(b,c){var d=b.x-this.width/2-b.width/2,e=b.y-this.height/2+b.height/2;if(c){let b=c.width*c.tileSize-this.width,f=c.height*c.tileSize-this.height;d=a(d,0,b),e=a(e,0,f)}return this.x=d,this.y=e,!0}resetPos(){this.x=0,this.y=0}fitsInCamera(){return!0}}class g{constructor(){this.loaded={}}loadImages(a){var b=this.loaded,c=[];for(var d in a){let e=new Promise((c,e)=>{let f=d,g=new Image;g.src=a[f],g.onload=function(){console.log("Loaded file "+f),b[f]=this,c(this)},g.onerror=e});c.push(e)}return Promise.all(c)}}class h{constructor(){this.texts={}}drawLoadingScreen(a){a.ctx.fillStyle="#000000",a.ctx.fillRect(0,0,a.width,a.height),a.ctx.fillStyle="#FFFFFF",a.ctx.font=32/a.scale+"px sans-serif",a.ctx.fillText("Loading...",16/a.scale,48/a.scale)}}class i{constructor(a,c,d,e){this.width=a,this.height=c,this.tileSheet=e,this.tileSize=d,this._tilesPerRow=b(e.width/d),this.loaded={map:[],collision:[],entities:[]}}loadMap(a){return this.loaded=a,!0}drawArea(a,c,d,e,f){if(!this.loaded||!this.loaded.map)return!1;for(var g={x:b(c/this.tileSize),y:b(d/this.tileSize)},h={x:b((c+e)/this.tileSize),y:b((d+f)/this.tileSize)},d=g.y;d<=h.y;d++)for(var c=g.x;c<=h.x;c++){if(!this.loaded.map[d]||!this.loaded.map[d][c]||1>this.loaded.map[d][c])continue;let e=this.loaded.map[d][c]-1,f=e%this._tilesPerRow*this.tileSize,g=b(e/this._tilesPerRow)*this.tileSize,h=c*this.tileSize,i=d*this.tileSize;a.drawImage(this.tileSheet,f,g,this.tileSize,this.tileSize,h,i,this.tileSize,this.tileSize)}}isSolid(a,b){return!!(this.loaded&&this.loaded.collision&&this.loaded.collision[b]&&this.loaded.collision[b][a]&&0<this.loaded.collision[b][a])}spawnEntityByType(a,b,c){var d=[];if(this.loaded&&this.loaded.entities)for(var e=0;e<this.loaded.entities.length;e++)this.loaded.entities[e].type==a&&d.push(new b(this.loaded.entities[e].x,this.loaded.entities[e].y,c));return d}calculateCollision(a,c,d,e,f=0,g=0){var h={left:!1,right:!1,top:!1,bottom:!1};if(!this.loaded||!this.loaded.collision)return h;for(var i=a+f,j=c+g,k={yStart:b(j/this.tileSize),yEnd:b((j+e)/this.tileSize),xStart:b(i/this.tileSize),xEnd:b((i+d)/this.tileSize)},l=k.yStart;l<=k.yEnd;l++)this.isSolid(k.xStart,l)&&(h.left=!0),this.isSolid(k.xEnd,l)&&(h.right=!0);for(var m=k.xStart;m<=k.xEnd;m++)this.isSolid(m,k.yStart)&&(h.top=!0),this.isSolid(m,k.yEnd)&&(h.bottom=!0);return h}}class j{constructor(a,b,c,d){this.x=a,this.y=b,this.width=c,this.height=d,this.dead=!1}draw(a){a.ctx.fillStyle="#FF0000",a.ctx.fillRect(this.x,this.y,this.width,this.height)}collidesWith(a){return!a.dead&&this.x<a.x+a.width&&this.x+this.width>a.x&&this.y<a.y+a.height&&this.y+this.height>a.y}}class k{constructor(a,c,d){this.spritesheet=a,this.framewidth=c,this.frameheight=d,this.anims={},this.currentAnim=null,this.currentFrameIndex=0,this.playing=!1,this._timer=0,this._framesPerRow=b(a.width/c)}addAnimation(a,b,c){this.anims[a]={fps:b,changeFrameEvery:1e3/b,frames:c},this.currentAnim||this.playAnimation(a)}playAnimation(a,b){if(this.playing=!0,!a||!this.anims[a])throw"no animation by the name "+a+" was defined!";else(b||this.currentAnim!=this.anims[a])&&(this.currentFrameIndex=0,this.currentAnim=this.anims[a])}pause(){this.playing=!1}update(a){return!!(this.playing&&this.currentAnim&&this.currentAnim.changeFrameEvery)&&void(this._timer+=a,this._timer>=this.currentAnim.changeFrameEvery&&(this._timer=0,this.currentFrameIndex++,this.currentFrameIndex>=this.currentAnim.frames.length&&(this.currentFrameIndex=0)))}getCurrentFrame(){if(!this.currentAnim||!this.currentAnim.frames)throw"no animation playing!";var a=this.currentAnim.frames[this.currentFrameIndex];return{frame:a,x:a%this._framesPerRow*this.framewidth,y:b(a/this._framesPerRow)*this.frameheight,width:this.framewidth,height:this.frameheight}}}class l extends j{constructor(a,b,c,d=3){super(a,b,16,32),this.dead=!1,this.health=d,this.spritesheet=c,this.anims=new k(c,this.width,this.height),this.anims.addAnimation("walk_r",7,[0,1,2,1]),this.anims.addAnimation("punch_r",7,[3]),this.anims.addAnimation("walk_l",7,[5,6,7,6]),this.anims.addAnimation("punch_l",7,[4]),this.facing="r",this.speed=3,this.jumpVelocity=6,this.gravity=.25,this.maxGravity=5,this.vel={x:0,y:0},this.jumpCooldown=150,this.jumpCooldownCounter=0,this.attackReady=!1,this.attacking=!1,this.attackLength=100,this.attackCounter=0,this.timeSinceLastAttack=0,this.attackCooldown=500}update(a,b,c){return!this.dead&&void(this.anims.update(a),this._update_attack(a,b),this._update_movement(a,b,c))}_update_attack(a,b){this.timeSinceLastAttack+=a,0<this.attackCounter?(this.attackCounter-=a,this.attackReady=!1):(!this.attackReady&&(this.attackReady=!b.input.keys.z,this.anims.playAnimation("walk_"+this.facing),this.anims.pause()),this.attacking=!1),this.attackReady&&this.timeSinceLastAttack>=this.attackCooldown&&b.input.keys.z&&(this.timeSinceLastAttack=0,this.attackCounter=this.attackLength,this.attacking=!0,this.anims.playAnimation("punch_"+this.facing))}_update_movement(a,b,d){if(this.vel.x=0,this.vel.y=c(this.vel.y+this.gravity,this.maxGravity),this.attacking||(b.input.keys.ArrowLeft?(this.vel.x-=this.speed,this.facing="l",this.anims.playAnimation("walk_l")):b.input.keys.ArrowRight?(this.vel.x+=this.speed,this.facing="r",this.anims.playAnimation("walk_r")):this.anims.pause()),d){let a=d.calculateCollision(this.x,this.y,this.width,this.height,this.vel.x,0);a.left&&0>this.vel.x?this.vel.x=0:a.right&&0<this.vel.x&&(this.vel.x=0)}if(!this.attacking&&(b.input.keys.ArrowUp||b.input.keys.x)&&0>=this.jumpCooldownCounter&&(this.vel.y-=this.jumpVelocity,this.jumpCooldownCounter=this.jumpCooldown),d){let b=d.calculateCollision(this.x,this.y,this.width,this.height,0,this.vel.y);b.bottom&&0<this.vel.y?this.vel.y=0:b.top&&0>this.vel.y&&(this.vel.y=0),0<this.jumpCooldownCounter&&b.bottom&&(this.jumpCooldownCounter-=a)}this.x+=this.vel.x,this.y+=this.vel.y}draw(a){let b=this.anims.getCurrentFrame();a.drawImage(this.spritesheet,b.x,b.y,b.width,b.height,this.x,this.y,this.width,this.height)}onCollideWithEntity(a){this.attacking&&a.takeDamage&&a.takeDamage(this,1)}takeDamage(a,b){this.health-=b,0>=this.health&&(this.dead=!0)}}class m extends j{constructor(a,b,c){super(a,b,16,32),this.spritesheet=c,this.anims=new k(c,16,32),this.anims.addAnimation("walk_r",7,[0,1,2,1]),this.anims.addAnimation("punch_r",7,[3]),this.anims.addAnimation("walk_l",7,[5,6,7,6]),this.anims.addAnimation("punch_l",7,[4]),this.speed=-2,this.regenIntervalLength=500,this.regenIntervalCounter=this.encounterCooldownLength,this.attackCountdownLength=5,this.attackCountdownCounter=this.attackCountdownLength,this.attacking=!1,this.hitPlayer=!1,this.dead=!1}update(a,b,c){if(this.anims.update(a),0<this.regenIntervalCounter?this.regenIntervalCounter-=a:(this.attackCountdownCounter=this.attackCountdownLength,this.hitPlayer=!1),c){let a=c.calculateCollision(this.x,this.y,this.width,this.height,this.speed,0);a.right||a.left?this.speed=-this.speed:this.x+=this.speed}0<this.speed?this.anims.playAnimation("walk_r"):this.anims.playAnimation("walk_l")}draw(a){let b=this.anims.getCurrentFrame();a.drawImage(this.spritesheet,b.x,b.y,b.width,b.height,this.x,this.y,this.width,this.height)}onCollideWithEntity(a){if(this.regenIntervalCounter=this.regenIntervalLength,!this.hitPlayer)if(0<this.attackCountdownCounter)this.attackCountdownCounter--;else{this.attackCountdownCounter=this.attackCountdownLength;let b=this.x>a.x?"l":"r";this.anims.playAnimation("punch_"+b),a.takeDamage&&a.takeDamage(this,1),this.hitPlayer=!0}}takeDamage(){this.dead=!0}}class n extends j{constructor(a,b,c,d=-3){super(a,b,16,16),this.speed=d,this.spritesheet=c,this.anims=new k(c,16,32),this.anims.addAnimation("default",7,[0,1])}update(a){this.anims.update(a),this.x+=this.speed}draw(a){let b=this.anims.getCurrentFrame();a.drawImage(this.spritesheet,b.x,b.y,b.width,b.height,this.x,this.y,this.width,this.height)}onCollideWithEntity(a){a.takeDamage(this,999)}}class o extends j{constructor(a,b,c,d,e=[]){super(a,b,16,32),this.dead=!1,this.spritesheet=c,this.resetAnimationAfter=500,this.anims=new k(c,this.width,this.height),this.anims.addAnimation("idle_r",1,[1]),this.anims.addAnimation("attack_r",1,[3]),this.anims.addAnimation("idle_l",1,[6]),this.anims.addAnimation("attack_l",1,[4]),this.attackInterval=1250,this.attackCounter=0,this.projectiles=[],this.projectileSpritesheet=d,this.projectileSpeed=3,this.phases=e,this.currentPhase=0,e[this.currentPhase]&&(this.x=e[this.currentPhase].x,this.y=e[this.currentPhase].y)}update(a,b,c){if(this.dead)return!1;if(this.facing=c.x<this.x?"l":"r",this.attackCounter+=a,this.attackCounter>=this.attackInterval){this.attackCounter=0,this.anims.playAnimation("attack_"+this.facing);let a=c.x<this.x?-this.projectileSpeed:this.projectileSpeed;this.projectiles.push(new n(this.x,this.y,this.projectileSpritesheet,a))}else this.attackCounter>=this.resetAnimationAfter&&this.anims.playAnimation("idle_"+this.facing);for(var d=0;d<this.projectiles.length;d++){if(0>this.projectiles[d].x){this.projectiles.splice(d,1),d--;continue}this.projectiles[d].update(a),this.projectiles[d].collidesWith(c)&&(c.onCollideWithEntity(this.projectiles[d]),this.projectiles[d].onCollideWithEntity(c))}}draw(a){if(this.dead)return!1;let b=this.anims.getCurrentFrame();a.drawImage(this.spritesheet,b.x,b.y,b.width,b.height,this.x,this.y,this.width,this.height);for(var c=0;c<this.projectiles.length;c++)this.projectiles[c].draw(a)}takeDamage(){if(this.currentPhase++,this.phases[this.currentPhase]){let a=this.phases[this.currentPhase];this.x=a.x,this.y=a.y}else this.dead=!0}}const p=["CONGRATULATIONS! YOU DID IT!","","You might have the police on your case","now, but at least you're back online!","Good job!"];class q extends h{init(){return new Promise(a=>{a()})}draw(a){a.ctx.font="24px sans-serif",a.ctx.fillStyle="#FFF";for(var b=0;b<p.length;b++)a.ctx.fillText(p[b],8,24*(b+1)/a.scale+8)}}const r={entities:[],map:[[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,4],[4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],[4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,4]],collision:[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]};class s extends h{constructor(a=3){super(),this.playerHealth=a}init(a){return this.drawLoadingScreen(a),new Promise((b,c)=>{a.assets.loadImages({tiles:"./assets/office_tiles.png",player:"./assets/player.png",enemy:"./assets/enemy.png",projectile:"./assets/projectile.png"}).then(()=>{a.camera.resetPos(),this.tilemap=new i(30,20,16,a.assets.loaded.tiles),this.tilemap.loadMap(r),this.player=new l(32,260,a.assets.loaded.player,this.playerHealth),this.boss=new o(448,270,a.assets.loaded.enemy,a.assets.loaded.projectile,[{x:448,y:270},{x:16,y:270},{x:232,y:270}]),b()}).catch(c)})}update(a,b){return this.player.dead?(b.input.keys.Enter&&b.stateManager.switchState(new s),!0):this.boss.dead?(b.stateManager.switchState(new q),!0):void(this.boss.update(a,b,this.player),this.player.update(a,b,this.tilemap),this.player.collidesWith(this.boss)&&this.player.onCollideWithEntity(this.boss))}draw(a){a.ctx.fillStyle="#949494",a.ctx.fillRect(0,0,a.width,a.height),this.tilemap.drawArea(a,a.camera.x,a.camera.y,a.camera.width,a.camera.height),this.boss.draw(a),this.player.draw(a),a.ctx.fillStyle="#000",a.ctx.fillRect(0,0,48,18),a.ctx.fillStyle="#FFF",a.ctx.font="16px sans-serif",a.ctx.fillText("HP: "+this.player.health,1,16),this.player.dead&&(a.ctx.fillStyle="#ff0000",a.ctx.font="32px sans-serif",a.ctx.fillText("GAME OVER.",a.width/3-16,a.height/2-32),a.ctx.font="16px sans-serif",a.ctx.fillText("Press ENTER to retry.",a.width/3,a.height/2))}}const t={entities:[{type:"EntityEnemy",x:340,y:460},{type:"EntityEnemy",x:52,y:380},{type:"EntityEnemy",x:404,y:380},{type:"EntityEnemy",x:444,y:300},{type:"EntityEnemy",x:192,y:300},{type:"EntityEnemy",x:268,y:300},{type:"EntityEnemy",x:424,y:300},{type:"EntityEnemy",x:368,y:220},{type:"EntityEnemy",x:396,y:220},{type:"EntityEnemy",x:232,y:380},{type:"EntityEnemy",x:80,y:220},{type:"EntityEnemy",x:236,y:140},{type:"EntityEnemy",x:284,y:140},{type:"EntityEnemy",x:192,y:140},{type:"EntityEnemy",x:252,y:60},{type:"EntityEnemy",x:212,y:60},{type:"EntityEnemy",x:232,y:60},{type:"EntityEnemy",x:400,y:140},{type:"EntityEnemy",x:344,y:140}],map:[[4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[0,0,0,2,0,0,0,2,0,0,0,2,0,7,0,2,0,0,0,2,0,7,7,2,0,0,0,2,0,0,0,4],[3,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,0,0,0,4],[4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4],[4,0,0,2,0,0,0,2,7,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,7,7,0,2,0,0,8,4],[4,0,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,4],[4,0,0,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,4],[4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,4],[4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,0,0,0,4],[4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,4],[4,0,0,2,0,7,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,7,0,2,0,0,0,2,0,0,0,4],[4,0,0,0,3,3,3,1,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,1,3,4],[4,0,0,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,4],[4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[4,0,0,2,0,0,0,2,0,7,0,2,0,0,0,2,0,0,0,2,0,0,0,2,7,7,0,2,0,0,0,4],[4,3,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,4],[4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,0,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,4],[4,0,0,2,0,7,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,7,0,2,0,0,0,2,0,0,0,4],[4,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],[4,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,4]],collision:[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]};class u extends h{constructor(a=3){super(),this.playerHealth=a}init(a){return this.drawLoadingScreen(a),new Promise((b,c)=>{a.assets.loadImages({tiles:"./assets/office_tiles.png",player:"./assets/player.png",enemy:"./assets/enemy.png"}).then(()=>{this.tilemap=new i(32,32,16,a.assets.loaded.tiles),this.tilemap.loadMap(t),this.player=new l(32,448,a.assets.loaded.player),this.trigger=new j(0,0,32,96),this.enemies=this.tilemap.spawnEntityByType("EntityEnemy",m,a.assets.loaded.enemy),b()}).catch(c)})}update(a,b){if(this.player.dead)return b.input.keys.Enter&&b.stateManager.switchState(new u),!0;if(this.player.collidesWith(this.trigger)||window.skipToBossFight)return b.stateManager.switchState(new s(this.player.health)),!0;this.player.update(a,b,this.tilemap),b.camera.centerOnEntity(this.player,this.tilemap);for(var c=0;c<this.enemies.length;c++){if(this.enemies[c].dead){this.enemies.splice(c,1),c--;continue}this.enemies[c].update(a,b,this.tilemap),this.enemies[c].collidesWith(this.player)&&(this.enemies[c].onCollideWithEntity(this.player),this.player.onCollideWithEntity(this.enemies[c]))}}draw(a){a.ctx.fillStyle="#949494",a.ctx.fillRect(0,0,a.width,a.height),this.tilemap.drawArea(a,a.camera.x,a.camera.y,a.camera.width,a.camera.height);for(var b=0;b<this.enemies.length;b++)this.enemies[b].dead||this.enemies[b].draw(a);this.player.draw(a),a.ctx.fillStyle="#000",a.ctx.fillRect(0,0,48,18),a.ctx.fillStyle="#FFF",a.ctx.font="16px sans-serif",a.ctx.fillText("HP: "+this.player.health,1,16),this.player.dead&&(a.ctx.fillStyle="#ff0000",a.ctx.font="32px sans-serif",a.ctx.fillText("GAME OVER.",a.width/3-16,a.height/2-32),a.ctx.font="16px sans-serif",a.ctx.fillText("Press ENTER to retry.",a.width/3,a.height/2))}}const v=["OFFLINE?! AGAIN?!","THIS IS THE 3RD TIME TODAY!","My ISP will pay for this..."];class w extends h{init(){return new Promise(a=>{a()})}update(a,b){b.input.keys.z&&b.stateManager.switchState(new u)}draw(a){a.ctx.font="24px sans-serif",a.ctx.fillStyle="#FFF";for(var b=0;b<v.length;b++)a.ctx.fillText(v[b],8,24*(b+1)/a.scale+8);a.ctx.fillStyle="#CCC",a.ctx.font="16px sans-serif",a.ctx.fillText("Press Z to continue",a.width/3,a.height-8)}}var x=new class{constructor(a,b){if(this.canvas=document.getElementById(a),null==this.canvas)throw"canvas could not be found!";this.width=this.canvas.width/b,this.height=this.canvas.height/b,this.scale=b,this.ctx=this.canvas.getContext("2d"),this.ctx.scale(b,b),this.stateManager=new d(this),this.input=new e,this.camera=new f(this,0,0),this.assets=new g;var c=Date.now(),h=a=>{var b=a-c;c=a,this.stateManager.runUpdate(b),this.stateManager.allowUpdate&&(this.ctx.fillStyle="#000000",this.ctx.fillRect(0,0,this.width,this.height)),this.stateManager.runDraw(),this.frameRequestId=window.requestAnimationFrame(h)};h()}drawImage(a,b,c,d,e,f,g){this.camera?this.ctx.drawImage(a,b,c,d,e,f-this.camera.x,g-this.camera.y,d,e):this.ctx.drawImage(a,b,c,d,e,f,g,d,e)}}("game-canvas",1);x.stateManager.switchState(new class extends h{init(){return new Promise(a=>{a()})}update(a,b){b.input.keys.Enter&&b.stateManager.switchState(new w)}draw(a){let b=a.ctx.createLinearGradient(0,0,0,a.height);b.addColorStop(0,"#530000"),b.addColorStop(.5,"#000"),b.addColorStop(1,"#000"),a.ctx.fillStyle=b,a.ctx.fillRect(0,0,a.width,a.height),a.ctx.fillStyle="#FFF",a.ctx.font="64px sans-serif",a.ctx.fillText("OFFL1N3",a.width/4-32,a.height/3),a.ctx.fillStyle="#CCC",a.ctx.font="16px sans-serif",a.ctx.fillText("Press ENTER to start",a.width/4+32,a.height/2)}})})();