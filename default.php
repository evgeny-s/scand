<?php
include('/others/config.php');
require_once('/classes/mysql_layer.class.php');
require_once('/classes/actions.class.php');

$ajax = (array)json_decode(file_get_contents("php://input"));
if ((is_array($ajax) && $ajax) || (is_array($_POST) && $_POST)) {
    if ((is_array($ajax) && $ajax)) {
        $ajax_request = true;
    }
    $DB = new Mysql_layer(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $action = new Actions();
    $input['action'] = isset($ajax['action']) && $ajax['action'] ? $ajax['action'] : $_POST['action'];
    $input['id'] = isset($ajax['id']) && $ajax['id'] ? $ajax['id'] : (isset($_POST['id']) && $_POST['id'] ? $_POST['id'] : '');

    switch ($input['action']) {
        case 'index':
            $result = $action->index();
            break;
        case 'remove':
            $result = $action->remove($input['id']);
            break;
        case 'add':
            break;
        case 'edit':
            break;
    }
    if ($ajax_request) {
        echo json_encode($result);
    } else {
        header("Location: default.php");
    }
} else {
    include('/templates/main.html');
}