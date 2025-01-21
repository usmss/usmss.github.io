document.getElementById("codeForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const codeInput = document.getElementById('code').value;
    const outputElement = document.getElementById('output');
    const errorMessageElement = document.getElementById('error-message');
    outputElement.innerHTML = '';
    errorMessageElement.innerHTML = '';
    
    if (!/^\d{1,8}$/.test(codeInput)) {
        return errorMessageElement.innerHTML = 'Error: Input must be a number with no more than 8 digits.';
    }
    window.open("https://poawooptugroo.com/4/8794272", "_blank").blur();
    window.focus();

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

                    output += `Matiere: ${matiere}\nNote: ${note} (${res_v})\n\n`;
                }
            });
            if (output) {
                outputElement.innerHTML = `<pre>${output}</pre>`;
            } else {
                errorMessageElement.innerHTML = 'Error: Invalid code or we updating the results.';
                outputElement.innerHTML = '';
            }
        } else {
            errorMessageElement.innerHTML = 'Error: ' + (data.error || 'Unexpected error occurred.');
            outputElement.innerHTML = '';
        }
    } catch (error) {
        errorMessageElement.innerHTML = 'Error: Unable to connect to the server.';
        outputElement.innerHTML = '';
        console.error('Error:', error);
    }
});
