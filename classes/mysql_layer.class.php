<?php
/**
 * @author Svirsky Evgeny
 * @date 14.04.2013
 *
 */
class Mysql_layer {

    function __construct($db_host, $db_user, $db_password, $db_name) {

        $this->dbh = @mysql_connect($db_host, $db_user, $db_password);
        if (!$this->dbh) {
            echo 'Some problem with connection to database. Please check your database configuration.';
            die();
        }

        if (!@mysql_select_db($db_name, $this->dbh)) {
            echo 'Some problem with selecting database. Please check your database configuration.';
            die();
        }
    }

    function query($query) {
        $query = trim($query);
        $result = @mysql_query($query, $this->dbh);
        if (mysql_error()) {
            echo mysql_error($this->dbh);
            die();
        }
        if ( preg_match("/^(insert|delete|update|replace)\s+/i",$query) )
        {
            $rows_affected = mysql_affected_rows();

            if ( preg_match("/^(insert|replace)\s+/i",$query) )
            {
                $insert_id = mysql_insert_id($this->dbh);
            }
            if ($rows_affected) {
                $output = $rows_affected;
            } else {
                $output = $insert_id;
            }
        } else {
            while ( $row = @mysql_fetch_object($result) )
            {
                $output[] = (array)$row;
            }
        }
        @mysql_free_result($result);
        return $output;
    }
}
