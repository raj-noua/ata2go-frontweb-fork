//FRONT-END

let timerInterval;                                                                  // Holds the interval ID for clearing later
let timerProcessInterval;                                                           // Holds the interval ID for clearing later
let startTime;                                                                      // Records the start time
let startProcessTime;                                                               // Records the start time
const COST_AUDIO_TTSHD = 0.030;                     // OPENAI - Audio models - TTS HD	- $0.030/1K characters
const COST_AUDIO_WHISPER = 0.006;                   // OPENAI - Audio models - Whisper  - $0.006/minute
// const COST_COMPLETION_INPUT = 0.03;                 // OPENAI - GPT-4 - gpt-4 - $0.03/Input of 1K tokens
// const COST_COMPLETION_OUTPUT = 0.06;                // OPENAI - GPT-4 - gpt-4 - $0.06/Output of 1K tokens
const startTimerInterval = 4000;

// *****************************************************************************************************************************
// HELPER FUNCTIONS SECTION
// *****************************************************************************************************************************

// *****************************************************************************************************************************
function sleep(milliseconds) {                                                              // Helper function to Delay
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Just to delay in the POST calls to avoid Rate Limit *************************************************************************
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
    
// *****************************************************************************************************************************
function showNotification(message, targetElement) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'absolute';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.backgroundColor = 'blue';
    notification.style.color = 'white';
    notification.style.padding = '5px 10px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '100';                                                      // Ensure it's above other content
    targetElement.parentNode.appendChild(notification);                                     // Append the notification to the targetElement's container (assumed to be outputBoxContainer)
    setTimeout(() => {
        notification.remove();                                                              // Remove the notification after 2 seconds
    }, 1000);
}

// Returns 00m00s **************************************************************************************************************
function formatDuration(duration) {                                                 // Helper function to format the duration in mm:ss format
    var seconds = Math.floor(duration % 60);
    var minutes = Math.floor(duration / 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

// Returns yymmdd-hhmm *********************************************************************************************************
function getYYYYMMDDHHMM() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');              // getMonth() is zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const datePrefix = `${year}${month}${day}`;
    const timePrefix = `${hours}${minutes}`;
    return `${datePrefix}-${timePrefix}`;                                           // YYYYMMDD-HHMM
}

// Returns hhmmssii ************************************************************************************************************
function getHHMMssmm() {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
    const timePrefix = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return timePrefix;                                                              // HH:MM:ss.mmm
}

// *****************************************************************************************************************************
function capitalizeFirstWords(text, nbWords) {
    const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);   // Function to capitalize the first letter of a word
    const firstWordsCapitalized = text
        .split(/\s+/)                                                                       // Split the input text into words based on one or more spaces
        .slice(0, nbWords)                                                                  // Take the first three words
        .map(capitalizeFirstLetter)                                                         // Capitalize the first letter of each of the first three words
        .join('');                                                                          // Join the capitalized words without spaces
    return firstWordsCapitalized;
}

