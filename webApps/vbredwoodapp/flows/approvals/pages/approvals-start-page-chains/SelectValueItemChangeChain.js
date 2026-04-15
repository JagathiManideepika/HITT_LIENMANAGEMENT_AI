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

  class SelectValueItemChangeChain extends ActionChain {
    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.headers.invoice_id',
  ],
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.getLienManagementSupplierLOVAppSearchListSDP,
        refresh: null,
      });

      if (data) {

        $variables.headers.invoice_id = data.invoice_id;

        // Extract the actual selected value from `data`
        const selectedValue = data ? data.ap_invoice : null;

        // Assign the selected value to the variable
        $variables.APinvoicesearchselectvalue = selectedValue;
      }

      console.log('Selected Data:', data);
    }
  }

  return SelectValueItemChangeChain;
});
