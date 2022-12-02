
const banner = document.querySelector('.banner-upload')
const hiddenInput = document.querySelector('.hidden-input')
const hiddenInputFile = document.querySelector('.hidden-input-file')
const imageInput = document.querySelector('.image-input')
const fileInput = document.querySelector('.file-input')
const fileInputHiddenBtn = document.querySelector('.file-input-hidden-btn')
const svgInput = document.querySelector('.svg-input')
const svgText = document.querySelector('.svg-text')
const svgFile = document.querySelector('.svg-file')
const contentAttachments = document.querySelector('.content-attachments')
const cancelBtn = document.querySelector('.cancel-btn')




const pressCenterFile = document.querySelector('.press-center-file')

if (pressCenterFile) {
    pressCenterFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("files", file);
        fetch("/uz/attachments", {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.data.attachments[0]){
                hiddenInputFile.value = JSON.stringify(data.data.attachments[0].id)

                }

                // if (data.data.attachments[0]) {
                    fileInput.classList.remove('hidden')
                    fileInputHiddenBtn.classList.remove('hidden')
                    svgFile.classList.add('hidden')
                // }
            })
        e.target.value=null;

    })
    cancelBtn.addEventListener('click', (e) => {
        console.log(hiddenInputFile.value)
        hiddenInputFile.value = ''
        console.log(hiddenInputFile.value)
        fileInput.classList.add('hidden')
        e.target.classList.add('hidden')
        svgFile.classList.remove('hidden')
    })
}

if (banner) {
    banner.addEventListener("change", (e) => {

        const file = e.target.files[0];
        const data = new FormData();
        data.append("files", file);
        fetch("/uz/attachments", {
            method: "POST",
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {

                for (let i = 0; i < data.data.attachments.length; i++) {
                    // console.log(JSON.stringify(data.data.attachments[i]))
                    hiddenInput.value = JSON.stringify(data.data.attachments[i].id)
                    imageInput.src = `/uploads/${data.data.attachments[i].name}`
                    arr.push(data.data.attachments[i].id)

                }
                contentAttachments.value = JSON.stringify(arr)

                imageInput.hidden = false

                svgInput.style.display = "none"
                svgText.style.display = "none"
            })

    })
}


