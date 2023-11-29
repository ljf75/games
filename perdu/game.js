!function(){function e(){this.codes={32:"pause",37:"left",39:"right",38:"forward"},this.states={pause:!1,left:!1,right:!1,forward:!1},document.addEventListener("keydown",this.onKey.bind(this,!0),!1),document.addEventListener("keyup",this.onKey.bind(this,!1),!1)}function i(e,i,r){var t=document.createElement("canvas");t.width=i,t.height=r,e(t.getContext("2d")),this.image=new Image,this.image.src=t.toDataURL("image/png"),this.width=i,this.height=r}function r(e,i){var r=e.place();this.x=r.x,this.y=r.y,this.direction=i,this.score=0,this.dead=!1}function t(e,r){this.texture=new i(h,512,512),this.width=.5,this.height=.5,this.floorOffset=0,this.distanceFromPlayer=0,this.x=e,this.y=r}function o(e){this.size=e,this.wallGrid=new Uint8Array(e*e),this.skybox=new i(T,1200,750),this.wallTexture=new i(u,1024,1024),this.light=0,this.chickens=[];for(var r=0;r<this.size;r++)for(var o=0;o<this.size;o++)0===r||r===this.size-1||0===o||o===this.size-1?this.wallGrid[r*this.size+o]=1:this.wallGrid[r*this.size+o]=0;for(var r=0;r<20;r++){var s=this.place();this.wallGrid[s.x*this.size+s.y]=1}for(var r=0;r<12;r++){var s=this.place();this.chickens.push(new t(s.x,s.y)),this.wallGrid[s.x*this.size+s.y]=2}}function s(e,i,r){this.ctx=e.getContext("2d"),this.width=e.width=.5*window.innerWidth,this.height=e.height=.5*window.innerHeight,this.resolution=i,this.spacing=this.width/i,this.focalLength=r||.8,this.range=a?8:14,this.lightRange=5,this.scale=(this.width+this.height)/1200}function n(){this.frame=this.frame.bind(this),this.lastTime=0,this.callback=function(){}}var l=2*Math.PI,a=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);e.prototype.onKey=function(e,i){var r=this.codes[i.keyCode];void 0!==r&&(this.states[r]=e,i.preventDefault&&i.preventDefault(),i.stopPropagation&&i.stopPropagation())},r.prototype.rotate=function(e){this.direction=(this.direction+e+l)%l},r.prototype.walk=function(e,i){var r=this.x,t=this.y,o=this.direction*(180/Math.PI);o>=337.5&&o<22.5?t=this.y-e:o>=22.5&&o<67.5?(t=this.y-e,r=this.x+e):o>=67.5&&o<112.5?r=this.x+e:o>=112.5&&o<157.5?(t=this.y+e,r=this.x+e):o>=157.5&&o<202.5?t=this.y+e:o>=202.5&&o<247.5?(t=this.y+e,r=this.x-e):o>=247.5&&o<292.5?r=this.x-e:o>=292.5&&o<337.5&&(t=this.y-e,r=this.x-e),i.get(r,t)<=0&&(this.x=r,this.y=t),i.updateChickens(this)},r.prototype.pause=function(e){console.log("pausing"),e.updateChickens(this)},r.prototype.update=function(e,i,r){e.pause&&this.pause(i),e.left&&this.rotate(-Math.PI*r),e.right&&this.rotate(Math.PI*r),e.forward&&this.walk(1,i)},t.prototype.update=function(e,i){var r=!1,t=this,o=function(e,i,r){for(var o=[{x:t.x+r,y:t.y+i},{x:t.x,y:t.y+i},{x:t.x+r,y:t.y}],s=0;s<o.length;s++)if(0===e.get(o[s].x,o[s].y))return t.x=o[s].x,t.y=o[s].y,!0;for(var s=0;s<o.length;s++)if(1===e.get(o[s].x,o[s].y))return t.x=o[s].x,t.y=o[s].y,!0;return!1};return this.y<i.y?this.x<i.x?r=o(e,1,1):this.x>i.x?r=o(e,1,-1):(this.y=this.y+1,r=!0):this.y>i.y?this.x<i.x?r=o(e,-1,1):this.x>i.x?r=o(e,-1,-1):(this.y=this.y-1,r=!0):this.x<i.x?(this.x=this.x+1,r=!0):this.x>i.x&&(this.x=this.x-1,r=!0),r},o.prototype.place=function(){var e,i;do{e=Math.floor(Math.random()*this.size),i=Math.floor(Math.random()*this.size)}while(0!==this.wallGrid[e*this.size+i]);return{x:e,y:i}},o.prototype.get=function(e,i){return e=Math.floor(e),i=Math.floor(i),e<0||e>this.size-1||i<0||i>this.size-1?-1:this.wallGrid[i*this.size+e]},o.prototype.cast=function(e,i,r){function t(e){var i=o(l,a,e.x,e.y),n=o(a,l,e.y,e.x,!0),h=i.length2<n.length2?s(i,1,0,e.distance,i.y):s(n,0,1,e.distance,n.x);return h.distance>r?[e]:[e].concat(t(h))}function o(e,i,r,t,o){if(0===i)return h;var s=i>0?Math.floor(r+1)-r:Math.ceil(r-1)-r,n=s*(e/i);return{x:o?t+n:r+s,y:o?r+s:t+n,length2:s*s+n*n}}function s(e,i,r,t,o){var s=a<0?i:0,h=l<0?r:0;return e.height=n.get(e.x-s,e.y-h),e.distance=t+Math.sqrt(e.length2),e.object=n.chickens[Math.floor(e.y-h)*n.size+Math.floor(e.x-s)],e.shading=i?a<0?2:0:l<0?2:1,e.offset=o-Math.floor(o),e}var n=this,l=Math.sin(i),a=Math.cos(i),h={length2:1/0};return t({x:e.x,y:e.y,height:0,distance:0})},o.prototype.updateChickens=function(e){var i=this;this.chickens.forEach(function(r,t,o){var s=r.x,n=r.y;if(r.update(i,e)){i.wallGrid[n*i.size+s]=0;var l=i.get(r.x,r.y);0===l?i.wallGrid[r.y*i.size+r.x]=2:1===l?(o.splice(t,1),e.score++):2===l&&(o.splice(t,1),e.score++,i.wallGrid[r.y*i.size+r.x]=0),r.x===e.x&&r.y===e.y&&(e.dead=!0)}})},s.prototype.render=function(e,i){this.drawSky(e.direction,i.skybox,i.light),this.drawColumns(e,i),this.drawHUD(i,e)},s.prototype.drawSky=function(e,i,r){var t=i.width*(this.height/i.height)*2,o=e/l*-t;this.ctx.save(),this.ctx.drawImage(i.image,o,0,t,this.height),o<t-this.width&&this.ctx.drawImage(i.image,o+t,0,t,this.height),r>0&&(this.ctx.fillStyle="#ffffff",this.ctx.globalAlpha=.1*r,this.ctx.fillRect(0,.5*this.height,this.width,.5*this.height)),this.ctx.restore()},s.prototype.drawSpriteColumn=function(e,i,r,t,o){var s,n,l=this.ctx,a=Math.floor(r*this.spacing),h=Math.ceil(this.spacing);Math.PI,this.resolution,this.width,this.resolution;o=o.filter(function(e){return!t.hit||e.distanceFromPlayer<t.hit});for(var T=0;T<o.length;T++)if(s=o[T],a>s.render.cameraXOffset-s.render.width/2&&a<s.render.cameraXOffset+s.render.width/2){n=Math.floor(s.texture.width/s.render.numColumns*(r-s.render.firstColumn)),this.ctx.fillStyle="black",this.ctx.globalAlpha=1;var u=100*Math.max(s.distanceFromPlayer/this.lightRange-i.light,0);s.texture.image.style.webkitFilter="brightness("+u+"%)",s.texture.image.style.filter="brightness("+u+"%)",l.drawImage(s.texture.image,n,0,1,s.texture.height,a,s.render.top,h,s.render.height)}},s.prototype.drawSprites=function(e,i,r){var t=this.width,o=this.height,s=t/Math.PI*.4,n=this.resolution,a=Array.prototype.slice.call(i.chickens).map(function(i){var r=i.x-e.x,a=i.y-e.y,h=i.width*t/i.distanceFromPlayer,T=i.height*o/i.distanceFromPlayer,u=(i.floorOffset,i.distanceFromPlayer,Math.atan2(a,r)),v=e.direction-u,b=o/2*(1+1/i.distanceFromPlayer)-T;v>=l/2&&(v-=l);var C=z.width/2-s*v,c=h/t*n,f=Math.floor((C-h/2)/t*n);return i.distanceFromPlayer=Math.sqrt(Math.pow(r,2)+Math.pow(a,2)),i.render={width:h,height:T,angleToPlayer:v,cameraXOffset:C,distanceFromPlayer:i.distanceFromPlayer,numColumns:c,firstColumn:f,top:b},i}).sort(function(e,i){return e.distanceFromPlayer<i.distanceFromPlayer?1:e.distanceFromPlayer>i.distanceFromPlayer?-1:0});this.ctx.save();for(var h=0;h<this.resolution;h++)this.drawSpriteColumn(e,i,h,r[h],a);this.ctx.restore()},s.prototype.drawColumns=function(e,i){this.ctx.save();for(var r=[],t=0;t<this.resolution;t++){var o=t/this.resolution-.5,s=Math.atan2(o,this.focalLength),n=i.cast(e,e.direction+s,this.range);r.push(this.drawColumn(t,n,s,i))}this.ctx.restore(),this.ctx.save(),this.drawSprites(e,i,r),this.ctx.restore()},s.prototype.drawColumn=function(e,i,r,t){for(var o,s=this.ctx,n=t.wallTexture,l=Math.floor(e*this.spacing),a=Math.ceil(this.spacing),h=-1,T=[];++h<i.length&&i[h].height<=0;);for(var u=i.length-1;u>=0;u--){var v=i[u];if(u===h){var b=Math.floor(n.width*v.offset),C=this.project(v.height,r,v.distance);s.globalAlpha=1,s.drawImage(n.image,b,0,1,n.height,l,C.top,a,C.height),s.fillStyle="#000000",s.globalAlpha=Math.max((v.distance+v.shading)/this.lightRange-t.light,0),s.fillRect(l,C.top,a,C.height),o=v.distance}else v.object&&T.push({object:v.object,distance:v.distance,offset:v.offset,angle:r})}return{objects:T,hit:o}},s.prototype.drawHUD=function(e,i){var r=this.ctx;r.save(),r.rotate(0),r.fillStyle="darkblue",12===i.score?r.fillText("YOU WIN! REFRESH TO PLAY AGAIN",10,10):!0===i.dead?r.fillText("YOU DIED! REFRESH TO PLAY AGAIN",10,10):r.fillText("SCORE: "+i.score,10,10),r.restore()},s.prototype.project=function(e,i,r){var t=r*Math.cos(i),o=this.height*e/t;return{top:this.height/2*(1+1/t)-o,height:o}},n.prototype.start=function(e){this.callback=e,requestAnimationFrame(this.frame)},n.prototype.frame=function(e){var i=(e-this.lastTime)/1e3;this.lastTime=e,i<.2&&this.callback(i),requestAnimationFrame(this.frame)};var h=function(e){e.save(),e.beginPath(),e.moveTo(0,0),e.lineTo(512,0),e.lineTo(512,512),e.lineTo(0,512),e.closePath(),e.clip(),e.translate(0,0),e.translate(0,0),e.scale(1,1),e.translate(0,0),e.strokeStyle="rgba(0,0,0,0)",e.lineCap="butt",e.lineJoin="miter",e.miterLimit=4,e.save(),e.fillStyle="#a4ce74",e.beginPath(),e.moveTo(88.2,471.8),e.bezierCurveTo(87.4,471,87,465.6,87,454.1),e.bezierCurveTo(87,438.20000000000005,86.9,437.5,84.5,434.1),e.bezierCurveTo(82.8,431.70000000000005,79.9,429.6,75.5,427.5),e.bezierCurveTo(71.9,425.9,68.7,423.7,68.4,422.8),e.bezierCurveTo(68.10000000000001,421.90000000000003,68.5,418.7,69.4,415.90000000000003),e.bezierCurveTo(70.4,412.8,71,406.8,71,401.5),e.bezierCurveTo(71,393.8,71.3,392.1,72.9,390.6),e.bezierCurveTo(74.60000000000001,389,75.10000000000001,389,77.7,390.40000000000003),e.bezierCurveTo(79.3,391.20000000000005,82.60000000000001,393.8,85,396.1),e.bezierCurveTo(93.5,404,93.2,403.90000000000003,100,399.20000000000005),e.bezierCurveTo(103.3,396.90000000000003,106.4,395.1,106.8,395.1),e.bezierCurveTo(107.2,395.1,108.39999999999999,394.20000000000005,109.39999999999999,393.1),e.bezierCurveTo(110.39999999999999,392,111.8,391.1,112.49999999999999,391.1),e.bezierCurveTo(115.19999999999999,391.1,132.39999999999998,375.20000000000005,135.39999999999998,370),e.bezierCurveTo(138.7,364.3,139.09999999999997,363.1,138.49999999999997,360.9),e.bezierCurveTo(138.19999999999996,359.59999999999997,136.39999999999998,356.4,134.59999999999997,353.79999999999995),e.bezierCurveTo(125.9,340.9,123.9,338.2,121,335),e.bezierCurveTo(112.3,325.6,91,297.3,91,295.2),e.bezierCurveTo(91,294.8,89.3,292,87.2,289),e.bezierCurveTo(85.10000000000001,286,82.9,282.4,82.2,281),e.bezierCurveTo(81.5,279.6,79.9,276.7,78.5,274.5),e.bezierCurveTo(77.2,272.3,75.6,269.4,75,268),e.bezierCurveTo(74.4,266.6,73.5,264.8,72.9,264),e.bezierCurveTo(72.30000000000001,263.2,71.4,261.4,70.80000000000001,260),e.bezierCurveTo(70.20000000000002,258.6,69.10000000000001,256.8,68.4,256),e.bezierCurveTo(67.7,255.2,66.80000000000001,253.1,66.4,251.3),e.bezierCurveTo(66,249.60000000000002,65.10000000000001,247.60000000000002,64.30000000000001,246.9),e.bezierCurveTo(63.6,246.3,63,244.7,63,243.5),e.bezierCurveTo(63,242.3,62.1,240.1,61,238.7),e.bezierCurveTo(59.9,237.29999999999998,59,235.29999999999998,59,234.2),e.bezierCurveTo(59,233.1,58.1,231.1,57,229.7),e.bezierCurveTo(55.9,228.29999999999998,55,225.89999999999998,55,224.29999999999998),e.bezierCurveTo(55,222.8,54.1,220.2,53,218.5),e.bezierCurveTo(51.8,216.7,51,213.8,51,211.4),e.bezierCurveTo(51,209.1,50.1,204.4,49,201),e.bezierCurveTo(47.9,197.4,47,192,47,188.3),e.bezierCurveTo(47,184.8,46.1,178.4,45.1,174.20000000000002),e.bezierCurveTo(44,169.8,42.9,160.70000000000002,42.5,153.20000000000002),e.lineTo(41.8,140.00000000000003),e.lineTo(44.599999999999994,138.90000000000003),e.bezierCurveTo(49.599999999999994,137.00000000000003,68.39999999999999,136.60000000000002,91.8,137.90000000000003),e.bezierCurveTo(110.6,139.00000000000003,115,139.50000000000003,117.6,141.10000000000002),e.bezierCurveTo(119.3,142.10000000000002,122.1,143.00000000000003,123.89999999999999,143.00000000000003),e.bezierCurveTo(125.6,143.00000000000003,128.7,143.70000000000002,130.79999999999998,144.60000000000002),e.bezierCurveTo(133.39999999999998,145.70000000000002,139.99999999999997,146.50000000000003,151.99999999999997,147.10000000000002),e.bezierCurveTo(162.39999999999998,147.60000000000002,171.49999999999997,148.60000000000002,174.39999999999998,149.50000000000003),e.bezierCurveTo(177.09999999999997,150.30000000000004,181.2,151.00000000000003,183.59999999999997,151.00000000000003),e.bezierCurveTo(185.99999999999997,151.00000000000003,190.19999999999996,151.90000000000003,192.99999999999997,153.00000000000003),e.bezierCurveTo(195.79999999999998,154.10000000000002,199.69999999999996,155.00000000000003,201.59999999999997,155.00000000000003),e.bezierCurveTo(203.49999999999997,155.00000000000003,206.89999999999998,155.90000000000003,208.99999999999997,157.00000000000003),e.bezierCurveTo(211.19999999999996,158.10000000000002,214.59999999999997,159.00000000000003,216.69999999999996,159.00000000000003),e.bezierCurveTo(218.79999999999995,159.00000000000003,222.29999999999995,159.90000000000003,224.49999999999997,161.00000000000003),e.bezierCurveTo(226.69999999999996,162.10000000000002,230.09999999999997,163.00000000000003,231.99999999999997,163.00000000000003),e.bezierCurveTo(233.89999999999998,163.00000000000003,237.79999999999998,163.60000000000002,240.49999999999997,164.30000000000004),e.bezierCurveTo(244.89999999999998,165.50000000000003,246.19999999999996,165.40000000000003,251.69999999999996,163.70000000000005),e.bezierCurveTo(256.9,162.10000000000005,258.69999999999993,161.00000000000006,262.4,156.60000000000005),e.bezierCurveTo(266.7,151.50000000000006,266.9,151.20000000000005,267.9,141.40000000000006),e.bezierCurveTo(270.2,120.10000000000007,270.79999999999995,112.00000000000006,270.9,101.70000000000006),e.lineTo(271,91),e.lineTo(278.3,91),e.bezierCurveTo(282.3,91,288.2,91.7,291.5,92.5),e.bezierCurveTo(303.6,95.7,307,94.4,307,86.8),e.bezierCurveTo(307,84.8,307.9,80.8,309,78),e.bezierCurveTo(310.1,75.2,311,71.6,311,70),e.bezierCurveTo(311,66.3,314.8,60.7,319.7,57),e.bezierCurveTo(321.8,55.4,324.2,53.5,325.09999999999997,52.8),e.bezierCurveTo(327.09999999999997,51.099999999999994,331.09999999999997,48.9,337.99999999999994,45.5),e.bezierCurveTo(340.99999999999994,44,345.19999999999993,42,347.19999999999993,40.9),e.bezierCurveTo(349.2,39.9,352.4,39,354.3,39),e.bezierCurveTo(360.3,39,360.8,40.5,361.2,59.3),e.bezierCurveTo(361.5,74.6,361.7,76.3,363.5,77.5),e.bezierCurveTo(366.3,79.5,371.4,79.3,374.3,76.9),e.bezierCurveTo(375.7,75.80000000000001,377.7,74.9,378.7,74.9),e.bezierCurveTo(379.7,74.9,381.9,74.10000000000001,383.5,73.2),e.bezierCurveTo(385.7,72,389.8,71.4,398.8,71.10000000000001),e.bezierCurveTo(411.5,70.8,416,71.3,416,73.1),e.bezierCurveTo(416,74.89999999999999,409,83.19999999999999,395.3,97.6),e.bezierCurveTo(388.3,105,382.2,111.6,381.8,112.3),e.bezierCurveTo(381.40000000000003,113,381,116,381,119.1),e.bezierCurveTo(381,123.89999999999999,381.3,125,383.7,127.1),e.bezierCurveTo(387.09999999999997,130.1,396.59999999999997,135,399,135),e.bezierCurveTo(400,135,401.3,135.7,402,136.5),e.bezierCurveTo(402.7,137.3,404.9,138.3,406.9,138.6),e.bezierCurveTo(408.9,139,412,140.1,413.7,141.1),e.bezierCurveTo(415.4,142.1,417.8,143,419,143),e.bezierCurveTo(420.2,143,422.4,143.9,423.8,145),e.bezierCurveTo(425.2,146.1,427.1,147,428.1,147),e.bezierCurveTo(429.1,147,430.40000000000003,147.7,431.1,148.5),e.bezierCurveTo(431.8,149.3,433.3,150.3,434.5,150.6),e.bezierCurveTo(437.5,151.5,445.2,159.1,445.2,161.1),e.bezierCurveTo(445.2,163.79999999999998,443.09999999999997,164.7,436.3,165.2),e.bezierCurveTo(430.90000000000003,165.6,429.5,166.1,427.6,168.39999999999998),e.bezierCurveTo(426,170.29999999999998,425.3,172.39999999999998,425.3,175.09999999999997),e.bezierCurveTo(425.3,178.69999999999996,426,179.79999999999995,434.3,188.19999999999996),e.bezierCurveTo(439.5,193.49999999999997,443.2,197.99999999999997,443,198.99999999999997),e.bezierCurveTo(442.8,200.09999999999997,441.1,200.79999999999998,437.6,201.19999999999996),e.bezierCurveTo(434.8,201.49999999999997,431.40000000000003,202.39999999999995,430.1,203.19999999999996),e.bezierCurveTo(428.8,203.89999999999995,424.6,204.79999999999995,420.8,205.19999999999996),e.bezierCurveTo(415.5,205.69999999999996,413.40000000000003,206.39999999999995,411.6,208.19999999999996),e.bezierCurveTo(408.8,210.99999999999997,408.3,213.69999999999996,408.20000000000005,229.59999999999997),e.bezierCurveTo(408.20000000000005,236.19999999999996,407.70000000000005,242.29999999999995,407.20000000000005,243.09999999999997),e.bezierCurveTo(406.40000000000003,244.29999999999995,405.30000000000007,243.49999999999997,401.1,238.89999999999998),e.bezierCurveTo(398.1,235.6,395.2,233,394.4,233),e.bezierCurveTo(393.59999999999997,233,391.7,232.1,390.2,231.1),e.bezierCurveTo(386.9,228.79999999999998,376.4,227.5,372.59999999999997,229),e.bezierCurveTo(367.4,231,367.4,238.7,372.59999999999997,246.2),e.bezierCurveTo(376.79999999999995,252.2,379.4,256.7,382.99999999999994,264),e.bezierCurveTo(384.69999999999993,267.6,386.79999999999995,271.7,387.59999999999997,273.2),e.bezierCurveTo(388.4,274.7,388.99999999999994,276.7,388.99999999999994,277.8),e.bezierCurveTo(388.99999999999994,278.90000000000003,389.8999999999999,280.90000000000003,390.99999999999994,282.3),e.bezierCurveTo(392.09999999999997,283.7,392.99999999999994,286.1,392.99999999999994,287.7),e.bezierCurveTo(392.99999999999994,289.3,393.8999999999999,291.9,394.99999999999994,293.5),e.bezierCurveTo(396.09999999999997,295.2,396.99999999999994,298,396.99999999999994,299.8),e.bezierCurveTo(396.99999999999994,301.6,397.79999999999995,304.5,398.69999999999993,306.3),e.bezierCurveTo(401.29999999999995,311.1,401.3999999999999,323,398.8999999999999,329.1),e.bezierCurveTo(397.7999999999999,331.8,396.99999999999994,335.5,396.99999999999994,337.3),e.bezierCurveTo(396.99999999999994,339.1,396.09999999999997,342.2,394.99999999999994,344.3),e.bezierCurveTo(393.8999999999999,346.40000000000003,392.99999999999994,348.90000000000003,392.99999999999994,350),e.bezierCurveTo(392.99999999999994,352.5,387.79999999999995,362.2,383.49999999999994,367.8),e.bezierCurveTo(380.49999999999994,371.7,371.29999999999995,378.7,364.99999999999994,381.8),e.bezierCurveTo(363.59999999999997,382.5,361.79999999999995,383.40000000000003,360.99999999999994,383.90000000000003),e.bezierCurveTo(360.19999999999993,384.40000000000003,358.3999999999999,385.3,356.99999999999994,385.90000000000003),e.bezierCurveTo(355.59999999999997,386.50000000000006,352.69999999999993,388.1,350.49999999999994,389.50000000000006),e.bezierCurveTo(348.29999999999995,390.80000000000007,345.49999999999994,392.40000000000003,344.19999999999993,393.00000000000006),e.bezierCurveTo(342.8999999999999,393.6000000000001,340.0999999999999,395.50000000000006,337.8999999999999,397.20000000000005),e.bezierCurveTo(333.2999999999999,400.90000000000003,331.69999999999993,405.50000000000006,332.8999999999999,411.80000000000007),e.bezierCurveTo(333.7999999999999,416.50000000000006,334.99999999999994,418.1000000000001,344.99999999999994,428.00000000000006),e.bezierCurveTo(354.3999999999999,437.30000000000007,356.3999999999999,438.70000000000005,360.8999999999999,439.50000000000006),e.bezierCurveTo(366.2999999999999,440.40000000000003,374.69999999999993,439.20000000000005,376.7999999999999,437.1000000000001),e.bezierCurveTo(377.6999999999999,436.2000000000001,379.5999999999999,434.9000000000001,380.8999999999999,434.2000000000001),e.bezierCurveTo(385.19999999999993,432.0000000000001,387.7999999999999,430.4000000000001,389.5999999999999,428.8000000000001),e.bezierCurveTo(390.5999999999999,428.0000000000001,392.4999999999999,426.8000000000001,393.8999999999999,426.10000000000014),e.bezierCurveTo(395.2999999999999,425.40000000000015,398.19999999999993,423.8000000000001,400.3999999999999,422.40000000000015),e.bezierCurveTo(402.5999999999999,421.10000000000014,405.0999999999999,419.70000000000016,405.8999999999999,419.40000000000015),e.bezierCurveTo(406.69999999999993,419.10000000000014,409.19999999999993,417.90000000000015,411.49999999999994,416.8000000000001),e.bezierCurveTo(415.69999999999993,414.8000000000001,428.8999999999999,413.60000000000014,430.49999999999994,415.10000000000014),e.bezierCurveTo(431.59999999999997,416.20000000000016,429.59999999999997,419.90000000000015,425.29999999999995,424.70000000000016),e.bezierCurveTo(421.09999999999997,429.40000000000015,419.49999999999994,433.3000000000002,420.9,435.70000000000016),e.bezierCurveTo(421.4,436.60000000000014,424.2,438.90000000000015,427.09999999999997,440.8000000000002),e.bezierCurveTo(430.09999999999997,442.8000000000002,432.49999999999994,445.20000000000016,432.7,446.3000000000002),e.bezierCurveTo(433,448.1000000000002,432.09999999999997,448.4000000000002,423.7,449.50000000000017),e.bezierCurveTo(418.59999999999997,450.20000000000016,412.2,451.1000000000002,409.4,451.70000000000016),e.bezierCurveTo(406.7,452.20000000000016,401.5,452.70000000000016,397.9,452.70000000000016),e.bezierCurveTo(393.2,452.70000000000016,390.5,453.3000000000002,388.09999999999997,454.8000000000002),e.bezierCurveTo(386.4,456.1,383.9,457,382.6,457),e.bezierCurveTo(381.3,457,379.1,457.9,377.70000000000005,459),e.bezierCurveTo(376.20000000000005,460.2,373.6,461,371.30000000000007,461),e.bezierCurveTo(365.9000000000001,461,361.70000000000005,462.4,356.4000000000001,465.9),e.bezierCurveTo(352.1000000000001,468.79999999999995,348.0000000000001,469.9,347.9000000000001,468.2),e.bezierCurveTo(347.9000000000001,467.8,347.7000000000001,463.7,347.5000000000001,459.2),e.bezierCurveTo(347.3000000000001,453.5,346.60000000000014,450.09999999999997,345.4000000000001,448.2),e.bezierCurveTo(341.5000000000001,442.09999999999997,314.30000000000007,416.2,305.80000000000007,410.7),e.bezierCurveTo(301.1000000000001,407.59999999999997,296.6000000000001,405,296.00000000000006,405),e.bezierCurveTo(295.30000000000007,405,293.6000000000001,404.1,292.20000000000005,403),e.bezierCurveTo(290.80000000000007,401.9,288.40000000000003,401,286.90000000000003,401),e.bezierCurveTo(285.40000000000003,401,282.40000000000003,400.4,280.3,399.6),e.bezierCurveTo(277.8,398.70000000000005,268.5,398,253.9,397.5),e.bezierCurveTo(236.20000000000002,396.9,231.1,396.5,229.8,395.3),e.bezierCurveTo(228.9,394.5,226.4,393.6,224.3,393.2),e.bezierCurveTo(222.20000000000002,392.9,219.8,392,218.9,391.3),e.bezierCurveTo(218.1,390.6,216.1,389.7,214.4,389.3),e.bezierCurveTo(211.4,388.6,205.8,386.3,198.70000000000002,382.7),e.bezierCurveTo(196.8,381.8,194.6,381,194,381),e.bezierCurveTo(193.4,381,191.7,380.1,190.3,379),e.bezierCurveTo(188.9,377.9,186.9,377,185.9,377),e.bezierCurveTo(184.9,377,182.4,376,180.4,374.8),e.bezierCurveTo(177.3,373,175.1,372.6,167,372.6),e.bezierCurveTo(157.8,372.5,157.1,372.70000000000005,152.9,375.5),e.bezierCurveTo(148.9,378.2,140.70000000000002,384.5,137,387.8),e.bezierCurveTo(136.2,388.5,132.6,391.40000000000003,129,394.2),e.bezierCurveTo(125.4,397,122.3,399.59999999999997,122,400),e.bezierCurveTo(121,401.3,106.5,412.8,104.3,414),e.bezierCurveTo(101.39999999999999,415.5,100.6,418.6,102.2,421.6),e.bezierCurveTo(102.9,423,106.10000000000001,429.20000000000005,109.3,435.6),e.bezierCurveTo(112.5,441.90000000000003,115.5,447.40000000000003,116.1,447.70000000000005),e.bezierCurveTo(116.6,448.00000000000006,117,449.20000000000005,117,450.30000000000007),e.bezierCurveTo(117,451.4000000000001,118,454.4000000000001,119.1,456.9000000000001),e.bezierCurveTo(120.69999999999999,460.30000000000007,121,462.2000000000001,120.39999999999999,464.0000000000001),e.bezierCurveTo(119.19999999999999,467.5000000000001,117.49999999999999,467.7000000000001,114.49999999999999,464.7000000000001),e.bezierCurveTo(106.89999999999999,457.1000000000001,100.89999999999999,457.9000000000001,95.79999999999998,467.2000000000001);e.bezierCurveTo(92.59999999999998,473.0000000000001,90.59999999999998,474.3000000000001,88.29999999999998,471.9000000000001),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.fillStyle="#e32c16",e.beginPath(),e.moveTo(347,164.1),e.bezierCurveTo(338.9,159.79999999999998,336.5,146.29999999999998,342.3,138.6),e.bezierCurveTo(345.40000000000003,134.5,351,132.4,356.2,133.4),e.bezierCurveTo(360,134.1,365.3,139,366.9,143.3),e.bezierCurveTo(370.8,153.5,363.4,166,353.5,166),e.bezierCurveTo(351.8,166,348.9,165.2,347,164.1),e.closePath(),e.fill(),e.stroke(),e.restore(),e.restore()},T=function(e){e.save(),e.beginPath(),e.moveTo(0,0),e.lineTo(1200,0),e.lineTo(1200,750),e.lineTo(0,750),e.closePath(),e.clip(),e.translate(0,0),e.translate(0,0),e.scale(1,1),e.translate(0,0),e.strokeStyle="rgba(0,0,0,0)",e.lineCap="butt",e.lineJoin="miter",e.miterLimit=4,e.save(),e.restore(),e.save(),e.save(),e.fillStyle="#fad2dc",e.beginPath(),e.moveTo(0,375),e.lineTo(0,0),e.lineTo(600,0),e.lineTo(1200,0),e.lineTo(1200,375),e.lineTo(1200,750),e.lineTo(600,750),e.lineTo(0,750),e.lineTo(0,375),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.fillStyle="#fad2db",e.beginPath(),e.moveTo(0,500.92857),e.bezierCurveTo(0,286.52462,.19862547,251.65852,1.4270414,250.4301),e.bezierCurveTo(2.6561425,249.201,47.631808,248.96764,325.67704,248.74773),e.lineTo(648.5,248.4924),e.lineTo(324.42855,248.4962),e.bezierCurveTo(65.171381,248.49924,.60710626,248.25,1.6071226,247.25),e.bezierCurveTo(2.6020351,246.2551,69.504773,246,329.42857,246),e.bezierCurveTo(619.04762,246,656,246.16973,656,247.5),e.bezierCurveTo(656,248.72295,657.67322,249,665.05902,249),e.bezierCurveTo(670.04148,249,673.87541,248.60743,673.57887,248.12762),e.bezierCurveTo(673.2823400000001,247.64781000000002,674.71828,246.97776000000002,676.7698600000001,246.63863),e.bezierCurveTo(678.82144,246.29949000000002,796.7446400000001,246.01706000000001,938.8214300000002,246.01101),e.bezierCurveTo(1144.1570000000002,246.00201,1197.3993000000003,246.25639,1198.3929000000003,247.25),e.bezierCurveTo(1199.3929000000003,248.25,1148.7286000000004,248.49904,945.0714600000003,248.49519),e.lineTo(690.5000000000003,248.49019),e.lineTo(943.8233700000003,248.74695000000003),e.bezierCurveTo(1161.6344000000004,248.96771000000004,1197.3467000000003,249.20370000000003,1198.5734000000002,250.43033000000003),e.bezierCurveTo(1199.8012,251.65820000000002,1200.0000000000002,286.55815,1200.0000000000002,500.92839000000004),e.lineTo(1200,750),e.lineTo(600,750),e.lineTo(0,750),e.lineTo(0,500.92857),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.fillStyle="#e0bcc4",e.beginPath(),e.moveTo(0,500.92857),e.bezierCurveTo(0,286.4,.19812364,251.65902,1.4285714,250.42857),e.bezierCurveTo(3.5867145000000002,248.27043,1196.4133,248.27043,1198.5714,250.42857),e.bezierCurveTo(1199.8019,251.65902,1200,286.4,1200,500.92857000000004),e.lineTo(1200,750),e.lineTo(600,750),e.lineTo(0,750),e.lineTo(0,500.92857),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.fillStyle="#debcc4",e.beginPath(),e.moveTo(0,500.92857),e.bezierCurveTo(0,286.45901,.19836138,251.65878,1.4278466,250.4293),e.bezierCurveTo(3.5837633,248.27338,1196.4173,248.27443,1198.5732,250.43035),e.bezierCurveTo(1199.8013,251.65844,1200,286.5451,1200,500.92857),e.lineTo(1200,750),e.lineTo(600,750),e.lineTo(0,750),e.lineTo(0,500.92857),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.fillStyle="#a38990",e.beginPath(),e.moveTo(0,500.60699),e.bezierCurveTo(0,274.11567,.14525512,251.15824,1.5817875,250.60699),e.bezierCurveTo(3.6501079,249.8133,1196.3499,249.8133,1198.4182,250.60699),e.bezierCurveTo(1199.8547,251.15824,1200,274.11567,1200,500.60699),e.lineTo(1200,750),e.lineTo(600,750),e.lineTo(0,750),e.lineTo(0,500.60699),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.fillStyle="#56484c",e.beginPath(),e.moveTo(0,500.5),e.lineTo(0,251),e.lineTo(600,251),e.lineTo(1200,251),e.lineTo(1200,500.5),e.lineTo(1200,750),e.lineTo(600,750),e.lineTo(0,750),e.lineTo(0,500.5),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.fillStyle="#1a1617",e.beginPath(),e.moveTo(0,500.75),e.lineTo(0,251.5),e.lineTo(600,251.5),e.lineTo(1200,251.5),e.lineTo(1200,500.75),e.lineTo(1200,750),e.lineTo(600,750),e.lineTo(0,750),e.lineTo(0,500.75),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.fillStyle="#000000",e.beginPath(),e.moveTo(0,500.5),e.bezierCurveTo(0,334.83333,.33600534,251,1,251),e.bezierCurveTo(1.55,251,2,251.45,2,252),e.bezierCurveTo(2,252.66555,202,253,600,253),e.bezierCurveTo(998,253,1198,252.66555,1198,252),e.bezierCurveTo(1198,251.45,1198.45,251,1199,251),e.bezierCurveTo(1199.664,251,1200,334.83333,1200,500.5),e.lineTo(1200,750),e.lineTo(600,750),e.lineTo(0,750),e.lineTo(0,500.5),e.closePath(),e.fill(),e.stroke(),e.restore(),e.restore(),e.restore()},u=function(e){e.save(),e.beginPath(),e.moveTo(0,0),e.lineTo(1024,0),e.lineTo(1024,1024),e.lineTo(0,1024),e.closePath(),e.clip(),e.translate(0,0),e.translate(0,0),e.scale(1,1),e.translate(0,0),e.strokeStyle="rgba(0,0,0,0)",e.lineCap="butt",e.lineJoin="miter",e.miterLimit=4,e.save(),e.restore(),e.save(),e.fillStyle="#c9c9c9",e.beginPath(),e.moveTo(0,2.1694915),e.lineTo(1024,2.1694915),e.lineTo(1024,1026.1695),e.lineTo(0,1026.1695),e.closePath(),e.fill(),e.stroke(),e.restore(),e.save(),e.transform(2,0,0,2,0,2.1694915),e.save(),e.fillStyle="#d0021b",e.beginPath(),e.moveTo(494,18.02),e.lineTo(393,18.123),e.lineTo(393,119),e.lineTo(494,119),e.closePath(),e.moveTo(375,18.14),e.lineTo(137,18.387),e.lineTo(137,119),e.lineTo(375,119),e.closePath(),e.moveTo(119,18.406),e.lineTo(18,18.51),e.lineTo(18,119),e.lineTo(119,119),e.closePath(),e.moveTo(18,137),e.lineTo(18,247),e.lineTo(247,247),e.lineTo(247,137),e.closePath(),e.moveTo(494,137),e.lineTo(494,247),e.lineTo(723,247),e.lineTo(723,137),e.closePath(),e.moveTo(476,265),e.lineTo(476,375),e.lineTo(577,375),e.lineTo(577,265),e.closePath(),e.moveTo(696,265),e.lineTo(696,375),e.lineTo(934,375),e.lineTo(934,265),e.closePath(),e.moveTo(1190,265),e.lineTo(1190,375),e.lineTo(1291,375),e.lineTo(1291,265),e.closePath(),e.moveTo(18,393),e.lineTo(18,493.98),e.lineTo(247,493.744),e.lineTo(247,393),e.closePath(),e.moveTo(494,393),e.lineTo(494,493.727),e.lineTo(723,493.48999999999995),e.lineTo(723,392.99999999999994),e.closePath(),e.fill(),e.stroke(),e.restore(),e.restore(),e.restore()},v=document.getElementById("display"),b=new o(12),C=new e,z=new s(v,a?160:320,.8),c=new n,f=new r(b,0);c.start(function(e){f.update(C.states,b,e),z.render(f,b)})}();