// Display a 'Status:' message *************************************************************************************************
function startTimer() {
    const statusDisplay = document.getElementById('status');
    startTime = new Date();                                                                 // Record start time
    let initialStatusText = statusDisplay.textContent;                                      // Save the initial status text
    console.log(`TIMER initialStatusText=${initialStatusText}`);
    timerInterval = setInterval(() => {
        const now = new Date();
        const elapsedTime = new Date(now - startTime);
        const minutes = elapsedTime.getUTCMinutes();
        const seconds = elapsedTime.getUTCSeconds();
        let timeString = '';

        if (minutes > 0) {                                                                  // If more than a minute has elapsed, display both minutes and seconds
            timeString = `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
        } else {                                                                            // If less than a minute has elapsed, display only seconds
            timeString = `${seconds.toString().padStart(2, '0')}s`;
        }
        console.log(`TIMER Updating=${initialStatusText} -> ${timeString}`);
        statusDisplay.textContent = `${initialStatusText} -> ${timeString}`;                // Update the status text with the timer value
    }, startTimerInterval);                                                                               // Update the timer every second for better readability
}

// Change the 'Status:' message ************************************************************************************************
function stopTimer(finalStatus) {
    const statusDisplay = document.getElementById('status');
    statusDisplay.textContent = `${finalStatus}`;                                           // Update the status with final message
    clearInterval(timerInterval);                                                           // Stop the timer
}


// Display a 'Status:' message *************************************************************************************************
function startProcessTimer() {
    const statusDisplay = document.getElementById('infoProcessStatus');
    startProcessTime = new Date();                                                                 // Record start time
    let initialStatusText = statusDisplay.textContent;                                      // Save the initial status text
    timerProcessInterval = setInterval(() => {
        if (!statusDisplay.textContent.includes('->')) {
            initialStatusText = statusDisplay.textContent;
        }
        const now = new Date();
        const elapsedTime = new Date(now - startProcessTime);
        const minutes = elapsedTime.getUTCMinutes();
        const seconds = elapsedTime.getUTCSeconds();
        let timeString = '';

        if (minutes > 0) {                                                                  // If more than a minute has elapsed, display both minutes and seconds
            timeString = `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
        } else {                                                                            // If less than a minute has elapsed, display only seconds
            timeString = `${seconds.toString().padStart(2, '0')}s`;
        }
        statusDisplay.textContent = `${initialStatusText} -> ${timeString}`;                // Update the status text with the timer value
    }, 1000);                                                                               // Update the timer every second for better readability
}

// Change the 'Status:' message ************************************************************************************************
function stopProcessTimer(finalStatus) {
    const statusDisplay = document.getElementById('infoProcessStatus');                     // Process Status:  In Audio Tramscription
    statusDisplay.textContent = `${finalStatus}`;                                           // Update the status with final message
    clearInterval(timerProcessInterval);                                                           // Stop the timer
}

// Function to update character and word count
function updateCost(clearCost = false) {                                 // audioDuration is optional and defaults to 0
    console.log(`UTIL - Updating Prompt Token & Cost, Completion Token & Cost`);
    if (clearCost) {
        const PromptTokenDisplay = document.getElementById('infoPromptToken');
        PromptTokenDisplay.textContent = '';

        const PromptCostDisplay = document.getElementById('infoPromptCost');
        PromptCostDisplay.textContent = '';
        
        const CompletionTokenDisplay = document.getElementById('infoCompletionToken');
        CompletionTokenDisplay.textContent = '';
        
        const CompletionCostDisplay = document.getElementById('infoCompletionCost');
        CompletionCostDisplay.textContent = '';
    }
}

// Function to update character and word count
function updateWordCount(text, audioDuration = 0) {                                 // audioDuration is optional and defaults to 0
    console.log(`UTIL - Updating Characters, Words, Speak Cost, Est. Cost`);
    const characterCount = text.trim().length;                                      // Total number of characters, including spaces    
    
                                                                                    // Characters: In Audio Transcription
    const infoCharacterCountDisplay = document.getElementById('infoCharacters');    // Retrieve the DOM element with the ID 'infoCharacters' to display character count information.
    const formattedCharacterCount = new Intl.NumberFormat().format(characterCount); // Format the character count using the default locale to make it more readable (e.g., adding commas in large numbers).
    infoCharacterCountDisplay.innerText = `${formattedCharacterCount}`;             // Set the innerText of the retrieved DOM element to the formatted character count, displaying it on the web page.

                                                                                    //      Words: In Audio Transcription
    const infoWordCountDisplay = document.getElementById('infoWords');              // Retrieve the DOM element with the ID 'infoWords' to display word count information.
    const words = text.trim().split(/\s+/);                                         // Split the trimmed text by one or more whitespace characters to get words.
    const wordCount = words.filter(Boolean).length;                                 // Ensure empty strings are not counted by filtering out falsy values, then count the remaining words.
    const formattedWordCount = new Intl.NumberFormat().format(wordCount);           // Format the word count using the default locale for better readability.
    infoWordCountDisplay.innerText = `${formattedWordCount}`;                       // Set the innerText of the retrieved DOM element to the formatted word count.

                                                                                    //  Speak Cost: In Audio Transcription
    const speakCostDisplay = document.getElementById('infoSpeakCost');              // Retrieve the DOM element with the ID 'infoSpeakCost' to display speaking cost.
    const speakCost = (COST_AUDIO_TTSHD * characterCount / 1000).toFixed(3);        // Calculate the speaking cost, formats to 3 decimal places.
    speakCostDisplay.innerText = `$${speakCost}`;                                   // Display the calculated speaking cost, prefixed with a dollar sign, in the retrieved DOM element.

                                                                                    //  Est. Cost:  In Audio File information 
    const tCribCostDisplay = document.getElementById('infoTCribeCost');             // Retrieve the DOM element with the ID 'infoTCribeCost' to display the cost related to 'tCrib'.
    const tCribCost = COST_AUDIO_WHISPER * audioDuration;                           // Calculate transcription cost based on duration
    const formattedTCribCost = `$${tCribCost.toFixed(3)}`;                          // Format the cost to 2 decimal places and add dollar sign
    tCribCostDisplay.textContent = formattedTCribCost;                              // Updated transcription cost
}

