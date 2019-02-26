import BoxElement from "./boxelement.js"

//Barra de herramientas 
class ToolBar {
  constructor(workspacename, workspaceid, workspaceEl, toolConfig) {
    this.workspaceid = workspaceid;
    this.workspacename = workspacename;
    this.toolConfig = toolConfig;
    this.workspaceEl = workspaceEl;
    this.boxElement = new BoxElement();
  }

  addSection(workboardEl) {
    let newElement = this.boxElement.section();

    workboardEl.appendChild(newElement);

    return newElement;
  }

  addRow(parentEl) {
    let newElement = this.boxElement.row();

    parentEl.appendChild(newElement);

    return newElement;
  }

  addCol(parentEl) {
    let newElement = this.boxElement.col();

    parentEl.appendChild(newElement);

    return newElement;
  }

  addPar(parentEl) {
    let newTextElement = this.boxElement.par(),
        wrapper = document.createElement('div'),
    iconSort = `<span class="sort-text"><i class="fas fa-arrows-alt"></i></span>`;

    //AGREGAR EL ICONO PARA PODER HACER LOS PARRADOA SORTABLES
    wrapper.setAttribute('class', 'par-container');
    wrapper.appendChild(newTextElement);
    wrapper.insertAdjacentHTML('afterbegin', iconSort);
    parentEl.appendChild(wrapper);

    return newTextElement;
  }

  addTitle(parentEl) {
    let newTitleElement = this.boxElement.title(),
       wrapper = document.createElement('div'),
    iconSort = `<span class="sort-text"><i class="fas fa-arrows-alt"></i></span>`;

    wrapper.setAttribute('class', 'title-container');
    wrapper.appendChild(newTitleElement);
    wrapper.insertAdjacentHTML('afterbegin', iconSort);
    parentEl.appendChild(wrapper);

    return newTitleElement;
  }

  addNavbar(workboardEl) {
    let newNavbarElement = this.boxElement.navbar();

    workboardEl.appendChild(newNavbarElement);

    return newNavbarElement;
  }

  addImg(src ,parentEl){
    let newImgElement = this.boxElement.img(src);  

    parentEl.appendChild(newImgElement);

    return newImgElement;
  }

  addForm(parentEl) {
    let newFormElement = this.boxElement.form();

    parentEl.appendChild(newFormElement);

    return newFormElement;

  }

}

export default ToolBar;