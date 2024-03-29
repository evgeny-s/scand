<?php
session_start();
include('/others/config.php');
require_once('/classes/mysql_layer.class.php');
require_once('/classes/actions.class.php');
require_once('/classes/common.class.php');
$ajax = (array)json_decode(file_get_contents("php://input"));
if ((is_array($ajax) && $ajax) || (is_array($_POST) && $_POST)) {
    if ((is_array($ajax) && $ajax)) {
        $ajax_request = true;
    }
    $DB = new Mysql_layer(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $action = new Actions();
    $input['action'] = isset($ajax['action']) && $ajax['action'] ? $ajax['action'] : $_POST['action'];
    $input['id'] = isset($ajax['id']) && $ajax['id'] ? $ajax['id'] : (isset($_POST['id']) && $_POST['id'] ? $_POST['id'] : '');
    $input['first_name'] = isset($ajax['first_name']) && $ajax['first_name'] ? $ajax['first_name'] : (isset($_POST['first_name']) && $_POST['first_name'] ? $_POST['first_name'] : '');
    $input['surname'] = isset($ajax['surname']) && $ajax['surname'] ? $ajax['surname'] : (isset($_POST['surname']) && $_POST['surname'] ? $_POST['surname'] : '');
    $input['date_of_birth'] = isset($ajax['date_of_birth']) && $ajax['date_of_birth'] ? $ajax['date_of_birth'] : (isset($_POST['date_of_birth']) && $_POST['date_of_birth'] ? $_POST['date_of_birth'] : '');
    $input['salary'] = isset($ajax['salary']) && $ajax['salary'] ? $ajax['salary'] : (isset($_POST['salary']) && $_POST['salary'] ? $_POST['salary'] : '');
    $input['field'] = isset($ajax['field']) && $ajax['field'] ? $ajax['field'] : (isset($_POST['field']) && $_POST['field'] ? $_POST['field'] : '');
    /*routing begin*/
    switch ($input['action']) {
        case 'index':
            $result = $action->index();
            break;
        case 'remove':
            $result = $action->remove($input['id']);
            break;
        case 'submit':
            if ($input['id']) {
                $result = $action->edit($input);
            } else {
                $result = $action->add($input);
            }
            break;
        case 'sort':
            $result = $action->sort($input);
            break;
        case 'show_sort_info':
            $result = array('field' => $_SESSION['sort_field'],'type' => $_SESSION['sort_type']);
            break;
    }
    /*routing end*/
    if ($ajax_request) {
        echo json_encode($result);
    } else {
        header("Location: default.php");
    }
} else {
    include('/templates/main.html');
}