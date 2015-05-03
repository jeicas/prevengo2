<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class App extends CI_Controller {
	public function __construct(){
        parent::__construct();
        header('Cache-Control: no-store, no-cache, must-revalidate');
		header('Cache-Control: post-check=0, pre-check=0',false);
		header('Pragma: no-cache');
		$isLogged = $this->session->userdata('datasession');
        if(!isset($isLogged['login_ok']) ||$isLogged['login_ok']!=TRUE ){
			redirect("/login/login", "refresh");						
    	}
	}
	public function home(){
		$this->load->view('app');
	}
}