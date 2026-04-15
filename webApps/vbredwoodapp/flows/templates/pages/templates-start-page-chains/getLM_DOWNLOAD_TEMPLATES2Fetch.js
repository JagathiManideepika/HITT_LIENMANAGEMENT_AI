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

  class getLM_DOWNLOAD_TEMPLATES2Fetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getLM_DOWNLOAD_TEMPLATES2',
        uriParams: {
          'state_name': $variables.rowData.state_name,
        },
        responseType: 'getLMDOWNLOADTEMPLATES2Response2',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getLM_DOWNLOAD_TEMPLATES2Fetch;
});
