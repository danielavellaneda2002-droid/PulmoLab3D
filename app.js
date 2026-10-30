import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/loaders/GLTFLoader.js'; 
console.log("NUEVA VERSION DE PULMOLAB CARGADA");
const contenedor = document.getElementById('contenedor3D');
const mensaje = document.getElementById('mensaje');

const escena = new THREE.Scene();
escena.background = new THREE.Color(0x101a2a);

const camara = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camara.position.set(0, 0, 8);

const renderizador = new THREE.WebGLRenderer({ antialias: true });
renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderizador.outputColorSpace = THREE.SRGBColorSpace;
contenedor.appendChild(renderizador.domElement);

escena.add(new THREE.AmbientLight(0xffffff, 2));

const luz = new THREE.DirectionalLight(0xffffff, 3);
luz.position.set(5, 8, 10);
escena.add(luz);

const controles = new OrbitControls(camara, renderizador.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.05;

const cargador = new GLTFLoader();
let modelo;
let partes = [];

cargador.load(
  './3d-vh-f-lung.glb',

  function (resultado) {
    modelo = resultado.scene;

    // Centrar y ajustar el modelo automáticamente
    const caja = new THREE.Box3().setFromObject(modelo);
    const centro = caja.getCenter(new THREE.Vector3());
    const tamano = caja.getSize(new THREE.Vector3());

    modelo.position.sub(centro);

    const dimensionMayor = Math.max(tamano.x, tamano.y, tamano.z);
    const escala = 5 / dimensionMayor;
    modelo.scale.setScalar(escala);

    modelo.traverse((objeto) => {
      if (objeto.isMesh) {
        partes.push(objeto);
      }
    });

    escena.add(modelo);

    camara.position.set(0, 0, 8);
    controles.target.set(0, 0, 0);
    controles.update();

    mensaje.textContent = `Modelo cargado correctamente. ${partes.length} estructuras detectadas.`;
    console.log('Modelo cargado:', modelo);
    console.log('Estructuras:', partes);
  },

  function (progreso) {
    if (progreso.total) {
      const porcentaje = Math.round(
        (progreso.loaded / progreso.total) * 100
      );
      mensaje.textContent = `Cargando modelo: ${porcentaje}%`;
    }
  },

  function (error) {
    console.error('Error al cargar el modelo:', error);
    mensaje.textContent = 'No se pudo cargar el modelo. Revisa la consola.';
  }
);

// Ajustar el visor al tamaño disponible
function ajustarTamano() {
  const ancho = contenedor.clientWidth;
  const alto = Math.max(360, Math.min(ancho * 0.8, 520));

  camara.aspect = ancho / alto;
  camara.updateProjectionMatrix();

  renderizador.setSize(ancho, alto);
}

ajustarTamano();
window.addEventListener('resize', ajustarTamano);

// Animación
function animar() {
  requestAnimationFrame(animar);
  controles.update();
  renderizador.render(escena, camara);
}

animar();
