import App from "./lib/app.js";

const app = new App("#app");

app.addComponent({
  name: "employee",
  model: {
    employee: {},
  },
  view(model) {
    console.log("fire view");
    return singleCardTemplate(model.employee, router.params[1]);
  },
  async controller(model) {
    model.employee = employeeList[router.params[1]];

    const deleteButton = document.querySelector("#deleteButton");

    deleteButton.addEventListener("click", () => {
      employeeList.splice(router.params[1], 1);
      location.replace("#/employees");
    });
  },
});
