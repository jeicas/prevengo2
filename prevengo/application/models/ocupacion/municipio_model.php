<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Municipio_model extends CI_Model {
  
  function __construct(){
    $this->load->database();
  }

  function cargarMunicipio($id) {
    $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
    //
   //console.log($id);
    if($id!='')
      $query1 =  $db_generica->query("SELECT * FROM municipio where estado=$id Order by id");
    else 
      $query1 =  $db_generica->query("SELECT * FROM municipio Order by id");
    $estado=array();  
    if ($query1->num_rows() > 0){
      foreach ($query1->result() as $esta){
        $estado[] = $esta;
      }
      return $estado;
      $query1->free-result();
    } 
  }

}


