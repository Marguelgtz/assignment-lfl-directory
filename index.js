import App from "./lib/app.js";
import employeeList from "./employee-list.js";
const app = new App("#app");

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

app.showComponent("employees");
