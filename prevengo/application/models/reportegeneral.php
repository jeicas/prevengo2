<?php
if (!defined('BASEPATH'))exit('No direct script access allowed');
class Reportegeneral extends CI_Controller {
    function __construct() {
        parent::__construct();
        $this->load->model('pdfs/ReporteGeneral_model');
        $this->load->library('Pdf');        
    }
    public function generarListadogeneneral() {
        $nombre=($this->input->get("nombre" )!='') ?"LIKE '%".$this->input->get("nombre")."%'":'LIKE "%"';
        $apellido=($this->input->get("apellido" )!='') ?"LIKE '%".$this->input->get("apellido")."%'":'LIKE "%"';

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
        $resultado = $this->ReporteGeneral_model->getlistadogeneral($nombre,$apellido);
         if($resultado){
            $html = '';
            $html .= "<style type=text/css>";
            $html .= "th{color: #fff; font-weight: bold; background-color: #0B615E; align=center}";
            $html .= "td{background-color: #fff; color: #222; align=center}";
            $html .= "</style>";
            $html .= "<h2>Listado General de las Personas con Permisos</h2>";
            $html .= "<table width='100%' border='1' cellpadding='0' cellspacing='0' >";
            $html .= "<tr>
            <th><em>Fecha del Permiso</em></th>
            <th><em>Cédula</em></th>
            <th><em>Nombres</em></th>
            <th><em>Cantidad de salidas</em></th>
            <th><em>Departamento</em></th>
            <th><em>Motivo</em></th>
            </tr>";
            foreach($resultado as $fila){                    
                $html .= '<tr>
                    <td>'.mb_convert_case($fila["fechaautorizacion"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["cedula"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["nombre"],MB_CASE_TITLE, "UTF-8").'  '.mb_convert_case($fila["apellido"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["contsalida"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["departamento"],MB_CASE_TITLE, "UTF-8").'</td>
                    <td>'.mb_convert_case($fila["motivo"],MB_CASE_TITLE, "UTF-8").'</td>
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
            $html .= "<h4>Listado General de las Personas con Permisos</h4>";
            $html .= "<table width='100%'>";
            $html .= "<tr><th>No hay empleados de permiso con las características indicadas</th></tr>";            
            $html .= "</table>";
            $nombre_archivo = utf8_decode("Listado General ".$nombre.".pdf");
        }
        $pdf->writeHTMLCell($w = 0,$h = 0,$x='',$y = '',$html,$border = 0,$ln = 1,$fill = 0,$reseth=true,$align='C',$autopadding= true);
        $pdf->Output($nombre_archivo, 'I');
    }
}