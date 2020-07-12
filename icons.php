<?php
include '../../mainfile.php';
define('SHOW_DAYS', 200);
define('MIN_OPACITY', 25);
define('MAX_ICONS', 0);

header("Content-Type: text/javascript");

//this function replaces certain dangerous characters for JavaScript variables
function replaceJSchars($string) {
	return str_replace(array("\\", "'"), array("\\\\", "\'"), $string);
}

$guestmap_id = intval($_GET['id']);

//initialize the JavaScript array;
echo("var icon=[];\n");

if($guestmap_id > 0) {
	
	$day_opacity = (100 - MIN_OPACITY) / SHOW_DAYS;

	//if a limit has been defined, extend the query
	if(MAX_ICONS > 0) {
		$extra = " ORDER BY date DESC LIMIT 0,".MAX_ICONS;
	} else {
	$extra = '';
	}
	$date = time();
	$result = $xoopsDB->query("SELECT top_px, left_px, date, icon, name, message FROM ".$xoopsDB->prefix('guestmap2')." WHERE date > (".intval($date)." - (86400 * ".SHOW_DAYS.")) AND guestmap_id=".intval($guestmap_id.$extra)."");
	
	$i = 0;

	while($gm = mysql_fetch_object($result)) {

		//set the opacity relative to the "age" of the icon
		$opacity = 100 - round($day_opacity * ((time() - $gm->date) / 86400));
		
		//opacity, top_px, left_px, icon, name, message
		echo("icon[".$i."] = [".$opacity.", ".$gm->top_px.", ".$gm->left_px.", ".$gm->icon.", '".replaceJSchars($gm->name)."', '".replaceJSchars($gm->message)."'];\n");

		$i++;
	}
}

?>