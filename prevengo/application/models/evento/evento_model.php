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
                             where evento.estatus in (0,1,2)
                             order by fechaEv ASC");
       
            return $query;
            
       }

    public function cargarListaEventoTodo() {

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
                             
                             order by fechaEv  ASC");
       
            return $query;
            
       }
    public function cargarListaEventosResponsable() {

        $query = $this->db->query("Select evento.id as idEvent, 
                                    evento.titulo as titulo, 
                                    evento.descripcion as descripcion, 
                                    evento.fechatope as fechaEv,
                                    bdgenerica.persona.nacionalidad as nacionalidad,
                                     bdgenerica.persona.cedula as cedula,
                                    bdgenerica.persona.nombre as nombre,
                                    bdgenerica.persona.apellido as apellido,
                                    bdgenerica.persona.foto as foto,
                                    bdgenerica.cargo.nombre as cargo,
                                    bdgenerica.ente.nombre AS ente,
                                    bdgenerica.division.nombre AS division,
                                    evento.estatus as estatus,
                                    actividad.usuario as idUsuario
                                   
                             from evento
                             
                             left join actividad
                                    on actividad.evento=evento.id
                             left join  bdgenerica.usuario 
                                    on bdgenerica.usuario.id= actividad.usuario
                     		left join  bdgenerica.persona 
                                    on bdgenerica.usuario.cedula=bdgenerica.persona.cedula
                            left join bdgenerica.empleado on 
                                         bdgenerica.persona.cedula=bdgenerica.empleado.cedula
                            left join bdgenerica.cargo 
                                    on bdgenerica.cargo.id=bdgenerica.empleado.cargo
                            left JOIN  bdgenerica.ente 
                                     ON bdgenerica.empleado.ente= bdgenerica.ente.id
                            left JOIN  bdgenerica.division 
                                     ON bdgenerica.empleado.division= bdgenerica.division.id
                           where evento.estatus in (1,2)
                           group by evento.titulo");
        
            return $query;
            
       }
       
       public function cargarListaEventosSinResponsable($id) {

        $query = $this->db->query("Select evento.id as idEvent, 
                                    evento.titulo as titulo, 
                                    evento.descripcion as descripcion, 
                                    evento.fechatope as fechaEv,
                                    evento.estatus as estatus
                                   
                            from evento
                           where evento.estatus in (1,2) and evento.id!=$id
                           group by evento.titulo");
        
            return $query;     
       }
       
        public function cargarListaEventosSinResponsableTodos() {

        $query = $this->db->query("Select evento.id as idEvent, 
                                    evento.titulo as titulo, 
                                    evento.descripcion as descripcion, 
                                    evento.fechatope as fechaEv,
                                    evento.estatus as estatus
                                   
                            from evento
                           where evento.estatus in (1,2) 
                           group by evento.titulo");
        
            return $query;     
       }
       
       


      public function  cambiarEstatus($data){         
         $this->db->set('estatus',$data['estatus']);
         $this->db->where('id',$data['id']);
         return  $this->db->update('evento');
    }
    
    
      public function  guardarEvento($data){         
         
         return  $this->db->insert('evento',$data);
    }
           
    public function  actualizarEvento($data){         
         $this->db->set($data);
         $this->db->where('id',$data['id']);
         return  $this->db->update('evento');
    }
    
    public function eventoActividad() // esta es para saber si un evento ya tiene a alguien asignado.
    {
        $sql="Select evento.id as idEvent 
                 from evento inner join actividad on actividad.evento=evento.id 
                 where evento.estatus in (1,2)";
        $query = $this->db->query($sql);
         return $query;   
    }
    

}// fin de la clase
