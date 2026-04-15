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

  class UploadFileToConditonAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     */
    async run(context, { files }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const processFile = await $functions.processFile(files[0]);

      $variables.currentRow.file_name = files[0].name;
      $variables.currentRow.file_type = files[0].type;
      $variables.currentRow.file_content = processFile.fileContent;



    }
  }

  return UploadFileToConditonAction;
});
