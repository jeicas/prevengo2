<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Alcance_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarAlcance() {

        $query = $this->db->query("SELECT * 
                                 FROM alcance where estatus=1");
        $resultado = array();
        $resultdb = array();
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row) {
                $resultado[] = $row;
            }
            return $resultado;
            $query->free - result();
        }
    }
     public function guardarAlcance($data){
        return $this->db->insert('alcance',$data);
      }
      
      
        public function  actualizarAgente($data){         
         $this->db->set($data);
         $this->db->where('id',$data['id']);
         return  $this->db->update('alcance');
    }  
}// fin de la clase

