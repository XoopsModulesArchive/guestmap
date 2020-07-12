// C00L GuestMap 2.0 - JavaScript main file

//load placed messages
document.write('<script type="text/javascript" src="icons.php?id='+gmId+'&amp;rand='+Math.round(Math.random() * 1000)+'"></script>');

// global variables
var viewMessages=false;
var messagesMade=false;
var posY; 
var posX; 
var formWidth;
var formHeight;
var map;
var mapBox;
var mapForm;
var mapPointer;
var guestmap;
var msie=false;
var iconValue;
var iconPreview;

function init(){

	//check if the browser is MSIE
	if(navigator.userAgent.toLowerCase().indexOf('msie') > -1){
		msie=true;
	}
	
	//fill all the needed variables
	map=document.getElementById('mapImage');
	map.src=gmImage;
	mapForm=document.getElementById('mapForm');
	mapBox=document.getElementById('mapBox');
	mapPointer=document.getElementById('mapPointer');
	guestmap=document.getElementById('guestmap');
	iconPreview=document.getElementById('iconPreview');
	iconValue=document.getElementById('iconValue').value;
	mapBox.style.height=(guestmap.offsetHeight-mapBox.offsetTop-2)+'px';
	
	document.getElementById('messages').style.height=(guestmap.offsetHeight-mapBox.offsetTop-2)+'px';
	document.getElementById('gmId').value=gmId;
	document.getElementById('gmTitle').innerHTML=gmTitle;

	placeIcons(1);
	addFormIcons();
	//width/height of the form is not allowed to change!
	formWidth=mapForm.offsetWidth;
	formHeight=mapForm.offsetHeight;
	hide('mapForm');
	hide('messages');
	getError();
}

//retrieve the number of pixels from a CSS value; "343px" will return "343"
function getPixels(id){
	pixels=id.split("p");
	return parseInt(pixels[0]);
}

//change the opacity of an element for different browsers
function setOpacity(opacity, id){
	var object=document.getElementById(id).style; 
	object.opacity=(opacity / 100);
	object.MozOpacity=(opacity / 100);
	object.KhtmlOpacity=(opacity / 100);
	object.filter="alpha(opacity="+opacity+")";
}

function zoom(factor){

	if((magnification < maxMagnification && factor > 1) || (magnification > minMagnification && factor < 1)){
		map.width=map.width * factor;
		magnification=magnification * factor;
		placeIcons(magnification / 100);
		
		if(mapForm.style.display=="block"){

			placeForm(factor);
		}
	}
}
//multiplies a coordinate with the current magnification
function applyZoom(number){

	return Math.round((number / 100) * magnification);
}

//hides any element depending on the id argument
function hide(id){
	document.getElementById(id).style.display="none";
}

//shows any element
function show(id){
	document.getElementById(id).style.display="block";
}

//displays the tooltip with message once the mouse ipointer is on an icon
function showTip(id){
	var tip=document.getElementById('tip');
	
	tip.innerHTML='<strong>'+icon[id][4]+':</strong> '+icon[id][5];
	show('tip');

	var emoTop=getPixels(document.getElementById('emo'+id).style.top);
	var emoLeft=getPixels(document.getElementById('emo'+id).style.left);
	
	if((emoTop+tip.offsetHeight) > map.height){
		tip.style.top=(map.height-tip.offsetHeight)+'px';
	}else{
		tip.style.top=emoTop+'px';
	}

	if((emoLeft+tip.offsetWidth) > map.width){
		tip.style.left=(map.width-tip.offsetWidth-12)+'px';	
	}else{
		tip.style.left=emoLeft+'px';
	}
}

//get the cursor location
function cursorLocation(){
	//needed for other browsers then MSIE
	if(!document.all){
		document.captureEvents(Event.MOUSEMOVE);
	}
		
	map.onmousemove=showMousePosition;
}

//getting the cursor location works different in MSIE and Gecko (Mozilla/Netscape) browsers
function showMousePosition(e){

	if(!document.all){
		posY=e.pageY-guestmap.offsetTop;
		posX=e.pageX-guestmap.offsetLeft;
	}else{
		//documentElement only works in STRICT mode in MSIE 6 (see DTD!), if else use body instead!
		posX=window.event.x+document.documentElement.scrollLeft;
        posY=window.event.y+document.documentElement.scrollTop;
	}

	posX=posX-mapBox.offsetLeft+mapBox.scrollLeft;
	posY=posY-mapBox.offsetTop+mapBox.scrollTop;
}

function placeIcons(factor){

	var icons=document.getElementById('mapIcons');
	icons.innerHTML="";

	for(var i=0; i < icon.length; i++){
		
		//check for MSIE
		if(msie && dxFilter){
			icons.innerHTML += '<div id="emo'+i+'" style="top: '+Math.round(icon[i][1] * factor)+'px; left: '+Math.round(icon[i][2] * factor)+'px;" onmouseover="showTip('+i+')" onmouseout="hide(\'tip\')" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+iconPath+'/'+icon[i][3]+'.'+iconType+'\')"></div>';
		
		} else {
			icons.innerHTML += '<img src="'+iconPath+'/'+icon[i][3]+'.'+iconType+'" id="emo'+i +'" style="top: '+Math.round(icon[i][1] * factor)+'px; left: '+Math.round(icon[i][2] * factor)+'px;" onmouseover="showTip('+i+')" onmouseout="hide(\'tip\')" alt="" />';

			if(useTransparency){
				setOpacity(icon[i][0], 'emo'+i);
			}
		} 
	}
}

