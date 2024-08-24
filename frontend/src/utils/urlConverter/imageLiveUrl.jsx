import { gs1backendUrl, backendNpcUrl  } from "../config";

function imageLiveUrl(documentPath, backendNpcUrl  = null) {
    if (typeof documentPath !== 'string' || !documentPath) return null;

    // Replace all backslashes with forward slashes
    let cleanedPath = documentPath.replace(/\\/g, '/');

    // Remove any leading or trailing slashes from the cleaned path
    cleanedPath = cleanedPath.replace(/^\/+|\/+$/g, '');
    
    const imageBaseUrl = backendNpcUrl  || gs1backendUrl;
    
    // Ensure there's only one slash between the imageBaseUrl and cleanedPath
    const liveUrl = `${imageBaseUrl.replace(/\/+$/, '')}/${cleanedPath}`;

    return liveUrl;
}

export default imageLiveUrl;
