document.getElementById("codeForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const codeInput = document.getElementById('code').value;
    const outputElement = document.getElementById('output');
    const errorMessageElement = document.getElementById('error-message');
    outputElement.innerHTML = '';
    errorMessageElement.innerHTML = '';

    if (!/^\d{1,8}$/.test(codeInput)) return errorMessageElement.innerHTML = 'Error: Input must be a number with no more than 8 digits.';

    window.open("https://poawooptugroo.com/4/8794272", "_blank").blur();
    window.focus();

    try {
        const response = await fetch('http://usms.fwh.is/exec.php?ap=${codeInput}', {
            method: 'GET',
        });
        const data = await response.json();
        response.ok && data.output ? outputElement.innerHTML = data.output : errorMessageElement.innerHTML = 'Error: ' + (data.error || 'Unexpected error occurred.');
    } catch {
        errorMessageElement.innerHTML = 'Error: Unable to connect to the server.';
    }
});
