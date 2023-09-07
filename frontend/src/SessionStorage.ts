export class SessionStorage {
    session(motociclista: Motociclista) {// Para armazenar um objeto no SessionStorage
        sessionStorage.setItem('motociclista', JSON.stringify(motociclista));
    }

    newSession(){
        sessionStorage.setItem('motociclista', null);
    }
}

// Para recuperar o objeto do SessionStorage
// const objetoArmazenado = JSON.parse(sessionStorage.getItem('motociclista'));
