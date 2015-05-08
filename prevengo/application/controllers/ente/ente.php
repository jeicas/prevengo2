<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ente extends CI_Controller
{
     public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('ente/ente_model');
    } 


    public function obtenerEnte()
    {
      $resultdbd=array();
        if ($resultdbd=$this->ente_model->cargarEnte()){
                $output = array(
                   'success'   => true,
                   'total'     => count($resultdbd),
                   'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
                );
           echo json_encode($output);
        }
    }
    




}//fin del controller