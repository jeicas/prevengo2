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
                        $estatus = 'Sin Iniciar';
                        break;
                    case '2':
                        $estatus = 'En Ejecución';
                        break;


                    default:
                        $estatus = 'Completado';
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
    }//fin Cargar Avance
    
    
     public function listaEventosSinInciar() {
           $id=1;
        $eventos = $this->evento_model->cargarListaEventoSinIniciar($id);

        if ($eventos->num_rows() > 0) {

            foreach ($eventos->result_array() as $row) {

                if ($row['estatus']==1)
                {
                    $estatus="Sin Iniciar";
                }else 
                    $estatus="Revisar Estatus";
              

                $data[] = array(
                    'id' => $row['id'],
                    'titulo' => $row['titulo'],
                    'descripcion' => $row['descripcion'],
                    'fechaEvento' => $row['fechaEv'],
                    'fechaPreAviso' => $row['fechaPA'],
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
    }//fin Cargar Avance
    
    
}//fin del controller