<?php

class Actions {
    public function index($data = array('field' => '', 'type' => 'ASC')) {
        global $DB;
        if (!$_SESSION['sort_field']) {
            $_SESSION['sort_field'] = 'first_name';
            $data['type'] = $_SESSION['sort_type'] = 'ASC';
        }
        $data['field'] = $_SESSION['sort_field'];
        $data['type'] = $_SESSION['sort_type'];
        $query = "SELECT id, first_name, surname, DATE_FORMAT(date_of_birth, '%d %b %Y') as date_of_birth, salary FROM `employers` ORDER BY `employers`.{$data['field']} {$data['type']}";
        $result = $DB->query($query);
        return $result;
    }
    public function sort($data) {
        $field = $data['field'];
        $current_field = $_SESSION['sort_field'];
        $current_type = $_SESSION['sort_type'];
        if ($field) {
            if ($field == $current_field) {
                $_SESSION['sort_type'] = $current_type == "ASC" ? "DESC" : "ASC";
                return $this->index(array('field' => $current_field, 'type' => $current_type == "ASC" ? "DESC" : "ASC"));
            } else {
                $_SESSION['sort_type'] = "ASC";
                $_SESSION['sort_field'] = $field;
                return $this->index(array('field' => $current_field, 'type' => "ASC"));
            }
        } else {
            return false;
        }
    }

    public function add($data = array()) {
        global $DB;
        $data = Common::clean($data);
        if ($data) {
            $query = "INSERT INTO `employers` VALUES(NULL, '{$data['first_name']}', '{$data['surname']}', STR_TO_DATE('{$data['date_of_birth']}', '%d.%m.%Y'),'{$data['salary']}')";
            $result = $DB->query($query);
            if ($result) {
                $data['result'] = true;
                return $data;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function edit($data = array()) {
        global $DB;
        $data = Common::clean($data);
        if ($data) {
            $query = "UPDATE `employers` SET first_name='{$data['first_name']}', surname='{$data['surname']}', date_of_birth=STR_TO_DATE('{$data['date_of_birth']}', '%d.%m.%Y'), salary={$data['salary']} WHERE id={$data['id']}";
            $result = $DB->query($query);
            if ($result) {
                $data['result'] = true;
                return $data;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function remove($id) {
        global $DB;
        if ($id) {
            $query = "DELETE FROM `employers` WHERE id=$id";
            $result = $DB->query($query);
            return $result;
        } else {
            return false;
        }
    }


}