

<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Anexo_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function guardarAnexo($dataAvance) {
           
        
        
        
        
        return $this->db->insert('avance', $dataAvance);
    }
   

}//fin de la clase


