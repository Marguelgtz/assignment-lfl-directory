class Router {
  constructor(app) {
    this.app = app;
    this.routes = [];
    //listen for hash change or page reload
    this.hashChange = this.hashChange.bind(this);
    window.addEventListener("hashchange", this.hashChange);
    window.addEventListener("DomContentLoaded", this.hashChange);
  }
  // add route to routes arr
  addRoute(name, path) {
    this.routes.push({ name, path });
  }

  hashChange() {
    const { hash } = window.location;
    console.log(this.routes);
    //if hash change find route depending on path
    const route = this.routes.find((route) => {
      console.log(route.path);
      return hash.match(new RegExp(route.path));
    });
    // If there is a route that matches show that component
    if (route) {
      const params = new RegExp(route.path).exec(hash);
      this.params = params;
      this.app.showComponent(route.name);
    }
  }
}

export default Router;
