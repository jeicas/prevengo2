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
            
            $cantidad=$cantidad1=$cantidad2=0;
            $resultdbd1 = $this->evento_model->cargarCantidadEventoCompletadosPorTipo($row['id']);
             
            foreach ($resultdbd1->result_array() as $row1){
                
                for ($i =0; $i<count($resultdbd1); ++$i){
                    if ($row1['completado']!=0)
                    {
                         $cantidad =$row1['completado'];
                    }else{
                         if ($row1['pendiente']!=0)
                         {
                              $cantidad1 =$row1['pendiente'];
                         }
                         else 
                         {
                              if ($row1['ejecucion']!=0)
                              {
                                $cantidad2 =$row1['ejecucion'];
                              }
                         }
                    } 
                       
                }
             }
           
             
              $data[] = [
                  'cantidad' => $row['cantidad'],
                  'tipo' =>$row['id'],
                  'nombre' => $row['nombre'],
                    'estatus' => $row['estatus'], 
                    'Completado'=>$cantidad, 
                    'Pendiente'=>$cantidad1,
                    'En Ejecucion'=>$cantidad2, 
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
