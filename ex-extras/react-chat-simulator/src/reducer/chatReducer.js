let nextMessageId = 4;

export const initialMessages = [
    { id: 1, text: "Hola! Benvingut al xat de React.", user: 'System', timestamp: Date.now() - 60000 },
    { id: 2, text: "Aquest exercici combina useReducer i useRef.", user: 'System', timestamp: Date.now() - 30000 },
    { id: 3, text: "Què en penses? Escriu un missatge!", user: 'System', timestamp: Date.now() - 10000 },
];

export function chatReducer(messages, action) {
    switch (action.type) {
        
        case 'ADD_MESSAGE': {
            // Retorna un nou array amb el missatge afegit
            return [
                ...messages,
                {
                    id: nextMessageId++,
                    text: action.payload.text,
                    user: action.payload.user,
                    timestamp: Date.now(),
                },
            ];
        }
        
        // Podríem afegir 'DELETE_MESSAGE', però per ara simplifiquem.
        default: {
            throw Error('Acció desconeguda: ' + action.type);
        }
    }
}