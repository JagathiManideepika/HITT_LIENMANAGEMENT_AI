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

  class SelectClickChain6 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

            if ($variables.createobj.supplier_name) {

        // If data already loaded → do nothing (fast open)
        if ($variables.supplierSiteLoaded) {
          return;
        }

        // If there was an error during background load
        if ($variables.supplierSiteError) {

            await Actions.fireNotificationEvent(context, {
              summary: $variables.supplierSiteError,
              displayMode: 'transient',
              type: 'error',
            });


          return;
        }
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Suppliers to get Supplier Sites',
          displayMode: 'transient',
          type: 'error',
        });
        
      }
    }
  }

  return SelectClickChain6;
});
