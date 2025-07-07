function downloadPredefinedPalette(name, colors) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0); // garante que o texto fique preto
  doc.text(name, 20, 20);

  colors.forEach((color, i) => {
    doc.setFillColor(color);
    doc.rect(20, 35 + i * 25, 30, 20, 'F'); // aumentei o y inicial para 35 para evitar sobreposição
    doc.setTextColor(0, 0, 0);
    doc.text(color, 60, 50 + i * 25);
  });

  doc.save(name.replace(/\s+/g, '_').toLowerCase() + '.pdf');
}







