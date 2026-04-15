define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils'
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class UpdateButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });
      debugger;

      try {
        // const updateObj = await $functions.getCriteriaUpdate(
        //   $variables.createobj,
        //   JSON.parse(JSON.stringify($variables.wavier_type_dtls))
        // );

        const updateObj = await $functions.getCriteriaUpdate($variables.createobj);
         

        const response2 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/putGetCriteria',
          body: updateObj,
          headers: {
            'R_PAGE_NAME': 'criteria page -update button-ORDS-getCriteria',
            'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
            'R_USER_NAME': $application.variables.user,
          },
        });

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.createobj',
            '$page.variables.wavier_type_dtls',
            '$page.variables.dialogLabel',
          ],
        });

        if (!response2.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to update Criteria',
            displayMode: 'transient',
          });
          return;
        }

        await Actions.callComponentMethod(context, {
          selector: '#Add-criteria-modal',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Criteria updated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.callChain(context, {
          chain: 'SearchButtonActionChain4',
        });

      } catch (error) {
        const errorMessage =
          error?.body?.detail ||
          error?.body?.message ||
          error?.message.summary !== "" ||
          (error?.status ? `HTTP ${error.status}` : 'Update Failed');

          const response = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
            headers: {
              'R_PAGE_NAME': 'criteria page -update button-ORDS-putGetCriteria',
              'R_TRACE_ID': $application.variables.traceIdDisplay?$application.variables.traceIdDisplay:'',
              'R_USER_NAME': $application.variables.user,
            },
            
          body: {
            'p_api_name': 'getCriteria',
            'p_debug_message': errorMessage,
          },
          });

          await Actions.fireNotificationEvent(context, {
            displayMode: 'persist',
            type: 'error',
            message: 'Failed to Update',
            summary: error.message,
          });

       
      } finally{
       
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      
      }


    }
  }

  return UpdateButtonActionChain;
});
