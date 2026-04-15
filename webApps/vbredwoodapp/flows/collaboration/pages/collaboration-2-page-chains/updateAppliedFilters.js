/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class updateAppliedFilters extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page } = context;

      const compareToSimplifedFilterChipsResult = await Actions.callComponentMethod(context, {
        selector: '#oj_ssp1',
        method: 'compareToSimplifedFilterChips',
        params: [$page.variables.appliedFiltersStr]
      });

      if (!compareToSimplifedFilterChipsResult) {
        $page.variables.appliedFilters = $page.variables.appliedFiltersStr && $page.variables.appliedFiltersStr.length > 0 ? JSON.parse($page.variables.appliedFiltersStr) : [];
      }
    }
  }

  return updateAppliedFilters;
});
