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

  class SelectClickChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

         // If data already loaded → do nothing (fast open)
      if ($variables.expenditureCategoryLoaded) {
        return;
      }

      // If there was an error during background load
      if ($variables.expenditureCategoryError) {

          await Actions.fireNotificationEvent(context, {
            summary: $variables.expenditureCategoryError,
            displayMode: 'transient',
            type: 'error',
          });


        return;
      }
    }
  }

  return SelectClickChain3;
});
