<?php
/**
 * @author Svirsky Evgeny
 * @date 14.04.2013
 *
 */
class Mysql_layer {

    function __constructor($db_host, $db_user, $db_password, $db_name) {

        $this->dbh = @mysql_connect($db_host, $db_user, $db_password);
        if (mysq_error()) {
            echo mysql_error($this->dbh);
            die();
        }

        $this->select($db_name);
        mysql_select_db($db_name, $this->dbh);
        if (mysq_error()) {
            echo mysql_error($this->dbh);
            die();
        }
    }

    function query($query) {
        $query = trim($query);
        $this->result = @mysql_query($query,$this->dbh);
        if (mysq_error()) {
            echo mysql_error($this->dbh);
            die();
        }
    }
}
