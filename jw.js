document.getElementById("codeForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const codeInput = document.getElementById('code').value;
    const outputElement = document.getElementById('output');
    const errorMessageElement = document.getElementById('error-message');
    outputElement.innerHTML = '';
    errorMessageElement.innerHTML = '';
    
    if (!/^\d{1,8}$/.test(codeInput)) {
        return errorMessageElement.innerHTML = 'Erreur : L\'entrée doit être un nombre de maximum 8 chiffres.';
    }

    // Removed the external link to ensure a better user experience
    // If needed, you can display a helpful message instead
    // window.open("https://poawooptugroo.com/4/8794272", "_blank").blur();
    // window.focus();

    try {
        const response = await fetch('https://ensabm.usms.ac.ma/studspace/MesResultats.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ numApogee: codeInput, annee: '2024' }).toString()
        });

        const data = await response.json();

        if (response.ok && data) {
            let output = '';
            data.forEach(item => {
                if (item.natureELP === 'MOD' && item.resELP !== '' && item.noteELP !== '') {
                    let matiere = item.intituleELP;
                    let note = item.noteELP;
                    let res_v = item.resELP === 'V' ? 'VALIDEE' : item.resELP === 'RAT' ? 'NON VALIDEE' : 'Non définie';

                    output += `Matière : ${matiere}\nNote : ${note} (${res_v})\n\n`;
                }
            });
            if (output) {
                let trimmedOutput = output.trim()
                let formattedOutput = trimmedOutput.replace(/\n/g, '<br/>');
                outputElement.innerHTML = `<p>${formattedOutput}</p>`;
            } else {
                errorMessageElement.innerHTML = 'Erreur : Code invalide ou résultats en cours de mise à jour.';
                outputElement.innerHTML = '';
            }
        } else {
            errorMessageElement.innerHTML = 'Erreur : ' + (data.error || 'Erreur inattendue.');
            outputElement.innerHTML = '';
        }
    } catch (error) {
        errorMessageElement.innerHTML = 'Erreur : Impossible de se connecter au serveur.';
        outputElement.innerHTML = '';
        console.error('Erreur:', error);
    }
});
