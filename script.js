// Define la estructura de los semestres y sus ramos con sus requisitos.
// Cada ramo tiene un 'id' único, un 'name' y una lista de 'prereqs' (IDs de ramos prerrequisito).
// El requisito "all_previous" se manejará de forma especial para las prácticas finales.
const semesters = {
    "Semestre 1": [
        { id: "S1C1", name: "Biología Celular e Histología", prereqs: [] },
        { id: "S1C2", name: "Química General y Orgánica", prereqs: [] },
        { id: "S1C3", name: "Anatomía General", prereqs: [] },
        { id: "S1C4", name: "Introducción a la Kinesiología", prereqs: [] },
        { id: "S1C5", name: "Matemáticas", prereqs: [] },
        { id: "S1C6", name: "Comunicación Académica", prereqs: [] },
    ],
    "Semestre 2": [
        { id: "S2C1", name: "Bioquímica", prereqs: [] },
        { id: "S2C2", name: "Fisiología General", prereqs: ["S2C1"] }, // Requiere: Bioquímica
        { id: "S2C3", name: "Anatomía y Cinesiología", prereqs: [] },
        { id: "S2C4", name: "Movimiento Humano", prereqs: [] },
        { id: "S2C5", name: "Responsabilidad Social", prereqs: [] },
    ],
    "Semestre 3": [
        { id: "S3C1", name: "Fisiopatología", prereqs: ["S2C2"] }, // Requiere: Fisiología General
        { id: "S3C2", name: "Neurociencias", prereqs: [] },
        { id: "S3C3", name: "Farmacología", prereqs: ["S2C2"] }, // Requiere: Fisiología General
        { id: "S3C4", name: "Biofísica", prereqs: [] },
        { id: "S3C5", name: "Desarrollo del Pensamiento Crítico", prereqs: [] },
    ],
    "Semestre 4": [
        { id: "S4C1", name: "Neurofisiología", prereqs: ["S3C2"] }, // Requiere: Neurociencias
        { id: "S4C2", name: "Exploración Física Funcional", prereqs: ["S2C3"] }, // Requiere: Anatomía y Cinesiología
        { id: "S4C3", name: "Análisis del Movimiento Funcional y Disfuncional", prereqs: [] },
        { id: "S4C4", name: "Fisiología del Ejercicio", prereqs: ["S2C2"] }, // Requiere: Fisiología General
        { id: "S4C5", name: "Electivo de Comunicación", prereqs: [] },
    ],
    "Semestre 5": [
        { id: "S5C1", name: "Disfunción del Sistema Locomotor", prereqs: ["S2C3"] }, // Requiere: Anatomía y Cinesiología
        { id: "S5C2", name: "Terapia por Agentes Físicos I", prereqs: ["S2C2"] }, // Requiere: Fisiología General
        { id: "S5C3", name: "Proyecto de Investigación I", prereqs: [] },
        { id: "S5C4", name: "Salud Familiar y Comunitaria", prereqs: [] },
        { id: "S5C5", name: "Electivo de Ética", prereqs: [] },
    ],
    "Semestre 6": [
        { id: "S6C1", name: "Kinesiología del Deporte", prereqs: [] },
        { id: "S6C2", name: "Terapia por Agentes Físicos II", prereqs: ["S5C2"] }, // Requiere: Terapia por Agentes Físicos I
        { id: "S6C3", name: "Metodología de la Investigación", prereqs: [] },
        { id: "S6C4", name: "Epidemiología y Salud Pública", prereqs: [] },
        { id: "S6C5", name: "Electivo de Desarrollo Personal", prereqs: [] },
    ],
    "Semestre 7": [
        { id: "S7C1", name: "Intervención Kinesiológica Neuromotriz", prereqs: ["S4C1"] }, // Requiere: Neurofisiología
        { id: "S7C2", name: "Intervención Kinesiológica Cardiorrespiratoria", prereqs: ["S4C4"] }, // Requiere: Fisiología del Ejercicio
        { id: "S7C3", name: "Proyecto de Investigación II", prereqs: ["S5C3"] }, // Requiere: Proyecto de Investigación I
        { id: "S7C4", name: "Intervención Kinesiológica en el Adulto Mayor", prereqs: [] },
        { id: "S7C5", name: "Electivo de Responsabilidad Social", prereqs: [] },
    ],
    "Semestre 8": [
        { id: "S8C1", name: "Diagnóstico e Intervención Kinesiológica I", prereqs: ["S7C1", "S6C2"] }, // Requiere: Intervención Kinesiológica Neuromotriz y Terapia por Agentes Físicos II
        { id: "S8C2", name: "Diagnóstico e Intervención Kinesiológica II", prereqs: ["S8C1"] }, // Requiere: Diagnóstico e Intervención Kinesiológica I
        { id: "S8C3", name: "Gestión en Salud", prereqs: [] },
        { id: "S8C4", name: "Salud Ocupacional y Ergonomía", prereqs: [] },
        { id: "S8C5", name: "Práctica Profesional I", prereqs: ["S5C3", "S5C2"] }, // Requiere: Proyecto de Investigación I, Terapia por Agentes Físicos I
    ],
    "Semestre 9": [
        { id: "S9C1", name: "Práctica Profesional II", prereqs: "all_previous" }, // Requiere: Todas las asignaturas previas del plan (del semestre 1 al 8)
        { id: "S9C2", name: "Práctica Profesional III", prereqs: "all_previous" },
        { id: "S9C3", name: "Práctica Profesional IV", prereqs: "all_previous" },
        { id: "S9C4", name: "Práctica Profesional V", prereqs: "all_previous" },
    ],
    "Semestre 10": [
        { id: "S10C1", name: "(Generalmente reservado para prácticas y actividades finales de titulación)", prereqs: [] },
    ],
};

