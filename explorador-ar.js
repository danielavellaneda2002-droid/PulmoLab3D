// PulmoLab AR - Explorador anatómico independiente
// Archivo complementario: NO sustituye ar.js ni modifica la cámara.
// Nombres anatómicos asociados a los nodos reales del modelo 3d-vh-f-lung.glb.
// La tráquea NO forma parte del GLB revisado.

import * as THREE from "three";

export const DATOS_ANATOMICOS_AR = {
  "VH_F_left_lungs_L": {
    "nombre": "Pulmón izquierdo",
    "categoria": "Pulmones",
    "ubicacion": "Tórax, cavidad pleural izquierda",
    "descripcion": "Tiene dos lóbulos, superior e inferior, separados por la fisura oblicua. Presenta la escotadura cardíaca y la língula. Sus vías aéreas conducen aire a los alvéolos."
  },
  "VH_F_hilum_L": {
    "nombre": "Hilio pulmonar izquierdo",
    "categoria": "Hilio pulmonar",
    "ubicacion": "Pulmón izquierdo",
    "descripcion": "Región por la que transitan bronquios, vasos pulmonares, vasos bronquiales, linfáticos y nervios. El modelo representa su superficie anatómica; no necesariamente individualiza todos esos elementos."
  },
  "VH_F_L_lung_upper_lobe": {
    "nombre": "Lóbulo superior izquierdo",
    "categoria": "Lóbulos",
    "ubicacion": "Pulmón izquierdo",
    "descripcion": "Ocupa la región superior del pulmón izquierdo. Incluye segmentos apical, posterior y anterior, además de la língula (segmentos superior e inferior). Se separa del lóbulo inferior por la fisura oblicua. En algunas descripciones anatómicas, los segmentos apical y posterior se agrupan."
  },
  "VH_F_hilum_upper_L": {
    "nombre": "Región hiliar superior izquierda",
    "categoria": "Hilio pulmonar",
    "ubicacion": "Lóbulo superior izquierdo",
    "descripcion": "Región por la que transitan bronquios, vasos pulmonares, vasos bronquiales, linfáticos y nervios. El modelo representa su superficie anatómica; no necesariamente individualiza todos esos elementos."
  },
  "VH_F_lingula_superior_bronchopulmonary_segment": {
    "nombre": "Segmento lingular superior izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo superior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_left_anterior_bronchopulmonary_segment": {
    "nombre": "Segmento anterior izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo superior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_left_apical_bronchopulmonary_segment": {
    "nombre": "Segmento apical izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo superior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_left_posterior_bronchopulmonary_segment": {
    "nombre": "Segmento posterior izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo superior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_lingula_inferior_bronchopulmonary_segment": {
    "nombre": "Segmento lingular inferior izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo superior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_L_lung_lower_lobe": {
    "nombre": "Lóbulo inferior izquierdo",
    "categoria": "Lóbulos",
    "ubicacion": "Pulmón izquierdo",
    "descripcion": "Ocupa la porción inferior del pulmón izquierdo. En este modelo se distinguen un segmento superior y cuatro segmentos basales. Está separado del lóbulo superior por la fisura oblicua."
  },
  "VH_F_left_superior_bronchopulmonary_segment": {
    "nombre": "Segmento superior izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_left_posterior_basal_bronchopulmonary_segment": {
    "nombre": "Segmento basal posterior izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_left_anterior_basal_bronchopulmonary_segment": {
    "nombre": "Segmento basal anterior izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_left_lateral_basal_bronchopulmonary_segment": {
    "nombre": "Segmento basal lateral izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_left_medial_basal_bronchopulmonary_segment": {
    "nombre": "Segmento basal medial izquierdo",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior izquierdo",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_hilum_lower_L": {
    "nombre": "Región hiliar inferior izquierda",
    "categoria": "Hilio pulmonar",
    "ubicacion": "Lóbulo inferior izquierdo",
    "descripcion": "Región por la que transitan bronquios, vasos pulmonares, vasos bronquiales, linfáticos y nervios. El modelo representa su superficie anatómica; no necesariamente individualiza todos esos elementos."
  },
  "VH_F_lungs_R": {
    "nombre": "Pulmón derecho",
    "categoria": "Pulmones",
    "ubicacion": "Tórax, cavidad pleural derecha",
    "descripcion": "Tiene tres lóbulos, superior, medio e inferior, separados por las fisuras horizontal y oblicua. Sus vías aéreas distribuyen el aire hacia los segmentos broncopulmonares."
  },
  "VH_F_hilum_R": {
    "nombre": "Hilio pulmonar derecho",
    "categoria": "Hilio pulmonar",
    "ubicacion": "Pulmón derecho",
    "descripcion": "Región por la que transitan bronquios, vasos pulmonares, vasos bronquiales, linfáticos y nervios. El modelo representa su superficie anatómica; no necesariamente individualiza todos esos elementos."
  },
  "VH_F_R_lung_lower_lobe": {
    "nombre": "Lóbulo inferior derecho",
    "categoria": "Lóbulos",
    "ubicacion": "Pulmón derecho",
    "descripcion": "Se sitúa en la porción inferior del pulmón derecho. Incluye un segmento superior y cuatro segmentos basales. Está separado de los otros lóbulos por la fisura oblicua."
  },
  "VH_F_right_medial_basal_bronchopulmonary_segment": {
    "nombre": "Segmento basal medial derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_right_posterior_basal_bronchopulmonary_segment": {
    "nombre": "Segmento basal posterior derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_right_anterior_basal_bronchopulmonary_segment": {
    "nombre": "Segmento basal anterior derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_right_lateral_basal_bronchopulmonary_segment": {
    "nombre": "Segmento basal lateral derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_right_superior_bronchopulmonary_segment": {
    "nombre": "Segmento superior derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo inferior derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_hilum_lower_R": {
    "nombre": "Región hiliar inferior derecha",
    "categoria": "Hilio pulmonar",
    "ubicacion": "Lóbulo inferior derecho",
    "descripcion": "Región por la que transitan bronquios, vasos pulmonares, vasos bronquiales, linfáticos y nervios. El modelo representa su superficie anatómica; no necesariamente individualiza todos esos elementos."
  },
  "VH_F_R_lung_middle_lobe": {
    "nombre": "Lóbulo medio derecho",
    "categoria": "Lóbulos",
    "ubicacion": "Pulmón derecho",
    "descripcion": "Ocupa una región anterior y lateral del pulmón derecho. Contiene los segmentos lateral y medial. Se delimita por las fisuras horizontal y oblicua."
  },
  "VH_F_right_medial_bronchopulmonary_segment": {
    "nombre": "Segmento medial derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo medio derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_right_lateral_bronchopulmonary_segmennt": {
    "nombre": "Segmento lateral derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo medio derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_hilum_middle_R": {
    "nombre": "Región hiliar media derecha",
    "categoria": "Hilio pulmonar",
    "ubicacion": "Lóbulo medio derecho",
    "descripcion": "Región por la que transitan bronquios, vasos pulmonares, vasos bronquiales, linfáticos y nervios. El modelo representa su superficie anatómica; no necesariamente individualiza todos esos elementos."
  },
  "VH_F_R_lung_upper_lobe": {
    "nombre": "Lóbulo superior derecho",
    "categoria": "Lóbulos",
    "ubicacion": "Pulmón derecho",
    "descripcion": "Se sitúa en la región superior del pulmón derecho. Contiene los segmentos apical, posterior y anterior. Está separado del lóbulo medio por la fisura horizontal y del inferior por la oblicua."
  },
  "VH_F_right_anterior_bronchopulmonary_segm": {
    "nombre": "Segmento anterior derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo superior derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_right_apical_bronchopulmonary_segment": {
    "nombre": "Segmento apical derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo superior derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_right_posterior_bronchopulmonary_segment": {
    "nombre": "Segmento posterior derecho",
    "categoria": "Segmentos broncopulmonares",
    "ubicacion": "Lóbulo superior derecho",
    "descripcion": "Región funcional del pulmón ventilada por un bronquio segmentario. El aire llega a sus alvéolos, donde se realiza el intercambio gaseoso. Su delimitación corresponde a la segmentación representada en este modelo."
  },
  "VH_F_hilum_upper_R": {
    "nombre": "Región hiliar superior derecha",
    "categoria": "Hilio pulmonar",
    "ubicacion": "Lóbulo superior derecho",
    "descripcion": "Región por la que transitan bronquios, vasos pulmonares, vasos bronquiales, linfáticos y nervios. El modelo representa su superficie anatómica; no necesariamente individualiza todos esos elementos."
  },
  "VH_F_cartilage_of_lobar_bronchus_L": {
    "nombre": "Cartílago de bronquios lobares izquierdos",
    "categoria": "Cartílago bronquial",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "El cartílago contribuye a mantener abiertas las vías aéreas y les aporta soporte mecánico durante la respiración."
  },
  "VH_F_cartilage_of_tertiary_bronchus_L": {
    "nombre": "Cartílago de bronquios segmentarios izquierdos",
    "categoria": "Cartílago bronquial",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "El cartílago contribuye a mantener abiertas las vías aéreas y les aporta soporte mecánico durante la respiración."
  },
  "VH_F_left_superior_lobar_bronchus": {
    "nombre": "Bronquio lobar superior izquierdo",
    "categoria": "Bronquios lobares",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Conduce el aire desde una vía bronquial de mayor calibre hacia el lóbulo correspondiente. Es una vía de conducción: el intercambio gaseoso ocurre en los alvéolos."
  },
  "VH_F_left_inferior_lobar_bronchus": {
    "nombre": "Bronquio lobar inferior izquierdo",
    "categoria": "Bronquios lobares",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Conduce el aire desde una vía bronquial de mayor calibre hacia el lóbulo correspondiente. Es una vía de conducción: el intercambio gaseoso ocurre en los alvéolos."
  },
  "VH_F_left_anterior_basal_bronchus": {
    "nombre": "Bronquio segmentario basal anterior izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_lingula_superior_bronchus": {
    "nombre": "Bronquio segmentario lingular superior izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_apical_bronchus": {
    "nombre": "Bronquio segmentario apical izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_posterior_basal_bronchus": {
    "nombre": "Bronquio segmentario basal posterior izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_medial_basal_bronchus": {
    "nombre": "Bronquio segmentario basal medial izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_superior_bronchus": {
    "nombre": "Bronquio segmentario superior izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_anterior_bronchus": {
    "nombre": "Bronquio segmentario anterior izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_posterior_bronchus": {
    "nombre": "Bronquio segmentario posterior izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_lateral_basal_bronchus": {
    "nombre": "Bronquio segmentario basal lateral izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_left_lingula_inferior_bronchi": {
    "nombre": "Bronquio segmentario lingular inferior izquierdo",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial izquierdo",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_cartilage_of_lobar_bronchus_R": {
    "nombre": "Cartílago de bronquios lobares derechos",
    "categoria": "Cartílago bronquial",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "El cartílago contribuye a mantener abiertas las vías aéreas y les aporta soporte mecánico durante la respiración."
  },
  "VH_F_cartilage_of_tertiary_bronchus_R": {
    "nombre": "Cartílago de bronquios segmentarios derechos",
    "categoria": "Cartílago bronquial",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "El cartílago contribuye a mantener abiertas las vías aéreas y les aporta soporte mecánico durante la respiración."
  },
  "VH_F_right_middle_lobar_bronchus": {
    "nombre": "Bronquio lobar medio derecho",
    "categoria": "Bronquios lobares",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Conduce el aire desde una vía bronquial de mayor calibre hacia el lóbulo correspondiente. Es una vía de conducción: el intercambio gaseoso ocurre en los alvéolos."
  },
  "VH_F_right_superior_lobar_bronchus": {
    "nombre": "Bronquio lobar superior derecho",
    "categoria": "Bronquios lobares",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Conduce el aire desde una vía bronquial de mayor calibre hacia el lóbulo correspondiente. Es una vía de conducción: el intercambio gaseoso ocurre en los alvéolos."
  },
  "VH_F_right_inferior_lobar_bronchus": {
    "nombre": "Bronquio lobar inferior derecho",
    "categoria": "Bronquios lobares",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Conduce el aire desde una vía bronquial de mayor calibre hacia el lóbulo correspondiente. Es una vía de conducción: el intercambio gaseoso ocurre en los alvéolos."
  },
  "VH_F_right_anterior_bronchus": {
    "nombre": "Bronquio segmentario anterior derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_lateral_basal_bronchus": {
    "nombre": "Bronquio segmentario basal lateral derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_lateral_bronchus": {
    "nombre": "Bronquio segmentario lateral derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_medial_bronchus": {
    "nombre": "Bronquio segmentario medial derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_medial_basal_bronchus": {
    "nombre": "Bronquio segmentario basal medial derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_posterior_basal_bronchus": {
    "nombre": "Bronquio segmentario basal posterior derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_posterior_bronchus": {
    "nombre": "Bronquio segmentario posterior derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_superior_bronchus": {
    "nombre": "Bronquio segmentario superior derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_apical_bronchus": {
    "nombre": "Bronquio segmentario apical derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  },
  "VH_F_right_anterior_basal_bronchus": {
    "nombre": "Bronquio segmentario basal anterior derecho",
    "categoria": "Bronquios segmentarios",
    "ubicacion": "Árbol bronquial derecho",
    "descripcion": "Rama bronquial que conduce aire hacia el segmento broncopulmonar correspondiente. El intercambio gaseoso ocurre en los alvéolos, no en este bronquio."
  }
};

/**
 * Activa un explorador con menú y selección táctil sobre el modelo.
 * Debe llamarse después de crear controlesVistaAR y panelInfoAR en ar.js.
 */
export function iniciarExploradorAR({
    contenedorAR,
    camaraAR,
    grupoPulmones,
    controlesVistaAR,
    videoAR,
    renderizadorAR
}) {
    if (!contenedorAR || !camaraAR || !grupoPulmones || !controlesVistaAR) {
        console.warn("Explorador AR: faltan referencias de la escena.");
        return;
    }

    const css = document.createElement("style");
    css.textContent = `
        .explorador-anatomico-ar {
            width: 95%;
            max-width: 700px;
            box-sizing: border-box;
            margin: 12px auto;
            text-align: left;
            font-family: Arial, sans-serif;
        }
        .explorador-anatomico-ar details,
        .explorador-anatomico-ar .ficha-anatomica-ar {
            background: #10283b;
            border: 1px solid #00b894;
            border-radius: 12px;
            padding: 14px;
            color: white;
        }
        .explorador-anatomico-ar summary {
            cursor: pointer;
            color: #55d9ed;
            font-size: 17px;
            font-weight: bold;
        }
        .explorador-anatomico-ar select {
            display: block;
            width: 100%;
            box-sizing: border-box;
            margin-top: 12px;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #55d9ed;
            background: #081421;
            color: white;
            font-size: 15px;
        }
        .explorador-anatomico-ar .ayuda-anatomia-ar {
            color: #b4c4d8;
            font-size: 13px;
            margin: 10px 0 0;
            line-height: 1.5;
        }
        .explorador-anatomico-ar .ficha-anatomica-ar {
            margin-top: 12px;
            line-height: 1.55;
        }
        .explorador-anatomico-ar .ficha-anatomica-ar h3 {
            color: #55d9ed;
            margin: 0 0 8px;
            font-size: 18px;
        }
        .explorador-anatomico-ar .ficha-anatomica-ar p {
            margin: 8px 0;
            font-size: 14px;
        }
        .explorador-anatomico-ar .cerrar-ficha-ar {
            background: #087e99;
            padding: 9px 14px;
            font-size: 14px;
            margin: 10px 0 0;
        }
    `;
    document.head.appendChild(css);

    const seccion = document.createElement("section");
    seccion.className = "explorador-anatomico-ar";
    seccion.setAttribute("aria-label", "Explorador anatómico pulmonar");

    const desplegable = document.createElement("details");
    const tituloDesplegable = document.createElement("summary");
    tituloDesplegable.textContent = "📚 Explorar anatomía pulmonar";
    desplegable.appendChild(tituloDesplegable);

    const selector = document.createElement("select");
    selector.setAttribute("aria-label", "Seleccionar estructura anatómica");
    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.textContent = "Selecciona una estructura...";
    selector.appendChild(opcionInicial);

    const ordenCategorias = [
        "Pulmones",
        "Lóbulos",
        "Segmentos broncopulmonares",
        "Bronquios lobares",
        "Bronquios segmentarios",
        "Hilio pulmonar",
        "Cartílago bronquial"
    ];
    for (const categoria of ordenCategorias) {
        const grupoOpciones = document.createElement("optgroup");
        grupoOpciones.label = categoria;
        for (const [clave, dato] of Object.entries(DATOS_ANATOMICOS_AR)) {
            if (dato.categoria !== categoria) continue;
            const opcion = document.createElement("option");
            opcion.value = clave;
            opcion.textContent = dato.nombre;
            grupoOpciones.appendChild(opcion);
        }
        selector.appendChild(grupoOpciones);
    }
    desplegable.appendChild(selector);

    const ayuda = document.createElement("p");
    ayuda.className = "ayuda-anatomia-ar";
    ayuda.textContent = "Elige una estructura del menú o tócala directamente sobre los pulmones 3D. El resaltado es educativo.";
    desplegable.appendChild(ayuda);
    seccion.appendChild(desplegable);

    const ficha = document.createElement("div");
    ficha.className = "ficha-anatomica-ar";
    ficha.setAttribute("aria-live", "polite");
    ficha.hidden = true;
    // La regla CSS display no se fija para respetar el atributo hidden.
    ficha.style.display = "none";

    const nombreFicha = document.createElement("h3");
    const categoriaFicha = document.createElement("p");
    const ubicacionFicha = document.createElement("p");
    const descripcionFicha = document.createElement("p");
    const cerrarFicha = document.createElement("button");
    cerrarFicha.className = "cerrar-ficha-ar";
    cerrarFicha.type = "button";
    cerrarFicha.textContent = "✕ Cerrar información";
    ficha.append(nombreFicha, categoriaFicha, ubicacionFicha, descripcionFicha, cerrarFicha);
    seccion.appendChild(ficha);

    // Insertar entre los modos de visualización y el panel del sistema.
    controlesVistaAR.insertAdjacentElement("afterend", seccion);

    const raycaster = new THREE.Raycaster();
    const puntero = new THREE.Vector2();
    const materialesOriginales = new Map();

    function limpiarResaltado() {
        for (const [malla, original] of materialesOriginales) {
            const temporal = malla.material;
            malla.material = original;
            if (Array.isArray(temporal)) {
                temporal.forEach(m => m.dispose());
            } else {
                temporal.dispose();
            }
        }
        materialesOriginales.clear();
    }

    function resaltar(nodo) {
        limpiarResaltado();
        nodo.traverse(objeto => {
            if (!objeto.isMesh || !objeto.material) return;
            materialesOriginales.set(objeto, objeto.material);
            const clonarMaterial = material => {
                const copia = material.clone();
                if (copia.emissive) {
                    copia.emissive.set(0x00b894);
                    copia.emissiveIntensity = 0.45;
                }
                return copia;
            };
            objeto.material = Array.isArray(objeto.material)
                ? objeto.material.map(clonarMaterial)
                : clonarMaterial(objeto.material);
        });
    }

    function buscarNodo(nombre) {
        return grupoPulmones.getObjectByName(nombre);
    }

    function seleccionar(nombre) {
        const dato = DATOS_ANATOMICOS_AR[nombre];
        if (!dato) return;
        nombreFicha.textContent = "🫁 " + dato.nombre;
        categoriaFicha.textContent = "Categoría: " + dato.categoria;
        ubicacionFicha.textContent = "Ubicación: " + dato.ubicacion;
        descripcionFicha.textContent = dato.descripcion;
        ficha.hidden = false;
        ficha.style.display = "block";
        selector.value = nombre;
        const nodo = buscarNodo(nombre);
        if (nodo) resaltar(nodo);
        else limpiarResaltado();
    }

    selector.addEventListener("change", () => {
        if (selector.value) seleccionar(selector.value);
        else {
            limpiarResaltado();
            ficha.hidden = true;
            ficha.style.display = "none";
        }
    });

    cerrarFicha.addEventListener("click", () => {
        limpiarResaltado();
        ficha.hidden = true;
        ficha.style.display = "none";
        selector.value = "";
    });

    // El canvas del renderizador ya tiene pointer-events:none.
    // Capturamos el toque en el contenedor sin modificar el video ni la IA.
    contenedorAR.addEventListener("click", (evento) => {
        if (!videoAR?.srcObject || !grupoPulmones.children.length) return;
        if (renderizadorAR?.domElement.style.opacity === "0") return;
        const rect = contenedorAR.getBoundingClientRect();
        puntero.x = ((evento.clientX - rect.left) / rect.width) * 2 - 1;
        puntero.y = -((evento.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(puntero, camaraAR);
        const intersecciones = raycaster.intersectObjects(grupoPulmones.children, true);
        const objeto = intersecciones.find(inter => {
            let nodo = inter.object;
            while (nodo && nodo !== grupoPulmones) {
                if (DATOS_ANATOMICOS_AR[nodo.name]) return true;
                nodo = nodo.parent;
            }
            return false;
        });
        if (!objeto) return;
        let nodo = objeto.object;
        while (nodo && nodo !== grupoPulmones) {
            if (DATOS_ANATOMICOS_AR[nodo.name]) {
                seleccionar(nodo.name);
                return;
            }
            nodo = nodo.parent;
        }
    });

    console.log("Explorador anatómico AR preparado:",
        Object.keys(DATOS_ANATOMICOS_AR).length, "estructuras y grupos");
}
