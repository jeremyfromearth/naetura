var Sketch = function(width, height) {
    var renderCallback = null;
    var scene = new THREE.Scene();
    var aspect = width / height;
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

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
        setRenderCallback : function(callback) {
            renderCallback = callback;
        }
    }
}
