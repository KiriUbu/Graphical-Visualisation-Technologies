var vertexShaderText =
    [
        'precision mediump float;',
        '',
        'attribute vec2 vertPosition;',
        'attribute vec3 vertColor;',
        'varying vec3 fragColor;',
        '',
        'void main()',
        '{',
        ' fragColor = vertColor;',
        ' gl_Position = vec4(vertPosition, 0.0,1.0);',
        '}'
    ].join('\n');


var fragmentShaderText=
    [
        'precision mediump float;',
        '',
        'varying vec3 fragColor;',
        'void main()',
        '{',
        ' gl_FragColor=vec4(fragColor,1.0);',
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
    console.log("Starte Create Shaders Block ");
    var testScore = 0;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader=gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader,fragmentShaderText);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
        console.error('ERROR vertexShader konnte nicht compiliert werden !!!!',gl.getShaderInfoLog(vertexShader));
        return;
    }else{
        console.log('vertexShader wurde erfolgreich compiliert');
        testScore +=1;
    }
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
        console.error('ERROR fragementShader konnte nicht compiliert werden !!!!',gl.getShaderInfoLog(fragmentShader));
        return;
    }else{
        console.log('fragementShader wurde erfolgreich compiliert');
        testScore +=1;
    }

    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
        console.error('ERROR linking von Prgromm hat nicht geklappt', gl.getProgramInfoLog(program));
        return;
    }else{
        console.log('Program wurde erfolgreich gelinkt');
        testScore +=1;
    }

    gl.validateProgram(program);
    if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
        console.error('ERROR in PRogram Validierung', gl.getProgramInfoLog(program));
        return;
    }else{
        console.log('Program wurde erfolgreich validiert');
        testScore +=1;
    }

    if(testScore = 4){
        console.log("4/4 Test bestanden");
    }else {
        console.log(testScore + "/4 Test bestanden");
    }

    //
    // Create Buffer
    //

    var triangleVertices=
        [// X, Y              R,G,B
             0.0, 0.5,        1.0,1.0,0.0,
            -0.5,-0.5,        0.7,0.3,1.0,
             0.5,-0.5,         0.1,1.0,0.6
        ];

    var triangelVertexBufferObject= gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangelVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVertices),gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program,'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program,'vertColor');

    gl.vertexAttribPointer(
        positionAttribLocation, // Atribute location
        2, // Number of elements per attribute
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to thi attribute

    );

    gl.vertexAttribPointer(
        colorAttribLocation, // Atribute location
        3, // Number of elements per attribute
        gl.FLOAT,
        gl.FALSE,
        5* Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to thi attribute

    );
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);


    //
    // Main render loop
    //
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

};

