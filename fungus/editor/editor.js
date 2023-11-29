class Editor{constructor(e=[]){this.molecules=e,this.drawing=!1,this.selectedIndex=e.length,this.deleteMode=!1,reactive.setListeners({mousedown:this.handleMousedown.bind(this),mousemove:this.handleMousemove.bind(this),mouseup:this.handleMouseup.bind(this),left:this.handleLeft.bind(this),right:this.handleRight.bind(this),special:()=>this.deleteMode=!this.deleteMode}),this.updateOutput(),shareButton.addEventListener("click",(()=>this.share())),colorInput.addEventListener("change",(()=>{this.selectedIndex<this.molecules.length&&(this.molecules[this.selectedIndex].color=colorInput.value)}))}handleMousedown(e){let t=this.molecules.find((t=>t.isAt(e)));if(void 0!==t)this.selectedIndex<this.molecules.length&&this.molecules[this.selectedIndex]===t?t.shape=t.shape.filter((t=>!t.equals(e))):this.deleteMode&&(this.molecules=this.molecules.filter((e=>e!==t)),this.selectedIndex=this.molecules.length);else if(this.selectedIndex<this.molecules.length)this.drawing=!0,this.molecules[this.selectedIndex].shape.push(e);else{const s=randomColor();colorInput.value=s,t=new HighlightedMolecule([e],s),this.molecules.push(t),this.selectedIndex=this.molecules.length-1,this.drawing=!0}this.updateOutput()}handleMousemove(e){this.drawing&&(this.molecules.some((t=>t.isAt(e)))||(this.molecules[this.selectedIndex].shape.push(e),this.updateOutput()))}handleMouseup(){this.drawing=!1,this.updateOutput()}updateOutput(){this.molecules=this.molecules.filter((e=>e.shape.length>0));const e={m:this.molecules.map((e=>e.output()))};console.log(JSON.stringify(e))}handleLeft(){this.selectedIndex<this.molecules.length&&(this.molecules[this.selectedIndex]=this.molecules[this.selectedIndex].unhighlighted()),this.selectedIndex=Math.max(0,this.selectedIndex-1),this.selectedIndex<this.molecules.length&&(this.molecules[this.selectedIndex]=this.molecules[this.selectedIndex].highlighted())}handleRight(){this.selectedIndex<this.molecules.length&&(this.molecules[this.selectedIndex]=this.molecules[this.selectedIndex].unhighlighted()),this.selectedIndex=Math.min(this.molecules.length,this.selectedIndex+1),this.selectedIndex<this.molecules.length&&(this.molecules[this.selectedIndex]=this.molecules[this.selectedIndex].highlighted())}share(){const e={m:this.molecules.map((e=>e.output()))},t=JSON.stringify(e),s=window.btoa(t),l=window.location.href.replace("editor/",""),i=new URL(l);i.searchParams.set("level",s),window.open(i,"_blank")}start(){window.setInterval((()=>this.render()),10)}render(){ctx.save(),ctx.fillStyle=this.deleteMode?"#322":"#222",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.restore(),grid.render(),this.molecules.forEach((e=>e.render()))}}let shareButton,colorInput;function startEditor(){setupGlobals(),shareButton=document.getElementById("share"),colorInput=document.getElementById("color");const e=new URLSearchParams(window.location.search).get("level");let t=[];if(e){const s=window.atob(e),{m:l}=JSON.parse(s);t=l.map((e=>Molecule.from(e,grid)))}new Editor(t).start()}function randomColor(){const e=(e,t)=>Math.floor(Math.random()*(t-e))+e,t=e(100,256),s=e(100,256),l=e(100,256);return`#${t.toString(16)}${s.toString(16)}${l.toString(16)}`}