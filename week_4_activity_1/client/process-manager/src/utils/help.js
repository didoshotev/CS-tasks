const step1 = { name: 'Send mail', type: 'SEND_MAIL', priority: 0};
const step2 = { name: 'Upload fail to Youtube', type: 'UPLOAD_YOUTUBE_VIDEO', priority: 1};
const step3 = { name: 'Download file from FTP server', type: 'DOWNLOAD_FILE_FROM_FTP_SERVER', priority: 2};
const step4 = { name: 'Upload file to FTP server', type: 'UPLOAD_FILE_TO_FTP_SERVER', priority: 3};
const step5 = { name: 'Send command', type: 'SEND_COMMAND', priority: 4},


const process1 = { type: 'lineal', stepsCollection: [step1, step2, step3, step4, step5] }
const process2 = { type: 'lineal', stepsCollection: [] }

const org = [];
const processes = [ process1, process2 ];