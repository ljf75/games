!function(){var n,e={},r={};function t(n,r){var t=a(n,r);return e[t]=r,t}function a(n,e){var r,t=n.keyCode;switch(t){case 13:r="RET";break;case 27:r="ESC";break;case 32:r="SPACE";break;case 37:r="LEFT";break;case 38:r="UP";break;case 39:r="RIGHT";break;case 40:r="DOWN";break;default:r=String.fromCharCode(t)}return r}document.addEventListener("keydown",function(n){t(n,!0)}),document.addEventListener("keyup",function(e){var o=t(e,!1);!function(n,e){var t=a(n);r[t]=e}(e,!0),n&&n(o)}),window.addEventListener("blur",function(){e={}}),window.input={onKeyUp:function(e){n=e},isDown:function(n){return e[n.toUpperCase()]},isUp:function(n){return r[n.toUpperCase()]},Clr:function(){r=[]}}}();
var AssetUtil={Dir:function(y,x){var t={up:!1,down:!1,left:!1,right:!1,d:0},n=Util.AbsDist(y.x,x.x),o=Util.AbsDist(y.y,x.y);return t.d=Util.PDist(n,o),n>o?y.x>x.x?t.right=!0:y.x<x.x&&(t.left=!0):y.y>x.y?t.down=!0:y.y<x.y&&(t.up=!0),t},RectHit:function(y,x){return y.x-=y.width/2,y.y-=y.length/2,x.x-=x.width/2,x.y-=x.length/2,y.x<x.x+x.width&&y.x+y.width>x.x&&y.y<x.y+x.length&&y.length+y.y>x.y},Collisions:function(y,x,t){for(var n=0;n<x.length;n++)if(y!=x[n]){var o={x:t?y.dest.x:y.x,y:t?y.dest.y:y.y,width:y.width,length:y.length},c={x:x[n].x,y:x[n].y,width:x[n].width,length:x[n].length};if(AssetUtil.RectHit(o,c))return x[n]}return null},InputLogic:function(y,x,t,n){var o=x.x,c=x.y,r=x.dx,l=x.dy;if(y.up?(l=-t,c=x.y-n,x.action=Const.actions.up):y.down?(l=t,c=x.y+n,x.action=Const.actions.down):y.left?(r=-t,o=x.x-n,x.action=Const.actions.left):y.right&&(r=t,o=x.x+n,x.action=Const.actions.right),o!=x.x||c!=x.y){var e=gameAsset.scene.Content(o,c);-1==map.colliders.hit.indexOf(e)&&(x.dest.x=o,x.dest.y=c,x.dx=r,x.dy=l,x.jumping=!0)}},HopLogic:function(y,x,t){return y.dy>0?y.y>y.dest.y?(y.y=y.dest.y,y.dy=0,y.jumping=!1,y.z=0):y.z=Util.Arc(y.dest.y-y.y,x,t):y.dy<0&&(y.y<y.dest.y?(y.y=y.dest.y,y.dy=0,y.jumping=!1,y.z=0):y.z=Util.Arc(y.y-y.dest.y,x,t)),y.dx>0?y.x>y.dest.x?(y.x=y.dest.x,y.dx=0,y.jumping=!1,y.z=0):y.z=Util.Arc(y.dest.x-y.x,x,t):y.dx<0&&(y.x<y.dest.x?(y.x=y.dest.x,y.dx=0,y.jumping=!1,y.z=0):y.z=Util.Arc(y.x-y.dest.x,x,t)),gameAsset.scene.Content(y.x,y.y)},CarSpawn:function(y,x,t,n,o){for(var c=0;c<x.length;c++)y.push({ready:100,x:x[c].x*n,y:x[c].y*o,type:t})}},Util={OneIn:function(y){return 0==Util.RndI(0,y)},OneOf:function(y){return y[Util.RndI(0,y.length)]},RndI:function(y,x){return parseInt(Math.random()*(x-y))+y},Rnd:function(y){return Math.random()*y},Lerp:function(y,x,t){return(x-y)*t+y},AbsDist:function(y,x){return Math.abs(y-x)},Dist:function(y,x,t,n){var o=t-y,c=n-x;return Util.PDist(o,c)},PDist:function(y,x){return Math.sqrt(y*y+x*x)},IsoPoint:function(y,x){return{x:1*(y-x),y:.5*(y+x)}},Arc:function(y,x,t){return t*Math.sin(Math.PI*y/x)},FlipX:function(y){var x=y;for(let y=0;y<x.length;y++)for(let t=0;t<x[y].pt.length;t++)x[y].pt[t].x=-x[y].pt[t].x;return x},Scale:function(y,x){var t=y;for(let y=0;y<t.length;y++)for(let n=0;n<t[y].pt.length;n++)t[y].pt[n].x*=x,t[y].pt[n].y*=x;return t},ImgTxtArr:function(y){for(var x=[],t=0;t<y.length;t++){var n=[];y[t].replace(/./g,y=>{z=y.charCodeAt(),n.push(7&z),n.push(z>>3&7)}),x.push(n)}return x},Build:function(y){for(var x=[],t=0;t<y.length;t+=2){for(var n=[],o=0;o<y[t+1].length;o+=2)n.push({x:y[t+1][o],y:y[t+1][o+1]});x.push({col:PAL[y[t]],pt:n})}return x}},N=function(y,x){var t=y,n=0,o=0;return{S:function(){return++n==t&&(x=0==o?x-1:x,n=0,o=1-o),{v:0==o,a:x>0}}}},ObjectPool=function(){var y=[];return{Add:function(x){for(var t=0;t<y.length;t++)if(0==y[t].enabled&&y[t].type==x.type)return y[t]=x,y[t];y.push(x)},Get:function(x){return x?y.filter(y=>y.enabled&&-1!=x.indexOf(y.type)):y.filter(y=>y.enabled)},Count:function(x){return x?y:y.filter(y=>y.enabled).length}}},Const={game:{friction:6,status:{lost:0,follow:1,home:2},h2:"24px Arial"},actors:{null:0,player:1,dood:2,carhr:3,carhl:4,carvu:5,carvd:6,drone:7,stump:8,log:9},actions:{up:0,down:1,left:2,right:3,fall:4,splash:5,squash:6,waveup:7,wavedown:8,waveleft:9,waveright:10}},Fac=[],Sources={tree1:function(){return[5,[0,8,0,-16,-16,-24,-16,0],6,[0,-16,0,-16,16,-24,16,0,0,8],7,[-32,-26,-32,-69,0,-53,0,-10],8,[0,-10,0,-53,32,-69,32,-26],9,[-32,-69,0,-85,32,-69,0,-53]]},tree2:function(){return[5,[0,8,0,-29,-16,-36,-16,0],6,[0,-16,0,-28,16,-36,16,0,0,8],7,[-56,-52,-56,-67,0,-39,0,-23],8,[0,-23,0,-39,56,-67,56,-52],9,[-56,-67,0,-95,56,-67,0,-39],7,[-27,-68,-27,-87,0,-74,0,-55],8,[0,-55,0,-74,28,-87,28,-68],9,[-27,-87,0,-100,28,-87,0,-74]]},rock:function(){return[2,[-32,0,-32,-16,0,0,0,16],3,[0,16,0,0,32,-16,32,0],4,[32,-16,0,0,-32,-16,0,-32],2,[-20,-22,-20,-38,0,-29,0,-12],3,[0,-12,0,-30,20,-38,20,-22],4,[0,-29,-20,-38,1,-48,20,-38]]},rock1:function(){return[2,[-32,0,-32,-16,0,0,0,16],3,[0,16,0,0,32,-16,32,0],4,[32,-16,0,0,-32,-16,0,-32],2,[-32,-16,-32,-32,-12,-23,-12,-6],3,[-12,-5,-12,-23,8,-32,8,-15],4,[-12,-23,-32,-32,-11,-42,8,-32]]},Log:function(){return[22,[-28,-1,4,-17,28,-5,-4,11],22,[-4,11,-4,14,28,-2,28,-5],22,[-4,11,-28,-1,-28,2,-4,14],23,[-10,5,-6,7,4,2,0,0],23,[-12,1,-16,-1,-4,-7,0,-5],23,[5,-5,9,-3,15,-6,11,-8]]}},Factory={Cube:function(y,x){var t=x/2;return[{col:y[0],pt:[{x:-x,y:-x},{x:0,y:-t},{x:0,y:t},{x:-x,y:0}]},{col:y[1],pt:[{x:0,y:-t},{x:x,y:-x},{x:x,y:0},{x:0,y:t}]},{col:y[2],pt:[{x:0,y:-(x+t)},{x:x,y:-x},{x:0,y:-t},{x:-x,y:-x}]}]},Tile:function(y,x){var t=x/2;return{col:y,pt:[{x:0,y:-t},{x:x,y:0},{x:0,y:t},{x:-x,y:0}]}},Hole:function(y,x){var t=x/2;return[{col:y[0],pt:[{x:0,y:-t},{x:0,y:t},{x:-x,y:0}]},{col:y[1],pt:[{x:0,y:-t},{x:x,y:0},{x:0,y:t}]}]},CarB:function(y){return[{col:y[0],pt:[{x:-32,y:-5},{x:0,y:11},{x:0,y:-21},{x:-17,y:-29},{x:-17,y:-13},{x:-32,y:-21}]},{col:y[2],pt:[{x:-17,y:-13},{x:-17,y:-29},{x:-32,y:-21}]},{col:y[2],pt:[{x:1,y:-21},{x:33,y:-36},{x:16,y:-45},{x:-17,y:-29}]},{col:PAL[0],pt:[{x:-10,y:11},{x:-22,y:5},{x:-22,y:-6},{x:-10,y:0}]},{col:PAL[0],pt:[{x:-10,y:11},{x:-5,y:8},{x:-10,y:5}]}]},CarF:function(y){return[{col:y[0],pt:[{x:-32,y:-5},{x:-32,y:-37},{x:-16,y:-29},{x:-16,y:-13},{x:0,y:-5},{x:0,y:11}]},{col:y[1],pt:[{x:0,y:11},{x:0,y:-5},{x:32,y:-21},{x:32,y:-5}]},{col:PAL[1],pt:[{x:-16,y:-13},{x:-16,y:-29},{x:16,y:-45},{x:16,y:-29}]},{col:y[2],pt:[{x:16,y:-29},{x:32,y:-21},{x:0,y:-5},{x:-16,y:-13}]},{col:y[2],pt:[{x:-16,y:-29},{x:-32,y:-37},{x:0,y:-53},{x:16,y:-45}]},{col:PAL[0],pt:[{x:-10,y:11},{x:-22,y:5},{x:-22,y:-6},{x:-10,y:0}]},{col:PAL[0],pt:[{x:-10,y:11},{x:-5,y:8},{x:-10,y:5}]}]},Man1:function(y,x){y=y||0;for(var t=x||[PAL[25],PAL[26],PAL[27],PAL[28]],n=[[{col:t[2],pt:[{x:-20,y:-29},{x:-15,y:-31},{x:-9,y:-28},{x:-14,y:-26}]},{col:t[0],pt:[{x:-9,y:-9},{x:-9,y:-28},{x:-14,y:-26},{x:-14,y:-7}]},{col:t[2],pt:[{x:-14,y:-7},{x:-14,y:-26},{x:-20,y:-29},{x:-20,y:-10}]}],[{col:t[2],pt:[{x:-20,y:-45},{x:-15,y:-47},{x:-9,y:-44},{x:-14,y:-42}]},{col:t[0],pt:[{x:-9,y:-25},{x:-9,y:-44},{x:-14,y:-42},{x:-14,y:-23}]},{col:t[2],pt:[{x:-14,y:-23},{x:-14,y:-42},{x:-20,y:-45},{x:-20,y:-26}]}]],o=[{col:PAL[14],pt:[{x:8,y:2},{x:8,y:-3},{x:14,y:-6},{x:14,y:-1}]},{col:PAL[15],pt:[{x:8,y:-3},{x:0,y:-7},{x:0,y:-2},{x:8,y:2}]},{col:PAL[13],pt:[{x:0,y:-7},{x:6,y:-10},{x:14,y:-6},{x:8,y:-3}]},{col:PAL[14],pt:[{x:-3,y:7},{x:-3,y:2},{x:3,y:-1},{x:3,y:4}]},{col:PAL[15],pt:[{x:-3,y:2},{x:-11,y:-2},{x:-11,y:3},{x:-3,y:7}]},{col:PAL[13],pt:[{x:-11,y:-2},{x:-5,y:-5},{x:3,y:-1},{x:-3,y:2}]},{col:PAL[20],pt:[{x:0,y:-7},{x:5,y:-5},{x:5,y:-9}]},{col:PAL[21],pt:[{x:5,y:-5},{x:10,y:-8},{x:10,y:-12},{x:5,y:-9}]},{col:PAL[20],pt:[{x:-11,y:-2},{x:-11,y:-12},{x:-5,y:-9},{x:-5,y:1}]},{col:PAL[21],pt:[{x:-5,y:1},{x:-5,y:-8},{x:0,y:-10},{x:0,y:-2}]},{col:t[2],pt:[{x:-22,y:-16},{x:-22,y:-38},{x:0,y:-27},{x:0,y:-5}]},{col:t[0],pt:[{x:0,y:-5},{x:0,y:-27},{x:22,y:-38},{x:22,y:-16}]},{col:PAL[18],pt:[{x:-22,y:-38},{x:-22,y:-60},{x:0,y:-49},{x:0,y:-27}]},{col:PAL[19],pt:[{x:0,y:-27},{x:0,y:-49},{x:22,y:-60},{x:22,y:-38}]},{col:t[1],pt:[{x:-22,y:-60},{x:0,y:-71},{x:22,y:-60},{x:0,y:-49}]},{col:t[3],pt:[{x:-22,y:-60},{x:0,y:-49},{x:0,y:-41},{x:-7,y:-44},{x:-7,y:-41},{x:-15,y:-45},{x:-15,y:-37},{x:-22,y:-41}]},{col:t[1],pt:[{x:0,y:-49},{x:22,y:-60},{x:22,y:-53},{x:0,y:-41}]},{col:PAL[20],pt:[{x:-22,y:-16},{x:-22,y:-23},{x:0,y:-12},{x:0,y:-5}]},{col:PAL[21],pt:[{x:0,y:-5},{x:0,y:-12},{x:22,y:-22},{x:22,y:-15}]},{col:PAL[11],pt:[{x:3,y:-39},{x:7,y:-41},{x:7,y:-37},{x:3,y:-35}]},{col:PAL[11],pt:[{x:15,y:-40},{x:15,y:-44},{x:19,y:-46},{x:19,y:-42}]}],c=0;c<n[y].length;c++)o.push(n[y][c]);return o},Man2:function(y,x){y=y||0;for(var t=x||[PAL[25],PAL[26],PAL[27],PAL[28]],n=[[{col:t[0],pt:[{x:7,y:-27},{x:13,y:-30},{x:17,y:-28},{x:12,y:-25}]},{col:t[0],pt:[{x:17,y:-9},{x:17,y:-28},{x:12,y:-26},{x:12,y:-7}]},{col:t[2],pt:[{x:12,y:-7},{x:12,y:-25},{x:7,y:-27},{x:7,y:-10}]}],[{col:t[0],pt:[{x:7,y:-45},{x:13,y:-48},{x:17,y:-46},{x:12,y:-43}]},{col:t[0],pt:[{x:17,y:-27},{x:17,y:-46},{x:12,y:-44},{x:12,y:-25}]},{col:t[2],pt:[{x:12,y:-25},{x:12,y:-43},{x:7,y:-45},{x:7,y:-28}]}]],o=[{col:PAL[13],pt:[{x:-7,y:-4},{x:-13,y:-7},{x:-3,y:-12},{x:4,y:-9}]},{col:PAL[15],pt:[{x:-7,y:1},{x:-7,y:-4},{x:4,y:-9},{x:4,y:-4}]},{col:PAL[15],pt:[{x:-7,y:-4},{x:-13,y:-7},{x:-13,y:-2},{x:-7,y:1}]},{col:PAL[17],pt:[{x:-2,y:-6},{x:-2,y:-19},{x:-7,y:-17},{x:-7,y:-4}]},{col:PAL[17],pt:[{x:-7,y:-4},{x:-7,y:-17},{x:-13,y:-20},{x:-13,y:-7}]},{col:PAL[13],pt:[{x:3,y:1},{x:-3,y:-2},{x:8,y:-7},{x:14,y:-4}]},{col:PAL[14],pt:[{x:3,y:6},{x:3,y:1},{x:14,y:-4},{x:14,y:1}]},{col:PAL[15],pt:[{x:3,y:1},{x:-3,y:-2},{x:-3,y:3},{x:3,y:6}]},{col:PAL[16],pt:[{x:8,y:-1},{x:8,y:-14},{x:3,y:-12},{x:3,y:1}]},{col:PAL[17],pt:[{x:3,y:1},{x:3,y:-12},{x:-3,y:-15},{x:-3,y:-2}]},{col:t[2],pt:[{x:-22,y:-16},{x:-22,y:-38},{x:0,y:-27},{x:0,y:-5}]},{col:t[0],pt:[{x:0,y:-5},{x:0,y:-27},{x:22,y:-38},{x:22,y:-16}]},{col:PAL[18],pt:[{x:-22,y:-38},{x:-22,y:-60},{x:0,y:-49},{x:0,y:-27}]},{col:PAL[19],pt:[{x:0,y:-27},{x:0,y:-49},{x:22,y:-60},{x:22,y:-38}]},{col:t[1],pt:[{x:-22,y:-60},{x:0,y:-71},{x:22,y:-60},{x:0,y:-49}]},{col:t[1],pt:[{x:0,y:-49},{x:0,y:-30},{x:-22,y:-41},{x:-22,y:-60}]},{col:t[3],pt:[{x:0,y:-49},{x:22,y:-60},{x:22,y:-53},{x:16,y:-50},{x:16,y:-46},{x:9,y:-43},{x:9,y:-34},{x:0,y:-30}]}],c=0;c<n[y].length;c++)o.push(n[y][c]);return o},Boy1:function(y,x){return Util.Scale(Factory.Man1(y,x),.7)},Boy2:function(y,x){return Util.Scale(Factory.Man2(y,x),.7)},Hat:function(){return[{col:PAL[10],pt:[{x:-15,y:0},{x:0,y:-7},{x:14,y:0},{x:0,y:7}]},{col:PAL[11],pt:[{x:-9,y:0},{x:-9,y:-7},{x:0,y:-3},{x:0,y:4}]},{col:PAL[12],pt:[{x:0,y:-3},{x:8,y:-7},{x:8,y:0},{x:0,y:4}]},{col:PAL[10],pt:[{x:-9,y:-7},{x:0,y:-11},{x:8,y:-7},{x:0,y:-3}]}]},Flat:function(y){var x=y||[PAL[25],PAL[26]];return[{col:x[0],pt:[{x:-32,y:0},{x:0,y:-16},{x:32,y:0},{x:0,y:16}]},{col:x[1],pt:[{x:-16,y:0},{x:0,y:-8},{x:16,y:1},{x:0,y:8}]}]}},PAL=["#000000","#C8C8C8","#aaaaaa","#999999","#cccccc","#4a3030","#402929","#368122","#225216","#4ab230","#545454","#333333","#282828","#938f8e","#645b5c","#3d3435","#b44528","#9d2817","#ef7e52","#ffac6c","#9c2615","#b4442a","#8E5451","#5C373B","#80413E","#69b9c8","#855120","#2b8596","#784614"];