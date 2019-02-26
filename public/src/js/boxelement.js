//Plantilla para la creacion de cajas 
class BoxElement {
  constructor() {
    
  }

  //Crea una seccion
  section() {
    let element = document.createElement('section'),
        elementSortHelper = document.createElement('div');

    element.setAttribute('class', 'container-fluid section-editable');
    element.setAttribute('data-boxtype', 'section');
    element.classList.add('section-editable-initial');
    element.setAttribute('data-boxalign', 'center');

    elementSortHelper.setAttribute('class', 'element-sort-helper-section');

    element.appendChild(elementSortHelper);

    return element;
  }

  //Crea una fila que siempre debe ir dentro de una seccion
  row() {
    let element = document.createElement('div'),
        elementSortHelper = document.createElement('div');

    element.setAttribute('class', 'row row-editable');
    element.setAttribute('data-boxtype', 'row');
    element.setAttribute('data-boxalign', 'center');

    elementSortHelper.setAttribute('class', 'element-sort-helper-row');

    element.classList.add('row-editable-initial');

    element.appendChild(elementSortHelper);
    
    return element;
  }

  //Crea una columna que siempre debe ir dentro de una fila
  col() {
    let element = document.createElement('div'),
    elementSortHelper = document.createElement('div');

    element.setAttribute('class', 'col col-editable');
    element.setAttribute('data-boxtype', 'col');
    element.setAttribute('data-colnum', 'auto');
    element.setAttribute('data-boxalign', 'center');

    element.classList.add('col-editable-initial');

    elementSortHelper.setAttribute('class', 'element-sort-helper-col');
    element.appendChild(elementSortHelper);

    return element;
  }

  par() {
    let textContainerElement = document.createElement('div');
        //textElement = document.createElement('p');

    // textElement.contentEditable = true;

    // if (this.id !== 'default') {
    //   textElement.setAttribute('id', this.id);
    // }

    textContainerElement .setAttribute('class', 'par-wrapper');
    textContainerElement .setAttribute('data-boxtype', 'par-wrapper');
    textContainerElement.contentEditable = true;
    //Clases inicales de los textelements
    // textElement.setAttribute('class', 'par par-editable');
    // textElement.setAttribute('data-boxtype', 'par');

    // textContainerElement.appendChild(textElement);

    return textContainerElement ;

  }

  title() {
    let titleContainerElement = document.createElement('div');

    titleContainerElement.setAttribute('class', 'title-wrapper');
    titleContainerElement.setAttribute('data-boxtype', 'title-wrapper');
    titleContainerElement.contentEditable = true;

    return titleContainerElement;

  }

  navbar() {
    let navbar = document.createElement('nav'),
        navbarBrand = document.createElement('a'),
        navbarToggler = document.createElement('button'),
        navbarTogglerIcon = document.createElement('span'),
        navbarCollapse = document.createElement('div'),
        navbarNav = document.createElement('ul'),
        initialNavbarItem = document.createElement('li'),
        initialNavbarLink = document.createElement('a'),
        navSortHelper = document.createElement('div');

    navSortHelper.setAttribute('class', 'element-sort-helper-nav');

    navbar.classList.add('navbar','navbar-expand-lg', 'nav-editable');
    navbar.setAttribute('data-boxtype', 'nav');
    navbarBrand.classList.add('navbar-brand');
    navbarToggler.classList.add('navbar-toggler');
    navbarTogglerIcon.classList.add('navbar-toggler-icon');
    navbarCollapse.classList.add('collapse', 'navbar-collapse');
    navbarNav.classList.add('navbar-nav', 'mr-auto');
    initialNavbarItem.classList.add('nav-item','active');
    initialNavbarLink.classList.add('nav-link');

    navbarBrand.setAttribute('href' , '#');
    navbarToggler.setAttribute('data-toggle', 'collapse');
    navbarToggler.setAttribute('data-target', '');

    initialNavbarLink.textContent = 'HOME';
    navbarBrand.textContent = 'LOGO'

    initialNavbarItem.appendChild(initialNavbarLink);
    navbarNav.appendChild(initialNavbarItem);
    navbarCollapse.appendChild(navbarNav);

    navbarToggler.appendChild(navbarTogglerIcon);

    navbar.appendChild(navbarBrand);
    navbar.appendChild(navbarToggler);
    navbar.appendChild(navbarCollapse);

    navbar.appendChild(navSortHelper);

    return navbar;
  }

  link() {
    let linkElement = document.createElement('a');

  }

  img(src) {
    let newImg = document.createElement('img'),
        wrapper = document.createElement('figure');

    wrapper.setAttribute('class', 'figure');
    newImg.setAttribute('class', 'figure-img', 'img-fluid');

    newImg.setAttribute('src', src);
    wrapper.appendChild(newImg);

    return wrapper;
  }

  form() {
    let newForm = document.createElement('form'),
        inputRow = document.createElement('div'),
        inputCol = document.createElement('div'),
        submitRow = document.createElement('div'),
        submitCol = document.createElement('div'),
        inputEl = document.createElement('input'),
        labelEl = document.createElement('label'),
        submitEl = document.createElement('button'),
        formSort = document.createElement('div');

    formSort.setAttribute('class', 'element-sort-helper-form');
    newForm.setAttribute('action' , '/');
    newForm.setAttribute('method', 'POST');
    newForm.setAttribute('class', 'form-editable');
    newForm.setAttribute('data-boxtype', 'form');

    labelEl.setAttribute('for', 'inputEmail');
    labelEl.textContent = 'Email';

    inputEl.setAttribute('type', 'email');
    inputEl.setAttribute('id', 'inputEmail');
    inputEl.setAttribute('class', 'form-control');
    inputEl.setAttribute('placeholder', 'email@vieweb.com');
    inputEl.setAttribute('required', true);


    inputRow.setAttribute('class', 'form-group row');
    inputCol.setAttribute('class', 'col-12');
    submitRow.setAttribute('class', 'form-group row');
    submitCol.setAttribute('class', 'col-12');

    submitEl.setAttribute('class', 'btn btn-form');
    submitEl.setAttribute('type', 'submit');
    submitEl.textContent = 'submit';

    inputCol.appendChild(labelEl);
    inputCol.appendChild(inputEl);
    inputRow.appendChild(inputCol);

    submitCol.appendChild(submitEl);
    submitRow.appendChild(submitCol);

    newForm.appendChild(formSort);
    newForm.appendChild(inputRow);
    newForm.appendChild(submitRow);

    return newForm;

  }
}

export default BoxElement;