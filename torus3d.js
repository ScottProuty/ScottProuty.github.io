import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight( 0xBF0022);
pointLight.position.set(15,15,15);

const pointLight2 = new THREE.PointLight( 0x00FFFF);
pointLight2.position.set(-15,-15,-15);

const ambientlight = new THREE.AmbientLight( 0xffffff, 0.1 );
scene.add(ambientlight, pointLight, pointLight2);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const lightHelper2 = new THREE.PointLightHelper(pointLight2);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, lightHelper2, gridHelper);


function moveCamera()
{
  const t = document.body.getBoundingClientRect().top;

  torus.rotation.x += 0.003;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.003;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.003;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.003;

  controls.update();

  renderer.render(scene, camera);
}

animate();
