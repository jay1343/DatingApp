using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        // sqlcmd -S YASH\MSSQLSERVER01 -E
        private static string _connectionString = @"Server=localhost\MSSQLSERVER01;Database=MSSQL;Trusted_Connection=True;TrustServerCertificate=true;";
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
        public DataContext GetService() {
            var serviceProvider = new ServiceCollection()
            .AddDbContext<DataContext>(options => options.UseSqlServer(_connectionString))
            .BuildServiceProvider();

            return serviceProvider.GetService<DataContext>();
        }
    }
}