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

  class TemplateTypeValueChangeAction extends ActionChain {


    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      // if(key){
          
      //   if (data.template_name === "Unconditional Waiver and Release Upon Final Payment") {
      //     document.getElementById('waiverContainer').innerText = data.template_text;
      //     $variables.headerObj.result =  data.template_text ;
      //   } else if (data.template_name === "Conditional Waiver and Release Upon Progress Payment") {
      //     document.getElementById('waiverContainer').innerText = data.template_text;
      //     $variables.headerObj.result = data.template_text;
      //   } else if (data.template_name === "Unconditional Waiver and Release Upon Progress Payment") {
      //     document.getElementById('waiverContainer').innerText = data.template_text;
      //     $variables.headerObj.result = data.template_text ;
      //   } else if (data.template_name === "Conditional Waiver and Release Upon Final Payment") {
      //     document.getElementById('waiverContainer').innerText =  data.template_text;
      //     $variables.headerObj.result = data.template_text ;
      //   }
      
      
      
      // }else{
      //   document.getElementById('waiverContainer').innerHTML = "";
        
      // }
    }
  }

  return TemplateTypeValueChangeAction;
});
