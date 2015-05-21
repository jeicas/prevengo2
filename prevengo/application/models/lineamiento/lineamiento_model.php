<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Lineamiento_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarListaLineamiento($id) {

        $query = $this->db->query("SELECT lineamiento.evento AS idEv,
                                        lineamiento.id AS idLin,
                                        lineamiento.descripcion AS descripcion,
                                        lineamiento.fecha AS fecha, 
                                        lineamiento.estatus AS estatus
                                 FROM lineamiento 
                                 
                                 WHERE lineamiento.evento=$id and estatus=1
                                 ");
       
            return $query;
            
       }

 
      public function  guardarLineamiento($data){         
         
         return  $this->db->insert('lineamiento',$data);
    }
           
    public function  actualizarLineamiento($data){         
         $this->db->set($data);
         $this->db->where('id',$data['id']);
         return  $this->db->update('lineamiento');
    }
    
     public function  eliminarLineamiento($data){         
         $this->db->set('estatus',$data['estatus']);
         $this->db->where('id',$data['id']);
         return  $this->db->update('lineamiento');
    }

       public function  buscarLineamiento($id){         
            $query = $this->db->query("select count(*) as cuantos

                                    from prevengo.lineamiento
                                    
                                    where  prevengo.lineamiento.evento=$id and 					 												   
                                           prevengo.lineamiento.estatus=1
                                 ");
       
            return $query; 
    }

}// fin de la clase
