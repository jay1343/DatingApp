using System.Reflection.Metadata.Ecma335;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config) {
                // sqlcmd -S YASH\MSSQLSERVER01 -E
                services.AddDbContext<DataContext>(opt => {
                    opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                });
                services.AddCors();
                services.AddScoped<ITokenServices, TokenService>();

                return services;
            }
    }
}