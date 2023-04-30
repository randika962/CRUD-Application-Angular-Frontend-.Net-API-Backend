using EmployeesManager.API.Data;
using EmployeesManager.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeesManager.API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class EmployeementController : Controller
    {
        private readonly EmployeementDbContext _employeementDbContext;

        public EmployeementController(EmployeementDbContext employeementDbContext)
        {
            _employeementDbContext = employeementDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeementDbContext.EmployeesManages.ToListAsync();

            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employeement employeeRequest)
        {
            employeeRequest.Id = Guid.NewGuid();
            await _employeementDbContext.EmployeesManages.AddAsync(employeeRequest);
            await _employeementDbContext.SaveChangesAsync();

            return Ok(employeeRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
        {
            var employee = await _employeementDbContext.EmployeesManages.FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:Guid}")]

        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employeement updateEmployeeRequest)
        {
            var employee = await _employeementDbContext.EmployeesManages.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            employee.Name = updateEmployeeRequest.Name;
            employee.Email = updateEmployeeRequest.Email;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Department = updateEmployeeRequest.Department;

            await _employeementDbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:Guid}")]

        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await _employeementDbContext.EmployeesManages.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            _employeementDbContext.EmployeesManages.Remove(employee);
            await _employeementDbContext.SaveChangesAsync();

            return Ok(employee);
            //return Ok("Deleted Success");
        }
    }
}
