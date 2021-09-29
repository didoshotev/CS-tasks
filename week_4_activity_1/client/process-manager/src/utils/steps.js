const stepsInputs = { 
    'SEND_EMAIL': [
        {tag:'input', type: 'email', label: 'Enter your email', name: 'yourEmail', placeholder: 'email@email.com', defaultValue: ''},
        {tag:'input', type: 'email', label: 'Enter receiver email', name: 'receiverEmail', placeholder: 'email@email.com', defaultValue: ''},
        {tag:'textarea', type: 'text', label: 'Enter your message', name: 'message', placeholder: '', defaultValue: ''},
    ],

    'UPLOAD_FILE_TO_FTP_SERVER': [
        {tag:'input', type: 'text', label: 'Enter server name', name: 'serverName', placeholder: '', defaultValue: ''},
        {tag:'input', type: 'number', label: 'Enter server number', name: 'serverNumber', placeholder: '', defaultValue: ''},

    ],

    'DOWNLOAD_FILE_FROM_FTP_SERVER': [
        {tag:'input', type: 'text', label: 'Enter your username', name: 'username', placeholder: 'Alice', defaultValue: ''},
        {tag:'input', type: 'text', label: 'Enter server name', name: 'serverName', placeholder: '', defaultValue: ''},
        {tag:'input', type: 'number', label: 'Enter server number', name: 'serverNumber', placeholder: '', defaultValue: ''},

    ],

    'UPLOAD_YOUTUBE_VIDEO': [
        {tag:'input', type: 'text', label: 'Enter your youtube username', name: 'username', placeholder: 'Alice', defaultValue: ''},
        {tag:'input', type: 'text', label: 'Enter video link', name: 'link', placeholder: '', defaultValue: ''},
    ],

    'SEND_COMMAND': [
        {tag:'input', type: 'number', label: 'Enter command number', name: 'commandNumber', placeholder: '', defaultValue: ''},
    ],
}
module.exports = { stepsInputs }