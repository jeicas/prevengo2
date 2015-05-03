<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Alcance extends CI_Controller
{
     public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('alcance/alcance_model');
    } 


    public function obtenerAlcance()
    {
      $resultdbd=array();
        if ($resultdbd=$this->alcance_model->cargarAlcance()){
                $output = array(
                   'success'   => true,
                   'total'     => count($resultdbd),
                   'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
                );
           echo json_encode($output);
        }
    }
    




}//fin del controller