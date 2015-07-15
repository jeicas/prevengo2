<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class ActividadReportes extends CI_Controller 
{
      public function __construct(){
        parent::__construct();
        session_start();
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('session');
        $this->load->model('empleado/empleado_model');
        $this->load->model('login/login_model');
        $this->load->model('seguridad/usuario_model');
        $this->nacionalidad='V';
        $this->cedula=$this->input->post('cedula');
        $this->load->library(array('session'));
        $this->load->library('Pdf'); 
    }
     //oriiii aqui estoy agregandole datos xq estoy usando lo que tiene esta grid si vas a cambiar algo de aqui me avisas
    public function obtenerEmpleadosGrid(){       
        $username = $this->session->userdata('datasession');        
                
            $empleados=$this->empleado_model->obtenerEmpleadosGrid3($username['cedula'],$username['nacionalidad']);
       
                 
         
        if($empleados->num_rows()>0){

            foreach ($empleados->result_array() as $row){
                $data[] = array(                    
                    'nacionalidad'      => $row['nacionalidad'],
                    'cedula'            => $row['cedula'],                    
                    'nombre'            => $row['nombre'],
                    'dnombre'           => $row['dnombre'],
                    'apellido'          => $row['apellido'],
                    'nombres'               => $row['nombre'],
                    'apellidos'             => $row['apellido'],
                    'fechanacimiento'       => $row['fechanac'],
                    'sexo'                  => $row['sexo'],
                    'codTlf1'               => substr($row['tlf1'],0,3),
                    'movil'                 => substr($row['tlf1'],3),
                    'codTlf2'               => substr($row['tlf2'],0,3),
                    'local'                 => substr($row['tlf2'],3),
                    'status'                => $row['estatus'],
                    'correo'                => $row['correo'],
                    'foto'                  => $row['foto'],
                    'cmbtiponomina'         => $row['tiponomina'],
                    'cmbcargo'              => $row['cargo'],
                    'cmbdepartamento'       => $row['departamento'],
                    'cmbestado'             => $row['estadoid'],
                    'cmbmunicipio'          => $row['municipioid'],
                    'cmbparroquia'          => $row['parroquiaid'],
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
        
    }
    public function obtenerAutorizados(){
        $username = $this->session->userdata('datasession');        
        $estado=($this->input->get("estado")!=null) ?"=".$this->input->get("estado"):'LIKE "%"';
        $motivo=($this->input->get("motivo")!=null) ?"=".$this->input->get("motivo"):'LIKE "%"';
        $tipo=($this->input->get("tipo")!=null) ?"=".$this->input->get("tipo"):'LIKE "%"';
        if($this->input->get("desde")=='' || $this->input->get("hasta")==''){
            $desde=date('Y-m-d');
            $hasta=date('Y-m-d');
        }else{
            $desde=$this->input->get("desde");
            $hasta=$this->input->get("hasta");
        }
        $resultdbd=array();
        if ($resultdbd=$this->empleado_model->consultarAutorizados2($username['idusuario'],$motivo,$tipo,$desde,$hasta,$estado)){
            $output = array(
                'success'   => true,
                'total'     => count($resultdbd),
                'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
            );
            echo json_encode($output);
        }
    }
    public function obtenerEmpleadosAutorizados(){
    $resultdbd=array();
        if ($resultdbd=$this->empleado_model->cargarAutorizados()){
                $output = array(
                   'success'   => true,
                   'total'     => count($resultdbd),
                   'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
                );
           echo json_encode($output);
        }
    }
    public function obtenerEmpleadosProcesados(){
    $resultdbd=array();
        if ($resultdbd=$this->empleado_model->cargarProcesados()){
                $output = array(
                   'success'   => true,
                   'total'     => count($resultdbd),
                   'data'      => array_splice($resultdbd,$this->input->get("start"),$this->input->get("limit"))
                );
           echo json_encode($output);
        }
    }
    public function obtenerEmpleado() {
        $username = $this->session->userdata('datasession');
        $buscarpersona=$this->empleado_model->cargarEmpleado($this->input->get('nacionalidad'),$this->input->get('cedula'));
        $divi3=$this->empleado_model->buscarDivisionUsuario($username['cedula'],$username['nacionalidad']);
            foreach ($divi3->result_array() as $row1){
            $dat[] = array( 
                'depa'=> $row1['division'],
                'ndepa'=> $row1['nombre'],
            );
        }
        $division=$row1['division'];
      if($buscarpersona!=false){
        //$nombredepa=$this->empleado_model->buscarDepartamentoEmpleado($this->input->get('cedula'),$this->input->get('nacionalidad'));
        //foreach ($nombredepa->result_array() as $row2){
          //  $dat[] = array( 
            //    'departamentoanterior'=> $row2['departamentoanterior'],
              //  'nombredepartamento'=> $row2['ndepar']
            //);
        //}
            foreach ($buscarpersona->result_array() as $row){
                $data[] = array(
                    'nombres'               => strtoupper($row['nombre']),
                    'apellidos'             => strtoupper($row['apellido']),
                    'fechanac'       => $row['fechanac'],
                    'sexo'                  => $row['sexo'],
                    'codTlf1'               => substr($row['tlf1'],0,3),
                    'movil'                 => substr($row['tlf1'],3),
                    'codTlf2'               => substr($row['tlf2'],0,3),
                    'local'                 => substr($row['tlf2'],3),
                    'status'                => $row['estatus'],
                   // 'eestatus'               => $row['eestatus'],
                    'correo'                => $row['correo'],
                    'foto'                  => $row['foto'],
                    'cmbtiponomina'         => strtoupper($row['tiponomina']),
                    'cmbcargo'              => strtoupper($row['cargo']),
                    'cmbdepartamento'       => strtoupper($row['departamento']),
                    'departamentoUsuario'   => $division,
                    //'departamentoanterior'  => $row2['departamentoanterior'],
                    'nombredepartamento'   => $row['dnombre']
               );
            }   

            $output = array(
                'success' => true,
                'data'    => $data,
                'total'   => count($data));
        echo json_encode($output);
        }else{
            echo json_encode(array(
                "success"   => false,
            ));
        }
    }
    public function guardarFoto(){
        $this->load->library("camara");
        $result = $this->camara->guardarFoto();
    }
    public function guardar_imagen($nombrefoto,$fotoType,$fotoTmp_name){        
        if ($fotoTmp_name  == '') {
            echo ('foto obligatoria');
        } else if ($fotoTmp_name != '' && ($fotoType == "image/gif" || $fotoType== "image/jpeg" || $fotoType== "image/png")) {
            $img_tipo   = explode('/', $fotoType);
            $img_nombre = $nombrefoto.".".$img_tipo[1];
            move_uploaded_file($fotoTmp_name,'empleados/'.$img_nombre);
        }
    }
    public function guardarEmpleado(){
            $cedula=$this->input->post('txtcedulaempleado');
            $nacionalidad=$this->input->post('cmbnacionalidad');
            $input=$this->input->post('seleccionfoto');
            $username = $this->session->userdata('datasession');
            
            $foto=($this->cedula.'.jpg');
            $row['foto']=0;
            $config['upload_path'] = './imagen/foto';
            $config['allowed_types'] = 'gif|jpg|png';
            $this->load->library('upload', $config);
            $fotoocul=$this->input->post('foto');
            
            if($this->input->post('cmbdepartamento')!=''){
                $departamento=$this->input->post('cmbdepartamento');
            }else{
                $divi3=$this->empleado_model->buscarDivisionUsuario($username['cedula'],$username['nacionalidad']);
                foreach ($divi3->result_array() as $row5){
                    $data[] = array( 
                        'divi3'=> $row5['division']
                    );
                 }
                $divison=$row5['division'];
            }
            $bdfoto=$this->empleado_model->buscarFoto($cedula,$nacionalidad);
            if($bdfoto!=false){
                foreach ($bdfoto->result_array() as $row){
                    $data[] = array( 
                        'foto'=> $row['foto']
                    );
                }
            }
            if($bdfoto==false){
                if($input=='1'){
                    if($this->input->post('existeFoto')=='0'){                        
                        $nombrefoto2    = $nacionalidad.$cedula."."."jpeg";
                    }
                }if($input=='2'){                
                    $img_tipo       = explode('/', $_FILES['foto']['type']);
                    $nombrefoto     = "_DSC".$nacionalidad.$cedula;
                    $nombrefoto2    = $nacionalidad.$cedula.".".$img_tipo[1];
                    $fotoType       = $_FILES['foto']['type'];
                    $fotoTmp_name   = $_FILES['foto']['tmp_name'];
                    $this->guardar_imagen($nombrefoto,$fotoType,$fotoTmp_name);                
                }if($input=='3' && $fotoocul==''){
                    $nombrefoto2 =0;

                }

            }

            elseif($row['foto']==0 ){
              
                    $img_tipo       = explode('/', $_FILES['foto']['type']);
                    $nombrefoto     = "_DSC".$nacionalidad.$cedula;
                    $nombrefoto2    = $nacionalidad.$cedula.".".$img_tipo[1];
                    $fotoType       = $_FILES['foto']['type'];
                    $fotoTmp_name   = $_FILES['foto']['tmp_name'];
                    $this->guardar_imagen($nombrefoto,$fotoType,$fotoTmp_name);
                 
            }else{
                $nombrefoto2=$row['foto'];
            }
           if ($this->input->post('status')=='Activo' || $this->input->post('status')==1 || $this->input->post('status')=='Seleccionar' ||$this->input->post('status')==""){
                $status=1;
            }else{
                $status=0;
                $departamento=99;
            }
            if ($this->input->post('cmbcargo')=='Seleccione' || $this->input->post('cmbcargo')==""){
                $cargo=16;
            }else{
                $cargo=$this->input->post('cmbcargo');
            }
            if ($this->input->post('status')=='Activo' || $this->input->post('status')==1 || $this->input->post('status')=='Seleccionar' ||$this->input->post('status')=="" ){
                $status2=1;
            }else{
                $status2=0;
            }
            $idusuario=$this->usuario_model->obtenerId($cedula,$nacionalidad);
            if($idusuario!=false){
                foreach ($idusuario->result_array() as $row){
                    $data[] = array( 
                        'id'=> $row['id'],
                       

                    );
                $id=$row['id'];
                }
            }
            //#########################################ESTO YA NO SE UTILIZA########################################
         /*   $depa3=$this->empleado_model->buscarDepartamentoUsuario($username['cedula'],$username['nacionalidad']);
                foreach ($depa3->result_array() as $row3){
                    $data[] = array( 
                        'depaU'=> $row3['departamento']
                    );
            }
            $departamento3=$row3['departamento'];
           */ //######################################################################################################

             $divi3=$this->empleado_model->buscarDivisionUsuario($username['cedula'],$username['nacionalidad']);
                foreach ($divi3->result_array() as $row5){
                    $data[] = array( 
                        'divi3'=> $row5['division']
                    );
            }
            $divison3=$row5['division'];
            
            //echo json_encode($departamento3);
            // $departa=$this->empleado_model->buscarDepartamentoEmpleado($cedula,$nacionalidad);
            // echo ($departa);
            // foreach ($departa->result_array() as $row4){
            //     $data[] = array( 
            //         'departa'=> $row4['departamentoanterior'],
            //         'nombres'=> $row4['ndepar']
            //     );
            // }
            // $departamento2=$row4['departamentoanterior'];
            // $nombre=$row4['ndepar'];

            $dataempleado = array(
                'cedula'            =>   $this->input->post('txtcedulaempleado'),
                'nacionalidad'      =>   $this->input->post('cmbnacionalidad'),
                'tiponomina'        =>   $this->input->post('cmbtiponomina'),
                'cargo'             =>   $cargo,              
                'division'          =>   $divison3,//Ahora es division
                'estatus'           =>   $status,
               // 'departamentoanterior' =>  $departamento3,
               // 'deparlogueado'      =>  $departamento3,
            );

            if($this->input->post('cmbparroquia')!=0 && $this->input->post('seleccionfoto')!=1 && $this->input->post('seleccionfoto')!=2)
            {

                $datapersona = array(
                    'cedula'            =>   $this->input->post('txtcedulaempleado'),
                    'nacionalidad'      =>   $this->input->post('cmbnacionalidad'),
                    'nombre'            =>   strtoupper($this->input->post('nombres')),
                    'apellido'          =>   strtoupper($this->input->post('apellidos')),
                    'direccion'         =>   '',
                    'telefono1'         =>   $this->input->post('codTlf1').$this->input->post('movil'),
                    'telefono2'         =>   $this->input->post('codTlf2').$this->input->post('local'),
                    'correo'            =>   strtoupper($this->input->post('correo')),
                    'fechanacimiento'   =>   $this->input->post('fechanacimiento'),
                    'parroquia'         =>   $this->input->post('cmbparroquia'),
                    'sexo'              =>   strtoupper($this->input->post('sexo')),
                     'profesion' =>$this->input->post('cmbprofesion'),
                    'estatus'           =>   $status
                );
            }
            elseif($this->input->post('cmbparroquia')!=0)
            {
                $datapersona = array(
                    'cedula'            =>   $this->input->post('txtcedulaempleado'),
                    'nacionalidad'      =>   $this->input->post('cmbnacionalidad'),
                    'nombre'            =>   strtoupper($this->input->post('nombres')),
                    'apellido'          =>   strtoupper($this->input->post('apellidos')),
                    'direccion'         =>   '',
                    'telefono1'         =>   $this->input->post('codTlf1').$this->input->post('movil'),
                    'telefono2'         =>   $this->input->post('codTlf2').$this->input->post('local'),
                    'correo'            =>   strtoupper($this->input->post('correo')),
                    'fechanacimiento'   =>   $this->input->post('fechanacimiento'),
                    'foto'              =>   $nombrefoto2,
                    'parroquia'         =>   $this->input->post('cmbparroquia'),
                    'profesion' =>$this->input->post('cmbprofesion'),
                    'sexo'              =>   strtoupper($this->input->post('sexo')),
                    'estatus'           =>   $status
                );
            }
            elseif($this->input->post('seleccionfoto')==3)
            {
                 $datapersona = array(
                    'cedula'            =>   $this->input->post('txtcedulaempleado'),
                    'nacionalidad'      =>   $this->input->post('cmbnacionalidad'),
                    'nombre'            =>   strtoupper($this->input->post('nombres')),
                    'apellido'          =>   strtoupper($this->input->post('apellidos')),
                    'direccion'         =>   '',
                    'telefono1'         =>   $this->input->post('codTlf1').$this->input->post('movil'),
                    'telefono2'         =>   $this->input->post('codTlf2').$this->input->post('local'),
                    'correo'            =>   strtoupper($this->input->post('correo')),
                    'fechanacimiento'   =>   $this->input->post('fechanacimiento'),
                    'foto'              =>   0,
                      'profesion' =>$this->input->post('cmbprofesion'),
                    'sexo'              =>   strtoupper($this->input->post('sexo')),
                    'estatus'           =>   $status
                );
            }
            elseif($this->input->post('seleccionfoto')!=1 && $this->input->post('seleccionfoto')!=2)
            {
                $datapersona = array(
                    'cedula'            =>   $this->input->post('txtcedulaempleado'),
                    'nacionalidad'      =>   $this->input->post('cmbnacionalidad'),
                    'nombre'            =>   strtoupper($this->input->post('nombres')),
                    'apellido'          =>   strtoupper($this->input->post('apellidos')),
                    'direccion'         =>   '',
                    'telefono1'         =>   $this->input->post('codTlf1').$this->input->post('movil'),
                    'telefono2'         =>   $this->input->post('codTlf2').$this->input->post('local'),
                    'correo'            =>   strtoupper($this->input->post('correo')),
                    'fechanacimiento'   =>   $this->input->post('fechanacimiento'),
                    'sexo'              =>   strtoupper($this->input->post('sexo')),
                     'profesion' =>$this->input->post('cmbprofesion'),
                    'estatus'           =>   $status
                );
          
            }
          
            else
            {
                $datapersona = array(
                    'cedula'            =>   $this->input->post('txtcedulaempleado'),
                    'nacionalidad'      =>   $this->input->post('cmbnacionalidad'),
                    'nombre'            =>   strtoupper($this->input->post('nombres')),
                    'apellido'          =>   strtoupper($this->input->post('apellidos')),
                    'direccion'         =>   '',
                    'telefono1'         =>   $this->input->post('codTlf1').$this->input->post('movil'),
                    'telefono2'         =>   $this->input->post('codTlf2').$this->input->post('local'),
                    'correo'            =>   strtoupper($this->input->post('correo')),
                    'fechanacimiento'   =>   $this->input->post('fechanacimiento'),
                    'foto'              =>   $nombrefoto2,
                    'profesion' =>$this->input->post('cmbprofesion'),
                    'sexo'              =>   strtoupper($this->input->post('sexo')),
                    'estatus'           =>   $status
                );
            }

            $resultado=$this->empleado_model->existeempleado($nacionalidad,$cedula);
            if ($resultado->num_rows() > 0){
                $result=$this->empleado_model->updatePersona($datapersona);
                $result2=$this->empleado_model->updateEmpleado($dataempleado);
           // if($departamento2==$departamento3){
                //status6
                //$idusuario!=false
                if($idusuario!=false && $datapersona['estatus']=='Inactivo'){
                    if ($this->input->post('status')=='Activo' || $this->input->post('status')==1 || $this->input->post('status')=='Seleccionar' ||$this->input->post('status')=="" ){
                        $status2=1;
                    }else{
                        $status2=0;
                     }
                    $datausuario = array(
                    'id' =>             ($id=='')?$this->input->post('id'):$id,
                    'status'=>           $status2
                    );
                    $result3=$this->usuario_model->updateusuario($datausuario);
                 }
           // }
            if($result && $result2 ){
                echo json_encode(array(
                    "success"   => true,
                    "msg"       => " Actualizado con Exito."//$result //modificado en la base de datos
                ));
            }else{
                echo json_encode(array(
                    "success"   => false,
                    "msg"       => "No se pudo Actualizar." //no se modifico en la base de datos
                ));
            }
        }else{
            $result=$this->empleado_model->insertPersona($datapersona);
            $result2=$this->empleado_model->insertEmpleado($dataempleado);
            if($result && $result2){
                echo json_encode(array(
                    "success"   => true,
                    "msg"       => "Se Guardo con Éxito." //modificado en la base de datos
                ));
            }else{
                echo json_encode(array(
                    "success"   => false,
                    "msg"       => "No se pudo Guardar." //no se modifico en la base de datos
                ));
            }
        }
    }
}