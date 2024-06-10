async function handleDownloadCaptionsClick(captionId) {
    try {
        console.log('JJH - Fetching captionID', captionId);
        const response = await fetch(`/api/download-captions/${captionId}`);
        console.log('JJH - Fetching Completed');
        
        if (!response.ok) {
            throw new Error('Failed to download captions');
        }

        const captions = await response.json();
        console.log('Captions:', captions);
        // Handle the downloaded captions here
    } catch (error) {
        console.error('Error:', error);
    }
}


export { handleDownloadCaptionsClick };        // Export the function to be used in other files