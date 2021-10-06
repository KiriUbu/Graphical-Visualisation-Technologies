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


    canvas.with = window.innerWidth;
    canvas.height=window.innerHeight;
    gl.viewport(0,0,window.innerWidth,window.innerHeight)
};