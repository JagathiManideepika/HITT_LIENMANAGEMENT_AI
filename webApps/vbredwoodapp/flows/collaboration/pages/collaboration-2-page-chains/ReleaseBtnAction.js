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

  class ReleaseBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const holdIdsArray = $variables.holdIdsArray;
      let hasError = false;

      for (let i = 0; i < holdIdsArray.length; i++) {
        const item = holdIdsArray[i];

        const response = await Actions.callRest(context, {
          endpoint: 'apReleaseHold/patchInvoiceHoldsHold_id',
          uriParams: {
            'hold_id': item.hold_id,
          },
          body: {
            ReleaseName: 'Validated',
          },
        });

        if (!response.ok) {
          hasError = true;

          // Fire failure notification once
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Release Hold',
            displayMode: 'transient',
            type: 'error',
          });

          break; // Exit loop on first failure
        }
      }

      if (!hasError) {
        // Fire success notification once
        await Actions.fireNotificationEvent(context, {
          summary: 'Holds Released Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }

      if (hasError) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Release Hold',
          displayMode: 'transient',
        });
      }
    }
  }

  return ReleaseBtnAction;
});
