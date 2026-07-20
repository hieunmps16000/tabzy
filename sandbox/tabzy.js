function Tabzy(selector) {
    this._tabs = document.querySelector(selector);
    this._contents = document.querySelectorAll(".tabzy__content");

    this._init();
}

Tabzy.prototype._init = function () {
    // Thêm class active cho li đầu tiên
    this._activeTab(this._tabs.querySelector("li:first-child"));

    // Lắng nghe sự kiện click
    this._tabs.querySelectorAll("li").forEach((li) => {
        li.addEventListener("click", () => {
            this._activeTab(li);
        });
    });
};

Tabzy.prototype._hiddenContent = function () {
    this._contents.forEach((content) => {
        content.hidden = true;
    });
};

Tabzy.prototype._activeTab = function (tabActiveEl) {
    this._tabs.querySelector(".tabzy--active")?.classList.remove("tabzy--active");
    tabActiveEl.classList.add("tabzy--active");

    // Lấy id trong href
    const tabActive = tabActiveEl.querySelector(`a`);
    const tabActiveId = tabActive.getAttribute("href");

    // Hiển thị content
    this._hiddenContent();
    document.querySelector(tabActiveId).hidden = false;
};

Tabzy.prototype.toggle = function (selector) {
    this._tabs.querySelector(".tabzy--active").classList.remove("tabzy--active");

    const tabActive = this._tabs.querySelector(`li a[href="${selector}"]`).closest("li");

    this._activeTab(tabActive);
};

Tabzy.prototype.destroy = function () {
    this._tabs.querySelectorAll("li").forEach((li) => {
        li.classList.remove("tabzy--active");
    });

    this._contents.forEach((content) => {
        content.hidden = false;
    });
};
