```javascript
import * as THREE from
    'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

import { OrbitControls } from
    'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js';

// 1. Buscar el espacio donde aparecerá el modelo
const contenedor = document.getElementById('contenedor3D');
const mensaje = document.getElementById('mensaje');

if (!contenedor) {
    throw new Error('No se encontró el contenedor3D en index.html');
}

// 2. Preparar la escena
const escena = new THREE.Scene();
escena.background = new THREE.Color(0x101a2a);

// 3. Preparar la cámara
const camara = new THREE.PerspectiveCamera(
    45,
    1,
    0.1,
    100
);

camara.position.set(0, 0, 9);

// 4. Crear el renderizador
const renderizador = new THREE.WebGLRenderer({
    antialias: true
});

renderizador.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderizador.setSize(600, 420);
contenedor.appendChild(renderizador.domElement);

// 5. Añadir iluminación
const luzAmbiente = new THREE.AmbientLight(0xffffff, 2);
escena.add(luzAmbiente);

const luzPrincipal = new THREE.DirectionalLight(0xffffff, 3);
luzPrincipal.position.set(4, 5, 8);
escena.add(luzPrincipal);

// 6. Crear materiales
const materialPulmon = new THREE.MeshStandardMaterial({
    color: 0xc95c70,
    roughness: 0.75
});

const materialTraquea = new THREE.MeshStandardMaterial({
    color: 0xd9d6c9,
    roughness: 0.55
});

const materialBronquios = new THREE.MeshStandardMaterial({
    color: 0xe6a0a8,
    roughness: 0.65
});

// 7. Función para crear una estructura redondeada
function crearPulmon(x, y, ancho, alto) {
    const geometria = new THREE.SphereGeometry(1, 32, 24);

    const pulmon = new THREE.Mesh(
        geometria,
        materialPulmon
    );

    pulmon.position.set(x, y, 0);
    pulmon.scale.set(ancho, alto, 0.75);

    escena.add(pulmon);

    return pulmon;
}

// 8. Crear ambos pulmones
crearPulmon(-1.05, -0.35, 0.85, 1.65);
crearPulmon(1.05, -0.35, 0.85, 1.65);

// 9. Función para crear tubos entre dos puntos
function crearTubo(inicio, fin, radio, material) {
    const direccion = new THREE.Vector3().subVectors(fin, inicio);
    const longitud = direccion.length();

    const geometria = new THREE.CylinderGeometry(
        radio,
        radio,
        longitud,
        16
    );

    const tubo = new THREE.Mesh(geometria, material);

    tubo.position.copy(inicio).add(fin).multiplyScalar(0.5);

    tubo.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direccion.normalize()
    );

    escena.add(tubo);

    return tubo;
}

// 10. Crear la tráquea
crearTubo(
    new THREE.Vector3(0, 2.2, 0),
    new THREE.Vector3(0, 0.5, 0),
    0.19,
    materialTraquea
);

// 11. Crear los bronquios principales
crearTubo(
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(-0.8, -0.15, 0),
    0.13,
    materialBronquios
);

crearTubo(
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(0.8, -0.15, 0),
    0.13,
    materialBronquios
);

// 12. Permitir rotar y acercar el modelo
const controles = new OrbitControls(
    camara,
    renderizador.domElement
);

controles.enableDamping = true;
controles.dampingFactor = 0.06;
controles.minDistance = 4;
controles.maxDistance = 15;

// 13. Adaptar el visor al tamaño disponible
function ajustarTamano() {
    const ancho = contenedor.clientWidth;
    const alto = Math.max(360, Math.min(ancho * 0.8, 520));

    camara.aspect = ancho / alto;
    camara.updateProjectionMatrix();

    renderizador.setSize(ancho, alto);
}

ajustarTamano();

window.addEventListener('resize', ajustarTamano);

// 14. Animar y renderizar la escena
function animar() {
    requestAnimationFrame(animar);

    controles.update();
    renderizador.render(escena, camara);
}

animar();

if (mensaje) {
    mensaje.textContent =
        'Modelo 3D cargado. Arrastra para rotar y usa la rueda para acercar.';
}

console.log('PulmoLab 3D: escena iniciada.');
```
`
