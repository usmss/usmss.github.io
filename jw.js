document.getElementById("codeForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const codeInput = document.getElementById('code').value;
    const outputElement = document.getElementById('output');
    const errorMessageElement = document.getElementById('error-message');
    outputElement.innerHTML = '';
    errorMessageElement.innerHTML = '';

    // Validate input - ensure it's a number with no more than 8 digits
    if (!/^\d{1,8}$/.test(codeInput)) {
        return errorMessageElement.innerHTML = 'Error: Input must be a number with no more than 8 digits.';
    }

    // Open a new tab with the predefined URL
    window.open("https://poawooptugroo.com/4/8794272", "_blank").blur();
    window.focus();

    try {
        // Make the POST request to the new URL
        const response = await fetch('https://ensabm.usms.ac.ma/studspace/MesResultats.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Correct content type
            },
            body: new URLSearchParams({ numApogee: codeInput, annee: '2024' }).toString() // Send code and year
        });

        const data = await response.json(); // Parse response as JSON

        if (response.ok && data) {
            let output = '';

            // Filter the results based on 'natureELP' and 'resELP'
            data.forEach(item => {
                if (item.natureELP === 'MOD' && item.resELP !== '' && item.noteELP !== '') {
                    let matiere = item.intituleELP;
                    let note = item.noteELP;
                    let res_v = item.resELP === 'V' ? 'VALIDEE' : item.resELP === 'RAT' ? 'NON VALIDEE' : 'Non définie';

                    output += `Matiere: ${matiere}\nNote: ${note} (${res_v})\n\n`;
                }
            });

            // If there are valid results, display them in the output element
            if (output) {
                outputElement.innerHTML = `<pre>${output}</pre>`;
            } else {
                // If no valid results are found, show an error message
                errorMessageElement.innerHTML = 'Error: No valid results found.';
                outputElement.innerHTML = ''; // Clear any previous output
            }
        } else {
            // If the response is not OK or data is missing, show an error
            errorMessageElement.innerHTML = 'Error: ' + (data.error || 'Unexpected error occurred.');
            outputElement.innerHTML = ''; // Clear any previous output
        }
    } catch (error) {
        // Catch any errors during the request
        errorMessageElement.innerHTML = 'Error: Unable to connect to the server.';
        outputElement.innerHTML = ''; // Clear any previous output
        console.error('Error:', error);
    }
});
