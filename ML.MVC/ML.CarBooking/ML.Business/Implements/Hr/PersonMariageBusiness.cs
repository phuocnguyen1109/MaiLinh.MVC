using ML.Business.Interfaces.Hr;
using ML.DataLayer.Implements.Hr;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class PersonMariageBusiness : IPersonMariageBusiness
    {
        private readonly IPersonMariage m_PersonMariage;
        public PersonMariageBusiness(IPersonMariage personMariage)
        {
            m_PersonMariage = personMariage;
        }

        public int AddPersonRelationShip(PersonRelationShip request, int userId)
        {
            return m_PersonMariage.AddPersonRelationShip(request, userId);
        }

        public int DeletePersonRelationShip(int relationId)
        {
            return m_PersonMariage.DeletePersonRelationShip(relationId);
        }

        public IEnumerable<MMariageStatus> GetMMariageStatus()
        {
            return m_PersonMariage.GetMMariageStatus();
        }

        public IEnumerable<PersonRelationShip> GetPersonRelationShips(int personId)
        {
            return m_PersonMariage.GetPersonRelationShips(personId);
        }

        public int UpdatePersonRelationShip(PersonRelationShip request, int userId)
        {
            return m_PersonMariage.UpdatePersonRelationShip(request, userId);
        }
    }
}
