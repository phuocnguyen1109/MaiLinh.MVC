﻿using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Hr
{
    public interface IPersonSalaryInformation
    {
        //Bank Account
        IEnumerable<PersonBankAccount> GetPersonBankAccount(int pid);
        int CreateOrUpdatePersonBankAccount(PersonBankAccount request, int userId);
        int DeletePersonBankAccount(int id, int userId);
    }
}