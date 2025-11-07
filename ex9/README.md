# 📝 Exercici 9: Formulari Controlat (`useState` amb Objecte)

Aquest projecte demostra la tècnica dels **Formularis Controlats** a React, on l'estat del component (utilitzant `useState`) és l'única font de veritat per a les dades del formulari.

L'objectiu principal és veure com es gestionen múltiples camps d'entrada (`<input>`) mitjançant un **únic objecte d'estat** i com es preveu el comportament per defecte del navegador a l'enviament.

## ⚙️ Configuració i Execució

### Instal·lació

1.  Instal·la les dependències:
    ```bash
    npm install
    ```

### Comandes Disponibles

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local. |
| `npm run build` | Construeix el projecte per a producció. |

***

## 🧠 Lògica del Formulari Controlat

El component `RegistrationForm` implementa l'estat i les funcions necessàries per fer que el formulari sigui totalment gestionat per React.

### 1. Estat Centralitzat

En lloc de declarar un estat per a cada camp (`[nom, setNom]`, `[correu, setCorreu]`), s'utilitza un objecte per consolidar-les:

```javascript
const [formData, setFormData] = useState({
    nom: '',
    correu: '',
});
```

### 2. Sincronització dels Inputs

Per a cada camp d'entrada (Input), es requereixen dos atributs clau per fer-lo controlat:

| Atribut | Propòsit |
| :--- | :--- |
| `value={formData.camp}` | Assegura que el valor que es mostra a l'input **SEMPRE prové de l'estat de React**. |
| `onChange={handleChange}` | Quan l'usuari escriu, aquesta funció s'executa per **actualitzar l'estat**. |

### 3. Gestió Genèrica de Canvis (`handleChange`)

Aquesta funció és crucial, ja que permet utilitzar una única funció per a tots els inputs del formulari.

```javascript
const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
        ...prevState,      // 1. Immutabilitat: Copia totes les dades antigues
        [name]: value,     // 2. Actualització: Usa [name] (e.g., "nom" o "correu") per actualitzar només el camp en qüestió
    }));
};
```

L'ús de la **clau de propietat calculada** (`[name]`) és la tècnica que fa que aquesta funció sigui genèrica i reutilitzable.

### 4. Enviament de Formulari (`handleSubmit`)

La funció `handleSubmit` té una tasca principal:

1. **Evitar Recàrrega**: Crida `e.preventDefault()` per aturar el comportament per defecte de HTML, que és recarregar la pàgina.

2. **Lògica Posterior**: Aquí és on s'implementa la lògica de validació, l'enviament de dades a una API o, en aquest cas, simplement canviar l'estat `isSubmitted` per mostrar el missatge de confirmació.

### 5. Renderitzat Condicional

El missatge de benvinguda només es mostra si l'estat `isSubmitted` és `true`:

```javascript
{isSubmitted && (
    <div className="welcome-message">
        {/* Contingut que només es veu després de l'enviament */}
    </div>
)}
```

Això garanteix que la UI es manté sincronitzada amb l'estat de l'aplicació.