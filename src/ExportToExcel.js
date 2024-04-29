import React from "react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

const ExportData = ({ data }) => {
  //   const data = [
  //     { Name: 'John', Age: 30, City: 'New York' },
  //     { Name: 'Alice', Age: 25, City: 'Los Angeles' },
  //     { Name: 'Bob', Age: 35, City: 'Chicago' }
  //   ];

  const exportToCSV = () => {
    return (
      <CSVLink className="btn btn-primary" data={data} filename={"data.csv"}>
        Export CSV
      </CSVLink>
    );
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: fileType });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.xlsx";
    link.click();
  };

  return (
    <div>
      {exportToCSV()}
      <button className="btn btn-primary mx-1" onClick={exportToExcel}>Export Excel</button>
    </div>
  );
};

export default ExportData;
