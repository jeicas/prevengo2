<?php
if (!defined('BASEPATH'))exit('No direct script access allowed');
class Reportegeneral extends CI_Controller {
    function __construct() {
        parent::__construct();
        $this->load->model('pdfs/ReporteGeneral_model');
        $this->load->model('empleado/empleado_model');
        $this->load->helper('url');
        $this->load->database();
        $this->nacionalidad='V';
        $this->cedula=$this->input->post('cedula');
        $this->load->library('Pdf'); 
        $this->load->library(array('session'));         
    }
   
    public function generarPermiso(){
        if($this->input->get("fechades")=='' || $this->input->get("fechahas")==''){
            $desde=date('Y-m-d');
            $hasta=date('Y-m-d');
        }else{
            $desde=$this->input->get("fechades");
            $hasta=$this->input->get("fechahas");
        }
        $departamento=($this->input->get("departamento")!='null')?'='.$this->input->get("departamento"):'LIKE "%"';        
        $motivoautorizacion= ($this->input->get("motivoautorizacion")!='null')?'='.$this->input->get("motivoautorizacion"):'LIKE "%"';
        $tipoautorizacion=($this->input->get("tipoautorizacion")!='null')?'='.$this->input->get("tipoautorizacion"):'LIKE "%"';
        $pdf = new Pdf('l', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetSubject('Tutorial TCPDF');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
        $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH1, PDF_HEADER_TITLE, PDF_HEADER_STRING);
        $pdf->setFooterData($tc = array(0, 64, 0), $lc = array(0, 64, 128));
        // datos por defecto de cabecera, se pueden modificar en el archivo tcpdf_config.php de libraries/config       
        $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
        $pdf->SetPageOrientation('p');
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
        //relación utilizada para ajustar la conversión de los píxeles
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        // establecer el modo de fuente por defecto
        $pdf->setFontSubsetting(true); 
        $pdf->SetFont('times', '', 9, '', true);
        $pdf->AddPage();
        $html=null;
        $nombre_archivo=null;
        $username = $this->session->userdata('datasession');
        if ($username['idusuario']==13){
            $resultado2 = $this->ReporteGeneral_model->getpermisos($motivoautorizacion,$tipoautorizacion,$desde,$hasta,$departamento);
            $depa=$this->empleado_model->ReporteGeneral_model->getdptodos($departamento,$desde,$hasta);
        }else{
            $resultado2 = $this->ReporteGeneral_model->getpermisodos($motivoautorizacion,$tipoautorizacion,$username['idusuario'],$desde,$hasta);
            $depa=$this->empleado_model->buscarDepartamentoUsuario($username['cedula'],$username['nacionalidad']);
        }
        //echo json_encode($resultado2);
        if($resultado2->num_rows() > 0){
            foreach($depa->result_array() as $fila2){
                if ($username['idusuario']==13){
                    $resultado = $this->ReporteGeneral_model->getpermiso($motivoautorizacion,$tipoautorizacion,$desde,$hasta,$fila2['departamento']);
                }else{
                    $resultado = $resultado2;
                }
                $pdf->SetFont('Times','B',14);
                $pdf->Text(14, 25, 'Departamento: '.$fila2['nombre']);
                $pdf->SetFont('Times','B',12);
                $pdf->Text(50, 35, 'Listado de autorización(es) de empleado(s) con permiso.');                
                $pdf->Ln(20);
                $pdf->Text(70, 40, 'Para la fecha: '.$desde.' al '.$hasta);
                $pdf->Ln(15);
                $pdf->SetFont('times', '', 11, '', true);
                $pdf->SetFillColor('150','210','255');
                $pdf->Cell(20, 0, 'Cédula', 1, 0, 'C',1);
                $pdf->Cell(50, 0, 'Nombres y Apellidos', 1, 0, 'C',1);
                $pdf->Cell(32, 0, 'Fecha autorización', 1, 0, 'C',1);
                $pdf->Cell(42, 0, 'Motivo de la autorización', 1, 0, 'C',1);
                $pdf->Cell(45, 0, 'Tipo de autorización', 1, 1, 'C',1);
                $cedemp='null';
                $permiso=array();
                $tot=0;
                foreach($resultado->result_array() as $fila){
                    $tot=$tot+1;                   
                    if ($cedemp!=$fila['cedula']){
                        if ($cedemp!='null'){
                            $l=1;
                            $e=0;
                            $r = count($permiso);
                            if($r>3){
                                $pdf->Cell(32, 0,$permiso[0], 1, 0, 'C', 0, '', 0);
                                while ($l<$r-1){
                                    if($e!=$l){
                                        $pdf->Cell(42, 0,$permiso[$l], 1, 0, 'C', 0, '', 0);
                                        $pdf->Cell(45, 0,$permiso[$l+1], 1, 1, 'C', 0, '', 0);
                                    }else{
                                        $l=$l+2;
                                        if($l<$r){
                                            $pdf->SetX(85);                                           
                                            $pdf->Cell(32, 0,$permiso[$l-1], 1, 0, 'C', 0, '', 0);
                                            $pdf->Cell(42, 0,$permiso[$l], 1, 0, 'C', 0, '', 0);
                                            $pdf->Cell(45, 0,$permiso[$l+1], 1, 1, 'C', 0, '', 0);
                                        }
                                    }
                                    $l=$l+1;
                                    $e=$l;
                                }
                            }else{
                                $pdf->Cell(32, 0,$permiso[0], 1, 0, 'C', 0, '', 0);
                                $pdf->Cell(42, 0,$permiso[1], 1, 0, 'C', 0, '', 0);
                                $pdf->Cell(45, 0,$permiso[2], 1, 1, 'C', 0, '', 0);
                            }
                            unset($permiso);
                            $permiso=array();
                            $pdf->Cell(20, 0, $fila['cedula'], 1, 0, 'C', 0, '', 1);
                            $pdf->Cell(50, 0, $fila['nombre'].' '.$fila['apellido'], 1, 0, 'C', 0, '', 1);
                            $fecha=$fila["fechaautorizacion"];
                            $motivo=$fila["motivoautorizacion"];                            
                            $tipo=$fila["tipoautorizacion"];
                            array_push($permiso,$fecha,$motivo,$tipo);
                            $cedemp=$fila['cedula'];
                        }else{
                            if ($tot==1){
                                $pdf->Cell(20, 0, $fila['cedula'], 1, 0, 'C', 0, '', 1);
                                $pdf->Cell(50, 0, $fila['nombre'].' '.$fila['apellido'], 1, 0, 'C', 0, '', 1);                                
                                $fecha=$fila["fechaautorizacion"];
                                $motivo=$fila["motivoautorizacion"];
                                $tipo=$fila["tipoautorizacion"];
                                array_push($permiso,$fecha,$motivo,$tipo);
                                $cedemp=$fila['cedula'];
                            }
                        }
                    }else{
                        $fecha=$fila["fechaautorizacion"];
                        $motivo=$fila["motivoautorizacion"];                        
                        $tipo=$fila["tipoautorizacion"];
                        array_push($permiso,$fecha,$motivo,$tipo);
                    }
                }
                $l=1;
                $e=0;
                $r = count($permiso);
                if($r>3){
                    $pdf->Cell(32, 0,$permiso[0], 1, 0, 'C', 0, '', 0);
                    while ($l<$r-1){
                        if($e!=$l){
                            $pdf->Cell(42, 0,$permiso[$l], 1, 0, 'C', 0, '', 0);
                            $pdf->Cell(45, 0,$permiso[$l+1], 1, 1, 'C', 0, '', 0);
                        }else{
                            $l=$l+2;
                            if($l<$r){
                                $pdf->SetX(85);                                           
                                $pdf->Cell(32, 0,$permiso[$l-1], 1, 0, 'C', 0, '', 0);
                                $pdf->Cell(42, 0,$permiso[$l], 1, 0, 'C', 0, '', 0);
                                $pdf->Cell(45, 0,$permiso[$l+1], 1, 1, 'C', 0, '', 0);
                            }
                        }
                        $l=$l+1;
                        $e=$l;
                    }
                }else{                                                        
                    $pdf->Cell(32, 0,$permiso[0], 1, 0, 'C', 0, '', 0);
                    $pdf->Cell(42, 0,$permiso[1], 1, 0, 'C', 0, '', 0);
                    $pdf->Cell(45, 0,$permiso[2], 1, 1, 'C', 0, '', 0);
                }                
                $pdf->AddPage();
            }
        }else{            
            $pdf->SetFont('Times','B',18);
            $pdf->Text(50, 25, 'Para la fecha: '.$desde.' al '.$hasta);
            $pdf->Ln(15);
            $pdf->Text(14, 40, 'No se encuentran autorización(es) con las características indicadas.');            
        }   
        $pdf->Output('resumengeneral.pdf', 'I');
    }
    public function generarListadoGneral() {
        $departamento=($this->input->get("departamento")!='null')?'='.$this->input->get("departamento"):'LIKE "%"';       
        $pdf = new Pdf('l', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetSubject('Tutorial TCPDF');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
         $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH1, PDF_HEADER_TITLE, PDF_HEADER_STRING);
        $pdf->setFooterData($tc = array(0, 64, 0), $lc = array(0, 64, 128));
        // datos por defecto de cabecera, se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
        $pdf->SetPageOrientation('p');
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
        //relación utilizada para ajustar la conversión de los píxeles
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        // establecer el modo de fuente por defecto
        $pdf->setFontSubsetting(true); 
        $pdf->AddPage();
        $html=null;
        $nombre_archivo=null;
        $username = $this->session->userdata('datasession');
        if ($username['idusuario']==13){
            $resultado2 = $this->ReporteGeneral_model->getlistadogeneraldosdos($departamento);
            $depa=$this->ReporteGeneral_model->getdpto($departamento);
        }
        if ($username['idusuario']==18){
            $depaafinanzas=$this->empleado_model->buscarDepartamentoUsuario($username['cedula'],$username['nacionalidad']);
            foreach ($depaafinanzas->result_array() as $row){
                $dat[] = array( 
                    'depa'=> $row['departamento']
                );
            }
            $departamento2=$row['departamento'];
            $arredepar18=array(4,5,11,14,15,16,17,18,19,20,21,22,23,28,29,30);
            if($departamento!='LIKE "%"'){
                if(in_array($this->input->get("departamento"),$arredepar18)){
                    $depa=$this->ReporteGeneral_model->getdptotres($departamento);
                }else{                    
                    $depa=$this->ReporteGeneral_model->getdptotresdos($departamento2);
                }                
            }else{                    
                $depa=$this->ReporteGeneral_model->getdptotresdos($departamento2);
            }
           $resultado2 = $this->ReporteGeneral_model->getlistadogeneraldosdos($departamento);
        }
        if($username['idusuario']!=13 && $username['idusuario']!=18){
            $resultado2 = $this->ReporteGeneral_model->getlistadogenerall($username['idusuario']);            
            $depa=$this->empleado_model->buscarDepartamentoUsuario($username['cedula'],$username['nacionalidad']);
        }
        if($resultado2->num_rows() > 0){
            foreach ($depa->result_array() as $row){   
                if ($username['idusuario']==13){
                    $resultado = $this->ReporteGeneral_model->getlistadogeneraldos($row['departamento']);
                }if ($username['idusuario']==18){
                    $resultado4= $this->ReporteGeneral_model->gettotalempeladosafinanzas($row['departamento']);
                    $resultado3= $this->ReporteGeneral_model->gettotalPermisosafinanzas($row['departamento']);
                    $resultado = $this->ReporteGeneral_model->getlistadogeneraldos($row['departamento']);
                }
                if($username['idusuario']!=13 && $username['idusuario']!=18){
                    $resultado = $this->ReporteGeneral_model->getlistadogenerall($username['idusuario']);
                }         
                // $pdf->SetXY(10, 05);
                // $pdf->Image('imagen/logo/Logo-Nuevo-Gober-sin-borde.png', '', '', 60, 0, '', '', 'T', false, 300, '', false, false, 1, false, false, false);
                // $pdf->SetXY(170, 10);
                // $pdf->Image('imagen/logo/LARA-PROGRESISTA-CON-BORDE.png', '', '', 22, 0, '', '', 'T', false, 300, '', false, false, 1, false, false, false);
                $pdf->Ln(20);
                $pdf->SetFont('Times','B',16);
                $pdf->SetXY('15', 40);
                $pdf->Text(14, 35, 'Departamento: '.$row['nombre']);
                $pdf->SetFont('times', '', 12, '', true);
                $pdf->SetFillColor('150','210','255');
                $pdf->SetXY(15, 50);
                $pdf->MultiCell(35, 10, 'Oficina', 1, 0, 'C',0);
                $pdf->MultiCell(20, 10, 'Personal', 1, 0, 'C',0);
                $pdf->MultiCell(20, 10, 'Laboral', 1, 0, 'C',0);
                $pdf->MultiCell(20, 10, 'Medico', 1, 0, 'C',0);
                $pdf->MultiCell(20, 10, 'Estudio', 1, 0, 'C',0);
                $pdf->MultiCell(20, 10, 'Sindical', 1, 0, 'C',0);
                $pdf->MultiCell(20, 10, 'Total', 1, 0, 'R',0);
                $pdf->MultiCell(30, 10, 'Nro. Empleados', 1, 1, 'C',1);
                $idoficina='null';
                $motivo=array();
                $tot=0;
                foreach($resultado->result_array() as $fila){
                    $tot=$tot+1;
                    if ($idoficina!=$fila['id']){
                        if ($idoficina!=null){
                            $result=0;
                            foreach($motivo as $re){
                                if($re!=0){
                                    $result=$result+$re;
                                }      
                                $pdf->Cell(20, 25,$re, 1, 0, 'C', 0, '', 0);// VALORES DEL ULTIMO
                            }
                            unset($motivo);
                            $motivo=array();
                            $pdf->MultiCell(35, 25, $row['nombre'], 1, 0, 'C', 0);
                            $mot1=$fila["Personal"];
                            $mot2=$fila["Laboral"];
                            $mot3=$fila["Medico"];
                            $mot4=$fila["Estudio"];
                            $mot5=$fila["Sindical"];
                            array_push($motivo,$mot1,$mot2,$mot3,$mot4,$mot5);
                            $idoficina=$fila['id'];
                        }else{
                            if ($tot==1){
                                $pdf->SetFillColor('190');
                                $pdf->MultiCell(35, 25, $row['nombre'], 1, 0, 'C', 0);
                                $mot1=$fila["Personal"];
                                $mot2=$fila["Laboral"];
                                $mot3=$fila["Medico"];
                                $mot4=$fila["Estudio"];
                                $mot5=$fila["Sindical"];
                                array_push($motivo,$mot1,$mot2,$mot3,$mot4,$mot5);
                                $idoficina=$fila['id'];
                            }
                        }
                    }else{
                        if ($motivo[0] ==0 && $fila["Personal"]!='0') {
                            $reemplazo = array(0 => $fila["Personal"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                        if ($motivo[1] ==0 && $fila["Laboral"]!='0') {
                            $reemplazo = array(1 => $fila["Laboral"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                        if ($motivo[2] ==0 && $fila["Medico"]!='0') {
                            $reemplazo = array(2 => $fila["Medico"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                        if ($motivo[3] ==0 && $fila["Estudio"]!='0'){
                            $reemplazo = array(3 => $fila["Estudio"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                        if ($motivo[4] ==0 && $fila["Sindical"]!='0'){
                            $reemplazo = array(4 => $fila["Sindical"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                    }
                }
                $result2=0;
                foreach($motivo as $re){
                    if($re!=0){
                        $result2=$result2+$re;
                    }      
                    $pdf->Cell(20, 25,$re, 1, 0, 'C', 0, '', 0);// VALORES DEL ULTIMO
                }
                $pdf->Cell(20, 25,$result2 , 1, 0, 'C', 1);
                if($username['idusuario']==18){
                     $resultado4= $this->ReporteGeneral_model->gettotalempeladosafinanzas($row['departamento']);
                     $resultado3= $this->ReporteGeneral_model->gettotalPermisosafinanzas($row['departamento']);
                }else{
                     $resultado4= $this->ReporteGeneral_model->gettotalempelados($row['departamento']);
                     $resultado3= $this->ReporteGeneral_model->gettotalPermisos($row['departamento']);
                }
                foreach($resultado4->result_array() as $fila2){ 
                    if ($fila2['departamento']==$row['departamento']){  
                        $pdf->Cell(30, 25,$fila2["total"], 1, 1, 'C', 1);
                    }
                }
                $pdf->AddPage();
            }
        }else{            
            $pdf->SetFont('Times','B',18);
            $pdf->Text(14, 12, 'No se encuentran autorización(es) con las características indicadas.');
        }              
        $pdf->Output('resumengeneral.pdf', 'I');
    }
//------------------------------------------RESUMEN DE AUTORIZACIONES POR EMPLEADO------------------------------
    public function generarSalidaEmpleados() {
        $departamento=($this->input->get("departamento")!='null')?'='.$this->input->get("departamento"):'LIKE "%"';
        $nacionalidad=($this->input->get("nacionalidad")!='') ?  "LIKE '%".$this->input->get("nacionalidad")."%'":'LIKE "%"';
        $cedula=($this->input->get("cedula" )!='') ?'='.$this->input->get("cedula"):'LIKE "%"';
        $nombre=($this->input->get("nombre" )!='') ?  "LIKE '%".$this->input->get("nombre")."%'":'LIKE "%"';
        $apellido=($this->input->get("apellido" )!='') ?  "LIKE '%".$this->input->get("apellido")."%'":'LIKE "%"';
        $pdf = new Pdf('l', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetSubject('Tutorial TCPDF');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
         $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH1, PDF_HEADER_TITLE, PDF_HEADER_STRING);
        $pdf->setFooterData($tc = array(0, 64, 0), $lc = array(0, 64, 128));
        // datos por defecto de cabecera, se pueden modificar en el archivo tcpdf_config.php de libraries/config
        // $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH,'Listado General',PDF_HEADER_STRING,array(0,64,255), array(0,64,128));
        $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
        $pdf->SetPageOrientation('p');
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
        // se pueden modificar en el archivo tcpdf_config.php de libraries/config
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
        //relación utilizada para ajustar la conversión de los píxeles
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        // establecer el modo de fuente por defecto
        $pdf->setFontSubsetting(true);         
        $pdf->AddPage();
        $html=null;
        $nombre_archivo=null;
        $username = $this->session->userdata('datasession');
        if ($username['idusuario']==13){            
            $resultado2 = $this->ReporteGeneral_model->getdptoempleadosdos($nacionalidad,$cedula,$nombre,$apellido,$departamento);
        }else{
            $resultado2 = $this->ReporteGeneral_model->getdptoempleados($nacionalidad,$cedula,$nombre,$apellido,$username['idusuario']);
            $resultado = $this->ReporteGeneral_model->getsalidasempleados($nacionalidad,$cedula,$nombre,$apellido,$username['idusuario']);
        }        
        if($resultado2->num_rows() > 0){
            foreach($resultado2->result_array() as $fila2){
                if ($username['idusuario']==13){
                    $resultado = $this->ReporteGeneral_model->getsalidasempleadosdos($nacionalidad,$cedula,$nombre,$apellido,$fila2['departamento']);
                }else{
                    $resultado = $this->ReporteGeneral_model->getsalidasempleados($nacionalidad,$cedula,$nombre,$apellido,$username['idusuario']);
                }
                $pdf->SetFont('Times','B',14);
                $pdf->Text(14, 25, 'Departamento: '.$fila2['nombre']);
                $pdf->SetFont('Times','B',12);
                $pdf->Text(50, 35, 'Resumen de autorización(es) por empleado(s).');                
                $pdf->Ln(15);
                $pdf->SetFont('times', '', 11, '', true);
                $pdf->SetFillColor('150','210','255');
                $pdf->Cell(20, 0, 'Cédula', 1, 0, 'C',1);
                $pdf->Cell(60, 0, 'Nombres y Apellidos', 1, 0, 'C',1);
                $pdf->Cell(20, 0, 'Personal', 1, 0, 'C',1);
                $pdf->Cell(20, 0, 'Laboral', 1, 0, 'C',1);
                $pdf->Cell(20, 0, 'Medico', 1, 0, 'C',1);
                $pdf->Cell(20, 0, 'Estudio', 1, 0, 'C',1);
                $pdf->Cell(20, 0, 'Sindical', 1, 0, 'C',1);
                $pdf->Cell(10, 0, 'Total', 1, 1, 'C',1);
                $cedemp='null';
                $motivo=array();
                $tot=0;
                foreach($resultado->result_array() as $fila){
                    $tot=$tot+1;                   
                    if ($cedemp!=$fila['cedula']){
                        if ($cedemp!='null'){
                            $result=0;
                            foreach($motivo as $re){
                                if($re!=0){
                                    $result=$result+$re;
                                }                                                        
                                $pdf->Cell(20, 0,$re, 1, 0, 'C', 0, '', 0);
                            }
                            $pdf->Cell(10, 5,$result , 1, 1, 'C', 1);                        
                            unset($motivo);
                            $motivo=array();
                            $pdf->Cell(20, 0, $fila['cedula'], 1, 0, 'C', 0, '', 1);
                            $pdf->Cell(60, 0, $fila['nombre'].' '.$fila['apellido'], 1, 0, 'C', 0, '', 1);
                            $mot1=$fila["Personal"];
                            $mot2=$fila["Laboral"];
                            $mot3=$fila["Medico"];
                            $mot4=$fila["Estudio"];
                            $mot5=$fila["Sindical"];
                            array_push($motivo,$mot1,$mot2,$mot3,$mot4,$mot5);
                            $cedemp=$fila['cedula'];
                        }else{
                            if ($tot==1){
                                $pdf->Cell(20, 0, $fila['cedula'], 1, 0, 'C', 0, '', 1);
                                $pdf->Cell(60, 0, $fila['nombre'].' '.$fila['apellido'], 1, 0, 'C', 0, '', 1);
                                $mot1=$fila["Personal"];
                                $mot2=$fila["Laboral"];
                                $mot3=$fila["Medico"];
                                $mot4=$fila["Estudio"];
                                $mot5=$fila["Sindical"];
                                array_push($motivo,$mot1,$mot2,$mot3,$mot4,$mot5);
                                $cedemp=$fila['cedula'];
                            }
                        }
                    }else{                                       
                        if ($motivo[0] ==0 && $fila["Personal"]!='0') {                        
                            $reemplazo = array(0 => $fila["Personal"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }                             
                        if ($motivo[1] ==0 && $fila["Laboral"]!='0') {
                            $reemplazo = array(1 => $fila["Laboral"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                        if ($motivo[2] ==0 && $fila["Medico"]!='0') {
                            $reemplazo = array(2 => $fila["Medico"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                        if ($motivo[3] ==0 && $fila["Estudio"]!='0'){
                            $reemplazo = array(3 => $fila["Estudio"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                        if ($motivo[4] ==0 && $fila["Sindical"]!='0'){
                            $reemplazo = array(4 => $fila["Sindical"]);
                            $motivo = array_replace($motivo, $reemplazo);
                        }
                    }
                }
                $result2=0;
                foreach($motivo as $re){
                    if($re!=0){
                        $result2=$result2+$re;
                    }      
                    $pdf->Cell(20, 0,$re, 1, 0, 'C', 0, '', 0);
                }
                $pdf->Cell(10, 5,$result2 , 1, 1, 'C', 1);
                $pdf->AddPage();
            }
        }else{            
            $pdf->SetFont('Times','B',18);
            $pdf->Text(14, 25, 'No se encuentran autorización(es) con las características indicadas.');
        }   
        $pdf->Output('resumengeneral.pdf', 'I');
    }
}