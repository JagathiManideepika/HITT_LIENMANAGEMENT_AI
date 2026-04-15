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

  class FilePickerSelectChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     * @param {any} params.rowData 
     */
    async run(context, { files, rowData }) {
      const { $page, $flow, $application, $functions, $variables } = context;
      if (files.length > 0) {
        const file = files[0];
        try {
          const response = await $functions.processFile(file);
          const fileData = {
            fileName: response.fileName,
            fileType: response.fileType,
            fileContent: response.fileContent
          };

           // let fileString = fileData.fileContent.split(',')[1];
          let obj = {
            "ap_invoice": rowData.ap_invoice,            
            "ap_invoice_amount": rowData.ap_invoice_amount || "",
            "supplier_name": rowData.supplier_name,
            "customer_name": rowData.customer_name,
            "hold_name": rowData.hold_name,          
            "project_number": rowData.project_number,
            "ar_invoice": rowData.ar_invoice,
            "ar_invoice_amount": rowData.ar_invoice_amount || "",
            "attribute1": rowData.attribute1,
            "attribute2": rowData.attribute2,
            "lag_days": rowData.lag_days,
            "po_number": rowData.po_number,
            "receipt_number": rowData.receipt_number,
            "attribute_3": rowData.attribute_3,
            "attribute_4": rowData.attribute_4,
            "attribute_5": rowData.attribute_5,
            "currency_code": rowData.currency_code,
            "hold_id": rowData.hold_id || "",
            "file_name": fileData.fileName,
            "file_type": fileData.fileType,
            "file_content": fileData.fileContent,
            "status":"Approval Pending"
          };
         

          const response2 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postGetaraplinkdetails',
            body: obj,
          });
          if (!response2.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Add Attachement',
            });

             return fileData;
          
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Attachement Inserted Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });

            await Actions.callChain(context, {
              chain: 'SearchBtnAction',
            });
          }
          return fileData;
        }
        catch (error) {
          console.error('Error processing file:', error);
        }
        // const processFile = await $functions.processFile(files);
      }
      else {
        console.log("No files selected");
      }


    }
  }

  return FilePickerSelectChain;
});
