// ======================================
// PULMOLAB AR
// MODELO PULMONAR EN REALIDAD AUMENTADA
// ======================================

import * as THREE from "three";

import { GLTFLoader } from
    "three/addons/loaders/GLTFLoader.js";


// Contenedor de la cámara
const contenedorAR =
    document.querySelector(".contenedorCamara");

const videoAR =
    document.getElementById("camara");


// ======================================
// ESCENA TRIDIMENSIONAL
// ======================================

const escenaAR = new THREE.Scene();

const camaraAR = new THREE.OrthographicCamera(
    -2, 2, 2, -2, 0.1, 100
);

camaraAR.position.set(0, 0, 6);
camaraAR.lookAt(0, 0, 0);


// ======================================
// RENDERIZADOR TRANSPARENTE
// ======================================

const renderizadorAR = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderizadorAR.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderizadorAR.setClearColor(0x000000, 0);

renderizadorAR.domElement.style.position =
    "absolute";

renderizadorAR.domElement.style.top = "0";
renderizadorAR.domElement.style.left = "0";

renderizadorAR.domElement.style.width = "100%";
renderizadorAR.domElement.style.height = "100%";

renderizadorAR.domElement.style.pointerEvents =
    "none";

renderizadorAR.domElement.style.zIndex = "2";

contenedorAR.appendChild(
    renderizadorAR.domElement
);


// ======================================
// ILUMINACIÓN
// ======================================

const luzAmbiental =
    new THREE.AmbientLight(0xffffff, 2);

escenaAR.add(luzAmbiental);

const luzPrincipal =
    new THREE.DirectionalLight(0xffffff, 3);

luzPrincipal.position.set(3, 5, 5);

escenaAR.add(luzPrincipal);


// ======================================
// GRUPO DEL MODELO
// ======================================

const grupoPulmones = new THREE.Group();

escenaAR.add(grupoPulmones);

let modeloCargado = false;


// ======================================
// CARGAR NUESTROS PULMONES
// ======================================

const cargadorAR = new GLTFLoader();

cargadorAR.load(

    "./3d-vh-f-lung.glb",

    (gltf) => {

        const pulmones = gltf.scene;

        // Calcular dimensiones originales
        const caja = new THREE.Box3()
            .setFromObject(pulmones);

        const centro = caja.getCenter(
            new THREE.Vector3()
        );

        const dimensiones = caja.getSize(
            new THREE.Vector3()
        );

        // Centrar el modelo
        pulmones.position.sub(centro);

        // Ajustar su tamaño
        const dimensionMayor = Math.max(
            dimensiones.x,
            dimensiones.y,
            dimensiones.z
        );

        grupoPulmones.scale.setScalar(
            2.3 / dimensionMayor
        );

        grupoPulmones.add(pulmones);

        modeloCargado = true;

        console.log(
            "Pulmones cargados correctamente en AR"
        );

    },

    undefined,

    (error) => {

        console.error(
            "Error al cargar los pulmones:",
            error
        );

    }

);


// ======================================
// ADAPTAR AL TAMAÑO DE LA CÁMARA
// ======================================

function ajustarPantallaAR() {

    const ancho = contenedorAR.clientWidth;
    const alto = contenedorAR.clientHeight;

    if (ancho === 0 || alto === 0) return;

    const proporcion = ancho / alto;

    camaraAR.left = -2 * proporcion;
    camaraAR.right = 2 * proporcion;

    camaraAR.top = 2;
    camaraAR.bottom = -2;

    camaraAR.updateProjectionMatrix();

    renderizadorAR.setSize(
        ancho,
        alto,
        false
    );

}

ajustarPantallaAR();

const observadorAR = new ResizeObserver(
    ajustarPantallaAR
);

observadorAR.observe(contenedorAR);


// ======================================
// ANIMACIÓN RESPIRATORIA
// ======================================

