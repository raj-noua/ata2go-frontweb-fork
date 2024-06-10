// FRONT-END - OPENAI API CALLS  Version 0.1

import {
    showNotification,
    getYYYYMMDDHHMM,
    getHHMMssmm,
    capitalizeFirstWords,
    startTimer,
    stopTimer,
    startProcessTimer,
    stopProcessTimer,
  //  updateCost,
    updateWordCount,
    swapStateTranscribeTranslateButtons,
    splitWordText,
    delay
  } from './utilities.js';

  const OPENAI_SPEECH_MAX_CHAR = 4096;                                              // Maximum number of characters for converting to Audio
  // const OPENAI_MAX_NB_TOKEN = 4097;                                                 // Maximum number of TOKEN for requests
  const OPENAI_SET_REQ_NB_CHUNK = 2;                                               // A2G:  Number of Post that will be sent at once.
  const RATE_LIMIT_PER_MINUTE = 3;
  const MINUTE_IN_MS = 62000; // 60,000 milliseconds in a minute
  const A2G_SPEECH_filePrefix = 'Audio';                                            // Prefix for the SPEECH Audio file name.  ex: Audio-MySpeech.mpw
  const A2G_PARSE_filePrefix = 'Parse'; 
  const COST_COMPLETION_INPUT = 0.03;                 // OPENAI - GPT-4 - gpt-4 - $0.03/Input of 1K tokens
  // const COST_COMPLETION_OUTPUT = 0.06;                // OPENAI - GPT-4 - gpt-4 - $0.06/Output of 1K tokens
  // const FormData   = require('form-data');



  // *****************************************************************************************************************************
