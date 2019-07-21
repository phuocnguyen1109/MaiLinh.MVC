using ML.Business.Interfaces.Hr;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class PersonBusiness : IPersonBusiness
    {
        private readonly IPersonDataLayer m_PersonDataLayer;

        public PersonBusiness(IPersonDataLayer personDataLayer)
        {
            m_PersonDataLayer = personDataLayer;
        }

        public int CreateSimple(CreateSimpleRequest request)
        {
          return m_PersonDataLayer.CreateSimple(request);
        }

        public IEnumerable<PersonGridResponse> GetAllPerson()
        {
            return m_PersonDataLayer.GetAllPerson();
        }

        public PersonResponse GetPersonInformation(int id)
        {
           return m_PersonDataLayer.GetPersonInformation(id);
        }
    }
}
