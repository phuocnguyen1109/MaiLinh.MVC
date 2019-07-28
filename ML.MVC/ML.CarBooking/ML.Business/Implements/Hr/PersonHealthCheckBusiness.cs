using ML.Business.Interfaces.Hr;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class PersonHealthCheckBusiness : IPersonHealthCheckBusiness
    {
        private readonly IPersonHealthCheck m_PersonHealthCheck;

        public PersonHealthCheckBusiness(IPersonHealthCheck personHealthCheckDataLayer)
        {
            m_PersonHealthCheck = personHealthCheckDataLayer;
        }

        public int CreateAndUpdateMHealthCheck(MHealthCheck request, int userId)
        {
            return m_PersonHealthCheck.CreateAndUpdateMHealthCheck(request, userId);
        }

        public int CreatePersonHealthCheck(CreateAndUpdatePersonHealthCheckRequest request, int userId)
        {
            return m_PersonHealthCheck.CreatePersonHealthCheck(request, userId);
        }

        public int DeleteHealthCheck(IEnumerable<int> ids)
        {
            return m_PersonHealthCheck.DeleteHealthCheck(ids);
        }

        public int DeleteMHealthCheck(IEnumerable<int> ids)
        {
            return m_PersonHealthCheck.DeleteMHealthCheck(ids);
        }

        public IEnumerable<GetPersonHelthCheckByPerson> GetHealthCheckByPerson(int pid)
        {
            return m_PersonHealthCheck.GetHealthCheckByPerson(pid);
        }

        public IEnumerable<MHealthCheck> GetMHealthCheck()
        {
            return m_PersonHealthCheck.GetMHealthCheck();
        }

        public PersonHealthCheck GetPersonHealthCheckById(int Id)
        {
            return m_PersonHealthCheck.GetPersonHealthCheckById(Id);
        }

        public int UpdateHealthCheck(CreateAndUpdatePersonHealthCheckRequest request, int userId)
        {
            return m_PersonHealthCheck.UpdateHealthCheck(request, userId);
        }
    }
}
