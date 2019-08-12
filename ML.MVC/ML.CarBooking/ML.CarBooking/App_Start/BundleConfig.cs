using System.Web;
using System.Web.Optimization;

namespace ML.CarBooking
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularJS").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-ui-router.min.js",
                "~/Scripts/ui-bootstrap-tpls-2.5.0.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/CustomScripts").Include(
                "~/Scripts/CustomScripts/sb-admin-2.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.bundle.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                                      "~/Content/fontawesome-free/css/all.min.css",
                  "~/Content/CustomCSS/sb-admin-2.css", "~/Content/CustomCSS/agency.css"));
        }
    }
}
