class ElementOptionBar {
  constructor(element) {
    this.element = element;

  }

  editBox(e) {

  }

  // @param {event} 
  padding(e) {
    const boxElement = this.element;
    let targetEl = e.target;

    switch (targetEl.id) {
      case 'padding-box-top':
        $(  boxElement ).css('padding-top', $(targetEl).val() + 'px');
       
        break;
      case 'padding-box-right':
        $(  boxElement ).css('padding-right', $(targetEl).val() + 'px');
        break;
      case 'padding-box-bottom':
        $(  boxElement ).css('padding-bottom', $(targetEl).val() + 'px');
        break;
      case 'padding-box-left':
        $(  boxElement ).css('padding-left', $(targetEl).val() + 'px');
        break;
    
    }

  }

  margin(e) {
    const boxElement = this.element;
    let targetEl = e.target;

    switch (targetEl.id) {
      case 'margin-box-top':
        $(  boxElement ).css('margin-top', $(targetEl).val() + 'px');

        break;
      case 'margin-box-right':
        $(  boxElement ).css('margin-right', $(targetEl).val() + 'px');
        break;
      case 'margin-box-bottom':
        $(  boxElement ).css('margin-bottom', $(targetEl).val() + 'px');
        break;
      case 'margin-box-left':
        $(  boxElement ).css('margin-left', $(targetEl).val() + 'px');
        break;

    }
  }

  bg(e) {
    const boxElement = this.element;
    let targetEl = e;
    //console.log($(targetEl).attr('class'));
    switch ($(targetEl).attr('id')) {
      case 'bg-color-picker':
        $(boxElement).css('background-color', $(targetEl).val());
        break;
      case 'bg-color-picker':
        $(boxElement).css('background-color', $(targetEl).val());
        break;
    }

    if($(targetEl).attr('data-bg') === 'image') {
      $(boxElement).css('background', `url(${$(targetEl).attr('data-imglocation')}) no-repeat center center`);
      $(boxElement).css('background-size' , 'cover');
      $('#modal-select-img').modal('hide');
      if ($('.modal-backdrop').is(':visible')) {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      }

      $('#bgImagePreview div')
        .css('background', `url(${$(targetEl).attr('data-imglocation')}) no-repeat center center`)
        .css('background-size', 'contain');
    }
  }

  border(e) {
    const boxElement = this.element;
    let targetEl = e.target;

    switch (targetEl.id) {
      case 'border-color':
        $(boxElement).css('border-color', $(targetEl).val());
        break;
      case 'border-width':
        $(boxElement).css('border-width', $(targetEl).val() + 'px');
        break;
      case 'border-style':
        $(boxElement).css('border-style', $(targetEl).val());
        break;
      case 'border-radius':
        $(boxElement).css('border-radius', $(targetEl).val() + 'px');
        break;
    }

  }

  // Le paso un evento generado por los inputs que modifican el boxshadow  y tambien se le pasa un array que en cada posicion contiene una propiedad del box shadow
  boxshadow(e, shadowArr) {
    const boxElement = this.element;
    let targetEl = e.target;
       
        // Esta funcion transforma el array del boxshado en una string
        let transFormBoxShadow = arr => {
          let bxshtpl = '';
          bxshtpl += arr[0] + ' ';
          bxshtpl += arr[1] + ' ';
          bxshtpl += arr[2] + ' ';
          bxshtpl += arr[3] + ' ';
          bxshtpl += arr[4] + ' ';

          return bxshtpl;

        }
    // Aqui evaluamos que propiedad quiere cambiar el usuario. 
    switch (targetEl.id) {
      case 'boxshadow-x':
        shadowArr[0] = $(targetEl).val() + 'px';
        break;
      case 'boxshadow-y':
        shadowArr[1] = $(targetEl).val() + 'px';
        break;
      case 'boxshadow-blur':
        shadowArr[2] = $(targetEl).val() + 'px';
        break;
      case 'boxshadow-spread':
        shadowArr[3] = $(targetEl).val() + 'px';
        break;
      case 'boxshadow-color-picker':
        shadowArr[4] = $(targetEl).val();
        console.log($(targetEl).val());
        break;
    }

    /**
    *  Establecemos el data-boxshadow del elemento html, que se encargara de guardar la string.
    * Esto es debido que al cambiar el estilo dinamicamente del boxshadow aveces las propiedades cambian de posicion y de formato y puede dar problemas.
    *  Y cuando tratamos de recuperar el box shadow acutal para rellenar los inputs debemos asegurarnos que los datos no cambien.
    */
    boxElement.dataset.boxshadow = transFormBoxShadow(shadowArr);

    //Aqui modifico dinamicamente el 
    boxElement.style.boxShadow = transFormBoxShadow(shadowArr);

  }

