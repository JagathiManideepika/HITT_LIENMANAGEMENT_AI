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

  class SearchButtonActionChain4 extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      try {
        let response;

        // Check if 'searchselectedpnum' has a value
        if ($variables.searchselectedpnum) {
          const response2 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/getGetCriteria',
            uriParams: {
              'project_id': $variables.searchselectedpnum?$variables.searchselectedpnum:'',
            },
          });

          response = response2;

          // // Call the REST API with the filter
          // response = await Actions.callRest(context, {
          //   endpoint: 'getCriteriaall/getGetCriteria',
          //   uriParams: {
          //     'project_id': $variables.searchselectedpnum?$variables.searchselectedpnum:'',
          //   },
          // });
        } else {
          const response3 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/getGetCriteria',
            uriParams: {
              'project_id': $variables.searchselectedpnum?$variables.searchselectedpnum:'',
            },
          });
           response = response3;

          // // Call the REST API without filter to fetch all data
          // response = await Actions.callRest(context, {
          //   endpoint: 'getCriteriaall/getGetCriteria',
          // });
        }

        // Assign the response data to the table variable
        $variables.tableData.data = response.body.items;
        // const responeData = response.body.items;
        // const updatedData = responeData.map((item) => ({
        //   ...item,
        //   checkTemplate: item.enabled_flag === '1' || item.enabled_flag === 'true', // True if flag is '1' or 'Y'
        // }));
      } catch (error) {
        console.error('Error in SearchButtonActionChain4:', error);

        await Actions.fireNotificationEvent(context, {
          summary: 'Error occurred while fetching data.',
          detail: error.message,
          type: 'error',
        });
      }
    }
  }

  return SearchButtonActionChain4;
});
