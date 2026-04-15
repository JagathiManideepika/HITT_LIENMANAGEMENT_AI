/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class updateAllFilters extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context, { value }) {
      const { $page, $application } = context;

      $page.variables.allFilters = $page.variables.selectContextValueItem && $page.variables.selectContextValueItem.key ? ((value || []).concat([{ 'filter': 'keyword', 'value': $page.variables.selectContextValueItem.key, 'label': $page.variables.selectContextValueItem.data ? $page.variables.selectContextValueItem.data.label : $page.variables.selectContextValueItem.key }])) :  value;

      const callStringifyFiltersMethod = await Actions.callComponentMethod(context, {
        selector: '#oj_ssp1',
        method: 'stringifyFilters',
      });

      await Actions.navigateToPage(context, {
        page: $application.currentPage.id ,
        params: {
          appliedFiltersStr: callStringifyFiltersMethod,
          selectContextValue: $page.variables.selectContextValue,
          displayMode: $page.variables.displayMode
        },
      });
    }
  }

  return updateAllFilters;
});
