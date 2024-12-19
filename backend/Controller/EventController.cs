using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;
using EventManagementApi.Database;

namespace EventManagementApi.Controllers;

[Authorize]
[Route("api/[controller]s")]
[ApiController]
public class EventController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EventController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [RequiredScopeOrAppPermission(
        RequiredScopesConfigurationKey = "EntraID:Scopes:Read",
        RequiredAppPermissionsConfigurationKey = "EntraID:AppPermissions:Read")]
    public async Task<IActionResult> GetAllAsync()
    {
        Console.WriteLine("User is authenticated");
        var user = HttpContext.User;
        var claims = user.Claims;
        Console.WriteLine("User claims:");
        foreach (var claim in claims)
        {
            Console.WriteLine($"{claim.Type}: {claim.Value}");
        }
        var events = await _context.Event.ToListAsync();
        return Ok(events);
    }

}