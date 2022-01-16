import {FlakesTexture} from "./three.js/examples/jsm/textures/FlakesTexture.js";


let scene, camera, renderer, object,gui,startStopAni;
var guiTexturen;

var textureMenuOpen;

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight,0.1,1000);
    camera.position.z = 25;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor('rgb(60,60,60)');
    document.body.appendChild(renderer.domElement);

    const controls = createControls(camera,renderer.domElement);
    //controls.target.set(1,2,3);
    console.log("init() wurde ausgeführt");

    startStopAni = true;
    textureMenuOpen = false;

}
function initGUI(){
    gui = new dat.GUI({
        height : 5*32 -1
    });
}
function createControls(camera,canvas){
    window.addEventListener('keydown',function (event){
        switch (event.keyCode){
            case 87:
                camera.position.z -=.5;
                break;
            case 83:
                camera.position.z +=.5;
                break;
            case 65:
                camera.position.x -=.5;
                break;
            case 68:
                camera.position.x +=.5;
                break;

        }
    });
    const controls = new THREE.OrbitControls(camera,canvas);
    return  controls;
}


function createPointlight( intesity){
    var pointlight = new THREE.PointLight(0xffffff,intesity);
    pointlight.position.x=0;
    pointlight.position.y=0;
    pointlight.position.z=10;

    var guiPointLight=gui.addFolder("Point Light");
    guiPointLight.add(pointlight.position,'x',0,10);
    guiPointLight.add(pointlight.position,'y',0,10);
    guiPointLight.add(pointlight.position,'z',0,20);
    guiPointLight.add(pointlight,'intensity',0,1);
    scene.add(pointlight);
}
function createAmbientlight(intesity){

    var ambientlight = new THREE.AmbientLight(0xffffff,intesity);
    ambientlight.position.x=0;
    ambientlight.position.y=0;
    ambientlight.position.z=10;

    var guiAmbientlight=gui.addFolder("Ambient Light");
    guiAmbientlight.add(ambientlight.position,'x',0,10);
    guiAmbientlight.add(ambientlight.position,'y',0,10);
    guiAmbientlight.add(ambientlight.position,'z',0,20);
    guiAmbientlight.add(ambientlight,'intensity',0,1);
    scene.add(ambientlight);
}
function createCube(){
    var geometry = new THREE.BoxGeometry(1,1,1);
    return geometry;
}
function createTorus(){
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    return geometry;
}


function createMaterial(){
    var material = new THREE.MeshPhongMaterial({color: 0x0000ff});
    return material;
}
function createTexture(init,choosen){
    var material;
    var choose = choosen;
    var texture;
    var guitextureElement1,guitextureElement2,guitextureElement3,guitextureElement4,guitextureElement5,guitextureElement6;


    if(choose== 0){
        console.log("holz");
        texture = new THREE.TextureLoader().load('texturen/holz.png');
        material = new THREE.MeshPhongMaterial({map: texture});

    }

    if(choose == 1)
    {
        console.log("donut");
        texture= new THREE.TextureLoader().load('texturen/DonutTexture.png');
        material = new THREE.MeshPhongMaterial({map: texture});
    }
    if(choose == 2){
        console.log("gold");

        let textureFlask = new THREE.CanvasTexture(new FlakesTexture());
        textureFlask.wrapS = THREE.RepeatWrapping;
        textureFlask.wrapT = THREE.RepeatWrapping;
        textureFlask.repeat.x=10;
        textureFlask.repeat.y=6;
        var metalMaterial ={
            clearcoat: 1.0,
            clearcoatRoughness:0.1,
            metalness: 0.9,
            roughness: 0.5,
            color: 0xa89532,
            normalMap: textureFlask,
            normalScale: new THREE.Vector2(0.15,0.15)
        }
        if (!textureMenuOpen){
            guiTexturen.add(metalMaterial,'clearcoat',0,1).step(0.1).onFinishChange(function (){
                object.material= new THREE.MeshPhysicalMaterial(metalMaterial);
            });
            guiTexturen.add(metalMaterial,'clearcoatRoughness',0,1).step(0.1).onFinishChange(function (){
                object.material= new THREE.MeshPhysicalMaterial(metalMaterial);
            });
            guiTexturen.add(metalMaterial,'metalness',0,1).step(0.1).onFinishChange(function (){
                object.material= new THREE.MeshPhysicalMaterial(metalMaterial);
            });
            guiTexturen.add(metalMaterial,'roughness',0,1).step(0.1).onFinishChange(function (){
                object.material= new THREE.MeshPhysicalMaterial(metalMaterial);
            });
            guiTexturen.add(textureFlask.repeat,'x',0,25).step(1).onFinishChange(function (){
                object.material= new THREE.MeshPhysicalMaterial(metalMaterial);
            });
            guiTexturen.add(textureFlask.repeat,'y',0,25).step(1).onFinishChange(function (){
                object.material= new THREE.MeshPhysicalMaterial(metalMaterial);
            });
            material= new THREE.MeshPhysicalMaterial(metalMaterial);
            textureMenuOpen = true;
        }else{
            material= new THREE.MeshPhysicalMaterial(metalMaterial);
        }

    }


    if(init) {
        var guiTexture = gui.addFolder('Texture Offset');
        guiTexture.add(texture.offset, 'x', 0, 1);
        guiTexture.add(texture.offset, 'y', 0, 1);
    }

    return material;
}


function createTorusWithTexture(choose) {
    object = new THREE.Mesh(createTorus(), createTexture(true,choose));
    object.rotation.x=2;
    var guiTorus= gui.addFolder('Rotate Torus');
    guiTorus.add(object.rotation,'x',0,10);
    guiTorus.add(object.rotation,'y',0,10);
    scene.add(object);

}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
function stopAnimation(){
    startStopAni = false;
}
function startAnimation(){
    startStopAni = true;
}

function animate(){
    requestAnimationFrame(animate);
    if(startStopAni){
        // object.rotation.x +=0.01;
        object.rotation.y +=0.01;
    }

    renderer.render(scene,camera);
}
function createGuiForTexture(){
    guiTexturen= gui.addFolder("Texturen Menu");

    var params ={
        textureNr: 0
    };
    guiTexturen.add(params,'textureNr',0,2).step(1).onFinishChange(function (){
        console.log(params.textureNr);
        object.material=createTexture(false,params.textureNr);


    });



}

window.addEventListener('resize',onWindowResize,false);
window.addEventListener('mousedown',stopAnimation,false);
window.addEventListener('mouseup',startAnimation,false);

init();
initGUI();
createPointlight(0.5 );
createAmbientlight(.5);
createTorusWithTexture(0);
createGuiForTexture();





animate();