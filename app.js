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
let estructuraSeleccionada = null;

const raycaster = new THREE.Raycaster();
const puntero = new THREE.Vector2();
cargador.load(
  './3d-vh-f-lung.glb',

  function (resultado) {
    modelo = resultado.scene;

    // Centrar y ajustar el modelo automáticamente
const caja = new THREE.Box3().setFromObject(modelo);
const tamano = caja.getSize(new THREE.Vector3());

const dimensionMayor = Math.max(tamano.x, tamano.y, tamano.z);
const escala = 5 / dimensionMayor;

modelo.scale.setScalar(escala);
modelo.updateMatrixWorld(true);

// Centrar después de aplicar la escala
const cajaAjustada = new THREE.Box3().setFromObject(modelo);
const centro = cajaAjustada.getCenter(new THREE.Vector3());

modelo.position.sub(centro);
modelo.updateMatrixWorld(true);

// Ajustar cámara al modelo
const esfera = new THREE.Sphere();
new THREE.Box3().setFromObject(modelo).getBoundingSphere(esfera);

const distancia = esfera.radius / Math.sin(THREE.MathUtils.degToRad(camara.fov / 2));

camara.position.set(0, 0, distancia * 1.4);
camara.near = 0.1;
camara.far = distancia * 10;
camara.updateProjectionMatrix();

controles.target.set(0, 0, 0);
controles.update();

    modelo.traverse((objeto) => {
      if (objeto.isMesh) {
        partes.push(objeto);
      }
    });

    escena.add(modelo);

    mensaje.textContent = `Modelo cargado correctamente. ${partes.length} estructuras detectadas.`;
    console.log('Modelo cargado:', modelo);
    console.log('Estructuras:', partes);
    console.log(
  'NOMBRES DE ESTRUCTURAS:',
  partes.map(parte => parte.name)
);
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
// Detectar estructuras anatómicas al hacer clic
renderizador.domElement.addEventListener('click', (evento) => {
  console.log('¡Clic detectado en el visor!');
  if (!modelo) return;

  const rect = renderizador.domElement.getBoundingClientRect();

  puntero.x = ((evento.clientX - rect.left) / rect.width) * 2 - 1;
  puntero.y = -((evento.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(puntero, camara);

  const intersecciones = raycaster.intersectObjects(partes, false);

if (intersecciones.length > 0) {

// Restaurar el material de la estructura anterior
if (
estructuraSeleccionada &&
estructuraSeleccionada.userData.materialOriginal
) {
estructuraSeleccionada.material =
estructuraSeleccionada.userData.materialOriginal;
}

// Identificar la nueva estructura
estructuraSeleccionada = intersecciones[0].object;

// Guardar su material original
if (!estructuraSeleccionada.userData.materialOriginal) {
estructuraSeleccionada.userData.materialOriginal =
estructuraSeleccionada.material;
}

// Crear una copia del material para resaltarlo
const materialOriginal = estructuraSeleccionada.material;

const materialResaltado = Array.isArray(materialOriginal)
? materialOriginal.map(material => material.clone())
: materialOriginal.clone();

// Aplicar iluminación turquesa
const materiales = Array.isArray(materialResaltado)
? materialResaltado
: [materialResaltado];

materiales.forEach(material => {
  if (material.color) {
    material.color.set(0x00ffff);
  }

  if (material.emissive) {
    material.emissive.set(0x00ffff);
    material.emissiveIntensity = 1.5;
  }

  material.needsUpdate = true;
});

estructuraSeleccionada.material = materialResaltado;

// Actualizar la ficha anatómica
const nombre = estructuraSeleccionada.name || 'Estructura sin nombre';

mensaje.textContent = 'Estructura seleccionada: ' + nombre;

document.getElementById('nombreEstructura').textContent =
nombre.replace(/^VH_F_/, '').replaceAll('_', ' ');

document.getElementById('ubicacionEstructura').textContent =
'Esta estructura pertenece al modelo anatómico pulmonar.';

document.getElementById('funcionEstructura').textContent =
'Selecciona esta estructura para explorarla y estudiar su anatomía.';

console.log('Estructura resaltada:', nombre);
}


});
// Animación
function animar() {
  requestAnimationFrame(animar);
  controles.update();
  renderizador.render(escena, camara);
}
animar();

animar();
