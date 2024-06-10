import React, { useState } from 'react';
import { handleTranscribeClick, handleTranslateClick } from './apiOpenaiCalls';
//    handleTokenClick, handleParseClick, handleSpeakClick, handleImagizeClick, handleDownloadCaptionsClick } from './apiOpenaiCalls';
// import { sleep, showNotification, formatDuration, getYYYYMMDDHHMM, capitalizeFirstWords, startTimer, stopTimer, updateCost, updateWordCount, swapStateTranscribeTranslateButtons } from './utilities';
// import { handleDownloadCaptionsClick as handleDownloadGoogleCaptionsClick } from './apiGoogleCalls';

const SvcTranscript = () => {
    // Here you can add state hooks or other React functionality.

    const [fileInfo, setFileInfo] = useState({
        fileName: 'Select an audio file',
        fileSize: '',
        audioDuration: '',
        statusMessage: ''
      });

      // Assuming you have constants defined somewhere for these values
  const OPENAI_FILE_AUDIO_FORMAT = ['audio/flac', 'audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/mpga', 'audio/x-m4a',  'audio/ogg', 'audio/wav', 'audio/webm'];
  const OPENAI_AUDIOFILE_SIZE_LIMIT = 25 * 1024 * 1024; // 25MB, adjust as needed



    const handleAudioFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return; // Exit if no file selected
            console.log(`CHOOSE AUDIO: STARTED - File=${file.name}`);
            setFileInfo({
            ...fileInfo,
            statusMessage: `Loading ${file.name}`
        });

        if (!OPENAI_FILE_AUDIO_FORMAT.includes(file.type)) {
            console.log(`CHOOSE AUDIO: File ${file.name} invalid type ${file.type}`);
            setFileInfo({
                fileName: 'Select an audio file',
                fileSize: '',
                audioDuration: '',
                statusMessage: `File ${file.name} invalid type ${file.type}`
            });
            event.target.value = ''; // To allow re-upload if needed
            return;
        }

        if (file.size > OPENAI_AUDIOFILE_SIZE_LIMIT) {
            console.log(`CHOOSE AUDIO: File ${file.name} size exceeded ${OPENAI_AUDIOFILE_SIZE_LIMIT / 1024 / 1024} MB.`);
            setFileInfo({
                fileName: 'Select an audio file',
                fileSize: '',
                audioDuration: '',
                statusMessage: `File ${file.name} size exceeded ${OPENAI_AUDIOFILE_SIZE_LIMIT / 1024 / 1024} MB.`
            });
            event.target.value = ''; // To allow re-upload if needed
            return;
            }

            setFileInfo({
            fileName: file.name,
            fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            audioDuration: '', // Will update once metadata is loaded
            statusMessage: 'Processing...'
        });

        const audioURL = URL.createObjectURL(file);
        const audio = new Audio(audioURL);

        audio.onloadedmetadata = () => {
            setFileInfo({
                ...fileInfo,
                audioDuration: `${audio.duration.toFixed(2)} seconds`,
                statusMessage: 'Ready to Submit'
            });
            URL.revokeObjectURL(audioURL); // Clean up the created URL to free resources
            console.log(`CHOOSE AUDIO: COMPLETED`);
        };
    };

    const handleTextFileChange = (event) => {
        // Placeholder for handling text file selection.
    };

    return (
        <div>
            <div className="container">

                <div className="info-section">
                    <h2>Audio File information</h2>
                    <div className="info-grid-file">
                        <div className="info-label">Processing File:</div> <div className="info-value" id="processingFileName">Select an audio file.</div>
                        <div className="info-label">File Size:</div> <div className="info-value" id="fileSize"></div>
                        <div className="info-label">Audio Duration:</div> <div className="info-value" id="audioDuration"></div>
                        <div className="info-label">Status:</div> <div className="info-value" id="status"></div>
                        <div className="info-label">Est. Cost:</div> <div className="info-value" id="infoTCribeCost"></div>
                    </div>
                    <form id="fileForm">
                        <div className="button-container">
                            <button type="button" className="blue-button button-space" onClick={() => document.getElementById('audioFile').click()}
                                    aria-label="Choose audio file for upload" >Choose Audio File</button>
                            <input type="file" id="audioFile" name="audioFile" style={{ display: "none" }} onChange={handleAudioFileChange} required />
                            <select id="SelectLanguage" aria-label="Select original audio language">
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="ht">Haitian</option>
                                <option value="ja">Japanese</option>
                            </select>
                            <button id="transcribeButton" className="green-button button-space" 
                                    onClick={handleTranscribeClick} aria-label="Transcribe audio file">Transcribe</button>
                            <button id="translateButton" className="green-button button-space" 
                                    onClick={handleTranslateClick} aria-label="Translate audio file">Translate to English</button>
                        </div>
                    </form>
                </div>
                <div className="info-section">
                    <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span id="transcriptionLabel">Audio Transcription</span>
                    </h2>
                </div>
                <div className="transcription-and-info-wrapper">
                    <div className="output-container">
                        <textarea id="outputBox" rows="8" cols="110" style={{ overflow: "auto" }} 
                                aria-label="Transcription output"></textarea>
                        <div className="copy-button-container">
                            <button id="copyButton" className="blue-button button-space" 
                                    onClick={() => console.log('Copy to clipboard')} aria-label="Copy transcription text">Copy</button>
                            <button type="button" className="choose-file blue-button button-space" onClick={() => document.getElementById('textFile').click()} 
                                    aria-label="Choose text file to speak" >LoadText</button>
                            <input type="file" id="textFile" name="textFile" style={{ display: "none" }} onChange={handleTextFileChange} required />
                            <button id="cancelButton" className="red-button button-space" 
                                    onClick={() => console.log('Cancel request')} aria-label="Cancel Request">Cancel Request</button>
                        </div>
                        <span id="spinner" style={{ display: "none" }}><img src="./BeanEater.gif" alt="Loading..." className="spinner-image" /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SvcTranscript;
