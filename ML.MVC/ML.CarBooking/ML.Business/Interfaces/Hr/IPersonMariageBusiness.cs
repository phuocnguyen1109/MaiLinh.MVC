using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Hr
{
   public interface IPersonMariageBusiness
    {
        IEnumerable<MMariageStatus> GetMMariageStatus();
        IEnumerable<PersonRelationShip> GetPersonRelationShips(int personId);
        int AddPersonRelationShip(PersonRelationShip request, int userId);
        int UpdatePersonRelationShip(PersonRelationShip request, int userId);
        int DeletePersonRelationShip(int relationId);
    }
}
