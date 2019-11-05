using ML.Business.Interfaces.Hr;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities;
using ML.Entities.RequestModels.Hr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.Business.Implements.Hr
{
    public class PersonEducationBusiness : IPersonEducationBusiness
    {
        private readonly IPersonEducationDataLayer m_PEducationDataLayer;

        public PersonEducationBusiness(IPersonEducationDataLayer personEducationDataLayer)
        {
            m_PEducationDataLayer = personEducationDataLayer;
        }

        public int CreateAndUpdateMDriveLicense(MDriveLicenseType request, int userId)
        {
            return m_PEducationDataLayer.CreateAndUpdateMDriveLicense(request, userId);
        }

        public int CreateAndUpdateMLanguage(MLanguage request, int userId)
        {
            return m_PEducationDataLayer.CreateAndUpdateMLanguage(request, userId);
        }

        public int CreateAndUpdateMWorkLicense(MWorkLicense request, int userId)
        {
            return m_PEducationDataLayer.CreateAndUpdateMWorkLicense(request, userId);
        }

        public int CreateAndUpdatePersonEducation(CreateAndUpdatePersonEducationRequest request, int userId)
        {
            return m_PEducationDataLayer.CreateAndUpdatePersonEducation(request, userId);
        }

        public int CreateAndUpdatePersonLanguage(PersonLanguage request, int userId)
        {
            return m_PEducationDataLayer.CreateAndUpdatePersonLanguage(request, userId);
        }

        public int CreateAndUpdatePersonWorkLicense(PersonWorkLicense request, int userId)
        {
            return m_PEducationDataLayer.CreateAndUpdatePersonWorkLicense(request, userId);
        }

        public int DeleteMDriveLicense(IEnumerable<int> ids)
        {
            return m_PEducationDataLayer.DeleteMDriveLicense(ids);
        }

        public int DeleteMLanguage(IEnumerable<int> ids)
        {
            return m_PEducationDataLayer.DeleteMLanguage(ids);
        }

        public int DeleteMWorkLicense(IEnumerable<int> ids)
        {
            return m_PEducationDataLayer.DeleteMWorkLicense(ids);
        }

        public int DeletePersonLanguage(IEnumerable<int> ids)
        {
            return m_PEducationDataLayer.DeletePersonLanguage(ids);
        }

        public MDriveLicenseType GetMDriveLicenseById(int id)
        {
            return m_PEducationDataLayer.GetMDriveLicenseById(id);
        }

        public IEnumerable<MDriveLicenseType> GetMDriveLicenses()
        {
            return m_PEducationDataLayer.GetMDriveLicenses();
        }

        public IEnumerable<PersonLanguage> GetPersonLanguages(int pid)
        {
            return m_PEducationDataLayer.GetPersonLanguages(pid);
        }

        public MLanguage GetMLanguageById(int id)
        {
            return m_PEducationDataLayer.GetMLanguageById(id);
        }

        public IEnumerable<MLanguage> GetMLanguages()
        {
            return m_PEducationDataLayer.GetMLanguages();
        }

        public MWorkLicense GetMWorkLicenseById(int id)
        {
            return m_PEducationDataLayer.GetMWorkLicenseById(id);
        }

        public IEnumerable<MWorkLicense> GetMWorkLicenses()
        {
            return m_PEducationDataLayer.GetMWorkLicenses();
        }

        public PersonEducation GetPersonEducation(int pid)
        {
            return m_PEducationDataLayer.GetPersonEducation(pid);
        }

        public int CreateOrUpdatePersonWorkLicense(PersonWorkLicense request, int userId)
        {
            return m_PEducationDataLayer.CreateOrUpdatePersonWorkLicense(request, userId);
        }

        public int DeletePersonLanguage(int id) {
            return m_PEducationDataLayer.DeletePersonLanguage(id);
        }
    }
}
