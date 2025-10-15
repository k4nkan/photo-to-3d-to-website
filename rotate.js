import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// シーン（3D空間全体）
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// カメラ（広さ -> アスペクト比 -> 手前の描画範囲 -> 奥の描画範囲)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  5
);
camera.position.set(0, 0, 1.5);

// レンダラー（描画処理担当）
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ライト（光源）: 環境光で全体を明るく
scene.add(new THREE.AmbientLight(0xffffff, 2));
scene.add(new THREE.DirectionalLight(0xffffff, 2));

// モデルの定義
let model;
new GLTFLoader().load("model.glb", (gltf) => {
  model = gltf.scene;
  model.scale.set(1, 1, 1);
  scene.add(model);
});

// 回転速度
let rotationSpeedX = 0;
let rotationSpeedY = 0.03;
let rotationSpeedZ = 0;

// アニメーション
function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.x += rotationSpeedX;
  if (model) model.rotation.y += rotationSpeedY;
  if (model) model.rotation.z += rotationSpeedZ;

  renderer.render(scene, camera);
}
animate();

// クリックで速度変更
window.addEventListener("click", () => {
  rotationSpeedX = (Math.random() - 0.5) * 0.1;
  rotationSpeedY = (Math.random() - 0.5) * 0.1;
  rotationSpeedZ = (Math.random() - 0.5) * 0.1;
});
