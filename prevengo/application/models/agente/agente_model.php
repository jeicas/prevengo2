<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Agente_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarAgente() {

        $query = $this->db->query("SELECT * 
                                 FROM agente where estatus=1");
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

    
    
       public function guardarAgente($data){
        return $this->db->insert('agente',$data);
      }
      
      
        public function  actualizarAgente($data){         
         $this->db->set($data);
         $this->db->where('id',$data['id']);
         return  $this->db->update('agente');
    }  
        
}// fin de la clase

