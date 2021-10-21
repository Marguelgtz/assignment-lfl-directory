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

const addCardTemplate = () => `
  <div class="employeeSingleCard">
            <label
              >Name: <input type="text" id="nameInput" placeholder="name"
            /></label>

            <div class="cardTitle"></div>

            <label
              >Phone: <input type="text" id="phoneInput" placeholder="Phone Number"
            /></label>
            <label
              >Ofiice: <input type="text" id="officeInput" placeholder="Office Number"
            /></label>

            <div class="cardBottom">
              <a class="button" href="/#/employees">Cancel</a>
              <div id="addButton" class="button">Add</div>
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
      model.employees = result;
    });
    if (searchState === "") model.employees = employees;
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
    // console.log("edcxitt", console.log(model.employee));
    return editCardTemplate(model.employee, router.params[1]);
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
      (e) => (employeeObject.phoneNum = officeInput.value)
    );

    //buttons
    const editButton = document.querySelector("#editButton");

    editButton.addEventListener("click", () => {
      console.log(employeeObject);
      // const newArr = employeeList.map((employee) =>
      //   employeeList[router.params[1]] === employee ? employeeObject : employee
      // );
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
    console.log("fire view");
    return addCardTemplate();
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
      console.log(employeeList);
      location.replace("#/employees");
    });
  },
});

//Routes
router.addRoute("employees", "^#/employees$");
router.addRoute("employee", "^#/employees/([0-9]+)$");
router.addRoute("editEmployee", "^#/employees/edit/([0-9]+)$");
router.addRoute("addEmployee", "^#/employees/add$");

app.showComponent("employees");
