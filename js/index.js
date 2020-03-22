import * as THREE from '../node_modules/three/build/three.module.js';

function main() {
	const canvas = document.getElementById('canvas');
	const render = new THREE.WebGLRenderer({ canvas });

	const fov = 75; // поле зрения
	const aspect = 2; // соотношение сторон
	const near = 0.1; // пространство перед камерой / камера усечена рядом с плоскостью
	const far = 5; // пространство за камерой / камера усечена в дальней плоскости.
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // параметры камеры
	const scene = new THREE.Scene(); // создаем сцену

	//позиция камеры
	camera.position.z = 2;

	//параметры объекта
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;

	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); //создаем геометрию объекта
	const material = new THREE.MeshBasicMaterial({ color: 0xffaa3d }); //создаем материал объекта
	const cube = new THREE.Mesh(geometry, material); // применяем геометрию и объект

	scene.add(cube); // добавляем объект на сцену

	render.render(scene, camera); // рендерим сцену, передав в нее сцену и камеру
}

main();
