<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Agente extends CI_Controller
{
     public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('agente/agente_model');
    } 


    public function obtenerAgente()
    {
      $resultdbd=array();
        if ($resultdbd=$this->agente_model->cargarAgente()){
                $output = array(
                   'success'   => true,
                   'total'     => count($resultdbd),
                   'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
                );
           echo json_encode($output);
        }
    }
    
    public function registrarAgente()
   {
        $nombre = $this->input->post('txtNombre');
        $estatus = 1;

        $dataAgente= array(
            'nombre' => $nombre,
            'estatus' => $estatus,
        );

        $result = $this->agente_model->guardarAgente($dataAgente);

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
    
      public function actualizarAgente()
   {
        $id = $this->input->post('id');
        $nombre = $this->input->post('txtNombre');
        $estatus = 1;

        $dataAgente= array(
            'id' => $id,
            'nombre' => $nombre,
            'estatus' => $estatus,
        );

        $result = $this->agente_model->actualizarAgente($dataAgente);

        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se Actualizó con Éxito." //modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar, por favor verifique los datos suministrados" //no se modifico en la base de datos
            ));
        }
    }




}//fin del controller