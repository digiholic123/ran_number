import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import { jsPDF } from "jspdf";
import ExportData from "./ExportToExcel";
import { PDFExport } from "./ExportPDF";
import { GetRandomNo } from "./getRandomNo";
function App() {
  const [InputNumber, setInputNumber] = useState("");
  const [InputNumberCount, setInputNumberCount] = useState("");
  const [NumberList, setNumberList] = useState([]);

  const onsubmit = () => {
    GetRandomNo(InputNumber, InputNumberCount, setNumberList);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "NUMBERS",
      selector: (row) => row.numbers,
    },
  ];

  const exportPdf = () => {
    PDFExport(NumberList);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        background: "#0d6efd",
        color: "#fff",
        padding: "10px , 13px",
      },
    },
    cells: {
      style: {
        padding: "8px , 13px",
      },
    },
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center "
      style={{ height: "100vh" }}
    >
      <div className="row">
        <div className="col-12 ">
          <h1 className="my-5 text-center">Random Number Generator</h1>
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center ">
                <div class="mb-3 col-3 mx-1">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Your Number"
                    onChange={(e) => setInputNumber(e.target.value)}
                  />
                </div>
                <div class="mb-3 col-3 mx-1">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Number Count"
                    onChange={(e) => setInputNumberCount(e.target.value)}
                  />
                </div>
                <div className="col-10 col-sm-10 d-flex">
                  <button
                    type="submit"
                    class="btn btn-primary mb-3 mx-1"
                    onClick={onsubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary mb-3 mx-1"
                    onClick={exportPdf}
                  >
                    Get Pdf
                  </button>
                  <ExportData data={NumberList && NumberList} />
                </div>
              </div>

              {/* <DataTableExtensions {...tableData}> */}
              <DataTable
                columns={columns}
                data={NumberList && NumberList}
                noHeader
                defaultSortField="id"
                // sortIcon={<SortIcon />}
                defaultSortAsc={true}
                pagination
                highlightOnHover
                dense
                customStyles={customStyles}
                // actions={actionsMemo}
              />
              {/* </DataTableExtensions> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
