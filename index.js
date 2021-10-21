import App from "./lib/app.js";
import Router from "./lib/router.js";
import employeeList from "./employee-list.js";

const app = new App("#app");
const router = new Router(app);

//templates
const cardTemplate = (employee, i) => `
<a class="employeeCard" href="#/employees/${i}">
            <div class="cardTitle">${employee.name}</div>

            <div class="cardTop">
              <p>Phone: ${employee.phoneNum}</p>    <p>Office: ${employee.officeNum}</p>
            </div>
          </a>
  `;

const singleCardTemplate = (employee, i) => `
<div class="employeeSingleCard">
            <div class="cardTitle">${employee.name}</div>

            <div class="cardTop">
              <p>Phone: ${employee.phoneNum}</p>    <p>Office: ${employee.officeNum}</p>
            </div>
            <div class="cardBottom">
              <a class="button" href="#/employees/edit/${i}">Edit</a>
              <div class="button" id="deleteButton">Delete</div>
            </div>
          </div>
  `;

const editCardTemplate = (employee, i) => `
  <div class="employeeSingleCard">
            <label
              >Name: <input type="text" id="nameInput" placeholder="${employee.name}"
            /></label>

            <div class="cardTitle"></div>

            <label
              >Phone: <input id="phoneInput" type="text" placeholder="${employee.phoneNum}"
            /></label>
            <label
              >Ofiice: <input type="text"  id="officeInput" placeholder="${employee.officeNum}"
            /></label>

            <div class="cardBottom">
              <a class="button" href="/#/employees">Cancel</a>
              <div class="button" id="editButton">Submit</div>
            </div>
          </div>
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

app.addComponent({
  name: "editEmployee",
  model: {
    employee: {},
  },
  view(model) {
    // console.log("edcxitt", console.log(model.employee));
    return editCardTemplate(model.employee, router.params[1]);
  },
  async controller(model) {
    const currentEmployee = employeeList[router.params[1]];
    model.employee = currentEmployee;

    //funcitonality
  },
});

//Routes
router.addRoute("employees", "^#/employees$");
router.addRoute("employee", "^#/employees/([0-9]+)$");
router.addRoute("editEmployee", "^#/employees/edit/([0-9]+)$");

app.showComponent("employees");
