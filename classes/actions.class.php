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
        global $DB;
        $data = Common::clean($data);
        if ($data) {
            $query = "UPDATE `employers` SET first_name={$data['first_name']}, surname={$data['surname']}, date_of_birth={$data['date_of_birth']}, salary={$data['salary']} WHERE id={$data['id']}";
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
        } else {return false;}
    }


}