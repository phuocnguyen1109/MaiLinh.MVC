using ML.CarBooking.Models.Accounts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ML.CarBooking.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //TODO : CHeck account Login
            var userName = Session["UserName"];


            bool logedIn = false;
            if (!logedIn)
            {
                return RedirectToAction("Login");
            }
            
            return View();
        }

        public ActionResult Login()
        {
            ViewBag.Message = "Login";

            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            Session["UserName"] = model.UserName;

            return RedirectToAction("Index");
        }
    }
}