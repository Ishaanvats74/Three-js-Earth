import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { getStarfield } from './getStarfield.js';

const h = innerHeight;
const w = innerWidth;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;  
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
const loader = new THREE.TextureLoader();

new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.IcosahedronGeometry(1,12);
const material = new THREE.MeshStandardMaterial({
    map: loader.load('/00_earthmap1k.jpg'),
    flatShading: true,
})

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const stars = getStarfield();
scene.add(stars);

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

function animate(){
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();