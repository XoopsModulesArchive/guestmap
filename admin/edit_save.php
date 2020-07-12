<?php
include '../../../include/cp_header.php';
$message_id = intval($_POST['id']);

//check if the id is valid, and if still logged on
if($message_id > 0) {

	$name = $_POST['name'];
	$message = $_POST['message'];
	
	//UPDATE database
	$query = "UPDATE ".$xoopsDB->prefix('guestmap2')." SET name='".$name."', message='".$message."' WHERE id=".$message_id;
	$xoopsDB->query($query);
	
} 

redirect_header('index.php', 2, _AM_GM_UPDATESUCCESS);

?>