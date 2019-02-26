  $('#upload-file').off('click');

  $('#upload-file').click(() => {

    let inputFile = $('#input-image');

    uploadImage(inputFile);
  });

  const uploadImage = inputFile => {

    if (!(window.File)) {
      console.log('La API File no está soportada');
      return;
    }
    const MAX_BYTES = (1024 * 1024);
    let data = new FormData();
    inputFile.trigger('click');

    inputFile.off('change');
    //Sigue aqui: realiza validacion del peso de la imagen
    // Ventana que indique la imagen que se esta subiendo
    // Loader visual cuando una imagen se esta subiendo
    inputFile.change(function (e) {
      let files = [...e.target.files];
      try {
        files.map(fl => {
          // console.log(fl);
          //console.log(MAX_BYTES);
          console.log((fl.size / (1024 * 1024)).toFixed(2));
          if (!fl.type.match('image.*')) {
            console.log('Solo puedes subir imagenes');
            throw new Error('Solo puede subir imagenes');
          } else if (fl.size > MAX_BYTES) {
            throw new Error('Supera el tamaño maximo de 1 MB');
          } else {
            let filesContent = document.querySelector('#modal-files-content'),
              tpl = `
                    <tr class="img-files">
                      <td class="img-preview-td"></td>
                      <td>${fl.name}</td>
                      <td>${(fl.size / (1024 * 1024)).toFixed(2)} MB</td>
                      <td>
                        <div class="progress">
                          <div id="img-progress-upload" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                        </div>
                      </td>
                    </tr>
                  `;
            filesContent.insertAdjacentHTML('beforeend', tpl);
            data.append('file', fl);
          }

        });
        //AJAX
        $.ajax({
          url: '/upload',
          type: 'POST',
          data: data,
          contentType: false,
          cache: false,
          processData: false,
          success: (data) => {
          
            $('#img-progress-upload').animate({
              width: '100%'
            }, () => {
              $('#img-progress-upload')
                .addClass('bg-success');

              setTimeout(() => {
                $('#img-progress-upload')
                  .parent()
                  .fadeOut(500, () => {
                    $('#img-progress-upload')
                      .parent()
                      .remove();
                  })
              }, 500);

            });

          },
          error: (data) => {
            alert(data);
          }
        });

      } catch (error) {
        alert(error.message);
      }

    });

  }
  