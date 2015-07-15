

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
   
    
       public function  eliminarAnexo($data){         
         $this->db->set('estatus',$data['estatus']);
         $this->db->where('reincidencia',$data['reincidencia']);
         return  $this->db->update('anexo');
    }

}//fin de la clase


