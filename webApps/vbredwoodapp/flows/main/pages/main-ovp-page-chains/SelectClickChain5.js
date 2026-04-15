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

  class SelectClickChain5 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

           if ($variables.supplierLoaded) {
        return;
      }

      // If there was an error during background load
      if ($variables.SupplierError) {

          await Actions.fireNotificationEvent(context, {
            summary: $variables.SupplierError,
            displayMode: 'transient',
            type: 'error',
          });

        return;
      }
    }
  }

  return SelectClickChain5;
});
