<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Estado_model extends CI_Model {
  
  function __construct(){
    $this->load->database();
  }

  function cargarestado() {
    $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
    $query1 =  $db_generica->query("SELECT * FROM estado Order by id");
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


