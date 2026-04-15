define([], () => {
  'use strict';

  class PageModule {

    formatDate(dateStr) {
      const date = new Date(dateStr);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);

      return `${day}-${month}-${year}`;
    }

    exportLOGS(data) {
      if (data && data.length > 0) {

        let headerFields = [
          "SequenceID",
          "SessionID",
          "API Name",
          "Page Name",
          "Debug Message",
          "Error Code",
          "Error Details",
          "Procedure Name",
          "UserID"
        ];

        let rows = data.map((itm) => [
          itm["sequence_id"],
          itm["session_id"],
          itm["api_name"],
          itm["page_name"],
          itm["debug_message"],
          itm["error_code"],
          itm["error_details"],
          itm["procedure_name"],
          itm["user_id"]
        ]);

        let csvContent = [headerFields, ...rows]
          .map(row => row.map(val => `"${val ?? ''}"`).join(","))
          .join("\n");

        // Create file and download
        let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        let link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "LogsData.csv";
        link.click();

        return true;
      }
    }
  }

  return PageModule;
});