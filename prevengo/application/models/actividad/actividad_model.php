<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Actividad_model extends CI_Model{

	public function __construct(){
		parent::__construct();
	}
    
        
        
        public function guardarActividad($dataActividad){
        return $this->db->insert('actividad',$dataActividad);
    }
        
        
	 public function cargarPlandeAccion($usuario){
     
            $query = $this->db->query("select actividad.id, actividad.descripcion,  avance.fechaasignacion as fecha, evento.titulo as evento
                                        from actividad 
                                        inner join avance on actividad.id=avance.actividad
                                        inner join evento on evento.id=actividad.evento
                                        where (evento.estatus in (1,2)) and (actividad.estatus in (1,2)) and (avance.usuario=$usuario)
                                        order by actividad.estatus, actividad.id ");
                $resultado = array();
                $resultdb=array();  
                if ($query->num_rows() > 0){
                foreach ($query->result() as $row){
                    $resultado[] = $row;
                }
                return $resultado;
                $query->free-result();
              } 
    
    }


 public function  buscarUnPlandeAccion($idUsuario,$idActividad){

    $sql=" SELECT ava.id as avance,act.evento as evento, ava.actividad,ava.fechaasignacion, act.estatus 
              FROM avance AS ava 
              INNER JOIN actividad AS act ON ava.actividad=act.id 
              WHERE ava.usuario=$idUsuario and ava.actividad=$idActividad group by act.id";

    $query = $this->db->query($sql);
       return $query;

    }
    
     public function  buscarActividadEvento($idEvento){

    $sql=" select count(*) as cuantos

                                  from prevengo.actividad
                                    
                                    where  prevengo.actividad.evento=$idEvento 					 												   
                                          and actividad.estatus in (1,2,3,6)";

     $query = $this->db->query($sql);
       return $query;

    }
    
    
 public function buscarIdActividad($evento){

    $sql="SELECT actividad.id as IdAct from actividad 
            inner join evento on evento.id= actividad.evento
            where actividad.evento=$evento and actividad.descripcion='no tiene actividades registrado'";

    $query = $this->db->query($sql);
       return $query;

    }
public function  cambiarEstatus($data){         
         $this->db->set('estatus',$data['estatus']);
         $this->db->where('id',$data['id']);
         return  $this->db->update('actividad');
    }
 
    public function  cambiarEstatusDependientes($data){         
         $this->db->set('estatus',$data['estatus']);
         $this->db->where('actividadepende',$data['id']);
          $this->db->where('estatus',6);
         return  $this->db->update('actividad');
    }
    
  public function  actualizarActividad($data){         
         $this->db->set('usuario',$data['usuario']);
         $this->db->where('evento',$data['evento']);
         return  $this->db->update('actividad');
    }  
    
     public function  actualizarDataActividad($data){         
         $this->db->set($data);
         $this->db->where('id',$data['id']);
         return  $this->db->update('actividad');
    } 
    
 public function cargarEventosConPlandeAccion($usuario){
      
    
        $sql="SELECT ev.id AS idEvento,
                     ev.titulo AS evento,
                     ev.descripcion AS descripcion,
                     ev.fechatope AS fecha,
                     actividad.id AS idAct,
                     actividad.fechatope AS fechaAct,
                     actividad.descripcion AS actividad,
                     actividad.estatus AS estatus
                         
                FROM evento AS ev 
                INNER JOIN actividad 
                ON actividad.evento= ev.id
                WHERE ev.estatus IN (1,2,4)
                     AND  actividad.usuario=$usuario

               ";

          $query = $this->db->query($sql);
          return $query;
             
    
 }
 public function cargarEventosPA($usuario){
      
    
        $sql="SELECT ev.id AS idEvento,
                     ev.titulo AS evento,
                     ev.descripcion AS descripcion,
                     ev.fechatope AS fecha,
                      ev.estatus AS estatus
                    
                         
                FROM evento AS ev 
                INNER JOIN actividad 
                ON actividad.evento= ev.id
                WHERE ev.estatus IN (1,2,4)
                     AND  actividad.usuario=$usuario 
                           
                 GROUP BY  idEvento
                 ORDER BY fecha ASC
               ";

          $query = $this->db->query($sql);
          return $query;
             
    
 }
 
 public function cargarPlandeAccionDeEvento($id,$usuario){
  
        $sql=" SELECT ac.id AS id,
                    ac.descripcion AS descripcion, 
                     ac.fechatope AS fecha,
                     ac.fechaaviso AS fechaPA, 
                     actividad.descripcion AS depende,
                      ac.actividadepende AS iddepende,
                     ac.observacion as observacion,
                     ac.estatus AS estatus
                
                FROM actividad AS ac 
                LEFT JOIN actividad 
                ON actividad.id=ac.actividadepende
                WHERE 
                      ac.usuario=$usuario  
                      AND ac.evento=$id";

                 $query = $this->db->query($sql);
               
                return $query;
               
               
            
               
    
 }
 

  public function cargarActividadDependiente($id){
  
        $sql="SELECT ac.id AS id,
                     ac.descripcion AS descripcion 
                 FROM actividad AS ac 
                 inner join evento on evento.id=ac.evento
                 WHERE ac.estatus in (1,2,3,6) AND evento.estatus!=4 and
                        ac.evento=$id";

          $query = $this->db->query($sql);
                $resultado = array();
                $resultdb=array();  
                if ($query->num_rows() > 0){
                foreach ($query->result() as $row){
                    $resultado[] = $row;
                }
                return $resultado;
                $query->free-result();
              } 
    
 }
  public function cargarActividadDependiente2($idEv, $idAct){
  
        $sql="SELECT ac.id AS id,
                     ac.descripcion AS descripcion 
                 FROM actividad AS ac 
                 inner join evento on evento.id=ac.evento
                 WHERE ac.estatus  in (1,2,3,6) AND evento.estatus!=4 and
                        ac.evento=$idEv and ac.id!=$idAct";

          $query = $this->db->query($sql);
                $resultado = array();
                $resultdb=array();  
                if ($query->num_rows() > 0){
                foreach ($query->result() as $row){
                    $resultado[] = $row;
                }
                return $resultado;
                $query->free-result();
              } 
    
 }
 
  public function eventoActividadAvance($id) // carga la lista del avances y actividades de un evento. 
    {
        $sql="select actividad.id as idAct,
       actividad.descripcion as actDescripcion, 
       actividad.estatus as actEstatus,
       responsable.nombre as nombreAct, 
       responsable.apellido as apellidoAct,
       avance.descripcion as avDescripcion,
       avance.tipo as tipoAvance,
       avance.fecharegistro as fecha, 
       ejecutor.nombre as nombreAva,
       ejecutor.apellido as apellidoAva

       from actividad 
        inner join  avance on avance.actividad=actividad.id
        left join bdgenerica.usuario as usuAva on usuAva.id=avance.usuario 
        left join bdgenerica.usuario as usuAct on usuAct.id= actividad.usuario
        
         join bdgenerica.persona as ejecutor on usuAva.cedula= ejecutor.cedula
         join bdgenerica.persona as responsable on usuAct.cedula= responsable.cedula
         where actividad.evento=$id
        order by idAct ASC";
        
        $query = $this->db->query($sql);
         return $query;   
    }
    
    
      public function eventoActividadAvance2($id) // carga la lista del avances y actividades de un evento. 
    {
        $sql="select actividad.id as idAct,
       actividad.descripcion as actDescripcion, 
       actividad.estatus as actEstatus, 
       responsable.nombre as nombreAct, 
       responsable.apellido as apellidoAct, 
       avance.descripcion as avDescripcion,
       avance.tipo as tipoAvance,
       avance.fecharegistro as fecha, 
       ejecutor.nombre as nombreAva,
       ejecutor.apellido as apellidoAva

     from actividad 
       
       left join  avance on avance.actividad=actividad.id
       
      left join bdgenerica.usuario as usuAct on usuAct.id= actividad.usuario
      left  join bdgenerica.usuario as usuAva on usuAva.id=avance.usuario 
         
        left join bdgenerica.persona as ejecutor on usuAva.cedula= ejecutor.cedula
       left  join bdgenerica.persona as responsable on usuAct.cedula= responsable.cedula
         where actividad.evento=$id
         group by idAct
        order by idAct ASC";
        
        $query = $this->db->query($sql);
         return $query;   
    }
    
    
    
    
    
    
    
    
    
    
    
       public function cargarCantidadPlan($id) {

        $query = $this->db->query("SELECT  count(*) as total, "
                . "              (SELECT  count(a.estatus) FROM  actividad a where a.evento=$id and a.estatus =0) as completado,
                                 (SELECT  count(a.estatus) FROM  actividad a where a.evento=$id and a.estatus !=0) as completado1    
                                     FROM  actividad E where E.evento=$id");

         
      return $query;
    }
}// fin de la clase