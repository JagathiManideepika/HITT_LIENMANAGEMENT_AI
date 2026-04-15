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

  class SelectClickChain4 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;
            if ($variables.createobj.expenditure_category) {
        // If data already loaded → do nothing (fast open)
        if ($variables.expenditureTypeLoaded) {
          return;
        }

        // If there was an error during background load
        if ($variables.expenditureTypeError) {

            await Actions.fireNotificationEvent(context, {
              summary: $variables.expenditureTypeError,
              displayMode: 'transient',
              type: 'error',
            });

          return;
        }
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select the Expenditure Category to get Expenditure Types',
          displayMode: 'transient',
          type: 'error',
        });
        
      }
    }
  }

  return SelectClickChain4;
});