// Modify the State of the Transcribe and Translate Buttons ********************************************************************
function swapStateTranscribeTranslateButtons() {
    const transcribeButton = document.getElementById('transcribeButton');
    const translateButton = document.getElementById('translateButton');
    transcribeButton.disabled = !transcribeButton.disabled;
    translateButton.disabled = !translateButton.disabled;
    transcribeButton.style.backgroundColor = !transcribeButton.disabled ? "#4CAF50" : "#ccc";       // Original color or grey
    translateButton.style.backgroundColor = !translateButton.disabled ? "#4CAF50" : "#ccc";         // Original color or grey
}

// Take a string an split it into 'chunkSize' number of Characters, but ensure that we DO NOT cut mid sentence *****************
function splitWordText(text, chunkSize) {
    const chunks = [];
    let index = 0;
    console.log(`WEButils-SplitWordRequest -TextLength=${text.length} -chunk Max Size=${chunkSize}`);

   while (index + 1 < text.length) {
        let chunk = text.slice(index, index + chunkSize);
        const lastPeriodIndex = chunk.lastIndexOf('.');                             // Find the last period within the chunk
        
        let words = chunk.split(/\s+/);                                             // Split the text into an array of words
        let first7Words = words.slice(0, 4).join(' ');                              // Select the first 7 words and join them together
        let last7Words = words.slice(-3).join(' ');                                 // Select the last 7 words and join them together
        let truncatedText = `${first7Words} ... ${last7Words}`;                     // Combine the first 7 words, ellipsis, and last 7 words
    
        
        if (lastPeriodIndex !== -1 && lastPeriodIndex !== chunk.length - 1 &&  text.length > chunk.length) { // If a period is found and it's not at the end of the chunk, adjust the chunk size to end at the period
            chunk = chunk.slice(0, lastPeriodIndex + 1);
        }
        if (chunk.length > 1) {
            chunks.push(chunk);

            words = chunk.split(/\s+/);                                             // Split the text into an array of words
            const wordCount = words.filter(Boolean).length;                                         // Ensure empty strings are not counted
            first7Words = words.slice(0, 7).join(' ');                              // Select the first 7 words and join them together
            last7Words = words.slice(-7).join(' ');                                 // Select the last 7 words and join them together
            let truncatedChunk = `${first7Words} ... ${last7Words}`;                // Combine the first 7 words, ellipsis, and last 7 words
            console.log(`WEButils-Split-[${getHHMMssmm()}] -CHUNKS #${chunks.length} -NbWords:${wordCount} -Idx=${index} -PeriodIdx= ${lastPeriodIndex} -Exerpt[${first7Words}]`);

        }
        index += chunk.length;
       }
    return chunks;
}


export {
    sleep,
    showNotification,
    formatDuration,
    getYYYYMMDDHHMM,
    getHHMMssmm,
    capitalizeFirstWords,
    startTimer,
    stopTimer,
    startProcessTimer,
    stopProcessTimer,
    updateCost,
    updateWordCount,
    swapStateTranscribeTranslateButtons,
    splitWordText,
    delay
  };
  
  