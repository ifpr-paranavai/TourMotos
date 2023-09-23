export class SessionStorage {
    session(motociclista: Motociclista) {// Para armazenar um objeto no SessionStorage
        sessionStorage.setItem('motociclista', JSON.stringify(motociclista));
    }

    newSession(){
        sessionStorage.setItem('motociclista', null);
    }

    getSession(): Motociclista | null {
        const motociclistaJSON = sessionStorage.getItem('motociclista');

        if (motociclistaJSON) {
            const motociclista: Motociclista = JSON.parse(motociclistaJSON);
            return motociclista;
        } else {
            return null; // Retorna null se não houver nenhum objeto armazenado
        }
    }
}

// Para recuperar o objeto do SessionStorage
// const objetoArmazenado = JSON.parse(sessionStorage.getItem('motociclista'));
