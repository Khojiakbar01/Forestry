let arr = []

tinymce.init({
        tinydrive_token_provider: '4302fbfa7d5ae390c3c8f8c268963e985cc9ef94ed08f5d5165078001ae2fbcb',
        selector: '#myTextarea',
        // width: 600,
        height: 600,
        relative_urls: false,
        remove_script_host: false,
        plugins: [
            'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
            'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
            'media', 'table', 'emoticons', 'template', 'help',
        ],
        toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | insert file link image  | print preview media fullscreen | ' +
            'forecolor backcolor emoticons | help',
        menu: {
            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons '}
        },
        menubar: 'favs file edit view insert format tools table help',
        content_css: 'css/content.css',

        images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', '/uz/attachments');

            xhr.upload.onprogress = (e) => {
                progress(e.loaded / e.total * 100);
            };

            xhr.onload = () => {


                const res = JSON.parse(xhr.responseText);

                for (let i = 0; i < res.data.attachments.length; i++) {

                    arr.push(res.data.attachments[i].id)

                }
                contentAttachments.value = JSON.stringify(arr)

                resolve(`/uploads/${res.data.attachments[0].name}`);
            };

            xhr.onerror = () => {
                reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
            };

            const formData = new FormData();
            formData.append('files', blobInfo.blob(), blobInfo.filename());

            xhr.send(formData);
        })
    },
);