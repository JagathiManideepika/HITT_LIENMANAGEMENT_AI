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

  class getLienManagement_InvoiceLOV_SearchFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getLienManagement_InvoiceLOV_Search',
        responseType: 'getLienManagementInvoiceLOVSearchResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          USERNAME: $application.variables.user,
        },
      });

      return callRestEndpoint1;
    }
  }

  return getLienManagement_InvoiceLOV_SearchFetch;
});