  boxsize(e) {
    const boxElement = this.element;
    let targetEl = e.target;
    if (boxElement.dataset.boxtype === 'section' || boxElement.dataset.boxtype === 'row' || boxElement.dataset.boxtype === 'col') {
      if (boxElement.dataset.boxtype === 'col'){
        boxElement.classList.remove('col');
      }
      (targetEl.id === 'box-width') ? $(boxElement).css('width', $(targetEl).val() + '%') : $(boxElement).css('height', $(targetEl).val() + '%'); 

    }
    
  }

  delete() {
    let boxElement = this.element;

    
    $(boxElement).fadeOut(500, function() {
      boxElement.remove();
      console.log();
      if ($('#workboard').html() === '') {
        $('#element-option-bar-wrapper').removeClass('active');
        $('.project-body').removeClass('active');

        $('#option-bar-toggler').off('click');
        $('#workboard').addClass('workboard-initial');
      }
    });

    $('#element-option-bar-wrapper').removeClass('active');
    $('.project-body').removeClass('active');
    
    
  }

  align(e) {
    let boxElement = this.element;
    e.stopPropagation();
    console.log(e.target.value);
    switch (e.target.value) {
      case 'left':
        boxElement.classList.remove('ml-auto');
        boxElement.classList.remove('mx-auto');
        boxElement.classList.add('mr-auto');
        boxElement.dataset.boxalign = e.target.value;
        break;
      case 'center':
        boxElement.classList.remove('ml-auto');
        boxElement.classList.remove('mr-auto');
        boxElement.classList.add('mx-auto');
        boxElement.dataset.boxalign = e.target.value;
        break;
      case 'right':
        boxElement.classList.remove('mr-auto');
        boxElement.classList.remove('mx-auto');
        boxElement.classList.add('ml-auto');
        boxElement.dataset.boxalign = e.target.value;
        break;
    
      default:
        break;
    }
  }

  uploadImage(inputFile) {
    let globalThis = this;
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
    inputFile.change(function(e){
      let files = [...e.target.files],
        userPath = $(e.currentTarget).attr('data-userFile-path');
       try {
        files.map(fl => {
          console.log(fl);
        
            if (!fl.type.match('image.*')) {
              console.log('Solo puedes suber imagenes');
              throw new Error('Tipo de imagen no correcta');
            } else if (fl.size > MAX_BYTES) {
              throw new Error('Supera el tamaño maximo');
            } else {
              let filesContent = document.querySelector('#modal-files-content'),
              tpl = `
                    <tr data-imglocation="${userPath}/${fl.name}" data-bg="image" class="img-files">
                      <td class="img-preview-td">
                        <img src="${userPath}/${fl.name}" class="img-preview">
                      </td>
                      <td>${fl.name}</td>
                      <td>${(fl.size / (1024 * 1024)).toFixed(2)} MB</td>
                      <td>
                        <div class="progress">
                          <div id="img-progress-upload" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="50" style="width: 50%"></div>
                        </div>
                      </td>
                    </tr>
                  `;
              filesContent.insertAdjacentHTML('afterbegin' , tpl);
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
              console.dir(data);
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

              $('.img-files').off('click');

              $('.img-files').click((e) => {
                let targetEl = $(e.currentTarget);
                $('.img-files').removeClass('img-select');
                $(targetEl).addClass('img-select');
                $('#select-image').off('click');

                $('#select-image').click(e => globalThis.bg(targetEl));
              });

            },
            error: (data) => {
              console.log(data.message);
            }
          });
         
      } catch (error) {
            console.log(error.message);
      }
      
    });

  }

  addNavItem(e) {
    console.log('AddNavItem: ', e.currentTarget.localName);
    e.stopPropagation();
    let boxElement = this.element,
        parentElInput = $('.nav-items-option-wrapper').parent(),
        copyElementInput = $('.nav-items-option-wrapper:first').clone(),
        parentElNav = $(boxElement).find('.navbar-nav'),
        copyElementNavItem = parentElNav.find('.nav-item').first().clone(true);

    copyElementInput.find('.nav-item-input').val('Item');
    copyElementNavItem.removeClass('active');
    copyElementNavItem.children('.nav-link').attr('href', '#');
    copyElementNavItem.children('.nav-link').html('Item');

   

    copyElementInput.appendTo(parentElInput);
    copyElementNavItem.appendTo(parentElNav); 
    
    copyElementInput.attr('data-navitemindex', copyElementNavItem.index());

    copyElementInput.find('.nav-item-input').click(e => {
      $(e.currentTarget).parent().siblings().collapse('toggle');
    });

    this.editNav(copyElementInput.find('.nav-item-edit'));
    

  }

  addImgBrand(e) {
    let imgLocation = $(e).attr('data-imglocation'),
        tpl = `<img src="${imgLocation}" class="brand">`;

    $('.navbar-brand')
      .html('')
      .append(tpl);

    $('#modal-select-img').modal('hide');
    if ($('.modal-backdrop').is(':visible')) {
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }
  
  }

  deleteNavItem(e) {
    console.log('deleteNavItem: ', e.currentTarget.localName);
  }