// BUTTON -OPENAI-: (Transcribe) - API - /openai-transcribe
async function handleTranscribeClick(event) {
    event.preventDefault();      
    const fileInputElement = document.getElementById('audioFile');                                                   // Prevent the default form submission
    if(document.getElementById('audioFile').files.length === 0) {                   // Check if a file has been selected
        alert('Please select a Transcription file first.');
        return;                                                                     // Exit the function if no file is selected
    }
    document.getElementById('outputBox').value = '';                                // Clear the outputBox
    swapStateTranscribeTranslateButtons();                                          // De-Activate Buttons
    document.getElementById('status').textContent = 'Transcripting Audio';          // Display theInitial status text
    const selectedLanguage = document.getElementById('SelectLanguage').value;             // Get the selected voice
    startTimer();                                                                   // Start the timer with the initial status text
    document.getElementById('spinner').style.display = 'block';                     // Show spinner
    const file = fileInputElement.files[0]; // Get the first file from the file input
        const formData = new FormData();
        formData.append('audioFile', file, file.name); // Appending the file
    formData.append('selectedLanguage', selectedLanguage);

    // Custom replacer function to safely stringify response objects
    function replacer(key, value) {
        if (key === 'config' || key === 'request') {
        return '[Complex object]';
        }
        return value;
    }


    // Iterate over formData entries
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    //console.log('selectedLanguage TIME:',selectedLanguage);   

    // console.log(`WEB-TCribe- Language: ${selectedLanguage}`);
    try {
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`WEB-TCribe- formData - [${key}]: \nFileName = ${value.name}, \nFileType = ${value.type}, \nFileSize = ${value.size.toLocaleString()} bytes`);
            } else {
                console.log(`WEB-TCribe- formData - ${key}: ${value}`);
            }
        }

        const response = await fetch('/api/openai-transcribe', {                        // Call the API Route: /transcribe
            method: 'POST',                                                         // Call Method: POST
            body: formData,                                                         // Call Data: Model & File
        });
        document.getElementById('spinner').style.display = 'none';                  // Hide spinner on success
        console.log(`WEB-TCribe - Response: ${JSON.stringify(response, replacer, 2)}`);
        console.log(`WEB-TCribe - Status: ${response.status}`);
        if (typeof response.data === 'object' && response.data !== null) {
            Object.entries(response.data).forEach(([key, value]) => {
              console.log(`CHECK ${key}: ${value}`);
            });
        }
        if (Array.isArray(response.data)) {
        response.data.forEach((item, index) => {
            console.log(`CHECK Item ${index}: ${JSON.stringify(item)}`);
        });
        }

        if (Array.isArray(response.data)) {
            for (let [index, value] of response.data.entries()) {
              console.log(`CHECK Index ${index}: ${JSON.stringify(value)}`);
            }
          }
          
        if (!response.ok) {
            const errorContent = await response.json();                             // Assuming server always responds with JSON on error
            console.log(`WEB-TCribe - RESPONSE NOT OK <--- Status - errorContent: ${errorContent}`);
            throw new Error(`WEB - Server error: ${errorContent.error}`);
        }

        const contentType = response.headers.get("content-type");
        console.log(`WEB-TCribe - contentType: ${contentType}`);
        console.log(`WEB-TCribe - Response headers: ${JSON.stringify(Object.fromEntries(response.headers))}`);

        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("WEB - Not a JSON response from /openai-transcribe");
        }
        const data = await response.json();          //waits for the HTTP response to be fully received, parses it as JSON, and assigns the resulting JavaScript object or array to the variable data.                                
        let firstWordsCapitalized = capitalizeFirstWords(data.transcription, 10);
        console.log(`WEB-TCribe - FULL Data: ${JSON.stringify(data, null, 2)}`);
        console.log(`WEB-TCribe - Data outputFile: ${data.outputFile}`);
        console.log(`WEB-TCribe - Data Transcription: ${firstWordsCapitalized}`);
        
        
        const wordCount = data.transcription.trim().split(/\s+/).length;            // Count the number of words in the transcription
        document.getElementById('outputBox').value = data.transcription;
        updateWordCount(data.transcription);                                        // Call a function to update word count


        const fileName = `Transcription-${data.outputFile}`;
        if (data.outputFile) {                                                      // Convert fileContent to a Blob, create a URL for it, and set up the download link
            const fileBlob = new Blob([data.transcription], { type: 'text/plain' }); // Set the MIME type
            const blobUrl = window.URL.createObjectURL(fileBlob);                   // create a URL

            const linkContainer = document.createElement('div');                    // Create a div to hold the download link, styled to appear at the bottom left of the outputBox
            linkContainer.style.textAlign = 'left';
            linkContainer.style.marginTop = '10px';                                 // Adjust as needed to ensure it appears below the outputBox

            const downloadLink = document.createElement('a');                       // set up the download link
            downloadLink.href = blobUrl;
            downloadLink.innerText = `Transcription-${data.outputFile}`;
            downloadLink.download = fileName;                                       // Suggest a filename for the download
            downloadLink.setAttribute('aria-label', `Download transcription file named ${data.outputFile}`); // Set aria-label for accessibility
            downloadLink.click();  
            linkContainer.appendChild(downloadLink);
            
            const outputBoxContainer = document.querySelector('.output-container'); // Find the parent container of the outputBox to append the linkContainer correctly
            // outputBoxContainer.appendChild(linkContainer);                          // This ensures the link appears within the same container as the outputBox, ideally at the bottom
        }
        stopTimer(`Transcription completed.`);                                      // Stop the timer and update the status
    } catch (error) {
        console.error('Error:', error.message);
        document.getElementById('outputBox').value = 'Error: ' + error.message;    
        stopTimer('Error: ' + error.message);                                       // Stop the timer and show error
    } finally {
        document.getElementById('spinner').style.display = 'none';                  // Hide spinner 
        swapStateTranscribeTranslateButtons();                                      // Re-Activate Buttons
    }
}





