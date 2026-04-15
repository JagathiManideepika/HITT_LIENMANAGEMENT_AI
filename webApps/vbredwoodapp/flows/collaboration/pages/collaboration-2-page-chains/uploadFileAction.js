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

  class uploadFileAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      try {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/postGetaraplinkdetails',
          body: $variables.currentRow,
          headers: {
            'R_PAGE_NAME': 'Lien Management Workbench- Upload File Button',
            'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
            'R_USER_NAME': $application.variables.user,
          }
        });

        if (!response.ok) {

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Upload File',
            displayMode: 'transient',
          });
        
          return;
        } else {
           await Actions.fireNotificationEvent(context, {
             summary: 'File Uploaded Successfully',
             displayMode: 'transient',
             type: 'confirmation',
           });

          await Actions.callChain(context, {
            chain: 'SearchBtnAction',
          });

          const uplddlgClose = await Actions.callComponentMethod(context, {
            selector: '#uplddlg',
            method: 'close',
          });
        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      } catch (error) {

          const response2 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
            headers: {
            'R_PAGE_NAME': 'Lien Management Workbench- Upload File Button',
            'R_TRACE_ID': $application.variables.traceIdDisplay? $application.variables.traceIdDisplay:'' ,
            'R_USER_NAME': $application.variables.user,
          },
         
          body: {
              p_api_name: 'postGetaraplinkdetails -ORDS',
              p_debug_message: error.message || 'Unknown error'
            },
          });
             await Actions.fireNotificationEvent(context, {
            summary: error.message,
            displayMode: 'transient',
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

  return uploadFileAction;
});
