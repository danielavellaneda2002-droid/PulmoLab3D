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

    // Mostrar pulmones cuando la cámara esté activa
    renderizadorAR.domElement.style.opacity =
        videoAR.srcObject ? "1" : "0";

    renderizadorAR.render(
        escenaAR,
        camaraAR
    );

}

animarAR();
