﻿using ML.Business.Interfaces.Common;
using ML.Business.Interfaces.Hr;
using ML.CarBooking.Models.Accounts;
using ML.Common.Data.Interfaces;
using ML.Entities.ResponseModels.Hr;
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
            var user = Session["UserClaims"];

            bool logedIn = user != null;
            if (!logedIn)
            {
                return RedirectToAction("Login");
            }
            var userClaims = Session["UserClaims"] as UserClaimsModel;
            return View(userClaims);
        }

        public ActionResult Logout()
        {
            Session["UserClaims"] = null;
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
            var userClaimsModel = m_AccountBussiness.UserLogin(model.UserName, model.Password);

            if (0 == userClaimsModel.Id)
            {
                ViewBag.NotValid = true;
                ViewBag.Message = "Sai Tên Đăng Nhập Hoặc Mật Khẩu";
                return View();
            }
            if (-2 == userClaimsModel.Id)
            {
                ViewBag.NotValid = true;
                ViewBag.Message = "Tài khoản này hiện chưa được cấp quyền truy cập hệ thống";
                return View();
            }
                
            if (-1 == userClaimsModel.Id)
            {
                userClaimsModel.FullName = "System Administrator";
                userClaimsModel.RoleName = "Quản Trị Hệ Thống";
            }
                Session["UserClaims"] = userClaimsModel;
                return RedirectToAction("Index");
        }
    }
}