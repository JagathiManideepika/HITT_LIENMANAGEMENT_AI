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

  class getLienManagement_supplierLOV_AppSearchFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getLienManagement_supplierLOV_AppSearch',
        responseType: 'getLienManagementSupplierLOVAppSearchResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          USERNAME: $application.variables.user,
          'P_INVOICE_ID': $variables.headers.invoice_id || ""
        },
      });

      return callRestEndpoint1;
    }
  }

  return getLienManagement_supplierLOV_AppSearchFetch;
});
