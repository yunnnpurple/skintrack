
/*
 * SkinTrack - Main Application
 * Follows the project rules defined in AGENTS.md.
 */

document.addEventListener("DOMContentLoaded", () => {
  const storage = SkinTrackStorage;

  const categoryNames = {
    cleanser: "清潔",
    toner: "化妝水",
    serum: "精華液",
    moisturizer: "乳液／乳霜",
    sunscreen: "防曬",
    other: "其他"
  };

  const categoryOrder = {
    cleanser: 1,
    toner: 2,
    serum: 3,
    moisturizer: 4,
    sunscreen: 5,
    other: 6
  };

  const today = getLocalDate(new Date());

  // Use local dates to avoid UTC date changes.
  function getLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function getSortedProducts() {
    return storage.getProducts().sort((a, b) =>
      (categoryOrder[a.category] || 99) -
      (categoryOrder[b.category] || 99)
    );
  }

  // 1. Page navigation
  document.querySelectorAll(".nav-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-button").forEach(item =>
        item.classList.remove("active")
      );

      document.querySelectorAll(".page").forEach(page =>
        page.classList.remove("active")
      );

      button.classList.add("active");

      const page = document.getElementById(button.dataset.page);
      if (page) page.classList.add("active");

      renderAll();
    });
  });

  document.getElementById("today-date").textContent =
    new Date().toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });

  // 2. Product management
  const form = document.getElementById("product-form");
  const cancelEdit = document.getElementById("cancel-edit");

  function resetForm() {
    form.reset();
    document.getElementById("product-id").value = "";
    document.getElementById("save-product").textContent = "儲存保養品";
    cancelEdit.hidden = true;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const id = document.getElementById("product-id").value;
    const brand = document.getElementById("product-brand").value.trim();
    const name = document.getElementById("product-name").value.trim();
    const category = document.getElementById("product-category").value;

    const routine = [];
    if (document.getElementById("routine-morning").checked) {
      routine.push("morning");
    }
    if (document.getElementById("routine-evening").checked) {
      routine.push("evening");
    }

    if (!brand || !name) {
      alert("請填寫品牌及產品名稱。");
      return;
    }

    if (routine.length === 0) {
      alert("請至少選擇一個使用時間。");
      return;
    }

    const products = storage.getProducts();

    if (id) {
      const index = products.findIndex(product => product.id === id);
      if (index === -1) {
        alert("找不到要編輯的產品。");
        return;
      }

      products[index] = {
        ...products[index],
        brand,
        name,
        category,
        routine
      };
    } else {
      products.push({
        id: crypto.randomUUID(),
        brand,
        name,
        category,
        routine
      });
    }

    if (!storage.saveProducts(products)) {
      alert("儲存失敗，請檢查瀏覽器儲存空間。");
      return;
    }

    resetForm();
    renderAll();
    alert(id ? "保養品已更新！" : "保養品新增成功！");
  });

  cancelEdit.addEventListener("click", resetForm);

  function renderProducts() {
    const container = document.getElementById("product-list");
    const products = getSortedProducts();

    if (products.length === 0) {
      container.innerHTML =
        "<p>目前還沒有保養品，先新增你的第一瓶吧！</p>";
      return;
    }

    container.innerHTML = products.map(product => {
      const times = product.routine.map(time =>
        time === "morning" ? "早上" : "晚上"
      ).join("、");

      return `
        <div class="product-item">
          <div>
            <strong>${escapeHTML(product.brand)}</strong>
            <div>${escapeHTML(product.name)}</div>
            <small>
              ${categoryNames[product.category] || "其他"} ·
              ${times}
            </small>
          </div>
          <div class="product-actions">
            <button type="button" data-action="edit"
                    data-id="${escapeHTML(product.id)}">
              編輯
            </button>
            <button type="button" data-action="delete"
                    data-id="${escapeHTML(product.id)}">
              刪除
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  document.getElementById("product-list")
    .addEventListener("click", event => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;

      const id = button.dataset.id;
      const products = storage.getProducts();
      const product = products.find(item => item.id === id);

      if (!product) return;

      if (button.dataset.action === "edit") {
        document.getElementById("product-id").value = product.id;
        document.getElementById("product-brand").value = product.brand;
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-category").value = product.category;

        document.getElementById("routine-morning").checked =
          product.routine.includes("morning");
        document.getElementById("routine-evening").checked =
          product.routine.includes("evening");

        document.getElementById("save-product").textContent = "更新保養品";
        cancelEdit.hidden = false;
        form.scrollIntoView({ behavior: "smooth" });
      }

      if (button.dataset.action === "delete") {
        if (!confirm(`確定刪除「${product.name}」嗎？`)) return;

        const updated = products.filter(item => item.id !== id);

        if (storage.saveProducts(updated)) {
          resetForm();
          renderAll();
        } else {
          alert("刪除失敗，請稍後再試。");
        }
      }
    });

  // 3. Daily skincare check-in
  function getTodayCheckins() {
    return storage.getCheckins()[today] || {};
  }

  function renderRoutine(time, containerId) {
    const container = document.getElementById(containerId);
    const products = getSortedProducts().filter(product =>
      product.routine.includes(time)
    );

    const checkins = getTodayCheckins();

    if (products.length === 0) {
      container.innerHTML =
        "<p>尚未安排產品，請到「我的保養品」新增。</p>";
      return;
    }

    container.innerHTML = products.map(product => {
      const key = `${time}:${product.id}`;
      const checked = Boolean(checkins[key]);

      return `
        <label class="routine-item ${checked ? "completed" : ""}">
          <input type="checkbox"
                 data-time="${time}"
                 data-id="${escapeHTML(product.id)}"
                 ${checked ? "checked" : ""}>
          <span>
            ${escapeHTML(product.brand)} ·
            ${escapeHTML(product.name)}
          </span>
        </label>
      `;
    }).join("");
  }

  function handleCheckin(event) {
    const input = event.target;

    if (!input.matches('input[type="checkbox"][data-time]')) return;

    const key = `${input.dataset.time}:${input.dataset.id}`;
    const allCheckins = storage.getCheckins();
    const daily = allCheckins[today] || {};

    daily[key] = input.checked;
    allCheckins[today] = daily;

    if (!storage.saveCheckins(allCheckins)) {
      alert("打卡紀錄儲存失敗。");
    }

    renderAll();
  }

  document.getElementById("morning-routine")
    .addEventListener("change", handleCheckin);

  document.getElementById("evening-routine")
    .addEventListener("change", handleCheckin);

  // 4. Daily progress
  function getDailyProgress(date) {
    const products = storage.getProducts();
    const checkins = storage.getCheckins()[date] || {};

    let total = 0;
    let completed = 0;

    products.forEach(product => {
      product.routine.forEach(time => {
        total++;

        if (checkins[`${time}:${product.id}`]) {
          completed++;
        }
      });
    });

    return {
      total,
      completed,
      percentage: total
        ? Math.round(completed / total * 100)
        : 0
    };
  }

  function renderProgress() {
    const progress = getDailyProgress(today);

    document.getElementById("progress-fill").style.width =
      `${progress.percentage}%`;

    document.getElementById("progress-text").textContent =
      progress.total === 0
        ? "請先新增保養品，開始你的保養日常。"
        : `已完成 ${progress.completed} / ${progress.total} 個步驟
           （${progress.percentage}%）`;
  }

  // 5. Weekly tracker and history
  function renderTracker() {
    const chart = document.getElementById("weekly-chart");
    const history = document.getElementById("history-list");
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() - i);

      const dateKey = getLocalDate(date);
      const progress = getDailyProgress(dateKey);

      days.push({
        date: dateKey,
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        ...progress
      });
    }

    chart.innerHTML = days.map(day => `
      <div class="weekly-day">
        <div>${day.label}</div>
        <strong>${day.percentage}%</strong>
      </div>
    `).join("");

    const activeDays = days.filter(day => day.total > 0);
    const average = activeDays.length
      ? Math.round(
          activeDays.reduce((sum, day) =>
            sum + day.percentage, 0
          ) / activeDays.length
        )
      : 0;

    document.getElementById("weekly-summary").textContent =
      `近七天平均完成率：${average}%`;

    const checkins = storage.getCheckins();
    const dates = Object.keys(checkins).sort().reverse();

    if (dates.length === 0) {
      history.innerHTML = "<p>目前沒有打卡紀錄。</p>";
      return;
    }

    history.innerHTML = dates.map(date => {
      const entries = Object.values(checkins[date] || {});
      const completed = entries.filter(Boolean).length;

      return `
        <div class="history-item">
          <strong>${escapeHTML(date)}</strong>
          <div>已完成 ${completed} 個保養步驟</div>
        </div>
      `;
    }).join("");
  }

  // Refresh all three sections after changes.
  function renderAll() {
    renderProducts();
    renderRoutine("morning", "morning-routine");
    renderRoutine("evening", "evening-routine");
    renderProgress();
    renderTracker();
  }

  renderAll();
});
