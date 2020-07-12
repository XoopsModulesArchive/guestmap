/* C00L GuestMap 2.0 
JavaScript configuration file
*/
var gmId= 4;	//guestmap's ID must be unique, for using multiple guestmaps on the same website/database
/* everything below can be changed */
var gmTitle= 'C00L GuestMap 2';	//title of the guestmap
var gmImage= 'back.png';	//location of background image
var minMagnification= 100; //minimum zoom size (percentage)
var maxMagnification= 200; //maximum zoom size (percentage)
var magnification= 100;	//standard zoom size (perpcentage)
//var msgPath= '..';	//path to messages (icons.php)
var iconPath= 'icons';	//path to the icon directory
var iconCount= 24;			//number of different icons in directory
var iconType= "gif";		//icon file type
var dxFilter= false; // use for 32 bit PNG's with alpha transparancy in MSIE
var useTransparency= true; //fade out older icons, does not work in MSIE with 32 bit PNG's, never works in Opera and when the icon's are moving Mozilla can cause the computer to slow down!
//It works fine in Mozilla and MSIE when using static images that don't have alpha transparancy.
