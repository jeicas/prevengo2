<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class TipoUsuario extends CI_Controller
{
     public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('tipoUsuario/tipoUsuario_model');
        $this->load->model('menu/menu_model');
    } 


    public function obtenerTipoUsuario()
    {
      $resultdbd=array();
        if ($resultdbd=$this->tipoUsuario_model->cargarTipoUsuario()){
                $output = array(
                   'success'   => true,
                   'total'     => count($resultdbd),
                   'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
                );
           echo json_encode($output);
        }
    }
    
      public function obtenerMenu()
    {
      $resultdbd=array();
        if ($resultdbd=$this->menu_model->cargarMenu()){
                $output = array(
                   'success'   => true,
                   'total'     => count($resultdbd),
                   'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
                );
           echo json_encode($output);
        }
    }
    
      public function registrarTipoUsuario()
   {
        $nombre = $this->input->post('txtNombre');
        $estatus = 1;

        $data= array(
            'nombre' => $nombre,
            'estatus' => $estatus,
        );

        $result = $this->tipoUsuario_model->guardarTipoUsuario($data);

        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se Guardo con Éxito." //modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar, por favor verifique los datos suministrados" //no se modifico en la base de datos
            ));
        }
    }
    
    




}//fin del controller