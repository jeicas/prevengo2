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
        $this->load->model('anexo/anexo_model');
    }

    public function listaReincidencia() {
        $id = $this->input->get('id');
        $reincidencia = $this->reincidencia_model->cargarListaReincidencia($id);

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

    public function buscarReincidencia() {
        $id = $this->input->post('id');
        $valor = $this->reincidencia_model->buscarReincidencia($id);

        if ($valor->num_rows() > 0) {

            $row = $valor->row_array();
            $output = array(
                'success' => true,
                'cuanto' => $row['cuantos'],
            );
            echo json_encode($output);
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    }

//fin registrar
    
        public function guardar_Imagen_Reincidencia($nombrefoto,$fotoType,$fotoTmp_name){        
        if ($fotoTmp_name  == '') {
            echo ('foto obligatoria');
        } else if ($fotoTmp_name != '' && ($fotoType == "image/gif" || $fotoType== "image/jpeg" || $fotoType== "image/png")) {
            $img_tipo   = explode('/', $fotoType);
            $img_nombre = $nombrefoto.".".$img_tipo[1];
            move_uploaded_file($fotoTmp_name,'anexosReincidencia/'.$img_nombre);
        }
    }

    public function registrarReincidencia() {

        $idEv = $this->input->post('lblIdEv');
        $descripcion = $this->input->post('txtDescripcion');
        $costo = $this->input->post('txtCosto');
        $fecha = date('Y-m-d');
        $estatus = 1;
       $resultFoto=false;
       
        $data = array(
            'evento' => $idEv,
            'descripcion' => $descripcion,
            'costo' => $costo,
            'fecha' => $fecha,
            'estatus' => $estatus,
        );

        $result = $this->reincidencia_model->guardarReincidencia($data);

         
            $config['upload_path'] = './imagen/foto';
            $config['allowed_types'] = 'gif|jpg|png|pdf';
            $this->load->library('upload', $config);
            $fotoocul=$this->input->post('btnSubirArchivo');
            
                 $img_tipo       = explode('/', $_FILES[$fotoocul]['type']);
                    $nombrefoto     = "_AneRein".$result;
                    $nombrefoto2    = '_AneRein'.".".$img_tipo[1];
                    $fotoType       = $_FILES['btnSubirArchivo']['type'];
                    $fotoTmp_name   = $_FILES['btnSubirArchivo']['tmp_name'];
                    $this->guardar_Imagen_Reincidencia($nombrefoto,$fotoType,$fotoTmp_name);  
                    
        if ($fotoocul != '') {
            $dataAnexo = array(
                'reincidencia' => $result,
                'direccion' => substr($fotoocul, 12),
                'tipoarchivo' => substr($fotoocul, -3),
                'estatus' => 1
            );
            $resultFoto = $this->anexo_model->guardarAnexo($dataAnexo);
        }




        if ($resultFoto) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se Guardo con Éxito." .$resultFoto//modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar, por favor verifique los datos suministrados". $resultFoto //no se modifico en la base de datos
            ));
        }
    }

//fin registrar

    public function actualizarReincidencia() {

        $id = $this->post->input('id');
        $descripcion = $this->post->input('idEv');
        $costo = $this->post->input('idEv');



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
    }

//fin actualizar

    public function eliminarReincidencia() {

        $id = $this->input->post('id');
        $estatus = 0;


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