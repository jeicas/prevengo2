<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Municipio extends CI_Controller {
 
    public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->model('ocupacion/municipio_model');

    }

       
    public function cargarMunicipio() {
        $id = $this->input->get("estado");
        $estado=array();   
        if ($estado=$resultdbd=$this->municipio_model->cargarMunicipio($id)){
            $this->output->set_content_type('application/json');
             $this->output->set_output(json_encode(array(
            "success" => True,
            'data' => $estado)));
        }   
    }
}