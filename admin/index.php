<?php
//include '../../../mainfile.php';
include '../../../include/cp_header.php';
xoops_cp_header();
echo "<h2>"._AM_GM_EDITMESSAGE."</h2>";

define('DATE_FORMAT', 'F j, Y, g:i a');



	$query = "SELECT id, guestmap_id, top_px, left_px, date, icon, name, message, ip FROM ".$xoopsDB->prefix('guestmap2')." ";
	$result = $xoopsDB->query($query);
	while(list($id, $guestmap_id, $top_px, $left_px, $date, $icon, $name, $message, $ip) = $xoopsDB->fetchRow($result)) {

echo "<form method=\"post\" action=\"edit_save.php\">

	<input type=\"hidden\" name=\"id\" value=\"".$id."\" />

	<fieldset>
		<legend>Info</legend>

		<p>"._AM_GM_GUESTMAPID."<strong>".$id."</strong></p>
		<p>"._AM_GM_DATE."<strong>".date(DATE_FORMAT, $date)."</strong></p>
		<p>"._AM_GM_IP."<strong>".$ip."</strong></p>
		<p>"._AM_GM_ICON."<strong><img src='".XOOPS_URL."/modules/guestmap/icons/".$icon.".gif' /></strong></p>
		<p>"._AM_GM_POSITION."<strong>".$left_px."</strong>, <strong>".$top_px."</strong> <small>"._AM_GM_OFFSET."</small></p>

	</fieldset>

	<fieldset>

		<legend>"._AM_GM_MESSAGE."</legend>

		<p><label for=\"nameValue\">"._AM_GM_NAME."</label> <input type=\"text\" name=\"name\" id=\"nameValue\" maxlength=\"25\" value=\"".$name."\" /></p>

		<p><label for=\"messageValue\">"._AM_GM_CONTENT."</label> <input type=\"text\" name=\"message\" id=\"messageValue\" maxlength=\"255\" value=\"".$message."\" /></p>
		
		<p><input type=\"submit\" value=\""._SUBMIT."\" class=\"button\" /></p>
	
	</fieldset>

</form>

<form method=\"post\" action=\"delete.php\" onsubmit=\"return confirm('"._AM_GM_DELETETHIS."')\">

	<fieldset>
		<legend>"._AM_GM_DELMESSAGE."</legend>
		<input type=\"hidden\" name=\"id\" value=\"".$id."\" />
		<input type=\"submit\" value=\""._AM_GM_DELETE."\" class=\"button\" />
	</fieldset>
</form>";

}
xoops_cp_footer();
?>