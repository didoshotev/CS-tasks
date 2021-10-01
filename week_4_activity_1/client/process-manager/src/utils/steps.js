const stepsInputs = [
    {
        key: 'SEND_EMAIL',
        value: 'Send mail',
        id: 1,
        inputs: [{ tag: 'input', type: 'email', label: 'Enter your email', name: 'yourEmail', placeholder: 'email@email.com', defaultValue: '' },
        { tag: 'input', type: 'email', label: 'Enter receiver email', name: 'receiverEmail', placeholder: 'email@email.com', defaultValue: '' },
        { tag: 'textarea', type: 'text', label: 'Enter your message', name: 'message', placeholder: '', defaultValue: '' }]
    },

    {
        key: 'UPLOAD_FILE_TO_FTP_SERVER',
        value: 'Upload file to FTP server',
        id: 2,
        inputs: [
            { tag: 'input', type: 'text', label: 'Enter server name', name: 'serverName', placeholder: '', defaultValue: '' },
            { tag: 'input', type: 'number', label: 'Enter server number', name: 'serverNumber', placeholder: '', defaultValue: '' },]
    },

    {
        key: 'DOWNLOAD_FILE_FROM_FTP_SERVER',
        value: 'Download file from FTP server',
        id: 3,
        inputs: [
            { tag: 'input', type: 'text', label: 'Enter your username', name: 'username', placeholder: 'Alice', defaultValue: '' },
            { tag: 'input', type: 'text', label: 'Enter server name', name: 'serverName', placeholder: '', defaultValue: '' },
            { tag: 'input', type: 'number', label: 'Enter server number', name: 'serverNumber', placeholder: '', defaultValue: '' }]
    },


    {
        key: 'UPLOAD_YOUTUBE_VIDEO',
        value: 'Upload youtube video',
        id: 4,
        inputs: [
            { tag: 'input', type: 'text', label: 'Enter your youtube username', name: 'username', placeholder: 'Alice', defaultValue: '' },
            { tag: 'input', type: 'text', label: 'Enter video link', name: 'link', placeholder: '', defaultValue: '' }]
    },

    {
        key: 'SEND_COMMAND',
        value: 'Send command',
        id: 5,
        inputs: [
            { tag: 'input', type: 'number', label: 'Enter command number', name: 'commandNumber', placeholder: '', defaultValue: '' }]
    },

]
module.exports = { stepsInputs }