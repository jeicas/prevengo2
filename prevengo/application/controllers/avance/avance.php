



<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
   
   

class Avance extends CI_Controller
{
     


     public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('avance/avance_model');
        $this->load->model('actividad/actividad_model');
                 } 


    public function registrarAvance()
    {
            $actividad=$this->input->post('cmbActividad');
            $usuario=3;
            $tipo= $this->input->post('cmbTipoAvance');
            $costo= $this->input->post('txtCosto');
            $fecharegistro = date('Y-m-d');
            $descripcion=$this->input->post('txtDescripcion');
            $estatus=0;
           //busca los datos de la actividad.
         $resultadoAct=$this->actividad_model->buscarUnPlandeAccion($usuario, $actividad);
         if($resultadoAct->num_rows()>0)
         {
                foreach ($resultadoAct->result_array() AS $row) {
                  if ($tipo==0) //tipo final
                    {
                          $estatusAct=3;// en Revision
                         

                             if($row['estatus']==1){
                                    $dataAvance = array(
                                                      'id'       => $row['avance'],
                                                      'descripcion'    =>  $descripcion,             
                                                      'fecharegistro'  =>  $fecharegistro,
                                                      'fechaasignacion'=>  $row["fechaasignacion"], 
                                                      'tipo'           =>  $tipo,
                                                      'costo'          =>  $costo,
                                                      'estatus'        =>  $estatus,
                                                        );
                                         $resultado=$this->avance_model->actualizarAvance($dataAvance);
                                         $result=true;
                             } //if row
                             else 
                              {
                                 $dataAvance = array('actividad'    =>  $actividad,
                                                     'usuario'      =>  $usuario,
                                                     'descripcion'    =>  $descripcion,
                                                     'fechaasignacion'=>  $row["fechaasignacion"],              
                                                     'fecharegistro'  =>  $fecharegistro,
                                                     'tipo'           =>  $tipo,
                                                     'costo'          =>  $costo,
                                                     'estatus'        =>  $estatus,

                                                        );
                                                                        
                                       $result=$this->avance_model->guardarAvance($dataAvance);
                                       $resultado=true;
                                      
                              }//else row
                               
                         
                                       
                         //Actualiza el estatus de la actividad a "En Revision"       
                      $dataActividad = array('id'    =>  $actividad,
                                             'estatus'       =>  $estatusAct,
                                              );
                      $resultad=$this->actividad_model->cambiarEstatus($dataActividad);
                   
                    }// iftipo
                   else { //tipo parcial
                         if($row['estatus']==1){
                                $dataAvance = array('id'       => $row['avance'],
                                                  'descripcion'    =>  $descripcion,             
                                                  'fecharegistro'  =>  $fecharegistro,
                                                  'fechaasignacion'=>  $row["fechaasignacion"], 
                                                  'tipo'           =>  $tipo,
                                                  'costo'          =>  $costo,
                                                  'estatus'        =>  $estatus,
                                                    );

                                     $estatusAct=2;
                                    //Actualiza el estatus de la actividad a "En Ejecucion"   
                                   $dataActividad = array('id'    =>  $actividad,
                                                          'estatus'        =>  $estatusAct,
                                         );
                                     $resultad=$this->actividad_model->cambiarEstatus($dataActividad);
                                     $resultado=$this->avance_model->actualizarAvance($dataAvance);
                                     $result= true;

                         } //if row
                         else 
                          {
                              $dataAvance = array('actividad'   =>  $actividad,
                                                 'usuario'      =>  $usuario,
                                                 'descripcion'    =>  $descripcion,
                                                 'fechaasignacion'=>  $row["fechaasignacion"],              
                                                 'fecharegistro'  =>  $fecharegistro,
                                                 'tipo'           =>  $tipo,
                                                 'costo'          =>  $costo,
                                                 'estatus'        =>  $estatus,

                                                    );
                                                        
                                                                    
                                   $result=$this->avance_model->guardarAvance($dataAvance);
                                   $resultad=true;
                                   $resultado=true;
                          }//else row

                     }// else tipo 
                } //foreach
                    
               
            }//if ResultadoAct  
         


                  
                      if($result AND $resultad AND $resultado){
                           echo json_encode(array(
                           "success"   => true,
                            "msg"       => "Se Guardo con Éxito." //modificado en la base de datos
                           ));
                          }
                   

                      else{
                            
                         echo json_encode(array(
                          "success"   => false,
                          "msg"       => "No se pudo Guardar" //no se modifico en la base de datos
                                ));
                       }


    }//registrarAvance



    public function cargarGridAvance()
    {


      $avances=$this->avance_model->consultarListaAvance();

         if($avances->num_rows()>0){

            foreach ($avances->result_array() as $row){

              if ($row['tipo']==0){
                $tipo='Final';
              }
                
              else{
                $tipo='Parcial';
              }
                
             $eventAct="  Actividad: ".$row['actividad']."<br> <font color=#3F77E6> Evento: ".$row['evento']."</font></br>";

                $data[] = array(  
                            'actividad'   => $eventAct,                  
                            'descripcion' => $row['descripcion'],
                            'tipo'        => $tipo,
                            'fecha'       => $row['fecha'],
                            'nombre'      => $row['nombre'],
                            'apellido'    => $row['apellido'],

                );
            }
            $output = array(
               'success'   => true,
               'total'     => count($data),
               'data'      => array_splice($data,$this->input->get("start"),$this->input->get("limit"))
           );
           echo json_encode($output);
        }else{
            echo json_encode(array(
                "success"   => false
                ));
        }
    } //fin Cargar Avance  





    public function cargarAvanceFinal()
    {


      $avances=$this->avance_model->consultarListaAvanceFinal();

         if($avances->num_rows()>0){
             
            foreach ($avances->result_array() as $row){
              $tipo='Final';
              $event="<font color=#3F77E6> Evento: ".$row['evento']."</font>";
                $data[] = array(
                            'id'       => $row['id'], 
                            'idAv'        => $row['idAv'], 
                            'evento'      => $event,
                            'actividad'   => $row['actividad'],                  
                            'descripcion' => $row['descripcion'],
                            'tipo'        => $tipo,
                            'fecha'       => $row['fecha'],
                            'nombre'      => $row['nombre'],
                            'apellido'    => $row['apellido'],
                );
            }
            $output = array(
               'success'   => true,
               'total'     => count($data),
               'data'      => array_splice($data,$this->input->get("start"),$this->input->get("limit"))
           );
           echo json_encode($output);
        }else{
            echo json_encode(array(
                "success"   => false,
                "msg" => "No hay datos para mostrar"
                ));
        }
    } //fin Cargar Avance final

 
     public function rechazarAvance()
    {
       
         $idAct = $this->input->post('record');
         $id= $this->input->post('idAvance');
         $estatus=3; // rechazar la actividad
         $estatusAct=2; 
            $data = array(  
                            'id'      => $id,                  
                            'estatus' => $estatus,
                );
            
            $data2 = array(  
                            'id'      => $idAct,                  
                            'estatus' => $estatusAct,
                );
            
         $resultdAv=$this->avance_model->cambiarEstatus($data);
         $resultdAct=$this->actividad_model->cambiarEstatus($data2);
         
                    if($resultdAv and $resultdAct){
                                echo json_encode(array(
                                    "success"   => true,
                                    "msg"       => "El avance esta ha sido rechazado exitosamente." //modificado en la base de datos
                                ));
                                    }
                 else{
                                echo json_encode(array(
                                    "success"   => false,
                                    "msg"       => "No se pudo rechazar el avance." //no se modifico en la base de datos
                                        ));
                                }
    }

}//fin del controller