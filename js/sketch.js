var Sketch = function(width, height) {
    var renderCallback = function(){};
    var scene = new THREE.Scene();
    var aspect = width / height;
    var camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    var controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 5.0;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.01;

    function render() {
        renderCallback();
        controls.update()
        renderer.render(scene, camera);
        requestAnimationFrame(render);        
    }

    function setFullWindow(isFull) {
        if(isFull) {
            window.addEventListener( 'resize', onWindowResize, false );
            onWindowResize();
        } else {
            window.removeEventListener( 'resize', onWindowResize, false );
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        controls.handleResize();
    }

    return {
        scene : scene,
        camera : camera,
        renderer : renderer,
        render : render,
        controls : controls,
        setRenderCallback : function(callback) {
            renderCallback = callback;
        }, 
        setFullWindow : setFullWindow
    }
}
