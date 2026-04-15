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

  class RefreshButtonActionChain4 extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      try {
        // Reset the search variable to ensure all data is fetched
        $variables.searchselectedpnum = null;

        // Notify about refresh action
        await Actions.fireNotificationEvent(context, {
          summary: 'Refreshing table data...',
          type: 'info',
        });

        // Fetch all data from the REST API
        const response = await Actions.callRest(context, {
          endpoint: 'getCriteriaall/getGetCriteria',
        });

        // Process and update the table data
        debugger;

        // Assign the processed data to the table variable
        $variables.tableData.data = response.body.items;

        // Notify success
        await Actions.fireNotificationEvent(context, {
          summary: 'Table data refreshed successfully.',
          type: 'confirmation',
        });

        // Debugging log
        console.log('Updated Table Data After Refresh:', updatedData);
      } catch (error) {
      }
    }
  }

  return RefreshButtonActionChain4;
});
