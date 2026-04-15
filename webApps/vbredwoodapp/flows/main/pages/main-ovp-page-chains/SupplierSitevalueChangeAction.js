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

  class SupplierSitevalueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (data) {
        $variables.createobj.site_id = data.VENDOR_SITE_ID;
        $variables.createobj.supplier_site_id = data.VENDOR_SITE_ID;
      }

    }
  }

  return SupplierSitevalueChangeAction;
});
