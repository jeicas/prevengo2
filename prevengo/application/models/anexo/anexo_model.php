

<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Anexo_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function guardarAnexo($data) {

        return $this->db->insert('anexo', $data);
    }
   

}//fin de la clase


