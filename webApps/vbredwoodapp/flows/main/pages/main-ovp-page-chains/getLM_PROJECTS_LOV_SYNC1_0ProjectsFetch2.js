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

  class getLM_PROJECTS_LOV_SYNC1_0ProjectsFetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'LM_OIC/getLM_PROJECTS_LOV_SYNC1_0Projects',
        responseType: 'getLMPROJECTSLOVSYNC1ProjectsResponse2',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getLM_PROJECTS_LOV_SYNC1_0ProjectsFetch2;
});
