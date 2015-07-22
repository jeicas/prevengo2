<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class EventoReportes extends CI_Controller {

    public function __construct() {
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('evento/evento_model');
        $this->load->model('tipoEvento/tipoevento_model');
        $this->load->model('actividad/actividad_model');
    }

    public function reportePorTipo() {

        $resultdbd = $this->evento_model->cargarCantidadEventoPorTipo();
        if ($resultdbd) {
            foreach ($resultdbd->result_array() as $row) {

                $cantidad = $cantidad1 = $cantidad2 = 0;
                $resultdbd1 = $this->evento_model->cargarCantidadEventoCompletadosPorTipo($row['id']);

                foreach ($resultdbd1->result_array() as $row1) {

                    for ($i = 0; $i < count($resultdbd1); ++$i) {
                        if ($row1['completado'] != 0) {
                            $cantidad = $row1['completado'];
                        } else {
                            if ($row1['pendiente'] != 0) {
                                $cantidad1 = $row1['pendiente'];
                            } else {
                                if ($row1['ejecucion'] != 0) {
                                    $cantidad2 = $row1['ejecucion'];
                                }
                            }
                        }
                    }
                }
                if (($cantidad + $cantidad1) > 0) {
                    $total = ($cantidad / ($cantidad + $cantidad1)) * 100;
                } else {
                    $total = 0;
                }

                $data[] = [
                    'cantidad' => $row['cantidad'],
                    'tipo' => $row['id'],
                    'nombre' => $row['nombre'],
                    'estatus' => $row['estatus'],
                    'Completado' => $cantidad,
                    'Pendiente' => $cantidad1,
                    'En Ejecucion' => $cantidad2,
                    'avance' => round($total, 2) . '%',
                ];
            }

            $output = array(
                'success' => true,
                'data' => $data,
                'total' => count($data));
            echo json_encode($output);
        } else {
            echo json_encode(array(
                "success" => false,
            ));
        }
    }

    public function calcularAvanceTotal() {
        $total = $cantidad = $cantidad1 = $cantidad2 = 0;
        // $calificacion='';
        $resultdbd = $this->tipoevento_model->contarTiposEventos();

        $resultdbd1 = $this->evento_model->cargarCantidadEventoPorTipos();
        if ($resultdbd1) {
            foreach ($resultdbd1->result_array() as $row1) {
                for ($i = 0; $i < count($resultdbd1); ++$i) {
                    if ($row1['completado'] != 0) {
                        $cantidad = $row1['completado'];
                    } else {
                        if ($row1['pendiente'] != 0) {
                            $cantidad1 = $row1['pendiente'];
                        } else {
                            if ($row1['ejecucion'] != 0) {
                                $cantidad2 = $row1['ejecucion'];
                            }
                        }
                    }
                }

                if (($cantidad + $cantidad1) > 0) {
                    $total +=($cantidad / ($cantidad + $cantidad1)) * 100;
                } else {
                    $total += 0;
                }
            }



            $avanceTotal = (round($total, 2) / $resultdbd->num_rows);

            if ($avanceTotal > 95 && $avanceTotal <= 100) {
                $calificacion = 'Excepcional';
            }
            if ($avanceTotal > 85 && $avanceTotal <= 95) {
                $calificacion = 'Destacado';
            }
            if ($avanceTotal > 75 && $avanceTotal <= 85) {
                $calificacion = 'Bueno';
            }
            if ($avanceTotal > 75 && $avanceTotal <= 65) {
                $calificacion = 'Aceptable';
            }
            if ($avanceTotal > 50 && $avanceTotal <= 65) {
                $calificacion = 'Puede Mejorar';
            }
            if ($avanceTotal > 35 && $avanceTotal <= 50) {
                $calificacion = 'Deficiente';
            }
            if ($avanceTotal >= 0 && $avanceTotal <= 35) {
                $calificacion = 'Grave';
            }


            $data[] = [
                'calificacion' => $calificacion,
                'avance' => $avanceTotal . '%',
            ];
            $output = array(
                'success' => true,
                'data' => $data,
                'total' => $avanceTotal);
            echo json_encode($output);
        } else {
            echo json_encode(array(
                "success" => false,
            ));
        }
    }

    public function calcularNivelEjecucion() {
        $id =$this->input->get('id');
        $result = $this->actividad_model->cargarCantidadPlan($id);

        if ($result->num_rows() > 0) {

            foreach ($result->result_array() as $row) {

                $data[] = array(
                     'total' => $row['total'],
                    'ejecutadas' => $row['completado'],
                    'porejecutar' => $row['completado1'],
                    'name1' => 'Acciones',
                    
                    
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

}
