
import type { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // AWARENESS
  {
    id: 'A1',
    stage: 'AWARENESS',
    question: 'Có bao giờ bạn giật mình nhận ra một kỷ niệm vui nào đó đang dần phai nhạt không?',
    options: ['Có, mình hay sợ quên', 'Thỉnh thoảng nghĩ vậy', 'Chưa để ý lắm'],
  },
  {
    id: 'A2',
    stage: 'AWARENESS',
    question: 'Bạn có dành thời gian trong tuần cho riêng mình, để sắp xếp lại những suy nghĩ bộn bề không?',
    options: ['Có, mình luôn cố gắng', 'Thỉnh thoảng, khi có mood', 'Cuộc sống cuốn đi mất'],
  },
  {
    id: 'A3',
    stage: 'AWARENESS',
    question: 'Nếu có, bạn thường ghi lại những điều đó ở đâu?',
    options: ['Trong sổ tay', 'Ghi chú điện thoại', 'File word/excel', 'Chỉ nghĩ trong đầu'],
  },
  {
    id: 'A4',
    stage: 'AWARENESS',
    question: 'Có khi nào muốn viết lắm nhưng mở trang giấy ra lại không biết bắt đầu từ đâu không?',
    options: ['Rất quen, chuyện thường ngày', 'Thỉnh thoảng cũng bị', 'Mình không gặp vấn đề này'],
  },
  {
    id: 'A5',
    stage: 'AWARENESS',
    question: 'Nếu có một gợi ý nhỏ mỗi ngày để bắt đầu và mọi thứ được sắp xếp tự động, bạn có nghĩ điều đó sẽ giúp ích không?',
    options: ['Chắc chắn sẽ giúp', 'Nghe cũng hay', 'Mình chưa chắc'],
  },
  // CONSIDERATION
  {
    id: 'C1',
    stage: 'CONSIDERATION',
    question: 'Điều gì khiến bạn cảm thấy "ngại" nhất khi nghĩ đến việc ghi chép?',
    options: ['Thấy mất thời gian', 'Không biết bắt đầu từ đâu', 'Viết xong khó tìm lại', 'Khó duy trì đều nặn'],
  },
  {
    id: 'C2',
    stage: 'CONSIDERATION',
    question: 'Trong cuốn sách cuộc đời bạn, chương nào bạn muốn đọc lại nhiều nhất?',
    options: ['Về cảm xúc, tâm trạng', 'Về thành tựu, bài học', 'Về kế hoạch, ước mơ'],
  },
  {
    id: 'C3',
    stage: 'CONSIDERATION',
    question: 'Nếu có nơi giúp bạn làm tất cả điều này dễ dàng, bạn có muốn xem nó hoạt động thế nào không?',
    options: ['Có, cho mình xem qua nhé', 'Có lẽ lúc khác'],
  },
  // DECISION
  {
    id: 'D1',
    stage: 'DECISION',
    question: 'Bạn nghĩ sao về một "người bạn đồng hành" mỗi ngày chỉ cần 5 phút gửi bạn một câu hỏi ý nghĩa?',
    options: ['Ý tưởng tuyệt vời!', 'Cũng thú vị đấy', 'Mình cần tìm hiểu thêm'],
  },
  {
    id: 'D2',
    stage: 'DECISION',
    question: 'Bạn có muốn cảm xúc, cột mốc của mình được sắp xếp thành một "thư viện tâm hồn" không?',
    options: ['Chắc chắn là có', 'Nghe hay quá!', 'Để mình xem thử'],
  },
  {
    id: 'D3',
    stage: 'DECISION',
    question: 'Bạn đã sẵn sàng bắt đầu viết nên câu chuyện cuộc đời mình một cách xứng đáng nhất chưa?',
    options: ['Tôi đã sẵn sàng!', 'Cho tôi thử ngay!'],
  },
];
