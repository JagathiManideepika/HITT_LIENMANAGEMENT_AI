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

  class TableFirstSelectedRowChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {any} params.rowData 
     */
    async run(context, { rowKey, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;
      if (rowData) {

        if (rowData.attchment_status==="Completed") {
          $variables.iscomplete = false;

          $variables.isreject = false;

        }
        else if(rowData.attchment_status==="Rejected"){
          $variables.iscomplete = true;

        }else{
          $variables.isreject = true;
          $variables.iscomplete = true;
          
        }
      }
    }
  }

  return TableFirstSelectedRowChangeChain;
});
