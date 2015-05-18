<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sector_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarSector() {

        $query = $this->db->query("SELECT * 
                                 FROM sector where estatus=1");
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
         public function guardarSector($data){
        return $this->db->insert('sector',$data);
      }
      
      
        public function  actualizarSector($data){         
         $this->db->set($data);
         $this->db->where('id',$data['id']);
         return  $this->db->update('sector');
    }  

}// fin de la clase