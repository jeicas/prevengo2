<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Autorizacion extends CI_Controller
{
    public function __construct(){
        parent::__construct();
        $this->load->model("autorizacion/autorizacion_model");
        $this->load->model("usuario/usuario_model");
    }

    function _logueado(){
        $_logueado = $this->session->userdata('logueado');
        if ($_logueado != TRUE) {
            $this->session->sess_destroy();
            redirect('http://localhost/Autorizacion/index.php');
        }
    }
    public function index(){
        $this->_logueado();
    }
    
    public function eliminarAutorizado(){
        $add    = $_POST['records'];        
        if(isset($add)){
            $records = json_decode(stripslashes($add));
            foreach($records as $record){                
                 $arregloAutorizacion = array(
                    'eliminado'           => 1
                );
                $actualizar= $this->autorizacion_model->updateAutorizados($record->id,$arregloAutorizacion);                
            }
            if(mysql_affected_rows()>0){
              echo json_encode(array(
                "success"   => true,
                "actualizo" => true,
                "guardo"    => false
              ));
            }
        }
    }
    public function editarAutorizacion(){        
        $id= $_POST['id'];
        $fecha  = $_POST['fechaautorizacion'];
        $placa  = $_POST['placaVehiculo'];
        $tipoAutorizacion=$_POST['tipo'];
        if($tipoAutorizacion==1){
            $horaEn=$_POST['horaentrada'];
            $horaSa="00:00:00";
            $placa=NULL;
        }if($tipoAutorizacion==2){
            $horaSa=$_POST['horasalida'];
            $horaEn="00:00:00";
            $placa=NULL;
        }if($tipoAutorizacion==3){
            $horaSa=$_POST['horasalida'];
            $horaEn=$_POST['horaentrada'];
            $placa=NULL;
        }if($tipoAutorizacion==4){
            $horaSa=$_POST['horasalida'];
            $horaEn="00:00:00";
            $placa=$placa;
        }if($tipoAutorizacion==5 || $tipoAutorizacion==6 || $tipoAutorizacion==7){
            $horaSa="00:00:00";
            $horaEn="00:00:00";
            $placa=NULL;
        }   
        $username = $this->session->userdata('datasession');
        $arregloAutorizacion = array(
            'tipoautorizacion'  => $tipoAutorizacion,              
            'motivoautorizacion'=> $_POST['motivoautorizacion'],
            'usuario'           => $username['idusuario'],
            'fechaautorizacion' => $fecha,
            'horaentrada'       => $horaEn,
            'horasalida'        => $horaSa,
            'fecharegistro'     => date('Y-m-d H:m:s'),
            'placa'             => $placa,
            'contsalida'        => 0,                        
            'estatus'           => 1
        );     
        $this->autorizacion_model->editarAutorizacion($id,$arregloAutorizacion);
        if(mysql_affected_rows()>0){
            echo json_encode(array(
                "success"   => true,
                "edito"    => true                   
              ));
        }        
    }

    public function guardarAutorizacion(){
        $noAutorizado=false;
        $autorizado=false;
        $add    = $_POST['records'];
        $fecha  = $_POST['fechaA'];
        $horaE  = $_POST['horaE'];
        $horaS  = $_POST['horaS'];
        $placa  = $_POST['placa'];
        $arregloNoautorizado=array();
        $username = $this->session->userdata('datasession');
        $tipoAutorizacion= $_POST['tipoAutorizacion'];
        $motivoAutorizacion= $_POST['motivoAutorizacion'];
        if($tipoAutorizacion==1){
            $horaEn=$horaE;
            $horaSa="00:00:00";
            $placa=NULL;
        }if($tipoAutorizacion==2){
            $horaSa=$horaS;
            $horaEn="00:00:00";
            $placa=NULL;
        }if($tipoAutorizacion==3){
            $horaSa=$horaS;
            $horaEn=$horaE;
            $placa=NULL;
        }if($tipoAutorizacion==4){
            $horaSa=$horaS;
            $horaEn="00:00:00";
            $placa=$placa;
        }if($tipoAutorizacion==5 || $tipoAutorizacion==6 || $tipoAutorizacion==7){
            $horaSa="00:00:00";
            $horaEn="00:00:00";
            $placa=NULL;
        }
        
        if(isset($add)){
            $records = json_decode(stripslashes($add));            
            foreach($records as $record){
            $buscar=$this->autorizacion_model->buscarAutorizacionEmpleado($record->cedula,$record->nacionalidad,$tipoAutorizacion,$fecha,$horaSa,$horaEn);                
                if($buscar==false){                    
                     $arregloAutorizacion = array(
                        'nacionalidad'      => $record->nacionalidad,                
                        'cedula'            => $record->cedula, 
                        'usuario'           => $username['idusuario'],
                        'fechaautorizacion' => $fecha,
                        'horaentrada'       => $horaE,
                        'horasalida'        => $horaS,
                        'tipoautorizacion'  => $tipoAutorizacion,
                        'fecharegistro'     => date('Y-m-d H:m:s'),
                        'placa'             => $placa,
                        'motivoautorizacion'=> $motivoAutorizacion,
                        'contsalida'        => 0,                        
                        'estatus'           => 1
                    );
                     $autorizado=true;
                    $this->autorizacion_model->insertAutorizacion($arregloAutorizacion);
                }else{
                    $noAutorizado=true;
                     array_push($arregloNoautorizado,'<br>'.$record->nacionalidad.$record->cedula.'  '.$record->nombre.' '.$record->apellido);
                }
            }
            if(mysql_affected_rows()>0){
                if($noAutorizado){
                    if($autorizado){
                        $msg='Autorización(es) registrada(s) exitosamente.<br><br>No se pudo registrar porque existe autorización(es) registrada(s) con las mismas caracteristicas para esto(s) usuario(s):<br>';
                    }else{
                        $msg='No se pudo registrar porque existe autorización(es) registrada(s) con las mismas caracteristicas para esto(s) usuario(s):<br>';
                    }
                    echo json_encode(array(
                        "success"   => true,
                        "guardo"    => true,
                        "data"      => $arregloNoautorizado,
                        "msg"       => $msg
                      ));
                }else{
                 if($autorizado){
                    $msg ='Autorización(es) registrada(s) exitosamente.';
                 }else{
                    $msg ='No se registro autorización(es).';
                 }
                  echo json_encode(array(
                    "success"   => true,
                    "guardo"    => true,
                    "msg"       => $msg                    
                  ));
                }
            }
        }
    }
    public function actualizarAutorizacion(){
        $add    = $_POST['records'];        
        if(isset($add)){
            $records = json_decode(stripslashes($add));
            foreach($records as $record){
                if ($record->tipoautorizacion=='SALIDA'||$record->tipoautorizacion=='ENTRADA'){
                    $estatus=0;
                    $contSalida=0;
                }
                if ($record->tipoautorizacion=='SALIDA CON RETORNO'){
                   $buscar=$this->autorizacion_model->buscarFechaEstatus($record->id);
                    if($buscar!=false){
                        foreach ($buscar->result_array() as $row){
                            $fechaestatus  = $row['fechaestatus'];
                        }
                    }
                    if($fechaestatus!=null){
                        $estatus=0;
                        $contSalida=0;
                    }
                    else{
                        $estatus=2;
                        $contSalida=0;
                    }
                }
                if ($record->tipoautorizacion=='SALIDA DE VEHICULO' || $record->tipoautorizacion=='PERSONAL MENSAJERO' || $record->tipoautorizacion=='PERSONAL DE GUARDIA' || $record->tipoautorizacion=='PERMANENCIA DEL PERSONAL'){
                   $buscar=$this->autorizacion_model->buscarContadorSalida($record->id);
                    if($buscar!=false){
                        foreach ($buscar->result_array() as $row){
                            $contadorSalida  = $row['contsalida'];
                        }
                        $contSalida=($contadorSalida+1);
                        $estatus=3;
                    }         
                }
                 $arregloAutorizacion = array(
                    'id'                => $record->id,
                    'nacionalidad'      => $record->nacionalidad,              
                    'cedula'            => $record->cedula, 
                    'fechaestatus'      => date('Y-m-d H:m:s'),
                    'contsalida'        =>$contSalida,
                    'estatus'           => $estatus
                );
                $actualizar= $this->autorizacion_model->updateAutorizacion($record->id,$arregloAutorizacion);
                echo($actualizar);
            }
            if(mysql_affected_rows()>0){
              echo json_encode(array(
                "success"   => true,
                "actualizo" => true,
                "guardo"    => false,
                "msg"       => 'Autorizacion actualizada exitosamente.'
              ));
            }
        }
    }
        
}