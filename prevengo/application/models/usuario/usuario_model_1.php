<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }
    public function obtenerIdUsuario($cedula,$nacionalidad){
        $sql= "SELECT id FROM usuario
        WHERE usuario.cedula=? AND usuario.nacionalidad=?";
        $consulta=$this->db->query($sql,array($cedula,$nacionalidad));  
        if($consulta->num_rows() ==1)
            return $consulta;
        else          
            return false;                
    }
    public function usuariolog($cedula,$nacionalidad){
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $sql= " SELECT division.dependencia as departamento FROM empleado, usuario, division WHERE usuario.cedula='$cedula' AND usuario.nacionalidad='$nacionalidad' AND usuario.cedula=empleado.cedula AND usuario.nacionalidad=empleado.nacionalidad and empleado.estatus=1 and empleado.division=division.id limit 1";
        $consulta=$db_generica->query($sql,array($cedula,$nacionalidad));  
        if($consulta->num_rows() ==1)
            return $consulta;
        else          
            return false;                
    }
   
    function cargarusuario($parametro) {
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $query = $db_generica->query("SELECT persona.*, empleado.cedula, empleado.nacionalidad, division.dependencia as departamento, 
        persona.foto,IF(a.estatus='1', 'Activo', 'Inactivo') as status, a.id,a.usuario,a.clave,a.tipousuario,
        division.nombre as dnombre,empleado.cargo,empleado.tiponomina,b.nombre as ntipousuario
        FROM dependencia,persona 
        INNER JOIN empleado 
        ON empleado.cedula=persona.cedula 
        and empleado.nacionalidad=persona.nacionalidad 
        LEFT JOIN division 
        ON empleado.division=division.id 
        INNER JOIN usuario a
        INNER JOIN tipousuario b ON a.tipousuario=b.id 
        AND a.cedula=empleado.cedula AND a.nacionalidad=empleado.nacionalidad
        WHERE (dependencia.dependencia=$parametro
        OR division.dependencia=$parametro) 
        ORDER BY persona.nombre");
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
// SELECT a.id,a.usuario,a.clave,a.tipousuario,d.foto as foto,
//             a.cedula,a.nacionalidad,IF(a.status='1', 'Activo', 'Inactivo') as status,
//             b.nombre as ntipousuario,c.nombre,c.apellido,c.direccion,c.correo as correo 
//             FROM usuario a,tipousuario b,persona c,empleado d
//             WHERE a.tipousuario=b.id 
//             AND d.deparlogueado=(SELECT deparlogueado FROM empleado, usuario WHERE usuario.cedula='$cedula' AND usuario.nacionalidad='$nacionalidad' AND usuario.cedula=empleado.cedula AND usuario.nacionalidad=empleado.nacionalidad and empleado.estatus=1 limit 1)
//             AND a.cedula=c.cedula 
//             AND a.nacionalidad=c.nacionalidad
//             AND a.cedula=d.cedula 
//             AND a.nacionalidad=d.nacionalidad
//             AND d.cedula=c.cedula 
//             AND d.nacionalidad=c.nacionalidad


    function tipousuario() {
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $query1 = $db_generica->query("SELECT * FROM tipousuario");
        $tipo=array();  
        if ($query1->num_rows() > 0){
          foreach ($query1->result() as $tipousuario)
          {
            $tipo[] = $tipousuario;
          }
          return $tipo;
          $query1->free-result();
        } 
    }
    function insertusuario($datausuario){
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $db_generica->set($datausuario);
        $db_generica->insert('usuario');
    return $this->db->insert_id();
    }
    function insertpersona($datapersona){
         $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        return $db_generica->insert('persona', $datapersona);
    }
    function updateusuario($datausuario){
         $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $db_generica->set($datausuario);
        $db_generica->where('id', $datausuario['id']);
    return $db_generica->update('usuario');
    }
    function updatepersona($datapersona){
      $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $db_generica->set($datapersona);
        $db_generica->where('cedula', $datapersona['cedula']);
        $db_generica->where('nacionalidad', $datapersona['nacionalidad']);
    return $db_generica->update('persona');
    }
    function updateempleado($dataempleado){
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $db_generica->set('foto',$dataempleado['foto']);
        $db_generica->where('cedula', $dataempleado['cedula']);
        $db_generica->where('nacionalidad', $dataempleado['nacionalidad']);
    return $db_generica->update('empleado');
    }
    function deletePersona($datopersona){
       $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $db_generica ->where('cedula', $datopersona['cedula']);
       $db_generica ->where('nacionalidad', $datopersona['nacionalidad']);
    return $db_generica ->delete('persona'); 
    }
    function deleteUsuario($datousuario){
       $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
        $db_generica ->where('id', $datousuario['id']);
    return $db_generica ->delete('usuario'); 
    }
    function verificarusuario($cedula,$nacionalidad) {
             $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
    $query =$db_generica->query("SELECT * FROM usuario where cedula ='$cedula' and nacionalidad='$nacionalidad' ");
      if ($query->num_rows() > 0){
      $verificar = $query;
    }else{
       $verificar ='';
    }
    return $verificar;
    }
  function existecontrasena($cedula, $nacionalidad,$contrasena) {
    $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
    $query = $db_generica->query("SELECT * FROM usuario where cedula ='$cedula' and nacionalidad='$nacionalidad' and password='$contrasena'");
    if ($query->num_rows() > 0){
      $tipo = $query;
    }else{
       $tipo = '';
    }
    return $tipo;
  }
  public function claveActual($cedula,$nacionalidad,$clave){
        $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
       return $db_generica->get_where('usuario',array('cedula' => $cedula,'nacionalidad' => $nacionalidad, 'clave'=>$clave));
  }
  public function updatecontrasena($cedula,$nacionalidad,$clave){
       $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
      $data = array('clave' => $clave);
      $db_generica->where('cedula', $cedula);
      $db_generica->where('nacionalidad',$nacionalidad);
      $db_generica->update('usuario',$data);
  }
}