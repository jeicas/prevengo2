<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Evento extends CI_Controller {

    public function __construct() {
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('evento/evento_model');
    }

    public function listaEventos() {

        $eventos = $this->evento_model->cargarListaEvento();

        if ($eventos->num_rows() > 0) {

            foreach ($eventos->result_array() as $row) {

                 switch ($row['estatus']) {
                    case '1':
                        $estatus = "<font color=#2E9AFE> Pendiente </font>";
                        break;
                    case '2':
                        $estatus = '<font color=#FF8000> En Ejecución  </font>';
                        break;
                    case '3':
                        $estatus = '<font color=#DF01D7> Cancelado  </font>';
                        break;
                    case '4':
                        $estatus = '<font color=#FF0000> Sin Plan </font>';
                        break;
                     case '5':
                        $estatus = '<font color=#FF0000> Expirado  </font>';
                        break;

                    default:
                        $estatus = '<font color=#01DF3A> Completado </font>';
                        break;
                }

                if ($row['nombre'] == NULL && $row['apellido'] == NULL) {
                    $nombre = " Por Asignar";
                  
                } else {
                    $nombre = $row['nombre'] . " " . $row['apellido'];
                    
                }


                $data[] = array(
                    'idEv' => $row['idEv'],
                    'titulo' => $row['titulo'],
                    'descripcion' => $row['descripcion'],
                    'fechaEvento' => $row['fechaEv'],
                    'fechaPreAviso' => $row['fechaPA'],
                    'agente' => $row['agente'],
                    'tipoEvento' => $row['tipoEv'],
                    'alcance' => $row['alcance'],
                    'sector' => $row['sector'],
                    'presupuesto' => $row['presupuesto'],
                    'nombrecompleto' => $nombre,
                    'estatus' => $estatus,
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


    public function listaEventoTodo() {

        $eventos = $this->evento_model->cargarListaEventoTodo();

        if ($eventos->num_rows() > 0) {

            foreach ($eventos->result_array() as $row) {

                switch ($row['estatus']) {
                    case '1':
                        $estatus = "<font color=#2E9AFE> Pendiente </font>";
                        break;
                    case '2':
                        $estatus = '<font color=#FF8000> En Ejecución  </font>';
                        break;
                    case '3':
                        $estatus = '<font color=#DF01D7> Cancelado  </font>';
                        break;
                    case '4':
                        $estatus = '<font color=#FF0000> Sin Plan </font>';
                        break;
                     case '5':
                        $estatus = '<font color=#FF0000> Expirado  </font>';
                        break;

                    default:
                        $estatus = '<font color=#01DF3A> Completado </font>';
                        break;
                }



                $data[] = array(
                    'idEv' => $row['idEv'],
                    'titulo' => $row['titulo'],
                    'descripcion' => $row['descripcion'],
                    'fechaEvento' => $row['fechaEv'],
                    'fechaPreAviso' => $row['fechaPA'],
                    'agente' => $row['agente'],
                    'tipoEvento' => $row['tipoEv'],
                    'alcance' => $row['alcance'],
                    'sector' => $row['sector'],
                    'presupuesto' => $row['presupuesto'],
                    'estatus' => $estatus,
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

    public function listaEventoResponsable() {

        $eventos = $this->evento_model->cargarListaEventosResponsable();

        if ($eventos->num_rows() > 0) {

            foreach ($eventos->result_array() as $row) {

                switch ($row['estatus']) {
                    case '1':
                        $estatus = 'Pendiente';
                        break;
                    case '2':
                        $estatus = 'En Ejecución';
                        break;
                     case '4':
                        $estatus = 'Sin Plan';
                        break;
                    
                    default:
                        
                        $estatus = 'Completado';
                        break;
                }

                if ($row['nombre'] == NULL && $row['apellido'] == NULL) {
                    $nombre = "<font color=#FF0000> Por Asignar </font>";
                    $cedula = $row['cedula'];
                } else {
                    $nombre = $row['nombre'] . " " . $row['apellido'];
                    $cedula = $row['nacionalidad'] . "-" . $row['cedula'];
                }




                $data[] = array(
                    'idEv' => $row['idEvent'],
                    'idUs' => $row['idUsuario'],
                    'titulo' => $row['titulo'],
                    'descripcion' => $row['descripcion'],
                    'fechaEvento' => $row['fechaEv'],
                    'cedula' => $cedula,
                    'nombrecompleto' => $nombre,
                    'cargo' => $row['cargo'],
                    'foto' => $row['foto'],
                    'ente' => $row['ente'],
                    'division' => $row['division'],
                    'estatus' => $estatus,
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

//fin 

    public function registrarEvento() {

        $titulo = $this->input->post('txtTitulo');
        $descripcion = $this->input->post('txtDescripcion');
        $presupuesto = $this->input->post('txtPresupuesto');
        $usuario = 1;
        $fecharegistro = date('Y-m-d');
        $fechaT = $this->input->post('dtfFechaT');
        $fechaPA = $this->input->post('dtfFechaPA');
        $estatus = 4;
        $agente = $this->input->post('cmbAgente');
        $alcance = $this->input->post('cmbAlcance');
        $tipoEvento = $this->input->post('cmbTipoEvento');
        $sector = $this->input->post('cmbSector');



        $dataEvento = array(
            'agente' => $agente,
            'alcance' => $alcance,
            'tipoevento' => $tipoEvento,
            'sector' => $sector,
            'usuario' => $usuario,
            'titulo' => $titulo,
            'descripcion' => $descripcion,
            'presupuesto' => $presupuesto,
            'fecharegistro' => $fecharegistro,
            'fechatope' => $fechaT,
            'fechapreaviso' => $fechaPA,
            'estatus' => $estatus,
        );


        $result = $this->evento_model->guardarEvento($dataEvento);

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

//fin Cargar Avance

    public function cancelarEvento() {

        $observacion = $this->input->post('observacion');
        $idEvento = $this->input->post('idEvento');
        $estatus = 3;



        $dataEvento = array(
            'id' => $idEvento,
            'observacion' => $observacion,
            'estatus' => $estatus
        );


        $result = $this->evento_model->actualizarEvento($dataEvento);

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

//fin cancelarEvento

    public function actualizarEvento() {
        $id = $this->input->post('txtIdEvento');
        $titulo = $this->input->post('txtTitulo');
        $descripcion = $this->input->post('txtDescripcion');
        $presupuesto = $this->input->post('txtPresupuesto');
        $fechaT = $this->input->post('dtfFechaT');
        $fechaPA = $this->input->post('dtfFechaPA');
        $agente = $this->input->post('cmbAgente');
        $alcance = $this->input->post('cmbAlcance');
        $tipoEvento = $this->input->post('cmbTipoEvento');
        $sector = $this->input->post('cmbSector');



        $dataEvento = array(
            'id' => $id,
            'agente' => $agente,
            'alcance' => $alcance,
            'tipoevento' => $tipoEvento,
            'sector' => $sector,
            'titulo' => $titulo,
            'descripcion' => $descripcion,
            'presupuesto' => $presupuesto,
            'fechatope' => $fechaT,
            'fechapreaviso' => $fechaPA,
        );

        $result = $this->evento_model->actualizarEvento($dataEvento);

        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se Actualizó con Éxito." //modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Actualizar, por favor verifique los datos suministrados" //no se modifico en la base de datos
            ));
        }
    }

//fin Cargar Avance
}

//fin del controller