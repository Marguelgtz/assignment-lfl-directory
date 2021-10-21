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

export default {
  cardTemplate,
  singleCardTemplate,
  editCardTemplate,
  addCardTemplate,
};
