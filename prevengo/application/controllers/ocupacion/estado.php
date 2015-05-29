<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Estado extends CI_Controller {
 
    public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->model('ocupacion/estado_model');
    }
    public function cargarEstado() {
        $estado=array();   
        if ($estado=$resultdbd=$this->estado_model->cargarestado()){
            $this->output->set_content_type('application/json');
             $this->output->set_output(json_encode(array(
            "success" => True,
            'data' => $estado)));
        }   
    }
}