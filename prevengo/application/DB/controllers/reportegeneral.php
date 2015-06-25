<?php
if (!defined('BASEPATH'))exit('No direct script access allowed');
class Reportegeneral extends CI_Controller {
    function __construct() {
        parent::__construct();
        $this->load->model('pdfs/ReporteGeneral_model');
        $this->load->helper('url');
        $this->load->database();
        $this->nacionalidad='V';
        $this->cedula=$this->input->post('cedula');
        $this->load->library('Pdf'); 
        $this->load->library(array('session'));         
    }
   
    public function generarPermiso() {
        // $fechades1=($this->input->get("fechades"));
        // $fechahas1=($this->input->get("fechahas"));
        // $fechades=date("Y-m-d",  strtotime($fechades1));
        // $fechahas=date("Y-m-d",  strtotime($fechahas1));
        // $fechaautorizaciondia1= ($this->input->get("fechaautorizaciondia"));
        // $fechaautorizaciondia=date("Y-m-d",  strtotime($fechaautorizaciondia1));
        $motivoautorizacion= ($this->input->get("motivoautorizacion")!='null')?'='.$this->input->get("motivoautorizacion"):'LIKE "%"';
        $tipoautorizacion=($this->input->get("tipoautorizacion")!='null')?'='.$this->input->get("tipoautorizacion"):'LIKE "%"';
        $pdf = new Pdf('l', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetSubject('Tutorial TCPDF');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
        // $pdf->SetHeaderData(PDF_HEADER_LOGO,PDF_HEADER_LOGO_WIDTH,PDF_HEADER_TITLE,PDF_HEADER_STRING,array(0,64,255),array(0,64, 128));
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
        $pdf->SetFont('times', '', 9, '', true);
        $pdf->AddPage();
        $html=null;
        $nombre_archivo=null;
        // Establecemos el contenido para imprimir
        $username = $this->session->userdata('datasession');
           if ($username['idusuario']==13){
               $resultado = $this->ReporteGeneral_model->getpermiso($motivoautorizacion,$tipoautorizacion);
            }else{
              $resultado = $this->ReporteGeneral_model->getpermisodos($motivoautorizacion,$tipoautorizacion,$username['idusuario']);
            }
       //----------------------------SEGUNDA fORMA DE HACERLO----------
         // $username = $this->session->userdata('datasession');
         //    if($username['usuario']=='PERSONAL'){
         //         $resultado = $this->ReporteGeneral_model->getpermiso($motivoautorizacion,$tipoautorizacion,$nombre,$apellido);
         //    }else{
                
         //    $resultado = $this->ReporteGeneral_model->getpermisodos($motivoautorizacion,$tipoautorizacion,$username['usuario'],$nombre,$apellido);
         //    }


         if($resultado){
            $html = '';
            $html .= "<style type=text/css>";
            $html .= "th{color: #fff; font-weight: bold; background-color: #0B615E; align=center}";
            $html .= "td{background-color: #fff; color: #222; align=center}";
            $html .= "</style>";
            $html .= "<h2>Listado del Personal con Permiso</h2>";
            
            $html .= "<table width='100%' border='1' cellpadding='0' cellspacing='0' >";
            $html .= "<tr>
            <th><em>Fecha del Permiso</em></th>
            <th><em>Cédula</em></th>
            <th><em>Nombres</em></th>
            <th><em>Cantidad de salidas</em></th>
            <th><em>Departamento</em></th>
            <th><em>Motivo</em></th>
            <th><em>Tipo de Autorizacion</em></th>
            </tr>";
            foreach($resultado as $fila){                    
                $html .= '<tr>
                    <td>'.mb_convert_case($fila["fechaautorizacion"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["cedula"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["nombre"],MB_CASE_TITLE, "UTF-8").'  '.mb_convert_case($fila["apellido"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["contsalida"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["departamento"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["motivoautorizacion"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["tipoautorizacion"],MB_CASE_TITLE, "UTF-8").'</td>
               </tr>
            <hr>'; 
            }                
            $html .= "</table>";  
            $cantidad=count($resultado);
            if ($cantidad>1){
              $html .="<h4>Actualmente: ".count($resultado)." empleados con permisos</h4>";  
            }else{
                $html .="<h4>Actualmente: ".count($resultado)." empleados con permisos</h4>";
            }
            $nombre_archivo = utf8_decode("Listado General.pdf");  
        }else{
            $html = '';
            $html .= "<style type=text/css>";
            $html .= "th{color: #fff; font-weight: bold; background-color: #AAC7E3}";
            $html .= "td{background-color: #fff; color: #222}";
            $html .= "</style>";
            $html .= "<h4>Listado del Personal con Permiso</h4>";
            $html .= "<table width='100%'>";
            $html .= "<tr><th>No hay empleados de permiso con las características indicadas</th></tr>";            
            $html .= "</table>";
            $nombre_archivo = utf8_decode("Listado del Personal con Permiso".$nombre.".pdf");
        }
        $pdf->writeHTMLCell($w = 0,$h = 0,$x='',$y = '',$html,$border = 0,$ln = 1,$fill = 0,$reseth=true,$align='C',$autopadding= true);
        $pdf->Output($nombre_archivo, 'I');
    }
      public function generarListadoGneral() {
        $departamento=($this->input->get("departamento")!='null')?'='.$this->input->get("departamento"):'LIKE "%"';

       //-------
        $pdf = new Pdf('l', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetSubject('Tutorial TCPDF');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
        // $pdf->SetHeaderData(PDF_HEADER_LOGO,PDF_HEADER_LOGO_WIDTH,PDF_HEADER_TITLE,PDF_HEADER_STRING,array(0,64,255),array(0,64, 128));
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
        $pdf->SetFont('times', '', 9, '', true);
        $pdf->AddPage();
        $html=null;
        $nombre_archivo=null;
        // Establecemos el contenido para imprimir
    
        $username = $this->session->userdata('datasession');
        if ($username['idusuario']==13){
            $resultado = $this->ReporteGeneral_model->getlistadogeneraldos($departamento);
        }else{
            $resultado = $this->ReporteGeneral_model->getlistadogeneral($departamento,$username['idusuario']);
        }
         if($resultado){
            $html = '';
            $html .= "<style type=text/css>";
            $html .= "th{color: #fff; font-weight: bold; background-color: #0B615E; align=center}";
            $html .= "td{background-color: #fff; color: #222; align=center}";
            $html .= "</style>";
            $html .= "<h2>Listado General de Departamento con Permisos Autorizados</h2>";
            $html .= "<table width='100%' border='1' cellpadding='0' cellspacing='0' >";
            $html .= "<tr>
            <th><em>Departamento</em></th>
            <th><em>Motivo</em></th>
            <th><em>Tipo de Autorizacion</em></th>
            <th><em>Cantidad de Permisos</em></th>
            </tr>";
            foreach($resultado as $fila){                    
                $html .= '<tr>
                    <td>'.mb_convert_case($fila["departamento"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["motivoautorizacion"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["tipoautorizacion"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["empleadosconpermisos"],MB_CASE_TITLE, "UTF-8").'</td>
               </tr>
            <hr>'; 
            }                
            $html .= "</table>";  
            $cantidad=count($resultado);
            if ($cantidad>1){
              $html .="<h4>Actualmente: ".count($resultado)." departamentos con permisos</h4>";  
            }else{
                $html .="<h4>Actualmente: ".count($resultado)." departamentos con permisos</h4>";
            }
            $nombre_archivo = utf8_decode("Listado General.pdf");  
        }else{
            $html = '';
            $html .= "<style type=text/css>";
            $html .= "th{color: #fff; font-weight: bold; background-color: #AAC7E3}";
            $html .= "td{background-color: #fff; color: #222}";
            $html .= "</style>";
            $html .= "<h4>Listado del Personal con Permiso</h4>";
            $html .= "<table width='100%'>";
            $html .= "<tr><th>No hay empleados de permiso con las características indicadas</th></tr>";            
            $html .= "</table>";
            $nombre_archivo = utf8_decode("Listado General de Departamento con Permisos Autorizados".$nombre.".pdf");
        }
        $pdf->writeHTMLCell($w = 0,$h = 0,$x='',$y = '',$html,$border = 0,$ln = 1,$fill = 0,$reseth=true,$align='C',$autopadding= true);
        $pdf->Output($nombre_archivo, 'I');
    }

     public function generarSalidaEmpleados() {
        $nacionalidad=($this->input->get("nacionalidad")!='') ?  "LIKE '%".$this->input->get("nacionalidad")."%'":'LIKE "%"';
        $cedula=($this->input->get("cedula" )!='') ?'='.$this->input->get("cedula"):'LIKE "%"';
        $nombre=($this->input->get("nombre" )!='') ?  "LIKE '%".$this->input->get("nombre")."%'":'LIKE "%"';
        $apellido=($this->input->get("apellido" )!='') ?  "LIKE '%".$this->input->get("apellido")."%'":'LIKE "%"';
        $pdf = new Pdf('p', 'mm', 'A4', true, 'UTF-8', false);
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetSubject('Tutorial TCPDF');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
        // $pdf->SetHeaderData(PDF_HEADER_LOGO,PDF_HEADER_LOGO_WIDTH,PDF_HEADER_TITLE,PDF_HEADER_STRING,array(0,64,255),array(0,64, 128));
        $pdf->setFooterData($tc = array(0, 64, 0), $lc = array(0, 64, 128));
        // datos por defecto de cabecera, se pueden modificar en el archivo tcpdf_config.php de libraries/config
        // $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH,'Listado General',PDF_HEADER_STRING,array(0,64,255), array(0,64,128));
        $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
        $pdf->SetPageOrientation('l');
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
        $pdf->SetFont('times', '', 10, '', true);
        $pdf->AddPage();
        $pdf->Cell(44, 0, 'Cédula', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(90, 0, 'Nombres y Apellidos', 1, 0, 'C', 0, '', 1);
        $pdf->Cell(44, 0, 'Sexo', 1, 0, 'C', 0, '', 1);
        $pdf->Cell(44, 0, 'Edo. Civil', 1, 0, 'C', 0, '', 1);
        $pdf->Cell(44, 0, 'Posee Partida', 1, 1, 'C', 0, '', 1);
        $pdf->Ln(5);

        $pdf->Cell(44, 0, 'Teléfono Móvil ', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(90, 0, 'Municipio', 1, 0, 'C', 0, '', 1);
        $pdf->Cell(88, 0, 'Parroquia', 1, 0, 'C', 0, '', 1);
        $pdf->Cell(44, 0, 'Fecha Nac.', 1, 1, 'C', 0, '', 1);

        $pdf->Ln(5);

        $pdf->Cell(44, 0, 'Teléfono Local', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(178, 0, 'Dirección', 1, 0, 'C', 0, '', 1);
        $pdf->Cell(44, 0, 'Edad', 1, 1, 'C', 0, '', 1);
        
        $pdf->Ln(5);

        $pdf->Cell(44, 0, 'CI Responsable', 1, 0, 'C', 0, '', 0);
        $pdf->Cell(90, 0, 'Nombres y Apellidos del Responsable', 1, 0, 'C', 0, '', 1);
        $pdf->Cell(130, 0, 'Dirección', 1, 0, 'C', 0, '', 1);
   

        // <td><b>CI Responsable</b></td>
        //                 <td colspan="2"><b>Nombres y Apellidos del Responsable</b></td>
        //                 <td colspan="3"><b>Dirección</b></td>


        //                     <td><b>Tipo Vivienda</b></td>
        //                 <td><b>Tenencia Vivienda</b></td>
        //                 <td><b>Parentesco</b></td>
        //                 <td><b>Padres Vivos</b></td>
        //                 <td>
        //                 <b>Nro. Personas</b>
        //                 </td>
        //                 <td><b>Convive con el Discapacitado</b></td>


        //                             <td><br><b>Condición/Discapacidad</b></td>
        //                 <td><br><b>Tipo Discapacidad</b></td> 
        //                 <td colspan="2"><br><b>Diagnóstico Tipo Discapacidad</b></td>
        //                 <td><br><b>Certificado Informe Médico</b></td>
        //                 <td><br><b>Estatus</b></td>


        //                                 <td><b>Requiere  Medicamento</b></td>
        //                 <td colspan="2"><br><b>Nombre de los Medicamentos</b></td>
        //                 <td><br><b>Requiere Ayuda</b></td>
        //                 <td colspan="2"><br><b>Nombre de la Ayuda</b></td>


        //                         <td ><b>Grado de instrucción</b></td>
        //                 <td colspan="2"><b>Deseo de continuar Estudiando</b></td>
        //                 <td colspan="2"><b>Condiciones para seguir Estudiando</b></td>
        //                 <td><b>Limitación de Estudio</b></td>
// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('example_004.pdf', 'I');

    }
}
//SELECT count(*) as motivo,empleado.cedula FROM `autorizacion` ,empleado WHERE `motivoautorizacion` = 5 and autorizacion.cedula=empleado.cedula group by empleado.cedula