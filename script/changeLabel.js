let fileInput = document.querySelector('#upload'),
    fileLabel = document.querySelector('#upload-lable'),
    fileInputModal = document.querySelector('#upload_modal'),
    fileLabelModal = document.querySelector('#upload-lable_modal'),

    fileNameForEmail = '',
    format = '';

function changeLabelText() {
    let fileInfo = fileInput.value;
    let dotLastIndex = fileInfo.lastIndexOf('.');
    format = fileInfo.substr(dotLastIndex);
    let lastIndex = fileInfo.lastIndexOf('\\');
    fileInfo = fileInfo.substr(lastIndex + 1);
    fileNameForEmail = fileInfo;
    if (fileInfo.length > 25) {
        fileInfo = fileInfo.substr(0, 25) + '...';
        fileNameForEmail = fileInfo.substr(0, 25);
    }
    fileLabel.setAttribute('data-after', fileInfo);
}

function changeLabelTextModal() {
    let fileInfo = fileInputModal.value;
    let dotLastIndex = fileInfo.lastIndexOf('.');
    format = fileInfo.substr(dotLastIndex);
    let lastIndex = fileInfo.lastIndexOf('\\');
    fileInfo = fileInfo.substr(lastIndex + 1);
    fileNameForEmail = fileInfo;
    if (fileInfo.length > 25) {
        fileInfo = fileInfo.substr(0, 25) + '...';
        fileNameForEmail = fileInfo.substr(0, 25);
    }
    fileLabelModal.setAttribute('data-after', fileInfo);
}

fileInput.addEventListener('change', changeLabelText, false);
fileInputModal.addEventListener('change', changeLabelTextModal, false)