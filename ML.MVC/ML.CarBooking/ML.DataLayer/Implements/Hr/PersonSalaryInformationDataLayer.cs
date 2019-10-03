﻿using Dapper;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonSalaryInformationDataLayer : ConnectionBase, IPersonSalaryInformationDataLayer
    {
        public PersonSalaryInformationDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public int CreateOrUpdatePersonBankAccount(PersonBankAccount request, int userId)
        {
            return Execute(connection =>
            connection.ExecuteScalar<int>("[Hr].[CreateOrUpdatePersonBankAccount]",
            new {
                id = request.Id,
                accountName = request.AccountName,
                accountNumber = request.AccountNumber,
                bankId = request.BankId,
                userId = userId,
                pid = request.PersonId

                }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public int DeletePersonBankAccount(int id, int userId)
        {
            return Execute(connection =>
             connection.ExecuteScalar<int>("[Hr].[DeletePersonBankAccount]",
             new
             {
                 id = id,
                 userId = userId

             }, commandType: System.Data.CommandType.StoredProcedure));
        }

        public IEnumerable<PersonBankAccount> GetPersonBankAccount(int pid)
        {
            return Execute(connection =>
            connection.Query<PersonBankAccount>("[Hr].[GetPersonAccountBank]",
            new
            {
               pid= pid

            }, commandType: System.Data.CommandType.StoredProcedure));
        }
    }
}