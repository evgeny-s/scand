<?php

class Actions {
    public function index($data = array()) {
        global $DB;
        $query = "SELECT id, first_name, surname, date_of_birth, salary FROM `employers` LIMIT 30";
        $result = $DB->query($query);
        return $result;
    }
    public function sort($field, $sort_direction = 'ASC') {

    }

    public function add($data = array()) {

    }

    public function edit($data = array()) {

    }

    public function remove($id) {
        global $DB;
        if ($id) {
            $query = "DELETE FROM `employers` WHERE id=$id";
            $result = $DB->query($query);
            return $result;
        } else {return false;}
    }


}