import { jsPDF } from "jspdf";

export const PDFExport = (NumberList) => {
  const doc = new jsPDF();

  const itemsPerPage = 26;

  let currentPage = 1;
  let currentY = 10;
  let isFirstColumn = true;

  for (let i = 0; i < NumberList.length; i += itemsPerPage) {
    const remainingData = NumberList.length - i;
    const pageData1 = NumberList.slice(i, i + itemsPerPage);
    const pageData2 =
      remainingData >= itemsPerPage
        ? NumberList.slice(i + itemsPerPage, i + itemsPerPage * 2)
        : [];
    const pageData3 =
      remainingData >= itemsPerPage * 2
        ? NumberList.slice(i + itemsPerPage * 2, i + itemsPerPage * 3)
        : [];

    // Add heading
    doc.setFontSize(12);
    doc.text(`Page ${currentPage}`, 10, currentY);
    currentY += 10;
    doc.text("ID    Numbers", 10, currentY);
    currentY += 10;

    pageData1.forEach((item, index) => {
      doc.text(
        `(${item.id})    ${item.numbers}`,
        isFirstColumn ? 10 : 60,
        currentY
      );
      currentY += 10;
    });

    if (pageData2.length > 0) {
      isFirstColumn = false;
      currentY = 30;
      pageData2.forEach((item, index) => {
        doc.text(
          `(${item.id})    ${item.numbers}`,
          isFirstColumn ? 20 : 80,
          currentY
        );
        currentY += 10;
      });
    }

    if (pageData3.length > 0) {
      isFirstColumn = false;
      currentY = 30;

      pageData3.forEach((item, index) => {
        doc.text(
          `(${item.id})    ${item.numbers}`,
          isFirstColumn ? 30 : 150,
          currentY
        );
        currentY += 10;
      });
    }

    // Move to the next page
    if (i + itemsPerPage < NumberList.length) {
      doc.addPage();
      currentPage++;
      currentY = 20;
      isFirstColumn = true;
    }
  }

  // Save the PDF
  doc.save("data.pdf");
};
