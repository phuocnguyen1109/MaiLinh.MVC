[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ML.CarBooking.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(ML.CarBooking.App_Start.NinjectWebCommon), "Stop")]

namespace ML.CarBooking.App_Start
{
    using System;
    using System.Configuration;
    using System.Web;
    using System.Web.Http;
    using Microsoft.Web.Infrastructure.DynamicModuleHelper;
    using ML.Common.Data;
    using ML.Common.Data.Interfaces;
    using Ninject;
    using Ninject.Web.Common;

    using ML.Business.Interfaces.Hr;
    using ML.Business.Implements.Hr;
    using ML.DataLayer.Interfaces.Hr;
    using ML.DataLayer.Implements.Hr;
    using ML.Business.Interfaces.Common;
    using ML.Business.Implements;
    using ML.DataLayer.Interfaces.Common;
    using ML.DataLayer.Implements.Common;
    using ML.DataLayer.Interfaces.Vh;
    using ML.DataLayer.Implements;
    using ML.Business.Interfaces.Vh;
    using ML.Business.Implements.Vh;
    using ML.DataLayer.Implements.Vh;

    public static class NinjectWebCommon
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }

        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                GlobalConfiguration.Configuration.DependencyResolver = new NinjectResolver(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IConnectionFactory>().ToConstructor(contructor => new ConnectionFactory(GetConnectionString()));

            kernel.Bind<IAccountBussiness>().To<AccountBusiness>().InSingletonScope();
            kernel.Bind<IAccountDataLayer>().To<AccountDataLayer>().InSingletonScope();

            kernel.Bind<IPersonWorkingHistory>().To<PersonWorkingHistory>().InSingletonScope();
            kernel.Bind<IPersonWorkingHistoryDataLayer>().To<PersonWorkingHistoryDataLayer>().InSingletonScope();

            kernel.Bind<IPersonDataLayer>().To<PersonDataLayer>().InSingletonScope();
            kernel.Bind<IPersonBusiness>().To<PersonBusiness>().InSingletonScope();

            kernel.Bind<IPersonEducationDataLayer>().To<PersonEducationDataLayer>().InSingletonScope();
            kernel.Bind<IPersonEducationBusiness>().To<PersonEducationBusiness>().InSingletonScope();

            kernel.Bind<IPersonHealthCheck>().To<PersonHealthCheckDataLayer>().InSingletonScope();
            kernel.Bind<IPersonHealthCheckBusiness>().To<PersonHealthCheckBusiness>().InSingletonScope();

            kernel.Bind<ILocationDataLayer>().To<LocationDataLayer>().InSingletonScope();
            kernel.Bind<ILocation>().To<LocationBusiness>().InSingletonScope();

            kernel.Bind<IPersonMariage>().To<PersonMariageDataLayer>().InSingletonScope();
            kernel.Bind<IPersonMariageBusiness>().To<PersonMariageBusiness>().InSingletonScope();

            kernel.Bind<IPersonSalaryInformation>().To<PersonSalaryInformationBusiness>().InSingletonScope();
            kernel.Bind<IPersonSalaryInformationDataLayer>().To<PersonSalaryInformationDataLayer>().InSingletonScope();

            //VH

            kernel.Bind<IDinhnghia_PhuongtienDataLayer>().To<Dinhnghia_PhuongtienDataLayer>().InSingletonScope();
            kernel.Bind<IDinhnghia_PhuongtienBusiness>().To<Dinhnghia_PhuongtienBusiness>().InSingletonScope();

            kernel.Bind<IPhuongTienDataLayer>().To<PhuongTienDataLayer>().InSingletonScope();
            kernel.Bind<IPhuongTienBusiness>().To<PhuongTienBusiness>().InSingletonScope();




        }

        private static string GetConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        }
    }
}
