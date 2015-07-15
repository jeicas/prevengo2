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
    }

    public function reportePorTipo() {
             
        $resultdbd = $this->evento_model->cargarCantidadEventoPorTipo();
        if ($resultdbd){
        foreach ($resultdbd->result_array() as $row) {
            
            
            $resultdbd1 = $this->evento_model->cargarCantidadEventoCompletadosPorTipo($row['id']);
            foreach ($resultdbd1->result_array() as $row1){
                $dat[] = array( 
                    'cantidad0' =>$row2['completado'], 
                    'cantidad1' =>$row2['pendiente'], 
                    'cantidad2' =>$row2['ejecucion'], 
                   );
             }
           
             
              $data[] = ['nombre' => $row['nombre'],
                    'estatus' => $row['estatus'], 
                    'cantidad0'=>$row1['completado'], 
                    'cantidad1'=>$row2['pendiente'],
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

}
