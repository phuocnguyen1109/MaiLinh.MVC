using ML.Entities;
using ML.Entities.RequestModels.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Hr
{
   public interface IPersonHealthCheckBusiness
    {
        //MHealthCheck
        int CreateAndUpdateMHealthCheck(MHealthCheck request, int userId);
        IEnumerable<MHealthCheck> GetMHealthCheck();
        int DeleteMHealthCheck(IEnumerable<int> ids);

        //PersonHealthCheck
        IEnumerable<GetPersonHelthCheckByPerson> GetHealthCheckByPerson(int pid);
        int CreatePersonHealthCheck(CreateAndUpdatePersonHealthCheckRequest request, int userId);
        int UpdateHealthCheck(CreateAndUpdatePersonHealthCheckRequest request, int userId);
        int DeleteHealthCheck(int id);
        PersonHealthCheck GetPersonHealthCheckById(int Id);
    }
}
