using ML.Entities;
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

        // Person Life Insurance
        IEnumerable<PersonLifeInsurance> GetPersonLifeInsurance(int pid);
        int CreateOrUpdatePersonLifeInsurance(PersonLifeInsurance request);
        int DeletePersonLifeInsurance(int id);

        //Person Dependents
        IEnumerable<PersonRelationShip> GetPersonDependents(int pid);

        //person health Insurance
        IEnumerable<PersonHealthInsurance> GetPersonHealthInsurances(int pid);
        int CreateOrUpdatePersonHealthInsurance(PersonHealthInsurance request, int userId);
    }
}
