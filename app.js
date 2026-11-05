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
let escalaOriginalModelo = 1;
let partes = [];
let estructuraSeleccionada = null;
const posicionesOriginales = new Map();
// CONTROL DE ANIMACIÓN RESPIRATORIA

let respiracionActiva = true;
let frecuenciaRespiratoria = 12;
let tiempoRespiratorio = 0;

const relojRespiratorio = new THREE.Clock();
const escalasRespiratorias = new Map();
// Centro común de expansión pulmonar
const centroRespiratorio = new THREE.Vector3();

// Guardar posiciones para animación respiratoria
const posicionesRespiratorias = new Map();
// ======================================
// CONTROL DE ARRASTRE ANATÓMICO
// ======================================

let modoArrastre = false;
let arrastrando = false;

const planoArrastre = new THREE.Plane();
const puntoArrastre = new THREE.Vector3();
const desplazamientoArrastre = new THREE.Vector3();
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
// TRÁQUEA 3D: estructura anatómica adicional
const traquea = new THREE.Group();
traquea.name = "VH_F_trachea";

// Material de la pared traqueal
const materialTraquea = new THREE.MeshStandardMaterial({
  color: 0xc98f91,
  roughness: 0.65,
  metalness: 0
});

// Material de los anillos cartilaginosos
const materialCartilagoTraqueal = new THREE.MeshStandardMaterial({
  color: 0xe8c7b9,
  roughness: 0.5,
  metalness: 0
});

// Tubo principal
const geometriaTraquea = new THREE.CylinderGeometry(
  0.24, 0.24, 2.2, 32, 1, true
);

const paredTraquea = new THREE.Mesh(
  geometriaTraquea,
  materialTraquea
);

paredTraquea.name = "VH_F_trachea";
traquea.add(paredTraquea);

// Bifurcación de la tráquea hacia los bronquios principales
function crearRamaBronquial(inicio, fin, radio = 0.16) {

  const puntoInicio = new THREE.Vector3(...inicio);
  const puntoFin = new THREE.Vector3(...fin);

  // Punto intermedio
  const puntoMedio = puntoInicio.clone()
    .lerp(puntoFin, 0.5);

  // Trayectoria del bronquio
  const curva = new THREE.CatmullRomCurve3([
    puntoInicio,
    puntoMedio,
    puntoFin
  ]);

  // Crear tubo
  const geometria = new THREE.TubeGeometry(
    curva,
    32,
    radio,
    16,
    false
  );

  const rama = new THREE.Mesh(
    geometria,
    materialTraquea
  );

  rama.name = "VH_F_main_bronchus";

  traquea.add(rama);

  return rama;
}

// Bronquio principal derecho
crearRamaBronquial([0, -0.9, 0], [-0.680, -1.777, -0.096]);

// Bronquio principal izquierdo
crearRamaBronquial([0, -0.9, 0], [0.889, -1.878, -0.164]);
// CONEXIONES HACIA LOS BRONQUIOS LOBAR​ES INFERIORES

// Bronquio lobar inferior derecho
crearRamaBronquial(
  [-0.680, -1.777, -0.096],
  [-0.927, -2.702, -0.441],
  0.13
);

// Bronquio lobar inferior izquierdo
crearRamaBronquial(
  [0.889, -1.878, -0.164],
  [1.053, -2.471, -0.574],
  0.13
);

// Anillos cartilaginosos
for (let i = 0; i < 12; i++) {
  const geometriaAnillo = new THREE.TorusGeometry(
    0.24, 0.035, 8, 32
  );

  const anillo = new THREE.Mesh(
    geometriaAnillo,
    materialCartilagoTraqueal
  );

  anillo.rotation.x = Math.PI / 2;
  anillo.position.y = 0.95 - i * 0.17;
  anillo.name = "VH_F_tracheal_cartilage";

  traquea.add(anillo);
}

