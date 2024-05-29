// main.js

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// window sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// controls
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 10;

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // Position the light diagonally
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Soft white light with reduced intensity
scene.add(ambientLight);

window.addEventListener('resize', () => {
    // update window when enlarged or minimized
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight
    renderer.setSize(sizes.width, sizes.height);

    // update camera
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    
})

const loop = () => {
    directionalLight.rotation.x += 0.2
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.z += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
 
loop();
