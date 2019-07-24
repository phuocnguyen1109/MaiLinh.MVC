﻿using Dapper;
using Dapper.FastCrud;
using ML.Common.Data;
using ML.Common.Data.Interfaces;
using ML.DataLayer.DataObject.Hr;
using ML.DataLayer.Interfaces;
using ML.DataLayer.Interfaces.Hr;
using ML.Entities.ResponseModels.Hr;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DataLayer.Implements.Hr
{
    public class PersonWorkingHistoryDataLayer : ConnectionBase, IPersonWorkingHistoryDataLayer
    { 

        public PersonWorkingHistoryDataLayer(IConnectionFactory factory) : base(factory)
        {

        }

        public void Create(PWH_GetAllByPerson request)
        {

             Execute(connection => connection
                    .Query<PWH_GetAllByPerson>("[Hr].[GetWorkingHistoryByUser]",
                    new
                    {
                        request
                    }, commandType: CommandType.StoredProcedure));
        }

        public void Delete(PWH_GetAllByPerson request)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PWH_GetAllByPerson> GetAllByPersonId(int personId)
        {
            return Execute( connection => connection
                    .Query<PWH_GetAllByPerson>("[Hr].[GetWorkingHistoryByUser]",
                    new {
                        personId
                    }, commandType: CommandType.StoredProcedure));
        }

        public void Update(PWH_GetAllByPerson request)
        {
            throw new NotImplementedException();
        }
    }
}