// Registrar la información anatómica
informacionAnatomica.VH_F_trachea = {
  nombre: "Tráquea",
  ubicacion: "Conducto respiratorio situado entre la laringe y la bifurcación en los bronquios principales.",
  funcion: "Conduce el aire hacia los bronquios principales. Sus anillos cartilaginosos ayudan a mantener abierta la vía respiratoria."
};
informacionAnatomica.VH_F_main_bronchus = {
  nombre: "Bronquios principales",
  ubicacion: "Se originan en la bifurcación de la tráquea y se dirigen hacia el pulmón derecho y el izquierdo.",
  funcion: "Conducen el aire desde la tráquea hacia cada pulmón y se ramifican en bronquios más pequeños."
};
informacionAnatomica.VH_F_tracheal_cartilage = {
  nombre: "Cartílago traqueal",
  ubicacion: "Distribuido a lo largo de la pared de la tráquea.",
  funcion: "Proporciona soporte y ayuda a evitar el colapso de la vía respiratoria."
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
escalaOriginalModelo = escala;    
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
partes
  .filter(parte => parte.name.toLowerCase().includes("bronchus"))
  .forEach(parte => {
    const caja = new THREE.Box3().setFromObject(parte);
    const centro = caja.getCenter(new THREE.Vector3());
    const tamano = caja.getSize(new THREE.Vector3());

    console.log("BRONQUIO:", parte.name, {
      centro: {
        x: centro.x.toFixed(3),
        y: centro.y.toFixed(3),
        z: centro.z.toFixed(3)
      },
      tamano: {
        x: tamano.x.toFixed(3),
        y: tamano.y.toFixed(3),
        z: tamano.z.toFixed(3)
      }
    });
  });
   escena.add(modelo);
// ======================================
// MODOS DE VISUALIZACIÓN ANATÓMICA
// ======================================

// Guardar la visibilidad original de cada estructura
const visibilidadOriginal = new Map();

modelo.traverse((objeto) => {
  if (objeto.isMesh) {
    visibilidadOriginal.set(objeto, objeto.visible);
  }
});

// Mostrar pulmones completos
document.getElementById("btnPulmones").addEventListener("click", () => {

  modelo.traverse((objeto) => {
    if (objeto.isMesh) {
      objeto.visible = visibilidadOriginal.get(objeto);
    }
  });

});

// Mostrar únicamente el árbol bronquial
document.getElementById("btnBronquios").addEventListener("click", () => {

  modelo.traverse((objeto) => {

    if (!objeto.isMesh) return;

    const nombre = objeto.name.toLowerCase();

    const esSegmentoPulmonar =
      nombre.includes("segment");

    const esBronquio =
      nombre.includes("bronchus") ||
      nombre.includes("bronchi") ||
      nombre.includes("bronchial") ||
      nombre.includes("trach") ||
      nombre.includes("cartilage");

    objeto.visible = esBronquio && !esSegmentoPulmonar;

  });

});
traquea.position.set(0, 2.5, 0);

// Primero agregamos la tráquea a la escena
escena.add(traquea);
traquea.updateMatrixWorld(true);

// Extremo actual del bronquio principal derecho
const extremoDerecho = new THREE.Vector3(-0.680, -1.777, -0.096);
traquea.localToWorld(extremoDerecho);

// Extremo actual del bronquio principal izquierdo
const extremoIzquierdo = new THREE.Vector3(0.889, -1.878, -0.164);
traquea.localToWorld(extremoIzquierdo);
 // Extremos de las conexiones bronquiales inferiores
const extremoInferiorDerecho = new THREE.Vector3(-0.927,-2.702,-0.441);
traquea.localToWorld(extremoInferiorDerecho);

const extremoInferiorIzquierdo = new THREE.Vector3(1.053,-2.471,-0.574);
traquea.localToWorld(extremoInferiorIzquierdo);   

console.log("EXTREMO DERECHO ACTUAL:", extremoDerecho.toArray());
console.log("EXTREMO IZQUIERDO ACTUAL:", extremoIzquierdo.toArray());
// MEDIR ÚNICAMENTE LA PARED TRAQUEAL
paredTraquea.updateWorldMatrix(true, false);

const cajaPared = new THREE.Box3().setFromObject(paredTraquea);

console.log(
  "CENTRO PARED TRAQUEAL:",
  cajaPared.getCenter(new THREE.Vector3()).toArray()
);

console.log(
  "LÍMITE INFERIOR PARED TRAQUEAL:",
  cajaPared.min.toArray()
);

console.log(
  "LÍMITE SUPERIOR PARED TRAQUEAL:",
  cajaPared.max.toArray()
);

// Actualizamos sus coordenadas globales
traquea.updateMatrixWorld(true);

// Calculamos sus límites
const cajaTraqueaGlobal = new THREE.Box3().setFromObject(traquea);

console.log("POSICIÓN LOCAL TRÁQUEA:", traquea.position.toArray());

console.log("CENTRO DE LA TRÁQUEA:",
    cajaTraqueaGlobal.getCenter(new THREE.Vector3()).toArray()
);

console.log("TAMAÑO DE LA TRÁQUEA:",
    cajaTraqueaGlobal.getSize(new THREE.Vector3()).toArray()
);

console.log("LÍMITE INFERIOR TRÁQUEA:",
    cajaTraqueaGlobal.min.toArray()
);

console.log("LÍMITE SUPERIOR TRÁQUEA:",
    cajaTraqueaGlobal.max.toArray()
);

    traquea.traverse((objeto) => {
  if (objeto.isMesh) {
    partes.push(objeto);
  }
});
// Guardar posiciones originales después de cargar las estructuras
guardarPosicionesOriginales();    
// ======================================
// REGISTRAR SEGMENTOS PARA RESPIRACIÓN
// ======================================

modelo.updateMatrixWorld(true);

const cajaPulmonar = new THREE.Box3();

modelo.traverse((objeto) => {

  if (!objeto.isMesh) return;

  const nombre = objeto.name.toLowerCase();

  if (nombre.includes("bronchopulmonary_segment")) {

    escalasRespiratorias.set(objeto, objeto.scale.clone());

    posicionesRespiratorias.set(
      objeto,
      objeto.position.clone()
    );

    cajaPulmonar.expandByObject(objeto);

  }

});

if (!cajaPulmonar.isEmpty()) {
  cajaPulmonar.getCenter(centroRespiratorio);
}

console.log(
  "Segmentos registrados:",
  escalasRespiratorias.size
);

console.log(
  "Segmentos registrados para respiración:",
  escalasRespiratorias.size
);    
    // COORDENADAS REALES DE LOS BRONQUIOS
const nombresBronquios = [
  "VH_F_left_superior_lobar_bronchus",
  "VH_F_right_superior_lobar_bronchus",
  "VH_F_left_inferior_lobar_bronchus",
  "VH_F_right_inferior_lobar_bronchus"
];

nombresBronquios.forEach(nombre => {
  const bronquio = partes.find(parte => parte.name === nombre);

  if (bronquio) {
    bronquio.updateWorldMatrix(true, false);

    const caja = new THREE.Box3().setFromObject(bronquio);
    const centro = caja.getCenter(new THREE.Vector3());
    const tamano = caja.getSize(new THREE.Vector3());

    console.log("MINIMO:", caja.min.toArray());
    console.log("MAXIMO:", caja.max.toArray());

    console.log(
      "COORDENADAS BRONQUIO:",
      nombre,
      JSON.stringify({
        minimo: caja.min.toArray().map(v => Number(v.toFixed(3))),
        maximo: caja.max.toArray().map(v => Number(v.toFixed(3)))
      })
    );

    console.log(
  "CENTRO:",
  nombre,
  JSON.stringify(centro.toArray())
);

console.log(
  "TAMAÑO:",
  nombre,
  JSON.stringify(tamano.toArray())
);
  }
});
// MEDIR DISTANCIA ENTRE BRONQUIOS PRINCIPALES Y LOBAR​ES

function medirDistancia(nombre, extremo) {
  const bronquio = partes.find(parte => parte.name === nombre);

  if (!bronquio || !bronquio.geometry?.attributes?.position) {
    console.log("No se encontró la geometría:", nombre);
    return;
  }

  bronquio.updateWorldMatrix(true, false);

  const posiciones = bronquio.geometry.attributes.position;

  let distanciaMinima = Infinity;
  let puntoCercano = new THREE.Vector3();

  for (let i = 0; i < posiciones.count; i++) {
    const vertice = new THREE.Vector3()
      .fromBufferAttribute(posiciones, i);

    vertice.applyMatrix4(bronquio.matrixWorld);

    const distancia = extremo.distanceTo(vertice);

    if (distancia < distanciaMinima) {
      distanciaMinima = distancia;
      puntoCercano.copy(vertice);
    }
  }

  console.log("BRONQUIO:", nombre);
  console.log("DISTANCIA MÍNIMA:", distanciaMinima);
  console.log("PUNTO MÁS CERCANO:", puntoCercano.toArray());
  const vectorConexion = puntoCercano.clone().sub(extremo);

console.log(
  "VECTOR DE CONEXIÓN:",
  JSON.stringify(vectorConexion.toArray())
);

console.log(
  "DIRECCIÓN NORMALIZADA:",
  JSON.stringify(vectorConexion.clone().normalize().toArray())
);

console.log(
  "PUNTO CERCANO EXACTO:",
  JSON.stringify(puntoCercano.toArray())
);
}

// Lado derecho
medirDistancia("VH_F_right_superior_lobar_bronchus", extremoDerecho);
medirDistancia("VH_F_right_inferior_lobar_bronchus", extremoInferiorDerecho);

// Lado izquierdo
medirDistancia("VH_F_left_superior_lobar_bronchus", extremoIzquierdo);
medirDistancia("VH_F_left_inferior_lobar_bronchus", extremoInferiorIzquierdo);
// ======================================
// PCA: EJES LONGITUDINALES BRONQUIALES
// ======================================

function calcularEjePCA(nombre) {

  const bronquio = partes.find(p => p.name === nombre);

  if (!bronquio || !bronquio.geometry?.attributes?.position) {
    console.error("No se encontró:", nombre);
    return;
  }

  bronquio.updateWorldMatrix(true, false);

  const posiciones = bronquio.geometry.attributes.position;
  const puntos = [];

  const centro = new THREE.Vector3();

  for (let i = 0; i < posiciones.count; i++) {

    const punto = new THREE.Vector3()
      .fromBufferAttribute(posiciones, i)
      .applyMatrix4(bronquio.matrixWorld);

    puntos.push(punto);
    centro.add(punto);
  }

  centro.divideScalar(puntos.length);

  // Matriz de covarianza
  let xx = 0, xy = 0, xz = 0;
  let yy = 0, yz = 0, zz = 0;

  puntos.forEach(p => {

    const x = p.x - centro.x;
    const y = p.y - centro.y;
    const z = p.z - centro.z;

    xx += x * x;
    xy += x * y;
    xz += x * z;
    yy += y * y;
    yz += y * z;
    zz += z * z;

  });

  const matriz = [
    [xx, xy, xz],
    [xy, yy, yz],
    [xz, yz, zz]
  ];

  // Iteración de potencia para obtener el eje principal
  let eje = new THREE.Vector3(1, 1, 1).normalize();

  for (let i = 0; i < 100; i++) {

    const nuevo = new THREE.Vector3(
      matriz[0][0] * eje.x + matriz[0][1] * eje.y + matriz[0][2] * eje.z,
      matriz[1][0] * eje.x + matriz[1][1] * eje.y + matriz[1][2] * eje.z,
      matriz[2][0] * eje.x + matriz[2][1] * eje.y + matriz[2][2] * eje.z
    );

    if (nuevo.lengthSq() < 1e-12) break;

    eje.copy(nuevo.normalize());
  }

  let minimo = Infinity;
  let maximo = -Infinity;

  puntos.forEach(p => {

    const proyeccion = p.clone()
      .sub(centro)
      .dot(eje);

    minimo = Math.min(minimo, proyeccion);
    maximo = Math.max(maximo, proyeccion);

  });

  const extremo1 = centro.clone().addScaledVector(eje, minimo);
  const extremo2 = centro.clone().addScaledVector(eje, maximo);

  console.log("========== PCA ==========");
  console.log("BRONQUIO:", nombre);
  console.log("CENTRO:", centro.toArray());
  console.log("EJE:", eje.toArray());
  console.log("EXTREMO 1:", extremo1.toArray());
  console.log("EXTREMO 2:", extremo2.toArray());
  console.log("LONGITUD PROYECTADA:", maximo - minimo);

}

// Calcular los cuatro bronquios lobares

calcularEjePCA("VH_F_left_superior_lobar_bronchus");
calcularEjePCA("VH_F_left_inferior_lobar_bronchus");
calcularEjePCA("VH_F_right_superior_lobar_bronchus");
calcularEjePCA("VH_F_right_inferior_lobar_bronchus");
   mensaje.textContent = `Modelo cargado correctamente. ${partes.length} estructuras detectadas.`;

console.log('Modelo cargado:', modelo);

console.log(
'ESTRUCTURAS RESPIRATORIAS:',
partes
.map(parte => parte.name)
.filter(nombre => /trach|bronch|airway|cartilage|windpipe/i.test(nombre))
);

console.log('TODAS LAS ESTRUCTURAS:', partes.map(parte => parte.name));

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

  if (!modelo || modoArrastre) return;
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
// ======================================
// AISLAR, SEPARAR Y RESTAURAR ESTRUCTURAS
// ======================================

// Guardar las posiciones originales

function guardarPosicionesOriginales() {
  partes.forEach(parte => {
    if (!posicionesOriginales.has(parte)) {
      posicionesOriginales.set(parte, parte.position.clone());
    }
  });
}
// ======================================
// RESTAURAR POSICIONES ORIGINALES
// ======================================

function restaurarPosiciones() {

  posicionesOriginales.forEach((posicion, parte) => {
    parte.position.copy(posicion);
  });

  if (modelo) {
    modelo.updateMatrixWorld(true);
  }

  traquea.updateMatrixWorld(true);

  console.log("Posiciones anatómicas restauradas");

}


// Aislar estructura seleccionada
document.getElementById("btnAislar").addEventListener("click", () => {

  if (!estructuraSeleccionada) {
    alert("Primero selecciona una estructura del modelo.");
    return;
  }

  guardarPosicionesOriginales();

  partes.forEach(parte => {
    parte.visible = parte === estructuraSeleccionada;
  });

});

// Separar estructura seleccionada
document.getElementById("btnSeparar").addEventListener("click", () => {

  if (!estructuraSeleccionada) {
    alert("Primero selecciona una estructura del modelo.");
    return;
  }

  guardarPosicionesOriginales();

  const caja = new THREE.Box3().setFromObject(estructuraSeleccionada);
  const centro = caja.getCenter(new THREE.Vector3());

  const direccion = centro.clone().sub(new THREE.Vector3(0, 0, 0));

  if (direccion.lengthSq() < 0.0001) {
    direccion.set(1, 0, 0);
  }

  direccion.normalize();

  const posicionOriginal = posicionesOriginales.get(estructuraSeleccionada);

  estructuraSeleccionada.position.copy(posicionOriginal);
  estructuraSeleccionada.position.addScaledVector(direccion, 0.5);

});

// Restaurar modelo
document.getElementById("btnRestaurar").addEventListener("click", () => {

  // Detener cualquier arrastre activo
  arrastrando = false;
  controles.enabled = true;

  // Recuperar posiciones originales
  restaurarPosiciones();

  // Mostrar nuevamente las estructuras
  partes.forEach(parte => {
    parte.visible = true;
  });

  // Actualizar matrices del modelo
  modelo.updateMatrixWorld(true);

  console.log("Modelo restaurado correctamente");

});
// ======================================
// ACTIVAR Y DESACTIVAR ARRASTRE
// ======================================

const btnArrastrar = document.getElementById("btnArrastrar");

btnArrastrar.addEventListener("click", () => {
  modoArrastre = !modoArrastre;

  btnArrastrar.textContent = modoArrastre
    ? "✋ Desactivar arrastre"
    : "✋ Activar arrastre";

  if (!modoArrastre) {
    arrastrando = false;
    controles.enabled = true;
  }
});
// ======================================
// ARRASTRAR ESTRUCTURAS CON EL MOUSE
// ======================================

renderizador.domElement.addEventListener("pointerdown", (evento) => {
  if (!modoArrastre || !modelo) return;

  const rect = renderizador.domElement.getBoundingClientRect();

  puntero.x = ((evento.clientX - rect.left) / rect.width) * 2 - 1;
  puntero.y = -((evento.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(puntero, camara);

  const objetosVisibles = partes.filter(parte => parte.visible);
  const intersecciones = raycaster.intersectObjects(objetosVisibles, false);

  if (intersecciones.length === 0) return;

// Guardar las posiciones antes del primer movimiento
guardarPosicionesOriginales();

estructuraSeleccionada = intersecciones[0].object;
arrastrando = true;

controles.enabled = false;
  const centro = new THREE.Box3()
    .setFromObject(estructuraSeleccionada)
    .getCenter(new THREE.Vector3());

  planoArrastre.setFromNormalAndCoplanarPoint(
    camara.getWorldDirection(new THREE.Vector3()),
    centro
  );

  if (raycaster.ray.intersectPlane(planoArrastre, puntoArrastre)) {
    desplazamientoArrastre.copy(
      estructuraSeleccionada.getWorldPosition(new THREE.Vector3())
    ).sub(puntoArrastre);
  }

  renderizador.domElement.setPointerCapture(evento.pointerId);
});

renderizador.domElement.addEventListener("pointermove", (evento) => {
  if (!arrastrando || !estructuraSeleccionada) return;

  const rect = renderizador.domElement.getBoundingClientRect();

  puntero.x = ((evento.clientX - rect.left) / rect.width) * 2 - 1;
  puntero.y = -((evento.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(puntero, camara);

  if (raycaster.ray.intersectPlane(planoArrastre, puntoArrastre)) {
    const posicionMundo = puntoArrastre.clone().add(desplazamientoArrastre);

    if (estructuraSeleccionada.parent) {
      estructuraSeleccionada.parent.worldToLocal(posicionMundo);
    }

    estructuraSeleccionada.position.copy(posicionMundo);
  }
});

function terminarArrastre() {
  if (!arrastrando) return;

  arrastrando = false;
  controles.enabled = true;
}

renderizador.domElement.addEventListener("pointerup", terminarArrastre);
renderizador.domElement.addEventListener("pointercancel", terminarArrastre);
// ======================================
// CÁLCULOS FISIOLÓGICOS RESPIRATORIOS
// ======================================

// Volumen corriente de referencia (mL)
const volumenCorriente = 500;

// Conectar los indicadores del HTML
const indicadores = {
  frecuencia: document.getElementById("fisFrecuencia"),
  volumenCorriente: document.getElementById("fisVolumenCorriente"),
  tiempoInspiratorio: document.getElementById("fisTiempoInspiratorio"),
  tiempoEspiratorio: document.getElementById("fisTiempoEspiratorio"),
  ventilacionMinuto: document.getElementById("fisVentilacionMinuto"),
  volumenActual: document.getElementById("fisVolumenActual"),
  flujoActual: document.getElementById("fisFlujoActual")
};

// Actualizar los parámetros fisiológicos
function actualizarPanelFisiologico(fase) {

  if (Object.values(indicadores).some(elemento => !elemento)) {
    return;
  }

  // Duración del ciclo respiratorio
  const duracionCiclo = 60 / frecuenciaRespiratoria;

  // Relación inspiración:espiración de 1:1
  const tiempoInspiratorio = duracionCiclo / 2;
  const tiempoEspiratorio = duracionCiclo / 2;

  // Ventilación minuto (L/min)
  const ventilacionMinuto =
    (volumenCorriente * frecuenciaRespiratoria) / 1000;

  // Volumen instantáneo simulado (mL)
  const volumenActual =
    (volumenCorriente / 2) * (1 - Math.cos(fase));

  // Flujo instantáneo simulado (L/min)
  const flujoActual =
    (volumenCorriente * Math.PI * frecuenciaRespiratoria / 1000)
    * Math.sin(fase);

  // Actualizar valores en pantalla
  indicadores.frecuencia.textContent =
    frecuenciaRespiratoria + " rpm";

  indicadores.volumenCorriente.textContent =
    volumenCorriente + " mL";

  indicadores.tiempoInspiratorio.textContent =
    tiempoInspiratorio.toFixed(1) + " s";

  indicadores.tiempoEspiratorio.textContent =
    tiempoEspiratorio.toFixed(1) + " s";

  indicadores.ventilacionMinuto.textContent =
    ventilacionMinuto.toFixed(1) + " L/min";

  indicadores.volumenActual.textContent =
    volumenActual.toFixed(0) + " mL";

  indicadores.flujoActual.textContent =
    flujoActual.toFixed(1) + " L/min";

  // Actualizar parámetros de presión
  actualizarPanelPresiones();

}
// MECÁNICA RESPIRATORIA
// PRESIÓN Y DISTENSIBILIDAD
// ======================================

// Valores de referencia para la simulación
const mecanicaRespiratoria = {
    peep: 5,              // cmH2O
    distensibilidad: 50,  // mL/cmH2O
    resistencia: 10       // cmH2O/(L/s)
};

// Conectar las tarjetas del HTML
const indicadoresPresion = {
    peep: document.getElementById("fisPEEP"),
    pplat: document.getElementById("fisPplat"),
    pip: document.getElementById("fisPIP"),
    distensibilidad: document.getElementById("fisDistensibilidad")
};

// Actualizar parámetros de presión
function actualizarPanelPresiones() {

    if (Object.values(indicadoresPresion).some(elemento => !elemento)) {
        return;
    }

    const peep = mecanicaRespiratoria.peep;

    const distensibilidad =
        mecanicaRespiratoria.distensibilidad;

    const resistencia =
        mecanicaRespiratoria.resistencia;

    // Presión meseta teórica
    // Pplat = PEEP + VT / C
    const presionMeseta =
        peep + volumenCorriente / distensibilidad;

    // Amplitud de presión elástica
    const amplitudElastica =
        volumenCorriente / (2 * distensibilidad);

    // Flujo inspiratorio máximo (L/s)
    const flujoPico =
        (volumenCorriente / 1000) *
        Math.PI *
        frecuenciaRespiratoria / 60;

    // Amplitud de presión resistiva
    const amplitudResistiva =
        resistencia * flujoPico;

    // Presión pico teórica para flujo sinusoidal
    const presionPico =
        peep +
        amplitudElastica +
        Math.hypot(
            amplitudElastica,
            amplitudResistiva
        );

    // Actualizar las tarjetas
    indicadoresPresion.peep.textContent =
        peep.toFixed(1) + " cmH₂O";

    indicadoresPresion.pplat.textContent =
        presionMeseta.toFixed(1) + " cmH₂O";

    indicadoresPresion.pip.textContent =
        presionPico.toFixed(1) + " cmH₂O";

    indicadoresPresion.distensibilidad.textContent =
        distensibilidad.toFixed(0) + " mL/cmH₂O";

}
// ======================================
// GRÁFICAS RESPIRATORIAS SINCRONIZADAS
// ======================================

function dibujarGraficasRespiratorias() {

    const fase = respiracionActiva
        ? tiempoRespiratorio * (frecuenciaRespiratoria / 60) * Math.PI * 2
        : 0;

    const amplitudFlujo =
        volumenCorriente * Math.PI * frecuenciaRespiratoria / 1000;

    const duracionCiclo = 60 / frecuenciaRespiratoria;

    function dibujarGrafica(idCanvas, tipo) {

        const canvas = document.getElementById(idCanvas);

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const ancho = canvas.width;
        const alto = canvas.height;

        const izquierda = 65;
        const derecha = 20;
        const arriba = 25;
        const abajo = 40;

        const anchoGrafica = ancho - izquierda - derecha;
        const altoGrafica = alto - arriba - abajo;

        ctx.clearRect(0, 0, ancho, alto);

        // Fondo
        ctx.fillStyle = "#091525";
        ctx.fillRect(0, 0, ancho, alto);

        const esVolumen = tipo === "volumen";

        const maximo = esVolumen
            ? volumenCorriente
            : amplitudFlujo * 1.15;

        const minimo = esVolumen ? 0 : -maximo;

        function calcularValor(f) {

            if (esVolumen) {
                return (volumenCorriente / 2) * (1 - Math.cos(f));
            }

            return amplitudFlujo * Math.sin(f);
        }

        function posicionY(valor) {

            return arriba +
                ((maximo - valor) / (maximo - minimo)) * altoGrafica;
        }

        // Cuadrícula
        ctx.strokeStyle = "#24384c";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 4; i++) {

            const y = arriba + (altoGrafica / 4) * i;

            ctx.beginPath();
            ctx.moveTo(izquierda, y);
            ctx.lineTo(ancho - derecha, y);
            ctx.stroke();
        }

        // Eje horizontal
        ctx.strokeStyle = "#60758a";

        ctx.beginPath();
        ctx.moveTo(izquierda, arriba);
        ctx.lineTo(izquierda, alto - abajo);
        ctx.lineTo(ancho - derecha, alto - abajo);
        ctx.stroke();

        // Dibujar dos ciclos respiratorios
        ctx.beginPath();

        ctx.strokeStyle = esVolumen ? "#67dce8" : "#4ade80";
        ctx.lineWidth = 3;

        const pasos = 300;

        for (let i = 0; i <= pasos; i++) {

            const f = (i / pasos) * Math.PI * 4;

            const x = izquierda + (i / pasos) * anchoGrafica;

            const y = posicionY(calcularValor(f));

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // Indicador de la fase respiratoria actual
        const faseActual = fase % (Math.PI * 4);

        const xActual =
            izquierda + (faseActual / (Math.PI * 4)) * anchoGrafica;

        const yActual =
            posicionY(calcularValor(faseActual));

        // Línea vertical móvil
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff55";
        ctx.lineWidth = 1;
        ctx.moveTo(xActual, arriba);
        ctx.lineTo(xActual, alto - abajo);
        ctx.stroke();

        // Punto móvil
        ctx.beginPath();
        ctx.arc(xActual, yActual, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Etiquetas
        ctx.fillStyle = "#b4c4d8";
        ctx.font = "13px Arial";

        ctx.fillText("0 s", izquierda, alto - 15);

        ctx.fillText(
            duracionCiclo.toFixed(1) + " s",
            izquierda + anchoGrafica / 2 - 15,
            alto - 15
        );

        ctx.fillText(
            (duracionCiclo * 2).toFixed(1) + " s",
            ancho - 75,
            alto - 15
        );

        ctx.fillText(
            esVolumen ? "500 mL" : "+" + amplitudFlujo.toFixed(1),
            8,
            arriba + 5
        );

        ctx.fillText(
            esVolumen ? "0 mL" : "-" + amplitudFlujo.toFixed(1),
            8,
            alto - abajo
        );

        if (!esVolumen) {
            ctx.fillText("0", 35, posicionY(0) + 4);
        }
    }

    dibujarGrafica("graficaVolumen", "volumen");
    dibujarGrafica("graficaFlujo", "flujo");
}
// ======================================
// ANIMACIÓN RESPIRATORIA SINCRONIZADA
// ======================================

function animar() {

  requestAnimationFrame(animar);

  const delta = relojRespiratorio.getDelta();

  if (respiracionActiva && modelo) {

    tiempoRespiratorio += delta;

    const frecuencia = frecuenciaRespiratoria / 60;

    const fase =
      tiempoRespiratorio * frecuencia * Math.PI * 2;

    const expansion =
      1 + 0.025 * (1 - Math.cos(fase)) / 2;

    // Mantener la animación pulmonar
    modelo.scale.setScalar(
      escalaOriginalModelo * expansion
    );

    // Sincronizar parámetros fisiológicos
    actualizarPanelFisiologico(fase);

  } else {

    // Mostrar valores iniciales cuando esté pausado
    actualizarPanelFisiologico(0);

  }
dibujarGraficasRespiratorias();
  controles.update();

  renderizador.render(escena, camara);

}

animar();
// ======================================
// PANEL DE CONTROL RESPIRATORIO
// ======================================

// Crear panel
const panelRespiratorio = document.createElement("div");

panelRespiratorio.id = "panelRespiratorio";

panelRespiratorio.style.cssText = `
  background: #142438;
  border: 1px solid #21b8d0;
  border-radius: 12px;
  padding: 15px;
  margin: 15px 0;
  color: white;
  font-family: Arial, sans-serif;
`;

// Contenido del panel
panelRespiratorio.innerHTML = `

  <h3 style="color:#55d9ed; margin-top:0;">
    🌬️ Control respiratorio
  </h3>

  <button id="btnRespiracion" style="
    background:#1594aa;
    color:white;
    border:none;
    padding:10px 15px;
    border-radius:8px;
    cursor:pointer;
    margin-bottom:12px;
  ">
    ⏸️ Pausar respiración
  </button>

  <div style="margin-bottom:10px;">

    <label>
      Frecuencia respiratoria:
      <strong id="valorFrecuencia">12 rpm</strong>
    </label>

  </div>

  <input
    type="range"
    id="controlFrecuencia"
    min="6"
    max="30"
    value="12"
    step="1"
    style="width:100%; cursor:pointer;"
  >

  <p id="duracionCiclo" style="margin-bottom:0;">
    ⏱️ Duración del ciclo: 5 segundos
  </p>

`;

// Insertar el panel debajo del mensaje del modelo
mensaje.insertAdjacentElement("afterend", panelRespiratorio);


// ======================================
// BOTÓN INICIAR / PAUSAR
// ======================================

const btnRespiracion = document.getElementById("btnRespiracion");

btnRespiracion.textContent = respiracionActiva
  ? "⏸️ Pausar respiración"
  : "▶️ Iniciar respiración";

btnRespiracion.addEventListener("click", () => {

  respiracionActiva = !respiracionActiva;

  tiempoRespiratorio = 0;

  // Al pausar, recuperar el tamaño original
  if (!respiracionActiva && modelo) {
    modelo.scale.setScalar(escalaOriginalModelo);
  }

  btnRespiracion.textContent = respiracionActiva
    ? "⏸️ Pausar respiración"
    : "▶️ Iniciar respiración";

});


// ======================================
// CONTROL DE FRECUENCIA RESPIRATORIA
// ======================================

const controlFrecuencia = document.getElementById("controlFrecuencia");

const valorFrecuencia = document.getElementById("valorFrecuencia");

const duracionCiclo = document.getElementById("duracionCiclo");

controlFrecuencia.value = frecuenciaRespiratoria;

valorFrecuencia.textContent = frecuenciaRespiratoria + " rpm";

duracionCiclo.textContent =
  "⏱️ Duración del ciclo: " +
  (60 / frecuenciaRespiratoria).toFixed(1) +
  " segundos";

controlFrecuencia.addEventListener("input", (evento) => {

  frecuenciaRespiratoria = Number(evento.target.value);

  // Reiniciar el ciclo con la nueva frecuencia
  tiempoRespiratorio = 0;

  if (modelo) {
    modelo.scale.setScalar(escalaOriginalModelo);
  }

  valorFrecuencia.textContent =
    frecuenciaRespiratoria + " rpm";

  const duracion = 60 / frecuenciaRespiratoria;

  duracionCiclo.textContent =
    "⏱️ Duración del ciclo: " +
    duracion.toFixed(1) +
    " segundos";

});