// Variable para almacenar los IDs de los ramos aprobados.
let approvedCourses = new Set();

// Obtiene referencias a elementos del DOM.
const curriculumGrid = document.getElementById('curriculum-grid');
const messageModal = document.getElementById('message-modal');
const modalMessage = document.getElementById('modal-message');
const closeButton = document.querySelector('.close-button');
const modalOkButton = document.querySelector('.modal-ok-button');

/**
 * Carga los ramos aprobados desde el almacenamiento local del navegador.
 * Si no hay datos guardados, inicializa un Set vacío.
 */
function loadApprovedCourses() {
    const storedCourses = localStorage.getItem('approvedCourses');
    if (storedCourses) {
        approvedCourses = new Set(JSON.parse(storedCourses));
    }
}

/**
 * Guarda los ramos aprobados en el almacenamiento local del navegador.
 * Convierte el Set a un Array para poder serializarlo a JSON.
 */
function saveApprovedCourses() {
    localStorage.setItem('approvedCourses', JSON.stringify(Array.from(approvedCourses)));
}

/**
 * Encuentra un ramo por su ID.
 * @param {string} courseId - El ID del ramo a buscar.
 * @returns {object|null} El objeto del ramo si se encuentra, de lo contrario null.
 */
function findCourseById(courseId) {
    for (const semesterName in semesters) {
        const course = semesters[semesterName].find(c => c.id === courseId);
        if (course) {
            return course;
        }
    }
    return null;
}

/**
 * Obtiene todos los IDs de ramos de los semestres 1 al 8.
 * Esto es para el requisito "all_previous".
 * @returns {Array<string>} Un array con todos los IDs de ramos de los semestres 1-8.
 */
function getAllPreviousCourseIds() {
    const previousCourseIds = [];
    // Recorre los semestres del 1 al 8
    for (let i = 1; i <= 8; i++) {
        const semesterName = `Semestre ${i}`;
        if (semesters[semesterName]) {
            semesters[semesterName].forEach(course => {
                previousCourseIds.push(course.id);
            });
        }
    }
    return previousCourseIds;
}

/**
 * Verifica si todos los requisitos para un ramo dado están cumplidos.
 * @param {string} courseId - El ID del ramo a verificar.
 * @returns {object} Un objeto con 'isMet' (booleano) y 'missingPrereqs' (array de nombres de ramos).
 */
function checkPrerequisites(courseId) {
    const course = findCourseById(courseId);
    if (!course) {
        return { isMet: false, missingPrereqs: ["Ramo no encontrado"] };
    }

    const missingPrereqs = [];
    let prereqList = course.prereqs;

    // Manejo especial para el requisito "all_previous"
    if (prereqList === "all_previous") {
        prereqList = getAllPreviousCourseIds();
    }

    for (const prereqId of prereqList) {
        if (!approvedCourses.has(prereqId)) {
            const missingCourse = findCourseById(prereqId);
            if (missingCourse) {
                missingPrereqs.push(missingCourse.name);
            } else {
                missingPrereqs.push(`Ramo desconocido (ID: ${prereqId})`);
            }
        }
    }

    return {
        isMet: missingPrereqs.length === 0,
        missingPrereqs: missingPrereqs
    };
}

