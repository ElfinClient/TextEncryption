// Select the button elements
const copyButton = document.getElementById('copyButton');
const encodedMessage = document.getElementById('encodedMessage');

// Add click event listener to the copy button
copyButton.addEventListener('click', function() {
    // Create a temporary textarea element to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = encodedMessage.textContent;
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    document.execCommand('copy');
    
    // Remove the temporary textarea
    document.body.removeChild(textarea);
    
    // Provide visual feedback or alert the user
    alert('Text copied to clipboard!');
});

  const alphabetLowercase = 'abcdefghijklmnopqrstuvwxyz ';
  let newText = '';

  function encrypt (text, amtMoved) {
    lettersIndex = [];
    newLetters = [];
    let betterText = text.toLowerCase()
    for (let i = 0; i < betterText.length; i++) {
        for (let j = 0; j < alphabetLowercase.length; j++) {
            if(betterText[i] === alphabetLowercase[j]) {
                lettersIndex.push(j);
            }
        }
    }
    for (let x = 0; x < lettersIndex.length; x++) {
        lettersIndex[x] += amtMoved;
        if (lettersIndex[x] >= 27) {
            lettersIndex[x] -= 27;
        }
        newLetters.push(alphabetLowercase[lettersIndex[x]]);
    }
    // the letters are now numbers here (and are shifted)
    return newLetters.join('')
    }

    function decrypt (text, amtMoved) {
        let decryptIndex = [];
        let newDecrypted = [];

        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < alphabetLowercase.length; j++) {
                if(text[i] === alphabetLowercase[j]) {
                    decryptIndex.push(j);
                }
            }
        }

        for (let x = 0; x < decryptIndex.length; x++) {
            decryptIndex[x] -= amtMoved;
            decryptIndex[x] = (decryptIndex[x] + alphabetLowercase.length) % alphabetLowercase.length; // Use modulo operation to handle negative values
            newDecrypted.push(alphabetLowercase[decryptIndex[x]]);
        }
        // the letters are now numbers here (and are shifted)
        return newDecrypted.join('')
    }



  document.getElementById('cipherForm').addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const userInput = formData.get('userInput');
    const shift = (parseInt(formData.get('shift')))
    const mode = document.getElementById('modeSelect').value; // Adjust as needed based on your form setup

    // Perform action based on mode (encrypt or decrypt)
    console.log('working')
    if(mode === 'encrypt') {
        newText = encrypt(userInput, shift)
    } else if ( mode === 'decrypt') {
        newText = decrypt(userInput, shift)
    } else {
        console.log('error')
    }
    
    document.getElementById('encodedMessage').innerHTML = newText;
});