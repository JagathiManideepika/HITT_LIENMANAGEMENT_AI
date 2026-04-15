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

  class getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_PJC_TASKS_SYNC1_0ProjectTasksFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_PJC_TASKS_SYNC1_0ProjectTasks',
        uriParams: {
          'p_username': $application.variables.user,
          'TOP_TASK_ID': $variables.createobj.top_task_id,
        },
        responseType: 'getIcApiIntegrationV2FlowsRestProjectLIENMANAGEMENTLMPJCTASKSSYNC1ProjectTasksResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_PJC_TASKS_SYNC1_0ProjectTasksFetch;
});
