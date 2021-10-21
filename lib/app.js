// Your work here
class App {
  constructor(selector) {
    this.appElement = document.querySelector(selector);

    this.components = {};
  }

  addComponent(component) {
    //add component to object
    this.components[component.name] = component;
  }

  showComponent(name) {
    //set current component
    this.currentComponent = this.components[name];
    this.updateView();
  }

  updateView() {
    //if there is a current component add html to appelement
    if (this.currentComponent) {
      this.appElement.innerHTML = this.currentComponent.view(
        this.currentComponent.model
      );
    }
  }
}

export default App;
