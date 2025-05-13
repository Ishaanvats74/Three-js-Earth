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
const detail = 12;
const geometry = new THREE.IcosahedronGeometry(1,detail);
const material = new THREE.MeshStandardMaterial({
    map: loader.load('/00_earthmap1k.jpg'),
})

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const stars = getStarfield();
scene.add(stars);

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightMat = new THREE.MeshStandardMaterial({
    map: loader.load('/03_earthlights1k.jpg'),
    blending: THREE.AdditiveBlending,
})
const lightsMesh = new THREE.Mesh(geometry, lightMat);
earthGroup.add(lightsMesh);

const cloudMat = new THREE.MeshStandardMaterial({
    map: loader.load('/05_earthcloudmaptrans.jpg'),
    blending: THREE.AdditiveBlending,
})
const cloudMesh = new THREE.Mesh(geometry, cloudMat);
cloudMesh.scale.setScalar(1.003);
earthGroup.add(cloudMesh);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2,0.5,1.5);
scene.add(sunLight);

function animate(){
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.002;
    cloudMesh.rotation.y += 0.002;  
    lightsMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();