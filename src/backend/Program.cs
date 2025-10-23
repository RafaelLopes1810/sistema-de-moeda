using backend.Data;
using backend.Interfaces;
using backend.Repositories;
using backend.Services;
using backend.Profiles;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔹 1. Adicionar política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()  // ou .WithOrigins("http://127.0.0.1:5500", "http://localhost:5500")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// 🔹 2. Configuração do banco com retry automático
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(10),
            errorNumbersToAdd: null
        )
    )
);

// 🔹 3. Injeção de dependências
builder.Services.AddScoped<IAlunoRepository, AlunoRepository>();
builder.Services.AddScoped<IAlunoService, AlunoService>();
builder.Services.AddScoped<IEmpresaParceiraRepository, EmpresaParceiraRepository>();
builder.Services.AddScoped<IEmpresaParceiraService, EmpresaParceiraService>();

// 🔹 4. AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// 🔹 5. Controllers e Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🔹 6. Garantir que o banco de dados seja criado automaticamente
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// 🔹 7. Configuração Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API Sistema de Moedas v1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

// 🔹 8. ATIVE o CORS AQUI
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();
app.Run();
