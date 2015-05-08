<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Comisionado extends CI_Controller {

    public function __construct() {
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('comisionado/comisionado_model');
    }

    public function listaComisionado() {
        $id = $this->input->get('id');
        $comisionado= $this->comisionado_model->cargarListaComisionado($id);

        if ($comisionado->num_rows() > 0) {

            foreach ($comisionado->result_array() as $row) {

                $data[] = array(
                    'idCom' => $row['idCom'],
                    'idUs' => $row['idEmpl'],
                    'idEv' => $row['idEv'],
                    'nombrecompleto' => $row['nombre']." ".$row['apellido'],
                    'foto' => $row['foto'],
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
    
    
      

 
    public function registrarComisionado() {

        $idEvento = $this->input->post('idEv');
        $idUsuario = $this->input->post('idUs');
        $estatus =1;
        
        $data = array(
            'evento' => $idEvento,
            'empleado' => $idUsuario,
            'estatus' => $estatus,
        );


        $result = $this->comisionado_model->guardarComisionado($data);

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



 public function actualizarComisionado() {

        $idLineam = $this->input->post('idLineam');
        $descripcion = $this->input->post('descripcion');
      
    

        $data = array(
            'id' => $idLineam,
            'descripcion' => $descripcion,
        );


        $result = $this->lineamiento_model->actualizarComisionado($data);

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


public function eliminarComisionado() {

        $idLineam = $this->input->post('lin');
      
        $estatus=0;
    

        $data = array(
            'id' => $idLineam,
            'estatus' => $estatus,
        );


        $result = $this->lineamiento_model->eliminarComisionado($data);

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