

<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Avance_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function guardarAvance($dataAvance) {
        return $this->db->insert('avance', $dataAvance);
    }

    public function actualizarAvance($dataAvance) {

        $this->db->set($dataAvance);
        $this->db->where('id', $dataAvance['id']);
        return $this->db->update('avance');
    }

    public function cambiarEstatus($dataAvance) {

        $this->db->set($dataAvance);
        $this->db->where('id', $dataAvance['id']);
        return $this->db->update('avance');
    }

    public function consultarAvanceTipoFinal($actividad) {



        $sql = "SELECT id FROM avance where tipo=0  and actividad=$actividad";
        $query = $this->db->query($sql);

        if ($query->num_rows() > 0) {
            $boll = false;
        } else {
            $boll = true;
        }

        return $boll;
    }

    public function consultarListaAvance() {

        $sql = "SELECT av.descripcion AS descripcion, evento.titulo AS evento, 
                     actividad.descripcion AS actividad, 
                     av.tipo AS tipo,
                     av.fecharegistro AS fecha, 
                     av.observacion AS observacion,
                     av.estatus AS estatus,
                     bdgenerica.persona.nombre AS nombre, 
                     bdgenerica.persona.apellido AS apellido 

                FROM prevengo.avance as av 
                INNER JOIN actividad ON actividad.id= av.actividad 
                INNER JOIN evento ON actividad.evento=evento.id 
                INNER JOIN bdgenerica.usuario ON av.usuario= bdgenerica.usuario.id 
                INNER JOIN bdgenerica.persona ON bdgenerica.usuario.cedula=bdgenerica.persona.cedula
                WHERE av.estatus !=1    
                ORDER BY av.fecharegistro, av.tipo ASC";


        $query = $this->db->query($sql);

        return $query;
    }

    public function consultarListaAvanceFinal() {

        $sql = "SELECT actividad.id AS id,
                     av.id AS idAv,
                     evento.titulo AS evento, 
                     av.descripcion AS descripcion, 
                     actividad.descripcion AS actividad, 
                     av.tipo AS tipo, 
                     av.fecharegistro AS fecha, 
                     bdgenerica.persona.nombre AS nombre, 
                     bdgenerica.persona.apellido AS apellido 

             FROM prevengo.avance AS av 
             INNER JOIN actividad ON actividad.id= av.actividad 
             INNER JOIN evento ON actividad.evento=evento.id 
             INNER JOIN bdgenerica.usuario ON av.usuario= bdgenerica.usuario.id 
             INNER JOIN bdgenerica.persona ON bdgenerica.usuario.cedula=bdgenerica.persona.cedula 
             WHERE av.estatus=5 and av.tipo=0 and actividad.estatus=3
             ORDER BY av.fecharegistro, id ASC";


        $query = $this->db->query($sql);

        return $query;
    }

    public function cargarEmpleadosConPlan($id) {

        $sql = "SELECT 
                    bdgenerica.persona.foto AS foto,
                     bdgenerica.persona.nombre AS nombre, 
                     bdgenerica.persona.apellido AS apellido, 
                     av.fechaasignacion AS fecha

             FROM prevengo.avance AS av 
             INNER JOIN actividad ON actividad.id= av.actividad 
             INNER JOIN evento ON actividad.evento=evento.id 
             INNER JOIN bdgenerica.usuario ON av.usuario= bdgenerica.usuario.id 
             INNER JOIN bdgenerica.persona ON bdgenerica.usuario.cedula=bdgenerica.persona.cedula 
             WHERE  av.actividad=$id
             GROUP BY nombre 
             ORDER BY av.fecharegistro ASC";


        $query = $this->db->query($sql);

        return $query;
    }
    
  public function cargarUsuarios() {

    
          $sql = "SELECT bdgenerica.usuario.id,
	                    bdgenerica.usuario.nacionalidad,
                        bdgenerica.usuario.cedula,
                        bdgenerica.empleado.id as empl,
                        bdgenerica.persona.foto,
                        bdgenerica.persona.nombre,
                        bdgenerica.persona.apellido,
                        bdgenerica.ente.nombre AS ente,
                        bdgenerica.division.nombre AS division,
                        bdgenerica.tipousuario.nombre AS tipousuario

                     FROM bdgenerica.usuario

                     INNER JOIN bdgenerica.persona 
                      ON bdgenerica.persona.cedula= bdgenerica.usuario.cedula
                     INNER JOIN  bdgenerica.empleado
                       ON bdgenerica.persona.cedula=bdgenerica.empleado.cedula 
                     INNER JOIN  bdgenerica.ente 
                       ON bdgenerica.empleado.ente= bdgenerica.ente.id
                     INNER JOIN  bdgenerica.division 
                       ON bdgenerica.empleado.division= bdgenerica.division.id
                     INNER JOIN  bdgenerica.tipousuario
                       ON bdgenerica.usuario.tipousuario= bdgenerica.tipousuario.id";
         $query = $this->db->query($sql);
         
        return $query;
  }//fin de la funcion
    
  
     public function  buscarEjecutorDeActividad($id){         
            $query = $this->db->query("select count(*) as cuantos

                                    from prevengo.avance 
                                    
                                    where  prevengo.avance.actividad=$id 					 												   
                                          
                                 ");
       
            return $query; 
    }
    
       public function  buscarAvance($id){         
            $query = $this->db->query("select count(*) as cuantos
                                        from actividad 
                                        inner join avance on actividad.id=avance.actividad
                                        inner join evento on evento.id=actividad.evento
                                        where (evento.estatus in (1,2)) and (actividad.estatus in (1,2)) and (avance.usuario=$id)
                                        order by actividad.estatus, actividad.id					 												   
                                          
                                 ");
       
            return $query; 
    }
}//fin de la clase


