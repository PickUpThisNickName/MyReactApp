using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using test.Data;
using test.Models;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var UsersconnectionString = builder.Configuration.GetConnectionString("UsersDefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(UsersconnectionString));

var BooksconnectionString = builder.Configuration.GetConnectionString("BooksDefaultConnection");
builder.Services.AddDbContext<BooksDbContext>(options =>
    options.UseSqlite(BooksconnectionString));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Default", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.File($@"{Directory.GetCurrentDirectory()}\Logs\{DateTime.Now:yyyy-MM-dd}.log"
                    , outputTemplate: "[{Timestamp:HH:mm:ss.fff}] |{Level:u3}| {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");;

using (var scope = app.Services.CreateScope())
{
    BooksDbContext content = scope.ServiceProvider.GetRequiredService<BooksDbContext>();
    BooksDbObjects.Initial(content);
}


app.Run();
