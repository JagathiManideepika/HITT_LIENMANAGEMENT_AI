define([], () => {
  'use strict';

  class PageModule {


    filterData(selected, mydata, selectedKeys) {
      let data = JSON.parse(JSON.stringify(mydata));
      var keys = [];
      var filteredData = [];
      if (selected.row.isAddAll()) {
        var iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        filteredData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.workbench_pk === obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.workbench_pk === obj2;
          });
        });
      }
      return filteredData;
    };

    downloadBase64Files(dataUrl, fileName) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    downloadBase64File(base64String, fileName, mimeType) {
      const link = document.createElement('a');
      link.href = base64String;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    //this is temporary we need to remove once the actual data is mapped
    addPaymentTypeTemporarily(data) {
      data.forEach((element, index) => {
        if (index % 2 !== 0) {
          element.payment_type = "Progress";
        } else {
          element.payment_type = "Final";
        }
      });
      return data;

    }



  }

  return PageModule;
});
