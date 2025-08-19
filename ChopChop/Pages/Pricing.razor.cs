using Microsoft.AspNetCore.Components;
using Telerik.Blazor.Components;

namespace ChopChop.Pages
{
    public partial class Pricing : ComponentBase
    {
        [Inject] private NavigationManager Nav { get; set; } = default!;

        protected RenderFragment PopularBadge => builder =>
        {
            builder.OpenComponent<TelerikBadge>(0);
            // Use ChildContent for Badge text; Text parameter is not valid for TelerikBadge
            builder.AddAttribute(1, "ChildContent", (RenderFragment)(b => b.AddContent(0, "Most Popular")));
            // Prefer the enum for ThemeColor over string to match API
            builder.AddAttribute(2, "ThemeColor", Telerik.Blazor.ThemeConstants.Badge.ThemeColor.Primary);
            builder.CloseComponent();
        };

        protected void Go(string plan) => Nav.NavigateTo($"/booking?plan={Uri.EscapeDataString(plan)}");
    }
}
