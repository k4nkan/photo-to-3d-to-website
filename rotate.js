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
  model.position.set(0, 0, 0);
  scene.add(model);
});

// 毎フレーム描画（アニメーションループ）
function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
