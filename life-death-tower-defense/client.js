/**
 * This file is part of JS13kGames - DEATH.
 * Copyright (C) 2022  André Jaenisch
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

!function(){"use strict";function e(e,n){const t=e.cloneNode(!0);return"about-scene"!==n.activeScene?t.innerHTML="":t.innerHTML='\n      <h2>About</h2>\n      <p>This game is released under AGPL v3 or newer license.</p>\n      <p>\n        Mastodon share is implemented similar to\n        <a href="https://github.com/Aly-ve/Mastodon-share-button">\n          Mastodon-share-button\n        </a>.\n      </p>\n      <p>\n        You can find the source code and more at\n        <a href="https://jaenis.ch/hobbies/coding/repos/ryuno-ki/js13kgames-2022">\n          my Gitea instance\n        </a>.\n      </p>\n      <nav class="actions">\n        <button type="button" data-navigate="title-scene">Back to title</button>\n      </nav>\n    ',t}function n(e,n){const t=e.cloneNode(!0);return"game-over-scene"!==n.activeScene?t.innerHTML="":t.innerHTML='\n      <h2>Game over</h2>\n      <nav class="actions">\n        <button type="button" data-navigate="title-scene">\n          Try again\n        </button>\n      </nav>\n    ',t}function t(e,n){const t=e.cloneNode(!0);return"level-scene"!==n.activeScene?t.innerHTML="":t.innerHTML='\n      <section data-component="form"></section>\n      <section data-component="canvas"></section>\n    ',t}function a(e,n){const t=e.cloneNode(!0);if("level-editor-scene"!==n.activeScene)t.innerHTML="";else{const e=[{label:"Death",value:"death"},{label:"Life",value:"life"}],{maxEnemies:a,mode:i,pathway:o,place:r,towers:s}=n.levelDraft,c=null!==i&&null!==a&&s.length<a,l=null!==i&&null!==a&&s.length.toString()===a.toString()&&o.length>2;t.innerHTML=`\n      <h2>Level Editor</h2>\n      <div>\n        <label for="mode">\n          Which mode does the level have?\n        </label>\n        <select id="mode">\n          <option value="">Choose one</option>\n          ${e.map((e=>`<option value="${e.value}">${e.label}</option>`)).join("")}\n        </select>\n      </div>\n      <div>\n        <label for="maxEnemies">\n          How many enemies can be sent at maximum?\n        </label>\n        <input id="maxEnemies" type="number" min="1" step="1" value="${a}" />\n      </div>\n\t\t\t${c?`\n        <div>\n\t\t\t    <fieldset>\n\t\t\t  \t  <legend>\n\t\t\t  \t\t  What should be placed by clicking on the field?\n\t\t\t  \t\t</legend>\n\t\t\t  \t\t<input\n\t\t\t  \t\t  id="place-pathway"\n\t\t\t  \t\t\ttype="radio"\n\t\t\t  \t\t\tname="place"\n\t\t\t  \t\t\tvalue="pathway"\n\t\t\t  \t\t\t${"pathway"===r?'checked="checked"':""}\n\t\t\t  \t\t/>\n\t\t\t  \t  <label for="place-pathway">\n\t\t\t  \t\t  Pathway point\n\t\t\t  \t\t</label>\n\t\t\t  \t\t<input\n\t\t\t  \t\t  id="place-tower"\n\t\t\t  \t\t\ttype="radio"\n\t\t\t  \t\t\tname="place"\n\t\t\t  \t\t\tvalue="tower"\n\t\t\t  \t\t\t${"tower"===r?'checked="checked"':""}\n\t\t\t  \t\t/>\n\t\t\t  \t  <label for="place-tower">\n\t\t\t  \t\t\tTower\n\t\t\t  \t\t</label>\n\t\t\t  \t</fieldset>\n\t\t\t  </div>\n\t\t\t`:""}\n      ${null===i?"":'\n\t\t\t\t<div>\n          <section data-component="canvas"></section>\n        </div>\n      '}\n      <nav class="actions">\n\t\t\t  ${l?'<button type="button" data-action="save-draft">Save</button>':""}\n        <button type="button" data-navigate="title-scene">Back to title</button>\n      </nav>\n    `}return t}function i(e,n){const t=e.cloneNode(!0);if("new-game-scene"!==n.activeScene)t.innerHTML="";else{const e=n.levels.map(((e,n)=>({label:`Level ${n+1} (${e.mode})`,value:n})));t.innerHTML=`\n      <h2>New game</h2>\n      <div>\n        <label for="nickname">\n          How do you want to be called?\n        </label>\n        <input id="nickname" type="text" />\n      </div>\n      <div>\n        <label for="party" aria-describedby="party-explained">\n          Which party do you want to join?\n        </label>\n        <select id="party">\n          <option value="">Choose wisely</option>\n          <option value="life">Life</option>\n          <option value="death">Death</option>\n        </select>\n        <p id="party-explained">\n          Depending on your choice, you will either join the attack or the\n          defence forces. What happens depends also on the level.\n        </p>\n      </div>\n      <div>\n        <label for="activelevel">\n          Which level do you want to play?\n        </label>\n        <select id="activeLevel">\n          <option value="">Please choose</option>\n          ${e.map((e=>`<option value="${e.value}">${e.label}</option>`)).join("")}\n        </select>\n      </div>\n      <nav class="actions">\n        ${function(e){const{activeLevel:n}=e,{nickname:t,party:a}=e.player;if(!t)return!1;if(!a)return!1;if(null===n)return!1;if(""===n)return!1;return!0}(n)?'\n          <button type="button" data-navigate="level-scene">Start game</button>}\n        ':""}\n        <button type="button" data-navigate="title-scene">Back to title</button>\n      </nav>\n    `}return t}function o(e,n){const t=e.cloneNode(!0);if("settings-scene"!==n.activeScene)t.innerHTML="";else{const{prefersReducedMotion:e}=n.settings;t.innerHTML=`\n      <h2>Settings</h2>\n      <fieldset>\n        <legend>\n          Shall animations be shown?\n        </legend>\n        <input\n          id="prefers-reduced-motion-no"\n          type="radio"\n          name="prefers-reduced-motion"\n          value="no"\n          ${!1===e?'checked="checked"':""}\n        />\n        <label for="prefers-reduced-motion-no">\n          Yes\n        </label>\n        <input\n          id="prefers-reduced-motion-yes"\n          type="radio"\n          name="prefers-reduced-motion"\n          value="yes"\n          ${!0===e?'checked="checked"':""}\n        />\n        <label for="prefers-reduced-motion-yes">\n          No\n        </label>\n      </fieldset>\n      <fieldset>\n        <legend>\n          Storage\n        </legend>\n        <button id="clear-storage" type="button" data-clear="storage">\n          Clear storage\n        </button>\n      </fieldset>\n      <nav class="actions">\n        <button type="button" data-navigate="title-scene">Back to title</button>\n      </nav>\n    `}return t}function r(e,n){const t=e.cloneNode(!0);return"title-scene"!==n.activeScene?t.innerHTML="":t.innerHTML='\n      <h1>\n        <span>Life</span>\n        <span>Death</span>\n        <span>Tower</span>\n        <span>Defense</span>\n      </h1>\n      <nav class="actions">\n        <button type="button" data-navigate="new-game-scene">New Game</button>\n        <button type="button" data-navigate="level-editor-scene">\n          Level Editor\n        </button>\n        <button type="button" data-navigate="settings-scene">Settings</button>\n        <button type="button" data-navigate="about-scene">About</button>\n      </nav>\n    ',t}function s(e,n){const t=e.cloneNode(!0);return"win-scene"!==n.activeScene?t.innerHTML="":t.innerHTML='\n      <p>You won!</p>\n      <div data-component="mastodon-share"></div>\n      <nav class="actions">\n        <button type="button" data-navigate="title-scene">\n          Play another time\n        </button>\n      </nav>\n    ',t}function c(e){return null===e.activeLevel?e.levelDraft:e.levels[e.activeLevel]}function l(e,n){const{party:t}=e.player,a=n||c(e),{mode:i}=a;return t===i}function u(e,n){const t=e.x-n.x,a=e.y-n.y;return Math.sqrt(t*t+a*a)<e.radius+n.radius}function d(e,n){const t=e.cloneNode(!0),a=c(n),{mode:i}=a,o=n.entities[i];return t.innerHTML=`\n    <div class="actions">\n      ${o.map((e=>`\n          <button type="button" data-add-entity="${e.icon}">${e.icon}</button>\n          `)).join("")}\n    </div>\n  `,t}function p(e,n){const t=e.cloneNode(!0),{height:a,width:i}=c(n);return t.innerHTML=`\n    <div>Player life: ${"♠️".repeat(n.player.life)}</div>\n    <svg\n      viewBox="0 0 100 100"\n      preserveAspectRatio="xMidYMid meet"\n      xmlns="http://www.w3.org/2000/svg"\n      height="${a}"\n      width="${i}"\n      aria-labelledby="level-title"\n      aria-describedby="level-desc"\n    >\n      <title id="level-title"></title>\n      <desc id="level-desc"></desc>\n      <style>\n        text {\n          font-size: 0.5em;\n        }\n      </style>\n      <g id="level" data-component="level">\n      </g>\n    </svg>\n  `,t}function f(e,n){const t=e.cloneNode(!0),{mode:a,towers:i}=c(n),o="death"===a?"life":"death",r=n.entities[o];return t.innerHTML=`\n    <div class="actions">\n      ${i.map(((e,n)=>`Tower ${n}: ${function(e,n){return e.map((e=>`\n      <button type="button" data-add-entity="${e.icon}" data-index="${n}">\n        ${e.icon}\n      </button>\n    `)).join("")}(r,n)}`)).join("")}\n    </div>\n  `,t}function h(e,n){const t=e.cloneNode(!0),{enemies:a,mode:i}=c(n),o="death"===i?"white":"black";return t.innerHTML=`\n    ${a.map((e=>{const[n,t]=e.position;return`\n        <circle cx="${n}" cy="${t}" r="${e.radius}" fill="${o}" />\n        <text x="${n}" y="${t}">${e.icon}</text>\n    `})).join("")}\n  `,t}function v(e,n){const t=e.cloneNode(!0),a=n.activeLevel,{nickname:i,party:o}=n.player,{enemies:r,mode:s}=c(n),u=l(n)?"defend":"attack";return t.innerHTML=`\n    <h2>Level ${a+1} (${s})</h2>\n    <p>${i} plays for ${o}.</p>\n    <p>Therefore it is about ${u}ing here.</p>\n    ${function(e){if(!l(e))return function(e){const n=c(e),{enemies:t,maxEnemies:a}=n;if(t.length>=a)return"";return'<div class="actions" data-component="attack"></div>'}(e);return function(e){const n=c(e),{enemies:t,towers:a}=n;if(t.length>=a.length)return"";return'<div class="actions" data-component="defend"></div>'}(e)}(n)}\n    ${0===r.length?"":`\n      <p>Current choices: ${r.map((e=>e.icon)).join(", ")}</p>\n    `}\n  `,t}function m(e,n){const t=e.cloneNode(!0),{enemies:a,height:i,mode:o,width:r}=c(n),s="death"===o?"black":"white",l="death"===o?"white":"black";return t.innerHTML=`\n    <rect x="0" y="0" height="${i}" width="${r}" fill="${s}" />\n    <g id="pathway" data-component="pathway" data-stroke="${l}"></g>\n    <g id="enemies" data-component="enemies" data-enemies="${a.length}"></g>\n    <g id="towers" data-component="towers" data-stroke="${l}"></g>\n  `,t}function y(e,n){const t=e.cloneNode(!0);return t.innerHTML=`\n    <label for="mastodon-instance">\n      Configure your Mastodon instance\n    </label>\n    <input id="mastodon-instance" type="url" value="${n.mastodon}" />\n    <p>(Click away to confirm)</p>\n\n    <button type="button" data-share="I played Life Death Tower Defense">\n      Share on Mastodon\n    </button>\n    <p>Login required. This will open a popup.</p>\n  `,t}function g(e,n){const t=e.cloneNode(!0),a=t.dataset.stroke,{mode:i,pathway:o}=c(n),r=0===(s=o).length?"":[`M${s[0].join(",")}`,s.slice(1).map((e=>`L${e.join(",")}`)).join("")].join("");var s;return t.innerHTML=`\n    ${function(e,n){if(0===n.length)return"";const t="life"===e?"🛐":"🪦",[a,i]=n[0];return`<text x="${a}" y="${i}">${t}</text>`}(i,o)}\n    <path d="${r}" stroke="${a}" strokeWidth="6" fill="none" />\n    ${function(e,n){if(n.length<2)return"";const t="death"===e?"🛐":"🪦",[a,i]=n[n.length-1];return`<text x="${a}" y="${i}">${t}</text>`}(i,o)}\n  `,t}function b(e,n){const t=e.cloneNode(!0),a=e.dataset.stroke,i="black"===a?"white":"black",{towers:o}=c(n);return t.innerHTML=o.map(((e,n)=>{const[t,o]=e.position,r=null===e.icon?n+1:e.icon;return`\n      <g>\n        <circle cx="${t}" cy="${o}" r="${e.radius}" fill="${a}" />\n        <text x="${t-3}" y="${o+3}" stroke="${i}">${r}</text>\n      </g>\n    `})).join(""),t}function w(e,n){const t=e.cloneNode(!0);return n.settings.prefersReducedMotion?t.classList.add("no-motion"):t.classList.remove("no-motion"),t.innerHTML=`\n    ${["about","game-over","level","level-editor","new-game","settings","title","win"].map((function(e){return`<section data-component="${e}-scene">${e}</section>`})).join("")}\n  `,t}const $="ADD_ENTITY",L="ADD_COORD",M="HITS",S="LOOSE",x="LEVEL",T="PARTY",k="NAV",D="SAVE",j="DRAFT_MAX_ENEMIES",N="DRAFT_MODE",O="MOTION",E="NICKNAME",H="PLACE",A="RADII";function I(e){return{type:O,payload:{prefered:e}}}function C(e){return{type:H,payload:{mode:e}}}const W="LDTD_STATE";const _={activeLevel:null,activeScene:"title-scene",settings:{prefersReducedMotion:!1},hasLost:!1,hasWon:!1,entities:{death:[{icon:"🪔",life:1,radius:2,speed:10},{icon:"🕯️",life:1,radius:2,speed:10},{icon:"📿",life:1,radius:2,speed:10},{icon:"👼",life:1,radius:2,speed:10},{icon:"😇",life:1,radius:2,speed:10},{icon:"🎋",life:1,radius:2,speed:10}],life:[{icon:"🦇",life:1,radius:2,speed:10},{icon:"🕷️",life:1,radius:2,speed:10},{icon:"💀",life:1,radius:2,speed:10},{icon:"👺",life:1,radius:2,speed:10},{icon:"👹",life:1,radius:2,speed:10},{icon:"👻",life:1,radius:2,speed:10}]},levelDraft:{begin:null,height:320,width:320,mode:null,maxEnemies:null,enemies:[],pathway:[],place:"pathway",towers:[]},levels:[{begin:null,height:320,width:320,mode:"life",maxEnemies:3,enemies:[{begin:null,icon:null,position:[0,50],radius:2},{begin:null,icon:null,position:[0,50],radius:2},{begin:null,icon:null,position:[0,50],radius:2}],pathway:[[0,50],[30,50],[30,70],[70,70],[70,50],[100,50]],towers:[{icon:null,position:[28,44],radius:2},{icon:null,position:[36,52],radius:2}]},{begin:null,height:320,width:320,mode:"death",maxEnemies:5,enemies:[{begin:null,icon:null,position:[0,50],radius:2},{begin:null,icon:null,position:[0,50],radius:2},{begin:null,icon:null,position:[0,50],radius:2},{begin:null,icon:null,position:[0,50],radius:2},{begin:null,icon:null,position:[0,50],radius:2}],pathway:[[0,50],[30,50],[30,70],[70,70],[70,50],[100,50]],towers:[{icon:null,position:[30,44],radius:4},{icon:null,position:[36,50],radius:4}]}],mastodon:"https://layer8.space",player:{life:1,nickname:null,party:null}};function R(e,n){const t=e.levels.map(((t,a)=>a===e.activeLevel?function(e,n,t){const{entity:a,index:i}=t,o=e.player.party,r="death"===o?"life":"death",s=e.entities[o].concat(e.entities[r]).find((e=>e.icon===a));if(l(e,n))return function(e,n,t){return{...e,towers:P(e,n,t)}}(n,s,i);return function(e,n){return{...e,enemies:Y(e,n)}}(n,s)}(e,t,n):t));return Object.assign({},e,{levels:t})}function Y(e,n){const[t,a]=e.pathway[0],i=e.enemies.findIndex((e=>null===e.begin));return e.enemies.map(((e,o)=>o===i?{...e,...n,begin:Date.now().valueOf(),position:[t,a]}:e))}function P(e,n,t){return e.towers.map((function(e,a){return a===t?{...e,...n}:e}))}function q(e,n){const t=c(e),{coordinate:a}=n,[i,o]=a;return[...e.levelDraft.pathway,[F(i,t.width),X(o,t.height)]]}function B(e,n){const t=c(e),{coordinate:a}=n,[i,o]=a;return e.levelDraft.towers.concat({icon:null,position:[F(i,t.width),X(o,t.height)],radius:4})}function F(e,n){return Math.round(100*e/n)}function X(e,n){return Math.round(100*e/n)}function G(e){if("level-scene"!==e.activeScene)return e;const n=l(e,c(e))?function(e){const{player:n}=e,t=c(e).enemies.map((function(e){return e.life})).filter((function(e){return e>0}));return 0===t.length&&n.life>0}(e):function(e){const{player:n}=e,t=c(e),a=t.pathway[t.pathway.length-1],i={x:a[0],y:a[1],radius:2},o=t.enemies.filter((e=>e.life>0));return o.filter((function(e){return u({x:e.position[0],y:e.position[1],radius:e.radius},i)})).length>0&&n.life>0}(e);let t=e.activeScene;return n&&(t="win-scene"),Object.assign({},e,{activeScene:t,hasWon:n})}function V(e,n){const{scene:t}=n,a=function(e,n){return e.levels.map((function(t,a){return"title-scene"===n?Object.assign({},_.levels[a]):"level-scene"===n?function(e,n){return{...n,begin:Date.now().valueOf(),enemies:J(e,n),towers:z(e,n)}}(e,t):t}))}(e,t),i=function(e,n){if("title-scene"===n)return Object.assign({},_.player);if("level-scene"!==n)return e.player;return l(e)?function(e){return{...e.player,life:1}}(e):function(e){return{...e.player,life:c(e).maxEnemies||0}}(e)}(e,t);return Object.assign({},e,{activeScene:t,levels:a,player:i})}function J(e,n){return n.enemies.map((t=>function(e,n,t){if(l(e,n))return{...t,...K(e,n.mode)};return t}(e,n,t)))}function z(e,n){return n.towers.map((t=>function(e,n,t){if(l(e,n))return t;return{...t,...K(e,n.mode)}}(e,n,t)))}function K(e,n){return Q("life"===n?e.entities.death:e.entities.life)}function Q(e){return e[Math.floor(Math.random()*e.length)]}function U({enemy:e,pathway:n}){const[t,a,i]=function(e,n){const t=function(e,n){const{begin:t,speed:a}=n,i=1e3*a;return Z(e-t,0,i)/i}(Date.now().valueOf(),e),a=function(e){const n=[],t=function(e){const n=e.map(((e,n,t)=>{if(n===t.length-1)return null;const[a,i]=e;return Math.sqrt(a*a+i*i)})).filter(Boolean);return n.reduce(((e,n)=>e+n),0)}(e);let a=0;for(let i=0;i<e.length-1;i++){const[o,r]=e[i],s=Math.sqrt(o*o+r*r);n.push(a+s/t),a=n[n.length-1]}return[0].concat(n)}(n),i=Z(function(e,n){let t=0;for(let a=n.length-1;a>=0;a--){if(e>n[a]){t=a;break}}return t}(t,a),0,n.length-2),o=i+1,r=n[i],s=n[o],[c,l]=r,[u,d]=s;return[[c,l],[u,d],t]}(e,n),[o,r]=t,[s,c]=a;return[Z((1-i)*o+i*s,o,s),Z((1-i)*r+i*c,r,c)]}function Z(e,n,t){return e<n?n:e>t?t:e}const ee=new class{constructor(e){this.reducer=e,this.state=e(void 0,{type:""}),this._hydrateFromWebStorage()}async dispatch(e){this.state=this.reducer(this.state,e),this._applySideEffects(e)}getState(){return this.state}_applySideEffects(e){e.type===k&&(document.title=`${e.payload.scene} | Life Death Tower Defense | js13kgames-2022 - DEATH`),this._saveStateToWebStorage()}_hydrateFromWebStorage(){try{const e=window.localStorage.getItem(W);null!==e&&(this.state=JSON.parse(e))}catch(e){console.error("Could not restore state because",e)}}_saveStateToWebStorage(){try{window.localStorage.setItem(W,JSON.stringify(this.getState()))}catch(e){console.error("Could not save state because",e)}}}((function(e=_,n){const{payload:t,type:a}=n;switch(a){case L:return function(e,n){const{maxEnemies:t,place:a,towers:i}=e.levelDraft,o={...e.levelDraft,pathway:"pathway"===a?q(e,n):e.levelDraft.pathway,place:null!==t&&i.length<t?e.levelDraft.place:"pathway",towers:"tower"===a?B(e,n):e.levelDraft.towers};return Object.assign({},e,{levelDraft:o})}(e,t);case $:return R(e,t);case M:return function(e){if("level-scene"!==e.activeScene)return Object.assign({},e);const n=c(e),{pathway:t}=n,a=t[t.length-1],i={radius:2,x:a[0],y:a[1]},o=n.enemies.map((function(e){return{radius:e.radius,x:e.position[0],y:e.position[1]}})).some((function(e){return u(e,i)})),r={...n,enemies:o};return Object.assign({},e,{level:r})}(e);case S:return function(e){const n=0===e.player.life;let t=e.activeScene;return n&&(t="game-over-scene"),Object.assign({},e,{activeScene:t,hasLost:n})}(e);case"WIN":return G(e);case x:return function(e,n){const{level:t}=n;let a=parseInt(t,10);return isNaN(a)&&(a=null),Object.assign({},e,{activeLevel:a})}(e,t);case T:return function(e,n){const{party:t}=n,a={...e.player,party:t};return Object.assign({},e,{player:a})}(e,t);case k:return V(e,t);case D:return function(e){const n=[...e.levels,e.levelDraft],t=Object.assign({},e.levelDraft);return Object.assign({},e,{activeScene:"new-game-scene",levelDraft:t,levels:n})}(e);case j:return function(e,n){const{maxEnemies:t}=n,a={...e.levelDraft,maxEnemies:t};return Object.assign({},e,{levelDraft:a})}(e,t);case N:return function(e,n){const{mode:t}=n,a={...e.levelDraft,mode:t};return Object.assign({},e,{levelDraft:a})}(e,t);case"MASTODON":return function(e,n){const{instance:t}=n;return Object.assign({},e,{mastodon:t})}(e,t);case O:return function(e,n){const{prefered:t}=n,a={...e.settings,prefersReducedMotion:t};return Object.assign({},e,{settings:a})}(e,t);case E:return function(e,n){const{nickname:t}=n,a={...e.player,nickname:t};return Object.assign({},e,{player:a})}(e,t);case H:return function(e,n){const{mode:t}=n,a={...e.levelDraft,place:t};return Object.assign({},e,{levelDraft:a})}(e,t);case"POS":return function(e){const n=e.levels.map((function(e){if(null!==e.begin){const{pathway:n}=e;return{...e,enemies:e.enemies.map((function(e){return{...e,position:U({enemy:e,pathway:n})}}))}}return e}));return Object.assign({},e,{levels:n})}(e);case A:return function(e){let n=e.levels;return"level-scene"===e.activeScene&&(n=e.levels.map(((n,t)=>t===e.activeLevel?function(e){const n=2,t=.01;return{...e,enemies:e.enemies.map((e=>({...e,radius:n+(e.radius+t)%4}))),towers:e.towers.map((e=>e.icon?{...e,radius:n+(e.radius+t)%4}:e))}}(n):n))),Object.assign({},e,{levels:n})}(e);default:return e}}));function ne(e){const{target:n}=e;if(n&&n.id)switch(n.id){case"activeLevel":return ee.dispatch((i=n.value,{type:x,payload:{level:i}}));case"mastodon-instance":return ee.dispatch(setMastodonInstance(n.value));case"maxEnemies":return ee.dispatch(function(e){return{type:j,payload:{maxEnemies:e}}}(n.value));case"mode":return ee.dispatch(function(e){return{type:N,payload:{mode:e}}}(n.value));case"nickname":return ee.dispatch((a=n.value,{type:E,payload:{nickname:a}}));case"party":return ee.dispatch((t=n.value,{type:T,payload:{party:t}}));case"place-pathway":return ee.dispatch(C("pathway"));case"place-tower":return ee.dispatch(C("tower"));case"prefers-reduced-motion-no":return ee.dispatch(I(!1));case"prefers-reduced-motion-yes":return ee.dispatch(I(!0))}var t,a,i}function te(e){const n=e.target;if(n&&n.dataset){if(n.dataset.action)return ee.dispatch({type:D,payload:{}});if(n.dataset.addEntity)return ee.dispatch((a=n.dataset.addEntity,i=n.dataset.index||"",{type:$,payload:{entity:a,index:parseInt(i,10)}}));if(n.dataset.clear)return localStorage.removeItem(W);if(n.dataset.navigate)return ee.dispatch((t=n.dataset.navigate,{type:k,payload:{scene:t}}));if(n.dataset.share)return function(e,n){const t=`${n}/share?text=${e}`;window.open(t,"__blank")}(n.dataset.share,ee.getState().mastodon);!function(e){const n=document.querySelector('[data-component="level-editor-scene"] [data-component="canvas"] svg');if(!n)return;const{pageX:t,pageY:a}=e,i=n.getBoundingClientRect();if(function(e,n){const{pageX:t,pageY:a}=e,{bottom:i,left:o,right:r,top:s}=n;if(a<s)return!1;if(a>i)return!1;if(t<o)return!1;if(t>r)return!1;return!0}(e,i)){const{left:e,top:n}=i;ee.dispatch(function({pageX:e,pageY:n},{left:t,top:a}){const i=Math.round(e-t),o=Math.round(n-a);return{type:L,payload:{coordinate:[i,o]}}}({pageX:t,pageY:a},{left:e,top:n}))}}(e)}var t,a,i}const ae=new Map;function ie(e,n){ae.set(e,oe(n))}function oe(e){return function(n,t){const a=e(n,t);return Array.from(a.querySelectorAll("[data-component]")).forEach((function(e){const n=e.dataset.component,a=ae.get(n);a&&e.replaceWith(a(e,t))})),a}}function re(e,n,t){if(n&&!t)return function(e){e.remove()}(n);if(!n&&t)return function(e,n){e.appendChild(n)}(e,t);if(function(e,n){if(e.tagName!==n.tagName)return!0;const t=e.attributes,a=n.attributes;return t.length!==a.length||(!!Array.from(t).find((function(t){const{name:a}=t;return e.getAttribute(a)!==n.getAttribute(a)}))||0===e.children.length&&0===n.children.length&&e.textContent!==n.textContent)}(n,t))return function(e,n){e.replaceWith(n)}(n,t);const a=Array.from(n.children),i=Array.from(t.children),o=Math.max(a.length,i.length);for(let e=0;e<o;e++)re(n,a[e],i[e])}async function se(){const e=document.querySelector("#app");if(!e)return console.error("Could not find #app");const n=(t=e,a=ee.getState(),oe((function(e){return e.cloneNode(!0)}))(t,a));var t,a;re(document.body,e,n),await ee.dispatch({type:"POS",payload:{}}),await ee.dispatch({type:A,payload:{}}),await ee.dispatch({type:M,payload:{}}),await ee.dispatch({type:S,payload:{}}),await ee.dispatch({type:"WIN",payload:{}}),requestAnimationFrame(se)}function ce(){ie("about-scene",e),ie("attack",d),ie("canvas",p),ie("defend",f),ie("enemies",h),ie("form",v),ie("game-over-scene",n),ie("level",m),ie("level-editor-scene",a),ie("level-scene",t),ie("mastodon-share",y),ie("new-game-scene",i),ie("pathway",g),ie("settings-scene",o),ie("title-scene",r),ie("towers",b),ie("win-scene",s),ie("wrapper",w),se(),document.body.addEventListener("change",ne),document.body.addEventListener("click",te)}window.addEventListener("load",ce,!1)}();