  editNav(obj) {
    let navItems = $('.nav-item a'),
      navWrapperOptions = $('.nav-items-option-wrapper');
    obj.each((i, el) => {
      let input = $(el);
      console.log(input.attr('data-navedit'));
      switch (input.attr('data-navedit')) {
        case 'name':
          input.keyup((e) => {
            let index = $(e.currentTarget).parent().parent().parent().attr('data-navitemindex');
            console.log(input);
            console.log($(e.currentTarget).parent().parent().prev().find('.nav-item-input'));
            $(e.currentTarget)
            .parent()
            .parent()
            .prev()
            .find('.nav-item-input')
              .val($(e.currentTarget).val());
            navItems.eq(index).html($(e.currentTarget).val());
          });
          break;
        case 'event':
          input.change(e => {
            if($(e.currentTarget).val() == 1) {
              let index = $(e.currentTarget).parent().parent().parent().attr('data-navitemindex');
              $('.nav-item-event-section ').hide();
              $('.nav-item-event-link').show();

            } else if ($(e.currentTarget).val() == 2) {
              
              $('.nav-item-event-link').hide();
              $('.nav-item-event-section ').show();

              let sections = $('#workboard').find('.section-editable'),
                  id = '';

              sections.each( (i, el) => {
                if( $(el).attr('id') !== undefined) {

                  let tpl = `<option value="${$(el).attr('id')}">${$(el).attr('id')}</option>`
                  id += tpl;
                }
              });
              $('.nav-item-event-section').off('change');
              if ( id !== '') {
                $('.nav-item-event-section').html('');
                $('.nav-item-event-section').append(id);
              }
              

              $('.nav-item-event-section').change(e => {
                let index = $(e.currentTarget).parent().parent().parent().attr('data-navitemindex'),
                  idSection = `#${$(e.currentTarget).val()}`;

                navItems.eq(index).attr('href', idSection);
                
              })
              
            }
          });
          break;
        case 'link':
          input.keyup((e) => {
            let index = $(e.currentTarget).parent().parent().parent().attr('data-navitemindex');
            console.log(e.currentTarget.value);

            navItems.eq(index).attr('href', 'https://'+($(e.currentTarget).val()));
          });
          break;
      }

      /* name
      event
      section
      link */


    })
  }

  editForm(obj) {

    const boxElement = this.element;
    let formItems = $(boxElement).find('.form-control');
    console.log('Es hora de editar el formulario');
    // console.log(boxElement, formItems, formWrapperOptions);

    console.log(boxElement);

    obj.each( (i, el) => {
      let input = $(el);
      // name
      // placeholder
      // required
      // hidelabel 

      switch (input.attr('data-formedit')) {
        case 'name':
          input.off('click');
          input.off('keyup');
          input.keyup((e) => {
            let index = $(e.currentTarget).parent().parent().parent().attr('data-formitemindex');
            formItems.eq(index).prev().html($(e.currentTarget).val());
            console.log(formItems);
          });
          break;
        case 'placeholder':
          input.off('click');
          input.off('keyup');
          input.keyup((e) => {
            let index = $(e.currentTarget).parent().parent().parent().attr('data-formitemindex');

            formItems.eq(index).attr('placeholder',$(e.currentTarget).val());
          });
          break;
        case 'required':
          input.off('click');
          input.off('keyup');
          input.click(e => {
            let index = $(e.currentTarget).parent().parent().parent().parent().attr('data-formitemindex');
            console.log(formItems.eq(index));
            if ($(e.currentTarget).prop('checked')) {
              formItems.eq(index).attr('required', 'required');
            } else {
              formItems.eq(index).removeAttr('required');
            }
          });
          break;
        case 'hidelabel':
          input.off('click');
          input.off('keyup');
          input.click(e => {
            let index = $(e.currentTarget).parent().parent().parent().parent().attr('data-formitemindex');

            if ($(e.currentTarget).prop('checked')) {
              formItems.eq(index).prev().css('display', 'none');
            } else {
              formItems.eq(index).prev().css('display', 'block');
            }
          });
          break;
        case 'input-type':
          input.change(e => {
            let index = $(e.currentTarget).parent().parent().parent().attr('data-formitemindex');
            
            formItems.eq(index).attr('type', $(e.currentTarget).val());
            formItems.eq(index).attr('placeholder', $(e.currentTarget).val());
            formItems.eq(index).prev().html($(e.currentTarget).val());

            $(e.currentTarget).parent().parent().parent().find('.form-item-label').val($(e.currentTarget).val());
            $(e.currentTarget).parent().parent().parent().find('.form-item-placeholder').val($(e.currentTarget).val());

          });
          break;
      }

    });
    
  }

