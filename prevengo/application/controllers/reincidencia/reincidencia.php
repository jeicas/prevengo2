<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Reincidencia extends CI_Controller {

    public function __construct() {
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('reincidencia/reincidencia_model');
    }

    public function listaReincidencia() {
        $id = $this->input->get('id');
        $reincidencia= $this->reincidencia_model->cargarListaReincidencia($id);

        if ($reincidencia->num_rows() > 0) {

            foreach ($reincidencia->result_array() as $row) {

                $data[] = array(
                    
                    'idEv' => $row['idEv'],
                    'descripcion' => $row['descripcion'],
                    'fecha' => $row['fecha'],
                    'idRein' => $row['idRein'],
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
    
    
      

 
    public function registrarReincidencia() {

       $idEv = $this->input->post('idEv');
       $descripcion = $this->input->post('descripcion');
       $costo= $this->input->post('costo');
       $fecha= date('Y-m-d');
       $estatus= 1;
       
        $data = array(
             'evento'     => $idEv,
             'descripcion'=> $descripcion,
             'costo'      => $costo,
             'fecha'      => $fecha,
             'estatus'    => $estatus,
        );


        $result = $this->reincidencia_model->guardarReincidencia($data);

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



 public function actualizarReincidencia() {

       $id = $this->post->input('id');
       $descripcion = $this->post->input('idEv');
       $costo= $this->post->input('idEv');
      
    

        $data = array(
            'id' => $id,
            'descripcion' => $descripcion,
        );


        $result = $this->reincidencia_model->actualizarReincidencia($data);

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


public function eliminarReincidencia() {

        $id= $this->input->post('id');
        $estatus=0;
    

        $data = array(
            'id' => $id,
            'estatus' => $estatus,
        );


        $result = $this->reincidencia_model->eliminarReincidencia($data);

        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se  elimino con Éxito el Reincidencia." //modificado en la base de datos
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