<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Tipocargo_model extends CI_Model {
  
  function __construct(){
    $this->load->database();
  }
  function cargarTipoCargo() {
      $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
    $query1 =  $db_generica->query("SELECT * FROM cargo Order by id");
    $tipo=array();  
    if ($query1->num_rows() > 0){
      foreach ($query1->result() as $institucion){
        $tipo[] = $institucion;
      }
      return $tipo;
      $query1->free-result();
    } 
  }
}