var vertexShaderText =
    [
        'precision mediump float;',
        '',
        'attribute vec2 vertPosition;',
        '',
        'void main()',
        '{',
        ' gl_Position = vec4(vertPosition, 0.0,1.0);',
        '}'
    ].join('\n');

var fragmentShaderText=
    [
        'precision mediump float;',
        '',
        'void main()',
        '{',
        ' gl_FragColor=vec4(1.0,0.0,0.0,1.0);',
        '}'

    ].join('\n');

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

    gl.clearColor(.78,.5,.5,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //
    // Create Shader
    //
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader=gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader,fragmentShaderText);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
        console.error('ERROR vertexShader konnte nicht compiliert werden !!!!',gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
        console.error('ERROR fragementShader konnte nicht compiliert werden !!!!',gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    if(gl.getProgramParameter(program,gl.LINK_STATUS)){
        console.error('ERROR linking von Prgromm hat nicht geklappt', gl.getProgramInfoLog(program));
        return;
    }

};

