namespace EmployeesManager.API.Models
{
    public class Employeement
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Phone { get; set; }

        public long Salary { get; set; }

        public string Department { get; set; }

    }
}
