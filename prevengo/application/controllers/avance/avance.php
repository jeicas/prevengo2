
<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Avance extends CI_Controller {

    public function __construct() {
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('avance/avance_model');
        $this->load->model('actividad/actividad_model');
        $this->load->model('evento/evento_model');
         $this->load->model('anexo/anexo_model');
    }
  public function guardar_Imagen_Anexo($nombrefoto, $fotoType, $fotoTmp_name) {
        if ($fotoTmp_name == '') {
            echo ('foto obligatoria');
        } else if ($fotoTmp_name != '' && ($fotoType == "image/gif" || $fotoType == "image/jpeg" || $fotoType == "image/png")) {
            $img_tipo = explode('/', $fotoType);
            $img_nombre = $nombrefoto . "." . $img_tipo[1];
            move_uploaded_file($fotoTmp_name, 'anexosAvance/' . $img_nombre);
        }
    }
    public function registrarAvance() {
       $user=$this->session->userdata('datasession');
         $usuario = $user['idusuario'];

        $actividad = $this->input->post('cmbActividad');
    
        $tipo = $this->input->post('cmbTipoAvance');
        $costo = $this->input->post('txtCosto');
        $fecharegistro = date('Y-m-d');
        $descripcion = $this->input->post('txtDescripcion');
        $estatusEv=2;
        //busca los datos de la actividad.
        $resultadoAct = $this->actividad_model->buscarUnPlandeAccion($usuario, $actividad);
        if ($resultadoAct->num_rows() > 0) {
            foreach ($resultadoAct->result_array() AS $row) {
                if ($tipo == 0) { //tipo final
                    $estatusAct = 3; // en Revision
                     $estatus = 5;//pendiente por evaluar
                    if ($row['estatus'] == 1) { //actividad con estatus sin iniciar
                        $dataAvance = array(
                            'id' => $row['avance'],
                            'descripcion' => $descripcion,
                            'fecharegistro' => $fecharegistro,
                            'fechaasignacion' => $row["fechaasignacion"],
                            'tipo' => $tipo,
                            'costo' => $costo,
                            'estatus' => $estatus,
                        );
                          $result = $this->avance_model->actualizarAvance($dataAvance);
                          $idAvance=$row['avance'];
                       
                    } //if row
                    else {
                        $dataAvance = array('actividad' => $actividad,
                            'usuario' => $usuario,
                            'descripcion' => $descripcion,
                            'fechaasignacion' => $row["fechaasignacion"],
                            'fecharegistro' => $fecharegistro,
                            'tipo' => $tipo,
                            'costo' => $costo,
                            'estatus' => $estatus,
                        );

                       $idAvance = $this->avance_model->guardarAvance($dataAvance);
                       if ($idAvance!=0){
                           $result= true;
                       }
                       else {
                           $result=false;
                       }
                      
                    }//else row
                    //Actualiza el estatus de la actividad a "En Revision"       
                    $dataActividad = array('id' => $actividad,
                        'estatus' => $estatusAct,
                    );
                    $resultad = $this->actividad_model->cambiarEstatus($dataActividad);
                }// iftipo
                else { //tipo parcial
                    $estatus=0;
                    if ($row['estatus'] == 1) {
                        $dataAvance = array('id' => $row['avance'],
                            'descripcion' => $descripcion,
                            'fecharegistro' => $fecharegistro,
                            'fechaasignacion' => $row["fechaasignacion"],
                            'tipo' => $tipo,
                            'costo' => $costo,
                            'estatus' => $estatus,
                        );

                        $estatusAct = 2;
                        //Actualiza el estatus de la actividad a "En Ejecucion"   
                        $dataActividad = array('id' => $actividad,
                            'estatus' => $estatusAct,
                        );
                        $resultad = $this->actividad_model->cambiarEstatus($dataActividad);
                         $result = $this->avance_model->actualizarAvance($dataAvance);
                       $idAvance=$row['avance'];
                    } //if row
                    else {
                        $dataAvance = array('actividad' => $actividad,
                            'usuario' => $usuario,
                            'descripcion' => $descripcion,
                            'fechaasignacion' => $row["fechaasignacion"],
                            'fecharegistro' => $fecharegistro,
                            'tipo' => $tipo,
                            'costo' => $costo,
                            'estatus' => $estatus,
                        );


                        $idAvance = $this->avance_model->guardarAvance($dataAvance);
                        $resultad = true;
                         if ($idAvance!=0){
                           $result= true;
                       }
                       else {
                           $result=false;
                       }
                       
                    }//else row
                }// else tipo 
                
                 $dataEvento = array('id' => $row["evento"],
                            'estatus' => $estatusEv,
                );
                    $resultadoEv = $this->evento_model->cambiarEstatus($dataEvento);
            } //foreach
        }//if ResultadoAct  
                    
               
    if ($this->input->post('txtSeleccion') == 1 || $this->input->post('txtSeleccion') == 2) {
            if ($this->input->post('txtSeleccion') == 2) {

                $img_tipo = explode('/', $_FILES['txtArchivo']['type']);
                $nombrefoto = "_AneAva" . $idAvance;
                $nombrefoto2 = '_AneAva' . "." . $img_tipo[1];
                $fotoType = $_FILES['txtArchivo']['type'];
                $fotoTmp_name = $_FILES['txtArchivo']['tmp_name'];
                $this->guardar_Imagen_Anexo($nombrefoto, $fotoType, $fotoTmp_name);

                $dataAnexo = array(
                    'avance' => $result,
                    'direccion' => $nombrefoto,
                    'tipoarchivo' => substr($_FILES['txtArchivo']['name'], -3),
                    'estatus' => 1
                );
                $resultFoto = $this->anexo_model->guardarAnexo($dataAnexo);
            } else {

                $dataAnexo = array(
                    'avance' => $result,
                    'direccion' => $this->input->post('txtDireccion'),
                    'tipoarchivo' => 'html',
                    'estatus' => 1
                );
                $resultFoto = $this->anexo_model->guardarAnexo($dataAnexo);
            }
        } else {
            if ($result==0){
                $resultFoto=false;
            }
            else 
            {
                $resultFoto=true;
            }
                    
        }
        
        
        


        if ($result AND $resultad AND $resultFoto) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se Guardo con Éxito." //modificado en la base de datos
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar" //no se modifico en la base de datos
            ));
        }
    }//registrarAvance
    
    
    
    
     public function asignarEmpleado() {
        $actividad = $this->input->post('activ');
        $usuario = $this->input->post('user');
        $fecha= date('Y-m-d');
        $estatus = 1;
      
         $dataAvance = array('actividad' => $actividad,
                            'usuario' => $usuario,
                            'fechaasignacion' => $fecha,
                            'estatus' => $estatus,
                        );
            
         $result = $this->avance_model->guardarAvance($dataAvance);



        if ($result) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se Guardo con Éxito." 
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar" 
            ));
        }
    }//AsignarEmpleado


   
     public function actualizarAvance() {
        $idAvance = $this->input->post('idAvance');
        $actividad = $this->input->post('cmbActividad');
        $tipo = $this->input->post('cmbTipoAvance');
        $costo = $this->input->post('txtCosto');
        $fecharegistro = date('Y-m-d');
        $descripcion = $this->input->post('txtDescripcion');
      
                   if ($tipo == 0) { //tipo final
                    $estatusAct = 3; // en Revision
                     $estatus = 5;//pendiente por evaluar
                   }
                   else{
                       $estatusAct = 2; // en Revision
                     $estatus = 0;//pendiente por evaluar
                   }
     
         $dataAvance = array(
                            'id' => $idAvance, 
                           'actividad' => $actividad, 
                            'descripcion' => $descripcion,
                            'fecharegistro' => $fecharegistro,
                            'tipo' => $tipo,
                            'costo' => $costo,
                            'estatus' => $estatus
                        );
         
            //Actualiza el estatus de la actividad a "En Ejecucion"   
                   $dataActividad = array('id' => $actividad,
                        'estatus' => $estatusAct,
                       );
                        $resultad = $this->actividad_model->cambiarEstatus($dataActividad);
             $result = $this->avance_model->actualizarAvance($dataAvance);
                    


        if ($result &&  $resultad) {
            echo json_encode(array(
                "success" => true,
                "msg" => "Se actualizó con Éxito."
       
            ));
        } else {

            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo Guardar" 
            ));
        }
    }//AsignarEmpleado 
    
    
    public function cargarGridAvance() {


        $avances = $this->avance_model->consultarListaAvance();

        if ($avances->num_rows() > 0) {

            foreach ($avances->result_array() as $row) {

                if ($row['tipo'] == 0) {
                    $tipo = 'Final';
                } else {
                    $tipo = 'Parcial';
                }
                
                  if ($row['observacion'] == 'no tiene observaciones') {
                    $observacion = '';
                } else {
                    $observacion = $row['observacion'];
                }
                
                 switch ($row['estatus']) {
                    case '2':
                        $estatus = 'Cancelado';
                        break;
                    case '3':
                        $estatus = 'Rechazado';
                        break;
                    case '4':
                        $estatus = 'Retrasado';
                        break;
                     case '5':
                        $estatus = 'Pendiente por Evaluar';
                        break;
                   
                    default:
                        $estatus = 'Completado';
                        break;
                }
                
                

                $eventAct = "  Actividad: " . $row['actividad'] . "<br> <font color=#3F77E6> Evento: " . $row['evento'] . "</font></br>";

                $data[] = array(
                    'idAct' => $row['idActividad'],
                    'idAv' => $row['idAvance'],
                    'actividad' => $eventAct,
                    'actividadTitle' => $row['actividad'],
                    'descripcion' => $row['descripcion'],
                    'tipo' => $tipo,
                    'fecha' => $row['fecha'],
                    'idUs' => $row['idUs'],
                    'evento' =>  $row['evento'],
                    'fechaAsignacion' => $row['fechaAsig'],
                    'costo' => $row['costo'],
                    'nombre' => $row['nombre'],
                    'apellido' => $row['apellido'],
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
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    }

//fin Cargar Avance  

    public function cargarAvanceFinal() {


        $avances = $this->avance_model->consultarListaAvanceFinal();

        if ($avances->num_rows() > 0) {

            foreach ($avances->result_array() as $row) {
                $tipo = 'Final';
                $event = "<font color=#3F77E6> Evento: " . $row['evento'] . "</font>";
                $data[] = array(
                    'id' => $row['id'],
                    'idAv' => $row['idAv'],
                    'evento' => $event,
                    'actividad' => $row['actividad'],
                    'descripcion' => $row['descripcion'],
                    'tipo' => $tipo,
                    'fecha' => $row['fecha'],
                    'nombre' => $row['nombre'],
                    'apellido' => $row['apellido'],
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
                "success" => false,
                "msg" => "No hay datos para mostrar"
            ));
        }
    }

//fin Cargar Avance final

    public function rechazarAvance() {

        $idAct = $this->input->post('record');
        $id = $this->input->post('idAvance');
        $observacion= $this->input->post('observacion');
        $estatus = 3; // rechazar la actividad
        $estatusAct = 2;
        $data = array(
            'id' => $id,
            'observacion' =>$observacion,
            'estatus' => $estatus,
        );

        $data2 = array(
            'id' => $idAct,
            'estatus' => $estatusAct,
        );

        $resultdAv = $this->avance_model->cambiarEstatus($data);
        $resultdAct = $this->actividad_model->cambiarEstatus($data2);

        if ($resultdAv and $resultdAct) {
            echo json_encode(array(
                "success" => true,
                "msg" => "El avance esta ha sido rechazado exitosamente." //modificado en la base de datos
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "msg" => "No se pudo rechazar el avance." //no se modifico en la base de datos
            ));
        }
    }

    public function obtenerEmpleadosConPlan() {
        $id = $this->input->get('id');


        $resultdbd = $this->avance_model->cargarEmpleadosConPlan($id);
        if ($resultdbd->num_rows() > 0) {

            foreach ($resultdbd->result_array() as $row) {

                $data[] = array(
                    'foto' => $row['foto'],
                    'nombrecompleto' => $row['nombre'] . " " . $row['apellido'],
                    'fecha' => $row['fecha'],
                );
            }

            $output = array(
                'success' => true,
                'total' => count($data),
                'data' => array_splice($data, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        } 
        else {
            echo json_encode(array(
                "success" => false,
                 'total' => count($data),
                "msg" => "No hay datos para mostrar"
            ));
        }
    }


   public function buscarEjecutor() {
        $id = $this->input->post('id');
        $avance= $this->avance_model->buscarEjecutorDeActividad($id);

        if ($avance->num_rows() > 0) {

            $row = $avance->row_array(); 

                   $cuanto = $row['cuantos'];
 
            $output = array(
                'success' => true,
                'cuanto' => $cuanto,
            );  
            echo json_encode($output);
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    
       
    }//fin registrar
//fin de la funcion

    
    
       public function buscarAvance() {
        $user=$this->session->userdata('datasession');
         $id = $user['idusuario'];
        $avance= $this->avance_model->buscarAvance($id);

        if ($avance->num_rows() > 0) {

            $row = $avance->row_array(); 

                   $cuanto = $row['cuantos'];
 
            $output = array(
                'success' => true,
                'cuanto' => $cuanto,
            );  
            echo json_encode($output);
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    
       
    }
    


       public function buscarUsuario() {
         $user=$this->session->userdata('datasession');
         $id = $user['idusuario'];
         $idUsu= $this->input->post('idUsuario');


        if ($idUsu==$id) {
                   $cuanto = 1;
               }
               else {
                $cuanto = 0;
               }

            $output = array(
                'success' => true,
                'cuanto' => $cuanto,
            );  
            echo json_encode($output);

    }

    public function obtenerUsuarios() {
        
        $resultdbd = $this->avance_model->cargarUsuarios();
        if ($resultdbd->num_rows() > 0) {

            foreach ($resultdbd->result_array() as $row) {
               
                
                $data[] = array(
                    'id'=>$row['id'],
                    'cedula'=>$row['nacionalidad']."-".$row['cedula'],
                    'idEmpl'=>$row['empl'],
                    'foto' => $row['foto'],
                    'nombrecompleto' => $row['nombre'] . " " . $row['apellido'],
                    'ente' => $row['ente'],
                    'division' => $row['division'],
                    'tipousuario' => $row['tipousuario'],
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
                "success" => false,
                "msg" => "No hay datos para mostrar"
            ));
        }
    } //fin de la funcion

}//fin del controller