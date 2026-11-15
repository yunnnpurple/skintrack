# SkinTrack — 個人保養管理與追蹤網站

SkinTrack 是一個協助使用者整理保養品、安排每日保養流程及追蹤保養習慣的網站。

## 專案目的

希望解決使用者擁有多項保養品，卻不容易管理使用時間、保養順序及每日使用紀錄的問題。

## 網站功能

1. **今日保養（Dashboard）**：顯示早晚保養清單，提供打卡功能及每日完成率。
2. **我的保養品（My Products）**：新增、編輯及刪除保養品，設定產品類型及早晚使用時間。
3. **保養紀錄（Tracker）**：顯示近七天的保養完成率與歷史打卡紀錄。

## 使用技術

- HTML5：網頁結構
- CSS3：寶寶藍與咖啡色的響應式介面
- JavaScript：頁面互動與資料處理
- localStorage：保存使用者的保養品及打卡紀錄
- GitHub Pages：網站部署

## 專案檔案結構

```text
skintrack/
├── AGENTS.md
├── README.md
├── index.html
├── css/
│   └── style.css
└── js/
    ├── app.js
    └── storage.js
```

## AGENTS.md 開發規則

本專案使用 `AGENTS.md` 定義 AI 必須遵守的開發規範，包括：

- 專案目標與主要功能
- 網站配色、排版與設計風格
- 頁面及檔案結構
- 資料格式與儲存方式
- 新增及修改功能的規則
- 功能測試與文件更新要求

未來若要新增頁面或功能，AI 必須先閱讀 `AGENTS.md`，檢查現有程式架構，再進行必要修改，避免破壞原有功能。

## 未來擴充方向

- AI 自動搜尋保養品的品牌、成分與使用資訊
- 根據現有產品推薦適合補充的保養品
- 自動安排保養順序與每週使用頻率
- 新增每日膚況紀錄與趨勢分析

新增功能時，AI 應延續既有的寶寶藍與咖啡色設計，使用相同的檔案命名方式及資料結構，並在完成修改後測試相關功能。

## 網站連結

- GitHub Repository：https://github.com/yunnnpurple/skintrack
- 公開網站：https://yunnnpurple.github.io/skintrack/
