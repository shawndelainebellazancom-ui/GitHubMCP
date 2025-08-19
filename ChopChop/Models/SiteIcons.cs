using System.Collections.Generic;
using Telerik.SvgIcons;

namespace ChopChop.Models
{
    public static class SiteIcons
    {
        // Export Telerik SvgIcon values directly
        public static readonly IReadOnlyDictionary<string, object> Common =
            new Dictionary<string, object>
            {
                ["home"] = SvgIcon.Home,
                ["services"] = SvgIcon.Gear,
                ["contact"] = SvgIcon.Envelope,
                ["pricing"] = SvgIcon.Dollar,
                ["booking"] = SvgIcon.Calendar,
                ["success"] = SvgIcon.CheckCircle,
                ["error"] = SvgIcon.ExclamationCircle,
                ["info"] = SvgIcon.InfoCircle
            };
    }
}
