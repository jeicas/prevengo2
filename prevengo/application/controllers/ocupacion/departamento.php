
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Departamento extends CI_Controller {
 
    public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->model('ocupacion/departamento_model');
        $this->load->model('ocupacion/dependencia_model');
    }
    public function cargarDepartamento() {
        $tipolimi=array();   
        if ($tipolimi=$resultdbd=$this->departamento_model->cargarDepartamento()){
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
            "success" => True,
            'data' => $tipolimi)));
        }   
    }


}