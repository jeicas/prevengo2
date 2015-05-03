<?php
if (!defined('BASEPATH'))exit('No direct script access allowed');
class repplanilla extends CI_Controller {
	function __construct() {
		parent::__construct();
		$this->load->model('pdfs/Repplanilla_model');
		$this->load->library('Pdf');        
	}
	public function generarListadogendis() {
		$nacionalidad=($this->input->get("nacionalidad")!='') ?  "LIKE '%".$this->input->get("nacionalidad")."%'":'LIKE "%"';
		$ceduladisca=($this->input->get("cedula" )!='') ?'='.$this->input->get("cedula"):'LIKE "%"';
		$nombre=($this->input->get("nombre" )!='') ?  "LIKE '%".$this->input->get("nombre")."%'":'LIKE "%"';
		$apellido=($this->input->get("apellido" )!='') ?  "LIKE '%".$this->input->get("apellido")."%'":'LIKE "%"';
		$edocivil=($this->input->get("edocivil")!='null')?'='.$this->input->get("edocivil"):'LIKE "%"';
		$edad=($this->input->get("edad")!='null')?'='.$this->input->get("edad"):'>= 0';
		$municipio=($this->input->get("municipio")!='null')?'='.$this->input->get("municipio"):'LIKE "%"';
		$parroquia=($this->input->get("parroquia")!='null')?'='.$this->input->get("parroquia"):'LIKE "%"';
		$sexo=($this->input->get("sexo")!='null')?'='.$this->input->get("sexo"):'LIKE "%"';
		$direccion=($this->input->get("direccion")!='null')?'='.$this->input->get("direccion"):'LIKE "%"';
		$institucion=($this->input->get("institucion")!='null')?'='.$this->input->get("institucion"):'LIKE "%"';
		$poseeinforme=($this->input->get("poseeinforme")!='null')?'='.$this->input->get("poseeinforme"):'LIKE "%"';
		$condiciondis=($this->input->get("condiciondis")!='null')?'='.$this->input->get("condiciondis"):'LIKE "%"';
		$medicamentos=($this->input->get("medicamentos")!='null')?'='.$this->input->get("medicamentos"):'LIKE "%"';
		$tipodiscapacidad=($this->input->get("tipodiscapacidad")!='null')?'='.$this->input->get("tipodiscapacidad"):'LIKE "%"';
		$requiereayuda=($this->input->get("requiereayuda")!='null')?'='.$this->input->get("requiereayuda"):'LIKE "%"';
		$ayuda=($this->input->get("ayuda")!='null')?'='.$this->input->get("ayuda"):'LIKE "%"'; $tipovivienda=($this->input->get("tipovivienda")!='null')?'='.$this->input->get("tipovivienda"):'LIKE "%"';
		$status=($this->input->get("status")!='null')?'='.$this->input->get("status"):'LIKE "%"';
		$pdf = new Pdf('l', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetCreator(PDF_CREATOR);
		$pdf->SetSubject('Tutorial TCPDF');
		$pdf->SetKeywords('TCPDF, PDF, example, test, guide');
		
		//$pdf->SetHeaderData(PDF_HEADER_LOGO,PDF_HEADER_LOGO_WIDTH,PDF_HEADER_LOGO_WIDTH1,PDF_HEADER_TITLE ,PDF_HEADER_STRING,array(0,64,255),array(0,64, 128));
		$pdf->setFooterData($tc = array(0, 64, 0), $lc = array(0, 64, 128));
		// datos por defecto de cabecera, se pueden modificar en el archivo tcpdf_config.php de libraries/config
		//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);
		$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH1, PDF_HEADER_TITLE, PDF_HEADER_STRING);
		$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
		$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
		$pdf->SetPageOrientation('l');
		$pdf->SetFillColorArray('');
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
		$html=null;
		$nombre_archivo=null;
		// Establecemos el contenido para imprimir

		$resultado1 = $this->Repplanilla_model->getdiscapacidad($status,$nacionalidad,$ceduladisca,$direccion,$nombre,$apellido,$edocivil,$edad,$municipio,$parroquia,$sexo,$institucion,$tipodiscapacidad,$ayuda,$requiereayuda,$poseeinforme,$condiciondis,$medicamentos); 
		if($resultado1){

			$html = '';
			$html .= "<style type=text/css>";
			$html .= "th{color: black; font-weight: bold; background-color:#AAC7E3; align=center}";
			$html .= "td{ color: #222; align=center}";
			$html .= "p.saltodepagina{display: block; page-break-before: always}";
			$html .= "</style>";

			foreach($resultado1 as $fila){ 
				 
				$html .= '
				<table border="1" >
					<tr><th colspan="6"><h3>I. Identificación de la Persona con Discapacidad</h3></th>
					</tr>
					<tr align="center" bgcolor="#DCDCDC">
						<td><b>Cédula</b></td>
						<td colspan="2"><b>Nombres y Apellidos</b></td>
						<td><b>Sexo</b></td>
						<td><b>Edo. Civil</b></td>
						<td><br><b>Posee Partida</b></td>	
					</tr>
					<tr align="center">
						<td>
						'.mb_convert_case($fila['nacionalidad'],MB_CASE_TITLE, "UTF-8").'
						-
						'.mb_convert_case($fila['cedula'],MB_CASE_TITLE, "UTF-8").'
						</td>
						<td  colspan="2" align="justify">'.mb_convert_case($fila['nombres'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['sexo'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.$fila['edocivil'].'</td>
						<td>'.mb_convert_case($fila['poseepartida'],MB_CASE_TITLE, "UTF-8").'</td>	
					</tr>
					<tr align="center"  bgcolor="#DCDCDC">
						<td><b>Teléfono Móvil </b></td>
						<td colspan="2"><br><b>Municipio</b></td>
						<td colspan="2"><b>Parroquia</b></td>
						<td><br><b>Fecha Nac.</b></td>
					</tr>
					<tr align="left">
						<td align="center">'.$fila['movil'].'</td>
						<td colspan="2">'.mb_convert_case($fila['municipio'],MB_CASE_TITLE, "UTF-8").' </td>
						<td colspan="2">'.mb_convert_case($fila['parroquia'],MB_CASE_TITLE, "UTF-8").' </td>
						<td align="center">'.$fila['fechanac'].'</td>
					</tr>
					<tr align="center"  bgcolor="#DCDCDC">
						<td><b>Teléfono Local</b></td>
						<td colspan="4"><b>Dirección</b></td>
						<td><b>Edad</b></td>
					</tr>
					<tr align="justify">
						<td align="center">'.$fila['fijo'].'</td>
						<td colspan="4">'.mb_convert_case($fila['direccion'],MB_CASE_TITLE, "UTF-8").'</td>
						<td align="center">
						'.$fila['edaddis'].' año(s) y '.$fila['meses'].' mes(es)</td>
					</tr>
					<tr><th colspan="6" align="center"><h3>II. Caracteristícas Socio-Familiar de la Persona con Discapacidad</h3></th></tr> 
					<tr align="center" bgcolor="#DCDCDC">
						<td><b>CI Responsable</b></td>
						<td colspan="2"><b>Nombres y Apellidos del Responsable</b></td>
						<td colspan="3"><b>Dirección</b></td>
					</tr>
					<tr align="left">
						<td align="center">'.$fila['cedularesponsable'].'</td>
						<td colspan="2">'.mb_convert_case($fila['nombresresponsable'],MB_CASE_TITLE, "UTF-8").' </td>
						<td colspan="3" align="justify">'.mb_convert_case($fila['direccionresponsable'],MB_CASE_TITLE, "UTF-8").'</td>
					</tr>
					<tr align="center"  bgcolor="#DCDCDC">
						<td><b>Tipo Vivienda</b></td>
						<td><b>Tenencia Vivienda</b></td>
						<td><b>Parentesco</b></td>
						<td><b>Padres Vivos</b></td>
						<td>
						<b>Nro. Personas</b>
						</td>
						<td><b>Convive con el Discapacitado</b></td>
					</tr> 
					<tr>
						<td>'.mb_convert_case($fila['tipovivienda'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['tenenciavivienda'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['familiardirecto'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['parentescofamiliar'],MB_CASE_TITLE, "UTF-8").'</td>
						<td align="left">
						Habitantes:'.$fila['numerohabitantes'].'
					    Trabajan:'.$fila['numerotrabajan'].'</td>
						<td>'.$fila['convivenciadiscapa'].'</td>
					</tr> 
					<tr><th colspan="6" align="center"><h3>III. Caracteristícas de la Discapacidad</h3></th></tr>
					<tr align="center"  bgcolor="#DCDCDC">
						<td><br><b>Condición/Discapacidad</b></td>
						<td><br><b>Tipo Discapacidad</b></td> 
						<td colspan="2"><br><b>Diagnóstico Tipo Discapacidad</b></td>
						<td><br><b>Certificado Informe Médico</b></td>
						<td><br><b>Estatus</b></td>
					</tr>
						<tr align="left">
						<td align="center">'.mb_convert_case($fila['condicion'],MB_CASE_TITLE, "UTF-8").'</td>
						<td align="center">'.mb_convert_case($fila['tipodis'],MB_CASE_TITLE, "UTF-8").'</td> 
						<td colspan="2">'.mb_convert_case($fila['describirtipodisca'],MB_CASE_TITLE, "UTF-8").'</td>
						<td align="center">'.mb_convert_case($fila['poseeinforme'],MB_CASE_TITLE, "UTF-8").'</td>
						<td align="center">'.mb_convert_case($fila["status"],MB_CASE_TITLE, "UTF-8").'</td>
					</tr>
					<tr align="center"  bgcolor="#DCDCDC">
						
						<td><b>Requiere  Medicamento</b></td>
						<td colspan="2"><br><b>Nombre de los Medicamentos</b></td>
						<td><br><b>Requiere Ayuda</b></td>
						<td colspan="2"><br><b>Nombre de la Ayuda</b></td>
					</tr>
					<tr align="center"> 
						<td>'.mb_convert_case($fila['usamedica'],MB_CASE_TITLE, "UTF-8").'</td>
						<td colspan="2">'.mb_convert_case($fila['nombremedica'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['requiereayuda'],MB_CASE_TITLE, "UTF-8").'</td>
						<td colspan="2">'.mb_convert_case($fila['nombreayuda'],MB_CASE_TITLE, "UTF-8").'</td>
					</tr>
					<tr><th colspan="6" align="center"><h3>IV. Nivel Educativo de la Persona con Discapacidad</h3></th></tr>
					<tr align="center"  bgcolor="#DCDCDC">
						<td ><b>Grado de instrucción</b></td>
						<td colspan="2"><b>Deseo de continuar Estudiando</b></td>
						<td colspan="2"><b>Condiciones para seguir Estudiando</b></td>
						<td><b>Limitación de Estudio</b></td>
					</tr>
					<tr align="center">
						<td>'.mb_convert_case($fila['gradoinstruccion'],MB_CASE_TITLE, "UTF-8").'</td>
						<td colspan="2">'.mb_convert_case($fila['deseoestudio'],MB_CASE_TITLE, "UTF-8").'</td> 
						<td colspan="2">'.mb_convert_case($fila['condicionestudio'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['nombrelimitacion'],MB_CASE_TITLE, "UTF-8").'</td>
					</tr>
				</table>'; 
				$resultado2= $this->Repplanilla_model->getnivelocupacional($fila['cedula']);
				foreach($resultado2 as $fila){ 
					$html .= '	
					<table border="1">
					<tr><th colspan="6" align="center"><h3>V. Nivel Ocupacional de la Persona con Discapacidad</h3></th></tr>
					<tr align="center"  bgcolor="#DCDCDC">
						<td><b>Habilidad o Destreza</b></td>
						<td><b>Posee Experiencia</b></td> 
						<td colspan="2"><b>Experiencia Laboral</b></td>
						<td><b>Act. Recreativa/Deportiva</b></td>
						<td><b>Nombre de la Actividad</b></td>
					</tr>
					<tr align="center">
						<td>'.mb_convert_case($fila['habilidaddis'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['experiencialaboral'],MB_CASE_TITLE, "UTF-8").'</td>
						<td colspan="2">'.mb_convert_case($fila['descripcionexperiencia'],MB_CASE_TITLE, "UTF-8").'</td> 
						<td>'.mb_convert_case($fila['actividadrecdep'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['indiqueactividad'],MB_CASE_TITLE, "UTF-8").'</td>
					</tr>
					<tr align="center"  bgcolor="#DCDCDC">
					    <td><b>Desarrolla Actividad</b></td>
					    <td><b>Tipo Actividad Productiva</b></td>
						<td><b>Condiciones para Aprender Oficio</b></td>
						<td><b>Manifiesta Deseo de Aprender</b></td>
						<td colspan="2"><br><b>Tipo de Oficio que le Gustaría Aprender</b></td>
					</tr>
					<tr align="center">
						<td>'.mb_convert_case($fila['realizaactividad'],MB_CASE_TITLE, "UTF-8").'</td>
					    <td>'.mb_convert_case($fila['actproductiva'],MB_CASE_TITLE, "UTF-8").'</td>	
						<td>'.mb_convert_case($fila['condicionaprender'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['deseoaprender'],MB_CASE_TITLE, "UTF-8").'</td>
						<td colspan="2">'.mb_convert_case($fila['oficioocup'],MB_CASE_TITLE, "UTF-8").'</td>
					</tr>
					<tr><th colspan="6" align="center"><h3>VI. Nivel de Apoyo Institucional para la Persona con Discapacidad</h3></th></tr>
					<tr align="center"  bgcolor="#DCDCDC">
						<td colspan="2"><br><b>Institución de Apoyo</b></td> 
						<td colspan="2"><b>Nombre completo de la Institución</b></td>
						<td colspan="2"><b>Tipo de Ayuda Prestada</b></td>
					</tr>
					<tr align="center">
						<td colspan="2">'.mb_convert_case($fila['nombreinstapoyo'],MB_CASE_TITLE, "UTF-8").'</td>
						<td colspan="2"  align="left" >'.mb_convert_case($fila['nombrecompletoindt'],MB_CASE_TITLE, "UTF-8").'</td>
						<td colspan="2">'.mb_convert_case($fila['tipoayuda'],MB_CASE_TITLE, "UTF-8").'</td> 
					</tr>
				
						<tr align="center"  bgcolor="#DCDCDC">
						<td><b>Existe Consejo Comunal</b></td>
						<td colspan="2"><br><b>Consejo Comunal en su Sector</b></td>
						<td><b>Existe Comité Comunitario</b></td>
						<td colspan="2"><b>Comité Comunitario en su Sector</b></td>
					</tr>
					<tr align="center">
						<td>'.mb_convert_case($fila['existeconsejo'],MB_CASE_TITLE, "UTF-8").'</td> 
						<td colspan="2">'.mb_convert_case($fila['nombreconsejo'],MB_CASE_TITLE, "UTF-8").'</td>
						<td>'.mb_convert_case($fila['existecomite'],MB_CASE_TITLE, "UTF-8").'</td>
						<td colspan="2">'.mb_convert_case($fila['nombrecomite'],MB_CASE_TITLE, "UTF-8").'</td>
					</tr>
					</table>'; 
				$resultado3= $this->Repplanilla_model->getusuario($fila['cedula']);  
				foreach($resultado3 as $fila){ 
					$html .= '	
					<table border="1">
						<tr><th colspan="6" align="center"><h3>Información de la Persona que Elaboro el Registro</h3></th></tr>
						<tr align="center"  bgcolor="#DCDCDC">
							<td><b>Cédula</b></td>
							<td colspan="3"><br><b>Nombre y Apellido</b></td> 
							<td><b>Teléfono</b></td>
							<td><b>Fecha del Registro</b></td>
							
						</tr>
					   <tr align="center">	
							<td>'.mb_convert_case($fila['cedulausuario'],MB_CASE_TITLE, "UTF-8").'</td>
							<td colspan="3">'.mb_convert_case($fila['nombresusuario'],MB_CASE_TITLE, "UTF-8").'</td> 
							<td>'.mb_convert_case($fila['telfusuario'],MB_CASE_TITLE, "UTF-8").'</td>
							<td>'.mb_convert_case($fila['fecharegistro'],MB_CASE_TITLE, "UTF-8").'</td>	
						</tr>
					</table><br><br><br>';
			    }

			}
		}
	$nombre_archivo = utf8_decode("Planilla Discapacitados.pdf");  
	}else{
		$html = '';
		$html .= "<style type=text/css>";
		$html .= "th{color: #fff; font-weight: bold; background-color: #AAC7E3}";
		$html .= "td{background-color: #fff; color: #222}";
		$html .= "</style>";
		$html .= "<h4>Planilla de Personas con Discapacidad</h4>";
		$html .= "<table width='100%'>";
		$html .= "<tr><th>No hay Personas con Discapacidad con las caracteristicas indicadas</th></tr>";            
		$html .= "</table>";
		$nombre_archivo = utf8_decode("Planilla de Personas con Discapacidad.pdf");
	}
		$pdf->writeHTMLCell($w = 0,$h = 0,$x='',$y = '',$html,$border = 0,$ln = 1,$fill = 0,$reseth=true,$align='C',$autopadding= true);
		$pdf->Output($nombre_archivo, 'I');
		
	}
}