<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
 class Empleado_model extends CI_Model 
 {
    function __construct(){
        $this->load->database();
    }
    function buscarFoto($parametrouno,$parametrodos){
         $db_generica = $this->load->database($this->config->item('bdgenerica'), TRUE);//Inicia la BD generica 
        $sql="SELECT persona.foto 
        FROM persona
        WHERE persona.cedula=? 
        AND persona.nacionalidad=?";
        $consulta=$db_generica->query($sql,array($parametrouno,$parametrodos));  
        if($consulta->num_rows() >=1){
            return $consulta;
        }else{          
            return false;
        }
    }



    function obtenerEmpleadosGrid1($parametrouno,$parametrodos){
     $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
      $sql="SELECT persona.*,persona.fechanacimiento as fechanac,persona.telefono1 as tlf1, persona.telefono2 as tlf2,empleado.cedula,empleado.nacionalidad,empleado.cargo,persona.foto,
        empleado.tiponomina,dependencia.id as departamento,empleado.estatus,dependencia.nombre as dnombre, persona.telefono1, persona.telefono2, municipio.id as municipioid, municipio.nombre as municipionombre, parroquia.id as parroquiaid, parroquia.nombre as parroquianombre, estado.id as estadoid, estado.nombre as estadonombre
       FROM municipio, estado, parroquia, persona 
        INNER JOIN empleado 
        ON empleado.cedula=persona.cedula 
        AND empleado.nacionalidad=persona.nacionalidad 
         INNER JOIN division on division.dependencia = ? AND persona.nacionalidad=empleado.nacionalidad AND division.id= empleado.division INNER JOIN dependencia 
        ON dependencia.id= division.dependencia 
        where persona.parroquia=parroquia.id and parroquia.municipio=municipio.id and municipio.estado=estado.id          
        ORDER BY persona.nombre";
        $consulta=$db_generica->query($sql,array($parametrouno,$parametrodos));  
        if($consulta->num_rows() >=1){
            return $consulta;
        }else{          
            return false;
        }
    }  
    public function obtenerEmpleadosGrid2($parametro){
     $db_generica = $this->load->database($this->config->item('bdgenerica'), TRUE);//Inicia la BD generica
     $sql="SELECT persona.*,persona.fechanacimiento as fechanac,persona.telefono1 as tlf1, persona.telefono2 as tlf2,empleado.cedula,empleado.nacionalidad,empleado.cargo,persona.foto,
        empleado.tiponomina,dependencia.id as departamento,empleado.estatus,dependencia.nombre as dnombre, persona.telefono1, persona.telefono2, municipio.id as municipioid, municipio.nombre as municipionombre, parroquia.id as parroquiaid, parroquia.nombre as parroquianombre, estado.id as estadoid, estado.nombre as estadonombre
         FROM  municipio, estado, parroquia, persona 
        INNER JOIN empleado 
        ON empleado.cedula=persona.cedula 
        and empleado.nacionalidad=persona.nacionalidad 
        INNER JOIN division on division.dependencia = ? AND persona.nacionalidad=empleado.nacionalidad AND division.id= empleado.division INNER JOIN dependencia 
        ON dependencia.id= division.dependencia 
        where persona.parroquia=parroquia.id and parroquia.municipio=municipio.id and municipio.estado=estado.id          
        ORDER BY persona.nombre";
      
        $consulta=$db_generica->query($sql,array($parametro,$parametro));  
        if($consulta->num_rows() >=1){
            return $consulta;
        }else{          
            return false;
        }
    }
    // function obtenerEmpleadosGrid3($cedula,$nacionalidad){
    // $sql="SELECT persona.*,empleado.cedula,empleado.nacionalidad,empleado.cargo,empleado.foto,
    //     empleado.tiponomina,empleado.departamento,empleado.estatus,departamento.nombre as dnombre 
    //     FROM persona
    //     INNER JOIN empleado 
    //     ON  persona.cedula= empleado.cedula
    //     AND persona.nacionalidad=empleado.nacionalidad 
    //     INNER JOIN departamento 
    //     ON empleado.departamento = (SELECT departamento FROM empleado, usuario 
    //     WHERE usuario.cedula=$cedula 
    //     AND usuario.nacionalidad='$nacionalidad' 
    //     AND usuario.cedula=empleado.cedula 
    //     AND usuario.nacionalidad=empleado.nacionalidad) 
    //     AND departamento.id=empleado.departamento 
    //     LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
    //     LEFT JOIN cargo ON empleado.cargo=cargo.id          
    //     ORDER BY persona.nombre";
    //     $consulta=$this->db->query($sql,array($cedula,$nacionalidad));  
    //     if($consulta->num_rows() >=1)
    //         return $consulta;
    //     else          
    //         return false;
    // }

      function obtenerEmpleadosGrid3($cedula,$nacionalidad){
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $sql="SELECT persona.*,persona.fechanacimiento as fechanac,persona.telefono1 as tlf1, persona.telefono2 as tlf2,empleado.cedula,empleado.nacionalidad,empleado.cargo,persona.foto,
        empleado.tiponomina,dependencia.id as departamento,empleado.estatus,dependencia.nombre as dnombre, persona.telefono1, persona.telefono2, municipio.id as municipioid, municipio.nombre as municipionombre, parroquia.id as parroquiaid, parroquia.nombre as parroquianombre, estado.id as estadoid, estado.nombre as estadonombre
        FROM municipio, estado, parroquia, persona INNER JOIN empleado 
        ON  persona.cedula= empleado.cedula 
        INNER JOIN division on division.dependencia = (SELECT dependencia FROM division where id=(select division FROM empleado where cedula=$cedula and nacionalidad='$nacionalidad')) AND persona.nacionalidad=empleado.nacionalidad AND division.id= empleado.division INNER JOIN dependencia 
        ON dependencia.id= division.dependencia 
        LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
        LEFT JOIN cargo ON empleado.cargo=cargo.id where persona.parroquia=parroquia.id and parroquia.municipio=municipio.id and municipio.estado=estado.id          
        ORDER BY persona.nombre";
        $consulta=$db_generica->query($sql,array($cedula,$nacionalidad));  
        if($consulta->num_rows() >=1)
            return $consulta;
        else          
            return false;
    }
 
// ON dependencia.id= division.dependencia and dependencia.id = (SELECT id FROM bdgenerica.dependencia INNER JOIN bd) 
  function consultarAutorizados2($parametro,$motivo,$tipo,$desde,$hasta,$estado){

    $query = $this->db->query("SELECT persona1.foto, persona1.nacionalidad,dependencia.nombre as dnombre,persona1.cedula, persona1.nombre, persona1.apellido,autorizacion.id, IF(autorizacion.horasalida='00:00:00','',DATE_FORMAT(autorizacion.horasalida, '%r')) as horasalida, autorizacion.motivoautorizacion, autorizacion.tipoautorizacion as tipo, 
        IF(autorizacion.tipoautorizacion='1' ,'ENTRADA', 
        IF( autorizacion.tipoautorizacion='2' , 'SALIDA',
        IF( autorizacion.tipoautorizacion='3' , 'SALIDA CON RETORNO',
        IF( autorizacion.tipoautorizacion='4' , 'SALIDA DE VEHICULO',
        IF( autorizacion.tipoautorizacion='5' , 'PERSONAL DE GUARDIA',
        IF( autorizacion.tipoautorizacion='6' , 'PERSONAL MENSAJERO', 'PERMANENCIA DEL PERSONAL')))))) as tipoautorizacion,
        IF(autorizacion.horaentrada='00:00:00','',DATE_FORMAT(autorizacion.horaentrada, '%r')) as horaentrada,
        DATE_FORMAT(autorizacion.fechaautorizacion,'%d-%m-%Y') as fechaautorizacion,
        CONCAT(persona2.nombre,' ', persona2.apellido) as jefe,IF(autorizacion.estatus='0', 'Procesada', 'Sin Procesar') as estado
        FROM ".$this->config->item('autorizacion').".autorizacion,".$this->config->item('bdgenerica').".persona as persona1, ".$this->config->item('bdgenerica').".persona as persona2,".$this->config->item('bdgenerica').".empleado as empleado, ".$this->config->item('bdgenerica').".usuario as usuario,".$this->config->item('bdgenerica').".division as division, ".$this->config->item('bdgenerica').".dependencia as dependencia
        WHERE persona1.nacionalidad=empleado.nacionalidad
        AND empleado.nacionalidad=autorizacion.nacionalidad 
        AND autorizacion.usuario=$parametro 
        AND autorizacion.motivoautorizacion $motivo 
        AND autorizacion.tipoautorizacion $tipo
        AND persona1.cedula=empleado.cedula 
        AND empleado.cedula=autorizacion.cedula 
        AND autorizacion.usuario=usuario.id 
        AND usuario.nacionalidad=persona2.nacionalidad 
        AND autorizacion.fechaautorizacion BETWEEN '$desde' 
        AND '$hasta'
        AND usuario.cedula=persona2.cedula 
        AND autorizacion.estatus $estado 
        AND autorizacion.eliminado=0 
        AND division.id = empleado.division
        AND dependencia.id = division.dependencia 
        ORDER BY dependencia.nombre");        
        if($query->num_rows() >=1)
            return $query->result();          
        else          
            return false;
    }


    function cargarAutorizados(){
          $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
    $query = $this->db->query("SELECT persona1.foto, 
        persona1.nacionalidad, 
        persona1.cedula, 
        CONCAT(persona1.nombre,' ', persona1.apellido) as nombrecompleto, 
        autorizacion.id, 
        IF( autorizacion.horasalida ='00:00:00','',DATE_FORMAT(autorizacion.horasalida, '%r')) as horasalida, 
        IF( autorizacion.tipoautorizacion='1' , 'ENTRADA', 
        IF( autorizacion.tipoautorizacion='2' , 'SALIDA',
        IF( autorizacion.tipoautorizacion='3' , 'SALIDA CON RETORNO',
        IF( autorizacion.tipoautorizacion='4' , 'SALIDA DE VEHICULO',
        IF( autorizacion.tipoautorizacion='5' , 'PERSONAL DE GUARDIA',
        IF( autorizacion.tipoautorizacion='6' , 'PERSONAL MENSAJERO', 'PERMANENCIA DEL PERSONAL')))))) as tipoautorizacion,
        IF(autorizacion.horaentrada='00:00:00','',DATE_FORMAT(autorizacion.horaentrada, '%r')) as horaentrada,
        DATE_FORMAT(autorizacion.fechaautorizacion,'%d-%m-%Y') as fechaautorizacion, 
        CONCAT(persona2.nombre,' ', persona2.apellido,' ', 'Dependencia: ', dependencia.nombre) as jefe
      FROM ".$this->config->item('autorizacion').".autorizacion as autorizacion, ".$this->config->item('bdgenerica').".persona as persona1, ".$this->config->item('bdgenerica').".persona as persona2,".$this->config->item('bdgenerica').".empleado as empleado, ".$this->config->item('bdgenerica').".usuario as usuario,".$this->config->item('bdgenerica').".division as division, ".$this->config->item('bdgenerica').".dependencia as dependencia
         WHERE autorizacion.fechaautorizacion=CURDATE() 
        AND persona1.nacionalidad=empleado.nacionalidad 
        AND empleado.nacionalidad=autorizacion.nacionalidad 
        AND persona1.cedula=empleado.cedula 
        AND empleado.cedula=autorizacion.cedula 
        AND autorizacion.usuario=usuario.id 
        AND usuario.nacionalidad=persona2.nacionalidad 
        AND usuario.cedula=persona2.cedula 
        AND autorizacion.estatus!=0 and autorizacion.eliminado=0  
        AND division.id= empleado.division
        AND dependencia.id = division.dependencia 
        ORDER BY persona1.nombre");
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
  function cargarProcesados() {
        $query = $this->db->query("SELECT empleado.foto, 
        persona1.nacionalidad, 
        persona1.cedula, 
        CONCAT(persona1.nombre,' ', persona1.apellido) as nombrecompleto, 
        autorizacion.id, 
        IF(autorizacion.horasalida='00:00:00','',DATE_FORMAT(autorizacion.horasalida, '%r')) as horasalida,
        IF(autorizacion.tipoautorizacion='1' ,'ENTRADA', 
        IF( autorizacion.tipoautorizacion='2' , 'SALIDA',
        IF( autorizacion.tipoautorizacion='3' , 'SALIDA CON RETORNO',
        IF( autorizacion.tipoautorizacion='4' , 'SALIDA DE VEHICULO',
        IF( autorizacion.tipoautorizacion='5' , 'PERSONAL DE GUARDIA',
        IF( autorizacion.tipoautorizacion='6' , 'PERSONAL MENSAJERO', 'PERMANENCIA DEL PERSONAL')))))) as tipoautorizacion,
        IF(autorizacion.horaentrada='00:00:00','',DATE_FORMAT(autorizacion.horaentrada, '%r')) as horaentrada,
        DATE_FORMAT(autorizacion.fechaautorizacion,'%d-%m-%Y') as fechaautorizacion, 
        CONCAT(persona2.nombre,' ', persona2.apellido,' ', 'Dependencia: ', departamento.nombre) as jefe, autorizacion.fechaestatus
        FROM autorizacion, persona as persona1, persona as persona2, empleado, usuario, departamento
        WHERE autorizacion.fechaautorizacion=CURDATE() 
        AND persona1.nacionalidad=empleado.nacionalidad 
        AND empleado.nacionalidad=autorizacion.nacionalidad 
        AND persona1.cedula=empleado.cedula 
        AND empleado.cedula=autorizacion.cedula 
        AND autorizacion.usuario=usuario.id 
        AND usuario.nacionalidad=persona2.nacionalidad 
        AND usuario.cedula=persona2.cedula 
        AND autorizacion.estatus!=1  
        AND empleado.departamento=departamento.id
        ORDER BY persona1.nombre");
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
 function cargarEmpleado($nacionalidad,$usuario) {
      $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
    $sql = "SELECT persona.*, persona.fechanacimiento as fechanac, persona.telefono1 as tlf1, persona.telefono2 as tlf2,
            empleado.cedula,
            empleado.nacionalidad, 
            empleado.cargo,
            empleado.tiponomina,
            dependencia.id as departamento, 
            dependencia.dependencia as departamentoanterior, 
            persona.foto,
            empleado.estatus as eestatus,
            dependencia.nombre as dnombre 
            FROM persona
            INNER JOIN  empleado ON persona.cedula= empleado.cedula 
            AND persona.nacionalidad=empleado.nacionalidad 
            INNER JOIN  dependencia ON empleado.division= (SELECT id FROM division where division.id= empleado.division )
            INNER JOIN persona as persona2
            LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
            LEFT JOIN cargo  ON empleado.cargo=cargo.id
            WHERE   persona2.nacionalidad=?
            AND persona2.cedula=?
            AND persona2.cedula= empleado.cedula 
            AND dependencia.id=(SELECT dependencia FROM division where division.id= empleado.division )
            AND persona2.nacionalidad=empleado.nacionalidad
            ORDER BY persona.nombre";
        $query = $db_generica->query($sql, array($nacionalidad,$usuario));
        if($query->num_rows()==1){
            return $query;
        }else{
            return false;
        }
    }
    function very($cedula,$nacionalidad){
    $consulta = $this->db->get_where('persona',array('cedula'=>$cedula,'nacionalidad'=>$nacionalidad));
        if ($consulta->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }
    function existeempleado($nacionalidad,$cedula) {
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $query = $db_generica->query("SELECT persona.*,empleado.cedula as empleado,
            empleado.cargo,
            empleado.tiponomina,
            empleado.division,persona.foto
            FROM persona
            INNER JOIN empleado on empleado.cedula=persona.cedula 
            AND empleado.nacionalidad=persona.nacionalidad
            LEFT JOIN tiponomina on empleado.tiponomina=tiponomina.id
            LEFT JOIN cargo on empleado.cargo=cargo.id
            LEFT JOIN division on empleado.division=division.id
            WHERE persona.nacionalidad ='$nacionalidad'
            AND persona.cedula ='$cedula'");
        return $query;
    }
    function cargarPersona($nacionalidad, $cedula) {
    $sql = "SELECT persona.*
            FROM persona
            WHERE persona.nacionalidad =? 
            AND persona.cedula =?";
        $query = $this->db->query($sql, array($nacionalidad, $cedula));         
        if($query->num_rows()==1){
            return $query;
        }else{
            return false;
        }
    }
  function insertEmpleado($dataempleado){
         $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        return $db_generica->insert('empleado', $dataempleado);
    }
    function insertPersona($datapersona){
       $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        return $db_generica->insert('persona', $datapersona);
    }
    function updateEmpleado($dataempleado){
        $db_generica = $this->load->database($this->config->item('bdgenerica'), TRUE);//Inicia la BD generica
        $db_generica->set($dataempleado);
        $db_generica->where('cedula', $dataempleado['cedula']);
        $db_generica->where('nacionalidad', $dataempleado['nacionalidad']);
        return $db_generica->update('empleado');
    }
    function updatePersona($datapersona){
        $db_generica = $this->load->database($this->config->item('bdgenerica'), TRUE);//Inicia la BD generica
        $db_generica->set($datapersona);
        $db_generica->where('cedula', $datapersona['cedula']);
        $db_generica->where('nacionalidad', $datapersona['nacionalidad']);
        return $db_generica->update('persona');
    }
    public function datosPersonas($cedula,$nacionalidad){   
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $sql= "SELECT * FROM persona,ubicaciones
        WHERE persona.cedula=? 
        AND persona.nacionalidad=?
        AND ubicaciones.id_ubicacion=persona.ubicaciones_id_ubicacion";
        $consulta=$db_generica->query($sql,array($cedula,$nacionalidad));  
        if($consulta->num_rows() == 1)
            return $consulta;
        else          
            return false;                
    }
    public function buscarDepartamentoUsuario($cedula,$nacionalidad){
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $sql= "SELECT usuario.cedula, usuario.nacionalidad, usuario.tipousuario, dependencia.id , dependencia.nombre as nombre, dependencia.id as departamento
        FROM usuario inner join empleado on usuario.cedula=$cedula AND usuario.nacionalidad='$nacionalidad' AND empleado.cedula=usuario.cedula 
        AND empleado.nacionalidad=usuario.nacionalidad inner join dependencia
        on usuario.cedula=$cedula
        AND usuario.nacionalidad='$nacionalidad' inner join division as divi where dependencia.id=(SELECT dependencia FROM division where division.id= empleado.division ) group by usuario.id
       ";
        $consulta= $db_generica->query($sql,array($cedula,$nacionalidad));  
        if($consulta->num_rows() == 1)
          return $consulta;
        else          
          return false;                
    }
  /*  public function buscarDepartamentoEmpleado($cedula,$nacionalidad){
            $db_generica = $this->load->database($this->config->item('bdgenerica'), TRUE);//Inicia la BD generica 
            $sql= "SELECT empleado.departamentoanterior, 
            departamento.id, departamento.nombrE as ndepar
             FROM empleado
            INNER JOIN persona ON persona.nacionalidad=empleado.nacionalidad AND empleado.cedula=persona.cedula 
            LEFT JOIN departamento ON departamento.id=empleado.departamentoanterior
            WHERE empleado.cedula=$cedula
            AND empleado.nacionalidad='$nacionalidad'";
        $consulta=$db_generica->query($sql,array($cedula,$nacionalidad));  
        if($consulta->num_rows() == 1){
          return $consulta;
        }else{          
          return false;  
        }              
    }
*/

     public function buscarDivisionUsuario($cedula,$nacionalidad){
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $sql= "SELECT usuario.cedula, usuario.nacionalidad, empleado.division, division.id, division.nombre
        FROM usuario, empleado, division
        WHERE usuario.cedula=? 
        AND usuario.nacionalidad=? 
        AND division.id=empleado.division
        AND empleado.cedula=usuario.cedula 
        AND empleado.nacionalidad=usuario.nacionalidad";
        $consulta=$db_generica->query($sql,array($cedula,$nacionalidad));  
        if($consulta->num_rows() == 1)
          return $consulta;
        else          
          return false;                
    }
}





