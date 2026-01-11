
import React from 'react';

const SCRIPT_CODE = `
function doPost(e) {
  try {
    // Lấy hoặc tạo sheet có tên 'Quiz Responses'
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Quiz Responses');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Quiz Responses');
      // Tạo hàng tiêu đề nếu sheet mới được tạo
      var headers = ['Timestamp', 'Email', 'A1', 'A2', 'A3', 'A4', 'A5', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3'];
      sheet.appendRow(headers);
    }

    var data = JSON.parse(e.postData.contents);

    // Sắp xếp dữ liệu theo đúng thứ tự các cột
    var rowData = [
      data.timestamp,
      data.email,
      data.A1 || '', data.A2 || '', data.A3 || '',
      data.A4 || '', data.A5 || '',
      data.C1 || '', data.C2 || '', data.C3 || '',
      data.D1 || '', data.D2 || '', data.D3 || ''
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`.trim();

const SetupInstructions: React.FC = () => {
  return (
    <div className="font-sans p-6 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Hướng Dẫn Kết Nối Google Sheet</h1>
        <p className="mb-6 text-lg">
          Để tự động gửi dữ liệu từ quiz vào Google Sheet, bạn cần tạo một Google Apps Script và kết nối nó với ứng dụng.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Các Bước Thực Hiện</h2>
          <ol className="list-decimal list-inside space-y-3 pl-2">
            <li>Mở trang Google Sheet bạn muốn dùng để lưu trữ dữ liệu.</li>
            <li>
              Trong menu, chọn <code className="bg-gray-200 p-1 rounded">Extensions</code> &gt; <code className="bg-gray-200 p-1 rounded">Apps Script</code>.
              Thao tác này sẽ mở trình soạn thảo script trong một tab mới.
            </li>
            <li>Xóa toàn bộ mã mặc định trong tệp <code className="bg-gray-200 p-1 rounded">Code.gs</code>.</li>
            <li>Sao chép và dán đoạn mã script dưới đây vào.</li>
            <li>
              Nhấn vào nút <strong className="font-semibold">"Deploy"</strong> ở góc trên bên phải, sau đó chọn <strong className="font-semibold">"New deployment"</strong>.
            </li>
            <li>
              Trong cửa sổ mới, nhấp vào biểu tượng bánh răng (Select type) và chọn <strong className="font-semibold">"Web app"</strong>.
            </li>
            <li>
              Trong mục <strong className="font-semibold">"Who has access"</strong>, chọn <strong className="font-semibold text-red-600">"Anyone"</strong>. Đây là bước rất quan trọng để ứng dụng có thể gửi dữ liệu mà không cần người dùng đăng nhập.
            </li>
            <li>Nhấn <strong className="font-semibold">"Deploy"</strong>. Bạn sẽ cần cấp quyền cho script trong lần đầu tiên thiết lập.</li>
            <li>Sau khi triển khai thành công, sao chép <strong className="font-semibold">"Web app URL"</strong> được cung cấp.</li>
            <li>
              Mở file <code className="bg-gray-200 p-1 rounded">components/QuizFlow.tsx</code> trong dự án của bạn và dán URL này vào hằng số <code className="bg-gray-200 p-1 rounded">SCRIPT_URL</code>.
            </li>
          </ol>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Mã Google Apps Script (dán vào Code.gs)</h2>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono whitespace-pre-wrap">
              {SCRIPT_CODE}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SetupInstructions;
