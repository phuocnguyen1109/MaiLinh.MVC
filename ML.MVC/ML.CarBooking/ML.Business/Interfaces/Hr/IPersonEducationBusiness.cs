using ML.Entities;
using ML.Entities.RequestModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Interfaces.Hr
{
   public interface IPersonEducationBusiness
    {
        //MLanguage
        IEnumerable<MLanguage> GetMLanguages();
        int CreateAndUpdateMLanguage(MLanguage request, int userId);
        int DeleteMLanguage(IEnumerable<int> ids);
        MLanguage GetMLanguageById(int id);

        //MWorkLicense
        IEnumerable<MWorkLicense> GetMWorkLicenses();
        int CreateAndUpdateMWorkLicense(MWorkLicense request, int userId);
        int DeleteMWorkLicense(IEnumerable<int> ids);
        MWorkLicense GetMWorkLicenseById(int id);

        //MDriveLicense
        IEnumerable<MDriveLicenseType> GetMDriveLicenses();
        int CreateAndUpdateMDriveLicense(MDriveLicenseType request, int userId);
        int DeleteMDriveLicense(IEnumerable<int> ids);
        MDriveLicenseType GetMDriveLicenseById(int id);

        //PersonEducationp
        PersonEducation GetPersonEducation(int pid);
        int CreateAndUpdatePersonLanguage(PersonLanguage request, int userId);
        int DeletePersonLanguage(IEnumerable<int> ids);
        int CreateAndUpdatePersonEducation(CreateAndUpdatePersonEducationRequest request, int userId);
        int CreateAndUpdatePersonWorkLicense(PersonWorkLicense request, int userId);

    }
}