const relojAR = new THREE.Clock();
// Guardar cuándo la IA detectó el cuerpo por última vez
let ultimaDeteccion = 0;
function animarAR() {

    requestAnimationFrame(animarAR);

    const tiempo = relojAR.getElapsedTime();

    // Frecuencia inicial: 12 rpm
    const frecuencia = 12 / 60;

    const fase =
        tiempo * frecuencia * Math.PI * 2;

    // Expansión respiratoria suave
    const expansion =
        1 + 0.025 * (1 - Math.cos(fase)) / 2;

    if (modeloCargado) {

        // La animación se aplica al modelo
        // sin perder su escala original
        const escalaBase = grupoPulmones.userData
            .escalaBase;

        if (escalaBase === undefined) {

            grupoPulmones.userData.escalaBase =
                grupoPulmones.scale.x;

        }

        grupoPulmones.scale.setScalar(
            grupoPulmones.userData.escalaBase *
            expansion
        );

    }

// Comprobar si la IA detectó el cuerpo recientemente
const cuerpoVisible =
    Date.now() - ultimaDeteccion < 1000;

// Mostrar los pulmones únicamente cuando
// la cámara esté activa y el cuerpo sea visible
renderizadorAR.domElement.style.opacity =
    videoAR.srcObject && cuerpoVisible ? "0.65" : "0";
// ======================================
// ESTABILIZACIÓN DEL SEGUIMIENTO CORPORAL
// ======================================

const objetivo =
    grupoPulmones.userData.posicionObjetivo;

if (objetivo) {

    const distancia =
        grupoPulmones.position.distanceTo(objetivo);

    // Ignorar movimientos muy pequeños
    if (distancia > 0.035) {

        // Desplazamiento progresivo hacia el objetivo
        grupoPulmones.position.lerp(
            objetivo,
            0.10
        );

    }
}
    renderizadorAR.render(
        escenaAR,
        camaraAR
    );

}

animarAR();
// ======================================
// INTELIGENCIA ARTIFICIAL - MEDIAPIPE
// DETECCIÓN DE HOMBROS Y TORSO
// ======================================

// Crear una capa transparente para dibujar
// los puntos detectados por la IA
const canvasIA = document.createElement("canvas");

canvasIA.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    pointer-events: none;
    transform: scaleX(-1);
