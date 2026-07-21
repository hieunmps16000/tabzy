function Tabzy(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) {
        console.error(`Tabzy: No container found for selector ${selector}`);
        return;
    }
    this.tabs = Array.from(this.container.querySelectorAll("li a"));
    if (!this.tabs.length) {
        console.error(`Tabzy: No tabs found inside the container`);
        return;
    }

    this.panels = this.tabs
        .map((tab) => {
            const panel = document.querySelector(tab.getAttribute("href"));
            if (!panel) {
                console.error("Tabzy: No found tabs");
            }
            return panel;
        })
        .filter(Boolean);

    if (this.tabs.length !== this.panels.length) return;

    this.opt = Object.assign(
        {
            memory: false,
        },
        options,
    );

    this._init();
}

Tabzy.prototype._init = function () {
    const hash = location.hash;
    const tab = (this.opt.memory && hash && this.tabs.find((tab) => tab.getAttribute("href") === hash)) || this.tabs[0];
    this._activeTab(tab);

    this.tabs.forEach((tab) => {
        tab.onclick = (event) => {
            this._handleTabClick(event, tab);
        };
    });
};

Tabzy.prototype._handleTabClick = function (event, tab) {
    event.preventDefault();
    this._activeTab(tab);
};

Tabzy.prototype._activeTab = function (tab) {
    // Remove class tabzy--active
    this.tabs.forEach((tab) => {
        tab.closest("li").classList.remove("tabzy--active");
    });

    // Add class tabzy--active
    tab.closest("li").classList.add("tabzy--active");

    // Hidden panels
    this.panels.forEach((panel) => (panel.hidden = true));

    // Show panel
    const panelActive = document.querySelector(tab.getAttribute("href"));
    panelActive.hidden = false;

    if (this.opt.memory) {
        history.replaceState(null, null, tab.getAttribute("href"));
    }
};

Tabzy.prototype.switch = function (input) {
    let tabToActive = null;
    if (typeof input === "string") {
        tabToActive = this.tabs.find((tab) => {
            return tab.getAttribute("href") === input;
        });
        if (!tabToActive) {
            console.error(`Tabzy: No panel found with ID: ${input}`);
            return;
        }
    } else if (this.tabs.includes(input)) {
        tabToActive = input;
    }
    if (!tabToActive) {
        console.error(`Tabzy: Invalid input ${input}`);
        return;
    }
    this._activeTab(tabToActive);
};

Tabzy.prototype.destroy = function () {
    this.tabs.forEach((tab) => {
        tab.closest("li").classList.remove("tabzy--active");
    });
    this.panels.forEach((panel) => (panel.hidden = false));
};
