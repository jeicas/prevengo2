<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Permiso extends CI_Controller {

    public function __construct() {
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('permiso/permiso_model');
   
    }

    public function obtenerMenuConPermiso() {
        $id = $this->input->get('id');

        $resultdbd = array();
        if ($resultdbd = $this->permiso_model->cargarMenuConPermiso($id)) {
            $output = array(
                'success' => true,
                'total' => count($resultdbd),
                'data' => array_splice($resultdbd, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        }
    }

    public function guardarPermiso() {
        $menu = $this->input->post('idMenu');
        $tipousuario = $this->input->post('tipousuario');
        $padre = $this->input->post('idpadre');

        $resultPadre = $this->permiso_model->buscarPadre($padre, $tipousuario);
        if ($resultPadre->num_rows() > 0) { // ya esta guardado el padre
            $data1 = array(
                'tipousuario' => $tipousuario,
                'menu' => $menu,
            );
            $result = $this->permiso_model->guardarPermiso($data1);
            $resultP = true;
        } else {
            $data = array(
                'tipousuario' => $tipousuario,
                'menu' => $padre,
            );
            $resultP = $this->permiso_model->guardarPermiso($data);
            $data1 = array(
                'tipousuario' => $tipousuario,
                'menu' => $menu,
            );
            $result = $this->permiso_model->guardarPermiso($data1);
        }


        if ($result && $resultP) {
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

}

//fin del controller