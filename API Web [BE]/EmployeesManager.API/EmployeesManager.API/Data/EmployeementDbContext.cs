using EmployeesManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeesManager.API.Data
{
    public class EmployeementDbContext : DbContext
    {
        public EmployeementDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employeement> EmployeesManages { get; set; }
    }
}
