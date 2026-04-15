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

        const response2 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/getGetCriteria',
        });

        // const response = await Actions.callRest(context, {
        //   endpoint: 'getCriteriaall/getGetCriteria',
        // });
        
        $variables.tableData.data = response2.body.items;
      } catch (error) {
      }
    }
  }

  return RefreshButtonActionChain4;
});
