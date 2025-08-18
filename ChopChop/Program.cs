using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using ChopChop;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// TODO: Add HttpClient with API base when backend exists
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<ChopChop.Services.UIService>();

#if USE_TELERIK
// Register Telerik services
builder.Services.AddTelerikBlazor();
#endif

await builder.Build().RunAsync();
