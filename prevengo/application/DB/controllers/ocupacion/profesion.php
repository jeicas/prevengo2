
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Profesion extends CI_Controller {
 
    public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->model('ocupacion/profesion_model');
       
    }
    public function cargarProfesion() {
        $tipolimi=array();   
        if ($tipolimi=$resultdbd=$this->profesion_model->cargarProfesion()){
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
            "success" => True,
            'data' => $tipolimi)));
        }   
    }


}