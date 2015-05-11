<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reincidencia_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarListaReincidencia($id) {

        $query = $this->db->query("SELECT reincidencia.id AS idRein,
                                          reincidencia.evento AS idEv,
                                       
                                        reincidencia.descripcion AS descripcion, 
                                        reincidencia.fecha AS fecha
                                  FROM reincidencia 
                                 
                                 WHERE reincidencia.evento=$id and estatus=1
                                 ");
       
            return $query;
            
       }

 
      public function  guardarReincidencia($data){         
         
         return  $this->db->insert('reincidencia',$data);
    }
           
    public function  actualizarReincidencia($data){         
         $this->db->set($data);
         $this->db->where('id',$data['id']);
         return  $this->db->update('reincidencia');
    }
    
     public function  eliminarReincidencia($data){         
         $this->db->set('estatus',$data['estatus']);
         $this->db->where('id',$data['id']);
         return  $this->db->update('reincidencia');
    }

}// fin de la clase
