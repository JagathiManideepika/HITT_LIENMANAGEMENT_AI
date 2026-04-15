define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class ProjectvalueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      try {

        if (data) {
          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.createobj.project_id',
            ],
          });

          $variables.createobj.project_id = data.PROJECT_ID;
          $variables.createobj.project_number = data.PROJECT_NUMBER;
          $variables.createobj.bu_id = data.BU_ID;
          $variables.createobj.bu_name = data.BU_NAME;

          const response = await Actions.callRest(context, {
            endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_PROJECT_TASKS_LOV_SYNC1_0ProjectTasks2',
            uriParams: {
              'p_username': $application.variables.user,
              'p_project_id': $variables.createobj.project_id,
            },
             headers: {
            'R_PAGE_NAME': 'Create  Criteria Page -Top Tasks LOV - LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_PROJECT_TASKS_LOV_SYNC1_0ProjectTasks2',
            'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
            'R_USER_NAME': $application.variables.user,
          },
          });
           if(!response.ok){
            throw response;
           }
           
          $variables.topTaskAdp.data = response.body.DATA_DS.G_1;
          $variables.toptasksLoaded = true;
          $variables.toptasksError = null; 
        }
      } catch (error) {
         $variables.toptasksLoaded = false;
        $variables.toptasksError = error.body?.['o:errorDetails']?.[0]?.title || error.message; 
      } finally {
      }



    }
  }

  return ProjectvalueChangeAction;
});
