<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class TipoCargo extends CI_Controller {
 
    public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->model('ocupacion/tipocargo_model');
    }
    public function cargarTipoCargo() {
        $tipolimi=array();   
        if ($tipolimi=$resultdbd=$this->tipocargo_model->cargarTipoCargo()){
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
            "success" => True,
            'data' => $tipolimi)));
        }   
    }
}