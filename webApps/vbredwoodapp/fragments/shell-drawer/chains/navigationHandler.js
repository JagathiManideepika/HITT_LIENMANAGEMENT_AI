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

  class navigationHandler extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.selection 
     */
    async run(context, { selection, updatedFrom = '' }) {
      const { $fragment, $application, $constants, $variables } = context;
    
    $application.variables.navDrawer = false;

      if (updatedFrom !== 'external') {

        const fireApplicationEventNavigateToItemResult = await Actions.fireEvent(context, {
          event: 'application:navigateToItem',
          payload: {
            item: selection,
          },
        });
      }
    
    }
  }

  return navigationHandler;
});
