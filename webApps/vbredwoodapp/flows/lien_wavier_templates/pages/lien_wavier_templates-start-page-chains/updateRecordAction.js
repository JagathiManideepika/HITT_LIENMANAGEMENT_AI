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

  class updateRecordAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      try {

        //  debugger;
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        let obj = {
          "end_date": $application.functions.sendAsYearMonthDate(current.row.end_date),
          "enable_flag": current.row.enable_flag,
          "applicable_states": current.row.applicable_states,
          "template_line_id": current.row.template_line_id
        }

        const response = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/patchLM_Wavier_Templates_HDR',
          body: obj,
          headers: {
            'R_PAGE_NAME': 'templates page - update template - ORDS -patchLM_Wavier_Templates_HDR',
            'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
            'R_USER_NAME': $application.variables.user,
          },
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        if (!response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'failed to Update Template',
            displayMode: 'transient',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Template Updated Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });


          const response = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/getLM_Wavier_Templates_Lines',
            uriParams: {
              'p_template_name': $variables.srchTemplate ? $variables.srchTemplate : "",
            },
          });

          if (response.ok) {
            $variables.waveTemplateADP.data = response.body.items;
          }
          else {
            await Actions.fireNotificationEvent(context, {
              type: 'error',
              summary: 'No Records Found',
              displayMode: 'transient',
            });

          }
        }
      } catch (error) {

        const response2 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
          headers: {
            'R_PAGE_NAME': 'templates page - update template - ORDS -patchLM_Wavier_Templates_HDR',
            'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
            'R_USER_NAME': $application.variables.user,
          },

          body: {
            'p_api_name': 'LM_Wavier_Templates_HDR',
            'p_debug_message': error.message,
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'error.message',
          message: 'Failed to Update Template',
          displayMode: 'persist',
          type: 'error',
        });

      } finally {
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }
    }
  }

  return updateRecordAction;
});
