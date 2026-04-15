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

  class SupplierValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      

      try {

        if (data) {
          $variables.createobj.supplier_id = data.VENDOR_ID;
          $variables.createobj.supplier_number = data.SUPPLIER_NUMBER;

          const response = await Actions.callRest(context, {
            endpoint: 'LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_SUPPLIER_SITES_LOV_SYNC1_0SupplierSites2',
            uriParams: {
              'p_username': $application.variables.user,
              'p_vendor_id': $variables.createobj.supplier_id,
            },
             headers: {
            'R_PAGE_NAME': 'Create  Criteria Page -Supplier Sites LOV - LM_OIC/getIcApiIntegrationV2FlowsRestProjectLIEN_MANAGEMENTLM_SUPPLIER_SITES_LOV_SYNC1_0SupplierSites2',
            'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
            'R_USER_NAME': $application.variables.user,
          },
          });

          $variables.supplierSitesAdp.data = response.body.items;
          $variables.supplierSiteLoaded = true;
          $variables.supplierSiteError = null;
        }
      } catch (error) {
         $variables.supplierSiteLoaded = false;
          $variables.supplierSiteError = error.body?.['o:errorDetails']?.[0]?.title || error.message;
      } finally {
      }

    }
  }

  return SupplierValueChangeAction;
});
