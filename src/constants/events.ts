export const FEATURED_EVENT = {
  title: "2025UX趨勢發展分享",
  date: "December 8, 2024",
  time: "15:00 PM EST",
  tags: ["AI", "UX", "Design"],
  description: "探討2025年UX設計的發展趨勢，包含AI整合、使用者研究方法、介面設計創新，以及技術實作等重要主題。由業界專家分享最新見解，幫助設計師掌握未來發展方向。",
  imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
  requiresAuth: true,
  price: 500,
  skills: ["AI Integration", "UX Research", "Interface Design", "Technical Implementation"],
  isVirtual: true,
  maxSeats: 200,
  currentSeats: 0,
  host: {
    name: "溫明輝",
    title: "UX Research & Design Expert",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    stats: {
      courses: 12,
      articles: 45,
      students: 2800
    },
    expertise: [
      "AI/UX Integration",
      "Design Systems",
      "User Research",
      "Product Strategy"
    ],
    background: "40% 網路創業者 + 40 % 設計導師教授 + 20% UX 修行者與傳教士"
  }
} as const;