import App from "./lib/app.js";
import Router from "./lib/router.js";
import employeeList from "./employee-list.js";

const app = new App("#app");
const router = new Router(app);

const cardTemplate = (employee, i) => `
<a class="employeeCard" href="#/employees/${i}">
            <div class="cardTitle">${employee.name}</div>

            <div class="cardTop">
              <p>Phone: ${employee.phoneNum}</p>    <p>Office: ${employee.officeNum}</p>
            </div>
          </a>
  `;

app.addComponent({
  name: "employees",
  model: {
    employees: [],
  },
  view(model) {
    return `
      <div class="employeesCont">
        ${model.employees
          .map((employee, i) => cardTemplate(employee, i))
          .join("")}
      </div>
    `;
  },
  async controller(model) {
    const employees = employeeList;
    model.employees = employees;
  },
});

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

    //functionality
  },
});

//Routes
router.addRoute("employees", "^#/employees$");
router.addRoute("employee", "^#/employees/([0-9]+)$");

app.showComponent("employees");
