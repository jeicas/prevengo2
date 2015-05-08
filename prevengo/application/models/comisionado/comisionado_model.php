<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Comisionado_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarListaComisionado($id) {

        $query = $this->db->query("select prevengo.comisionado.id as idCom,
                                   prevengo.comisionado.empleado as idEmpl,
                                    prevengo.comisionado.evento AS idEv,
                                    bdgenerica.persona.nombre as nombre,
                                    bdgenerica.persona.apellido as apellido,
                                    bdgenerica.persona.foto as foto,
                                    prevengo.comisionado.estatus as estatus

                                    from prevengo.comisionado 
                                    inner join bdgenerica.empleado
                                      on prevengo.comisionado.empleado= bdgenerica.empleado.id
                                    inner join bdgenerica.persona
                                        on bdgenerica.persona.cedula= bdgenerica.empleado.cedula
                                    where  prevengo.comisionado.evento=$id
                                 ");
       
            return $query;
            
       }
       
        

 
      public function  guardarComisionado($data){         
         
         return  $this->db->insert('comisionado',$data);
    }
           
    public function  actualizarComisionado($data){         
         $this->db->set($data);
         $this->db->where('id',$data['id']);
         return  $this->db->update('comisionado');
    }
    
     public function  eliminarComisionado($data){         
         $this->db->set('estatus',$data['estatus']);
         $this->db->where('id',$data['id']);
         return  $this->db->update('comisionado');
    }

}// fin de la clase
