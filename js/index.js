import * as THREE from '../node_modules/three/build/three.module.js';

function main() {
	const canvas = document.getElementById('canvas');
	const render = new THREE.WebGLRenderer({ canvas });

	const fov = 75; // поле зрения
	const aspect = 2; // соотношение сторон
	const near = 0.1; // пространство перед камерой / камера усечена рядом с плоскостью
	const far = 7; // пространство за камерой / камера усечена в дальней плоскости.
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // параметры камеры
	const scene = new THREE.Scene(); // создаем сцену

	{
		// создаем свет
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		scene.add(light);
	}

	//позиция камеры
	camera.position.z = 3;

	//параметры объекта
	const boxWidth = 1;
	const boxHeight = 2;
	const boxDepth = 2;

	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); // создаем геометрию объекта
	// const material = new THREE.MeshPhongMaterial({ color: 0xffaa3d }); // создаем материал объекта
	// const cube = new THREE.Mesh(geometry, material); // применяем геометрию и объект

	//scene.add(cube); // добавляем объект на сцену

	//render.render(scene, camera); // рендерим сцену, передав в нее сцену и камеру

	function makeInstance(geometry, color, x) {
		const material = new THREE.MeshPhongMaterial({ color });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		cube.position.x = x;

		return cube;
	}

	const cubes = [
		makeInstance(geometry, 0x44aa88, 0),
		makeInstance(geometry, 0xffaa88, -2),
		makeInstance(geometry, 0x14aa00, 2)
	];

	function resizeRendererToDisplaySize(renderer) {
		const canvas = render.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) render.setSize(width, height, false);

		return needResize;
	}

	function renderer(time) {
		time *= 0.001; // конвертировать время в секунды

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = render.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		cubes.forEach((cube, idx) => {
			const speed = 1 + idx * 0.1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;
		});

		render.render(scene, camera); // THREE.WebGLRenderer.render(scene: any, camera: any, ...args: any[])
		requestAnimationFrame(renderer);
	}

	requestAnimationFrame(renderer); // функция для рендера(renderer)
}

main();
