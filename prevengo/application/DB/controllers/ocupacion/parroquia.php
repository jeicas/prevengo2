<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Parroquia extends CI_Controller {
 
    public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->model('ocupacion/parroquia_model');

    }

       
    public function cargarParroquia() {
        $municipio = $this->input->get("municipio");
        $parroquia=array();   
        if ($parroquia=$resultdbd=$this->parroquia_model->cargarParroquia($municipio)){
            $this->output->set_content_type('application/json');
             $this->output->set_output(json_encode(array(
            "success" => True,
            'data' => $parroquia)));
        }   
    }
}