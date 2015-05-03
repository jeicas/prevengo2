<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {
 public function __construct(){
    parent::__construct();
    $this->load->helper('recaptchalib_helper');
    $this->load->helper(array('url', 'form'));
    $this->load->model("login/login_model");
    // $this->load->model("aspirante_model");
    }
  public function index() {
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Cache-Control: post-check=0, pre-check=0',false);
    header('Pragma: no-cache');
    $username = $this->session->userdata('datasession');
    $isLogged = $username['login_ok'];
    if($isLogged == TRUE){
      $this->session->sess_destroy();
    }
    $this->load->view('login');
  }
  public function auth() {
    if ($this->input->post('user')){
      $usuario = $this->input->post('user');
      $contrasena = $this->input->post('pass');
      $resultado=array();
      $datasession = array();
      $resultado=$this->login_model->verificaUsuario($_POST['user'], $_POST['pass']);
      if ($resultado->num_rows() >0){

        foreach ($resultado->result_array() as $row){
          $variable='Ok';
          $datasession = array(
          'idusuario'  => $row['id'],
          'cedula'=> $row['cedula'],
          'usuario'=> $row['usuario'],
          'login_ok' => TRUE,
          'usuario_id'  => $_POST['user'],
          'password'=> $_POST['pass'],
          'nacionalidad' => $row['nacionalidad']);
          //Esta validacion es solo por el registro, al desarrollar los demas modulos debe revisarse
          if ($datasession['login_ok']==TRUE) {
            $this->session->set_userdata('datasession',$datasession);
            $post_array = $this->session->userdata('datasession');
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
              'success' => true,
              'msg' => 'usuario autentificado',
              'data' => $datasession
            )));     
          }else{
            $this->output->set_output(json_encode(array(
            'success' => false,
            'msg' => 'Usuario esta inactivo,consulte al Administrador del Sistema'))); 
          }
        } 
      }else {
        $this->output->set_output(json_encode(array(
          'success' => false,
          'msg' => 'usuario o password incorrecto'
        ))); 
      }
      }else{
        $this->output->set_output(json_encode(array(
         'success' => false,
         'msg' => 'usuario o password incorrecto'))); 
      }
    }
  function logout(){
    $this->session->sess_destroy();
    $this->index();
  }
   //función para verificar si el captcha es correcto
  function verifica_captcha()
    {
    //aquí debemos la clave privada que recaptcha nos ha dado
      $privatekey = "6LcJAPUSAAAAABsytFmd3-n5h9oQ4NEoJY0Nbwmj";
      $resp = recaptcha_check_answer ($privatekey, $_SERVER["REMOTE_ADDR"], $this->input->post("recaptcha_challenge_field"), $this->input->post("recaptcha_response_field"));
      if (!$resp->is_valid) {
        //si el captcha introducido es incorrecto se lo decimos
        echo json_encode(array(
          "success" => false
          ));
      }else {
        $aspirante=$this->aspirante_model->buscarAspiranteCorreo($this->input->post("cedula"),$this->input->post("nacionalidad"),$this->input->post("correo"));
        if($aspirante==true){
          $arregloUsuario = array(
            "clave"         => $this->input->post("contrasena"),
            "cedula"        => $this->input->post("cedula"),
            'nacionalidad'  => $this->input->post("nacionalidad")
            );
          $success= $this->aspirante_model->actualizarUsuario($this->input->post("cedula"),$this->input->post("nacionalidad"),$arregloUsuario);
          $this->emailUsuario($this->input->post("cedula"), $this->input->post("nacionalidad"), $this->input->post("correo"));
          echo json_encode(array(
            "success" => true
          ));
        }
        else{
          echo json_encode(array(
          "success" => false
          ));
        }
      }
    }
  public function emailUsuario($cedula, $nacionalidad, $correo)
    {
        $config = Array(
            'protocol'  => 'smtp',
            'smtp_host' => 'ssl://smtp.googlemail.com',
            'smtp_port' => '465',
            'smtp_user' => 'jhezir@gmail.com',
            'smtp_pass' => '',
            'mailtype'  => 'html',
            'starttls'  => true,
            'newline'   => "\r\n"
        );
        $usuario = $this->aspirante_model->usuario($cedula, $nacionalidad);
        foreach ($usuario->result_array() as $row) {
            $usuario         = $row['usuario'];
        };     
        $this->load->library('email', $config);
        $this->email->from($correo, 'CV Gobernación de Lara');
        $this->email->to($correo);
        $this->email->subject('Datos del Usuario - CV Gobernación de Lara');
        $this->email->message('<h1>Atención:</h1>
             <p>La contraseña para el usuario: '.$usuario.' fue restablecida. </p>
             ');
        $this->email->send();
    }
    public function session() {
    $username = $this->session->userdata('datasession');
    $usu = $username['usuario_id'];
    $password =$username['password'];
    if ($resulta=$this->login_model->verificasession($username['usuario_id'],$username['password']))  {  
      foreach ($resulta->result_array() as $row) {
        $data[] = array(
          'usuario'        => $row['usuario'],
        );
      }
      $dato = array(
        'success' => true,
        'data' => $data,
       );
        echo json_encode($dato);
    }
  }
  ////////////////////////////////////////////////////////////////
  
  public function traersession() {
    $username = $this->session->userdata('datasession');
    $cedula = $username['cedula'];
    $nacionalidad =$username['nacionalidad']; 
    $dato[] = array(
      'cedula'         => $cedula,
      'nacionalidad'   => $nacionalidad,
    );
    $this->output->set_output(json_encode(array(
      'data' => $dato
    ))); 
  }
  public function validar(){
    $username = $this->session->userdata('datasession');
    if($username['login_ok'] ){
      echo json_encode(array(
            "success" => true
        ));
    } else {
        echo json_encode(array(
            "success" => false
        ));
    }
  }
  
}