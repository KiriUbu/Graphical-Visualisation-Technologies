var InitDemo = function (){
    console.log("Alles funktioniert");

    var canvas = document.getElementById("WebGlCanvas")
    var gl = canvas.getContext('webgl');

    if(!gl){
        console.log("WebGL not suporet. Dhaer wird alles experimantal ")
        gl = canvas.getContext('experimantal-webgl');
    }
    if(!gl){
        alert("dein Browser unterstützt kein WebGl")
    }

    gl.clearColor(0.75,.5,.5,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

};