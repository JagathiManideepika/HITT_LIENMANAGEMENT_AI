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

  class ToptaskValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      // debugger;

      try {

        if (data) {
          $variables.createobj.top_task_id = data.TOP_TASK_ID;
          const response = await Actions.callRest(context, {
            endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_PJC_TASKS_SYNC1_0ProjectTasks',
            uriParams: {
              'TOP_TASK_ID': $variables.createobj.top_task_id,
              'p_username': $application.variables.user,
            },
             headers: {
            'R_PAGE_NAME': 'Create  Criteria Page -Tasks LOV - LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_PJC_TASKS_SYNC1_0ProjectTasks ',
            'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
            'R_USER_NAME': $application.variables.user,
          },

          });
          if(!response.ok){
            throw response;
           }

          $variables.tasksADP.data = response.body.DATA_DS.G_1;
          $variables.tasksLoaded = true;
          $variables.tasksError = null;
        }
      } catch (error) {
        $variables.tasksLoaded = false;
          $variables.tasksError = error.body?.['o:errorDetails']?.[0]?.title || error.message;
      } finally {
      }




    }
  }

  return ToptaskValueChangeAction;
});
