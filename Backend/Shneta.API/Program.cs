using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Shneta.Application.Interfaces.Services;
using Shneta.Application.Services;
using Shneta.Domain.Interfaces.Repositories;
using Shneta.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Shneta API",
        Version = "v1",
        Description = "API për menaxhimin e klientëve"
    });
});

builder.Services.AddScoped<IKlientiRepository, KlientiRepository>();
builder.Services.AddScoped<IKlientiService, KlientiService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Shneta API v1");
    c.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();