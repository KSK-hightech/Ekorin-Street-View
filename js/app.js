const tourType = document.body.dataset.tour || "village";

const villageTour = {
    default: {
        firstScene: "entrance",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120
    },

    scenes: {
        entrance: {
            title: "銀河庭園 入口",
            type: "equirectangular",
            panorama: "image/test/indoor2.jpg"
        },
        garden_path: {
            title: "庭園の散策路",
            type: "equirectangular",
            panorama: "image/test/GPTDemo.png"
        },
        city_view: {
            title: "街のパノラマ",
            type: "equirectangular",
            panorama: "image/test/demo3.jpg"
        },
        sunset_road: {
            title: "夕暮れの道",
            type: "equirectangular",
            panorama: "image/test/sample4.jpg"
        }
    }
};

const tomatoTour = {
    default: {
        firstScene: "tomato_entrance",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        showControls: true
    },

    scenes: {
        tomato_entrance: {
            title: "トマトの森",
            type: "equirectangular",
            panorama: "image/tomato/21.jpg"
        }
    }
};

const welcomeTour = {
    default: {
        firstScene: "welcome_1",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        showControls: true
    },

    scenes: {
        welcome_1: {
            title: "ウェルカムセンター 1",
            type: "equirectangular",
            panorama: "image/welcomeCenter/1.jpg"
        },
        welcome_2: {
            title: "ウェルカムセンター 2",
            type: "equirectangular",
            panorama: "image/welcomeCenter/2.jpg"
        },
        welcome_3: {
            title: "ウェルカムセンター 3",
            type: "equirectangular",
            panorama: "image/welcomeCenter/3.jpg"
        },
        welcome_4: {
            title: "ウェルカムセンター 4",
            type: "equirectangular",
            panorama: "image/welcomeCenter/4.jpg"
        }
    }
};

const coconutTour = {
    default: {
        firstScene: "coconut_1",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        showControls: true
    },

    scenes: {
        coconut_1: {
            title: "ココワッカホール",
            type: "equirectangular",
            panorama: "image/coconutHole/23.jpg"
        }
    }
};

const rakudaTour = {
    default: {
        firstScene: "rakuda_1",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        showControls: true
    },

    scenes: {
        rakuda_1: {
            title: "レストランラクダ軒 1",
            type: "equirectangular",
            panorama: "image/rakudaKen/7.jpg"
        },
        rakuda_2: {
            title: "レストランラクダ軒 2",
            type: "equirectangular",
            panorama: "image/rakudaKen/8.jpg"
        }
    }
};

const mapLocations = {
    entrance: { top: "80%", left: "20%" },
    garden_path: { top: "50%", left: "40%" },
    city_view: { top: "30%", left: "70%" },
    sunset_road: { top: "10%", left: "85%" }
};

const sceneLinks = {
    entrance: [
        { yaw: 0, target: "garden_path" }
    ],
    garden_path: [
        { yaw: 180, target: "entrance" },
        { yaw: 0, target: "city_view" }
    ],
    city_view: [
        { yaw: 180, target: "garden_path" },
        { yaw: 0, target: "sunset_road" }
    ],
    sunset_road: [
        { yaw: 180, target: "city_view" }
    ]
};

const tours = {
    village: villageTour,
    tomato: tomatoTour,
    welcome: welcomeTour,
    coconut: coconutTour,
    rakuda: rakudaTour
};

const tourConfig = tours[tourType] || villageTour;
const viewer = pannellum.viewer("panorama", tourConfig);
const panorama = document.getElementById("panorama");

function changeScene(id) {
    viewer.loadScene(id);
}

function toggleMenu() {
    document.getElementById("menu-container")?.classList.toggle("open");
}

document.addEventListener("click", function (e) {
    const menu = document.getElementById("menu-container");

    if (menu && !menu.contains(e.target)) {
        menu.classList.remove("open");
    }
});

function updateCurrentPosition() {
    const dot = document.getElementById("current-pos");
    const pos = mapLocations[viewer.getScene()];

    if (dot && pos) {
        dot.style.top = pos.top;
        dot.style.left = pos.left;
    }
}

viewer.on("load", updateCurrentPosition);

function getYawDiff(a, b) {
    const diff = Math.abs(a - b);
    return diff > 180 ? 360 - diff : diff;
}

function moveToClosestScene() {
    if (tourType !== "village") return;

    const currentYaw = viewer.getYaw();
    const links = sceneLinks[viewer.getScene()];

    if (!links) return;

    let closest = links[0];

    links.forEach(link => {
        if (getYawDiff(currentYaw, link.yaw) < getYawDiff(currentYaw, closest.yaw)) {
            closest = link;
        }
    });

    if (getYawDiff(currentYaw, closest.yaw) < 60) {
        viewer.loadScene(closest.target);
    }
}

function moveSceneInOrder(order) {
    const current = viewer.getScene();
    const currentIndex = order.indexOf(current);

    if (currentIndex === -1) return;

    const nextIndex = currentIndex === order.length - 1 ? 0 : currentIndex + 1;
    viewer.loadScene(order[nextIndex]);
}

let startX = 0;
let startY = 0;

panorama.addEventListener("pointerdown", function (e) {
    startX = e.clientX;
    startY = e.clientY;
});

panorama.addEventListener("pointerup", function (e) {
    const moved = Math.abs(e.clientX - startX) > 8 || Math.abs(e.clientY - startY) > 8;
    const clickedUi = e.target.closest("#menu-container, .pnlm-controls-container, .pnlm-hotspot-base");

    if (!moved && !clickedUi) {
        moveToClosestScene();
    }
});

panorama.addEventListener("contextmenu", function (e) {
    const clickedUi = e.target.closest("#menu-container, .pnlm-controls-container, .pnlm-hotspot-base");

    if (clickedUi) return;

    if (tourType === "welcome") {
        e.preventDefault();
        moveSceneInOrder(["welcome_1", "welcome_2", "welcome_3", "welcome_4"]);
    }

    if (tourType === "rakuda") {
        e.preventDefault();
        moveSceneInOrder(["rakuda_1", "rakuda_2"]);
    }
});


// 自作カーソル要素の取得
const cursor = document.getElementById("move-cursor");
const panoramaArea = document.getElementById("panorama");

// マウス移動時の処理
document.addEventListener("mousemove", (e) => {
    if (!cursor) return;
    
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    let yaw = viewer.getYaw();
    cursor.style.transform = `translate(-50%, -50%) rotate(${yaw - 90}deg)`;
});

// パノラマ画像の上にマウスが入った時の処理
if (panoramaArea) {
    panoramaArea.addEventListener("mouseenter", () => {
        if (cursor) {
            cursor.classList.add("active");
            cursor.style.display = "block";
        }
    });

    panoramaArea.addEventListener("mouseleave", () => {
        if (cursor) {
            cursor.classList.remove("active");
            cursor.style.display = "none";
        }
    });
}

// ドラッグ開始（クリック中）
document.addEventListener("mousedown", (e) => {
    if (e.target.closest("#map-container")) return;
    if (cursor) cursor.classList.add("dragging");
});

// ドラッグ終了
document.addEventListener("mouseup", () => {
    if (cursor) cursor.classList.remove("dragging");
});


function updateMapRotation() {
    const dot = document.getElementById("current-pos");

    if (dot) {
        dot.style.transform = `translate(-50%, -50%) rotate(${viewer.getYaw()}deg)`;
    }

    requestAnimationFrame(updateMapRotation);
}

updateCurrentPosition();
updateMapRotation();