  addFormItem(e) {
    console.log(e.currentTarget);
    let boxElement = this.element,
      parentElInput = $('.form-items-option-wrapper').parent(),
      copyElementInput = $('.form-items-option-wrapper:first').clone(),
      parentElForm = $(boxElement),
      copyElementFormItem = parentElForm.find('.form-group').first().clone(true);

    copyElementInput.find('.form-item-input').val('Item');

    copyElementInput.appendTo(parentElInput);
    copyElementFormItem.appendTo(parentElNav);

    copyElementInput.attr('data-formedit', copyElementFormItem.index());

    copyElementInput.find('.form-item-input').click(e => {
      $(e.currentTarget).parent().siblings().collapse('toggle');
    });

    this.editForm(copyElementInput.find('.form-item-edit'));
  }
  

  renderOptionBar(optionBarEl, panelElementBar) {
    const boxElement = this.element,
      elementOrder = $(boxElement).index(),
      editingFlag = $('#current-element-editing');

      $('#delete-element').off('click');
      
      $('#delete-element').click( (e) => {
        e.stopPropagation();
        this.delete();
      });

    if (boxElement.dataset.boxtype === 'section' || boxElement.dataset.boxtype === 'row' || boxElement.dataset.boxtype === 'col' || boxElement.dataset.boxtype === 'nav' || boxElement.dataset.boxtype === 'form')  {
      
    /*   console.log('Desde ElementOptionBar: renderizar opciones del: ',   boxElement.dataset.boxtype);
      console.log(boxElement); */

      $('.sectionID').hide();
      
      $('#upload-image').off('click');
      $('#upload-image').click(() => {
        let inputFile = $('#input-image');

        this.uploadImage(inputFile);

      });

      $('.img-files').off('click');

      $('.img-files').click((e) => {
        let targetEl = $(e.currentTarget);
        $('.img-files').removeClass('img-select');
        $(targetEl).addClass('img-select');
        $('#select-image').off('click');

        $('#select-image').click(e => this.bg(targetEl));

      });

      
      if (boxElement.dataset.boxtype === 'section' || boxElement.dataset.boxtype === 'nav') {
        editingFlag.html(` <span id="current">${boxElement.dataset.boxtype} ${elementOrder + 1}</span>`);
      } else if (boxElement.dataset.boxtype === 'row') {
        let parentEl = $(boxElement).parent().attr('data-boxtype'),
          elementOrder = [...$(boxElement).parent().find('.row-editable')].findIndex(el => el === boxElement);
        editingFlag.html(`${parentEl} ${$(boxElement).parent().index() + 1} <i class="fas fa-angle-right"></i> <span id="current">${boxElement.dataset.boxtype} ${elementOrder + 1}</span>`);
        console.log(elementOrder + 1);

      } else if (boxElement.dataset.boxtype === 'col') {
        let parentRow= $(boxElement).parent().attr('data-boxtype'),
          elementOrderRow = [...$(boxElement).parent().parent().find('.row')].findIndex(el => el === boxElement.parentElement),
          elementOrderCol = [...$(boxElement).parent().find('.col')].findIndex(el => el === boxElement);
        
        console.log($(boxElement).parent().parent().find('.row'));
        editingFlag.html(`${parentRow} ${elementOrderRow + 1} <i class="fas fa-angle-right"></i>  <span id="current">${boxElement.dataset.boxtype} ${elementOrderCol + 1}</span>`);
      } else if (boxElement.dataset.boxtype === 'form') {
        let parentCol = $(boxElement).parent().attr('data-boxtype'),
          elementOrderCol = [...$(boxElement).parent().parent().find('.col-editable')].findIndex(el => el === boxElement.parentElement),
          elementOrderForm = [...$(boxElement).parent().find('.form-editable')].findIndex(el => el === boxElement);

        editingFlag.html(`${parentCol} ${elementOrderCol + 1} <i class="fas fa-angle-right"></i>  <span id="current">${boxElement.dataset.boxtype} ${elementOrderForm+1}</span>`);
      } 
      
      // Esto aun no esta en uso pero en algun momento servira
      let formOp = document.querySelector('#form-section');

      let borderStylesArr = [
        'dotted',
        'dashed',
        'solid',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
        'none',
        'hidden'
      ];

      //Renderiza un input select por cada opcion de un array
      let displaySelectOptions = (arr, defaultOption) => {
        let selectHtml = '';
        arr.map( item => {
          if (defaultOption!== 'undefinded' && item === defaultOption) {
            selectHtml += ` <option value="${item}" selected = "selected">${item}</option>`;
          } else {
            selectHtml += ` <option value="${item}">${item}</option>`;
          }
          
        });
        return selectHtml;
      };

      // Se le pasa por parametro un elemento, primero evalua que el data-boxshadow este definido, en caso de no estarlo devuelve una string por defecto y en caso de estarlo regresa el valor en si mismo.
      let displayBoxShadowInputs = element => {
        let boxShadow = (element.dataset.boxshadow == null || element.dataset.boxshadow == '') ? '0px 0px 0px 0px #ffffff' : element.dataset.boxshadow,
          tpl = '';
        
        // Esta funcion transforma la string dada y la transforma en un array
        let stringToArray = boxShadow => boxShadow.split(' '),
          shadowArr = stringToArray(boxShadow),
          newShadowArray = [];

        // Filtra si una posicion del array esta vacia y si no es asi lo mete en un nuevo array
        shadowArr.map((el) => {
          if (el !== '') {
            newShadowArray.push(el);
          }
        });

        // Retorna la plantilla y el nuevo array, esto para recuperar los datos del box shadow y pinterlos corectamente en los inputs una vez se haya hecho una modificacion
        return newShadowArray;
      };

      // Aqui obtenemos todos los estilos que tiene el elemento a modificar, de modo que si se modifica dinamicamente podamos obtenerlo y pintarlos en los inputs
      let currentElWidth = (boxElement.style.width !== '') ? parseInt(boxElement.style.width) : '0',
          currentPaddingTop = (boxElement.style.paddingTop !== '') ? boxElement.style.paddingTop : '0',
          currentPaddingRight = (boxElement.style.paddingRight !== '') ? boxElement.style.paddingRight : '0',
          currentPaddingBottom = (boxElement.style.paddingBottom !== '') ? boxElement.style.paddingBottom : '0',
          currentPaddingLeft = (boxElement.style.paddingLeft !== '') ? boxElement.style.paddingLeft : '0',
          currentMarginTop = (boxElement.style.marginTop !== '') ? boxElement.style.marginTop : '0',
          currentMarginRight = (boxElement.style.marginRight !== '') ? boxElement.style.marginRight : '0',
          currentMarginBottom = (boxElement.style.marginBottom !== '') ? boxElement.style.marginBottom : '0',
          currentMarginLeft = (boxElement.style.marginLeft !== '') ? boxElement.style.marginLeft : '0',
          currentBgColor = (boxElement.style.backgroundColor !== '') ? boxElement.style.backgroundColor : '0',
        currentBgCImage = (boxElement.style.backgroundImage !== '') ? boxElement.style.backgroundImage +  ' no-repeat center center' : '',
          currentBorderColor = (boxElement.style.borderColor!== '') ? boxElement.style.borderColor : '0',
          currentBorderWidth = (boxElement.style.borderWidth !== '') ? boxElement.style.borderWidth : '0',
          currentBorderStyle = (boxElement.style.borderStyle !== '') ? boxElement.style.borderStyle : 'none',
          currentBorderRadius = (boxElement.style.borderRadius !== '') ? boxElement.style.borderRadius : '0',
          currenBoxShadow = displayBoxShadowInputs(boxElement),
          checkedAuto = '',
          currentAligment = boxElement.dataset.boxalign;

      if (boxElement.dataset.boxtype !== 'col') {
        if (parseInt(boxElement.style.width) <= 100) {
          checkedAuto = '';
        } else {
          checkedAuto = 'checked';
        }
      } else {
        if (boxElement.dataset.colnum === 'auto') {
          checkedAuto = 'checked';
        } else {
          checkedAuto = '';
        }
      }


      let inputBoxSize = $('#box-width'),
        checkboxBoxSizeAuto = $('#box-width-auto'),
        inputPadding = $('.input__padding'),
        inputMargin = $('.input__margin'),
        inputBgColor = $('#bg-color-picker'),
        labelBgColor = $('#bg-color-picker-label'),
        bgColorWheel = $('#bgColorPicker'),
        previewBgImage = $('#bgImagePreview div'),
        inputBorderColor = $('#border-color'),
        inputBorderWidth = $('#border-width'),
        inputBorderStyle = $('#border-style'),
        inputBorderRadius = $('#border-radius'),
        inputBoxShadowX = $('#boxshadow-x'),
        inputBoxShadowY = $('#boxshadow-y'),
        inputBoxShadowBlur = $('#boxshadow-blur'),
        inputBoxShadowSpread = $('#boxshadow-spread'),
        inputBoxShadowColor = $('#boxshadow-color-picker'),  
        boxshadowColorWheel = $('#boxshadowColorPicker'),
        labelBoxShadowColor = $('#boxshadow-color-picker-label'),
        labelBoderColor = $('#border-color-picker-label'),
        navOption = $('.nav-option'),
        formOption = $('#form-option'),
        addNavItem = $('#add-nav-item'),
        deleteNavItem = $('.delete-nav-item'),
        navItemWrapper = $('.nav-item-input-wrapper'),
        navItemInput = $('.nav-item-input'),
        addFormItem = $('#add-form-item'),
        deleteFormItem = $('.delete-form-item'),
        formItemWrapper = $('.form-item-input-wrapper'),
        formItemInput = $('.form-item-input');

        //Ocultar las opciones del nav
        navOption.css('display', 'none');
        formOption.css('display', 'none');

        inputBoxSize.val(currentElWidth);

        inputPadding.each(el => {
          switch ($(el).attr('id')) {
            case 'padding-box-top':
              $(el).val(parseInt(currentPaddingTop));
              break;
            case 'padding-box-right':
              $(el).val(parseInt(currentPaddingRight));
              break;
            case 'padding-box-bottom':
              $(el).val(parseInt(currentPaddingBottom));
              break;
            case 'padding-box-left':
              $(el).val(parseInt(currentPaddingLeft));
              break;
          
            default:
              $(el).val(0);
              break;
          }
        });

      inputMargin.each(el => {

        switch ($(el).attr('id')) {
          case 'margin-box-top':
            $(el).val(parseInt(currentMarginTop));
            break;
          case 'margin-box-right':
            $(el).val(parseInt(currentMarginRight));
            break;
          case 'margin-box-bottom':
            $(el).val(parseInt(currentMarginBottom));
            break;
          case 'margin-box-left':
            $(el).val(parseInt(currentMarginLeft));
            break;
          default:
            $(el).val(0);
            break;
        }
      });

      // Oculta/Muestra la rueda de color al hacer click a la etiqueta label
      labelBgColor.off('click');
      labelBoxShadowColor.off('click');
      labelBoderColor.off('click');

      labelBgColor.click(() => {
        $('#bg-color-picker-dropdown').toggle();
      });

      labelBoxShadowColor.click(() => {
        $('#boxshadow-color-picker-dropdown').toggle();
      });

      labelBoderColor.click(() => {
        $('#border-color-picker-dropdown').toggle();
      });

      // Inicializa el plugin de la rueda de color del background
      $.farbtastic('#bgColorPicker').linkTo(color => {
        //this.linkTo('#bg-color-picker');
        inputBgColor
          .val(color)
          .css('background-color', color);
        inputBgColor.trigger('change');

        labelBgColor.css('background-color', color);
      });

      // Inicializa el plugin de la rueda de color del bordercolor
      $.farbtastic('#borderColorPicker').linkTo(color => {
        //this.linkTo('#bg-color-picker');
        inputBorderColor
          .val(color)
          .css('border-color', color);
        inputBorderColor.trigger('change');
        console.log(color);

        labelBoderColor.css('background-color', color);
      });

      inputBorderStyle.html('');
        
      inputBorderColor.val(currentBorderColor);
      inputBorderWidth.val(parseInt(currentBorderWidth));
      inputBorderStyle.append(displaySelectOptions(borderStylesArr,currentBorderStyle));
      inputBorderRadius.val(currentBorderWidth);

      inputBoxShadowX.val(parseInt(currenBoxShadow[0]));
      inputBoxShadowY.val(parseInt(currenBoxShadow[1]));
      inputBoxShadowBlur.val(parseInt(currenBoxShadow[2]));
      inputBoxShadowSpread.val(parseInt(currenBoxShadow[3]));
      inputBoxShadowColor.val(currenBoxShadow[4]);

      previewBgImage
        .css('background' , currentBgCImage)
        .css('background-size','contain');
      
      // Inicializa el plugin de la rueda de color del background
      $.farbtastic('#boxshadowColorPicker').linkTo(color => {
        //this.linkTo('#bg-color-picker');
        inputBoxShadowColor
          .val(color)
          .css('background-color', color);
        inputBoxShadowColor.trigger('change');

        labelBoxShadowColor.css('background-color', color);
      });
      
      //jQuery Time
      //Elimina los listener para volver asignarlos
      inputPadding.off('keyup mouseup');
      inputMargin.off('keyup mouseup');
      inputBgColor.off('change');
      $('.input__border-color, .input__border-width, .input-select__border-style, .input__border-radius').off('change');
      $('.input__boxshadow').off('change');
      $('.input__box-size').off('keyup mouseup');
      $('.input-radio__align').off('change');
      
      //Habilita los cambios en tiempo real
      inputPadding.on('keyup mouseup', (e) => this.padding(e));
      inputMargin.on('keyup mouseup', (e) => this.margin(e));
      inputBgColor.change(e => this.bg(e.target));
      $('.input__border-color, .input__border-width, .input-select__border-style, .input__border-radius').change(e => this.border(e));
      $('.input__boxshadow').change(e => this.boxshadow(e, currenBoxShadow));
      $('.input__box-size').on('keyup mouseup', (e) => this.boxsize(e));
     
      $('.input-radio__align').change((e) => this.align(e) );
      
      //Establece el valor de align
      $('.input-radio__align').each((index, el) => {
        (currentAligment === $(el).val()) ? $(el).prop('checked', true) : $(el).prop('checked', false);
      });

      
      // Si el usuario establece ancho automatico desabilita las opciones de cambiar el ancho
      checkboxBoxSizeAuto.change( e => {
        if ($(e.currentTarget).prop('checked')) {
          inputBoxSize.prop('disabled', true);

        
          inputBoxSize.val(100);
          boxElement.style.width = '100%';
          

        } else {
          inputBoxSize.prop('disabled', false);
          boxElement.style.width = '';
        }
      });

      if (checkboxBoxSizeAuto.prop('checked')) {
        inputBoxSize.prop('disabled', true);
 
        inputBoxSize.val(100);          
          
      } else {
        inputBoxSize
          .prop('disabled', false)
          .val($('.input__box-size').val());
      }

      if (boxElement.dataset.boxtype === 'section') {
        $('.sectionID').show();
        $('#sectionID').val(($(boxElement).attr('id') !== undefined ? $(boxElement).attr('id') : ''));
        $('#saveID').off('click');
        $('#sectionID').off('keyup');

        $('#sectionID').keyup( e => {
          let idVal = $(e.currentTarget).val();

          $(e.currentTarget).val(idVal.replace(/(^\s+|\s+$)/g, ''));
          
        });

        $('#saveID').click(e => {
          if ($('#sectionID').val() !== '') {
            $(boxElement).attr('id',  $('#sectionID').val());
            $(e.currentTarget)
              .prev()
              .hide();
          } else {

            $(e.currentTarget)
              .prev()
              .show();
          }
          
         
        });
      }


      /* Opciones para el menu de navegacion */
      if (boxElement.dataset.boxtype === 'nav') {

        /* Elimino los eventos y oculto aquellos inputs que no quiero que modifiquen al nav*/
        $('#upload-image').off('click');
        $('#upload-image').click(() => {
          let inputFile = $('#input-image');

          this.uploadImage(inputFile);

        });

        $('.img-files').off('click');

        $('.img-files').click((e) => {
          let targetEl = $(e.currentTarget);
          $('.img-files').removeClass('img-select');
          $(targetEl).addClass('img-select');
          $('#select-image').off('click');

          $('#select-image').click(e => this.addImgBrand(targetEl));

        });

        /*Muestra el menu para editar el menu de navigacion*/
        navOption.css('display', 'block');

        /* Crea un nuevo item al menu */
        addNavItem.off('click');
        addNavItem.click(e => this.addNavItem(e));

        /* Despliega el collapse */
        navItemInput.click(e => {
          let collapseContainer =  $(e.currentTarget).parent().siblings();
          collapseContainer.collapse('toggle');

          this.editNav(collapseContainer.find('.nav-item-edit'));

        });

        /* Elimina un item del menu */
        deleteNavItem.click(e => this.deleteNavItem(e));

        /* $('#navOptionsSortable').sortable({
          handle: '.sort-nav-item',
          items: '.nav-items-option-wrapper',
          update: (event, ui) => {
            let navListItem = $('.nav-item');
            console.log(ui.item.index());
            console.log($('.nav-item').eq(ui.item.attr('data-navitemindex')));

            $('.nav-item').eq(ui.item.attr('data-navitemindex'));
            
            //CREA LA FUNCION PARA AL ORDENAR ELEMENTOS DE LOS INPUTS TAMBIEN SE ORDENEN LOS DEL NAV
            navListItem.sort((a,b) => {
              let el1 = $(a).index(),
                  el2 = $(b).index();
              return el2 > el1;
            }).appendTo(navListItem.parent());

            
          }
        }); */
      

      }

      if (boxElement.dataset.boxtype === 'form') {
        // formOption
        // addFormItem
        // deleteFormItem
        // formItemWrapper
        // formItemInput
        formOption.css('display', 'block')
        addFormItem.off('click');
        addFormItem.click(e => this.addFormItem(e));

        formItemInput.off('click');
        formItemInput.click(e => {
          let collapseContainer = $(e.currentTarget).parent().next();
          collapseContainer.collapse('toggle');

          //SIGUES AQUI
          this.editForm(collapseContainer.find('.form-item-edit'));

        });
      }

      
      
    }
    
  }

