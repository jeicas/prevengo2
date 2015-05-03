Ext.define('myapp.controller.Camara',{
	configurarCamara : function(panel){
		// open flash configuration panel -- specify tab name:
		// "camera", "privacy", "default", "localStorage", "microphone", "settingsManager"
		if (!panel) panel = "camera";
		var movie = this.mixins.camara.get_movie();
		movie._configure("camera");
		console.log(this.mixins.camara.get_movie());
	},
	get_movie: function() {
		// get reference to movie object/embed in DOM
		//if (!this.loaded) return alert("ERROR: Movie is not loaded yet");
		var movie = document.getElementById('webcam_movie');
		if (!movie) alert("ERROR: Cannot locate movie 'webcam_movie' in DOM");
		return movie;
	}
});