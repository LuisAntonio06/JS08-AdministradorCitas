import Notificacion from './classes/Notificacion.js';
import AdminCitas from './classes/adminCitas.js';
import {citaObj, editando} from './variables.js';
import { formulario,formularioInput, pacienteInput,propietarioInput,emailInput,fechaInput,sintomasInput,telefonoInput} from './selectores.js';


const citas = new AdminCitas();

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value
}

export function submitCita(e) {
    e.preventDefault();


    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion( {
            texto: 'Todos los campos son obligatorios',
            tipo: 'error',
        })
        return;
    }

    if (citaObj.telefono.toString().length !== 10) {
        new Notificacion({
            texto: 'El número de teléfono requiere 10 caracteres',
            tipo: 'error',
        });
        return;
    }


    if (editando.value) {
        citas.editar({...citaObj});
        new Notificacion( {
            texto: 'Guardado Correctamente',
            tipo: 'exito',
        })
    } else {
        citas.agregar({...citaObj})
        new Notificacion( {
            texto: 'Paciente Registrado',
            tipo: 'exito',
        })
    }

    formulario.reset();
    reiniciarObjetoCita();
    formularioInput.value = 'Registrar Paciente'
    editando.value= false;
}

export function reiniciarObjetoCita() {
    // Reiniciar el objeto
    /* citaObj.paciente = '';
    citaObj.propietario = '';
    citaObj.email = '';
    citaObj.fecha = '';
    citaObj.sintomas = ''; */

    Object.assign(citaObj , {
        id: generarId(),
        paciente : '',
        propietario : '',
        email : '',
        fecha : '',
        sintomas : '',
        telefono : ''
    });
}

export function generarId( ) {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function cargarEdicion(cita) {
    Object.assign(citaObj, cita)

    pacienteInput.value = cita.paciente
    propietarioInput.value = cita.propietario
    emailInput.value = cita.email
    fechaInput.value = cita.fecha
    sintomasInput.value = cita.sintomas
    telefonoInput.value = cita.telefono

    editando.value = true;

    formularioInput.value = 'Guardar Cambios'
}