function addFormIcons(){

	var formIcons=document.getElementById('formIcons');
	for(var i=1; i <= iconCount; i++){

		if(msie && dxFilter){
			formIcons.innerHTML +='<div id="formIcon'+i+'" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+iconPath+'/'+i+'.'+iconType+'\', sizingMethod=\'scale\')" onclick="selectFormIcon('+i+')"></div>';
		} else {
			formIcons.innerHTML +='<img src="'+iconPath+'/'+i+'.'+iconType+'" id="formIcon'+i+'" onclick="selectFormIcon('+i+')" />';
		}
	}
}

//make the form visible and store the current cursor position in hidden fields
function showForm(){

	mapPointer.style.left=posX+'px';
	mapPointer.style.top=posY+'px';

	show('mapPointer');
	
	// set click position
	document.getElementById('cursorX').value=Math.round((posX * 100) / magnification);
	document.getElementById('cursorY').value=Math.round((posY * 100) / magnification);
	
	var overflowX=posX+formWidth-map.width;
	var overflowY=applyZoom((posY * 100 / magnification))+formHeight-map.height;

	if(overflowY > 0){
		posY=map.height-formHeight-20;
	}

	if(overflowX > 0){
		posX=posX-formWidth-20;
	}

	mapForm.style.top=posY+'px';
	mapForm.style.left=posX+'px';

	show('mapForm');

	placePreview();
	
	//if no icon has been selected before, start the blinking
	//needs to be HERE, for when the view changes (when zooming) and an icon as been selected, else it won't appear until something else is selected.
	
	if(!iconValue > 0){
		showPreview();
		blinkPreview(false);
	} else {
		show('iconPreview');
	}
}

function hideForm(){
	hide('mapForm');
	hide('mapPointer');
	hide('iconPreview');
}

function placeForm(factor){

	mapPointer.style.left=Math.round(getPixels(mapPointer.style.left) * factor)+'px';
	mapPointer.style.top=Math.round(getPixels(mapPointer.style.top) * factor)+'px';

	mapForm.style.left=Math.round(getPixels(mapForm.style.left) * factor)+'px';
	mapForm.style.top=Math.round(getPixels(mapForm.style.top) * factor)+'px';

	placePreview();
}

function placePreview(){

	iconPreview.style.left=mapPointer.style.left;
	iconPreview.style.top=mapPointer.style.top;
}

function changeView(){

	if(viewMessages){
		hide('messages');
		show('mapBox');

		viewMessages=false;
	} else {
		hide('mapBox');
		show('messages');

		viewMessages=true;
		
		if(!messagesMade){
			makeMessages();
		}
	}
}

function makeMessages(){

	var list=document.getElementById('messageList');

	for(var i=icon.length-1; i >= 0; i--){

		if(msie && dxFilter){
			list.innerHTML +='<li><div id="msgIcon'+i+'" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+iconPath+'/'+icon[i][3]+'.'+iconType+'\')"></div> <strong>'+icon[i][4]+':</strong> '+icon[i][5]+'</li>';
		} else {
			list.innerHTML +='<li><img src="'+iconPath+'/'+icon[i][3]+'.'+iconType+'" alt="" id="msgIcon'+i+'" /> <strong>'+icon[i][4]+':</strong> '+icon[i][5]+'</li>';
			if(useTransparency){
				setOpacity(icon[i][0],'msgIcon'+i);
			}
		}
	}
	messagesMade=true;
}

//apply "selected" CSS class to the selected icon
function selectFormIcon(id){

	for(var i=1; i <= iconCount; i++){
		if(id != i){
			document.getElementById('formIcon'+i).className='';
		} else {
			document.getElementById('formIcon'+i).className='selected';
			iconValue= i;
		}
	}
	showPreview();
}

//set icon preview
function showPreview(){
	
	if(msie && dxFilter){
		iconPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+iconPath+"/"+iconValue+"."+iconType+"')"
	} else {
		iconPreview.style.backgroundImage="url('"+iconPath+"/"+iconValue+"."+iconType+"')";
		setOpacity(70,'iconPreview');
		
	}
	
	show('iconPreview');
}

//make icon preview blink
function blinkPreview(display){

	setTimeout('togglePreview('+display+')', 500);
}

function togglePreview(display){
	
	if(display){
		iconPreview.style.visibility='visible';
		display=false;
	} else {
		iconPreview.style.visibility='hidden';
		display=true;
	}

	blinkPreview(display);
}

//read error messages from cookie
function getError(){

	var search='GM2error=';
	var errorMsg=document.cookie;
	var start = -1;
	var end;

	if(errorMsg.length > 0){
		start=errorMsg.indexOf(search); 
		if(start != -1){
			start += search.length;
			end=errorMsg.indexOf(';',start);
		}
		
		if(end==-1){
			end=errorMsg.length;
		}
		if(end > start){

			errorMsg=errorMsg.substring(start,end);

			//replace all plus characters with spaces
			var i=errorMsg.indexOf('+');
			while(i > -1){

				errorMsg=errorMsg.replace('+',' ');
				i=errorMsg.indexOf('+',i+2);
			}
			alert(errorMsg);
		}

		//reset cookie
		var expDate=new Date();
		expDate.setTime(expDate.getTime()-1);
		document.cookie=search+'0;expires='+expDate.toGMTString();
	} 
}

//this function is called once the form is submitted, it checks all the fields displays errors
function validate(){
	var errorMessage='';

	document.getElementById('iconValue').value=iconValue;

	if(iconValue==''){
		errorMessage="- No icon selected.\n";
	}
	
	if(document.getElementById('nameValue').value.length < 3){
		errorMessage += "- Your name is too short.\n";
	}

	if(document.getElementById('messageValue').value.length < 3){
		errorMessage += "- Your message is too short.";
	}
	
	//if an error is set, display an alert and return false to prevent the form from being submitted
	if(errorMessage != ''){
		alert("Before continuing, check the following:\n"+errorMessage); 
		return false;
	} else {
		return true;
	}
}