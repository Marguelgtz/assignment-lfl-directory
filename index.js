import App from "./lib/app.js";
import Router from "./lib/router.js";
import employeeList from "./employee-list.js";
import templates from "./templates.js";

const app = new App("#app");
const router = new Router(app);

app.addComponent({
  name: "employees",
  model: {
    searchActive: false,
    employees: [],
  },
  view(model) {
    return `
      <div class="employeesCont">
        ${model.employees
          .map((employee, i) =>
            templates.cardTemplate(employee, i, model.searchActive)
          )
          .join("")}
      </div>
    `;
  },
  async controller(model) {
    const employees = employeeList;
    let searchState = "";
    const searchInput = document.querySelector("#navInput");
    searchInput.addEventListener("input", (e) => {
      searchState = searchInput.value;

      let result = employeeList.filter((employee) =>
        employee.name.toLowerCase().includes(searchState.toLowerCase()) ||
        employee.phoneNum.toLowerCase().includes(searchState.toLowerCase())
          ? employee
          : null
      );
      model.searchActive = true;
      model.employees = result;
    });
    if (searchState === "") {
      model.search = true;
      model.employees = employees;
    }
  },
});

app.addComponent({
  name: "employee",
  model: {
    employee: {},
  },
  view(model) {
    return templates.singleCardTemplate(model.employee, router.params[1]);
  },
  async controller(model) {
    model.employee = employeeList[router.params[1]];
    model.employee = employeeList[router.params[1]];

    const deleteButton = document.querySelector("#deleteButton");

    deleteButton.addEventListener("click", () => {
      employeeList.splice(router.params[1], 1);
      location.replace("#/employees");
    });
  },
});

app.addComponent({
  name: "employeeSearch",
  model: {
    employee: {},
  },
  view(model) {
    return templates.singleCardTemplate(
      model.employee,
      router.params[1],
      router.params[0].includes("search")
    );
  },
  async controller(model) {
    model.employee = employeeList[router.params[1]];
    model.employee = employeeList[router.params[1]];

    const deleteButton = document.querySelector("#deleteButton");

    deleteButton.addEventListener("click", () => {
      employeeList.splice(router.params[1], 1);
      location.replace("#/employees");
    });
  },
});

app.addComponent({
  name: "editEmployee",
  model: {
    employee: {},
  },
  view(model) {
    return templates.editCardTemplate(
      model.employee,
      router.params[0].includes("search")
    );
  },
  async controller(model) {
    const currentEmployee = employeeList[router.params[1]];
    model.employee = currentEmployee;
    const nameInput = document.querySelector("#nameInput");
    const phoneInput = document.querySelector("#phoneInput");
    const officeInput = document.querySelector("#officeInput");

    let employeeObject = {
      name: currentEmployee.name,
      phoneNum: currentEmployee.phoneNum,
      officeNum: currentEmployee.officeNum,
    };

    nameInput.addEventListener("input", (e) => {
      employeeObject.name = nameInput.value;
    });
    phoneInput.addEventListener(
      "input",
      (e) => (employeeObject.phoneNum = phoneInput.value)
    );
    officeInput.addEventListener(
      "input",
      (e) => (employeeObject.officeInput = officeInput.value)
    );

    //buttons
    const editButton = document.querySelector("#editButton");

    editButton.addEventListener("click", () => {
      employeeList.splice(router.params[1], 1, employeeObject);
      location.replace("#/employees");
    });
  },
});

app.addComponent({
  name: "addEmployee",
  model: {
    employee: {},
  },
  view(model) {
    return templates.addCardTemplate();
  },
  async controller(model) {
    const nameInput = document.querySelector("#nameInput");
    const phoneInput = document.querySelector("#phoneInput");
    const officeInput = document.querySelector("#officeInput");

    let employeeObject = {
      name: "",
      phoneNum: "",
      officeNum: "",
    };

    nameInput.addEventListener("input", (e) => {
      employeeObject.name = nameInput.value;
    });
    phoneInput.addEventListener(
      "input",
      (e) => (employeeObject.phoneNum = phoneInput.value)
    );
    officeInput.addEventListener(
      "input",
      (e) => (employeeObject.phoneNum = officeInput.value)
    );

    //buttons
    const addButton = document.querySelector("#addButton");

    addButton.addEventListener("click", () => {
      employeeList.push(employeeObject);
      location.replace("#/employees");
    });
  },
});

//Routes
router.addRoute("employees", "^#/employees$");
router.addRoute("employee", "^#/employees/([0-9]+)$");
router.addRoute("editEmployee", "^#/employees/edit/([0-9]+)$");
//search alternative
router.addRoute("employeeSearch", "^#/employees/search/([0-9]+)$");
router.addRoute("editEmployee", "^#/employees/search/edit/([0-9]+)$");

router.addRoute("addEmployee", "^#/employees/add$");

app.showComponent("employees");
