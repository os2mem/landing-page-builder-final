import ElementOptionBar from './element_option_bar.js';
import Quill from 'quill/core';
import { file } from 'babel-types';

//Crea la nueva landing Page
class LandingPage {
  constructor(name,_userid, config, workboard, toolbar) {
    this._userid = _userid;
    this.name = name;
    this.config = config;
    this.workboard = workboard;
    this.toolbar = new toolbar(this.name, 'workspaceid', this.workboard, 'toolConfig');
    //Bind funciones
    this.initToolBar = this.initToolBar.bind(this);
   // this.initTextEditor = this.initTextEditor.bind(this);
    this.landing = [];
  }
  
  addNavbar() {
    let navbar = this.toolbar.addNavbar(this.workboard);

    navbar .addEventListener('click', (e) => this.initElementOptionBar(e));

  }

  addSection() {
    //Uso la propiedad add section de la clase toolbar
    let section = this.toolbar.addSection(this.workboard);
         
    //Hacer la seccion droppable
    $(section).droppable({
      accept: '#toolbar-list .toolbar-list-item .toolbar-button',
      greedy:true,
      classes: {
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: (event, ui) => {
        if (ui.draggable[0].id === 'add-row') {
          console.log('Agregar fila');
          section.classList.remove('section-editable-initial')
          this.addRow(section);
        }
      }
    });

   $(section).sortable({
      handle: '.element-sort-helper-row',
      items: "> .row",
      placeholder: "ui-state-highlight",
      forcePlaceholderSize: true
    });
    

   section.addEventListener('click', (e) => this.initElementOptionBar(e));

    console.log('Se agrego section desde landingPage: ', section);
  }

  addRow(section) {
    let row = this.toolbar.addRow(section);
      
    console.log('objeto landing: ', this.landing);
    //console.log('objeto row', rowOp);

    $(row).droppable({
      accept: '#toolbar-list .toolbar-list-item .toolbar-button',
      greedy: true,
      classes: {
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: (event, ui) => {
        if (ui.draggable[0].id === 'add-col') {
          console.log('Agregar columna');
          row.classList.remove('row-editable-initial');
          this.addCol(row);
        }
      }
    });

    $(row).sortable({
      handle: '.element-sort-helper-col',
      items: "> .col-editable",
      placeholder: "ui-state-highlight",
      forcePlaceholderSize: true
    });
    //console.log('Se agrego section desde Row: ',row);
    //console.log(this.landing);

    row.addEventListener('click', (e) => this.initElementOptionBar(e));
  }

  //Agrega una columna, las columnas admiten imagenes, parrafos y titulos
  addCol(row) {
    let col = this.toolbar.addCol(row);

    $(col).droppable({
      accept: '#toolbar-list .toolbar-list-item .toolbar-button',
      greedy: true,
      classes: {
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: (event, ui) => {
        if (ui.draggable[0].id === 'add-par') {
          console.log('Agregar Parrafo');
          col.classList.remove('col-editable-initial');
          this.addPar(col);
        } else if (ui.draggable[0].id === 'add-title') {
          col.classList.remove('col-editable-initial');
          this.addTitle(col);
        } else if (ui.draggable[0].id === 'add-img') {
          this.addImg(col);
        } else if (ui.draggable[0].id === 'add-form') {
          col.classList.remove('col-editable-initial');
          this.addForm(col);
        }
      }
    });

    $(col).sortable({
      handle: '.sort-text, .element-sort-helper-form',
      placeholder: "ui-state-highlight",
      forcePlaceholderSize: true
    });

    col.addEventListener('click', e => this.initElementOptionBar(e));
      
  }

  addPar(col) {
    let par = this.toolbar.addPar(col),
      textSample = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam massa neque, tempus ut accumsan at, aliquet sollicitudin diam. Aenean sed sagittis quam, quis accumsan est. Donec ultricies tempus nulla sed semper. Donec quam felis, efficitur vel ipsum vitae, aliquam egestas nunc. Proin porttitor vehicula libero.';
    
    this.initTextEditor(par, [{insert: textSample}]);
    
  }

  addTitle(col) {
    let title = this.toolbar.addTitle(col);

    this.initTitleEditor(title);
  }

  addForm(col) {
    let form = this.toolbar.addForm(col);

    form.addEventListener('click', e => this.initElementOptionBar(e));
    console.log(form);


  }

  uploadImage(inputFile) {

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
            throw new Error('Tipo de imagen no correcta');
          } else if (fl.size > MAX_BYTES) {
            throw new Error('Supera el tamaño maximo');
          } else {
            let filesContent = document.querySelector('#modal-files-content'),
              tpl = `
                    <tr>
                      <td>${fl.name}</td>
                      <td>${(fl.size / (1024 * 1024)).toFixed(2)} MB</td>
                      <td>
                        <div class="progress">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
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
            console.log('Exito');
          },
          error: (data) => {
            console.log(data);
          }
        }); 

      } catch (error) {
        console.log(error.message);
      }

    });

  }

  addImg(col) {

    $('#modal-select-img').modal('show');

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
      $('#select-image').click(e => {
        let src = $(targetEl).attr('data-imglocation'),
            newImgElement = this.toolbar.addImg(src, col);

        console.log('Haz agreado una imagen', src);
        newImgElement.addEventListener('click', e => console.log('es una imagen'));
        $('#modal-select-img').modal('hide');
          
      });

    });
  }

  initTitleEditor(title) {
    let textToolbarOptions = [{ 'header': [1, 2, 3, 4, false] },'bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'background': [] }],
      options = {
        debug: false,
        modules: {
          toolbar: textToolbarOptions
        },
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow'
      },
      editor = new Quill(title, options),
      textSample = 'Title Sample',
      closeToolbarIcon = `<span class="close-edit-title-toolbar"><i class="fas fa-times"></i></span>`;

    editor.setContents([
      { insert: textSample, attributes: { bold: true, header: 1} },
      { insert: '\n', attributes: { header: 1 } }
    ]);

    title.previousSibling.insertAdjacentHTML('beforeend', closeToolbarIcon);

    title.addEventListener('focus', () => {
      //console.log('focus', par.previousSibling);
      
      $('.ql-toolbar').each(function (index) {
        console.log($(this));
        $(this).hide();
      });

      title.previousSibling.style.display = 'block';
      editor.enable(true);
    });

    $('.close-edit-title-toolbar').click(e => {
      e.stopPropagation();
      e.currentTarget.parentElement.style.display = 'none';
    });

  }

  initTextEditor(par, textArr) {
    let textToolbarOptions = ['bold', 'italic', 'underline', 'strike', { size: ['small', false, 'large', 'huge'] }, { 'color': [] }, { 'background': [] }],
      options = {
        debug: false,
        modules: {
          toolbar: textToolbarOptions
        },
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow'
      },
      editor = new Quill(par, options),
      closeToolbarIcon = `<span class="close-edit-text-toolbar"><i class="fas fa-times"></i></span>`;

    editor.setContents(textArr);


    par.previousSibling.insertAdjacentHTML('beforeend', closeToolbarIcon);

    par.addEventListener('focus', () => {
      //console.log('focus', par.previousSibling);
      //jQuery Time
      $('.ql-toolbar').each(function(index) {
        console.log($(this));
        $(this).hide();
      });

      par.previousSibling.style.display = 'block';
      editor.enable(true);

    });     

    $('.close-edit-text-toolbar').click(e => {
      e.stopPropagation();
      e.currentTarget.parentElement.style.display = 'none';
    });


  }

  initToolBar(toolbarNav) {
    
    //vuelve al workboard un elemento droppable
    $(this.workboard).droppable({
      accept: '#toolbar-list .toolbar-list-item .toolbar-button',
      greedy: true,
      classes:{
        "ui-droppable-hover": "ui-state-hover"
      } ,
      drop: (event, ui) => {
        $(event.target).removeClass('ui-placed-section-highlight');
        //Cuando un elemento de la barra de herramientas es soltado encima del workboard inicializo la opcion correspondiente
        if (ui.draggable[0].id === 'add-sec') {
          this.workboard.classList.remove('workboard-initial');
          this.addSection();
          
        } else if (ui.draggable[0].id === 'add-nav') {
          let navbars = $('#workboard').find('.navbar');

          if (navbars.length > 0) {
            alert('No puede existir mas de una barra de navegación!');
          } else {
            this.workboard.classList.remove('workboard-initial');
            this.addNavbar();
          }
          
        }

        //console.dir(ui.draggable[0].id);
      },
      //Agrega una clase que indica donde se va a insertar la seccion
      over: function (event, ui) { 
        if (ui.draggable[0].id === 'add-sec') {
          console.log(event.target);
          $(event.target).addClass('ui-placed-section-highlight');
        }
        
      },
      //Quita la clase ui-placed-section-highlight despues de que se dispare el event over
      out: function (event, ui) { 
        $(event.target).removeClass('ui-placed-section-highlight');
      }
    });

    $(this.workboard).sortable({
      handle: '.element-sort-helper-section, .element-sort-helper-nav',
      placeholder: "ui-state-highlight",
      forcePlaceholderSize: true,
      tolerance: "pointer",
      containment: $('.project-body')
    });



    //vuelve al toobar draggable
    $(toolbarNav).find('.toolbar-button').draggable({ 
      opacity: 0.8,
      helper: 'clone',
      appendTo: 'body'
    });
  }

  initElementOptionBar(e) {
    e.stopPropagation();
    let target = e.currentTarget,
        OptionBar = new ElementOptionBar(target);    
    
    OptionBar.initOptionBar();
  }
  
  save(button) {
    button.addEventListener('click', e => {
      e.preventDefault();
      console.log(this.workboard.innerHTML);
      let cloneHtml = $(this.workboard).clone();
    

      cloneHtml.find('.col-editable').find('.par-container').each( (i, el) => {
        console.log();
        let parCl = $(el).find('.ql-editor').html();
        $(el).html(parCl);
        console.log(parCl);
      });

      cloneHtml.find('.col-editable').find('.title-container').each((i, el) => {
        console.log();
        let parCl = $(el).find('.ql-editor').html();
        $(el).html(parCl);
        console.log(parCl);
      });

      cloneHtml.find('.section-editable').find('.ui-resizable-handle').remove();
      cloneHtml.find('.row-editable').find('.ui-resizable-handle').remove();
      cloneHtml.find('.col-editable').find('.ui-resizable-handle').remove();

      cloneHtml.find('.nav-editable').find('.ui-resizable-handle').remove();

      cloneHtml.find('.section-editable').removeClass('ui-resizable ui-resizable-disabled');
      cloneHtml.find('.row-editable').removeClass('ui-resizable ui-resizable-disabled');
      cloneHtml.find('.col-editable').removeClass('ui-resizable ui-resizable-disabled');

      cloneHtml.find('.section-editable').find('.element-sort-helper-col').remove();
      cloneHtml.find('.section-editable').find('.element-sort-helper-row').remove();
      cloneHtml.find('.section-editable').find('.element-sort-helper-section').remove();

      cloneHtml.find('.nav-editable').find('.element-sort-helper-nav').remove();

      cloneHtml.find('.section-editable').removeClass('section-editable section-editable-initial ui-droppable ui-sortable').removeAttr('data-boxtype data-boxalign');
      cloneHtml.find('.row-editable').removeClass('row-editable row-editable-initial ui-droppable ui-sortable').removeAttr('data-boxtype data-boxalign');
      cloneHtml.find('.col-editable').removeClass('col-editable col-editable-initial ui-droppable ui-sortable').removeAttr('data-boxtype data-boxalign');
      cloneHtml.find('.nav-editable').removeClass('nav-editable nav-editable-selected').removeAttr('data-boxtype data-boxalign');
      
      let landing = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport", content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible", content="ie=edge">
    <title>Title of the document</title>
    <link rel="stylesheet" href="/dist/css/css.bundle.css">
  </head>

  <body>
  ${cloneHtml.html()}
  </body>
</html>
      `;

      let obj = { 
        landingPrev: landing,
        landingBuild: this.workboard.innerHTML
       };

      $.ajax({
        url: '/create-landing/save', 
        data: obj,
        type: 'POST',
        success: function (result) {
          alert(result.message);
        },
        error: (result) => {
          alert(result.message);
        }
      });
    });
  }

  preview(button) {
    button.addEventListener('click',  e=> {
      e.preventDefault();
      window.open(`${window.location}/preview`);

    });
  }

  initSavedElements() {
    let workboard = $(this.workboard);

    workboard.find('.section-editable').each((i, section) => {
      console.log($(section));

      $(section).droppable({
        accept: '#toolbar-list .toolbar-list-item .toolbar-button',
        greedy: true,
        classes: {
          "ui-droppable-hover": "ui-state-hover"
        },
        drop: (event, ui) => {
          if (ui.draggable[0].id === 'add-row') {
            console.log('Agregar fila');
            section.classList.remove('section-editable-initial')
            this.addRow(section);
          }
        }
      });

      $(section).sortable({
        handle: '.element-sort-helper-row',
        items: "> .row",
        placeholder: "ui-state-highlight",
        forcePlaceholderSize: true
      });

      $(section).find('.row-editable').each((i, row) => {
        $(row).droppable({
          accept: '#toolbar-list .toolbar-list-item .toolbar-button',
          greedy: true,
          classes: {
            "ui-droppable-hover": "ui-state-hover"
          },
          drop: (event, ui) => {
            if (ui.draggable[0].id === 'add-col') {
              console.log('Agregar columna');
              row.classList.remove('row-editable-initial');
              this.addCol(row);
            }
          }
        });

        $(row).sortable({
          handle: '.element-sort-helper-col',
          items: "> .col-editable",
          placeholder: "ui-state-highlight",
          forcePlaceholderSize: true
        });

        $(row).find('.col-editable').each((i,col) => {
          $(col).droppable({
            accept: '#toolbar-list .toolbar-list-item .toolbar-button',
            greedy: true,
            classes: {
              "ui-droppable-hover": "ui-state-hover"
            },
            drop: (event, ui) => {
              if (ui.draggable[0].id === 'add-par') {
                console.log('Agregar Parrafo');
                col.classList.remove('col-editable-initial');
                this.addPar(col);
              } else if (ui.draggable[0].id === 'add-title') {
                col.classList.remove('col-editable-initial');
                this.addTitle(col);
              } else if (ui.draggable[0].id === 'add-img') {
                this.addImg(col);
              } else if (ui.draggable[0].id === 'add-form') {
                col.classList.remove('col-editable-initial');
                this.addForm(col);
              }
            }
          });

          $(col).sortable({
            handle: '.sort-text, .element-sort-helper-form',
            placeholder: "ui-state-highlight",
            forcePlaceholderSize: true
          });

          $(col).find('.par-container .par-wrapper').each((i,par) => {
            par.addEventListener('focus', () => {
              //console.log('focus', par.previousSibling);
              //jQuery Time
              $('.ql-toolbar').each(function (index) {
                $(this).hide();
              });

              par.previousSibling.style.display = 'block';

              $('.close-edit-text-toolbar').off('click');

              $('.close-edit-text-toolbar').click(e => {
                e.stopPropagation();
                e.currentTarget.parentElement.style.display = 'none';
              });
            });  
          });

         $(col).find('.title-container .title-wrapper').each((i, title) => {
           title.addEventListener('focus', () => {
             //jQuery Time
             $('.ql-toolbar').each(function (index) {
               $(this).hide();
             });

             title.previousSibling.style.display = 'block';

             $('.close-edit-text-toolbar').off('click');

             $('.close-edit-text-toolbar').click(e => {
               e.stopPropagation();
               e.currentTarget.parentElement.style.display = 'none';
             });
           });  
          }); 

          col.addEventListener('click', e => this.initElementOptionBar(e));
        });
        row.addEventListener('click', e => this.initElementOptionBar(e));
      });

      section.addEventListener('click', e => this.initElementOptionBar(e));
    });
    workboard.find('.navbar').each((i, nav) => {
      nav.addEventListener('click', e => this.initElementOptionBar(e));
    });
  }

  init() { 
    let toolbarNav = document.querySelector('#toolbar-list'),
        saveButton = document.querySelector('#save'),
        previewButton = document.querySelector('#btn-preview');

    //Peticion para landing page guardadas
    $.ajax({
      url: '/create-landing/read',
      type: 'GET',
      success: (result) => {
        let workboard = $(result.landing);
        $(this.workboard).append(workboard);
        console.log($(this.workboard).length);
        if ($(this.workboard).length !== 0) {
          $(this.workboard).removeClass('workboard-initial');
          this.initSavedElements();
        }
        console.log(workboard);
      }
    });
    //Inicialieza la barra de herramientas
    this.initToolBar(toolbarNav);
    this.save(saveButton);
    this.preview(previewButton);

  }
    
  }

export default LandingPage;

