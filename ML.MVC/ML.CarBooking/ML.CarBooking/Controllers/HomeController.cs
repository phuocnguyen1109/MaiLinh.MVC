using ML.Business.Interfaces.Common;
using ML.Business.Interfaces.Hr;
using ML.CarBooking.Models.Accounts;
using ML.Common.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ML.CarBooking.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConnectionFactory m_ConnectionFactory;
        private readonly IAccountBussiness m_AccountBussiness;
        public HomeController(IConnectionFactory connectionFactory, IAccountBussiness accountBussiness)
        {
            m_ConnectionFactory = connectionFactory;
            m_AccountBussiness = accountBussiness;
        }

        public ActionResult Index()
        {
            //TODO : CHeck account Login
            var userName = Session["UserName"];

            bool logedIn = userName != null && !string.IsNullOrEmpty(userName.ToString());
            if (!logedIn)
            {
                return RedirectToAction("Login");
            }
            LoginModel a = new LoginModel { UserName = userName.ToString() };
            return View(a);
        }

        public ActionResult Logout()
        {
            Session["UserName"] = null;
            return RedirectToAction("Index");
        }

        public ActionResult Login()
        {
            ViewBag.Message = "Login";

            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            bool validUser = m_AccountBussiness.UserLogin(model.UserName, model.Password);
            if (validUser)
            {
                Session["UserName"] = model.UserName;
                return RedirectToAction("Index");
            }
            else
            {
                ViewBag.NotValid = true;
                return View();
            }
        }
    }
}