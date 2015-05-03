<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class TipoEvento extends CI_Controller
{
     public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('tipoEvento/tipoEvento_model');
    } 


    public function obtenerTipoEvento()
    {
      $resultdbd=array();
        if ($resultdbd=$this->tipoEvento_model->cargarTipoEvento()){
                $output = array(
                   'success'   => true,
                   'total'     => count($resultdbd),
                   'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
                );
           echo json_encode($output);
        }
    }
    




}//fin del controller