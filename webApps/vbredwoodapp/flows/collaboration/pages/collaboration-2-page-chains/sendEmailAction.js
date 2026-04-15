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

  class sendEmailAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      try {

        const validateGroup = await $functions.validateGroup('emailvalidation');
        if(validateGroup==="valid"){

        

        let obj = {
          "ProjectNumber": $variables.currentRow.project_number,
          "InvoiceNumber": $variables.currentRow.ap_invoice,
          "InstallmentNumber": $variables.currentRow.inv_installment_number,
          "TemplateCode": $variables.currentRow.template_code,
          "SupplierEmail": $variables.currentRow.supplier_email
        }

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response2 = await Actions.callRest(context, {
          endpoint: 'LM_OIC/postLM_SEND_LW_TO_SUPPL_EMAIL1_0GetLeinReport',
          body: obj,
           headers: {
            'R_USER_NAME': $application.variables.user,
            'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
            'R_PAGE_NAME': 'Lien Management Workbench LM_OIC/postLM_SEND_LW_TO_SUPPL_EMAIL1_0GetLeinReport',
          },
        });

          if (!response2.ok) {
            throw response2;
          }

        if (response2.ok) {
           const response = await Actions.callRest(context, {
             endpoint: 'PWP_ORDS/postGetaraplinkdetails',
             body: $variables.currentRow,
             uriParams: {
               'R_PAGE_NAME': 'Lien Management Workbench LM_OIC/postLM_SEND_LW_TO_SUPPL_EMAIL1_0GetLeinReport',
               'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay:'',
               'R_USER_NAME': $application.variables.user,
             },
           });

          if (!response.ok) {
             await Actions.fireNotificationEvent(context, {
               summary: 'Failed to send the Email',
               displayMode: 'transient',
             });

            return;
          } else {
             await Actions.fireNotificationEvent(context, {
               summary: 'Email Sent Successfully to the Supplier',
               displayMode: 'transient',
               type: 'confirmation',
             });

            await Actions.callChain(context, {
              chain: 'SearchBtnAction',
            });

             const emaildlgClose = await Actions.callComponentMethod(context, {
               selector: '#emaildlg',
               method: 'close',
             });
          }
        } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Send Email',
              displayMode: 'transient',
            });

          const emaildlgClose2 = await Actions.callComponentMethod(context, {
            selector: '#emaildlg',
            method: 'close',
          });
        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Enter Email',
            displayMode: 'transient',
            type: 'error',
          });
          
        }
      } catch (error) {

          const response3 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
            headers: {
              'R_PAGE_NAME': 'Lien Management Workbench LM_OIC/postLM_SEND_LW_TO_SUPPL_EMAIL1_0GetLeinReport',
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.variables.user,
            },
            body: {
              p_api_name: 'sendEmailAction',
              p_debug_message: error.message || 'Unknown error'
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

  return sendEmailAction;
});
