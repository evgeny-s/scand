<?php
include('/others/config.php');
require_once('/classes/mysql_layer.class.php');


if ($_POST) {
    print_r($_POST);die();
}
if (isset($_POST['ajax']) && $_POST['ajax']) {

    $DB = new Mysql_layer(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
} else {
    include('/templates/main.html');
}