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

    gl.clearColor(121,140,50,1.0)

};