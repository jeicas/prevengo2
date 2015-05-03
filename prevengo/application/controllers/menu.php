
<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Menu extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->library(array('session'));
        $this->load->helper(array('url'));
    }
    public function menus() {
        $folder = array();
        $username = $this->session->userdata('datasession');
        if($username['login_ok'] ){
            $this->load->model('menu_model');
            If ($folder = $this->menu_model->cargarmenu()){
                $this->output->set_content_type('application/json');
                $this->output->set_output(json_encode(array(
                'items' => $folder)));
            }
        }
    }
}