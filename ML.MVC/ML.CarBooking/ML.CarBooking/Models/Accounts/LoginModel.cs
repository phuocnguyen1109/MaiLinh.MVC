using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ML.CarBooking.Models.Accounts
{
    public class LoginModel
    {
        [Required]
        public string UserName { get; set; }

      
    }
}