`;

contenedorAR.appendChild(canvasIA);

const contextoIA = canvasIA.getContext("2d");

// Mostrar el estado de la inteligencia artificial
const estadoIA = document.createElement("p");

estadoIA.textContent = "🤖 IA: cargando modelo...";
estadoIA.style.color = "#55d9ed";

contenedorAR.insertAdjacentElement(
    "afterend",
    estadoIA
);

// ======================================
// CARGAR EL MODELO DE INTELIGENCIA ARTIFICIAL
// ======================================

async function iniciarInteligenciaArtificial() {

    try {

        const {
    PoseLandmarker,
    FilesetResolver
} = await import(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.mjs"
);

const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
        const detector = await PoseLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
                    delegate: "CPU"
                },

                runningMode: "VIDEO",
                numPoses: 1
            }
        );

        estadoIA.textContent =
            "🤖 IA lista. Colócate frente a la cámara.";

        let ultimoAnalisis = 0;

        // ======================================
        // DETECTAR EL CUERPO
        // ======================================

        function detectarCuerpo(tiempo) {

            requestAnimationFrame(detectarCuerpo);

            if (
                !videoAR.srcObject ||
                videoAR.readyState < 2 ||
                !videoAR.videoWidth
            ) {
                return;
            }

            // Analizar aproximadamente 10 veces por segundo
            if (tiempo - ultimoAnalisis < 100) {
                return;
            }

            ultimoAnalisis = tiempo;

            const resultado = detector.detectForVideo(
                videoAR,
                tiempo
            );

            const ancho = contenedorAR.clientWidth;
            const alto = contenedorAR.clientHeight;

            canvasIA.width = ancho;
            canvasIA.height = alto;

            contextoIA.clearRect(
                0, 0, ancho, alto
            );

            if (
                !resultado.landmarks ||
                resultado.landmarks.length === 0
            ) {

                estadoIA.textContent =
                    "🤖 IA activa: buscando una persona...";

                return;
            }

            const puntos = resultado.landmarks[0];

            // Puntos anatómicos:
            // 11: hombro izquierdo
            // 12: hombro derecho
            // 23: cadera izquierda
            // 24: cadera derecha

            const indices = [11, 12, 23, 24];

            // Ajustar coordenadas al recorte de la cámara
            const escala = Math.max(
                ancho / videoAR.videoWidth,
                alto / videoAR.videoHeight
            );

            const desplazamientoX =
                (ancho - videoAR.videoWidth * escala) / 2;

            const desplazamientoY =
                (alto - videoAR.videoHeight * escala) / 2;
// ======================================
// SEGUIMIENTO DEL TÓRAX CON IA
// ======================================

// Obtener las coordenadas de los hombros
const hombroIzquierdo = puntos[11];
const hombroDerecho = puntos[12];

if (
    modeloCargado &&
    hombroIzquierdo &&
    hombroDerecho &&
    hombroIzquierdo.visibility > 0.5 &&
    hombroDerecho.visibility > 0.5
) { 
    // La IA reconoce correctamente ambos hombros
ultimaDeteccion = Date.now();

    // Calcular el punto medio entre los hombros
    const centroX =
        (hombroIzquierdo.x + hombroDerecho.x) / 2;

    const centroY =
        (hombroIzquierdo.y + hombroDerecho.y) / 2;

    // Calcular la distancia entre los hombros
    const distanciaHombros = Math.hypot(
        (hombroDerecho.x - hombroIzquierdo.x) *
            videoAR.videoWidth * escala,

        (hombroDerecho.y - hombroIzquierdo.y) *
            videoAR.videoHeight * escala
    );
    // ======================================
// AJUSTAR TAMAÑO SEGÚN EL CUERPO
// ======================================

// Medir el ancho actual de los pulmones en píxeles
const anchoModeloActual =
    new THREE.Box3()
        .setFromObject(grupoPulmones)
        .getSize(new THREE.Vector3()).x *
    (alto / 4);

if (anchoModeloActual > 0) {

    // Los pulmones ocuparán aproximadamente
    // el 85 % de la distancia entre hombros
    const anchoDeseado = distanciaHombros * 0.85;

    // Calcular la escala necesaria
    const escalaDeseada =
        grupoPulmones.scale.x *
        (anchoDeseado / anchoModeloActual);

    // Cambiar de tamaño progresivamente
    const escalaActual =
        grupoPulmones.userData.escalaBase ??
        grupoPulmones.scale.x;

    grupoPulmones.userData.escalaBase =
        THREE.MathUtils.lerp(
            escalaActual,
            escalaDeseada,
            0.2
        );
}

    // Convertir las coordenadas al tamaño de la cámara
    const posicionX =
        centroX * videoAR.videoWidth * escala +
        desplazamientoX;

  // Situar los pulmones en la región torácica
const posicionY =
    centroY * videoAR.videoHeight * escala +
    desplazamientoY +
    distanciaHombros * 0.25;
    // Corregir el efecto espejo de la cámara
    const posicionXEspejo = ancho - posicionX;

    // Convertir las coordenadas a la escena de Three.js
    const posicion3DX =
        (posicionXEspejo / ancho - 0.5) *
        (4 * ancho / alto);

    const posicion3DY =
        (0.5 - posicionY / alto) * 4;

    // Guardar la posición detectada por la IA
grupoPulmones.userData.posicionObjetivo =
    new THREE.Vector3(
        posicion3DX,
        posicion3DY,
        0
    );

}
            indices.forEach(indice => {

                const punto = puntos[indice];

                if (!punto || punto.visibility < 0.5) {
                    return;
                }

                const x =
                    punto.x * videoAR.videoWidth * escala +
                    desplazamientoX;

                const y =
                    punto.y * videoAR.videoHeight * escala +
                    desplazamientoY;

                contextoIA.beginPath();

                contextoIA.arc(
                    x,
                    y,
                    8,
                    0,
                    Math.PI * 2
                );

                contextoIA.fillStyle = "#00ff88";
                contextoIA.fill();

                contextoIA.lineWidth = 2;
                contextoIA.strokeStyle = "#ffffff";
                contextoIA.stroke();

            });

            estadoIA.textContent =
                "✅ IA: cuerpo detectado correctamente";

        }

        requestAnimationFrame(detectarCuerpo);

    } catch (error) {

        console.error("Error de MediaPipe:", error);

        estadoIA.textContent =
            "❌ No se pudo iniciar la inteligencia artificial.";

    }

}

iniciarInteligenciaArtificial();