// *****************************************************************************************************************************
// BUTTON -OPENAI-: (Speech) - API - /openai-speech
async function handleSpeakClick(event) {
    const MTag = 'WEBapi-C-[Speak] - ';                                             
    console.log(`${MTag}REQUEST`);  
    
    const outputBoxContainer = document.getElementById('outputBox');                // console.log(`WEB - Speech - Objectivize Container`);
    const inputText = outputBoxContainer.value.trim();                              // console.log(`WEB - Speech - Var Input`);
    if(inputText.trim().length === 0) {                                             // alert('The output box is empty.');
        showNotification('Nothing to convert to speech.', outputBoxContainer);      // Pass the container as the target
        spinner.style.display = 'none';                                             // Hide spinner as there's nothing to process
        return;
    } 

    const chunks = splitWordText(inputText, OPENAI_SPEECH_MAX_CHAR);                // If inputText is more than OPENAI_SPEECH_MAX_CHAR characters, split it into chunks that do not cut in mid-sentence

    console.log(`${MTag}Processing in ${chunks.length} part(s).`);
    
    const ProcessStatusDisplay = document.getElementById('infoProcessStatus'); 
    ProcessStatusDisplay.textContent = `Processing in ${chunks.length} part(s).`;
    const spinner = document.getElementById('spinner');                             // Get the spinner element
    spinner.style.display = 'block';                                                // Show the spinner

// *****************************************************************************************************************************
    // Function to process a - SPEECH - batch of chunks
    async function processBatch(batch, batchStartIndex) {
        const selectedVoice = document.getElementById('SelectVoice').value;         // Get the selected voice
        const promises = batch.map((chunk, indexWithinBatch) => {
            const absoluteIndex = batchStartIndex + indexWithinBatch;
            console.log(`${MTag}[${getHHMMssmm()}] - REQ.Idx: ${absoluteIndex + 1}`);
            ProcessStatusDisplay.textContent = `Processing - REQ.Idx: ${absoluteIndex + 1}`;
            
            startProcessTimer();                 
            return fetch('/api/openai-speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'inputText': chunk,
                    'selectedVoice': selectedVoice
                }),
                responseType: 'arraybuffer'
            })
            .then(response => {
                ProcessStatusDisplay.textContent = `Processing - RES.Idx: ${absoluteIndex + 1}`;
                if (!response.ok) {
                    return response.clone().text().then(body => {                   // Attempt to read and return the response body as a new Promise that rejects with detailed error info
                        let errorMessage = `Fetch openai-speech Not OK: ${response.status} ${response.statusText}`;
                        try {
                            const errorDetails = JSON.parse(body);                  // If the response is JSON and has more details, attempt to parse it and add to the error message
                            if (errorDetails.message) {
                                errorMessage += ` - Details: ${errorDetails.message}`;
                            }
                        } catch (e) {
                            errorMessage += ` - Failed parsing error details or no additional info provided.`; // If parsing failed, or no additional details, use the generic error message
                        }
                        throw new Error(errorMessage);
                    });
                }
                console.log(`${MTag}[${getHHMMssmm()}] -Batch RES.Idx: ${absoluteIndex + 1}`);
                
                return response.blob();
            })
            .then(blob => {
                const filePrefix = A2G_SPEECH_filePrefix;                           // Prefix for the file name.    //console.log(`${MTag}filePrefix set: ${filePrefix}`);
                const BottomBoxContainer = document.querySelector('.bottom-container'); // Find the parent container of the outputBox to append the linkContainer correctly
                const url = window.URL.createObjectURL(blob);
                const audio = new Audio(url);                                       // Create a URL for the blob object and set it as the source for an audio element
                if ( absoluteIndex === 0) {                                         // Check if this if the first file or only file
                    audio.play();                                                   // Play the audio
                }
                // console.log(`${MTag}${getHHMMssmm()} - BLOB Index: ${absoluteIndex + 1}`);
                let firstWordsCapitalized = capitalizeFirstWords(chunks[absoluteIndex], 4); // Capitalize the first Nb or Words from the text   // console.log(`${MTag}First 3 - ${absoluteIndex + 1} - [${firstWordsCapitalized} ]`); 
                let dateTimePrefix = getYYYYMMDDHHMM();
                let fileName;
                ProcessStatusDisplay.textContent = `Providing Audio`;
                if ( chunks.length === 1) {
                    fileName = `${filePrefix}-${selectedVoice}-${firstWordsCapitalized}-${dateTimePrefix}.mp3`;  // Construct the filename with the timestamp prefix
                } else {
                    fileName = `${filePrefix}-${selectedVoice}-${absoluteIndex+1}-${chunks.length}-${firstWordsCapitalized}-${dateTimePrefix}.mp3`;  // Construct the filename with the timestamp prefix
                }
    
                let downloadLink = document.createElement('a');                     // Create a temporary link to trigger the download
                downloadLink.href = url;                                            // Set the href to the blob URL
                downloadLink.download = fileName;                                   // Set the default filename for the download
                document.body.appendChild(downloadLink);                            // Append the link to the body (it does not have to be visible)
                downloadLink.click();                                               // Programmatically click the link to trigger the download
                // document.body.removeChild(downloadLink);                         // Optionally, remove the link after triggering the download
                // window.URL.revokeObjectURL(url);                                 // Cleanup the blob URL after the download

                const blobUrlDisplay = document.createElement('div');               // Display the blob URL link at the bottom left of the OutputBox
                blobUrlDisplay.style.textAlign = 'left';                
                blobUrlDisplay.innerHTML = `<a href="${url}" target="_blank" aria-label="Download or play speech audio file ${fileName}">${fileName}</a>`;  // Creates a clickable link          
                BottomBoxContainer.appendChild(blobUrlDisplay);                     // Assumes '.output-container' is the parent container of 'outputBox'
                spinner.style.display = 'none';                                     // Hide spinner after processing
            })
            .catch(error => {
                console.error('Error:', error);
            })
        });
        await Promise.all(promises);
    }


    // Function to process all - SPEECH - chunks in batches and dynamically enforce rate limiting
    async function processChunksInBatches() {
        for (let i = 0; i < chunks.length; i += OPENAI_SET_REQ_NB_CHUNK) {          // console.log(`WEB - Processing Chunk batch[${(i + 1)} / ${chunks.length} ]`);    
            const startTime = Date.now();                                           // Record the start time of the batch processing
            const batch = chunks.slice(i, i + OPENAI_SET_REQ_NB_CHUNK);                     
            console.log(`${MTag}CHUNKS-[${getHHMMssmm()}] - Requesting Batch #${i}`);
            ProcessStatusDisplay.textContent = `Processing - Requesting Batch #${i}`;
            await processBatch(batch, i);
            if (i + OPENAI_SET_REQ_NB_CHUNK < chunks.length) {                      // Check if there are more batches to process
                const elapsedTime = Date.now() - startTime;
                const delayTime = (MINUTE_IN_MS / RATE_LIMIT_PER_MINUTE) * OPENAI_SET_REQ_NB_CHUNK - elapsedTime;
                if (delayTime > 0) {
                    console.log(`${MTag}CHUNKS-[${getHHMMssmm()}] - Delaying ${delayTime}ms for rate limit compliance.`);
                    ProcessStatusDisplay.textContent = `Delaying ${delayTime}ms for rate limit.`;
                    await delay(delayTime);
                }
            }
        }
        ProcessStatusDisplay.textContent = `Processing completed`;
        spinner.style.display = 'none';                                              // Hide spinner once all batches are processed
    }

    // Call the function to process - SPEECH - chunks
    processChunksInBatches().catch(error => {
        console.error('Error processing chunks:', error);
        ProcessStatusDisplay.textContent = `Processing error: ${error}`;
        spinner.style.display = 'none';
    });

    console.log(`${MTag}EXIT`);
} // BUTTON: (Speech)






