<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Evento_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarListaEvento() {

        $query = $this->db->query("Select evento.id as idEv, 
                                    evento.titulo as titulo, 
                                    evento.descripcion as descripcion, 
                                    evento.fechatope as fechaEv,
                                    evento.fechapreaviso as fechaPA,
                                    evento.presupuesto as presupuesto,
                                    evento.estatus as estatus,
                                    alcance.nombre as alcance,
                                    agente.nombre as agente,
                                    tipoevento.nombre as tipoEv,
                                    sector.nombre as sector
                             from evento 
                             inner join agente on agente.id=evento.agente
                             inner join alcance on alcance.id=evento.alcance
                             inner join tipoevento on tipoevento.id=evento.tipoevento
                             inner join sector on sector.id=evento.sector
                             where evento.estatus in (0,1,2)");
        $resultado = array();
            return $query;
            
       }


    public function cargarListaEventoSinIniciar($id) {

        $query = $this->db->query("Select evento.id as id, 
                                    evento.titulo as titulo, 
                                    evento.descripcion as descripcion, 
                                    evento.fechatope as fechaEv,
                                    evento.fechapreaviso as fechaPA,
                                    evento.presupuesto as presupuesto,
                                    evento.estatus as estatus
                                   
                             from evento 
                             inner join actividad on actividad.evento=evento.id
                             where evento.estatus=1 and actividad.usuario=$id");
        $resultado = array();
            return $query;
            
       }
       
       


       public function  cambiarEstatus($data){         
         $this->db->set('estatus',$data['estatus']);
         $this->db->where('id',$data['id']);
         return  $this->db->update('evento');
    }
    

}// fin de la clase
