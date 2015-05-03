<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Menu_model extends CI_Model {
  function __construct(){
    $this->load->database();
    $this->load->library('session','datasession');
  }
  function cargarmenu() {
    $db_generica = $this->load->database('bdgenerica', TRUE);//Inicia la BD generica
    $username=$this->session->userdata('datasession');
    $usuario = $username['usuario_id'];
    $pass=$username['password'];
    $queryString=  $db_generica->query(
      "Select p.menu menu 
      FROM usuario u INNER JOIN permiso p ON u.tipousuario= p.tipousuario 
      INNER JOIN menu m ON p.menu = m.id
      WHERE u.usuario ='$usuario' 
      AND u.clave='$pass'");
    $folder = array();
    if ($queryString ->num_rows() > 0){
      $in = '('; 
        foreach($queryString->result_array() as $user){
          $in .= $user['menu'] . ","; 
        }
      $in = substr($in, 0, -1) . ")"; 
      $queryString->free_result(); 
      $sql=  $db_generica->query(" SELECT * FROM menu WHERE padre IS NULL  AND id in $in");
      if ($sql->num_rows() > 0){
        foreach($sql->result_array() as $r){
          $sqlquery =  $db_generica->query("SELECT * FROM menu WHERE padre = '".$r['id'] ."' AND id in $in");
          if ($sqlquery->num_rows() > 0){
            $count =mysql_affected_rows();
            //$count = $sqlquery->num_rows();
              if ($count>0){
              $r['leaf'] = false; 
              $r['items'] = array(); 
              foreach($sqlquery->result_array() as $item ){
                $item['leaf'] = true; 
                $r['items'][] = $item; 
              }
            }else {
              $r['leaf'] = true;
            }
            $folder[] = $r; 
          } 
        }
       return $folder;
      }
    }
  }
}