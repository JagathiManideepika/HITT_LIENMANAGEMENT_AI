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

  class getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_SUPPLIER_SITES_LOV_SYNC1_0SupplierSites2Fetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_SUPPLIER_SITES_LOV_SYNC1_0SupplierSites2',
        responseType: 'getIcApiIntegrationV2FlowsRestProjectLIENMANAGEMENTLMSUPPLIERSITESLOVSYNC1SupplierSites2Response2',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          'p_username': $application.variables.user,
          'p_vendor_id': $variables.createobj.supplier_id,
        },
      });

      return callRestEndpoint1;
    }
  }

  return getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_SUPPLIER_SITES_LOV_SYNC1_0SupplierSites2Fetch;
});
