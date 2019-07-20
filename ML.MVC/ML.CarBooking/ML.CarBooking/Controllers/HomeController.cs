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
        private readonly IPersonWorkingHistory m_personWorkingHistory;
        public HomeController(IConnectionFactory connectionFactory, IPersonWorkingHistory personWorkingHistory)
        {
            m_ConnectionFactory = connectionFactory;
            m_personWorkingHistory = personWorkingHistory;
        }

        public ActionResult Index()
        {
            //TODO : CHeck account Login
            var userName = Session["UserName"];

            var b = m_personWorkingHistory.GetAllByPersonId(1);
            

            bool logedIn = userName != null && !string.IsNullOrEmpty(userName.ToString());
            if (!logedIn)
            {
                return RedirectToAction("Login");
            }
            LoginModel a = new LoginModel { UserName = userName.ToString() };
            return View(a);
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