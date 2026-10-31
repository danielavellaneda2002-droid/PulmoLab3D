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
renderizador.domElement.style.display = "block";
renderizador.domElement.style.width = "100%";
renderizador.domElement.style.height = "100%";
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
// BASE DE DATOS ANATÓMICA - PULMÓN IZQUIERDO

const informacionAnatomica = {
  VH_F_hilum_L: {
    nombre: "Hilio pulmonar izquierdo",
    ubicacion: "Se encuentra en la cara medial del pulmón izquierdo.",
    funcion: "Es la zona de entrada y salida de bronquios, vasos sanguíneos, vasos linfáticos y nervios."
  },

  VH_F_hilum_upper_L: {
    nombre: "Hilio superior izquierdo",
    ubicacion: "Región superior del hilio del pulmón izquierdo.",
    funcion: "Forma parte de la zona de paso de las estructuras broncovasculares pulmonares."
  },

  VH_F_lingula_superior_bronchopulmonary_segment: {
    nombre: "Segmento lingular superior",
    ubicacion: "Se encuentra en la língula del lóbulo superior izquierdo.",
    funcion: "Recibe ventilación a través del bronquio segmentario lingular superior."
  },
    VH_F_lingula_inferior_bronchopulmonary_segment: {
    nombre: "Segmento lingular inferior",
    ubicacion: "Se encuentra en la porción inferior de la língula del lóbulo superior izquierdo.",
    funcion: "Recibe ventilación a través del bronquio lingular inferior."
  },

  VH_F_left_anterior_bronchopulmonary_segment: {
    nombre: "Segmento anterior izquierdo",
    ubicacion: "Se localiza en la región anterior del pulmón izquierdo.",
    funcion: "Participa en la ventilación del lóbulo superior izquierdo."
  },

  VH_F_left_apical_bronchopulmonary_segment: {
    nombre: "Segmento apical izquierdo",
    ubicacion: "Se encuentra en la región superior del lóbulo superior izquierdo.",
    funcion: "Recibe aire mediante su bronquio segmentario correspondiente."
  },

  VH_F_left_posterior_bronchopulmonary_segment: {
    nombre: "Segmento posterior izquierdo",
    ubicacion: "Se encuentra en la región posterior del lóbulo superior izquierdo.",
    funcion: "Participa en la ventilación de la región posterior del lóbulo superior."
  },

  VH_F_left_superior_bronchopulmonary_segment: {
    nombre: "Segmento superior izquierdo",
    ubicacion: "Se localiza en la región superior del lóbulo inferior izquierdo.",
    funcion: "Participa en la ventilación de la región superior del lóbulo inferior."
  },

  VH_F_left_posterior_basal_bronchopulmonary_segment: {
    nombre: "Segmento basal posterior izquierdo",
    ubicacion: "Se encuentra en la región basal posterior del lóbulo inferior izquierdo.",
    funcion: "Participa en la ventilación de la región basal posterior."
  },

  VH_F_left_anterior_basal_bronchopulmonary_segment: {
    nombre: "Segmento basal anterior izquierdo",
    ubicacion: "Se localiza en la región basal anterior del lóbulo inferior izquierdo.",
    funcion: "Participa en la ventilación de la región basal anterior."
  },

  VH_F_left_lateral_basal_bronchopulmonary_segment: {
    nombre: "Segmento basal lateral izquierdo",
    ubicacion: "Se encuentra en la región basal lateral del lóbulo inferior izquierdo.",
    funcion: "Participa en la ventilación de la región basal lateral."
  },

  VH_F_left_medial_basal_bronchopulmonary_segment: {
    nombre: "Segmento basal medial izquierdo",
    ubicacion: "Se localiza en la región basal medial del lóbulo inferior izquierdo.",
    funcion: "Participa en la ventilación de la región basal medial."
  },

    VH_F_hilum_lower_L: {
    nombre: "Hilio inferior izquierdo",
    ubicacion: "Región inferior del hilio pulmonar izquierdo.",
    funcion: "Forma parte de la zona de paso de estructuras broncovasculares."
  },

  VH_F_hilum_R: {
    nombre: "Hilio pulmonar derecho",
    ubicacion: "Se encuentra en la cara medial del pulmón derecho.",
    funcion: "Es la zona de paso del bronquio principal derecho, los vasos pulmonares, los vasos linfáticos y los nervios."
  },

  VH_F_hilum_upper_R: {
    nombre: "Región superior del hilio derecho",
    ubicacion: "Se localiza en la porción superior del hilio pulmonar derecho.",
    funcion: "Forma parte de la región por donde pasan estructuras broncovasculares."
  },

  VH_F_hilum_middle_R: {
    nombre: "Región media del hilio derecho",
    ubicacion: "Se encuentra en la región media del hilio pulmonar derecho.",
    funcion: "Forma parte de la zona de paso de estructuras broncovasculares."
  },

  VH_F_hilum_lower_R: {
  nombre: "Región inferior del hilio derecho",
  ubicacion: "Se localiza en la porción inferior del hilio pulmonar derecho.",
  funcion: "Forma parte de la región de paso de estructuras broncovasculares."
},

VH_F_right_superior_bronchopulmonary_segment: {
  nombre: "Segmento superior derecho",
  ubicacion: "Se localiza en la región superior del lóbulo inferior del pulmón derecho.",
  funcion: "Recibe ventilación a través del bronquio segmentario superior derecho y participa en el intercambio gaseoso pulmonar."
},

VH_F_right_posterior_basal_bronchopulmonary_segment: {
  nombre: "Segmento basal posterior derecho",
  ubicacion: "Se encuentra en la región basal posterior del lóbulo inferior derecho.",
  funcion: "Recibe ventilación a través del bronquio segmentario basal posterior y participa en el intercambio gaseoso."
},

VH_F_right_lateral_basal_bronchopulmonary_segment: {
  nombre: "Segmento basal lateral derecho",
  ubicacion: "Se encuentra en la región basal lateral del lóbulo inferior del pulmón derecho.",
  funcion: "Recibe ventilación a través del bronquio segmentario basal lateral y participa en el intercambio gaseoso."
},
  VH_F_right_medial_basal_bronchopulmonary_segment: {
  nombre: "Segmento basal medial derecho",
  ubicacion: "Se localiza en la región basal medial del lóbulo inferior derecho.",
  funcion: "Participa en la ventilación de la región basal medial y en el intercambio gaseoso."
},

VH_F_right_anterior_basal_bronchopulmonary_segment: {
  nombre: "Segmento basal anterior derecho",
  ubicacion: "Se encuentra en la región basal anterior del lóbulo inferior derecho.",
  funcion: "Recibe aire a través del bronquio segmentario basal anterior y participa en el intercambio gaseoso."
},

VH_F_right_medial_bronchopulmonary_segment: {
  nombre: "Segmento medial del pulmón derecho",
  ubicacion: "Se localiza en la región medial del pulmón derecho.",
  funcion: "Participa en la ventilación pulmonar y el intercambio gaseoso."
},

VH_F_right_lateral_bronchopulmonary_segmennt: {
  nombre: "Segmento lateral del pulmón derecho",
  ubicacion: "Se encuentra en la región lateral del pulmón derecho.",
  funcion: "Participa en la ventilación pulmonar y el intercambio gaseoso."
},

VH_F_right_anterior_bronchopulmonary_segm: {
  nombre: "Segmento anterior derecho",
  ubicacion: "Se localiza en la región anterior del lóbulo superior derecho.",
  funcion: "Participa en la ventilación del lóbulo superior derecho."
},

VH_F_right_apical_bronchopulmonary_segment: {
  nombre: "Segmento apical derecho",
  ubicacion: "Se encuentra en la región apical del lóbulo superior derecho.",
  funcion: "Recibe aire a través del bronquio segmentario apical derecho."
},

VH_F_right_posterior_bronchopulmonary_segment: {
  nombre: "Segmento posterior derecho",
  ubicacion: "Se localiza en la región posterior del lóbulo superior derecho.",
  funcion: "Participa en la ventilación de la región posterior del lóbulo superior derecho."
},
  VH_F_cartilage_of_lobar_bronchus_L: {
  nombre: "Cartílago del bronquio lobar izquierdo",
  ubicacion: "Se encuentra en la pared del bronquio lobar del pulmón izquierdo.",
  funcion: "Proporciona soporte estructural y ayuda a mantener abierta la vía respiratoria."
},

VH_F_cartilage_of_tertiary_bronchus_L: {
  nombre: "Cartílago del bronquio segmentario izquierdo",
  ubicacion: "Se localiza en la pared de los bronquios segmentarios izquierdos.",
  funcion: "Contribuye al soporte de las vías respiratorias y evita su colapso."
},

VH_F_left_superior_lobar_bronchus: {
  nombre: "Bronquio lobar superior izquierdo",
  ubicacion: "Se origina del bronquio principal izquierdo y se dirige al lóbulo superior.",
  funcion: "Conduce el aire hacia el lóbulo superior del pulmón izquierdo."
},

VH_F_left_inferior_lobar_bronchus: {
  nombre: "Bronquio lobar inferior izquierdo",
  ubicacion: "Se origina del bronquio principal izquierdo y se dirige al lóbulo inferior.",
  funcion: "Conduce el aire hacia el lóbulo inferior del pulmón izquierdo."
},

VH_F_left_anterior_basal_bronchus: {
  nombre: "Bronquio basal anterior izquierdo",
  ubicacion: "Se encuentra en el árbol bronquial del lóbulo inferior izquierdo.",
  funcion: "Transporta aire hacia el segmento basal anterior izquierdo."
},

VH_F_left_lingula_superior_bronchus: {
  nombre: "Bronquio lingular superior",
  ubicacion: "Es una rama del bronquio lobar superior izquierdo.",
  funcion: "Conduce aire hacia el segmento lingular superior."
},

VH_F_left_apical_bronchus: {
  nombre: "Bronquio apical izquierdo",
  ubicacion: "Se localiza en las ramificaciones bronquiales del pulmón izquierdo.",
  funcion: "Conduce aire hacia el segmento apical correspondiente."
},

VH_F_left_posterior_basal_bronchus: {
  nombre: "Bronquio basal posterior izquierdo",
  ubicacion: "Se encuentra en el lóbulo inferior del pulmón izquierdo.",
  funcion: "Transporta aire hacia el segmento basal posterior."
},

VH_F_left_medial_basal_bronchus: {
  nombre: "Bronquio basal medial izquierdo",
  ubicacion: "Se localiza en las ramificaciones basales del pulmón izquierdo.",
  funcion: "Conduce aire hacia la región basal medial."
},

VH_F_left_superior_bronchus: {
  nombre: "Bronquio segmentario superior izquierdo",
  ubicacion: "Se encuentra en el lóbulo inferior del pulmón izquierdo.",
  funcion: "Transporta aire hacia el segmento superior del lóbulo inferior."
},

VH_F_left_anterior_bronchus: {
  nombre: "Bronquio anterior izquierdo",
  ubicacion: "Se encuentra en las ramificaciones del bronquio lobar superior izquierdo.",
  funcion: "Conduce aire hacia el segmento anterior del pulmón izquierdo."
},

VH_F_left_posterior_bronchus: {
  nombre: "Bronquio posterior izquierdo",
  ubicacion: "Se encuentra en las ramificaciones del lóbulo superior izquierdo.",
  funcion: "Transporta aire hacia el segmento posterior."
},

VH_F_left_lateral_basal_bronchus: {
  nombre: "Bronquio basal lateral izquierdo",
  ubicacion: "Se localiza en el lóbulo inferior izquierdo.",
  funcion: "Conduce aire hacia el segmento basal lateral."
},

VH_F_left_lingula_inferior_bronchi: {
  nombre: "Bronquio lingular inferior",
  ubicacion: "Es una rama del bronquio lobar superior izquierdo.",
  funcion: "Transporta aire hacia el segmento lingular inferior."
},
VH_F_cartilage_of_lobar_bronchus_R: {
  nombre: "Cartílago del bronquio lobar derecho",
  ubicacion: "Se encuentra en la pared de los bronquios lobares del pulmón derecho.",
  funcion: "Proporciona soporte estructural y ayuda a mantener abiertas las vías respiratorias."
},  
VH_F_cartilage_of_tertiary_bronchus_R: {
  nombre: "Cartílago del bronquio segmentario derecho",
  ubicacion: "Se encuentra en la pared de los bronquios segmentarios derechos.",
  funcion: "Proporciona soporte estructural y ayuda a mantener abiertas las vías respiratorias."
},

VH_F_right_middle_lobar_bronchus: {
  nombre: "Bronquio lobar medio derecho",
  ubicacion: "Se origina del bronquio principal derecho.",
  funcion: "Conduce aire hacia el lóbulo medio del pulmón derecho."
},

VH_F_right_superior_lobar_bronchus: {
  nombre: "Bronquio lobar superior derecho",
  ubicacion: "Se origina del bronquio principal derecho.",
  funcion: "Conduce aire hacia el lóbulo superior del pulmón derecho."
},

VH_F_right_inferior_lobar_bronchus: {
  nombre: "Bronquio lobar inferior derecho",
  ubicacion: "Se origina del bronquio principal derecho.",
  funcion: "Conduce aire hacia el lóbulo inferior del pulmón derecho."
},

VH_F_right_anterior_bronchus: {
  nombre: "Bronquio anterior derecho",
  ubicacion: "Se encuentra en las ramificaciones del bronquio lobar superior derecho.",
  funcion: "Transporta aire hacia el segmento anterior del pulmón derecho."
},

VH_F_right_lateral_basal_bronchus: {
  nombre: "Bronquio basal lateral derecho",
  ubicacion: "Se localiza en el lóbulo inferior derecho.",
  funcion: "Conduce aire hacia el segmento basal lateral."
},

VH_F_right_lateral_bronchus: {
  nombre: "Bronquio lateral derecho",
  ubicacion: "Se encuentra entre las ramificaciones bronquiales del pulmón derecho.",
  funcion: "Conduce aire hacia la región lateral correspondiente."
},

VH_F_right_medial_bronchus: {
  nombre: "Bronquio medial derecho",
  ubicacion: "Se localiza en las ramificaciones bronquiales del pulmón derecho.",
  funcion: "Conduce aire hacia la región medial correspondiente."
},

VH_F_right_medial_basal_bronchus: {
  nombre: "Bronquio basal medial derecho",
  ubicacion: "Se encuentra en el lóbulo inferior derecho.",
  funcion: "Transporta aire hacia el segmento basal medial."
},

VH_F_right_posterior_basal_bronchus: {
  nombre: "Bronquio basal posterior derecho",
  ubicacion: "Se localiza en las ramificaciones basales del lóbulo inferior derecho.",
  funcion: "Conduce aire hacia el segmento basal posterior."
},

VH_F_right_posterior_bronchus: {
  nombre: "Bronquio posterior derecho",
  ubicacion: "Se encuentra en las ramificaciones del lóbulo superior derecho.",
  funcion: "Transporta aire hacia el segmento posterior."
},

VH_F_right_superior_bronchus: {
  nombre: "Bronquio segmentario superior derecho",
  ubicacion: "Se localiza en el lóbulo inferior derecho.",
  funcion: "Conduce aire hacia el segmento superior del lóbulo inferior."
},

VH_F_right_apical_bronchus: {
  nombre: "Bronquio apical derecho",
  ubicacion: "Se encuentra en las ramificaciones del lóbulo superior derecho.",
  funcion: "Conduce aire hacia el segmento apical."
},

VH_F_right_anterior_basal_bronchus: {
  nombre: "Bronquio basal anterior derecho",
  ubicacion: "Se localiza en el lóbulo inferior derecho.",
  funcion: "Transporta aire hacia el segmento basal anterior."
},  
};
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
  const alto = 450;

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
const informacion = informacionAnatomica[nombre];

console.log("Nombre detectado:", nombre);
console.log("Ficha encontrada:", informacion);

mensaje.textContent = 'Estructura seleccionada: ' + nombre;

document.getElementById('nombreEstructura').textContent =
informacion ? informacion.nombre : nombre.replace(/^VH_F_/, '').replaceAll('_', ' ');

document.getElementById('ubicacionEstructura').textContent =
informacion ? informacion.ubicacion : 'Información anatómica próximamente disponible.';

document.getElementById('funcionEstructura').textContent =
informacion ? informacion.funcion : 'Estamos preparando la información de esta estructura.';

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


