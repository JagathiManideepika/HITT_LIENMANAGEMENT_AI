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

  class ApproveRejectAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let allSuccessful = true;


      try {

        for (let i = 0; i < $variables.selectedRecords.length; i++) {
          const item = $variables.selectedRecords[i];

          const response = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postLienManagement_Approval_Search',
            body: {
              "workbench_pk": item.workbench_pk,
              "p_status": $variables.status
            },
            headers: {
              'R_PAGE_NAME': $variables.pageName,
              'R_USER_NAME': $application.variables.user,
              'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
            },
          });

          if (!response.ok) {
            allSuccessful = false;
            throw response;

          }
        }

        if (allSuccessful) {
          await Actions.fireNotificationEvent(context, {
            summary: "Attachment " + $variables.status + " Successfully",
            displayMode: 'transient',
            type: 'confirmation',
          });

          await Actions.callChain(context, {
            chain: 'SearchBtnAction',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: $variables.status === "Approved" ? "Failed to Approve Attachment" : "Failed to Reject Attachment",
            displayMode: 'transient',
            type: 'error',
          });
        }
      } catch (error) {

        const response2 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': $variables.pageName,
            'R_USER_NAME': $application.variables.user,
            'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
          }, body: {
            p_api_name: 'LienManagement_Approval_Search',
            p_debug_message: error?.message,
          },
        });
        await Actions.fireNotificationEvent(context, {
          summary: error.message,
          displayMode: 'transient',
          type: 'error',
        });

      } finally {
      }
    }
  }

  return ApproveRejectAction;
});
