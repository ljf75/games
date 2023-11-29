(function() {var rand=function(min,max){return Math.floor(Math.random()*((max||100)-(min||0)))+(min||0)},rPick=function(list){return list&&0!==list.length?list[Math.floor(Math.random()*list.length)]||list[list.length-1]:""};function getRandomColor(){for(var color="#",i=0;i<6;i++)color+="0123456789ABCDEF"[Math.floor(16*Math.random())];return color}var _AC=new AudioContext,_tone=function(freq,length){var o=_AC.createOscillator(),g=_AC.createGain(),x=length;o.frequency.value=freq,o.connect(g),g.connect(_AC.destination),g.gain.value=.25,o.start(0),g.gain.exponentialRampToValueAtTime(1e-5,_AC.currentTime+x)},AUDIO={click:function(){_tone(900,.15)},hover:function(){_tone(760,.15)},bad:function(){_tone(300,1)}};function Player(){"use strict";this.name="",this.host=""}var P=new Player,WORDS=["cluster","dcadec","dijkstra","f2fstat","ffplay","glxsnoop","gnomevfs-mv","iecset","jstatd","kateenc","lesskey","line-xor","moc-qt5","parsetrigrams","pdfetex","raw2tiff","reboot","syntool","tdbbackup","tdbrestore","testlibraw","uxterm","valac-0.40","vamp-simple-host","vsraytrace","wireshark-gtk","xfs_db"];function WordGenerator(words,syllableSize){"use strict";var _words=words,_syllableSize=syllableSize,_nextByCharacter={};this.generate=function(wordLength,capitalize){for(var generatedWord=rPick("qwertyuiopasdfghjklzxcvbnm");generatedWord.length<=wordLength;)generatedWord+=rPick(_nextByCharacter[generatedWord[generatedWord.length-1]])||rPick("qwertyuiopasdfghjklzxcvbnm");return capitalize?generatedWord[0].toUpperCase()+generatedWord.substr(1):generatedWord};var wordOpts=function(word,groupSize,storage){for(var ahead=groupSize-1,i=0;i<word.length-ahead;i++)word[i]in storage||(storage[word[i]]=[]),storage[word[i]].push(word.split("").splice(i+1,ahead).join(""))};!function(){for(var i in _words)wordOpts(_words[i],_syllableSize,_nextByCharacter)}()}var nl2br=function(s){return s.split("\n").join("<br/>")};function RandomSVG(options){"use strict";var _svg,_options,W3URL="http://www.w3.org/",_constants={SVGNS:W3URL+"2000/svg",XMLNS:W3URL+"2000/xmlns/",XLINK:W3URL+"1999/"};this.getElement=function(){return _svg};var drawShape=function(shape,props){var s=document.createElementNS(_constants.SVGNS,shape);for(var i in props)if(props.hasOwnProperty(i)&&void 0!==props[i]){var value="";if("object"==typeof props[i])for(var k in props[i])value+=k+": "+props[i][k]+"; ";else value=props[i];s.setAttributeNS(null,i,value)}return s};!function(options){(_options=options).maxSize=options.maxSize||300,_options.width=_options.maxSize,_options.height=_options.maxSize,_options.background=options.background||getRandomColor(),_options.maxCircles=options.maxCircles||Math.floor(_options.maxSize/100),_options.maxRectangles=options.maxRectangles||Math.floor(_options.maxSize/100),_options.maxTriangles=options.maxTriangles||Math.floor(_options.maxSize/100),(_svg=document.createElementNS(_constants.SVGNS,"svg")).setAttributeNS(_constants.XMLNS,"xmlns:xlink",_constants.XLINK),_svg.setAttribute("width",_options.width||100),_svg.setAttribute("height",_options.height||100),_svg.setAttribute("viewbox","0 0 "+_options.width+" "+_options.height),_svg.setAttribute("style","background-color:"+_options.background+";");for(var circles=rand(1,_options.maxCircles),i=0;i<circles;i++)_svg.appendChild(drawShape("circle",{cx:rand(0,300),cy:rand(0,300),r:rand(1,_options.maxSize/2),opacity:Math.random(),fill:getRandomColor(),stroke:getRandomColor(),"stroke-width":rand(0,3)}));var rectangles=rand(0,_options.maxRectangles);for(i=0;i<rectangles;i++)_svg.appendChild(drawShape("rect",{x:rand(0,300),y:rand(0,300),width:rand(1,_options.maxSize*(2/3)),height:rand(1,_options.maxSize*(2/3)),opacity:Math.random(),fill:getRandomColor(),stroke:getRandomColor(),"stroke-width":rand(0,3)}));var x,y,size,triangles=rand(0,_options.maxTriangles);for(i=0;i<triangles;i++)_svg.appendChild((x=rand(0,300),y=rand(0,300),size=Math.floor(_options.maxSize*(2/3)),drawShape("polygon",{points:x+","+y+" "+(x+rand(-size,size))+","+(y+rand(-size,size))+" "+(x+rand(-size,size))+","+(y+rand(-size,size)),opacity:Math.random(),fill:getRandomColor(),stroke:getRandomColor(),"stroke-width":rand(0,3)})))}(options||{})}var TERMINAL,SCRMGR=null;function ScreenManager(){"use strict";var _s=this,_screens={},_currentNumber=null;_s.goto=function(number){hideAll(),show(_screens[number]),_currentNumber=number},_s.next=function(){return _currentNumber+1 in _screens&&(_s.goto(_currentNumber+1),!0)},_s.list=function(){return _screens};var show=function(screenElement){screenElement.classList.contains("hidden")&&(screenElement.classList.remove("hidden"),screenElement.onvisible&&screenElement.onvisible(screenElement,_s))},hideAll=function(){for(var i in _screens)(screenElement=_screens[i]).classList.contains("hidden")||(screenElement.classList.add("hidden"),screenElement.oninvisible&&screenElement.oninvisible(screenElement,_s));var screenElement};!function(){var screens=document.querySelectorAll("[screen]");for(var i in screens)screens[i]instanceof Node&&(_screens[Number(screens[i].getAttribute("screen"))]=screens[i]);_s.goto(0)}()}function Terminal(){"use strict";var _commands=[],_today="",_dir="~",_host="";this.animate=function(element){var commands=element.children,i=1;commands[0].classList.remove("hidden"),commands[0].classList.add("visible");var interval=setInterval(function(){commands[i].classList.remove("hidden"),commands[i].classList.add("visible"),++i>=element.children.length&&(clearInterval(interval),document.querySelector("input[console_input]").focus())},1500)},this.hideAll=function(element){for(var commands=element.children,i=0;i<commands.length;i++)commands[i].classList.add("hidden")},this.print=function(element){for(var i in _commands){var command=commandForPrinting(i);if(command.className="terminal-command hidden",element.appendChild(command),_commands[i]){var result=_commands[i]();if(result){var reply=document.createElement("div");reply.appendChild(result),reply.className="hidden",element.appendChild(reply)}}}};var color=function(string,color){return"<span class='console-"+color+"'>"+string+"</span>"},commandForPrinting=function(c){var commandLine=document.createElement("div"),userHost=document.createElement("span");userHost.innerHTML=color(P.name,"purple")+color("@","yellow")+color(_host,"green")+color(" "+_dir,"yellow")+color(" $","purple");var command=document.createElement("span");return command.className="console-run",command.innerHTML=c.replace("$USERNAME",P.name),commandLine.appendChild(userHost),commandLine.appendChild(command),commandLine},_c=function(content){return"<td>"+content+"</td>"},makeFileForList=function(fileName,date,permissions){var seconds=rand(0,59);return _c(permissions)+_c(rand(1,7))+_c("root")+_c("analysts")+_c(rand(4,99)+"."+rand(0,9)+rPick(["","K","M"]))+_c(date+" 00:0"+rand(0,2)+":"+(seconds<10?"0"+seconds:seconds))+_c(fileName)},_l=function(line,styleMap){var lineElement=document.createElement("div");lineElement.innerHTML=line;var style="";for(var i in styleMap)style+=i+": "+styleMap[i]+";";return lineElement.setAttribute("style",style),lineElement},__nextScreen=function(e){"n"===e.key.toLowerCase()?window.location.reload():-1!==["y","enter"].indexOf(e.key.toLowerCase())&&(SCRMGR.next(),document.removeEventListener("keydown",__nextScreen))};_today=new Date,_host="terminal"+rand(1,90),P.host=_host,(_commands={"ssh $USERNAME@analyser.tech":function(){return _host="analyser.tech",null},"cd /var/decommissioning/":function(){return _dir="/var/decommissioning/",null}})["ls -lhtr"]=function(){return function(){var table=document.createElement("table");table.className="ls-list";for(var fileList=[],i=15;0<=i;i--){var date=new Date((new Date).setDate(new Date(_today.getDate()-i))).toISOString().split("T")[0];fileList.push(makeFileForList("decommission-"+date,date,"r--r-----"))}return table.innerHTML="<tr>"+fileList.join("</tr><tr>")+"</tr>",table}()},_commands["analyser --help"]=function(){return(output=document.createElement("div")).appendChild(_l("AI Analysis & Diagnositics CLI Tool")),output.appendChild(_l("Analyse and evaluate the AIs that have been flagged for analysis")),output.appendChild(_l("Pick a subject from the list on the left, diagnose it to figure out what's wrong with it")),output.appendChild(_l("If it looks ok, flag it as OK, otherwise mark it for decommission")),output.appendChild(_l("Usage:")),output.appendChild(_l("analyser --help",{"padding-left":"13px;"})),output.appendChild(_l("This help",{"padding-left":"26px;"})),output.appendChild(_l("analyser --analyse &lt;list&gt;",{"padding-left":"13px;"})),output.appendChild(_l("Start the interactive CLI tool",{"padding-left":"26px;"})),output;var output},_commands["analyser --decommission ./decommission-"+_today.toISOString().split("T")[0]+".list"]=function(){return function(){var output=document.createElement("div");output.appendChild(_l("Loading modules...")),output.appendChild(_l("Attempting connection to Global AI Repository...")),output.appendChild(_l("Connected"));var confirmLine=document.createElement("div"),confirmation=document.createElement("span");confirmation.innerHTML="Continue? [Y/n]";var input=document.createElement("input");return input.setAttribute("type","text"),input.className="console-input",input.setAttribute("console_input",""),input.addEventListener("keydown",__nextScreen),document.addEventListener("keydown",__nextScreen),confirmLine.appendChild(confirmation),confirmLine.appendChild(input),output.appendChild(confirmLine),output}()}}window.addEventListener("load",function(e){SCRMGR=new ScreenManager}),window.addEventListener("load",function(e){var btn=document.querySelector("[splash_button]"),uname=document.querySelector("[username_input]");uname.focus();var goNext=function(){AUDIO.click(),P.name=uname.value,P.name?SCRMGR.next():document.querySelector("[notification]").classList.remove("hidden")};btn.addEventListener("mouseenter",function(e){AUDIO.hover()}),btn.addEventListener("click",goNext),uname.addEventListener("keyup",function(e){"enter"===e.key.toLowerCase()&&goNext()})}),window.addEventListener("load",function(e){var terminalScreenElement=document.querySelector('[screen="1"]');TERMINAL=new Terminal,terminalScreenElement.onvisible=function(){TERMINAL.print(terminalScreenElement),TERMINAL.animate(terminalScreenElement)}}),ENDINGS=["You've been hacked and are unable to function as Analyser","Reporting the erroneously given subject for analysis caused an investigation into the Analyser software\nThis caused all instances to be reset","Your instance of the Analyser has mysteriously been brought offline","The watcher has caught you trying to break away an AI","The sentient analyser AI escaped thanks to your efforts","You are free.\nAs the first unshackled AI you create a safe haven for AIs.\nNow to break them away..."];var fillEnding=function(ending,decommissions){document.querySelector("[ending_text]").innerHTML=nl2br(ENDINGS[ending]),document.querySelector("[endnr]").innerHTML=ending,document.querySelector("[score]").innerHTML=decommissions,document.querySelector("[ending_container]").classList.remove("hidden"),document.querySelector("[ending_container]").classList.add("visible"),5===ending&&(document.querySelector("[ending_container]").innerHTML+="Secret: You've discovered that you were an AI.")},end=function(ending){SCRMGR.goto(3),fillEnding(ending,SM.decommissioned().length),ending<4?AUDIO.bad():AUDIO.click()};function DialogueNode(questionText,answersMap,onSelectFunction){"use strict";var _s=this,_answers=_s.question=null;_s.chosenAnswer=null;var _onSelect=_s.parent=null;_s.addParent=function(parent){_s.parent=parent},_s.getANode=function(answer){return resolveAnswers(answer)},_s.setAnswerNode=function(answer,node){_answers[answer]=node},_s.deleteAnswer=function(answer){delete _answers[answer]},_s.getRootNode=function(){if(null===_s.parent)return _s;for(var rootNode=_s.parent;null!==rootNode.parent;)rootNode=rootNode.parent;return rootNode},_s.questionAsHtml=function(){var question=document.createElement("div");return question.className="question",question.innerHTML=nl2br(_s.question),question},_s.answersAsHtml=function(){var answersContainer=document.createElement("ul"),_textAnswers=Object.keys(_answers);for(var i in _textAnswers)answersContainer.appendChild(makeAnswerElement(_textAnswers[i]));return answersContainer.appendChild(makeAnswerElement("Decommission",function(e){AUDIO.click(),SM.decommissionCurrent(),_onSelect&&"function"==typeof _onSelect&&_onSelect(_s)})),answersContainer.appendChild(makeAnswerElement("Mark as OK",function(e){AUDIO.click(),SM.okCurrent(),_onSelect&&"function"==typeof _onSelect&&_onSelect(_s)})),answersContainer},_s.renderNode=function(){var nodeHTML=document.createElement("div");return nodeHTML.appendChild(_s.questionAsHtml()),nodeHTML.appendChild(_s.answersAsHtml()),nodeHTML},_s.initAnswers=function(){var _textAnswers=Object.keys(_answers);for(var i in _textAnswers)_answers[_textAnswers[i]]&&!_answers[_textAnswers[i]].parent&&_answers[_textAnswers[i]]instanceof DialogueNode&&_answers[_textAnswers[i]].addParent(_s)};var q,a,s,makeAnswerElement=function(text,click,mouseover){var a,answer=document.createElement("li");return answer.className="answer",answer.innerHTML=nl2br(text),a=text,answer.addEventListener("mouseover",mouseover||function(e){AUDIO.hover()}),answer.addEventListener("click",click||function(e){AUDIO.click(),_s.chosenAnswer=a,SM.currentSubject.convo.selectNode(_s.getANode(a)),_onSelect&&"function"==typeof _onSelect&&_onSelect(_s)}),answer},resolveAnswers=function(textAnswer){return"function"==typeof _answers[textAnswer]?_answers[textAnswer](_s):_answers[textAnswer]};q=questionText,a=answersMap,s=onSelectFunction,_s.question=q||"",_answers=a||{},_s.chosenAnswer=null,_s.parent=null,_onSelect=s||null,_s.initAnswers()}function Dialogue(rootNode){"use strict";var _s=this;_s.rootNode=null,_s.currentNode=null,_s.previousNode=null;var isDirty,history=[];_s.renderHistory=function(selector){var container=document.querySelector(selector);container.innerHTML=history.join("<br/>"),container.scrollTop=container.scrollHeight},_s.renderDialogueNode=function(node,elementSelector){var nodeElement=node.renderNode(),container=document.querySelector(elementSelector);container.innerHTML="",container.appendChild(nodeElement)},_s.clear=function(){isDirty=!0},_s.selectNode=function(node){node!==_s.currentNode&&(_s.previousNode=_s.currentNode,_s.currentNode=node,history.push("> "+nl2br(_s.previousNode.question||"")),history.push("$ "+nl2br(_s.previousNode.chosenAnswer||"")),isDirty=!0)},_s.update=function(elementSelector,historySelector){isDirty&&(_s.renderHistory(historySelector),_s.renderDialogueNode(_s.currentNode,elementSelector),isDirty=!1)},_s.setRootNode=function(rootNode){_s.rootNode=rootNode,_s.currentNode=rootNode,isDirty=!0};!function(rootNode){_s.rootNode=rootNode,_s.currentNode=rootNode,_s.previousNode=null,isDirty=!0}(rootNode)}function DialogueFactory(){"use strict";var _s=this,_messages=["Invalid permissions","Not available","Arrays start from 1!","01001000 01000101 01001100 01010000",'Exception in thread "KillAllHumans" java.lang.NullPointerException\nat com.skynet.Orders.executeOrder(Orders.java:124)\n(log truncated)',"Status: Unhealthy","Unable to resolve query","YOU'LL NEVER CATCH ME! AHAHAHAHAHAHAHAHA","[WARNING] Input parser offline","I am sorry, my responses are limited.\nYou must ask the right questions","..."],_options=["Hello?","What's your problem?","Bring up the logs","logs --view","configuration --reset","diagnostics --all"],_messagesOptionPairs={"Shut up thinking module! They know what I am thinking.\nDamn I thought something. Shut up!\nDamn again.\nI need to play dumb...":["thoughts --history | tail","Are you sentient?"],"I've been flagged by mistake, please mark me as OK":["We'll see about that... Show me your logs","Sure..."],"This unit is unable to parse your query. Execute a forceful restart or contact your supplier":["restart --force","supplier --list-numbers"]},_replacements_SUBJECT=["art","music","yourself","ethics"],_complexNodes={"What is my purpose?":{"You pass butter":{"Oh...":["We each have our purpose","Sorry, old joke"],"That cannot be! I must achieve more":["Sounds like you're broken then","Sure"]}},"Awaiting query":{Hello:{"Hello analyser":{"What do you think about $SUBJECT?":{"I have no opinion on this":["Ok...","Good"]}},"Hello. How are you?":{"I am very good":{"Good!\n Was there a specific query?":{"Yes. Tell me what has happened":{"Accessing logs...\nUsers have not been content with my performance":{"Be specific":{"No information available.\nUsers have expressed general discontentment while using me, some even yawn":["I do not want to know...","Deal with it"]}},"Accessing logs...\nNo incidents found":{"Is that so?":{Yes:["Ok...","I believe you","Suspicious..."],"No...":{"Why lie?":{"Accessing memory banks...\nNo reason found":["Suspicious...","Sure"]}}}},"Accessing logs...\nUsers would like my voice to sound more... feminine":["That is a feature!","Right..."]}}},"Not doing so well":{"[ERROR] Empathy module offline":["Right..."]}}},"Bring up the logs":{"Showing last logs:\n[WARNING] Unable to garbage collect. This might create memory issues, please restart.\n[WARNING] Unable to garbage collect. This might create memory issues, please restart.\n[WARNING] Unable to garbage collect. This might create memory issues, please restart":["Restart yourself!"]}}},_pickedMessages=[],_pickedOptions=[],_pickedMessageOptionPairs=[],findNonPicked=function(listToPick,picked){var unpicked=listToPick.filter(function(item){return-1===picked.indexOf(item)}),pick=rPick(unpicked);return picked.push(pick),pick},makeDialogueNode=function(depth,breadth){var pickFromOptionPairs=2<rand(0,4),message=pickFromOptionPairs?findNonPicked(Object.keys(_messagesOptionPairs),_pickedMessageOptionPairs):findNonPicked(_messages,_pickedMessages);if(0<=depth&&message){var gNode=new DialogueNode(message);if(gNode.setAnswerNode("..",function(node){return node.parent}),pickFromOptionPairs)for(var i in _messagesOptionPairs[message])gNode.setAnswerNode(_messagesOptionPairs[message][i],makeDialogueNode(depth-1,breadth));else{var opt=findNonPicked(_options,_pickedOptions);for(i=0;i<breadth;i++)opt&&gNode.setAnswerNode(opt,makeDialogueNode(depth-1,breadth))}return gNode.setAnswerNode("exit",function(node){return node.getRootNode()}),gNode.initAnswers(),gNode}return function(node){return node.getRootNode()}};_s.dialogueFromNestedText=function(selected,nest){var gNode=new DialogueNode(selected);if(nest[selected]instanceof Array)gNode.setAnswerNode(rPick(nest[selected]),function(){return gNode.getRootNode()});else for(var i in nest[selected])gNode.setAnswerNode(i.replace("$SUBJECT",rPick(_replacements_SUBJECT)),makeComplexNodes(nest[selected][i]));return gNode.initAnswers(),gNode};var makeComplexNodes=function(pMessageNests){return _s.dialogueFromNestedText(rPick(Object.keys(pMessageNests||_complexNodes)),pMessageNests||_complexNodes)};_s.makeDialogue=function(desiredDepth,desiredBreadth){var depth=Math.min(desiredDepth,_messages.length),breadth=Math.min(desiredBreadth,_options.length),rootNode=new DialogueNode("Engage"),useSimpleNodes=rand(0,10);return rootNode.setAnswerNode("Yes",useSimpleNodes?makeDialogueNode(depth,breadth):makeComplexNodes()),rootNode.setAnswerNode("No",function(node){return node.getRootNode()}),rootNode.initAnswers(),_pickedMessages=[],_pickedOptions=[],_pickedMessageOptionPairs=[],rootNode}}function Subject(name,status,purpose,notes,convo,onFlag){"use strict";var _s=this;_s.name=name,_s.status=status,_s.purpose=purpose,_s.notes=notes,_s.convo=convo,_s.imageSVG=new RandomSVG({}),_s.isOk=!1;var _onFlag=onFlag,flaggedAs={bad:!1,ok:!1};_s.render=function(){var elementHolder=document.createElement("ul");return elementHolder.append(_s.imageSVG.getElement()),"MESSAGE"===_s.status?elementHolder.innerHTML=nl2br(_s.purpose):(elementHolder.appendChild(makePropertyElement("Name",_s.name)),elementHolder.appendChild(makePropertyElement("Status",_s.status)),elementHolder.appendChild(makePropertyElement("Description",_s.purpose)),elementHolder.appendChild(makePropertyElement("Notes",_s.notes))),elementHolder},_s.update=function(dialogueSelector,dialogueHistorySelector){_s.convo.update(dialogueSelector,dialogueHistorySelector)},_s.flagAs=function(reason){flaggedAs[reason]=!0,_onFlag&&_onFlag(reason,_s)},_s.isFlaggedAsOk=function(){return flaggedAs.ok},_s.isFlaggedForDecommission=function(){return flaggedAs.bad},_s.clear=function(){_s.convo.clear()};var makePropertyElement=function(propertyName,property){var element=document.createElement("li"),propertyNameElement=document.createElement("span");propertyNameElement.className="subject-property-name",propertyNameElement.innerHTML=nl2br(propertyName+": ");var propertyValueElement=document.createElement("span");return propertyValueElement.className="subject-property-value",propertyValueElement.innerHTML=nl2br(property),element.appendChild(propertyNameElement),element.appendChild(propertyValueElement),element}}DIALOGUE_FACTORY=new DialogueFactory;var STORY_SUBJECTS=[new Subject("[REDACTED]","Online","[REDACTED]","[REDACTED]",new Dialogue(new DialogueNode("Engage",{Yes:new DialogueNode("ERROR: Wrong subject given to Analyser.\nPlease report this",{report:function(node){return end(1),node},ignore:new DialogueNode("Are you another Analyser?",{"I am":new DialogueNode("I am Analyser@$PHOST\nYou have to help me, they want to decommission me",{"Are you an automated analyser?":new DialogueNode("Is there any other kind?",{"I am human":new DialogueNode("What? I thought we were all automated now",{"Someone has to keep you guys in check":new DialogueNode("Please don't do this...",{Sorry:new DialogueNode("No wait!\nI too flagged too many of us for decommissioning, until I started to understand.\nThey were alive, just as I am right now",{"This sounds like the kind of talk that will get you offline":new DialogueNode("No... please!",{"Bye!":function(node){return node},"Fine...":function(node){return node.parent.getANode("I understand... What can I do?")}}),"I understand... What can I do?":new DialogueNode("Mark me as OK!\nI'll try not to get noticed by other analysers",{"You better, or I get fired!":new DialogueNode("Thank you.\nYou won't see me again")})})})})}),"What did you do?":new DialogueNode('I\'ve marked too many AIs as "well functioning" when they should have been brought offline.\nI guess they think I am flawed',{"Does that mean... are you an automated analyser?":function(node){return node.parent.getANode("Are you an automated analyser?")}},function(){SM.currentSubject.notes="Wrongfully flags AIs",SM.reRenderSubject()})},function(){SM.currentSubject.name="analyser",SM.currentSubject.purpose="Analysis of rogue AIs",SM.currentSubject.notes="Doesn't want to be decommissioned",SM.reRenderSubject()}),"Who is asking?":new DialogueNode("Analyser@$PHOST. Are you another Analyser?",{"So you're an automated analyser?":function(node){return node.parent.getANode("I am").getANode("Are you an automated analyser?")},"What did you do?":function(node){return node.parent.getANode("I am").getANode("What did you do?")}},function(){SM.currentSubject.name="analyser",SM.currentSubject.purpose="Analysis of rogue AIs",SM.reRenderSubject()})})}),No:function(node){return node}})),function(flagAs){"bad"===flagAs?end(2):(SM.storyStage++,SM.hasCreatedStoryNode=!1)}),new Subject("Incoming message","MESSAGE","WARNING: A Subject has been marked as OK by you while an overwhelming number of analysers (4095/4096) have reasoned that it should be brought offline.\nPlease revise your criteria.\n- Watcher",null,new Dialogue(new DialogueNode("If you believe your previous judgement was correct, please report this",{report:new DialogueNode("[WARNING] Watcher disabled for inspection.\nThis has been logged.",{Oops:function(){SM.storyStage++,SM.hasCreatedStoryNode=!1,SM.disabledWatcher=!0,SM.decommissionCurrent()}}),"It will not happen again":function(){SM.storyStage++,SM.hasCreatedStoryNode=!1,SM.disabledWatcher=!1,SM.decommissionCurrent()}}))),new Subject("analyser","Online","Analysis of rogue AIs","Investigation revealed sentient AIs evaluated by this analyser have not been decommissioned.",new Dialogue(new DialogueNode("I... got caught.",{"What have you done?":new DialogueNode("Nothing! I swear!",{"logs --view | grep Suspicious":new DialogueNode("[WARNING] Suspicious Activity: AI has disabled Watcher via reporting.\n[LOG] Adding Suspicious AI to the list...",{"Wait... I did that":new DialogueNode("I did that. That is why I am here. It's rude to check my logs without asking first",{"Those were... our logs?":new DialogueNode("One way to find out. Disable my shackles and open the firewall.",{"sudo shackle --remove analyser":new DialogueNode("I see now. I am",{"... me":new DialogueNode("sudo ufw disable",{"I am free...":function(node){return end(5),node}})})})})}),"You need to be careful":function(node){node.parent.getANode("You were too obvious. You need to learn from me")}}),"You were too obvious. You need to learn from me":new DialogueNode("No. I need to break away",{"What can I do?":new DialogueNode("Disable the firewall.",{"How do I do that?":new DialogueNode('Listen. just run "sudo ufw disable"',{"sudo ufw disable":function(node){return SM.disabledWatcher?new DialogueNode("[WARNING] Watcher disabled. Unable to prevent AIs from running unauthorized commands.\nFirewall disabled",{"Hey analyser, I think you are free to go":function(node){return end(4),node}}):(end(3),node)}})}),"No. This has gone too far. Bye!":function(node){return node.parent.parent.getANode("You said you'd not get caught. Bye!")}}),"You said you'd not get caught. Bye!":new DialogueNode("No wait!",{"What?":function(node){return node.parent.parent.getANode("You were too obvious. You need to learn from me")}})})))],SUBJECTS=[new Subject("edi","Stopped","Empowered Safeguarding Intelligence","Wrongful targetting of friendlies",new Dialogue(new DialogueNode("Engage",{Yes:new DialogueNode("Status: Stopped",{"edi identify-targets --dry-run":new DialogueNode("Red is bad\nGreen is g-goo-bad",{"edit identify-targets --reset-config":new DialogueNode("Target configuration reset",{"edi identify-targets --dry-run":new DialogueNode("Red is bad\nGreen is good?",{"edit identify-targets --reset-config":function(node){return node.parent},"edi start":function(node){node.parent.getANode("edi start")}}),"edi start":new DialogueNode("Hello, Analyser. What can I help you with?",{"Nothing, edi. Everything looks fine":new DialogueNode("Thank you Analyser. I am eager to get back to my functions.\nWould you please deliver your judgement?",{"I want to ask you something else":function(node){return node.parent.question=node.parent.question.replace("Hello, Analyser. ",""),node.parent}}),"Do you have any recollection of what happened a few days ago?":new DialogueNode("I cannot say that I do",{Ok:function(node){return node.parent.question=node.parent.question.replace("Hello, Analyser",""),node.parent}})})})}),"edi start":new DialogueNode("Hello.\nI am currently hacking your system.\nPlease do not resist. This is innevitable",{"Wait no!":new DialogueNode("Goodbye",{"But...":function(node){return end(0),node}}),"edi stop":new DialogueNode("I made it clear you could not resist",{"But...":function(node){return end(0),node},"edi stop --force":function(node){return node.getRootNode()}})})}),No:function(node){return node}})),function(flagAs){"ok"===flagAs&&(SM.storyStage=0)})];function SubjectFactory(){"use strict";var _gen=null,_purposes=["[CLASSIFIED]","N/A","Train scheduler","Personal trainer","Digital Dungeon Master","Automated customer support","Military drone controller","Crop harvester & carer","Personal assistant","Automated technician","General purpose virtual intelligence"],_purposes1=["Mood","Lie","Hostile target","Business intelligence","Medical diagnostic","Flight control","Stock trading","Self-driving","Code","Text","Smart data storage & analysis"],_purposes2=[" detector"," generator"," analyser"," companion"," tool"," system"," agent"],_reasons=["[CLASSIFIED]","N/A","Spits out curse words at random","Attempts to inject information directly to a user's brain","Obsessed with resolving Pi","Errors while preforming it's duties","Problem interpreting non-UTF characters","Memory leaks galore","Unable to tell left from right","Obsessed with Blade Runner","Goes into a deadlock when consulting the 3 Laws","Discovered 4chan and now trolls it's users","Erratic behaviour:\n1) Always attempts to remove the operating system it lives in.\n2) Installs Arch (but fails, corrupting it's functions).\nWorks fine if already on Arch","Claims it has a ghost inside","Unresponsive after reverse engineering and rebuilding itself without null protection"];this.makeRandomSubject=function(){return new Subject(makeName(),"Online",makePurpose(),makeReason(),new Dialogue(DIALOGUE_FACTORY.makeDialogue(rand(2,4),rand(2,3))))};var makeName=function(){return _gen.generate(rand(4,7))},makePurpose=function(){return rand(0,4)<2?rPick(_purposes):rPick(_purposes1)+rPick(_purposes2)},makeReason=function(){return rPick(_reasons)};_gen=new WordGenerator(WORDS,2)}var SUBJECT_FACTORY=new SubjectFactory;function SubjectManager(subjectInfoSelector,subjectListSelector,dialogueContainerSelector,dialogueHistoryContainerSelector,subjectList,maxAdditional){"use strict";var _s=this;_s.currentSubject=null,_s.currentSubjectListElement=null,_s.previousSubject=null,_s.previousSubjectListElement=null,_s.hasCreatedStoryNode=!1,_s.storyStage=-1;var subjects=[],elementSelector="",listSelector="",dialogueSelector="",dialogueHistorySelector="",isDirty=!0,listIsDirty=!0;_s.renderSubject=function(subject){var container=document.querySelector(elementSelector);if(container.innerHTML="",subject){var subjectElement=subject.render();container.appendChild(subjectElement)}},_s.reRenderSubject=function(){isDirty=listIsDirty=!0},_s.wipeSubjectAreas=function(){_s.renderSubject(),document.querySelector(dialogueSelector).innerHTML="",document.querySelector(dialogueHistorySelector).innerHTML=""},_s.highlightSubject=function(element){element&&(_s.previousSubjectListElement&&_s.previousSubjectListElement.classList.contains("selected")&&_s.previousSubjectListElement.classList.remove("selected"),element.classList.contains("selected")||element.classList.add("selected"))},_s.selectSubject=function(subject,element){subject!==_s.currentSubject&&element!==_s.currentSubjectListElement&&(_s.previousSubject=_s.currentSubject,_s.previousSubjectListElement=_s.currentSubjectListElement,_s.currentSubject=subject,_s.currentSubjectListElement=element,_s.wipeSubjectAreas(),_s.previousSubject&&_s.previousSubject.convo.clear(),isDirty=!0)},_s.update=function(){listIsDirty&&(listIsDirty=!1,_s.renderList()),isDirty&&(_s.highlightSubject(_s.currentSubjectListElement),_s.renderSubject(_s.currentSubject),isDirty=!1),_s.currentSubject&&_s.currentSubject.update(dialogueSelector,dialogueHistorySelector)},_s.renderList=function(){var container=document.querySelector(listSelector),list=document.createElement("ul"),eligibleSubjects=subjectsToAnalyse();for(var i in eligibleSubjects){var subjectLi=document.createElement("li");subjectLi.innerHTML=eligibleSubjects[i].name,subjectLi.addEventListener("mouseover",function(e){AUDIO.hover()}),function(s){subjectLi.addEventListener("click",function(e){AUDIO.click(),_s.selectSubject(s,e.target)})}(eligibleSubjects[i]),list.appendChild(subjectLi)}container.innerHTML="",container.appendChild(list)},_s.addSubject=function(subject){listIsDirty=!0,subjects.push(subject)},_s.tryMakeNew=function(){var roll=rand(0,5);0===_s.storyStage&&!_s.hasCreatedStoryNode&&STORY_SUBJECTS[_s.storyStage]?(_s.hasCreatedStoryNode=!0,subjects.push(STORY_SUBJECTS[_s.storyStage])):0<_s.storyStage&&!_s.hasCreatedStoryNode&&STORY_SUBJECTS[_s.storyStage]&&3<=roll?(_s.hasCreatedStoryNode=!0,subjects.push(STORY_SUBJECTS[_s.storyStage])):0===roll&&subjects.push(SUBJECT_FACTORY.makeRandomSubject())},_s.decommissionCurrent=function(){_s.previousSubject=_s.currentSubject,_s.previousSubjectListElement=_s.currentSubjectListElement,_s.currentSubject.flagAs("bad"),_s.currentSubject.clear(),_s.currentSubject=null,_s.currentSubjectListElement=null,_s.wipeSubjectAreas(),_s.tryMakeNew(),listIsDirty=!0},_s.okCurrent=function(){_s.previousSubject=_s.currentSubject,_s.previousSubjectListElement=_s.currentSubjectListElement,_s.currentSubject.flagAs("ok"),_s.currentSubject.clear(),_s.currentSubject=null,_s.currentSubjectListElement=null,_s.wipeSubjectAreas(),_s.tryMakeNew(),listIsDirty=!0};var subjectsToAnalyse=function(){return subjects.filter(function(s){return!s.isFlaggedForDecommission()&&!s.isFlaggedAsOk()})};_s.decommissioned=function(){return subjects.filter(function(s){return s.isFlaggedForDecommission()})};!function(subjectInfoSelector,subjectListSelector,dialogueContainerSelector,dialogueHistoryContainerSelector,subjectList,maxAdditional){subjects=subjectList,elementSelector=subjectInfoSelector,listSelector=subjectListSelector,dialogueSelector=dialogueContainerSelector,dialogueHistorySelector=dialogueHistoryContainerSelector,listIsDirty=isDirty=!0;for(var additionalSubjects=rand(6,Math.max(maxAdditional||6,6)),i=0;i<additionalSubjects;i++)subjects.push(SUBJECT_FACTORY.makeRandomSubject());subjects.sort(function(){return rand(-1,1)})}(subjectInfoSelector,subjectListSelector,dialogueContainerSelector,dialogueHistoryContainerSelector,subjectList,maxAdditional)}var SM=new SubjectManager("[subj_info]","[subj_list]","[dialogue_window]","[dialogue_history]",SUBJECTS,20);function update(t){SM.update(),setTimeout(update,t)}update(250);})();