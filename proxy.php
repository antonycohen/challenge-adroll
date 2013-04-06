<?php
$uri = $_SERVER['REQUEST_URI'];
$uri = str_replace('/api','http://api.dribbble.com',$uri);
echo file_get_contents(urldecode($uri));
?>
