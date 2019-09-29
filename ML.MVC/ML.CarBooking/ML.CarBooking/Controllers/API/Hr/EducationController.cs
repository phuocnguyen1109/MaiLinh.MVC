using ML.Business.Interfaces.Hr;
using ML.Entities;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ML.CarBooking.Controllers.API.Hr
{
    public class EducationController : ApiController
    {
        private IPersonEducationBusiness m_personEducation;
        public EducationController(IPersonEducationBusiness personEducationBussiness)
        {
            m_personEducation = personEducationBussiness;
        }

        public IEnumerable<MLanguage> GetMLanguages()
        {
            return m_personEducation.GetMLanguages();
        }

        public PersonEducation GetPersonEducations(int pid)
        {
            return m_personEducation.GetPersonEducation(pid);
        }

        public int SavePersonLanguage(PersonLanguage request, int userId = 1)
        {
            return m_personEducation.CreateAndUpdatePersonLanguage(request, userId);
        }

        public int SaveWorkLicense(PersonWorkLicense request, int userId = 1)
        {
            return m_personEducation.CreateOrUpdatePersonWorkLicense(request, userId);
        }

        [HttpPost]
        public int DeletePersonLanguage(PersonLanguage request)
        {
            return m_personEducation.DeletePersonLanguage(request.Id);
        }
    }
}
