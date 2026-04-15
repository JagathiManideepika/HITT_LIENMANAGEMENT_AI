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

  class SelectKeyupChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.headers.supplier',
    '$page.variables.headers.invoice_id',
  ],
      });

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.getPWPSupplierDetailsListSDP,
      });
    }
  }

  return SelectKeyupChain;
});
