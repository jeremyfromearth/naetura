var Sketch = function(width, height) {
    var renderCallback = null;
    var scene = new THREE.Scene();
    var aspect = width / height;
    var camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    renderer.setSize(width, height);
    controls.enabled = false;

    function render() {
        requestAnimationFrame(render);        
        if(renderCallback) renderCallback();
        renderer.render(scene, camera);
    }

    return {
        scene : scene,
        camera : camera,
        renderer : renderer,
        render : render,
        controls : controls,
        setRenderCallback : function(callback) {
            renderCallback = callback;
        }
    }
}
