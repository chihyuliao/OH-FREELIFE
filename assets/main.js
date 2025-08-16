import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const loader = new GLTFLoader();
let dolphin;
loader.load('/dolphin/scene.gltf', (gltf) => {
    dolphin = gltf.scene;
    dolphin.scale.set(0.5, 0.5, 0.5);
    dolphin.position.y = -2;
    scene.add(dolphin);
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    if (dolphin) {
        dolphin.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});