// *****************************************************************************************************************************
// BUTTON -OPENAI-: (Translate) - API - /openai-translate
async function handleTranslateClick(event) {            
    event.preventDefault();                                                         // Prevent the default form submission
    if(document.getElementById('audioFile').files.length === 0) {                   // Check if a file has been selected
        alert('Please select a Translation file first.');
        return;                                                                     // Exit the function if no file is selected
    }
    document.getElementById('outputBox').value = '';                                // Clear the outputBox                                         
    swapStateTranscribeTranslateButtons();                                          // De-Activate Buttons
    document.getElementById('status').textContent = 'Translating Audio';            // Display theInitial status text
    startTimer();                                                                   // Start the timer with the initial status text
    document.getElementById('spinner').style.display = 'block';                     // Show spinner
    const formData = new FormData(document.getElementById('fileForm'));
    try {
        const response = await fetch('/api/openai-translate', {                     // Call the API Route: /translate
            method: 'POST',                                                         // Call Method: POST
            body: formData,                                                         // Call Data: Model & File
        });
        document.getElementById('spinner').style.display = 'none';                  // Hide spinner on success
        if (!response.ok) {
            const errorContent = await response.json();                             // Assuming server always responds with JSON on error
            throw new Error(`WEB -Server error: ${errorContent.error}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("WEB -Not a JSON response from /openai-translate");
        }
        const data = await response.json();
        const wordCount = data.translation.trim().split(/\s+/).length;              // Count the number of words in the transcription
        document.getElementById('outputBox').value = data.translation;
        updateWordCount(data.translation);                                          // Call a function to update word count
        stopTimer(`Translation Completed; Word Count: ${wordCount}`);               // Stop the timer and update the status

        const fileName = `Translation-${data.outputFile}`;
        if (data.outputFile) {                                                      // Convert fileContent to a Blob, create a URL for it, and set up the download link
            const fileBlob = new Blob([data.translation], { type: 'text/plain' }); // Set the MIME type
            const blobUrl = window.URL.createObjectURL(fileBlob);                   // create a URL

            const linkContainer = document.createElement('div');                    // Create a div to hold the download link, styled to appear at the bottom left of the outputBox
            linkContainer.style.textAlign = 'left';
            linkContainer.style.marginTop = '10px';                                 // Adjust as needed to ensure it appears below the outputBox

            const downloadLink = document.createElement('a');                       // set up the download link
            downloadLink.href = blobUrl;
            downloadLink.innerText = `Translation-${data.outputFile}`;
            downloadLink.download = fileName;                                       // Suggest a filename for the download
            downloadLink.setAttribute('aria-label', `Download Translation file named ${data.outputFile}`); // Set aria-label for accessibility
            downloadLink.click();  
            linkContainer.appendChild(downloadLink);
            
            const outputBoxContainer = document.querySelector('.output-container'); // Find the parent container of the outputBox to append the linkContainer correctly
            // outputBoxContainer.appendChild(linkContainer);                          // This ensures the link appears within the same container as the outputBox, ideally at the bottom
        }

    } catch (error) {
        console.error('Error:', error.message);
        document.getElementById('outputBox').value = 'Error: ' + error.message;    
        document.getElementById('spinner').style.display = 'none';                  // Hide spinner on error
        stopTimer('Error: ' + error.message);                                       // Stop the timer and show error
    } finally {
        swapStateTranscribeTranslateButtons();                                      // Re-Activate Buttons
    }
}




// *****************************************************************************************************************************
// BUTTON -OPENAI-: (Parse) - API - /openai-chat
async function handleParseClick(event) {            
    const MTag = 'WEBapi-C-[PARSE]- ';                                             
    console.log(`${MTag}REQUEST`);  
    
    const outputBoxContainer = document.getElementById('outputBox');
    const outputText = outputBoxContainer.value.trim();
    if(outputText.trim().length === 0) {                                            // alert('The output box is empty.');
        showNotification('Nothing to parse.', outputBoxContainer);                  // Pass the container as the target
        spinner.style.display = 'none';                                             // Hide spinner as there's nothing to process
        return;                                                                     // Exit the function if the outputBox is empty
    }
    outputBoxContainer.value = ``;

    const chunks = splitWordText(outputText, OPENAI_SPEECH_MAX_CHAR);                // If inputText is more than OPENAI_SPEECH_MAX_CHAR characters, split it into chunks that do not cut in mid-sentence
    console.log(`${MTag}Processing in ${chunks.length} part(s)`);
    
    const ProcessStatusDisplay = document.getElementById('infoProcessStatus'); 
    ProcessStatusDisplay.textContent = `Parsing text in ${chunks.length} part(s)`;

    const spinner = document.getElementById('spinner');                             // Get the spinner element
    spinner.style.display = 'block';                                                // Show the spinner

// *****************************************************************************************************************************
    // Function to process a - PARSE - batch of chunks
    async function processBatch(batch, batchStartIndex) {
        for (let indexWithinBatch = 0; indexWithinBatch < batch.length; indexWithinBatch++) {
            if (ProcessStatusDisplay.textContent.startsWith('Stopping')) {
                console.log(`${MTag}Processing stopped by user.`);
                ProcessStatusDisplay.textContent = `Stopping Parsing by user.`;
                return;
            }
            const absoluteIndex = batchStartIndex + indexWithinBatch;
            console.log(`${MTag}BATCH-[${getHHMMssmm()}] -REQ.Idx: ${absoluteIndex + 1}`);
            console.log(`${MTag}BATCH-[${getHHMMssmm()}] -REQ.Idx BATCH: ${batch[indexWithinBatch]}`);

            if ( chunks.length === 1) {
                ProcessStatusDisplay.textContent = `Parsing - Single Part`;
            } else {
                ProcessStatusDisplay.textContent = `Parsing: ${absoluteIndex + 1} of ${chunks.length} ...`;  
            }
            
            startProcessTimer();                 
            const response = await fetch('/api/openai-chat-completion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{
                        role: "user",
                        content: batch[indexWithinBatch] 
                    }]
                })
            });
            stopProcessTimer('');

            console.log(`${MTag}[${getHHMMssmm()}] -FETCH - Got RES.Idx: ${absoluteIndex + 1}`);
            if (!response.ok) {
                console.error(`${MTag}Fetch Not OK: ${response.status} ${response.statusText}`);
                console.log(response);
                return response.clone().text().then(body => {           // Attempt to read and return the response body as a new Promise that rejects with detailed error info
                    let errorMessage = `${MTag}Fetch Not OK: ${response.status} ${response.statusText}`;
                    try {
                        const errorDetails = JSON.parse(body);          // If the response is JSON and has more details, attempt to parse it and add to the error message
                        if (errorDetails.message) {
                            errorMessage += ` - Details: ${errorDetails.message}`;
                        }
                    } catch (e) {
                        errorMessage += ` - Failed to parse error details or no additional info provided.`; // If parsing failed, or no additional details, use the generic error message
                    }
                    throw new Error(errorMessage);
                });
            }
            try {
                const data = await response.json();
                if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) { 
                    document.getElementById('outputBox').value += `${data.choices[0].message.content}\n\n`; 
                    handleTokenClick(document.getElementById('outputBox').value);                   // Click [TOKEN] to update counts

                    // console.log(`${MTag}${getHHMMssmm()} - BLOB Index: ${absoluteIndex + 1}`);
                    const filePrefix = A2G_PARSE_filePrefix;                                        // Prefix for the file name.    //console.log(`WEB - Parse - filePrefix set: ${filePrefix}`);
                    let firstWordsCapitalized = capitalizeFirstWords(chunks[absoluteIndex], 4);     // Capitalize the first Nb or Words from the text   // console.log(`WEB - First 3 - ${absoluteIndex + 1} - [${firstWordsCapitalized} ]`); 
                    let dateTimePrefix = getYYYYMMDDHHMM();
                    let fileName;
                    if ( chunks.length === 1) {
                        fileName = `${filePrefix}-${firstWordsCapitalized}-${dateTimePrefix}.txt`;  // Construct the filename with the timestamp prefix
                    } else {
                        fileName = `${filePrefix}-${absoluteIndex+1}-${chunks.length}-${firstWordsCapitalized}-${dateTimePrefix}.txt`;  // Construct the filename with the timestamp prefix
                    }
                    
                    const fileBlob = new Blob([data.choices[0].message.content], { type: 'text/plain' }); // Set the MIME type
                    const blobUrl = window.URL.createObjectURL(fileBlob);                           // create a URL

                    const downloadLinksContainer = document.getElementById('downloadLinksContainer');

                    let downloadLink = document.createElement('a');                                 // Create a temporary link to trigger the download
                    downloadLink.href = blobUrl;                                                    // Set the href to the blob URL
                    downloadLink.innerText = `${fileName}`;
                    downloadLink.download = fileName;                                               // Set the default filename for the download
                    
                    downloadLink.textContent = `${fileName}\n`;
                    downloadLinksContainer.appendChild(downloadLink); // Add the download link to the container
                    downloadLinksContainer.appendChild(document.createElement('br'));

                //    document.body.appendChild(downloadLink);                                    // Append the link to the body (it does not have to be visible)
                    downloadLink.click();                                                       // Programmatically click the link to trigger the download
                    // document.body.removeChild(downloadLink);                                     // Optionally, remove the link after triggering the download
                    // window.URL.revokeObjectURL(blobUrl);                                         // Cleanup the blob URL after the download

                //    const blobUrlDisplay = document.createElement('consumptionBox');                       // Display the blob URL link at the bottom left of the OutputBox
                //    blobUrlDisplay.style.textAlign = 'left';                
                //    blobUrlDisplay.innerHTML = `<a href="${blobUrl}" target="_blank" aria-label="Download or play Parsed audio file ${fileName}">${fileName}</a>`;  // Creates a clickable link          
                //    document.querySelector('.output-container').appendChild(blobUrlDisplay);    // Assumes '.output-container' is the parent container of 'outputBox'
                    // spinner.style.display = 'none';                                             // Hide spinner after processing
                }

            } catch (error) {
                console.error('Error:', error);
            } finally {
                // Any cleanup that needs to run after each fetch, successful or not
                spinner.style.display = 'none';
            }
        }
    }



    // Function to process all - PARSE - chunks in batches and dynamically enforce rate limiting
    async function processChunksInBatches() {   
        console.log(`${MTag}CHUNKS-[${getHHMMssmm()}] - Ready to CHUNK Away`);
        let batchCount = 0;
        for (let i = 0; i < chunks.length; i += OPENAI_SET_REQ_NB_CHUNK) {                      // console.log(`WEB - Processing Chunk batch[${(i + 1)} / ${chunks.length} ]`);    
            batchCount = batchCount + 1;
            const startTime = Date.now();                                                       // Record the start time of the batch processing
            const batch = chunks.slice(i, i + OPENAI_SET_REQ_NB_CHUNK);                         // batch is a subset of chunks, batch contains 'OPENAI_SET_REQ_NB_CHUNK' number of elements 
            console.log(`${MTag}CHUNKS-[${getHHMMssmm()}] - Running Batch #${batchCount} with max [${OPENAI_SET_REQ_NB_CHUNK}] chunks`); 
            await processBatch(batch, i);
            if (ProcessStatusDisplay.textContent.startsWith('Stopping')) {
                console.log(`${MTag}Cancelled Any remaining parts.`);
                ProcessStatusDisplay.textContent = `Stopping - Parsing Cancelled.`;
                return;
            }
            if (i + OPENAI_SET_REQ_NB_CHUNK < chunks.length) {                                  // Check if there are more batches to process
                const elapsedTime = Date.now() - startTime;
                const delayTime = (MINUTE_IN_MS / RATE_LIMIT_PER_MINUTE) * OPENAI_SET_REQ_NB_CHUNK - elapsedTime;
                if (delayTime > 0) {
                    console.log(`${MTag}CHUNKS-[${getHHMMssmm()}] - Delaying ${delayTime}ms for rate limit compliance.`);
                    
                    ProcessStatusDisplay.textContent = `Delay ${Math.floor(delayTime / 1000)}s`;
                    startProcessTimer(); 
                    await delay(delayTime);
                    stopProcessTimer('');
                }
            } else {
                ProcessStatusDisplay.textContent = `Parsing - Completed`;
                console.log(`${MTag}CHUNKS-[${getHHMMssmm()}] - Finished ALL CHUNKS.`);
            }
        }
        spinner.style.display = 'none';                                                             // Hide spinner once all batches are processed
    }

    // Call the function to process - PARSE - chunks
    processChunksInBatches().catch(error => {
        console.error('Error processing chunks:', error);
        spinner.style.display = 'none';
    });
    console.log(`${MTag}EXIT-[${getHHMMssmm()}]`);
} // BUTTON: (Parse)


// *****************************************************************************************************************************
// BUTTON -OPENAIModule-: (Token) - API - /openai-tokenize
async function handleTokenClick(input) {       
    // const inputText = outputBoxContainer.value.trim();
    let inputText;
    const outputBoxContainer = document.getElementById('outputBox');
    
    if (typeof input === 'string') {                                                // Determine if input is an event or directly passed text
        inputText = input.trim();
    } else{
        inputText = outputBoxContainer.value.trim();                                // Assuming input is an event, and the related text is in outputBoxContainer
    } 
    if(inputText.trim().length === 0) {                                             // alert('The output box is empty.');
        showNotification('Nothing to Verify Token info.', outputBoxContainer);      // Pass the container as the target
        return;
    }

    let firstWordsCapitalized = capitalizeFirstWords(inputText, 7);                 // Capitalize the first Nb or Words from the text
    console.log(`WEBapi-Click-[Token] -Input=[${firstWordsCapitalized}...]`);
    
    document.getElementById('spinner').style.display = 'block';                     // Show the spinner 
    fetch('/api/openai-gpt-tokenizer', {                                            // Make a POST request to the /openai-tokenize endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'inputText': inputText                                                  // Pass the output Box content
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Tokenize of Input Text response was NOT ok: ${Error}`);
        }
        return response.json();                                                     // Handle binary data for audio file
    })
    .then(data => {                                                                 // Now you have access to your data object
        let PromptCost = (COST_COMPLETION_INPUT * data.nbToken / 1000).toFixed(3);  // Formats to 3 decimal places
        const PromptTokenDisplay = document.getElementById('infoPromptToken'); 
        const PromptCostDisplay = document.getElementById('infoPromptCost');
        PromptTokenDisplay.textContent = `${data.nbToken}`;
        PromptCostDisplay.textContent = `$${PromptCost}`;
        console.log(`WEBapi-Click-[Token] -NbToken: ${data.nbToken}`);              // Log the number of tokens
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        document.getElementById('spinner').style.display = 'none';                   // Hide spinner 
    });
}  // BUTTON: (Token)




// *****************************************************************************************************************************
// BUTTON -OPENAI-: (Imagize) - API - /openai-image
async function handleImagizeClick(event) {       
    console.log(`WEBapi-C-[Imagize] REQUEST`);
    const spinner = document.getElementById('spinner'); 
    spinner.style.display = 'block';                                                // Show the spinner 
    const ProcessStatusDisplay = document.getElementById('infoProcessStatus'); 
    const outputBoxContainer = document.getElementById('outputBox');
    const inputText = outputBoxContainer.value.trim();
    const selectedImageSize = document.getElementById('SelectImageSize').value;     // Get the selected voice
    if(inputText.trim().length === 0) {                                             // alert('The output box is empty.');
        showNotification('Nothing to convert to image.', outputBoxContainer);       // Pass the container as the target
        spinner.style.display = 'none';                                             // Hide spinner as there's nothing to process
        return;
    }
    ProcessStatusDisplay.textContent = `Imagizing`;
    fetch('/api/openai-image', {                                                    // Make a POST request to the /openai-image endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'prompt': inputText,                                                    // Pass the text prompt to create an image
            'selectedImageSize': selectedImageSize                                  // Pass the selected image size
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Fetch Image response was NOT ok: ${Error}`);
        }
        return response.json();                                                     // Handle binary data for audio file
    })
    .then(data => {
        if (data && data.data) {                                                  // Assuming 'data' is an object containing an array of image objects under 'images'
            data.data.forEach((imgData, index) => {
                console.log(`Processing and Displaying Received IMAGE`);
                const firstWordsCapitalized = capitalizeFirstWords(inputText, 3);
                const dateTimePrefix = getYYYYMMDDHHMM();
                const downloadLink = document.createElement('a');
                downloadLink.href = imgData.url;
                downloadLink.download = `Image-${dateTimePrefix}-${firstWordsCapitalized}-${index+1}`; // Set the default filename for the downloaded image
                const linkText = data.data.length > 1 ? `Img-${dateTimePrefix}-${firstWordsCapitalized}-Link ${index+1}<br>` : `Image-${dateTimePrefix}-${firstWordsCapitalized}<br>`;
                downloadLink.innerHTML = linkText;                
                downloadLink.setAttribute('aria-label', `View or download generated image number ${index+1}`);
                downloadLink.setAttribute('target', '_blank'); // Open link in a new tab
                document.querySelector('.output-container').appendChild(downloadLink); // Append the download link to the output container
                // downloadLink.click(); // Automatically trigger the download
                const downloadLinksContainer = document.getElementById('downloadLinksContainer');
                downloadLinksContainer.appendChild(downloadLink); // Add the download link to the container
            });
        } else {
            console.log(`NO IMAGE`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        document.getElementById('spinner').style.display = 'none';                   // Hide spinner 
    });
} // BUTTON: (Imagize)



 // const urlDisplay = document.createElement('div');
                // urlDisplay.style.textAlign = 'left';
                // urlDisplay.innerHTML = `<a href="${img.url}" target="_blank">Image-${dateTimePrefix}-${firstWordsCapitalized}-Link ${index+1}</a><br>`; // Creates clickable links for each image
                // urlDisplay.innerHTML = `<a href="${img.url}" target="_blank" aria-label="View or download generated image number">Image-${dateTimePrefix}-${firstWordsCapitalized}-Link ${index+1}</a><br>`; // Creates clickable links for each image
                // document.querySelector('.output-container').appendChild(urlDisplay); // Append links to the output container



        
export { handleTranscribeClick, handleTranslateClick, handleTokenClick, handleParseClick, handleSpeakClick, handleImagizeClick };        // Export the function to be used in other files