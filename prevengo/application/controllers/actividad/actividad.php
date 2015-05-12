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
    }

//fin del constructor

    public function obtenerPlandeAccion() {
        $resultdbd = array();
        if ($resultdbd = $this->actividad_model->cargarPlandeAccion()) {
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

        $data = array(
            'id' => $id,
            'estatus' => $estatus,
        );
        $resultdbd = $this->actividad_model->cambiarEstatus($data);
        if ($resultdbd) {
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
        $resultdbd = $this->actividad_model->cargarEventosConPlandeAccion();

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
        $resultdbd = $this->actividad_model->cargarEventosPA();

        if ($resultdbd->num_rows() > 0) {
            foreach ($resultdbd->result_array() as $row) {


                $evento = "<br> <font color=#3F77E6> Evento: " . $row['evento'] . "</font>";
                $data[] = array(
                    'idEvento' => $row['idEvento'],
                    'evento' => $row['evento'],
                    'descripcion' => $row['descripcion'],
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

        $resultdbd = $this->actividad_model->cargarPlandeAccionDeEvento($id);

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
                   
                    default:
                        $estatus = 'Completado';
                        break;
                }

                if ($row['depende'] == 'NULL') {
                    $depende = 'No Aplica';
                } else {
                    $depende = $row['depende'];
                }
                $data[] = array(
                    'id' => $row['id'],
                    'descripcion' => $row['descripcion'],
                    'fecha' => $row['fecha'],
                    'fechaPA' => $row['fechaPA'],
                    'depende' => $depende,
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
        $idEv= $this->input->get('idEvent');
        $resultdbd = array();

        
        if($idAct==0){
            if ($resultdbd = $this->actividad_model->cargarActividadDependiente($idEv)) {
            $output = array(
                'success' => true,
                'total' => count($resultdbd),
                'data' => array_splice($resultdbd, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
          }
        }else {
             if ($resultdbd = $this->actividad_model->cargarActividadDependiente2($idEv,$idAct)) {
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
        $descripcion = $this->input->post('txtDescripcion');
        $usuario = 2;
        $evento = $this->input->post('lblIdEvent');
 
        $fecharegistro = date('Y-m-d');
        $fechaT = $this->input->post('dtfFechaT');
        $fechaPA = $this->input->post('dtfFechaPA');
        $estatus = 1;
        $estatusEv = 2;

        $datoAct = $this->actividad_model->buscarIdActividad($evento);
        if ($datoAct->num_rows() > 0) {
            foreach ($datoAct->result_array() as $row) {
                if ($this->input->post('cmbActividadDepende') == '' || $this->input->post('cmbActividadDepende') == null || $this->input->post('cmbActividadDepende') == 'Seleccione') {
                    $depende = null;
                } else {
                    $depende = $this->input->post('cmbActividadDepende');
                }

                $datactividad = array(
                    'id' =>$row['IdAct'],
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
            } else {
                $depende = $this->input->post('cmbActividadDepende');
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
    
    
    
        public function actualizarActividad() {
        $idAc=$this->input->post('id');
        $descripcion = $this->input->post('txtDescripcion');
        $fecharegistro = date('Y-m-d');
        $fechaT = $this->input->post('dtfFechaT');
        $fechaPA = $this->input->post('dtfFechaPA');
        $depende=$this->input->post('cmbActividadDepende'); 

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
    }//fin de la funcion
    
    
    
    
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

}//fin del controller