/**
 * Alterna el estado de aprobación de un ramo.
 * @param {string} courseId - El ID del ramo a alternar.
 */
function toggleCourseStatus(courseId) {
    const courseElement = document.getElementById(courseId);
    if (!courseElement) return;

    // Si el ramo ya está aprobado, lo desmarca.
    if (approvedCourses.has(courseId)) {
        approvedCourses.delete(courseId);
        saveApprovedCourses();
        updateCourseVisuals();
        return;
    }

    // Verifica los requisitos antes de aprobar.
    const { isMet, missingPrereqs } = checkPrerequisites(courseId);

    if (isMet) {
        // Si los requisitos se cumplen, marca el ramo como aprobado.
        approvedCourses.add(courseId);
        saveApprovedCourses();
        updateCourseVisuals();
    } else {
        // Si los requisitos no se cumplen, muestra un mensaje de advertencia.
        let message = `Para aprobar "${findCourseById(courseId).name}", primero debes aprobar los siguientes ramos:\n\n`;
        message += missingPrereqs.map(name => `• ${name}`).join('\n');
        showMessage(message);
    }
}

/**
 * Actualiza visualmente todos los ramos en la malla.
 * Añade/quita las clases 'approved' y 'blocked' según el estado.
 */
function updateCourseVisuals() {
    for (const semesterName in semesters) {
        semesters[semesterName].forEach(course => {
            const courseElement = document.getElementById(course.id);
            if (courseElement) {
                // Elimina todas las clases de estado antes de aplicar las nuevas.
                courseElement.classList.remove('approved', 'blocked');

                if (approvedCourses.has(course.id)) {
                    courseElement.classList.add('approved');
                } else {
                    // Si no está aprobado, verifica si está bloqueado.
                    const { isMet } = checkPrerequisites(course.id);
                    if (!isMet) {
                        courseElement.classList.add('blocked');
                    }
                }
            }
        });
    }
}

/**
 * Muestra el modal de mensaje con el texto proporcionado.
 * @param {string} message - El mensaje a mostrar en el modal.
 */
function showMessage(message) {
    modalMessage.textContent = message;
    messageModal.style.display = 'flex'; // Muestra el modal
}

/**
 * Oculta el modal de mensaje.
 */
function hideMessage() {
    messageModal.style.display = 'none'; // Oculta el modal
}

/**
 * Inicializa la malla curricular:
 * 1. Carga los ramos aprobados.
 * 2. Renderiza la estructura de la malla en el DOM.
 * 3. Asigna event listeners a cada ramo.
 * 4. Actualiza la apariencia de los ramos.
 */
function initCurriculum() {
    loadApprovedCourses(); // Carga el estado guardado

    // Itera sobre cada semestre definido en el objeto 'semesters'.
    for (const semesterName in semesters) {
        // Crea un div para la columna del semestre.
        const semesterColumn = document.createElement('div');
        semesterColumn.classList.add('semester-column');

        // Crea un título para el semestre.
        const semesterTitle = document.createElement('h2');
        semesterTitle.textContent = semesterName;
        semesterColumn.appendChild(semesterTitle);

        // Crea una lista desordenada para los ramos.
        const courseList = document.createElement('ul');
        courseList.classList.add('course-list');

        // Itera sobre cada ramo dentro del semestre actual.
        semesters[semesterName].forEach(course => {
            // Crea un elemento de lista para cada ramo.
            const courseItem = document.createElement('li');
            courseItem.classList.add('course-item');
            courseItem.id = course.id; // Asigna el ID del ramo como ID del elemento HTML.
            courseItem.textContent = course.name;

            // Añade un event listener para manejar los clics en el ramo.
            courseItem.addEventListener('click', () => toggleCourseStatus(course.id));
            courseList.appendChild(courseItem);
        });

        semesterColumn.appendChild(courseList);
        curriculumGrid.appendChild(semesterColumn);
    }

    updateCourseVisuals(); // Aplica las clases CSS iniciales según el estado de aprobación/bloqueo.
}

// Event listeners para el modal de mensaje.
closeButton.addEventListener('click', hideMessage);
modalOkButton.addEventListener('click', hideMessage);
// Cierra el modal si se hace clic fuera de su contenido.
window.addEventListener('click', (event) => {
    if (event.target === messageModal) {
        hideMessage();
    }
});

// Llama a la función de inicialización cuando el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', initCurriculum);
