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
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { files, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      $variables.fileName = files[0].name;
      $variables.isRelease = true;

      $variables.collabration2ADP.data[index].status = "Sent for Approval";
      
      
    }
  }

  return FilePickerSelectChain;
});
