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

  class ActionsBtnClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let p_api_name = '';
      try {

        let obj = {
          "HoldFlag": false,
          "HoldReason": "Validated"
        };
        $variables.currentRow = current.row;
        $variables.currentRow.comments = $variables.comments;

        $variables.currentRow.status = current.row.next_status;

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        if (current.row.attchment_status === "NEW" || current.row.attchment_status === "Hold Released") {


          let obj = {
            ProjectNumber: current.row.project_number,
            InvoiceNumber: current.row.ap_invoice,
            InstallmentNumber: current.row.inv_installment_number,
            TemplateCode: current.row.template_code,
          };
          p_api_name = "LM_OIC/postLM_GENERATE_LIEN_REPORT1_0GetLeinReport";

          const response = await Actions.callRest(context, {
            endpoint: 'LM_OIC/postLM_GENERATE_LIEN_REPORT1_0GetLeinReport',
            body: obj,
               headers: {
              'R_TRACE_ID': $application.variables.traceIdDisplay?$application.variables.traceIdDisplay:'',
              'R_USER_NAME': $application.variables.user,
              'R_PAGE_NAME': 'Lien Management Workbench LM_OIC/postLM_GENERATE_LIEN_REPORT1_0GetLeinReport'
            },
          });

          if (!response.ok) {

            await Actions.fireNotificationEvent(context, {
              summary: 'failed to Download Receipt',
              displayMode: 'transient',
            });

            return;

            if(!response.ok){
              throw response;
            }
          } else {
            await $application.functions.downloadPDF(response.body.fileBase64Content, response.body.fileName);
            let data = { ...current.row };
            data.status = current.row.next_status;
            //  debugger;

            p_api_name = 'postGetaraplinkdetails';

            const response5 = await Actions.callRest(context, {
              endpoint: 'PWP_ORDS/postGetaraplinkdetails',
              body: data,
                  headers: {
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.variables.user,
              'R_PAGE_NAME': 'Lien Management Workbench -ORDS-postGetaraplinkdetails'
            },
            });

            

            if (!response5.ok) {
              throw response5;
            }

            await Actions.callChain(context, {
              chain: 'SearchBtnAction',
            });
          }
        }

        if (current.row.attchment_status === "Generate Conditional LW" || current.row.attchment_status === "Generate Unconditional LW") {

          await Actions.callComponentMethod(context, {
            selector: '#emaildlg',
            method: 'open',
          });
        }

        if (current.row.attchment_status === "Conditional LW sent to Supplier" || current.row.attchment_status === "Unconditional LW sent to Supplier" || current.row.attchment_status === "Rejected") {
          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.currentRow.file_name',
              '$page.variables.currentRow.file_content',
            ],
          });

          await Actions.callComponentMethod(context, {
            selector: '#uplddlg',
            method: 'open',
          });
        }

        if (current.row.attchment_status === "Supplier Signed Conditional LW uploaded") {

          p_api_name = "fsmRestApi/get11_13_18_05InvoicesInvoiceidChildInvoiceInstallments";
          if (current.row.invoice_id && current.row.inv_installment_number) {


            const response3 = await Actions.callRest(context, {
              endpoint: 'fsmRestApi/get11_13_18_05InvoicesInvoiceidChildInvoiceInstallments',
              uriParams: {
                invoiceid: current.row.invoice_id,
                'q=InstallmentNumber': current.row.inv_installment_number,
              },
            });

            if (!response3.ok) {
            throw response3;
            }

            // const response3 = await Actions.callRest(context, {
            //   endpoint: 'dev20/getInvoicesInvoiceidChildInvoiceInstallments',
            //   uriParams: {
            //     invoiceid: current.row.invoice_id,
            //     'q=InstallmentNumber': current.row.inv_installment_number,
            //   },
            // });
            p_api_name = "fsmRestApi/patch11_13_18_05InvoicesInvoiceidChildInvoiceInstallmentsHrefcode";

            const response4 = await Actions.callRest(context, {
              endpoint: 'fsmRestApi/patch11_13_18_05InvoicesInvoiceidChildInvoiceInstallmentsHrefcode',
              uriParams: {
                hrefcode: $functions.getAfterInvoiceInstallments(response3.body.items[0].links[0].href),
                invoiceid: current.row.invoice_id,
              },
              body: obj,
            });
             if (!response4.ok) {
            throw response4;
            }

            // const response4 = await Actions.callRest(context, {
            //   endpoint: 'dev20/patchInvoicesInvoiceidChildInvoiceInstallmentsHrefcode',
            //   uriParams: {
            //     hrefcode: $functions.getAfterInvoiceInstallments(response3.body.items[0].links[0].href),
            //     invoiceid: current.row.invoice_id,
            //   },
            //   body: obj,
            // });

            if (response4.ok) {
              let payload = {
                "ap_invoice": current.row.ap_invoice,
                "ap_invoice_amount": current.row.ap_invoice_amount,
                "ap_invoice_date": current.row.ap_invoice_date,
                "ar_invoice": current.row.ar_invoice,
                "ar_invoice_amount": current.row.ar_invoice_amount,
                "attchment_status": current.row.attchment_status,
                "attribute_3": current.row.attribute_3,
                "attribute_4": current.row.attribute_4,
                "attribute_5": current.row.attribute_5,
                "attribute1": current.row.attribute1,
                "attribute2": current.row.attribute2,
                "con_file_name": current.row.con_file_name,
                "con_file_type": current.row.con_file_type,
                "cond_uncond_flag": current.row.cond_uncond_flag,
                "conditional_signed_doc": current.row.conditional_signed_doc,
                "currency_code": current.row.currency_code,
                "customer_name": current.row.customer_name,
                "file_content": current.row.file_content,
                "file_name": current.row.file_name,
                "file_type": current.row.file_type,
                "hold_date": current.row.hold_date,
                "hold_id": current.row.hold_id,
                "hold_name": current.row.hold_name,
                "hold_released_date": current.row.hold_released_date,
                "installment_amount": current.row.installment_amount,
                "installment_remain_amount": current.row.installment_remain_amount,
                "inv_installment_number": current.row.inv_installment_number,
                "inv_line_number": current.row.inv_line_number,
                "invoice_id": current.row.invoice_id,
                "lag_days": current.row.lag_days,
                "lien_number": current.row.lien_number,
                "next_status": current.row.next_status,
                "payment_type": current.row.payment_type,
                "po_number": current.row.po_number,
                "project_number": current.row.project_number,
                "receipt_number": current.row.receipt_number,
                "show_cond_doc": current.row.show_cond_doc,
                "show_uncond_doc": current.row.show_uncond_doc,
                "supplier_email": current.row.supplier_email,
                "supplier_name": current.row.supplier_name,
                "supplier_number": current.row.supplier_number,
                "template_code": current.row.template_code,
                "uncon_file_name": current.row.uncon_file_name,
                "uncon_file_type": current.row.uncon_file_type,
                "unconditional_signed_doc": current.row.unconditional_signed_doc,
                "workbench_pk": current.row.workbench_pk,
                "status": current.row.next_status
              };
              p_api_name = "postGetaraplinkdetails";
              const response7 = await Actions.callRest(context, {
                endpoint: 'PWP_ORDS/postGetaraplinkdetails',
                body: payload,
                uriParams: {
                  'R_PAGE_NAME': 'Lien Management Workbench -ORDS-postGetaraplinkdetails',
                  'R_TRACE_ID': $application.variables.traceIdDisplay ?$application.variables.traceIdDisplay :'',
                  'R_USER_NAME': $application.variables.user,
                },
              });

              if (!response7.ok) {
              throw response7;

              }
              await Actions.fireNotificationEvent(context, {
                summary: 'Hold Released Successfully',
                displayMode: 'transient',
                type: 'confirmation',
              });

              await Actions.callChain(context, {
                chain: 'SearchBtnAction',
              });

            } else {
              await Actions.fireNotificationEvent(context, {
                summary: 'Failed To Release Hold',
                displayMode: 'transient',
                type: 'error',
              });

            }
            // await Actions.callChain(context, {
            //   chain: 'UpdateCOmmentsAction',
            // });
          } else {
            await Actions.fireNotificationEvent(context, {
              type: 'error',
              displayMode: 'transient',
              summary: 'Missing Invoice Number or Invoice ID',
            });

          }

          // debugger;

          // const response2 = await Actions.callRest(context, {
          //   endpoint: 'apReleaseHold/patchInvoiceHoldsHold_id',
          //   uriParams: {
          //     'hold_id': $variables.currentRow.hold_id,
          //   },
          //   body: {
          //     ReleaseName: 'Validated',
          //   },
          // });

          // if (!response2.ok) {


          //   return;
          // } else {
          //   await Actions.fireNotificationEvent(context, {
          //     summary: 'Hold Released Successfully',
          //     displayMode: 'transient',
          //     type: 'confirmation',
          //   });

          //   await Actions.callChain(context, {
          //     chain: 'UpdateCOmmentsAction',
          //   });
          // }

        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      } catch (error) {
        const errorMessage =
          error?.body?.detail ||
          error?.body?.message ||
          error?.message ||
          'Unexpected error';

        const debugMessage = String(errorMessage)
          .replace(/[\r\n]+/g, ' ')
          .substring(0, 1000);
          
          const response6 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postLM_ORCL_REST_API',
            headers: {
              R_USER_NAME: $application.variables.user,
              R_TRACE_ID: $application.variables.traceIdDisplay,
              R_PAGE_NAME: 'Lien Management Workbench errorTrack/postOrdsTimeriteLienManagementLM_ORCL_REST_API ActionsBtnClickAction',
            },
            body: {
              p_api_name: p_api_name,
              p_debug_message: debugMessage,
            },
          });

          await Actions.fireNotificationEvent(context, {
            summary: debugMessage,
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

  return ActionsBtnClickAction;
});
