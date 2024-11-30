import { generarId } from "./funciones.js";
export { editando , citaObj}

let editando = {
    value: false
};

// Objeto de Cita
const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
    telefono: ''
}
