import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { getStarfield } from './getStarfield.js';

const h = innerHeight;
const w = innerWidth;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;  
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
const loader = new THREE.TextureLoader();

new OrbitControls(camera, renderer.domElement);
const detail = 12;
const geometry = new THREE.IcosahedronGeometry(1,detail);
const material = new THREE.MeshPhongMaterial({
    map: loader.load('/00_earthmap1k.jpg'),
    specular: new THREE.Color('grey'),
    shininess: 5,
})

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const stars = getStarfield();
scene.add(stars);

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightMat = new THREE.MeshBasicMaterial({
    map: loader.load('/03_earthlights1k.jpg'),
    blending: THREE.AdditiveBlending,
})

const lightsMesh = new THREE.Mesh(geometry, lightMat);

earthGroup.add(lightsMesh);


const cloudMat = new THREE.MeshPhongMaterial({
    map: loader.load('/05_earthcloudmaptrans.jpg'),
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
})

const cloudMesh = new THREE.Mesh(geometry, cloudMat);
cloudMesh.scale.setScalar(1.003);
earthGroup.add(cloudMesh);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.0); 
sunLight.position.set(-5, 2, 5); // More angled sunlight
sunLight.castShadow = true;
sunLight.shadow.bias = -0.001;
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

function animate(){
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.002;
    cloudMesh.rotation.y += 0.002;  
    lightsMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();