<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Lineamiento extends CI_Controller {

    public function __construct() {
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('lineamiento/lineamiento_model');
    }

    public function listaLineamiento() {
        $id = $this->input->get('id');
        $lineamiento= $this->lineamiento_model->cargarListaLineamiento($id);

        if ($lineamiento->num_rows() > 0) {

            foreach ($lineamiento->result_array() as $row) {

                $data[] = array(
                    'idLin' => $row['idLin'],
                    'idEv' => $row['idEv'],
                    'descripcion' => $row['descripcion'],
                    'fecha' => $row['fecha'],
                    'estatus' => $row['estatus'],
                );
            }
            $output = array(
                'success' => true,
                'total' => count($data),
                'data' => array_splice($data, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    }

//fin listaEventos
    
    
            public function buscarLineamiento() {
        $id = $this->input->post('id');
        $valor= $this->lineamiento_model->buscarLineamiento($id);

        if ($valor->num_rows() > 0) {

            $row = $valor->row_array(); 
            $output = array(
                'success' => true,
                'cuanto' =>  $row['cuantos'],
            );  
            echo json_encode($output);
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
       
    }//fin registrar

 
    public function registrarLineamiento() {

        $idEvento = $this->input->post('idEvento');
        $descripcion = $this->input->post('descripcion');
        $fecha= Date('Y-m-d');
        $estatus= 1;

        $data = array(
            'evento' => $idEvento,
            'descripcion' => $descripcion,
            'fecha' => $fecha,
            'estatus' => $estatus,
        );


        $result = $this->lineamiento_model->guardarLineamiento($data);

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
    }//fin registrar



 public function actualizarLineamiento() {

        $idLineam = $this->input->post('idLineam');
        $descripcion = $this->input->post('descripcion');
      
    

        $data = array(
            'id' => $idLineam,
            'descripcion' => $descripcion,
        );


        $result = $this->lineamiento_model->actualizarLineamiento($data);

        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se  actualizó con Éxito." //modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar, por favor verifique los datos suministrados" //no se modifico en la base de datos
            ));
        }
    }//fin actualizar


public function eliminarLineamiento() {

        $idLineam = $this->input->post('lin');
      
        $estatus=0;
    

        $data = array(
            'id' => $idLineam,
            'estatus' => $estatus,
        );


        $result = $this->lineamiento_model->eliminarLineamiento($data);

        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se  elimino con Éxito el lineamiento." //modificado en la base de datos
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