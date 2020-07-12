<?php
include '../../../include/cp_header.php';

$message_id = intval($_POST['id']);

//check if the id is valid, and if still logged on
if($message_id > 0 ) {

	//DELETE row from database

	$query = "DELETE FROM ".$xoopsDB->prefix('guestmap2')." WHERE id=".intval($_POST['id'])."";
	$xoopsDB->query($query);
}
//return to the refering page
redirect_header('index.php', 2, _AM_GM_DELETESUCCESS);
?>