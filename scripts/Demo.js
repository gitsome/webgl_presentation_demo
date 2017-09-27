var Demo = {};
var OrbitControls = OrbitControls || {};

(function () {

    var canvasElem;
    var canvasContainer;

    Demo.start = function () {

        // grab the target for the webgl canvas
        canvasContainer = $('.canvas-container');

        // setup the WebGL 3D context
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvasContainer.width(), canvasContainer.height());
        canvasContainer.append(renderer.domElement);

        // setup the camera
        var camera = new THREE.PerspectiveCamera(45, canvasContainer.width() / canvasContainer.height(), 1, 500);
        camera.position.set(0, -100, 100);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // create the scene
        var scene = new THREE.Scene();

        // add ambient light
        scene.add(new THREE.AmbientLight(0x777777));

        // add a point light
        pointLight = new THREE.PointLight(0xff000, 1.0, 50);
        scene.add(pointLight);

        // add Orbit Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;

        // create a geometry to house triangle vertices
        var geometry = new THREE.Geometry();    // this is the standard low level geometry

        // add the vertices
        geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
        geometry.vertices.push(new THREE.Vector3(10, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 10, 0));

        // designate the faces by vertex indices
        geometry.faces.push(new THREE.Face3( 0, 1, 2 ));

        // use ThreeJS to populate the normals array for use in the phong shader
        geometry.computeFaceNormals();

        // create a phong material
        var material = new THREE.MeshPhongMaterial({
            color: 0xAAAAAA,
            side: THREE.DoubleSide
        });

        // finally create the final mesh
        var mesh = new THREE.Mesh(geometry, material);

        // add the mesh to the scene
        scene.add(mesh);

        // our render loop
        var render = function () {

            // move point light to camera position
            pointLight.position.x = camera.position.x;
            pointLight.position.y = camera.position.y;
            pointLight.position.z = camera.position.z;

            // render
            renderer.render(scene, camera);

            // when the next frame is ready call render again
            requestAnimationFrame(render);
        };

        // kick off the animation loop
        render();
    };

})();