  initResizableMode(boxElement) {
    
    if (boxElement.dataset.boxtype === 'section' || boxElement.dataset.boxtype === 'row') {
      $(boxElement).resizable({
      
        disabled:false,
        handles: 'e',
        start: (e, ui) => {
          $(ui.element).css('height', 'auto');
          if ($('#box-width-auto').prop('checked')) {
            $('#box-width-auto').click();
          }
          
        },
        stop: (e, ui) => {
          let parentEl = $(ui.element).parent(),
            parentWidth = parentEl.outerWidth(),
            currentElWidth = ui.size.width,
            widthPercentage = (currentElWidth * 100 / parentWidth);

          if (widthPercentage >= 100) {
            widthPercentage = 100;
          }

          $(ui.element).css('width', ((widthPercentage >= 100) ? 'auto' : widthPercentage + '%' ) );
          $(ui.element).css('height', 'auto'); 

          $('.input__box-size').val(widthPercentage);
        },
        resize: (e, ui) => {
          let parentEl = $(ui.element).parent(),
            parentWidth = parentEl.outerWidth(),
            currentElWidth = ui.size.width,
            widthPercentage = (currentElWidth * 100 / parentWidth);

          if (widthPercentage >= 100) {
            widthPercentage = 100;
          }

          $(ui.element).css('width', ((widthPercentage >= 100) ? 'auto' : widthPercentage + '%'));
          $(ui.element).css('height', 'auto');
          $('.input__box-size').val(widthPercentage);
          
        }
      });
    } else if (boxElement.dataset.boxtype === 'col') {

      //Haz que al cambiar el tamaño de una columna si hay mas columnas adentro cambien su tamaño tambien
      let container = $(boxElement).parent();
     
      console.log('Resizable col: ', container.find('.col-editable').length);

      $(boxElement).resizable({
        disabled: false,
        handles: 'e',
        start: (e, ui) => {
          $(ui.element).css('height', 'auto');
          
          $(boxElement).removeClass('col');


          if ($('#box-width-auto').prop('checked')) {
            $('#box-width-auto').click();
          }
        },
        stop: (e, ui) => {
          let parentEl = $(ui.element).parent(),
            parentWidth = parentEl.outerWidth(),
            currentElWidth = ui.size.width,
            widthPercentage = (currentElWidth * 100 / parentWidth);

          if (widthPercentage >= 100) {
            widthPercentage = 100;
          }

          $(ui.element).css('width', widthPercentage + '%');
          $(ui.element).css('height', 'auto');
        },
        resize: (e, ui) => {

          let parentEl = $(ui.element).parent(),
            parentWidth = parentEl.outerWidth(),
            currentElWidth = ui.size.width,
            widthPercentage = (currentElWidth * 100 / parentWidth);

          if (widthPercentage >= 100) {
            widthPercentage = 100;
          }

          $(ui.element).css('width', widthPercentage + '%');
          $(ui.element).css('height', 'auto');

          $('.input__box-size').val(widthPercentage);
        }
      });

    }     

  }

