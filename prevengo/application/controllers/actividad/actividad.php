<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
$newVar = null;

class Actividad extends CI_Controller {

    public function __construct() {
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('actividad/actividad_model');
        $this->load->model('evento/evento_model');
        $this->load->model('avance/avance_model');
    }

//fin del constructor

    public function obtenerPlandeAccion() {
        $user = $this->session->userdata('datasession');
        $usuario = $user['idusuario'];
        $resultdbd = array();

        if ($resultdbd = $this->actividad_model->cargarPlandeAccion($usuario)) {
            $output = array(
                'success' => true,
                'total' => count($resultdbd),
                'data' => array_splice($resultdbd, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        }
    }

//fin de la funcion

    public function buscarUnPlandeAccion($idUsuario) {
        $resultdbd = array();
        if ($resultdbd = $this->actividad_model->buscarUnPlandeAccion($idUsuario)) {
            $output = array(
                'success' => true,
                'total' => count($resultdbd),
                'data' => array_splice($resultdbd, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        }
    }

    public function actualizarEstatusPlandeAccion($idActividad, $estatus) {
        $resultdbd = array();
        if ($resultdbd = $this->actividad_model->cambiarEstatus($idActividad, $estatus)) {
            $output = array(
                'success' => true,
                'total' => count($resultdbd),
                'data' => array_splice($resultdbd, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        }
    }

//fin de la funcion

    public function aprobarActividad() {
        $id = $this->input->post('record');
        $estatus = 0;
        $estatusDepende = 1;

        $data = array(
            'id' => $id,
            'estatus' => $estatus,
        );
        $dataDepende = array(
            'id' => $id,
            'estatus' => $estatusDepende,
        );

        $dataAvance = array(
            'id' => $this->input->post('idAvance'),
            'estatus' => $estatus
        );

        $resultdbd = $this->actividad_model->cambiarEstatus($data);
        $resultdbd2 = $this->actividad_model->cambiarEstatusDependientes($dataDepende);
        $resultdbd3 = $this->avance_model->cambiarEstatus($dataAvance);

        if ($resultdbd && $resultdbd2 && $resultdbd3) {
            echo json_encode(array(
                "success" => true,
                "msg" => "La actividad ha sido Completada exitosamente" //modificado en la base de datos
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo completar la actividad. Por favor verifique los datos suministrados" //no se modifico en la base de datos
            ));
        }
    }

//fin de la funcion

    public function obtenerPlandeAccionEvento() {
        $user = $this->session->userdata('datasession');
        $usuario = $user['idusuario'];
        $resultdbd = $this->actividad_model->cargarEventosConPlandeAccion($usuario);

        if ($resultdbd->num_rows() > 0) {
            foreach ($resultdbd->result_array() as $row) {
                switch ($row['estatus']) {
                    case '1':
                        $estatus = 'Sin Iniciar';
                        break;
                    case '2':
                        $estatus = 'En Ejecución';
                        break;
                    case '3':
                        $estatus = 'En Revision';
                        break;
                    case '4':
                        $estatus = 'Cancelado';
                        break;
                    case '5':
                        $estatus = 'Expirado';
                        break;

                    case '6':
                        $estatus = 'En Espera';
                        break;
                    default:
                        $estatus = 'Completado';
                        break;
                }

                $evento = "<br> <font color=#3F77E6> Evento: " . $row['evento'] . "</font>";
                $data[] = array(
                    'idEvento' => $row['idEvento'],
                    'evento' => $row['evento'],
                    'descripcion' => $row['descripcion'],
                    'fecha' => $row['fecha'],
                    'idAct' => $row['idAct'],
                    'fechaAct' => $row['fechaAct'],
                    'actividad' => $row['actividad'],
                    'estatus' => $estatus,
                    'eventoColor' => $evento,
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

//fin de la funcion

    public function obtenerEventosConPlandeAccion() {
        $user = $this->session->userdata('datasession');
        $usuario = $user['idusuario'];

        $resultdbd = $this->actividad_model->cargarEventosPA($usuario);

        if ($resultdbd->num_rows() > 0) {
            foreach ($resultdbd->result_array() as $row) {

                switch ($row['estatus']) {
                    case '1':
                        $estatus = 'Pendiente';
                        break;
                    case '2':
                        $estatus = 'En Ejecución';
                        break;
                    case '3':
                        $estatus = 'Cancelado';
                        break;
                    case '4':
                        $estatus = 'Sin Plan';
                        break;
                    case '5':
                        $estatus = 'Expirado';
                        break;

                    default:
                        $estatus = 'Completado';
                        break;
                }

                $evento = "<br> <font color=#3F77E6> Evento: " . $row['evento'] . "</font>";
                $data[] = array(
                    'idEvento' => $row['idEvento'],
                    'evento' => $row['evento'],
                    'descripcion' => $row['descripcion'],
                    'estatus' => $estatus,
                    'fecha' => $row['fecha'],
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

//fin de la funcion

    public function obtenerPlandeAccionDeEvento() {
        $id = $this->input->get('id');
        $user = $this->session->userdata('datasession');
        $usuario = $user['idusuario'];
        $resultdbd = $this->actividad_model->cargarPlandeAccionDeEvento($id, $usuario);

        if ($resultdbd->num_rows() > 0) {
            foreach ($resultdbd->result_array() as $row) {
                switch ($row['estatus']) {
                    case '1':
                        $estatus = 'Sin Iniciar';
                        break;
                    case '2':
                        $estatus = 'En Ejecución';
                        break;
                    case '3':
                        $estatus = 'En Revision';
                        break;
                    case '4':
                        $estatus = 'Cancelado';
                        break;
                    case '5':
                        $estatus = 'Expirado';
                        break;
                    case '6':
                        $estatus = 'En Espera';
                        break;

                    default:
                        $estatus = 'Completado';
                        break;
                }

                if ($row['depende'] == 'NULL') {
                    $depende = 'No Aplica';
                } else {
                    $depende = $row['depende'];
                }

                if ($row['iddepende'] == 'NULL') {
                    $idDepende = '';
                } else {
                    $idDepende = $row['iddepende'];
                }

                if ($row['observacion'] == 'no tiene observaciones') {
                    $observacion = '';
                } else {
                    $observacion = $row['observacion'];
                }


                $data[] = array(
                    'id' => $row['id'],
                    'descripcion' => $row['descripcion'],
                    'fecha' => $row['fecha'],
                    'fechaPA' => $row['fechaPA'],
                    'depende' => $depende,
                    'iddepende' => $idDepende,
                    'observacion' => $observacion,
                    'estatus' => $estatus,
                );
            }


            $output = array(
                'success' => true,
                'total' => count($data),
                'data' => array_splice($data, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        }
    }

//fin de la funcion

    public function obtenerActividadDependiente() {
        $idAct = $this->input->get('idAct');
        $idEv = $this->input->get('idEvent');
        $resultdbd = array();


        if ($idAct == 0) {
            if ($resultdbd = $this->actividad_model->cargarActividadDependiente($idEv)) {
                $output = array(
                    'success' => true,
                    'total' => count($resultdbd),
                    'data' => array_splice($resultdbd, $this->input->get("start"), $this->input->get("limit"))
                );
                echo json_encode($output);
            }
        } else {
            if ($resultdbd = $this->actividad_model->cargarActividadDependiente2($idEv, $idAct)) {
                $output = array(
                    'success' => true,
                    'total' => count($resultdbd),
                    'data' => array_splice($resultdbd, $this->input->get("start"), $this->input->get("limit"))
                );
                echo json_encode($output);
            }
        }
    }

//fin de la funcion


    public function registrarActividad() {
        $user = $this->session->userdata('datasession');
        $usuario = $user['idusuario'];

        $descripcion = $this->input->post('txtDescripcion');

        $evento = $this->input->post('lblIdEvent');

        $fecharegistro = date('Y-m-d');
        $fechaT = $this->input->post('dtfFechaT');
        $fechaPA = $this->input->post('dtfFechaPA');

        $estatusEv = 1;


        $datoAct = $this->actividad_model->buscarIdActividad($evento);
        if ($datoAct->num_rows() > 0) {
            foreach ($datoAct->result_array() as $row) {
                if ($this->input->post('cmbActividadDepende') == '' || $this->input->post('cmbActividadDepende') == null || $this->input->post('cmbActividadDepende') == 'Seleccione') {
                    $depende = null;
                    $estatus = 1;
                } else {
                    $depende = $this->input->post('cmbActividadDepende');
                    $estatus = 6;
                }

                $datactividad = array(
                    'id' => $row['IdAct'],
                    'usuario' => $usuario,
                    'evento' => $evento,
                    'descripcion' => $descripcion,
                    'fecharegistro' => $fecharegistro,
                    'fechaaviso' => $fechaPA,
                    'fechatope' => $fechaT,
                    'actividadepende' => $depende,
                    'estatus' => $estatus,
                );

                $dataEvento = array(
                    'id' => $evento,
                    'estatus' => $estatusEv,
                );
                $result = $this->actividad_model->actualizarDataActividad($datactividad);
                $resultEve = $this->evento_model->cambiarEstatus($dataEvento);
            }
        } else {
            if ($this->input->post('cmbActividadDepende') == '' || $this->input->post('cmbActividadDepende') == null || $this->input->post('cmbActividadDepende') == 'Seleccione') {
                $depende = null;
                $estatus = 1;
            } else {
                $depende = $this->input->post('cmbActividadDepende');
                $estatus = 6;
            }
            $datactividad = array(
                'usuario' => $usuario,
                'evento' => $evento,
                'descripcion' => $descripcion,
                'fecharegistro' => $fecharegistro,
                'fechaaviso' => $fechaPA,
                'fechatope' => $fechaT,
                'actividadepende' => $depende,
                'estatus' => $estatus,
            );

            $dataEvento = array(
                'id' => $evento,
                'estatus' => $estatusEv,
            );
            $result = $this->actividad_model->guardarActividad($datactividad);
            $resultEve = $this->evento_model->cambiarEstatus($dataEvento);
        }



        if ($result and $resultEve) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se Guardo con Éxito." . $usuario //modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar, por favor verifique los datos suministrados" //no se modifico en la base de datos
            ));
        }
    }

//registrarActividad



    public function actualizarActividad() {
        $idAc = $this->input->post('id');
        $descripcion = $this->input->post('txtDescripcion');
        $fecharegistro = date('Y-m-d');
        $fechaT = $this->input->post('dtfFechaT');
        $fechaPA = $this->input->post('dtfFechaPA');


        if ($this->input->post('cmbActividadDepende') == '' || $this->input->post('cmbActividadDepende') == null || $this->input->post('cmbActividadDepende') == 'Seleccione') {
            $depende = null;
        } else {
            $depende = $this->input->post('cmbActividadDepende');
        }
        $dataEvento = array(
            'id' => $idAc,
            'descripcion' => $descripcion,
            'fecharegistro' => $fecharegistro,
            'fechaaviso' => $fechaPA,
            'fechatope' => $fechaT,
            'actividadepende' => $depende,
        );

        $result = $this->actividad_model->actualizarDataActividad($dataEvento);

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

    public function asignarEmpleado() {

        $evento = $this->input->post('event');
        $usuario = $this->input->post('user');
        $estatus = 1;


        $datactividad = array(
            'usuario' => $usuario,
            'evento' => $evento,
            'estatus' => $estatus,
        );


        $result = $this->actividad_model->guardarActividad($datactividad);

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

//registrarActividad

    public function reAsignarEmpleado() {

        $evento = $this->input->post('event');
        $usuario = $this->input->post('user');


        $datactividad = array(
            'usuario' => $usuario,
            'evento' => $evento,
        );


        $result = $this->actividad_model->actualizarActividad($datactividad);

        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se reasignó el responsable con Éxito." //modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar, por favor verifique los datos suministrados" //no se modifico en la base de datos
            ));
        }
    }

//registrarActividad

    public function obtenerEmpleadosConPlan() {
        $id = $this->input->get('id');
        $resultdbd = array();

        if ($resultdbd = $this->actividad_model->cargarActividadDependiente($id)) {
            $output = array(
                'success' => true,
                'total' => count($resultdbd),
                'data' => array_splice($resultdbd, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        }
    }

//fin de la funcion

    public function cancelarActividad() {

        $observacion = $this->input->post('observacion');
        $idActividad = $this->input->post('idActividad');
        $estatus = 4;



        $dataEvento = array(
            'id' => $idActividad,
            'observacion' => $observacion,
            'estatus' => $estatus
        );


        $result = $this->actividad_model->actualizarDataActividad($dataEvento);

        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se cancelo la actividad con Éxito." //modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar, por favor verifique los datos suministrados" //no se modifico en la base de datos
            ));
        }
    }

    public function listaActivadesAvancesPorEvento() {
        $id = $this->input->get('id');
        $eventos = $this->actividad_model->eventoActividadAvance($id);

        if ($eventos->num_rows() > 0) {

            foreach ($eventos->result_array() as $row) {

                switch ($row['actEstatus']) {
                    case '1':
                        $estatus = "<font color=#2E9AFE> Pendiente </font>";
                        break;
                    case '2':
                        $estatus = '<font color=#FF8000> En Ejecución  </font>';
                        break;
                    case '3':
                        $estatus = '<font color=#DF01D7> En Revisión  </font>';
                        break;
                    case '4':
                        $estatus = '<font color=#FF0000> Cancelado  </font>';
                        break;
                    case '5':
                        $estatus = '<font color=#FF0000> Expirado  </font>';
                        break;
                    case '6':
                        $estatus = 'En Espera';
                        break;

                    default:
                        $estatus = '<font color=#01DF3A> Completado </font>';
                        break;
                }


                switch ($row['tipoAvance']) {
                    case '1':
                        $tipoE = "Parcial";
                        break;
                    case '2':
                        $tipoE = ' ';
                        break;

                    default:
                        $tipoE = 'Final';
                        break;
                }

                $data[] = array(
                    'idAct' => $row['idAct'],
                    'actividad' => " Plan de Accion:" . $row['actDescripcion'] . " <br> <font color=#3F77E6> Estado: " . $estatus . "</font></br>",
                    'responsable' => $row['nombreAct'] . " " . $row['apellidoAct'],
                    'avance' => $row['avDescripcion'],
                    'tipoEvento' => $tipoE,
                    'fecha' => $row['fecha'],
                    'ejecutor' => $row['nombreAva'] . " " . $row['apellidoAva'],
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
            $output = array(
                'success' => true,
            );

            echo json_encode($output);
        }
    }

    public function listaActivadesAvancesPorEvento2() {
        $id = $this->input->get('id');
        $eventos = $this->actividad_model->eventoActividadAvance2($id);

        if ($eventos->num_rows() > 0) {

            foreach ($eventos->result_array() as $row) {

                switch ($row['actEstatus']) {
                    case '1':
                        $estatus = "<font color=#2E9AFE> Pendiente </font>";
                        break;
                    case '2':
                        $estatus = '<font color=#FF8000> En Ejecución  </font>';
                        break;
                    case '3':
                        $estatus = '<font color=#DF01D7> En Revisión  </font>';
                        break;
                    case '4':
                        $estatus = '<font color=#FF0000> Cancelado  </font>';
                        break;
                    case '5':
                        $estatus = '<font color=#FF0000> Expirado  </font>';
                        break;
                    case '6':
                        $estatus = 'En Espera';
                        break;

                    default:
                        $estatus = '<font color=#01DF3A> Completado </font>';
                        break;
                }


                switch ($row['tipoAvance']) {
                    case '1':
                        $tipoE = "Parcial";
                        break;
                    case '0':
                        $tipoE = 'Final';
                        break;

                    default:
                        $tipoE = '';
                        break;
                }

                if ($row['nombreAva'] && $row['apellidoAva'] == 'NULL') {
                    $ejecutor = '';
                } else {
                    $ejecutor = $row['nombreAva'] . " " . $row['apellidoAva'];
                }

                if ($row['actDescripcion'] == 'NULL') {
                    $descripcion = '';
                } else {
                    $descripcion = $row['actDescripcion'];
                }

                if ($row['actDescripcion'] == 'NULL') {
                    $descripcion = '';
                } else {
                    $descripcion = $row['actDescripcion'];
                }
                
                 if ($row['fecha'] == 'NULL') {
                    $fecha = '';
                } else {
                    $fecha = $row['fecha'];
                }
                
                $data[] = array(
                    'idAct' => $row['idAct'],
                    'actividad' => " Plan de Accion:" . $descripcion . " <br> <font color=#3F77E6> Estado: " . $estatus . "</font></br>",
                    'responsable' => $row['nombreAct'] . " " . $row['apellidoAct'],
                    'avance' => $row['avDescripcion'],
                    'tipoEvento' => $tipoE,
                    'fecha' => $fecha,
                    'ejecutor' => $ejecutor,
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
            $output = array(
                'success' => true,
            );
            echo json_encode($output);
        }
    }

}

//fin del controller