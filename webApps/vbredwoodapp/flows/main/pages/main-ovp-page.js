define(["ojs/ojconverter-number"], (numberConverter) => {
  'use strict';

  class PageModule {

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };


    createPayloadGenerator(currobj) {
      // debugger;
     
      let obj = {
        "applicable_state": currobj.applicable_state,
        "criteria_id": currobj.criteria_id,
        "project_id": currobj.project_id,
        "site_id": currobj.site_id,
        "supplier_number": currobj.supplier_number,
        "supplier_site_id": currobj.supplier_site_id,
        "task_number": currobj.task_number,
        "top_task_id": currobj.top_task_id,
        "include_subtask_flag": currobj.include_subtask_flag,
        "task_id": currobj.task_id,
        "expenditure_category": currobj.expenditure_category,
        "include_allexp_typ_flag": currobj.include_allexp_typ_flag,
        "expenditure_type": currobj.expenditure_type,
        "supplier_id": currobj.supplier_id,
        "start_dt": this.formatDate(currobj.start_dt_copy),
        "end_dt": currobj.end_dt_copy ? this.formatDate(currobj.end_dt_copy) : "",
        "lag_days": currobj.lag_days,
        "enabled_flag": currobj.enabled_flag_copy === true ? 'Y' : 'N',
        "new_column_13": currobj.new_column_13,
        "project_name": currobj.project_name,
        "top_task_name": currobj.top_task_name,
        "task_name": currobj.task_name,
        "supplier_name": currobj.supplier_name,
        "invoice_amount_limit": currobj.invoice_amount_limit,
        "creation_date": new Date().toISOString().split('T')[0],
        "criteria_name": currobj.criteria_name,
        "supplier_site": currobj.supplier_site,
        "project_number": currobj.project_number,
        "top_task_number": currobj.top_task_number,
        "weiver_type": currobj.weiver_type,
        "enabled_flag_copy": currobj.enabled_flag_copy,
        // "uncond_lw_final_payment": arrayvals.includes("Unconditional Lien Waiver and Release For Final Payment") ? 'Y' : 'N',
        // "cond_lw_progress_payment": arrayvals.includes("Conditional Lien Waiver and Release For Progress Payment") ? 'Y' : 'N',
        // "uncond_lw_progress_payment": arrayvals.includes("Unconditional Lien Waiver and Release For Progress Payment") ? 'Y' : 'N',
        // "cond_lw_final_payment": arrayvals.includes("Conditional Lien Waiver and Release For Final Payment") ? 'Y' : 'N',

      }

      return obj;
    }

    getcheckedvalues(data) {
      let obj = {
        "cond_lw_final_payment": null,
        "cond_lw_progress_payment": null,
        "uncond_lw_final_payment": null,
        "uncond_lw_progress_payment": null
      };
      if (!data || typeof data !== 'string') {
        return obj;
      }
      const normalizedData = data.toLowerCase();
      if (normalizedData.includes("unconditional lien waiver and release for final payment")) {
        obj.uncond_lw_final_payment = 'Y';
      }
      if (normalizedData.includes("conditional lien waiver and release for progress payment")) {
        obj.cond_lw_progress_payment = 'Y';
      }
      if (normalizedData.includes("unconditional lien waiver and release for progress payment")) {
        obj.uncond_lw_progress_payment = 'Y';
      }
      if (normalizedData.includes("conditional lien waiver and release for final payment")) {
        obj.cond_lw_final_payment = 'Y';
      }
      return obj;
    }


    getCheckedLabels(myflags) {
     let flags= JSON.parse(JSON.stringify(myflags));
      const result = [];

      if (flags.cond_lw_final_payment === 'Y') {
        result.push("Conditional Lien Waiver and Release For Final Payment");
      }

      if (flags.cond_lw_progress_payment === 'Y') {
        result.push("Conditional Lien Waiver and Release For Progress Payment");
      }

      if (flags.uncond_lw_final_payment === 'Y') {
        result.push("Unconditional Lien Waiver and Release For Final Payment");
      }

      if (flags.uncond_lw_progress_payment === 'Y') {
        result.push("Unconditional Lien Waiver and Release For Progress Payment");
      }

      return result;
    }


    getUniqueProjects(mydata) {
      let data = JSON.parse(JSON.stringify(mydata));
      const seen = new Set();
      const uniqueProjects = [];

      for (const record of data) {
        if (!seen.has(record.ProjectName)) {
          seen.add(record.ProjectName);
          uniqueProjects.push(record);
        }
      }
      return uniqueProjects;
    }

    handleSwitchChange(event, context) {
      const newValue = event.detail.value ? 1 : 0; // Map true/false to 1/0
      const rowData = context.cell.row; // Access the current row data


      rowData.enabled_flag = newValue;

      console.log(`Switch toggled: Project ID ${rowData.project_id}, New Value: ${newValue}`);
    }


    getUniquefilters(data) {
      if (data) {
        let uniqcat = [];
        let uniqueCategoryt = [];
        data.forEach((itm) => {
          if (uniqcat.indexOf(itm.ExpenditureCategory) === -1) {
            uniqcat.push(itm.ExpenditureCategory);
            uniqueCategoryt.push(itm);
          }
        });
        return uniqueCategoryt;
      }
    };


    getUniqueTypefilters(data) {
      if (data) {
        let uniqcat = [];
        let uniqueCategoryt = [];
        data.forEach((itm) => {
          if (uniqcat.indexOf(itm.ExpenditureTypeName) === -1) {
            uniqcat.push(itm.ExpenditureTypeName);
            uniqueCategoryt.push(itm);
          }
        });
        return uniqueCategoryt;
      }
    };

    getSupplierfilters(data) {
      if (data) {
        let uniqcat = [];
        let uniqueSupplier = [];
        data.forEach((itm) => {
          if (uniqcat.indexOf(itm.SupplierSite) === -1) {
            uniqcat.push(itm.SupplierSite);
            uniqueSupplier.push(itm);
          }
        });


        return uniqueSupplier;
      }
    };
    getCriteriaUpdate(data) {
      // debugger;
      let payloadObj = {
        "P_PROJECT_ID": data.project_id,
        "P_PROJECT_NAME": data.project_name,
        "P_PROJECT_NUMBER": data.project_number,
        "P_TOP_TASK_ID": data.top_task_id,
        "P_TOP_TASK_NUMBER": data.top_task_number ?data.top_task_number:'',
        "P_TOP_TASK_NAME": data.top_task_name,
        "P_TASK_ID": data.task_id,
        "P_TASK_NUMBER": data.task_number ? data.task_number :'',
        "P_TASK_NAME": data.task_name,
        "P_EXPENDITURE_CATEGORY": data.expenditure_category,
        "P_EXPENDITURE_TYPE": data.expenditure_type,
        "P_INCLUDE_ALLEXP_TYP_FLAG": data.include_allexp_typ_flag,
        "P_SUPPLIER_ID": data.supplier_id,
        "P_SUPPLIER_NUMBER": data.supplier_number,
        "P_SUPPLIER_NAME": data.supplier_name,
        "P_SUPPLIER_SITE_ID": data.supplier_site_id,
        "P_SUPPLIER_SITE": data.supplier_site,
        "P_START_DT": data.start_dt_copy ? this.formatDate(data.start_dt_copy):"",
        "P_END_DT": data.end_dt_copy ? this.formatDate(data.end_dt_copy) : "",
        "P_LAG_DAYS": data.lag_days,
        "P_ENABLED_FLAG": data.enabled_flag_copy === true ? 'Y' : 'N',
        "P_STATE": data.applicable_state ?data.applicable_state:'',
        "P_WEIVER_TYPE": data.weiver_type ?data.weiver_type:'',
        "P_INVOICE_AMOUNT_LIMIT": data.invoice_amount_limit,
        "P_NEW_COLUMN_13": "",
        "P_INCLUDE_SUBTASK_FLAG": data.include_subtask_flag,
        "P_CRITERIA_ID": data.criteria_id,
        // "P_COND_LW_FINAL_PAYMENT": arrayvals.includes("Conditional Lien Waiver and Release For Final Payment") ? 'Y' : 'N',
        // "P_COND_LW_PROGRESS_PAYMENT": arrayvals.includes("Conditional Lien Waiver and Release For Progress Payment") ? 'Y' : 'N',
        // "P_UNCOND_LW_FINAL_PAYMENT": arrayvals.includes("Unconditional Lien Waiver and Release For Final Payment") ? 'Y' : 'N',
        // "P_UNCOND_LW_PROGRESS_PAYMENT": arrayvals.includes("Unconditional Lien Waiver and Release For Progress Payment") ? 'Y' : 'N'
      };
      return payloadObj;

    };



  }

  return PageModule;
});