  initOptionBar() {
    const boxElement = this.element;
    let optionBarEl = document.querySelector('#element-option-bar'),
      optionBarWrapperEl = document.querySelector('#element-option-bar-wrapper'),
     panelElementBar = document.querySelector('#element-panel'),
      buttonOptionBarToggler = document.querySelector('#option-bar-toggler');

    //Muestra la barra de customizacion
    $('#element-option-bar-wrapper').addClass('active');
    $('.project-body').addClass('active');

    $('#option-bar-toggler').off('click');
    $('#option-bar-toggler').on('click', (e) => {
      $(e.currentTarget)
        .find('[data-fa-i2svg]')
        .toggleClass('fa-angle-right')
        .toggleClass('fa-angle-left');

      $('#element-option-bar-wrapper').toggleClass('active');
      $('.project-body').toggleClass('active');
    });
 
    $('.section-editable,.row-editable, .col-editable').resizable({disabled: true});

    if($(boxElement).hasClass('section-editable')) {
      $('.section-editable').removeClass('section-editable-selected');
      $(boxElement).addClass('section-editable-selected');

      $('.row-editable').removeClass('row-editable-selected');
      $('.col-editable').removeClass('col-editable-selected');
      $('.nav-editable').removeClass('nav-editable-selected');
      $('.form-editable').removeClass('form-editable-selected');
      
    } else if ( $(boxElement).hasClass('row-editable')) {
      $('.row-editable').removeClass('row-editable-selected');
      $(boxElement).addClass('row-editable-selected');

       $('.section-editable').removeClass('section-editable-selected');
      $('.col-editable').removeClass('col-editable-selected');
      $('.nav-editable').removeClass('nav-editable-selected');
      $('.form-editable').removeClass('form-editable-selected');


    } else if ($(boxElement).hasClass('col-editable')) {
      $('.col-editable').removeClass('col-editable-selected');
      $(boxElement).addClass('col-editable-selected');

      $('.section-editable').removeClass('section-editable-selected');
      $('.row-editable').removeClass('row-editable-selected');
      $('.nav-editable').removeClass('nav-editable-selected');
      $('.form-editable').removeClass('form-editable-selected');

    }  else if ($(boxElement).hasClass('nav-editable')) {
      $('.nav-editable').removeClass('nav-editable-selected');
      $(boxElement).addClass('nav-editable-selected');

      $('.section-editable').removeClass('section-editable-selected');
      $('.row-editable').removeClass('row-editable-selected');
      $('.col-editable').removeClass('col-editable-selected');
      $('.form-editable').removeClass('form-editable-selected');

    } else if ($(boxElement).hasClass('form-editable')) {
      $('.form-editable').removeClass('form-editable-selected');
      $(boxElement).addClass('form-editable-selected');

      $('.section-editable').removeClass('section-editable-selected');
      $('.row-editable').removeClass('row-editable-selected');
      $('.col-editable').removeClass('col-editable-selected');
      $('.nav-editable').removeClass('nav-editable-selected');

    } 

    this.renderOptionBar(optionBarEl, panelElementBar);
    this.initResizableMode(boxElement);
  }
}

module.exports = ElementOptionBar;

//Elementos que se podran editar
// Padding. (x)
// Margin. (x)
//   Background(tanto poner color, como imágenes y modificar la posición de las imágenes en la caja).
// Border y border - radius.
//   Position.
//   Top, left, right, bottom(se debe colocar con drop and drag).
//     Opacity.
