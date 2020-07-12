<?php
include '../../mainfile.php';

define('OWNER_EMAIL', ''); //fill in e-mail to send message for each icon placed

//receive position from $_POST[]
$posX = intval($_POST['pos_x']);
$posY = intval($_POST['pos_y']);
$icon = intval($_POST['icon']);
$guestmap_id = intval($_POST['guestmap_id']);

//remove "dangerous" characters
$name = htmlspecialchars($_POST['name']);
$message = htmlspecialchars($_POST['message']);

//set an error when the name or message is shorter then 3 charcters.
if(strlen($name) < 3 || strlen($message) < 3) {
	$error = _MD_GM_TOOSHORT;
}

//check if an emticon has been selected
if(!$icon > 0) {
	$error = _MD_GM_NOSMILESELECTED;
}

//if no errors are found, check if a message has been posted from this IP within the last 3600 seconds (1 hour)
if(empty($error)) {
	$date = time();
	$query = "SELECT id FROM ".$xoopsDB->prefix('guestmap2')." WHERE date > ($date - ".$xoopsModuleConfig['waittime'].") AND ip='".addSlashes($_SERVER['REMOTE_ADDR'])."' AND guestmap_id=".intval($guestmap_id)."";
	$result = $xoopsDB->query($query);

	if($xoopsDB->getRowsNum($result) > 0) {
		$error = _MD_GM_ONEICONPERHOUR;
	}
}

//no errors? store all data
if(empty($error)) {
	$date = time();
	$query = "INSERT INTO ".$xoopsDB->prefix('guestmap2')." (guestmap_id, top_px, left_px, date, icon, name, message, ip) VALUES (".intval($guestmap_id).", ".intval($posY).", ".intval($posX).", ".intval($date).", ".intval($icon).", '".addSlashes($name)."', '".addSlashes($message)."', '".addSlashes($_SERVER['REMOTE_ADDR'])."')";

	$result = $xoopsDB->query($query);
	
	//send e-mail if configured so
	if(strlen(OWNER_EMAIL) > 0) {
		mail(OWNER_EMAIL, 'New GuestMap entry', "Date: ".date("d-m-Y H:i")."\nName: ".$name."\nMessage: ".$message."\nIP: ".$_SERVER['REMOTE_ADDR']."From: ".$name);
	}

} else {
	//store error message in a cookie
	setcookie('GM2error', $error, (time() + round($xoopsModuleConfig['waittime'] / 60)), '', '', 0);
}

//go back to the map
redirect_header('index.php', 2, _MD_GM_DBUPDATED);

?>