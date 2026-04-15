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

  class ViewClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;

      const dailogViewDocumentsOpen = await Actions.callComponentMethod(context, {
        selector: '#dailogViewDocuments',
        method: 'open',
      });     
      if(document.getElementById('waveDocument')){
        document.getElementById('waveDocument').innerHTML=current.item.data.file_content;
      }
      
    }
  }

  return ViewClickChain;
});
